# agenticspiros.com

Static personal site for Spiros Raptis, live at
[agenticspiros.com](https://agenticspiros.com).

Current release: `v14.0.0`.

Version 14 is a visual redesign: self-hosted Commissioner and Instrument Serif
type, a warm paper palette with a single green accent, rounded tinted project
cards, a timeline for recent work, a card grid for the project index, and a
contained dark contact panel. Kalathi Timon is listed at 0.38.2 with its
29 September interface refresh. Three featured projects have concise introductions and native expandable
release notes: Kalathi Timon 0.37.2, Fleetlight public macOS 1.67, and Plex Open
Android 0.22.3. A dated activity section covers recent product, workflow, and
desktop-integration work. Camera Sentinel and other maintained projects remain
in the project index; markets tooling stays explicitly labeled as earlier work.

The page uses four self-hosted woff2 font files (about 95 KB in total, latin
and Greek subsets), responsive local images, inline CSS, and a small
progressive-enhancement navigation script. All content and release disclosures
work without JavaScript. There are no third-party runtime resources or analytics.

Content was checked on 29 September 2026 against repository commits, public
release notes, and relevant task records. The activity summaries exclude private
host identities, infrastructure addresses, account details, and review data.

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
- `assets/` (including `assets/fonts/`)

No Node build, database, WordPress theme edits, or plugin changes are required.
The stylesheet and small interaction script are inline so the first viewport
does not wait on extra text-resource requests.

The root `.htaccess` disables Apache PageSpeed because the current Plesk host
rewrites the homepage incorrectly when it is enabled. It also enables gzip for
text assets and gives versioned release assets long-lived cache headers. The
asset-level rules cache versioned images without applying that policy to other
applications hosted below the same document root.
