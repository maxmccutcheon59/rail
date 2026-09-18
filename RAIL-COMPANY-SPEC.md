# RAIL — Company Spec (engineering source of truth)

**One-liner:** Rail is the flight recorder, permission system, and replay engine for AI agents that actually do work.

**Category:** Agent infrastructure / software for agents.

## What this is / is not

**Is:** local-first control plane that wraps *any* agent — policy, record, eval, replay.

**Not:** coding IDE clone, ChatGPT theme, do-everything agent, social network, robotics hardware in v1.

## v1 user + job

- **User:** one developer running agents against a local repo
- **Job:** run a task under policy, record everything, score the result, replay it
- **Surface:** CLI + localhost UI + `.rail/` in the project
- **No cloud account in v1**

## v1 objects

Workspace, Policy, Task, Run, Event, Trace, Eval, Replay

## Default policy (strict)

- write only inside the repo
- no network unless enabled
- deny `.env`, `~/.ssh`, keys
- deny `rm -rf`, sudo, force-push
- budgets: max $ / minutes / tokens
- git commit/destructive off unless allowed

## Run loop

1. `rail run "…"`
2. Snapshot git/tree
3. Start adapter under policy
4. Intercept tool calls
5. Diff file edits
6. Allow commands only if policy says so
7. End on success / violation / timeout / budget / abort
8. Run evals
9. UI: timeline, diffs, costs, eval board, replay

## Evals (the wedge)

A run is not done because the model said done. Evals pass or the run is not green.

Built-ins: `tests_pass`, `files_exist`, `files_not_exist`, `grep_must`, `grep_must_not`, `command_exit_0`, `no_policy_violations`, `max_cost`, custom script.

## Adapter interface

```ts
interface AgentAdapter {
  name: string
  start(task: Task, policy: Policy, bus: EventBus): Promise<void>
  abort(): Promise<void>
}
```

Rail owns policy, recording, eval, replay. Adapter owns model thinking.

## Event schema (append-only JSONL)

```json
{
  "id": "evt_...",
  "run_id": "run_...",
  "ts": "ISO-8601",
  "type": "tool.call | tool.result | file.diff | command | model | policy | eval | system",
  "name": "write_file",
  "status": "ok | blocked | error",
  "input": {},
  "output": {},
  "cost_usd": 0,
  "tokens_in": 0,
  "tokens_out": 0,
  "duration_ms": 0,
  "schema_version": 1
}
```

## Build order

0 repo/CLI/policy → 1 store → 2 policy engine → 3 dummy adapter → 4 real adapter → 5 diffs → 6 evals → 7–8 UI → 9 replay → demo

Do not start auth, billing, cloud, or multiplayer until v1 demo is sharp.

## Stack

TypeScript, Node 20+, commander/citty, Vite+React UI later, SQLite+JSONL, YAML policy, Vitest.

## Expansion (do not build now)

Solo density → team multiplayer → company brain → physical world (same nouns) → optional exit/fork.
