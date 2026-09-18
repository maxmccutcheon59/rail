# Rail

**Rail is the flight recorder, permission system, and replay engine for AI agents that actually do work.**

Agents can edit files and run commands. Companies will not trust them unattended until they can answer: what was allowed, what happened, can I replay it, did evals pass, and what did it cost?

Rail wraps *any* agent and makes its work inspectable, permissioned, replayable, and evaluable.

## What this is not

- Not a coding IDE
- Not ChatGPT with a theme
- Not “an agent that does everything”
- Not cloud-first SaaS in v1

## Quickstart (Milestone 0)

```bash
npm install
npx tsx apps/cli/src/index.ts --help
npx tsx apps/cli/src/index.ts init    # run from the target workspace
npx tsx apps/cli/src/index.ts policy
```

Or from the monorepo after install:

```bash
npm run rail -- --help
```

Note: `rail init` / `rail policy` use `process.cwd()` — run them inside the project you want to instrument.
`rail init` creates:

```text
.rail/
.rail/runs/
rail.policy.yaml
```

Default policy is strict: write only inside the repo, network off, no secrets, no `rm -rf` / force-push / sudo.

## CLI (v1 target)

```bash
rail init
rail policy
rail run "task"      # later milestones
rail runs
rail show <run-id>
rail replay <run-id>
rail eval <run-id>
rail open            # local UI later
```

## Repo layout

```text
apps/cli            # commander CLI
apps/ui             # local flight-recorder UI (placeholder)
packages/core       # policy, store, eval, replay (later)
packages/adapters   # agent adapters (later)
packages/shared     # shared types
examples/demo-repo  # demo workspace
```

## Status

Milestone 0 complete: monorepo, CLI skeleton, example policy.  
Next: store (SQLite + JSONL events).

## License

MIT © Max McCutcheon
