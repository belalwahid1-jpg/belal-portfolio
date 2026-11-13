# Belal Wahid Mohamed — Portfolio

A standalone bilingual React portfolio with English and Arabic (RTL) support.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The production files are written to `dist/`.

## Deploy to GitHub Pages

Push this project to its own GitHub repository. In **Settings → Pages**, choose **GitHub Actions** as the deployment source. The workflow in `.github/workflows/deploy.yml` builds and deploys the site, automatically accounting for the repository URL.

## Local photos

The portfolio uses these bundled images:

- `public/images/hero-portrait.jpg`
- `public/images/about-working.jpg`
- `public/images/devsecure-brand.jpg`

Project and skills content is editable in `src/data/portfolioData.js`. The contact form prepares an email in the visitor's default mail app; it does not send or store submissions.
