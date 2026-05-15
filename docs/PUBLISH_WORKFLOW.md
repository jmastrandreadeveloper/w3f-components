# W3F Components — Workflow de publicación

## Concepto

El repo `w3f-components` es de **solo distribución** — nunca tiene código fuente TSX.
El código vive en `w3f-platform` (privado). El workflow compila y publica el resultado.

```
w3f-platform/  (privado, solo tú)
    ↓  bash publish-sync.sh --commit --push
w3f-components/  (equipo, solo dist/ compilado)
```

---

## Comando único — lo que usarás siempre

Desde la raíz de `w3f-platform`:

```bash
bash packages/components/scripts/publish-sync.sh --commit --push
```

Eso hace todo en un solo paso:
1. Copia `src/` temporalmente para compilar
2. Compila JS (esbuild) + tipos TypeScript (tsc) + CSS bundleado
3. Borra `src/` (no queda en el repo)
4. Hace commit en `w3f-components`
5. Hace push al remote

---

## Variantes del comando

| Qué querés hacer | Comando |
|---|---|
| Solo compilar (verificar que el build funciona) | `bash packages/components/scripts/publish-sync.sh` |
| Compilar + commit (sin push) | `bash packages/components/scripts/publish-sync.sh --commit` |
| Compilar + commit + push | `bash packages/components/scripts/publish-sync.sh --commit --push` |

---

## Qué decirle a Claude para que lo haga

Si estás en una sesión de Claude Code, podés escribir directamente:

> "Compilá y subí w3f-components"

o más específico:

> "Corré el publish-sync con commit y push"

Claude va a ejecutar:
```bash
bash packages/components/scripts/publish-sync.sh --commit --push
```

---

## Resultado en el repo w3f-components

Después de cada sync, el repo tiene:

```
dist/
  index.js          ← todos los componentes compilados (ESM)
  index.js.map      ← sourcemaps
  INPUTS/           ← archivos individuales por componente
  DATADISPLAY/
  ...
  types/            ← declaraciones TypeScript (.d.ts)
    index.d.ts
    INPUTS/Button/Button.d.ts
    ...
  w3f.css           ← CSS completo bundleado (844 KB)

css/                ← CSS fuente para customización
  _variables.css    ← tokens CSS custom properties
  TRAITS/           ← clases utilitarias
  THEMES/           ← temas de ejemplo
  ...
```

---

## Cómo instala el equipo

```bash
# Via git URL (recomendado para repo privado)
npm install git+https://github.com/tu-org/w3f-components.git

# Via ruta local (durante desarrollo)
npm install file:../w3f-components
```

En el proyecto:
```ts
import { Button, Input, Select } from '@w3f/components'
import '@w3f/components/dist/w3f.css'
```

Para customizar estilos (sobrescribir tokens):
```css
:root {
  --w3f-primary: #tu-color;
  --w3f-radius-md: 8px;
  --w3f-font-family: 'Tu Fuente', sans-serif;
}
```

---

## Notas

- El build tarda ~30-60 segundos (JS rápido, tsc más lento)
- Los warnings de CSS (`Unexpected "-list__panel"`) son falsos positivos de esbuild — el CSS generado es correcto
- Los 147 type warnings de tsc son no bloqueantes — los `.d.ts` se generan igual
- `src/` nunca aparece en el repo del equipo (está en `.gitignore`)
