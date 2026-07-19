import { createRequire } from "node:module";
import { Command } from "commander";

const require = createRequire(import.meta.url);
const pkg = require("../package.json") as { version: string; description: string };

const program = new Command();

program.name("swk").description(pkg.description).version(pkg.version);

program
  .command("up")
  .description("Clone missing repos, then start every repo's dev process together")
  .action(() => {
    console.log("swk up: not implemented yet");
  });

program
  .command("status")
  .description("Show branch, dirty state, and ahead/behind for every repo")
  .action(() => {
    console.log("swk status: not implemented yet");
  });

program
  .command("pull")
  .description("Run git pull across every repo")
  .action(() => {
    console.log("swk pull: not implemented yet");
  });

program.parse();
