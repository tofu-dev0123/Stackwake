# 1. Record architecture decisions

- Status: Accepted
- Date: 2026-07-19

## Context

A core goal of Stackwake is to learn the full lifecycle of shipping an OSS CLI to npm, including
how design decisions are documented and communicated. Decisions made only in chat or commit
messages are hard to revisit later.

## Decision

We will use Architecture Decision Records (ADRs), as described by Michael Nygard, stored in
`docs/adr/` and numbered sequentially. Each records the context, the decision, and its
consequences. New ADRs use `0000-template.md` as a starting point.

## Consequences

- Non-trivial decisions have a durable, reviewable home; the "why" survives beyond chat history.
- A small amount of overhead is added to significant changes — trivial changes do not need an ADR.
- Superseded decisions are kept for history and marked with a "Superseded by" status.
