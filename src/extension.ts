// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeCode(editor: vscode.TextEditor, text: string, cps: number) {
	const lines = text.split(/\r?\n/);
    let position = editor.selection.active;

    for (const line of lines) {
        for (let i = 0; i < line.length; i++) {
            await editor.edit(editBuilder => {
                editBuilder.insert(position, line[i]);
            });

            // Move cursor one character right
            position = position.translate(0, 1);
            editor.selection = new vscode.Selection(position, position);

            // Ensure cursor is visible
            editor.revealRange(
                new vscode.Range(position, position),
                vscode.TextEditorRevealType.Default
            );

            await sleep(1000 / cps);
        }

        // Insert newline
        await editor.edit(editBuilder => {
            editBuilder.insert(position, '\n');
        });

        // Move cursor to next line, column 0
        position = new vscode.Position(position.line + 1, 0);
        editor.selection = new vscode.Selection(position, position);

        editor.revealRange(
            new vscode.Range(position, position),
            vscode.TextEditorRevealType.Default
        );

        await sleep(1000 / cps);
    }
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "auto-type-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('autoTypeReplay.start', async () => {
        const config = vscode.workspace.getConfiguration('autoTypeReplay');
        const cps: number = config.get('speed', 50);
        const sourceFilePath: string = config.get('sourceFile', '').trim();

        if (sourceFilePath) {
            // Use file from settings
            const folders = vscode.workspace.workspaceFolders;
            if (!folders) {
                vscode.window.showErrorMessage('Please open a workspace folder.');
                return;
            }

            const fullPath = vscode.Uri.joinPath(folders[0].uri, sourceFilePath);
            try {
                const fileDoc = await vscode.workspace.openTextDocument(fullPath);
                const text = fileDoc.getText();

                const activeEditor = vscode.window.activeTextEditor;
                if (!activeEditor) {
                    vscode.window.showErrorMessage('Open a file to type into.');
                    return;
                }

                await typeCode(activeEditor, text, cps);
            } catch (err) {
                vscode.window.showErrorMessage(`Could not read file: ${sourceFilePath}`);
                return;
            }

        } else {
            // No file in config → use current as source, type into new editor
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor || activeEditor.document.isUntitled) {
                vscode.window.showErrorMessage('Open a saved file to replay from.');
                return;
            }

            const text = activeEditor.document.getText();
            const langId = activeEditor.document.languageId;

            const newDoc = await vscode.workspace.openTextDocument({
                language: langId,
                content: ''
            });

            const newEditor = await vscode.window.showTextDocument(newDoc, vscode.ViewColumn.Beside);
            await typeCode(newEditor, text, cps);
        }
    });


	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
