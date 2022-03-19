#! /usr/bin/env node
const shell = require("shelljs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
let step = 1;

shell.echo("\n🖕 iCloud: Congratulations iCloud is being fixed. Thx Apple 🙄");

// npm install if node_modules doesn't exist
const sym = shell.exec("find node_modules -type l", { silent: true }).stdout;
const install = shell.exec("find node_modules -type d", { silent: true }).stdout;
const packageManager = args.m != 'npm' ? 'yarn' : 'npm';
if (install === "" && sym === "") {
  shell.echo(
    "\n🖕 iCloud - Step " +
      step +
      ": Can't find node_modules - running `" + packageManager + " install`\n"
  );
  step++;
  shell.exec(`${packageManager} install`);
  shell.echo("\n🖕 iCloud - Step " + step + ": Done installing packages");
  step++;
}

// if symlink not exists do the stuff
const nosync = shell.exec("find node_modules.nosync -type d", { silent: true })
  .stdout;
if (nosync === "") {
  shell.echo(
    "\n🖕 iCloud - Step " +
      step +
      ": modifying node_modules to node_modules.nosync"
  );
  step++;
  shell.exec("mv node_modules node_modules.nosync");
  shell.echo(
    "\n🖕 iCloud - Step " +
      step +
      ": adding node_modules -> node_modules.nosync symlink "
  );
  step++;
  shell.exec("ln -s node_modules.nosync node_modules");
}

// add to git exclude maybe
const nogitexcludeline =
  shell.exec(
    'find .git/info/exclude -type f -print0 | xargs -0 grep -l "^# ignore node_modules symlink$"',
    { silent: true }
  ).stdout === "";
if (!args.n && nogitexcludeline) {
  shell.echo(
    "\n🖕 iCloud - Step " +
      step +
      ": Modifying .git/info/exclude to ignore the node_modules .nosync folder and symlink"
  );
  step++;
  shell.exec('echo "" >> .git/info/exclude');
  shell.exec('echo "# ignore node_modules symlink" >> .git/info/exclude');
  shell.exec('echo "node_modules.nosync/" >> .git/info/exclude');
  shell.exec('echo "node_modules" >> .git/info/exclude');
  shell.exec('echo "!node_modules/" >> .git/info/exclude');
}

// add to gitignore maybe
const nogitignoreline =
  shell.exec(
    'find .gitignore -type f -print0 | xargs -0 grep -lE "^node_modules/?$"',
    { silent: true }
  ).stdout === "";
if (!args.n && nogitignoreline) {
  shell.echo(
    "\n🖕 iCloud - Step " +
      step +
      ": Modifying .gitignore to ignore the node_modules folder"
  );
  step++;
  const findNodeModule = shell.exec('find .gitignore -type f -print0 | xargs -0 grep -l "node_modules"', { silent: true }).stdout === "";
  if (findNodeModule) {
    shell.exec('echo "node_modules" >> .gitignore');
  }
  shell.exec('echo "node_modules.nosync" >> .gitignore');
}

// done
shell.echo("\n.");
shell.echo("\n.");
shell.echo("\n.");
shell.echo("\n🖕 iCloud - Step " + step + ": Profit! 💰\n");
step++;
