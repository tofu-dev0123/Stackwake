# 3. Release by tagging, publish with Trusted Publishing

- Status: Accepted
- Date: 2026-07-19

## Context

Stackwake ships to npm, and a goal of the project is to learn a modern, secure release pipeline.
Two things need deciding: what triggers a release, and how CI authenticates to npm.

Authentication options:

- **`NPM_TOKEN` secret**: a long-lived token stored in GitHub Secrets. Familiar, but the token
  must be created, rotated, and can leak.
- **Trusted Publishing (OIDC)**: GitHub Actions exchanges a short-lived OIDC identity that npm
  trusts. No stored token; provenance is generated automatically.

## Decision

- **CI** (`ci.yml`) runs on every push to `main` and every PR: `typecheck`, `lint`, and `build`
  across a Node `20 / 22 / 24` matrix, backing up the `engines: node >=20` claim.
- **Release** (`release.yml`) triggers on a pushed git tag matching `v*.*.*`. It verifies the tag
  matches `package.json`'s version, builds, then runs `npm publish --provenance --access public`.
- Authentication uses **npm Trusted Publishing (OIDC)** — no `NPM_TOKEN`. The workflow grants
  `id-token: write` and upgrades the npm CLI (Trusted Publishing needs a recent version).

## Consequences

- No long-lived npm token to store or rotate; publish provenance is attached automatically.
- Releasing is a single, auditable act: `git tag vX.Y.Z && git push --tags`.
- One-time setup is required on npmjs.com to register this repository/workflow as a trusted
  publisher before the first release will succeed.
- The matrix increases CI minutes threefold versus a single Node version, which is acceptable for
  a small project and catches version-specific breakage early.
