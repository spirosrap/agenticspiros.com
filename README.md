# agenticspiros.com

Static personal site for Spiros Raptis, live at
[agenticspiros.com](https://agenticspiros.com).

Current release: `v9.0.0`.

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
- `VERSION`
- `.htaccess`
- `robots.txt`
- `assets/`

No Node build, database, WordPress theme edits, or plugin changes are required.
The stylesheet and small interaction script are inline so the first viewport
does not wait on extra text-resource requests.

The root `.htaccess` disables Apache PageSpeed because the current Plesk host
rewrites the homepage incorrectly when it is enabled. It also enables gzip for
text assets and gives versioned release assets long-lived cache headers. The
asset-level rules cache versioned images without applying that policy to other
applications hosted below the same document root.
