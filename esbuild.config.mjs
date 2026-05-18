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
];

// @w3f/bridge is a platform-only package — shim it with no-ops so the
// library works standalone without the bridge runtime installed.
const alias = {
  '@w3f/bridge': new URL('./scripts/bridge-shim.js', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'),
};

mkdirSync('./dist', { recursive: true });

// ─── Build JS — single CJS bundle ────────────────────────────────────────────
// CJS format ensures compatibility with Next.js Turbopack SSR context,
// which needs require()-able modules. transpilePackages in next.config handles
// the rest (tree shaking, JSX transform, etc.)
await esbuild.build({
  entryPoints: ['./src/index.ts'],
  outfile: './dist/index.js',
  format: 'cjs',
  bundle: true,
  platform: 'node',
  jsx: 'automatic',
  external,
  alias,
  sourcemap: true,
  treeShaking: true,
});

console.log('JS: Built dist/index.js (single CJS bundle)');

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
    legalComments: 'none',   // remove all comments — avoids emoji/unicode issues in parsers
  });

  // Post-process: remove invalid CSS rules with `:not(X)-suffix` selectors (malformed BEM)
  // e.g. `.w3f-input:not(.w3f-input--unstyled)-container { ... }` — missing combinator
  // These are source bugs that esbuild keeps but Turbopack's strict parser rejects.
  let css = readFileSync('./dist/w3f.css', 'utf8');
  css = css
    .split(/(?<=\})/)
    .filter(rule => !/:not\([^)]+\)-/.test(rule))
    .join('');
  writeFileSync('./dist/w3f.css', css, 'utf8');

  console.log('CSS: Built dist/w3f.css');
} finally {
  unlinkSync(tempFile);
}
