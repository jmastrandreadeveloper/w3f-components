#!/usr/bin/env bash
# ============================================================
# sync-from-platform.sh
# Sincroniza los componentes, CSS, scripts y manual
# desde w3f-platform a w3f-components.
#
# Uso (desde la raiz de w3f-components):
#   bash scripts/sync-from-platform.sh
#
# O desde w3f-platform:
#   bash ../w3f-components/scripts/sync-from-platform.sh
# ============================================================

set -e

PLATFORM="C:/Users/w10-21h2/Documents/GitHub/w3f-platform"
TARGET="C:/Users/w10-21h2/Documents/GitHub/w3f-components"
SRC="$PLATFORM/packages/components/src"
CSS_SRC="$PLATFORM/packages/css-framework/src"
DOCS_SRC="$PLATFORM/packages/docs/manual"

echo "Sincronizando w3f-platform -> w3f-components..."

# -----------------------------------------------------------
# 1. COMPONENTES — categorias completas
# -----------------------------------------------------------
for dir in INPUTS DATADISPLAY NAVIGATION SURFACES FEEDBACK LAYOUT MEDIA AUTH COMMERCE types; do
  echo "  [src] $dir"
  rm -rf "$TARGET/src/$dir"
  cp -r "$SRC/$dir" "$TARGET/src/$dir"
done

# index.ts raiz
cp "$SRC/index.ts" "$TARGET/src/index.ts"

# -----------------------------------------------------------
# 2. UTILS — solo los componentes publicos (NO studio tools)
# -----------------------------------------------------------
echo "  [src] UTILS (DatePicker, TimePicker, sanitizeUrl, shared)"
mkdir -p "$TARGET/src/UTILS"
rm -rf "$TARGET/src/UTILS/DatePicker" "$TARGET/src/UTILS/TimePicker"
cp -r "$SRC/UTILS/DatePicker" "$TARGET/src/UTILS/DatePicker"
cp -r "$SRC/UTILS/TimePicker" "$TARGET/src/UTILS/TimePicker"
cp -r "$SRC/UTILS/shared"     "$TARGET/src/UTILS/shared"
cp "$SRC/UTILS/sanitizeUrl.ts" "$TARGET/src/UTILS/sanitizeUrl.ts"

# -----------------------------------------------------------
# 3. CSS FRAMEWORK — excluye W3STUDIO, LAB, MUIX
# -----------------------------------------------------------
echo "  [css] CSS framework"
mkdir -p "$TARGET/css"

for item in _base.css _utilities.css _variables.css COLORS LAYOUT SURFACES PRESETS THEMES TRAITS; do
  src_path="$CSS_SRC/$item"
  if [ -e "$src_path" ]; then
    dest="$TARGET/css/$(basename $item)"
    rm -rf "$dest"
    if [ -d "$src_path" ]; then
      cp -r "$src_path" "$dest"
    else
      cp "$src_path" "$dest"
    fi
    echo "    css/$item"
  fi
done

# Archivo main CSS del framework
cp "$CSS_SRC/main_W3_V2.css" "$TARGET/css/main_W3_V2.css"

# -----------------------------------------------------------
# 4. CSS de entrada (base/theme/tokens) — generados
# -----------------------------------------------------------
cat > "$TARGET/css/base.css" << 'CSS'
/* @w3f/components — base.css
   Importa el CSS estructural y de layout del framework.
   Obligatorio para que los componentes funcionen. */
@import './main_W3_V2.css';
@import './_base.css';
@import './_utilities.css';
CSS

cat > "$TARGET/css/theme.css" << 'CSS'
/* @w3f/components — theme.css
   Importa los presets visuales (colores, sombras, radius).
   Opcional — omitir si usas tus propios tokens CSS. */
@import './PRESETS/index.css';
@import './THEMES/index.css';
CSS

cat > "$TARGET/css/tokens.css" << 'CSS'
/* @w3f/components — tokens.css
   Declaraciones @property de los contratos CSS.
   Incluye todos los --w3f-* custom properties tipados. */
@import './_variables.css';
CSS

# -----------------------------------------------------------
# 5. SCRIPTS — init-nextjs.mjs (setup script for users)
# -----------------------------------------------------------
echo "  [scripts] init-nextjs.mjs"
mkdir -p "$TARGET/scripts"
cp "$PLATFORM/packages/components/scripts/init-nextjs.mjs" "$TARGET/scripts/init-nextjs.mjs"

# -----------------------------------------------------------
# 6. MANUAL — todos los capitulos (docs/manual/)
# -----------------------------------------------------------
echo "  [docs] Manual de usuario (caps 01-22+)"
mkdir -p "$TARGET/docs/manual"
rm -rf "$TARGET/docs/manual/nivel-1-principiante"
rm -rf "$TARGET/docs/manual/nivel-2-intermedio"
rm -rf "$TARGET/docs/manual/nivel-3-avanzado"
rm -rf "$TARGET/docs/manual/nivel-4-experto"

cp -r "$DOCS_SRC/nivel-1-principiante" "$TARGET/docs/manual/nivel-1-principiante"
cp -r "$DOCS_SRC/nivel-2-intermedio"   "$TARGET/docs/manual/nivel-2-intermedio"
cp -r "$DOCS_SRC/nivel-3-avanzado"     "$TARGET/docs/manual/nivel-3-avanzado"
cp -r "$DOCS_SRC/nivel-4-experto"      "$TARGET/docs/manual/nivel-4-experto"
cp    "$DOCS_SRC/README.md"            "$TARGET/docs/manual/README.md"

echo ""
echo "Sincronizacion completada."
echo "  Componentes: $TARGET/src/"
echo "  CSS:         $TARGET/css/"
echo "  Scripts:     $TARGET/scripts/"
echo "  Manual:      $TARGET/docs/manual/"
