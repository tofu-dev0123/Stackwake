# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Project scaffolding: TypeScript (ESM) + tsup build, Biome for lint/format.
- CLI skeleton with `up`, `status`, and `pull` subcommand stubs (via commander).
- Documentation baseline: README, CLAUDE.md, CONTRIBUTING, and ADRs.
- CI workflow (typecheck, lint, build across Node 20/22/24).
- Release workflow: tag `vX.Y.Z` publishes to npm via Trusted Publishing (OIDC) with provenance.
