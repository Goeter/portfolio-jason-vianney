# Deployment Fix Notes

Fixes applied for Vercel deployment:

1. Cleaned `package-lock.json` so all package tarball URLs use the public npm registry, not an internal registry URL.
2. Added `vercel.json` to make Vercel use deterministic installs via `npm ci --no-audit --no-fund`.
3. Added `packageManager` and `engines.node` to `package.json` so the build runs with Node.js 22 and npm 10.9.2.
4. Added production security headers in `next.config.mjs`:
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `X-Frame-Options: DENY`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Validation performed locally:

```bash
npm ci --ignore-scripts
npm run typecheck
npm run build
```

Result: build passed successfully.
