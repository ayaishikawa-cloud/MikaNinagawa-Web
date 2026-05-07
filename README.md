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

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Vite and publishes to the repository's GitHub Pages site.

URL once published: `https://<owner>.github.io/Mikaninagawaprototype/`

### One-time GitHub setup

1. **Settings → Pages**: set "Build and deployment" → Source to **GitHub Actions**
2. Push to `main` (or run the workflow manually from the Actions tab) — first run takes ~2 min

### Password gate

`src/app/PasswordGate.tsx` shows a full-screen password prompt before the site renders. The check is client-side SHA-256 against a hardcoded hash, so this is a *light* gate (anyone willing to read the bundle can bypass it). Treat it as a "no accidental visitors" cover, not a security boundary.

**Default password**: `ninagawa-preview`

To change the password:

1. Pick a new password.
2. Compute its SHA-256 hash:

   ```bash
   python3 -c 'import hashlib; print(hashlib.sha256(b"NEW_PASSWORD").hexdigest())'
   ```

3. Replace `PASSWORD_SHA256` in `src/app/PasswordGate.tsx` with the new hex string.
4. Commit and push to `main` — the workflow redeploys automatically.

The unlock state is stored in `sessionStorage`, so visitors only enter the password once per browser session.
