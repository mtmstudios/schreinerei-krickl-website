import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, cp, readdir } from "fs/promises";
import { join } from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("copying build output to project root for Mittwald deployment...");
  const buildDir = "dist/public";

  const skipDirs = new Set(["node_modules", ".git", "dist", "client", "server", "shared", "script", "attached_assets", ".internal-docs", "references", ".local"]);
  const copyFiles = new Set(["index.html", "favicon.png", "robots.txt", "logo.webp", ".htaccess", ".user.ini"]);

  const entries = await readdir(buildDir, { withFileTypes: true });
  for (const entry of entries) {
    const src = join(buildDir, entry.name);
    const dest = join(".", entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) {
        await rm(dest, { recursive: true, force: true });
        await cp(src, dest, { recursive: true });
        console.log(`  copied directory: ${entry.name}/`);
      }
    } else {
      if (copyFiles.has(entry.name)) {
        await cp(src, dest);
        console.log(`  copied file: ${entry.name}`);
      }
    }
  }

  console.log("done! Files ready for Mittwald deployment.");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
