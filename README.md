# Billy Cesar Soriano Portfolio

This is a no-build static portfolio site for Vercel. The deployed site is served directly from `index.html` in the repository root.

## Vercel Settings

- Framework preset: `Other`
- Root directory: repository root
- Build command: leave empty
- Output directory: leave empty
- Install command: leave empty

If this repository is later moved into a monorepo, set the root directory to the folder that contains `index.html`.

## Files

- `index.html` is the site entrypoint.
- `styles.css` contains the full responsive UI.
- `script.js` handles active navigation and the image lightbox.
- `assets/` contains optimized portfolio visuals and the downloadable PDF.
- `vercel.json` keeps static asset caching and root routing explicit for Vercel.
