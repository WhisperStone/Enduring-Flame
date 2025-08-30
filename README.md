# Ellie Whisper Stone

This folder is ready to publish on **GitHub Pages** with offline support.

## Quick publish
1. Create a new repo (e.g., `whisper-ellie`).
2. Upload everything in this folder to the repo **root**.
3. On GitHub: Settings → Pages → Build and deployment → Source: `main` / `/ (root)`.
4. Wait for the site URL to appear. Test on phone once online, then it will work offline.

## Files
- index.html — timing + glow + audio wired
- service-worker.js — caches page, images, MP3s
- manifest.webmanifest — app name + icons for Add to Home Screen
- icon-192.png, icon-512.png — app icons (glyph)
- ellie-intro.mp3, ellie-outro.mp3 — audio
- Background-3.png, story-image.png, symbol.png — visuals

## Optional
- Custom domain: Settings → Pages → Custom domain (e.g., `ellie.whisperstones.co.uk`), then add a DNS CNAME.
- Update the voice start offset in index.html: `data-voiceoffset="2.3"`
- Change the outro quote in the `#outroQuote` element.
