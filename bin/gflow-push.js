#!/usr/bin/env node
const commander = require("commander");
const chalk = require("chalk");
const figures = require("figures");
const {push, git} = require("../src");

commander
  .usage("gflow-push")
  .option("-o, --from <fromBranch>", "Rebase a branch from another branch. By default origin/production.")
  .option("-f, --force <fromBranch>", "Force pushing branch.", (v, t) => t + 1, 0)
  .option("-s, --skip", "Skip the unit test.", (v, t) => t + 1, 0)
  .action(() => {
  })
  .parse(process.argv);

let options = {
  test: !commander.skip,
  force: !!commander.force
};

if (commander.from) {
  options.from = commander.from;
}

push(options);