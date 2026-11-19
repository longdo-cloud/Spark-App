# Spark-App

Clickable iOS prototype of **Spark** (Option 2) for presenting: Discover, Video, Photo, Tools, Gallery tabs and the Create video / Create image flows. Content follows the Figma file and the PRD.

## Structure

| Path | What |
|---|---|
| `index.html` | The built app (static, no build step needed to deploy) |
| `img/` | Images exported from Figma (templates, icons, PRO badge, coin) |
| `v/` | Video clips (H.264, 540×960) |
| `p/` | Poster frames for each clip |
| `src/` | Source parts: base CSS, screen CSS, markup, data, renders, flows, handlers |
| `build.sh` | Concatenates `src/` into `index.html` |
| `vercel.json` | Static hosting config (long cache for media) |

## Edit and deploy

1. Edit files in `src/`.
2. Run `./build.sh` to rebuild `index.html`.
3. Commit and push to `main`. Vercel redeploys automatically.
