#!/usr/bin/env node
/**
 * W3F Components — Next.js 15 Setup Script
 *
 * Usage (from your Next.js project root):
 *   node node_modules/@w3f/components/scripts/init-nextjs.mjs
 *
 * What it does:
 *   1. Installs @w3f/components + lucide-react
 *   2. Patches next.config.mjs (transpilePackages + ignoreBuildErrors)
 *   3. Copies pre-built w3f.css → public/w3f.css
 *   4. Adds <link rel="stylesheet" href="/w3f.css"> to app/layout.tsx
 *
 * Idempotent: safe to run multiple times.
 */

import { execSync }                                              from 'child_process';
import { existsSync, readFileSync, writeFileSync, copyFileSync,
         mkdirSync }                                            from 'fs';
import { join, resolve, relative }                              from 'path';
import { fileURLToPath }                                        from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const cwd       = process.cwd();

// ─── Console helpers ──────────────────────────────────────────────────────────

const c = {
  reset  : '\x1b[0m',
  bold   : '\x1b[1m',
  dim    : '\x1b[2m',
  cyan   : '\x1b[36m',
  green  : '\x1b[32m',
  yellow : '\x1b[33m',
  red    : '\x1b[31m',
};

const log    = (msg) => console.log(`  ${c.cyan}▸${c.reset} ${msg}`);
const ok     = (msg) => console.log(`  ${c.green}✓${c.reset} ${msg}`);
const warn   = (msg) => console.log(`  ${c.yellow}⚠${c.reset} ${msg}`);
const fail   = (msg) => console.log(`  ${c.red}✗${c.reset} ${msg}`);
const header = (msg) => console.log(`\n${c.bold}${msg}${c.reset}`);
const dim    = (msg) => console.log(`  ${c.dim}${msg}${c.reset}`);

// ─── Utilities ────────────────────────────────────────────────────────────────

function detectPM() {
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'bun.lockb')))      return 'bun';
  if (existsSync(join(cwd, 'yarn.lock')))      return 'yarn';
  return 'npm';
}

function installCmd(pm, packages) {
  const list = packages.join(' ');
  switch (pm) {
    case 'pnpm': return `pnpm add ${list}`;
    case 'yarn': return `yarn add ${list}`;
    case 'bun':  return `bun add ${list}`;
    default:     return `npm install ${list}`;
  }
}

function rel(p) {
  return relative(cwd, p).replace(/\\/g, '/');
}

// ─── Banner ───────────────────────────────────────────────────────────────────

console.log(`
${c.bold}${c.cyan}  W3F Components — Next.js 15 Setup${c.reset}
  ${c.dim}────────────────────────────────────${c.reset}
`);

// ─── Validate: must be a Next.js project ─────────────────────────────────────

header('Checking project...');

const pkgJsonPath = join(cwd, 'package.json');
if (!existsSync(pkgJsonPath)) {
  fail('No package.json found. Run this script from your Next.js project root.');
  process.exit(1);
}

const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };

if (!allDeps.next) {
  fail('"next" is not in your dependencies. Are you in a Next.js project root?');
  process.exit(1);
}

ok(`Next.js ${allDeps.next} project detected`);

// ─── Step 1: Install packages ─────────────────────────────────────────────────

header('Step 1 — Install packages');

const pm = detectPM();
log(`Package manager: ${c.cyan}${pm}${c.reset}`);

const toInstall = [];
if (!allDeps['@w3f/components']) toInstall.push('@w3f/components');
if (!allDeps['lucide-react'])    toInstall.push('lucide-react');

if (toInstall.length === 0) {
  ok('@w3f/components and lucide-react are already installed');
} else {
  log(`Installing: ${toInstall.join(', ')}`);
  try {
    execSync(installCmd(pm, toInstall), { stdio: 'inherit', cwd });
    ok('Packages installed');
  } catch {
    fail('Installation failed. Install manually:');
    fail(`  ${installCmd(pm, toInstall)}`);
    process.exit(1);
  }
}

// ─── Step 2: Copy CSS to public/ ─────────────────────────────────────────────

header('Step 2 — Set up W3F CSS');

const publicDir = join(cwd, 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
  log('Created public/ directory');
}

const cssTarget = join(publicDir, 'w3f.css');

// Candidate sources in priority order (installed package first):
const cssCandidates = [
  join(cwd, 'node_modules', '@w3f', 'components', 'dist', 'w3f.css'),
  join(cwd, 'node_modules', '@w3f', 'components', 'dist', 'main_W3_V2.css'),
  // Fallback for local dev / workspace setups
  resolve(__dirname, '..', 'dist', 'w3f.css'),
];

let cssCopied = false;
for (const src of cssCandidates) {
  if (existsSync(src)) {
    copyFileSync(src, cssTarget);
    ok(`Copied w3f.css  (from: ${rel(src)})`);
    cssCopied = true;
    break;
  }
}

if (!cssCopied) {
  warn('Pre-built w3f.css not found in node_modules.');
  warn('Build it manually and re-run this script:');
  dim('  cd node_modules/@w3f/components && node esbuild.config.js');
  warn('Or copy any pre-built w3f.css into your public/ folder manually.');
}

// ─── Step 3: Patch next.config ────────────────────────────────────────────────

header('Step 3 — Configure next.config');

const configCandidates = ['next.config.mjs', 'next.config.js', 'next.config.ts'];
const configFile = configCandidates.find((f) => existsSync(join(cwd, f)));

if (!configFile) {
  writeFileSync(
    join(cwd, 'next.config.mjs'),
    `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required: transpile W3F source TSX packages
  transpilePackages: ['@w3f/components'],

  // Suppress TypeScript build errors from nested workspace types.
  // Verify types separately with: npx tsc --noEmit
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
`,
  );
  ok('Created next.config.mjs with W3F settings');
} else {
  const configPath = join(cwd, configFile);
  let content  = readFileSync(configPath, 'utf8');
  let modified = false;

  // transpilePackages
  if (!content.includes('@w3f/components')) {
    if (/transpilePackages\s*:\s*\[/.test(content)) {
      content  = content.replace(
        /transpilePackages\s*:\s*\[/,
        `transpilePackages: ['@w3f/components', `,
      );
    } else {
      content  = content.replace(
        /(const nextConfig\s*=\s*\{)/,
        `$1\n  transpilePackages: ['@w3f/components'],`,
      );
    }
    modified = true;
  }

  // typescript.ignoreBuildErrors
  if (!content.includes('ignoreBuildErrors')) {
    if (/typescript\s*:\s*\{/.test(content)) {
      content  = content.replace(
        /typescript\s*:\s*\{/,
        `typescript: {\n    ignoreBuildErrors: true,`,
      );
    } else {
      content  = content.replace(
        /(const nextConfig\s*=\s*\{)/,
        `$1\n  typescript: { ignoreBuildErrors: true },`,
      );
    }
    modified = true;
  }

  if (modified) {
    writeFileSync(configPath, content, 'utf8');
    ok(`Patched ${configFile}`);
  } else {
    ok(`${configFile} already has W3F settings`);
  }
}

// ─── Step 4: Patch app/layout ─────────────────────────────────────────────────

header('Step 4 — Add CSS link to layout');

const layoutCandidates = [
  join(cwd, 'app',     'layout.tsx'),
  join(cwd, 'app',     'layout.jsx'),
  join(cwd, 'src', 'app', 'layout.tsx'),
  join(cwd, 'src', 'app', 'layout.jsx'),
];

const layoutFile = layoutCandidates.find(existsSync);

const LINK_TAG   = `<link rel="stylesheet" href="/w3f.css" />`;
const LINK_BLOCK =
  `        {/* W3F Components CSS — pre-compiled, served as static asset */}\n` +
  `        ${LINK_TAG}`;

if (!layoutFile) {
  warn('Could not find app/layout.tsx. Add the CSS link manually:');
  dim(`  ${LINK_TAG}`);
} else {
  let layout = readFileSync(layoutFile, 'utf8');

  if (layout.includes('w3f.css')) {
    ok(`CSS link already present in ${rel(layoutFile)}`);
  } else {
    let injected = false;

    if (/<head[^>]*>/.test(layout)) {
      layout   = layout.replace(/<head([^>]*)>/, `<head$1>\n${LINK_BLOCK}`);
      injected = true;
    } else if (layout.includes('</head>')) {
      layout   = layout.replace('</head>', `${LINK_BLOCK}\n      </head>`);
      injected = true;
    } else if (/<body[^>]*>/.test(layout)) {
      layout   = layout.replace(/<body([^>]*)>/, `<body$1>\n${LINK_BLOCK}`);
      injected = true;
      warn('No <head> found — CSS link injected inside <body> (move to <head> for best practice)');
    }

    if (injected) {
      writeFileSync(layoutFile, layout, 'utf8');
      ok(`Added CSS link to ${rel(layoutFile)}`);
    } else {
      warn(`Could not auto-patch ${rel(layoutFile)}. Add manually inside <head>:`);
      dim(`  ${LINK_TAG}`);
    }
  }
}

// ─── Done ─────────────────────────────────────────────────────────────────────

console.log(`
${c.bold}${c.green}  Setup complete!${c.reset}

  You can now import W3F components in your Next.js app:

  ${c.dim}// app/page.tsx${c.reset}
  ${c.cyan}'use client'${c.reset}
  import { Button, Input, Card } from ${c.cyan}'@w3f/components'${c.reset}

  export default function Page() {
    return <Button variant="filled" color="primary">Hello W3F!</Button>
  }

  ${c.yellow}Note:${c.reset} components that use state, events or context need ${c.cyan}'use client'${c.reset}
  Pure display components (Text, Badge, Avatar with static data) can be Server Components.

  ${c.dim}Full guide: node_modules/@w3f/components/docs/nextjs.md${c.reset}
`);
