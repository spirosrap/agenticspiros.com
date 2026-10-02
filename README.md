# agenticspiros.com

Static personal site for Spiros Raptis, live at
[agenticspiros.com](https://agenticspiros.com).

Current release: `v15.0.0`.

Version 15 repositions the site for prospective clients while keeping the
IBM Plex type system and green accent from version 14. The page now opens with
a value proposition, real product screenshots (Kalathi Timon 0.38.2 and
Fleetlight for Linux 0.4.0 with its public demo data), and a proof strip, then
continues with a services section, three case studies with facts, stack and
expandable release notes, a four-step process, a dated activity timeline, the
project index, and an about section with working principles and toolbox.

Featured versions: Kalathi Timon 0.38.2, Fleetlight macOS 4.52, Linux 0.4.0 and
Android 1.15.6, Plex Open Android 0.22.3 and web 0.26.0. The activity section
covers work through 30 September 2026; older entries sit behind a native
disclosure. Markets tooling stays explicitly labeled as earlier work.

The page uses four self-hosted woff2 font files (about 96 KB in total, latin
and Greek subsets), responsive local images, inline CSS, and a small
progressive-enhancement script for navigation state and scroll reveals. All
content and disclosures work without JavaScript. There are no third-party
runtime resources or analytics.

Content was checked on 2 October 2026 against repository commits, public
READMEs, and the public CV. The activity summaries exclude private host
identities, infrastructure addresses, account details, and review data.

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
