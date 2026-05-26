# Website Design Creation

This is a code bundle for Website Design Creation. The original project is available at https://www.figma.com/design/EYzgZGeCwEHBcRGTOXzE72/Website-Design-Creation.

## Running the code

```bash
npm install
npm run dev          # local dev server
npm run build        # production build (outputs to ./dist)
```

Local dev runs from the project root, so set `VITE_BASE=/` if you need absolute paths during development:

```bash
VITE_BASE=/ npm run dev
```

## Password-protected preview on GitHub Pages

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Vite, encrypts `dist/index.html` with [StatiCrypt](https://github.com/robinmoisson/staticrypt), and publishes the result to the repository's GitHub Pages site.

URL once published: `https://<owner>.github.io/MikaNinagawa-Web/`

### One-time GitHub setup

1. **Settings → Pages**: set "Build and deployment" → Source to **GitHub Actions**
2. **Settings → Secrets and variables → Actions**: add a repository secret named `STATICRYPT_PASSWORD` with the password you want to gate the preview behind
3. Push to `main` (or run the workflow manually from the Actions tab) — first run takes ~2 min

### Password gate

StatiCrypt encrypts the built `index.html` with AES-256 before publishing. Visitors see a password prompt rendered by StatiCrypt's wrapper page; entering the correct password decrypts the original HTML client-side and renders the site.

This is a *light* gate — anyone with the password can share the encrypted bundle or the decrypted HTML. Treat it as a "no accidental visitors" cover, not a security boundary.

To change the password:

1. Open **Settings → Secrets and variables → Actions** and update the `STATICRYPT_PASSWORD` secret.
2. Re-run the deploy workflow (push to `main` or trigger manually from the Actions tab).

StatiCrypt also stores the unlocked state in `sessionStorage`, so each visitor only enters the password once per browser session.

> Historical note: an earlier revision of this project shipped an in-app `src/app/PasswordGate.tsx` component that did client-side SHA-256 password matching. It was removed in favour of the StatiCrypt-based flow above.
