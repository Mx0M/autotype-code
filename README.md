# Auto Type Code

Auto Type Code is a Visual Studio Code extension that simulates real-time code typing into the editor.  

[Vscode Extension](https://marketplace.visualstudio.com/items?itemName=mkswebs.auto-type-ucode)

## ✨ Features

- Replay code line-by-line into the current editor
- Supports all languages (`.py`, `.js`, `.cpp`, `.php`, etc.)
- Configurable typing speed (`characters per second`)
- Optional file path to replay from
- Cursor movement and auto-scrolling for realistic typing effect
- hotkey :  ctrl + alt + k
- If the 'autoTypeReplay.sourceFile' setting is blank, the script will detect the active file in the editor and automatically type into a new file after pressing the hotkey.
- Starting type line in editor is configurable
- Skipping lines from source file is configurable
  

## ⚙️ Configuration

In `settings.json`:

```json
{
  "autoTypeReplay.speed": 50,
  "autoTypeReplay.sourceFile": "src/demo.py",
  "autoTypeReplay.startLine": 0,
  "autoTypeReplay.sourceSkipLine": 0
}
```

