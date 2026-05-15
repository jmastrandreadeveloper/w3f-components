import esbuild from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { resolve } from 'path';

// Peer deps + heavy deps — never bundled, consumers provide them
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'lucide-react',
  '@visx/*',
  'd3-*',
  'topojson-client',
  '@w3f/bridge',
];

mkdirSync('./dist', { recursive: true });

// ─── Build JS — single ESM bundle ────────────────────────────────────────────
// bundle: true + external → all components in one file, deps left as bare imports
// Works in Node ESM, Vite, Next.js, webpack without extension issues
await esbuild.build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
  format: 'esm',
  bundle: true,
  platform: 'browser',
  jsx: 'automatic',
  external,
  sourcemap: true,
  treeShaking: true,
});

console.log('JS: Built dist/index.js (single ESM bundle)');

// ─── Build CSS bundle ─────────────────────────────────────────────────────────
const cssDir = resolve('./css');

const mainCss = readFileSync('./css/main_W3_V2.css', 'utf8');

const fixedCss = mainCss
  // Fix monorepo paths → local src/ paths (css/ and src/ are siblings)
  .replace(/\.\.\/\.\.\/components\/src\//g, '../src/')
  // Remove lines whose @import url() points to a file that doesn't exist
  .split('\n')
  .filter(line => {
    const match = line.match(/@import\s+url\(['"]?([^'")\s]+)['"]?\)/);
    if (!match) return true;
    const absPath = resolve(cssDir, match[1]);
    return existsSync(absPath);
  })
  .join('\n');

const tempFile = './css/_main_build.css';
writeFileSync(tempFile, fixedCss, 'utf8');

try {
  await esbuild.build({
    entryPoints: [tempFile],
    bundle: true,
    outfile: './dist/w3f.css',
  });
  console.log('CSS: Built dist/w3f.css');
} finally {
  unlinkSync(tempFile);
}
