# Contributing to Stackwake

Thanks for your interest! This project doubles as a learning exercise in shipping a CLI to npm,
so the workflow is kept deliberately conventional.

## Setup

```bash
npm install
npm run build
```

Requires Node.js `>=20` (see `.nvmrc`).

## Branching — GitHub Flow

- `main` is the trunk and is always releasable.
- Work on short-lived branches off `main`, then open a PR.
- Branch naming: `feat/…`, `fix/…`, `docs/…`, `chore/…`.

## Commits — Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(up): auto-clone missing repos before start
fix(status): handle detached HEAD
docs: add configuration example
chore: bump biome
```

## Before opening a PR

```bash
npm run typecheck
npm run lint
npm run build
```

## Design decisions

Non-trivial decisions are recorded as [ADRs](./docs/adr). If you're proposing a change to the
architecture or tooling, add an ADR alongside your PR.

## Releases

Releases are cut by tagging `main` with `vX.Y.Z`; CI publishes to npm with `--provenance`.
