# Local verification sandbox

This lane validates the active portfolio application before a feature branch is pushed. It is deliberately local-only: it does not authenticate to GitHub, create commits, or push branches.

## Run

```bash
npm run verify:local
```

Use a different loopback port when another process is using the default:

```bash
LOCAL_VERIFY_PORT=4174 npm run verify:local
```

For diagnostics in a restricted environment, the preview stage can be skipped; the normal command should include it:

```bash
LOCAL_VERIFY_SKIP_PREVIEW=true npm run verify:local
```

## What it verifies

1. Required active-app files exist.
2. `package.json` and `public/chat/index.json` are valid and structurally usable.
3. The active source contains no obvious credential/private-key patterns.
4. The app builds with TypeScript and Vite into `.local-sandbox/dist`.
5. ESLint passes for the active app and configuration.
6. The local build uses `/` as its base path and does not mutate GitHub Pages `docs/` output.
7. The loopback preview serves the HTML shell, SPA fallback, knowledge endpoint, and at least one built asset.
8. The largest JavaScript asset is reported against a 500 kB warning budget.
9. Portfolio quality debt is reported as warnings: placeholder links, template residue, generic destinations, fake contact-success copy, and default Vite residue.

Hard failures return exit code `1`; warnings are visible but do not block the technical gate until the corresponding content milestone is implemented.

## Scope boundary

The duplicate `portfolio-app/` tree is preserved as legacy source and excluded from the active lint gate. It should be archived or removed in a later cleanup milestone after confirming that no deployment path depends on it.
