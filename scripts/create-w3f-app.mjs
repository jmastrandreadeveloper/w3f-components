#!/usr/bin/env node
/**
 * W3F Components — Create Next.js App
 *
 * Usage:
 *   npx w3f-create                   (interactive — asks for project name)
 *   npx w3f-create my-app            (non-interactive)
 *
 * What it does:
 *   1. Asks for the project name (or reads it from argv)
 *   2. Runs create-next-app with TypeScript + App Router, no Tailwind
 *   3. Installs @w3f/components from GitHub
 *   4. Copies pre-built w3f.css → public/w3f.css
 *   5. Patches next.config to add transpilePackages + ignoreBuildErrors
 *   6. Patches app/layout.tsx to load /w3f.css
 *   7. Creates a starter demo component and page
 */

import { execSync }                                         from 'child_process';
import { existsSync, readFileSync, writeFileSync,
         copyFileSync, mkdirSync }                          from 'fs';
import { join, resolve }                                    from 'path';
import { fileURLToPath }                                    from 'url';
import * as readline                                        from 'readline';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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
const fail   = (msg) => { console.log(`  ${c.red}✗${c.reset} ${msg}`); process.exit(1); };
const header = (msg) => console.log(`\n${c.bold}${msg}${c.reset}`);
const dim    = (msg) => console.log(`  ${c.dim}${msg}${c.reset}`);

// ─── Utilities ────────────────────────────────────────────────────────────────

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function detectPM() {
  if (existsSync(join(process.cwd(), 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(process.cwd(), 'bun.lockb')))      return 'bun';
  if (existsSync(join(process.cwd(), 'yarn.lock')))      return 'yarn';
  return 'npm';
}

function run(cmd, cwd) {
  execSync(cmd, { stdio: 'inherit', cwd });
}

// ─── Banner ───────────────────────────────────────────────────────────────────

console.log(`
${c.bold}${c.cyan}  W3F Components — Create Next.js App${c.reset}
  ${c.dim}──────────────────────────────────────${c.reset}
`);

// ─── Step 0: Project name ─────────────────────────────────────────────────────

let projectName = process.argv[2]?.trim();

if (!projectName) {
  projectName = await ask(`  ${c.cyan}?${c.reset} Project name: `);
}

if (!projectName) {
  fail('Project name is required.');
}

if (!/^[a-z0-9_-]+$/i.test(projectName)) {
  fail(`Invalid project name "${projectName}". Use only letters, numbers, hyphens, and underscores.`);
}

const targetDir = join(process.cwd(), projectName);

if (existsSync(targetDir)) {
  fail(`Directory "${projectName}" already exists. Choose a different name or delete it first.`);
}

// ─── Step 1: create-next-app ──────────────────────────────────────────────────

header('Step 1 — Create Next.js project');
log(`Running create-next-app for "${projectName}"...`);

try {
  run(
    [
      'npx create-next-app@latest', projectName,
      '--typescript',
      '--app',
      '--no-tailwind',
      '--no-src-dir',
      '--no-import-alias',
      '--eslint',
      '--yes',
    ].join(' '),
    process.cwd(),
  );
  ok('Next.js project created');
} catch {
  fail('create-next-app failed. Make sure you have Node.js and internet access.');
}

// ─── Step 2: Install @w3f/components ─────────────────────────────────────────

header('Step 2 — Install @w3f/components');

const pm = detectPM();

const W3F_SOURCE = 'git+https://github.com/jmastrandreadeveloper/w3f-components.git';

const installCmd = {
  npm  : `npm install ${W3F_SOURCE} --legacy-peer-deps`,
  pnpm : `pnpm add ${W3F_SOURCE}`,
  yarn : `yarn add ${W3F_SOURCE}`,
  bun  : `bun add ${W3F_SOURCE}`,
}[pm];

log(`Installing @w3f/components (${pm})...`);

try {
  run(installCmd, targetDir);
  ok('@w3f/components installed');
} catch {
  fail(`Install failed. Try manually:\n    cd ${projectName}\n    ${installCmd}`);
}

// ─── Step 3: Copy w3f.css to public/ ─────────────────────────────────────────

header('Step 3 — Set up W3F CSS');

const publicDir = join(targetDir, 'public');
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

const cssTarget = join(publicDir, 'w3f.css');

const cssCandidates = [
  join(targetDir, 'node_modules', '@w3f', 'components', 'dist', 'w3f.css'),
  join(targetDir, 'node_modules', '@w3f', 'components', 'dist', 'index.css'),
  resolve(__dirname, '..', 'dist', 'w3f.css'),
];

let cssCopied = false;
for (const src of cssCandidates) {
  if (existsSync(src)) {
    copyFileSync(src, cssTarget);
    ok(`Copied w3f.css`);
    cssCopied = true;
    break;
  }
}

if (!cssCopied) {
  warn('Pre-built w3f.css not found. Build it manually:');
  dim(`  cd ${projectName}`);
  dim('  npx esbuild node_modules/@w3f/components/css/main_W3_V2.css --bundle --outfile=public/w3f.css');
}

// ─── Step 4: Patch next.config ────────────────────────────────────────────────

header('Step 4 — Configure next.config');

const configCandidates = ['next.config.ts', 'next.config.mjs', 'next.config.js'];
const configFile       = configCandidates.find((f) => existsSync(join(targetDir, f)));

if (!configFile) {
  writeFileSync(
    join(targetDir, 'next.config.mjs'),
`/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@w3f/components'],
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
`,
  );
  ok('Created next.config.mjs with W3F settings');
} else {
  const configPath = join(targetDir, configFile);
  let content  = readFileSync(configPath, 'utf8');
  let modified = false;

  if (!content.includes('@w3f/components')) {
    if (/transpilePackages\s*:\s*\[/.test(content)) {
      content = content.replace(
        /transpilePackages\s*:\s*\[/,
        `transpilePackages: ['@w3f/components', `,
      );
    } else {
      content = content.replace(
        /(const nextConfig[^=]*=\s*\{)/,
        `$1\n  transpilePackages: ['@w3f/components'],`,
      );
    }
    modified = true;
  }

  if (!content.includes('ignoreBuildErrors')) {
    if (/typescript\s*:\s*\{/.test(content)) {
      content = content.replace(
        /typescript\s*:\s*\{/,
        `typescript: {\n    ignoreBuildErrors: true,`,
      );
    } else {
      content = content.replace(
        /(const nextConfig[^=]*=\s*\{)/,
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

// ─── Step 5: Patch app/layout.tsx ────────────────────────────────────────────

header('Step 5 — Add CSS link to layout');

const layoutCandidates = [
  join(targetDir, 'app', 'layout.tsx'),
  join(targetDir, 'app', 'layout.jsx'),
  join(targetDir, 'src', 'app', 'layout.tsx'),
  join(targetDir, 'src', 'app', 'layout.jsx'),
];

const layoutFile = layoutCandidates.find(existsSync);
const LINK_TAG   = `<link rel="stylesheet" href="/w3f.css" />`;

if (!layoutFile) {
  warn('Could not find app/layout.tsx. Add the CSS link manually inside <head>:');
  dim(`  ${LINK_TAG}`);
} else {
  let layout = readFileSync(layoutFile, 'utf8');

  if (layout.includes('w3f.css')) {
    ok('CSS link already present in layout');
  } else {
    writeFileSync(
      layoutFile,
`import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${projectName}',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
`,
    );
    ok('Replaced layout.tsx with clean W3F version');
  }
}

// ─── Step 6: Create starter demo ─────────────────────────────────────────────

header('Step 6 — Create starter demo');

const appDir = existsSync(join(targetDir, 'src', 'app'))
  ? join(targetDir, 'src', 'app')
  : join(targetDir, 'app');

writeFileSync(
  join(appDir, 'demo.tsx'),
`'use client'

import { useState } from 'react';
import { Stack, Button, Badge } from '@w3f/components';

export default function Demo() {
  const [count, setCount] = useState(0);

  return (
    <Stack gap="1rem" style={{ padding: '2rem' }}>
      <h1>${projectName}</h1>
      <Stack horizontal gap="0.5rem">
        <Button variant="raised" color="primary" onClick={() => setCount(c => c + 1)}>+1</Button>
        <Button variant="outline" color="secondary" onClick={() => setCount(0)}>Reset</Button>
      </Stack>
      <p>Contador: <Badge color="primary">{count}</Badge></p>
    </Stack>
  );
}
`,
);

writeFileSync(
  join(appDir, 'page.tsx'),
`import Demo from './demo';

export default function HomePage() {
  return <Demo />;
}
`,
);

ok('Created app/demo.tsx and app/page.tsx');

// ─── Done ─────────────────────────────────────────────────────────────────────

console.log(`
${c.bold}${c.green}  ✓ Project ready!${c.reset}

  ${c.dim}Next steps:${c.reset}

    ${c.cyan}cd ${projectName}${c.reset}
    ${c.cyan}npm run dev${c.reset}

  Then open ${c.bold}http://localhost:3000${c.reset}

  ${c.yellow}Tip:${c.reset} Components that use state or events need ${c.cyan}'use client'${c.reset} at the top.
`);
