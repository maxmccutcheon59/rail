import type { Policy, Task } from "@rail-ai/shared";

/** Adapter owns how the model thinks. Rail owns policy/recording/eval/replay. */
export interface EventBus {
  emit(event: Record<string, unknown>): void;
}

export interface AgentAdapter {
  name: string;
  start(task: Task, policy: Policy, bus: EventBus): Promise<void>;
  abort(): Promise<void>;
}

/** Placeholder — real + dummy adapters arrive in later milestones. */
export const adaptersPlaceholder = true;
