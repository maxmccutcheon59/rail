# RAIL — 2026 Build Playbook (ops)

Founder constraint: evenings, no raise, ship v1 in 14 nights.

## Nightly rhythm (3h)

1. Read only today’s milestone
2. Implement with Cursor
3. Review against spec
4. Commit
5. Five lines in `log.md`

## 14-night order

| Night | Milestone | Done when |
|---|---|---|
| 1 | Repo + CLI + policy | `rail --help` and `rail init` |
| 2 | Store | create + list runs |
| 3 | Policy + dummy agent | `.env` read blocked in trace |
| 4 | Real adapter | model writes a file through policy |
| 5 | Diffs + git snapshot | `rail show --diff` |
| 6 | Evals | board prints; green only if pass |
| 7–8 | Local UI | `rail open` flight recorder |
| 9 | Replay | branch + diffs + evals, no destructive re-exec |
| 10 | Dogfood | use Rail on Rail |
| 11 | Harden | crashes, timeouts, tests |
| 12 | 3 humans | others run one task |
| 13 | Fix only their bugs | freeze features |
| 14 | Publish | public repo + 90s demo |

## Capital

Spend evenings on product. Tiny API budget when adapter goes live. No LLC until strangers use it twice. Equity stays 100% founder through Night 14.

## Decision rule

If it does not help tonight’s milestone, preserve Policy/Run/Trace/Eval/Replay, and would make a senior engineer install tomorrow — ignore it.
