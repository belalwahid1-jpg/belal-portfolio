# Belal Wahid Mohamed — Portfolio

A bilingual, responsive website built with plain HTML, CSS, and JavaScript. It has no framework, build step, package installation, or server requirement.

## Open the website

Double-click `open-site.bat` to open the website in your default browser, or double-click `index.html`. The page and local images work directly from the project folder.

## Files

- `index.html` — page structure and metadata
- `style.css` — responsive visual design
- `data.js` — editable text, project and skill content in English and Arabic
- `script.js` — language switch, navigation, project filters, modal, and contact form
- `public/images/` — personal and brand images

## Personalize

- Replace `public/images/hero-portrait.jpg` and `public/images/about-working.jpg` with your preferred photos, keeping their file names.
- Update project details and translations in `data.js`. The gallery entries are demo concepts, not claims of completed client work.
- Update contact and social URLs in the `personal` object in `data.js`.
- The contact form uses a `mailto:` fallback. It prepares a message in the visitor's email application; it does not claim to send it.

Upload the whole project folder to any static web host, including Vercel or Netlify. The included GitHub Actions workflow publishes this static site to GitHub Pages whenever `main` is updated; choose **GitHub Actions** as the Pages source in repository settings.
