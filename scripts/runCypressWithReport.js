const { spawnSync } = require("child_process");

const args = process.argv.slice(2).join(" ");

function run(command) {
  const result = spawnSync(command, {
    stdio: "inherit",
    shell: true
  });
  return typeof result.status === "number" ? result.status : 1;
}

const setupExitCode = run("npm run job:add-user");
if (setupExitCode !== 0) {
  process.exit(setupExitCode);
}

run("npm run report:clean");

const cypressExitCode = run(`npx cypress run ${args}`.trim());
const reportExitCode = run("npm run report:generate");

if (reportExitCode !== 0) {
  process.exit(cypressExitCode !== 0 ? cypressExitCode : reportExitCode);
}

process.exit(cypressExitCode);
