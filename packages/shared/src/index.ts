/** Stable v1 nouns — do not rename casually. */

export type Workspace = {
  root: string;
};

export type Policy = {
  version: 1;
  write: { allow: string[]; deny: string[] };
  read: { allow: string[]; deny: string[] };
  commands: { allow: string[]; deny: string[] };
  network: "off" | "allowlist" | "on";
  network_allowlist: string[];
  budgets: { max_usd: number; max_minutes: number; max_tokens?: number };
  git: {
    allow_destructive: boolean;
    allow_force_push: boolean;
    allow_commit: boolean;
  };
};

export type Task = {
  id: string;
  prompt: string;
};

export type RunStatus =
  | "pending"
  | "running"
  | "succeeded"
  | "failed"
  | "blocked"
  | "aborted"
  | "timeout"
  | "budget";

export type Run = {
  id: string;
  task: string;
  status: RunStatus;
  created_at: string;
  workspace: string;
};

export type EventType =
  | "tool.call"
  | "tool.result"
  | "file.diff"
  | "command"
  | "model"
  | "policy"
  | "eval"
  | "system";

export type EventStatus = "ok" | "blocked" | "error";

/** Append-only JSONL event schema (versioned). */
export type RailEvent = {
  id: string;
  run_id: string;
  ts: string;
  type: EventType;
  name: string;
  status: EventStatus;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  cost_usd: number;
  tokens_in: number;
  tokens_out: number;
  duration_ms: number;
  schema_version: 1;
};
