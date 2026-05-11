import esbuild from 'esbuild';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const external = [
  'react', 'react-dom', 'react/jsx-runtime',
  'lucide-react',
  '@visx/*', 'd3-*', 'topojson-client'
];

/** Collect all .tsx/.ts entry points recursively */
function collectEntries(dir, base = dir) {
  const entries = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      entries.push(...collectEntries(full, base));
    } else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      entries.push(full);
    }
  }
  return entries;
}

const entryPoints = collectEntries('./src');

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

console.log(`Built ${entryPoints.length} files to dist/`);
