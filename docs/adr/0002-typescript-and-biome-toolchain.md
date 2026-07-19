# 2. Use TypeScript and Biome for the toolchain

- Status: Accepted
- Date: 2026-07-19

## Context

Stackwake needs a language and tooling baseline before implementation. The project is a
distributed npm CLI, so type safety at the config/Git/process boundaries and a smooth publishing
story matter. As a learning project, exposure to the toolchain patterns common in modern OSS is
itself a goal.

Options considered:

- **Language**: TypeScript vs. plain JavaScript. JS needs no build step but forgoes type safety
  and type-definition distribution practice.
- **Lint/Format**: Biome (single tool) vs. ESLint + Prettier (the established pair, more config
  files and dependencies).

## Decision

- Use **TypeScript** (ESM, `NodeNext`), bundled to `dist/` with **tsup**. The published package
  ships `dist/` and a thin `bin/swk.js` launcher.
- Use **Biome** for both linting and formatting.
- Target **Node.js `>=20`**.

## Consequences

- Type safety across `stackwake.yml` parsing, Git operations, and child-process management.
- One fast tool (Biome) covers lint + format with minimal config, at the cost of a smaller
  plugin ecosystem than ESLint.
- A build step is now required before publish (`prepublishOnly` runs `build`), and consumers
  install compiled output rather than raw sources.
