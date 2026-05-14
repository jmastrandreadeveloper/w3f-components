import esbuild from 'esbuild';
import { readdirSync, mkdirSync } from 'fs';
import { join } from 'path';

const external = [
  'react', 'react-dom', 'react/jsx-runtime',
  'lucide-react',
  '@visx/*', 'd3-*', 'topojson-client'
];

/** Collect all .tsx/.ts entry points recursively */
function collectEntries(dir) {
  const entries = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      entries.push(...collectEntries(full));
    } else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      entries.push(full);
    }
  }
  return entries;
}

mkdirSync('./dist', { recursive: true });

const entryPoints = collectEntries('./src');

// ─── Build JS/TSX components ──────────────────────────────────────────────────
await esbuild.build({
  entryPoints,
  outbase: './src',
  outdir: './dist',
  format: 'esm',
  bundle: false,
  platform: 'browser',
  jsx: 'automatic',
  external,
  sourcemap: true,
});

console.log(`JS: Built ${entryPoints.length} files → dist/`);

// ─── Build CSS bundle (w3f.css) ───────────────────────────────────────────────
// This file is required by the init-nextjs.mjs script and copied to public/
await esbuild.build({
  entryPoints: ['./css/main_W3_V2.css'],
  bundle: true,
  outfile: './dist/w3f.css',
});

console.log('CSS: Built dist/w3f.css');
