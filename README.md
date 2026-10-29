# demo-profile-site

A demo profile site, built in layers. Static files only — no build step, no
framework, no dependencies. It is served directly by GitHub Pages.

Live: https://gittb.github.io/demo-profile-site/

## Structure

```
index.html            Page markup (semantic landmarks, skip link)
content/site.json     All copy lives here — data, not markup
assets/css/base.css   Design tokens and the page shell
assets/js/site.js     Hydrates bound elements from content/site.json
.nojekyll             Tells Pages to serve files as-is, no Jekyll pass
concepts/chosen.html  Chosen design direction — reference, not shipped
```

Copy is data: elements marked `data-bind="key"` are filled from
`content/site.json`. The HTML ships with readable fallback text, so if the
fetch fails the page still reads correctly rather than rendering empty.

## Local preview

The page fetches JSON, so it needs to be served over HTTP (`file://` will not
work):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Deploy

Commits to `master` publish automatically via GitHub Pages (source: branch
`master`, folder `/`). There is no CI workflow and no build artifact to
commit.

## Layers

| Layer | Delivers |
| --- | --- |
| L0 | Scaffold, structure, content-in-JSON, deploy-ready files |
| L1 | Repo public, GitHub Pages enabled, live URL verified |
| L2 | Fictional persona and copy deck |
| L3 | Two design concepts, one chosen |
| L4 | Design tokens and page shell |
| L5–L7 | Hero, about/contact, selected work |
| L8 | Demo game |
| L9 | Polish, accessibility, metadata |
| L10 | Release and verification |

## Notes

- No credentials are stored in this repository. Deployment uses the GitHub
  Pages integration, not a committed token.
- `content/site.json` is the single source of truth for copy.
