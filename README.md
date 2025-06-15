# Auto Type Code

Auto Type Code is a Visual Studio Code extension that simulates real-time code typing into the editor.

## ✨ Features

- Replay code line-by-line into the current editor
- Supports all languages (`.py`, `.js`, `.cpp`, `.php`, etc.)
- Configurable typing speed (`characters per second`)
- Optional file path to replay from
- Cursor movement and auto-scrolling for realistic typing effect
- hotkey :  ctrl + alt + k
- If the 'autoTypeReplay.sourceFile' setting is blank, the script will detect the active file in the editor and automatically type into a new file after pressing the hotkey.

## ⚙️ Configuration

In `settings.json`:

```json
{
  "autoTypeReplay.speed": 50,
  "autoTypeReplay.sourceFile": "src/demo.py"
}
```

