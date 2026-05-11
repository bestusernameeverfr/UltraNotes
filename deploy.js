const { execSync } = require("child_process");
const fs = require("fs");

console.log("🚀 Deploy starting...");

// bump version
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
let v = pkg.version.split(".");
v[2] = parseInt(v[2]) + 1;
pkg.version = v.join(".");
fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));

console.log("📦 version:", pkg.version);

// git steps
execSync("git add .", { stdio: "inherit" });
execSync(`git commit -m "v${pkg.version}"`, { stdio: "inherit" });
execSync("git push", { stdio: "inherit" });

// build exe
execSync("npx electron-builder", { stdio: "inherit" });

console.log("✅ DONE");