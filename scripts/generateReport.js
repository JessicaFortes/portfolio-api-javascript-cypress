const fs = require("fs");
const path = require("path");
const { merge } = require("mochawesome-merge");
const marge = require("mochawesome-report-generator");

const reportsDir = path.resolve(__dirname, "..", "cypress", "reports");

async function run() {
  if (!fs.existsSync(reportsDir)) {
    console.log("Reports directory not found. Skipping report generation.");
    return;
  }

  const jsonFiles = fs
    .readdirSync(reportsDir)
    .filter((file) => file.endsWith(".json") && file !== "merged-report.json");

  if (jsonFiles.length === 0) {
    console.log("No mochawesome json files found. Skipping report generation.");
    return;
  }

  const report = await merge({
    files: [`${reportsDir.replace(/\\/g, "/")}/*.json`]
  });

  await marge.create(report, {
    reportDir: reportsDir,
    reportFilename: "index",
    inline: true,
    saveJson: true,
    charts: true
  });

  console.log(`HTML report generated at ${path.join(reportsDir, "index.html")}`);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
