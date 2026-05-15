import esbuild from 'esbuild';
import { readdirSync, mkdirSync, readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';

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
// bundle: false → each file compiled individually, bare imports left untouched
// (no need for external when not bundling)
await esbuild.build({
  entryPoints,
  outbase: './src',
  outdir: './dist',
  format: 'esm',
  bundle: false,
  platform: 'browser',
  jsx: 'automatic',
  sourcemap: true,
});

console.log(`JS: Built ${entryPoints.length} files → dist/`);

// ─── Build CSS bundle (w3f.css) ───────────────────────────────────────────────
// main_W3_V2.css references monorepo paths (../../components/src/...) and
// W3Studio CSS files that don't exist in this repo. Fix before bundling.

const mainCss = readFileSync('./css/main_W3_V2.css', 'utf8');

const cssDir = resolve('./css');

const fixedCss = mainCss
  // Fix monorepo paths → local src/ paths (css/ and src/ are siblings)
  .replace(/\.\.\/\.\.\/components\/src\//g, '../src/')
  // Remove lines whose @import url() points to a file that doesn't exist
  .split('\n')
  .filter(line => {
    const match = line.match(/@import\s+url\(['"]?([^'")\s]+)['"]?\)/);
    if (!match) return true; // keep non-import lines
    const importPath = match[1];
    const absPath = resolve(cssDir, importPath);
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
