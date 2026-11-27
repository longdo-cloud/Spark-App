# Spark-App

Clickable iOS prototype of **Spark** (Option 2) for presenting: Discover, Video, Photo, Tools, Gallery tabs and the Create video / Create image flows. Content follows the Figma file and the PRD.

## Structure (v2 · từ 27/11/2026)

| Path | What |
|---|---|
| `index.html` | App đã build (HTML/CSS/JS tĩnh, deploy thẳng) |
| `app/src/` | Source v2: `base.css`, `flow.css`, `profile.css`, `core.js` (router, sheet, alert, toast), `tabs.js`, `flow.js` (Generate video/image), `profile.js`, `bookmarks.js`, `main.js`, `icons.json` (Font Awesome Free) |
| `app/build.py` | Ghép `app/src/` → `index.html` (`python3 app/build.py`) |
| `app/shot.js`, `app/multi.js` | Chụp màn hình kiểm tra bằng Playwright |
| `img/` | Ảnh xuất từ Figma (tên theo hash ảnh) + ảnh của bản cũ |
| `v/`, `p/` | Video và poster |
| `legacy/` | Prototype cũ (mở tại `/legacy`) |
| `vercel.json` | Cấu hình static hosting |

## Edit and deploy

1. Sửa file trong `app/src/`.
2. `python3 app/build.py` để build lại `index.html`.
3. `git commit` rồi `git push` — Vercel tự deploy lên spark-app-xi.vercel.app.
