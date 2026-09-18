# Rail build log

## 2026-09-18 — Night 1 / Milestone 0

- Shipped: monorepo (`apps/cli`, `apps/ui` placeholder, `packages/{core,adapters,shared}`, `examples/demo-repo`)
- CLI: `rail --help`, `rail init`, `rail policy`
- Strict default `rail.policy.yaml` (secrets denied, network off, destructive git/commands denied, $2 / 20 min budgets)
- Broken / not started: store, policy engine decisions, adapters, UI, evals, replay
- Tomorrow: Night 2 — SQLite + JSONL event store (`createRun`, `appendEvent`, `listRuns`, `getRun`)
