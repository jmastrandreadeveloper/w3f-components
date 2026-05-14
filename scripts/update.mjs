#!/usr/bin/env node
/**
 * W3F Components — Script de actualización completa
 *
 * Sincroniza todos los cambios desde w3f-platform a w3f-components,
 * reconstruye el bundle CSS y opcionalmente hace commit y push.
 *
 * Uso (desde la raíz de w3f-components):
 *   node scripts/update.mjs [opciones]
 *
 * Opciones:
 *   --commit          Hace git commit con los archivos cambiados
 *   --push            Hace git push (implica --commit)
 *   --message "texto" Mensaje del commit (default: autogenerado)
 *   --dry-run         Muestra qué se haría sin ejecutarlo
 *   --no-build        Omite el paso de rebuild CSS
 *   --manual-only     Sincroniza solo el manual (docs/manual/) — rápido
 *   --platform <path> Ruta al repo w3f-platform (override del default)
 *   --help            Muestra esta ayuda
 *
 * Ejemplos:
 *   node scripts/update.mjs
 *   node scripts/update.mjs --commit
 *   node scripts/update.mjs --push --message "feat: add Tooltip component"
 *   node scripts/update.mjs --dry-run
 *   node scripts/update.mjs --manual-only
 *   node scripts/update.mjs --manual-only --commit
 *   node scripts/update.mjs --platform /ruta/a/w3f-platform
 */

import { execSync, spawnSync }          from 'child_process';
import { existsSync, cpSync, rmSync,
         mkdirSync, readFileSync,
         writeFileSync }                from 'fs';
import { join, resolve, dirname }       from 'path';
import { fileURLToPath }                from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const TARGET    = resolve(__dirname, '..');   // raíz de w3f-components

// ─── Parseo de argumentos ─────────────────────────────────────────────────────

const args     = process.argv.slice(2);
const hasFlag  = (f) => args.includes(f);
const getArg   = (f) => { const i = args.indexOf(f); return i !== -1 ? args[i + 1] : null; };

const opts = {
  commit     : hasFlag('--commit') || hasFlag('--push'),
  push       : hasFlag('--push'),
  dryRun     : hasFlag('--dry-run'),
  noBuild    : hasFlag('--no-build'),
  manualOnly : hasFlag('--manual-only'),
  message    : getArg('--message'),
  platform   : getArg('--platform'),
  help       : hasFlag('--help') || hasFlag('-h'),
};

// ─── Colores ──────────────────────────────────────────────────────────────────

const c = {
  reset  : '\x1b[0m',
  bold   : '\x1b[1m',
  dim    : '\x1b[2m',
  cyan   : '\x1b[36m',
  green  : '\x1b[32m',
  yellow : '\x1b[33m',
  red    : '\x1b[31m',
  blue   : '\x1b[34m',
};

const log    = (msg) => console.log(`  ${c.cyan}▸${c.reset} ${msg}`);
const ok     = (msg) => console.log(`  ${c.green}✓${c.reset} ${msg}`);
const warn   = (msg) => console.log(`  ${c.yellow}⚠${c.reset} ${msg}`);
const fail   = (msg) => { console.log(`  ${c.red}✗${c.reset} ${msg}`); process.exit(1); };
const header = (msg) => console.log(`\n${c.bold}${msg}${c.reset}`);
const dry    = (msg) => console.log(`  ${c.blue}[dry-run]${c.reset} ${c.dim}${msg}${c.reset}`);

// ─── Ayuda ────────────────────────────────────────────────────────────────────

if (opts.help) {
  console.log(`
${c.bold}W3F Components — Actualización completa${c.reset}

${c.dim}Sincroniza desde w3f-platform, reconstruye el CSS y opcionalmente commitea.${c.reset}

Uso:
  node scripts/update.mjs [opciones]

Opciones:
  --commit              Hace git commit con los archivos cambiados
  --push                Hace git push (implica --commit)
  --message "texto"     Mensaje del commit personalizado
  --dry-run             Muestra qué se haría sin ejecutarlo
  --no-build            Omite el paso de rebuild de dist/w3f.css
  --manual-only         Sincroniza solo el manual (docs/manual/) — rápido
  --platform <path>     Ruta al repo w3f-platform (default: hermano del repo)
  --help                Muestra esta ayuda

Ejemplos:
  node scripts/update.mjs
  node scripts/update.mjs --commit
  node scripts/update.mjs --push --message "feat: add Stepper fixes"
  node scripts/update.mjs --dry-run
  node scripts/update.mjs --manual-only
  node scripts/update.mjs --manual-only --commit --message "docs: cap 23 PageBuilder"
`);
  process.exit(0);
}

// ─── Detectar plataforma ──────────────────────────────────────────────────────

const isWindows = process.platform === 'win32';

function run(cmd, options = {}) {
  if (opts.dryRun && !options.alwaysRun) {
    dry(cmd);
    return '';
  }
  try {
    return execSync(cmd, {
      cwd: options.cwd ?? TARGET,
      stdio: options.stdio ?? 'pipe',
      encoding: 'utf8',
      shell: true,
    }).trim();
  } catch (err) {
    if (options.allowFail) return '';
    throw err;
  }
}

// ─── Resolver ruta de la plataforma ──────────────────────────────────────────

header('W3F Components — Actualización completa');
if (opts.dryRun) console.log(`  ${c.blue}Modo dry-run: no se escribirán archivos${c.reset}\n`);

// Candidatos por orden de prioridad:
const PLATFORM_CANDIDATES = [
  opts.platform,
  resolve(TARGET, '..', 'w3f-platform'),
  resolve(TARGET, '..', 'w3f-platform-main'),
  // Ruta hardcodeada del equipo de desarrollo (Windows)
  'C:/Users/w10-21h2/Documents/GitHub/w3f-platform',
].filter(Boolean);

const PLATFORM = PLATFORM_CANDIDATES.find(
  (p) => p && existsSync(join(p, 'packages', 'components', 'src')),
);

if (!PLATFORM) {
  fail(`No se encontró el repo w3f-platform. Probé:\n${PLATFORM_CANDIDATES.map(p => `    ${p}`).join('\n')}\n  Usá: node scripts/update.mjs --platform /ruta/a/w3f-platform`);
}

ok(`Plataforma: ${PLATFORM}`);

const SRC       = join(PLATFORM, 'packages', 'components', 'src');
const CSS_SRC   = join(PLATFORM, 'packages', 'css-framework', 'src');
const DOCS_SRC  = join(PLATFORM, 'packages', 'docs', 'manual');
const INIT_SRC  = join(PLATFORM, 'packages', 'components', 'scripts', 'init-nextjs.mjs');

// ─── Utilidad de copia ────────────────────────────────────────────────────────

function syncDir(src, dest, label) {
  if (!existsSync(src)) {
    warn(`No encontrado: ${src} — omitiendo ${label}`);
    return;
  }
  if (opts.dryRun) {
    dry(`cp -r "${src}" → "${dest}"`);
    return;
  }
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
  ok(label);
}

function syncFile(src, dest, label) {
  if (!existsSync(src)) {
    warn(`No encontrado: ${src} — omitiendo ${label}`);
    return;
  }
  if (opts.dryRun) {
    dry(`cp "${src}" → "${dest}"`);
    return;
  }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest);
  ok(label);
}

// ─── Modo manual-only: saltar pasos 1-3 y 5 ──────────────────────────────────

if (opts.manualOnly) {
  header('Modo --manual-only: sincronizando solo docs/manual/');

  const NIVELES = [
    'nivel-1-principiante',
    'nivel-2-intermedio',
    'nivel-3-avanzado',
    'nivel-4-experto',
  ];

  for (const nivel of NIVELES) {
    const src  = join(DOCS_SRC, nivel);
    const dest = join(TARGET, 'docs', 'manual', nivel);
    if (existsSync(src)) {
      syncDir(src, dest, `docs/manual/${nivel}`);
    } else {
      warn(`docs/manual/${nivel} — no encontrado`);
    }
  }

  syncFile(
    join(DOCS_SRC, 'README.md'),
    join(TARGET, 'docs', 'manual', 'README.md'),
    'docs/manual/README.md',
  );

  // Resumen y commit/push opcionales
  const gitStatus = run('git status --short', { alwaysRun: true, allowFail: true });
  const changed   = gitStatus.split('\n').filter(Boolean);

  header('Resumen');
  if (changed.length === 0) {
    ok('Sin cambios — el manual ya estaba al día');
  } else {
    log(`${changed.length} archivo(s) cambiado(s):`);
    changed.forEach(l => console.log(`    ${c.dim}${l}${c.reset}`));
  }

  if (opts.commit && changed.length > 0) {
    const now     = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const msg     = opts.message ?? `docs: sync manual from w3f-platform (${dateStr})`;
    if (opts.dryRun) {
      dry(`git add docs/manual/`);
      dry(`git commit -m "${msg}"`);
    } else {
      run('git add docs/manual/');
      run(`git commit -m "${msg}"`);
      ok(`Commit: ${msg}`);
    }
  }

  if (opts.push) {
    if (opts.dryRun) { dry('git push'); }
    else { run('git push', { stdio: 'inherit' }); ok('Push completado'); }
  }

  console.log(`\n${c.bold}${c.green}  Manual sincronizado.${c.reset}\n`);
  process.exit(0);
}

// ─── Paso 1: Componentes ─────────────────────────────────────────────────────

header('Paso 1 — Sincronizar componentes (src/)');

const COMPONENT_DIRS = [
  'INPUTS', 'DATADISPLAY', 'NAVIGATION', 'SURFACES',
  'FEEDBACK', 'LAYOUT', 'MEDIA', 'AUTH', 'COMMERCE', 'types',
];

for (const dir of COMPONENT_DIRS) {
  syncDir(join(SRC, dir), join(TARGET, 'src', dir), `src/${dir}`);
}

// UTILS — solo los públicos (sin studio tools)
const UTILS_PUBLIC = ['DatePicker', 'TimePicker', 'shared'];
for (const u of UTILS_PUBLIC) {
  syncDir(join(SRC, 'UTILS', u), join(TARGET, 'src', 'UTILS', u), `src/UTILS/${u}`);
}
syncFile(join(SRC, 'UTILS', 'sanitizeUrl.ts'), join(TARGET, 'src', 'UTILS', 'sanitizeUrl.ts'), 'src/UTILS/sanitizeUrl.ts');

// index.ts barrel
syncFile(join(SRC, 'index.ts'), join(TARGET, 'src', 'index.ts'), 'src/index.ts');

// ─── Paso 2: CSS Framework ────────────────────────────────────────────────────

header('Paso 2 — Sincronizar CSS framework (css/)');

const CSS_ITEMS = [
  '_base.css', '_utilities.css', '_variables.css',
  'COLORS', 'LAYOUT', 'SURFACES', 'PRESETS', 'THEMES', 'TRAITS',
];

for (const item of CSS_ITEMS) {
  const src  = join(CSS_SRC, item);
  const dest = join(TARGET, 'css', item.replace(/^_/, '_'));
  if (!existsSync(src)) { warn(`css/${item} — no encontrado`); continue; }
  if (opts.dryRun) { dry(`cp "${src}" → "${dest}"`); continue; }
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  ok(`css/${item}`);
}

syncFile(join(CSS_SRC, 'main_W3_V2.css'), join(TARGET, 'css', 'main_W3_V2.css'), 'css/main_W3_V2.css');

// Regenerar los archivos de entrada CSS (base/theme/tokens)
if (!opts.dryRun) {
  writeFileSync(join(TARGET, 'css', 'base.css'),
    `/* @w3f/components — base.css\n   Importa el CSS estructural y de layout.\n   Obligatorio para que los componentes funcionen. */\n@import './main_W3_V2.css';\n@import './_base.css';\n@import './_utilities.css';\n`);
  writeFileSync(join(TARGET, 'css', 'theme.css'),
    `/* @w3f/components — theme.css\n   Importa los presets visuales.\n   Opcional — omitir si usás tus propios tokens. */\n@import './PRESETS/index.css';\n@import './THEMES/index.css';\n`);
  writeFileSync(join(TARGET, 'css', 'tokens.css'),
    `/* @w3f/components — tokens.css\n   Declaraciones @property y custom properties tipadas. */\n@import './_variables.css';\n`);
  ok('css/base.css + theme.css + tokens.css');
} else {
  dry('Regenerar css/base.css, theme.css, tokens.css');
}

// ─── Paso 3: Scripts ──────────────────────────────────────────────────────────

header('Paso 3 — Sincronizar scripts');
syncFile(INIT_SRC, join(TARGET, 'scripts', 'init-nextjs.mjs'), 'scripts/init-nextjs.mjs');

// ─── Paso 4: Manual ───────────────────────────────────────────────────────────

header('Paso 4 — Sincronizar manual (docs/manual/)');

if (existsSync(DOCS_SRC)) {
  const NIVELES = [
    'nivel-1-principiante',
    'nivel-2-intermedio',
    'nivel-3-avanzado',
    'nivel-4-experto',
  ];

  for (const nivel of NIVELES) {
    const src  = join(DOCS_SRC, nivel);
    const dest = join(TARGET, 'docs', 'manual', nivel);
    if (existsSync(src)) {
      syncDir(src, dest, `docs/manual/${nivel}`);
    } else {
      warn(`docs/manual/${nivel} — no encontrado en plataforma`);
    }
  }

  syncFile(
    join(DOCS_SRC, 'README.md'),
    join(TARGET, 'docs', 'manual', 'README.md'),
    'docs/manual/README.md',
  );
} else {
  warn(`Manual no encontrado en ${DOCS_SRC} — omitiendo`);
}

// ─── Paso 5: Rebuild CSS ──────────────────────────────────────────────────────

header('Paso 5 — Reconstruir dist/w3f.css');

if (opts.noBuild) {
  warn('--no-build activo — omitiendo rebuild');
} else {
  try {
    log('Ejecutando: node esbuild.config.js ...');
    if (opts.dryRun) {
      dry('node esbuild.config.js');
    } else {
      run('node esbuild.config.js', { stdio: 'inherit', alwaysRun: false });
      ok('dist/w3f.css reconstruido');
    }
  } catch (err) {
    warn('El rebuild falló — continuando de todas formas');
    warn(`  ${err.message}`);
  }
}

// ─── Paso 6: Resumen de cambios ───────────────────────────────────────────────

header('Paso 6 — Resumen de cambios');

const gitStatus = run('git status --short', { alwaysRun: true, allowFail: true });
const changed   = gitStatus.split('\n').filter(Boolean);

if (changed.length === 0) {
  ok('Sin cambios — todo estaba al día');
} else {
  log(`${changed.length} archivos cambiados:`);
  changed.slice(0, 20).forEach(l => console.log(`    ${c.dim}${l}${c.reset}`));
  if (changed.length > 20) console.log(`    ${c.dim}... y ${changed.length - 20} más${c.reset}`);
}

// ─── Paso 7: Commit y push ────────────────────────────────────────────────────

if (opts.commit && changed.length > 0) {
  header('Paso 7 — Git commit');

  // Autodetectar versión para el mensaje
  let version = '';
  try {
    const pkg = JSON.parse(readFileSync(join(TARGET, 'package.json'), 'utf8'));
    version = pkg.version ? `v${pkg.version} ` : '';
  } catch { /* */ }

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const commitMsg = opts.message ?? `chore: sync from w3f-platform ${version}(${dateStr})`;

  try {
    if (opts.dryRun) {
      dry(`git add -A`);
      dry(`git commit -m "${commitMsg}"`);
    } else {
      run('git add -A');
      run(`git commit -m "${commitMsg}"`);
      ok(`Commit: ${commitMsg}`);
    }
  } catch (err) {
    warn(`Commit falló: ${err.message}`);
  }
}

if (opts.push) {
  header('Paso 8 — Git push');
  try {
    if (opts.dryRun) {
      dry('git push');
    } else {
      run('git push', { stdio: 'inherit' });
      ok('Push completado');
    }
  } catch (err) {
    warn(`Push falló: ${err.message}`);
    warn('Verificá que tenés acceso al remoto y que la rama existe.');
  }
}

// ─── Finalizado ───────────────────────────────────────────────────────────────

console.log(`
${c.bold}${c.green}  Actualización completada${c.reset}

  ${c.dim}Sincronizado:${c.reset}
    src/         ← packages/components/src/
    css/         ← packages/css-framework/src/
    scripts/     ← packages/components/scripts/
    docs/manual/ ← packages/docs/manual/
    dist/w3f.css ← reconstruido con esbuild

  ${c.dim}Próximos pasos:${c.reset}
    ${changed.length > 0 && !opts.commit ? `git add -A && git commit -m "chore: sync $(date +%Y-%m-%d)"` : ''}
    ${opts.commit && !opts.push ? 'git push' : ''}
    ${opts.push || changed.length === 0 ? 'Todo al día.' : ''}
`);
