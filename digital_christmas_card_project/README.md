# Digital Christmas Card (Abby)

This is a small, static web project you can run locally in VS Code.

## Folder structure
- `index.html` (main page)
- `css/styles.css` (styles)
- `js/app.js` (behavior: open card, reveal surprise, play music)
- `assets/` (drop/replace your media here)

## Replace these files (keep the same filenames)
Inside `assets/`:
- `cover.jpg` — cover photo on the front of the card
- `dwts-logo.jpeg` — DWTS logo shown in the surprise
- `dwts2.webp` — extra DWTS details image shown in the surprise
- `dwts-theme.mp3` — music that plays in the surprise

## Run locally

### Option A: VS Code Live Server (recommended)
1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.

### Option B: Python static server
From the project folder:
```bash
python -m http.server 8000
```
Then open:
- http://localhost:8000

> Note: Most browsers block audio autoplay unless the user interacts. If music doesn't start, click **Play**.

## Customize your message
Open `index.html` and edit the text inside:
```html
<p class="message" id="messageText">...</p>
```

## Customize text / visuals
- Change “Merry Christmas Abby” on the cover in `index.html`.
- Change colors/animations in `css/styles.css`.
- Change behavior in `js/app.js`.
