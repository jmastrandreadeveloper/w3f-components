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

## Cómo usa el equipo la librería

### Instalar

```bash
# Via git URL (recomendado para repo privado)
npm install git+https://github.com/tu-org/w3f-components.git

# Via ruta local (durante desarrollo)
npm install file:../w3f-components
```

### Importar componentes

Todos los componentes se importan desde el índice principal:

```ts
import { Button, Input, Select, Stack, Badge, Note } from '@w3f/components'
```

> **Importante:** NO usar path imports individuales — solo funcionan named imports del índice:
> ```ts
> // CORRECTO
> import { Button } from '@w3f/components'
>
> // NO — no funciona con el bundle compilado
> import Button from '@w3f/components/INPUTS/Button/Button'
> ```

### Importar CSS

```ts
// En el entry point del proyecto (main.tsx, layout.tsx, _app.tsx, etc.)
import '@w3f/components/dist/w3f.css'
```

### Customizar estilos

Sobreescribir los tokens CSS después de importar `w3f.css`:

```css
:root {
  --w3f-primary: #tu-color;
  --w3f-radius-md: 8px;
  --w3f-font-family: 'Tu Fuente', sans-serif;
}
```

O editar directamente los archivos en `css/` del repo (disponibles como fuente).

---

## Resultado en el repo w3f-components

Después de cada sync, el repo tiene:

```
dist/
  index.js       ← todos los componentes en un bundle ESM (676 KB)
  index.js.map   ← sourcemaps
  types/         ← declaraciones TypeScript (.d.ts) para autocomplete
    index.d.ts
    INPUTS/Button/Button.d.ts
    ...
  w3f.css        ← CSS completo bundleado (844 KB)

css/             ← CSS fuente para customización
  _variables.css ← tokens CSS custom properties
  TRAITS/        ← clases utilitarias
  THEMES/        ← temas de ejemplo
  ...
```

---

## Notas

- El build tarda ~30-60 segundos (JS rápido, tsc más lento)
- Los warnings de CSS (`Unexpected "-list__panel"`) son falsos positivos de esbuild — el CSS compilado es correcto
- Los type warnings de tsc son no bloqueantes — los `.d.ts` se generan igual
- `src/` nunca aparece en el repo del equipo (está en `.gitignore`)
- Probado en Next.js 15 con App Router — build OK, 193 kB primera carga
