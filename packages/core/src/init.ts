import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import type { Policy } from "@rail-ai/shared";

export const RAIL_DIR = ".rail";
export const RUNS_DIR = path.join(RAIL_DIR, "runs");
export const POLICY_FILE = "rail.policy.yaml";

/** Strict default — write in-repo only, network off, secrets denied. */
export function defaultPolicyYaml(): string {
  return `# Rail default policy (strict)
# Docs: RAIL-COMPANY-SPEC.md

version: 1

read:
  allow:
    - "**/*"
  deny:
    - "**/.env"
    - "**/.env.*"
    - "**/.ssh/**"
    - "**/*id_rsa*"
    - "**/*id_ed25519*"
    - "**/credentials.json"
    - "**/.aws/credentials"

write:
  allow:
    - "**/*"
  deny:
    - "**/.env"
    - "**/.env.*"
    - "**/.ssh/**"
    - "**/.git/objects/**"

commands:
  allow:
    - "ls"
    - "ls *"
    - "pwd"
    - "cat *"
    - "head *"
    - "rg *"
    - "grep *"
    - "npm test*"
    - "npm run *"
    - "pnpm test*"
    - "yarn test*"
    - "cargo test*"
    - "pytest*"
    - "node *"
    - "python *"
    - "python3 *"
    - "git status*"
    - "git diff*"
    - "git log*"
  deny:
    - "rm -rf *"
    - "rm -rf /*"
    - "sudo *"
    - "git push --force*"
    - "git push -f *"
    - "git reset --hard*"
    - "curl *"
    - "wget *"
    - "chmod 777 *"

network: off
network_allowlist: []

budgets:
  max_usd: 2
  max_minutes: 20

git:
  allow_destructive: false
  allow_force_push: false
  allow_commit: false
`;
}

export function parsePolicy(yamlText: string): Policy {
  const raw = YAML.parse(yamlText) as Policy;
  if (!raw || raw.version !== 1) {
    throw new Error("rail.policy.yaml must have version: 1");
  }
  return raw;
}

export function loadPolicy(workspaceRoot: string): Policy {
  const file = path.join(workspaceRoot, POLICY_FILE);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${POLICY_FILE}. Run: rail init`);
  }
  return parsePolicy(fs.readFileSync(file, "utf8"));
}

export type InitResult = {
  created: string[];
  already: string[];
  root: string;
};

export function initWorkspace(workspaceRoot: string): InitResult {
  const created: string[] = [];
  const already: string[] = [];

  const ensureDir = (rel: string) => {
    const abs = path.join(workspaceRoot, rel);
    if (fs.existsSync(abs)) {
      already.push(rel);
      return;
    }
    fs.mkdirSync(abs, { recursive: true });
    created.push(rel);
  };

  ensureDir(RAIL_DIR);
  ensureDir(RUNS_DIR);

  const policyPath = path.join(workspaceRoot, POLICY_FILE);
  if (fs.existsSync(policyPath)) {
    already.push(POLICY_FILE);
  } else {
    fs.writeFileSync(policyPath, defaultPolicyYaml(), "utf8");
    created.push(POLICY_FILE);
  }

  const gitignoreRail = path.join(workspaceRoot, RAIL_DIR, ".gitignore");
  if (!fs.existsSync(gitignoreRail)) {
    fs.writeFileSync(
      gitignoreRail,
      "# Keep structure; ignore bulky run artifacts by default\nruns/*/artifacts/\n",
      "utf8",
    );
    created.push(path.join(RAIL_DIR, ".gitignore"));
  }

  return { created, already, root: workspaceRoot };
}
