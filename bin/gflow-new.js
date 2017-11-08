#!/usr/bin/env node
const commander = require("commander");
const chalk = require("chalk");
const figures = require("figures");
const {newBranch} = require("../src");
let branchName;

commander
  .usage("gflow-new <branchName>")
  .arguments("<branchName>")
  .option("-t, --type <type>", "Type of the branch (feat, fix, docs, chore)", /^(feat|fix|docs|chore)$/i, "feat")
  .option("-f, --from <fromBranch>", "Create a branch from another branch. By default production.")
  .action((_branchName_) => {
    branchName = _branchName_;
  })
  .parse(process.argv);

if (!branchName) {
  console.error(chalk.red("branchName is required"));
  process.exit(0);
}

let options = {
  branchName
};

if (commander.type) {
  options.type = commander.type;
}

if (commander.from) {
  options.from = commander.from;
}

options = newBranch(options);

console.log(chalk.green(figures.tick), "New branch", options.branch, "created from " + options.from + " HEAD");