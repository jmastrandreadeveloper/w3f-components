# Capítulo 03 — Integración con Next.js

**Nivel:** Principiante
**Tiempo estimado de lectura:** 25 minutos

---

## ¿Qué vas a aprender?

- Por qué los componentes W3F funcionan en Next.js sin modificar su código
- Qué es `"use client"` y por qué todos los componentes lo llevan
- Cómo configurar un proyecto Next.js para usar `@w3f/components`
- Cómo manejar el CSS del framework en Next.js
- La diferencia entre Server Components y Client Components en el contexto de W3F

---

## ¿Por qué Next.js?

Vite (el entorno de desarrollo del monorepo) es excelente para SPAs y herramientas internas.
Pero muchos proyectos necesitan lo que Next.js agrega:

- **SSR / SSG**: pre-renderizado en servidor para mejor SEO y tiempo de carga inicial
- **App Router**: sistema de rutas basado en el filesystem, layouts anidados
- **Server Components**: componentes que corren solo en el servidor, sin JS al cliente
- **Image Optimization**: optimización automática de imágenes
- **API Routes**: backend en el mismo proyecto sin servidor separado

W3F está diseñado para funcionar en ambos entornos.

---

## Conceptos clave: `"use client"`

En Next.js App Router (Next.js 13+) existen dos tipos de componentes:

| Tipo | Dónde corre | Puede usar hooks? | Puede usar eventos? |
|---|---|---|---|
| **Server Component** | Solo servidor | No | No |
| **Client Component** | Servidor + cliente | Si | Si |

Los componentes W3F usan hooks (`useState`, `useContext`, `useEffect`) y manejan eventos
(`onClick`, `onChange`). Por eso son **Client Components obligatoriamente**.

Para declarar un componente como Client Component, Next.js requiere la directiva:

```tsx
'use client'
```

como primera línea del archivo.

**Todos los archivos `.tsx` de `@w3f/components` llevan esta directiva.**
Eso significa que podés importarlos directamente en páginas Next.js, sin ninguna configuración extra.

### ¿Afecta a Vite?

No. Vite ignora la directiva `'use client'` — no existe en el estándar de JavaScript,
es una convención de React Server Components. En Vite, el código funciona exactamente igual.

---

## Estructura del app Next.js en el monorepo

El monorepo incluye una app Next.js lista para usar en `apps/nextjs/`:

```
apps/nextjs/
├── app/
│   ├── layout.tsx            <- layout raíz (Server Component)
│   ├── page.tsx              <- página principal (Server Component)
│   ├── components-showcase.tsx  <- demo con componentes W3F (Client Component)
│   └── globals.css           <- estilos globales de la app
├── public/
│   └── w3f.css               <- CSS del framework pre-compilado
├── next.config.mjs           <- configuración de Next.js
├── tsconfig.json             <- TypeScript con paths de workspace
└── package.json
```

---

## Configuración

### `next.config.mjs`

El archivo más importante es `next.config.mjs`:

```js
const nextConfig = {
  // Transpila los workspace packages que tienen source TSX/TS sin compilar.
  // Sin esto, Next.js no puede procesar los archivos del monorepo.
  transpilePackages: ['@w3f/components', '@w3f/w3fussion', '@w3f/bridge'],

  // El type-checker de Next.js no puede resolver tipos de workspace packages
  // anidados. La compilación webpack funciona perfectamente; el type check
  // se ejecuta por separado con `pnpm type-check`.
  typescript: {
    ignoreBuildErrors: true,
  },
};
```

**`transpilePackages`** es la clave: le indica a Next.js que procese el source TSX/TS
de esos paquetes en lugar de intentar importarlos como módulos ya compilados.

### `tsconfig.json`

El tsconfig mapea los aliases de workspace:

```json
{
  "compilerOptions": {
    "paths": {
      "@w3f/components": ["../../packages/components/src/index.ts"],
      "@w3f/components/*": ["../../packages/components/src/*"],
      "@w3f/bridge": ["../../packages/bridge/src/index.ts"],
      "@w3f/bridge/*": ["../../packages/bridge/src/*"]
    }
  }
}
```

---

## El CSS del framework en Next.js

Aquí hay una diferencia importante respecto a Vite.

**En Vite**, importamos el CSS directamente y Vite lo procesa:
```tsx
// apps/demo/src/main.tsx
import '@w3f/w3fussion/main_W3_V2.css';
```

**En Next.js**, no hacemos esto. El motivo técnico: el minificador CSS de Next.js
(`cssnano-simple`) no soporta algunas sintaxis CSS modernas del framework
(`@layer`, `grid-column: span X / span X`). En lugar de eso, el CSS se pre-compila
con esbuild y se sirve como archivo estático.

### Cómo funciona

El CSS se genera con este comando:

```bash
# Desde apps/nextjs/
pnpm css:build
```

Esto corre esbuild que toma `main_W3_V2.css` (con todos sus `@import`),
lo bundlea en un único archivo y lo guarda en `public/w3f.css`.

Luego en el layout raíz lo referenciamos con un `<link>`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Cuándo regenerar el CSS

Cada vez que actualizás `@w3f/w3fussion` (el CSS framework), regenerá el bundle:

```bash
pnpm css:build   # solo el CSS
pnpm build       # css:build + next build (en producción)
```

> El script `build` en `package.json` ya corre `css:build` antes de `next build`
> automáticamente.

---

## Importar componentes

La importación de componentes es idéntica a Vite, por path directo:

```tsx
// Componentes individuales (recomendado para tree-shaking)
import Button from '@w3f/components/INPUTS/Button/Button'
import Input  from '@w3f/components/INPUTS/Input/Input'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import Note   from '@w3f/components/DATADISPLAY/Note/Note'
```

---

## Server Components vs Client Components con W3F

Este es el patrón correcto para combinarlos:

```tsx
// app/page.tsx — Server Component (NO lleva 'use client')
// Puede hacer fetch, leer la DB, acceder al filesystem
import MiFormulario from './mi-formulario';

export default async function Page() {
  const data = await fetch('/api/datos').then(r => r.json()); // server-side

  return (
    <main>
      <h1>Mi App</h1>
      <MiFormulario datos={data} />  {/* Client Component */}
    </main>
  );
}
```

```tsx
// app/mi-formulario.tsx — Client Component
'use client'

import { useState } from 'react';
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import Input  from '@w3f/components/INPUTS/Input/Input'
import Button from '@w3f/components/INPUTS/Button/Button'

export default function MiFormulario({ datos }) {
  const [valor, setValor] = useState('');

  return (
    <Stack gap="1rem">
      <Input label="Nombre" value={valor} onChange={e => setValor(e.target.value)} />
      <Button variant="raised" color="primary">Guardar</Button>
    </Stack>
  );
}
```

### Regla de oro

> Los componentes W3F siempre van en archivos Client Component (`'use client'`).
> Los Server Components los importan y usan como si fueran cualquier componente.
> Next.js se encarga del resto.

---

## Levantar el servidor de desarrollo

```bash
# Desde la raíz del monorepo:
pnpm --filter @w3f/nextjs dev
# → http://localhost:3000

# O desde apps/nextjs/:
pnpm dev
# → http://localhost:3000
```

La app de demos Vite sigue corriendo en `http://localhost:5173` (puerto 5173).
Las dos apps pueden correr simultáneamente sin conflicto.

---

## Usar W3F en un proyecto Next.js externo

Si tenés un proyecto Next.js propio (no el monorepo), el setup es:

### 1. Instalar el paquete

```bash
# Desde el repo publicado (cuando esté disponible):
npm install @w3f/components

# O desde el repo git directamente:
npm install git+https://github.com/TU_USUARIO/w3f-components.git
```

### 2. Configurar `next.config.mjs`

```js
const nextConfig = {
  transpilePackages: ['@w3f/components'],
};
export default nextConfig;
```

### 3. Agregar el CSS

Descargá el `w3f.css` del paquete o generalo vos con esbuild, y servilo desde `public/`.
En el layout, agregá `<link rel="stylesheet" href="/w3f.css" />`.

### 4. Importar componentes

```tsx
'use client'
import Button from '@w3f/components/INPUTS/Button/Button'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
```

---

## Resumen

| Aspecto | Vite (monorepo) | Next.js |
|---|---|---|
| CSS | `import '@w3f/w3fussion/...'` | `<link href="/w3f.css">` (pre-compilado) |
| Componentes | `import X from '@w3f/components/...'` | igual |
| `'use client'` | ignorado | requerido (ya incluido) |
| Transpile | Vite lo hace solo | `transpilePackages` en next.config |
| Puerto dev | 5173 | 3000 |

---

## Siguiente paso

[Capítulo 04 — Primer componente](04-primer-componente.md)

Vas a conocer el sistema de props de W3F a través del componente `Button`,
y aprender a combinarlo con `Stack` para construir tu primera UI.
