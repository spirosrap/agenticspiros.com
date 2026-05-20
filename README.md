# agenticspiros.com

Static personal site for Spiros Raptis, live at
[agenticspiros.com](https://agenticspiros.com).

## Local preview

Open `index.html` directly in a browser, or run a simple local server:

```bash
python3 -m http.server 4173
```

Then visit `http://127.0.0.1:4173/`.

## Source anchors

- GitHub profile: `https://github.com/spirosrap`
- X profile: `https://x.com/srdevb`
- GitHub profile README: `https://github.com/spirosrap/spirosrap`
- GitHub avatar: `assets/spirosrap-avatar.jpg`
- Generated concept: `assets/site-concept.png`

## Deployment shape

This is intentionally plain HTML/CSS. It can be deployed to any Plesk static
domain or subdomain by uploading these files to the domain document root:

- `index.html`
- `styles.css`
- `.htaccess`
- `robots.txt`
- `assets/`

No Node build, database, WordPress theme edits, or plugin changes are required.

The `.htaccess` file disables Apache PageSpeed for this static site because the
current Plesk host rewrites the homepage incorrectly when it is enabled.
