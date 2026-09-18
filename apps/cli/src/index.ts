#!/usr/bin/env node
import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import {
  POLICY_FILE,
  initWorkspace,
  loadPolicy,
} from "@rail-ai/core";

const program = new Command();

program
  .name("rail")
  .description(
    "Flight recorder, permission system, and replay engine for AI agents",
  )
  .version("0.1.0");

program
  .command("init")
  .description("Create .rail/, rail.policy.yaml, and runs directory")
  .action(() => {
    const root = process.cwd();
    const result = initWorkspace(root);
    console.log(`Rail initialized in ${result.root}`);
    if (result.created.length) {
      console.log("Created:");
      for (const c of result.created) console.log(`  + ${c}`);
    }
    if (result.already.length) {
      console.log("Already present:");
      for (const a of result.already) console.log(`  · ${a}`);
    }
    console.log(`\nDefault policy: ${POLICY_FILE} (strict)`);
    console.log("Next: rail policy | rail run \"…\" (run arrives in later milestones)");
  });

program
  .command("policy")
  .description("Print the active workspace policy")
  .option("-r, --raw", "print raw YAML file")
  .action((opts: { raw?: boolean }) => {
    const root = process.cwd();
    const file = path.join(root, POLICY_FILE);
    if (!fs.existsSync(file)) {
      console.error(`Missing ${POLICY_FILE}. Run: rail init`);
      process.exitCode = 1;
      return;
    }
    if (opts.raw) {
      process.stdout.write(fs.readFileSync(file, "utf8"));
      return;
    }
    const policy = loadPolicy(root);
    console.log(`Policy: ${file}`);
    console.log(`Network: ${policy.network}`);
    console.log(
      `Budgets: $${policy.budgets.max_usd} / ${policy.budgets.max_minutes} min`,
    );
    console.log(
      `Git: destructive=${policy.git.allow_destructive} force_push=${policy.git.allow_force_push} commit=${policy.git.allow_commit}`,
    );
    console.log("\nRead deny (sample):");
    for (const g of policy.read.deny.slice(0, 8)) console.log(`  deny read  ${g}`);
    console.log("Command deny (sample):");
    for (const g of policy.commands.deny.slice(0, 8))
      console.log(`  deny cmd   ${g}`);
    console.log("\n--- raw YAML ---");
    console.log(YAML.stringify(policy));
  });

program.parse(process.argv);
