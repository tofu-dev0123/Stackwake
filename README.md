# Stackwake

> Wake your whole stack with one command.

**Stackwake** is a polyrepo-aware, language-agnostic CLI that starts, syncs, and inspects
multiple repositories at once. Define your stack in a single `stackwake.yml`, then bring the
whole thing up with one command — `swk`.

Built for polyrepo workflows where you'd otherwise `cd` into each repo to start its dev server,
`git pull`, and check status by hand.

> **Status: Work in progress.** The spec is still being finalized and the CLI is not yet
> published to npm. See [issue #1](https://github.com/tofu-dev0123/Stackwake/issues/1) and the
> [ADRs](./docs/adr) for the design direction.

## Why Stackwake

Unlike a plain multi-process runner (Overmind, foreman, `concurrently`), Stackwake understands
that each entry is a **Git repository**: it can auto-clone what's missing, `git pull` across the
whole stack, and report cross-repo status. Think "Procfile, but for polyrepos."

## Commands (MVP)

| Command | What it does |
| --- | --- |
| `swk up` | Auto-clone missing repos, then start each repo's dev process as a child process, with prefixed/colorized output. `Ctrl+C` stops everything. |
| `swk status` | List each repo's branch, dirty state, and ahead/behind. |
| `swk pull` | Run `git pull` across every repo. |

## Configuration

Stackwake reads a `stackwake.yml` (schema not yet finalized):

```yaml
name: my-webapp
defaults:
  start: npm run dev
repos:
  - name: frontend
    path: ./frontend
    url: git@github.com:you/frontend.git
  - name: backend
    path: ./backend
    url: git@github.com:you/backend.git
    start: uvicorn main:app --reload
```

## Development

```bash
npm install
npm run build      # bundle src/ -> dist/ with tsup
npm run typecheck  # tsc --noEmit
npm run lint       # biome check
npm run lint:fix   # biome check --write
```

## License

[MIT](./LICENSE)
