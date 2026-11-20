# Shirley Patrick · CRO portfolio

Static export of the "Follow the nose" portfolio designed in Claude Design. Plain HTML, CSS and a little vanilla JS: no framework, no build step.

## Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/growth-book/` | JustCall growth book |
| `/experiments/` | Experiment library (39 tests) |
| `/toolkit/` | CRO toolkit |
| `/cases/ppc/` | Case 01 · PPC landing pages |
| `/cases/design-system/` | Case 02 · Design system from test results |
| `/cases/mobile-demo/` | Case 03 · Mobile demo page |
| `/cases/exit-intent/` | Case 04 · Exit-intent popup |
| `/cases/kissflow/` | Case 05 · Kissflow navigation and rebrand |
| `/resume` | Redirects to the one-page résumé PDF |

## Structure

```
index.html                 homepage
growth-book/ toolkit/ experiments/ cases/*/   one index.html per page
assets/img/                images and Bruno stickers (webp)
assets/js/home.js          greeting, scroll curtain + timeline, test library, card pile
assets/js/experiments.js   experiment filters and lightbox
assets/resume/             résumé PDF
404.html                   "Lost the scent" page
vercel.json                clean URLs, trailing slashes, asset caching, /resume redirect
```

## Preview locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repository.
3. Framework preset: **Other**. Leave the build command empty and the output directory as the repository root.
4. Deploy. Every push to `main` redeploys.

## Editing

Each page is self-contained HTML; edit text directly in the page's `index.html`. Images live in `assets/img/`; keep the file name when replacing one so every page picks it up.
