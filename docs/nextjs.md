# W3F Components — Guía de integración con Next.js

Guía completa para usar `@w3f/components` en proyectos Next.js con App Router.

---

## Requisitos previos

- Next.js 15 o superior
- React 19
- Node.js 18+

---

## Crear un proyecto nuevo (recomendado)

El script `create-w3f-app.mjs` crea un proyecto Next.js y configura todo automáticamente en 6 pasos.

### Desde el repo `w3f-components` (local)

```bash
node E:\GitHub\w3f-components\scripts\create-w3f-app.mjs mi-app
cd mi-app
npm run dev
# → http://localhost:3000  (abrir manualmente en el browser)
```

### Via npx (cuando esté publicado en npm)

```bash
npx w3f-create mi-app
```

**Qué hace el script:**

| Paso | Acción |
|------|--------|
| 1 | Crea el proyecto con `create-next-app` (TypeScript + App Router, sin Tailwind) |
| 2 | Instala `@w3f/components` desde GitHub (detecta npm/pnpm/yarn/bun) |
| 3 | Copia `dist/w3f.css` a `public/w3f.css` |
| 4 | Parchea `next.config.ts` con `transpilePackages` e `ignoreBuildErrors` |
| 5 | Reemplaza `app/layout.tsx` con versión limpia que carga el CSS |
| 6 | Genera `app/demo.tsx` y `app/page.tsx` listos para usar |

---

## Integrar en un proyecto Next.js existente

### 1. Instalar el paquete

**Desde GitHub (mientras el paquete no está publicado en npm):**

```bash
# npm
npm install git+https://github.com/jmastrandreadeveloper/w3f-components.git --legacy-peer-deps

# pnpm
pnpm add git+https://github.com/jmastrandreadeveloper/w3f-components.git

# yarn
yarn add git+https://github.com/jmastrandreadeveloper/w3f-components.git

# bun
bun add git+https://github.com/jmastrandreadeveloper/w3f-components.git
```

> El flag `--legacy-peer-deps` (npm) suprime warnings de peer dependency de `@visx`
> que declara compatibilidad con React 16-18, pero funciona con React 19.

**Desde ruta local (si tenés el repo clonado):**

```bash
npm install "file:../w3f-components"
```

### 2. Configurar `next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@w3f/components'],
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
```

> **¿Por qué `transpilePackages`?** Next.js necesita compilar el bundle de W3F
> (que incluye TSX/JSX) a través de SWC/webpack.
>
> **¿Por qué `ignoreBuildErrors`?** Next.js usa su propio compilador TypeScript
> que no resuelve correctamente las referencias cruzadas entre paquetes. La
> compilación funciona correctamente. Para verificar tus propios tipos: `npx tsc --noEmit`.

### 3. Copiar el CSS a `public/`

El CSS usa `@layer`, `@property` y otras features modernas que el post-procesador
de Next.js no soporta. Se sirve como asset estático pre-compilado.

**Linux/Mac:**
```bash
cp node_modules/@w3f/components/dist/w3f.css public/w3f.css
```

**Windows — PowerShell:**
```powershell
Copy-Item node_modules/@w3f/components/dist/w3f.css public/w3f.css
```

**Windows — CMD:**
```cmd
copy node_modules\@w3f\components\dist\w3f.css public\w3f.css
```

> Cada vez que actualices `@w3f/components`, volvé a copiar el CSS.
> Para automatizarlo en `package.json`:
> ```json
> "postinstall": "node -e \"require('fs').cpSync('node_modules/@w3f/components/dist/w3f.css','public/w3f.css')\""
> ```

### 4. Cargar el CSS en el layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

### 5. Setup automático para proyecto existente

El script `init-nextjs.mjs` detecta tu proyecto existente y aplica los pasos 2-4
de forma automática e idempotente (se puede correr varias veces sin romper nada):

```bash
node node_modules/@w3f/components/scripts/init-nextjs.mjs
```

---

## Uso básico

### Server Components vs Client Components

Los componentes W3F incluyen `'use client'` internamente. Podés importarlos desde
Server Components, pero se renderizarán en el cliente.

```tsx
// app/page.tsx — Server Component (no necesita 'use client')
import { Card, Text, Badge } from '@w3f/components';

export default async function Page() {
  const data = await fetchData();
  return (
    <Card>
      <Text element="h2">{data.title}</Text>
      <Badge color="success">Activo</Badge>
    </Card>
  );
}
```

```tsx
// app/components/LoginForm.tsx — Client Component
'use client';

import { useState } from 'react';
import { Input, Button, Form } from '@w3f/components';

export default function LoginForm() {
  return (
    <Form onSubmit={(values) => console.log(values)}>
      <Input name="email" label="Email" type="email" />
      <Input name="password" label="Contraseña" type="password" />
      <Button type="submit">Ingresar</Button>
    </Form>
  );
}
```

### Cuándo usar `'use client'`

| Componente / uso | Necesita `'use client'` |
|---|---|
| Button, Input, Select, Checkbox, Form | Sí (tienen eventos y estado) |
| Card, Text, Badge, Avatar (datos estáticos) | No (solo display) |
| Tabs, Drawer, Accordion, Menu | Sí (estado abierto/cerrado) |
| AppBar sin interacción | No |
| AppBar con menú o dark mode toggle | Sí |
| Cualquier componente que use `useState` o `useEffect` | Sí |

**Regla simple:** si el componente reacciona a clicks o cambia según el estado
del usuario, necesita `'use client'`.

---

## Patrones comunes

### Layout con AppBar y Drawer

```tsx
// app/components/NavShell.tsx
'use client';

import { useState } from 'react';
import { AppBar, AppBarLeading, AppBarTitle, Drawer, Button } from '@w3f/components';
import { Menu } from 'lucide-react';

export default function NavShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar color="primary" position="sticky">
        <AppBarLeading>
          <Button variant="ghost" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </Button>
        </AppBarLeading>
        <AppBarTitle>Mi App</AppBarTitle>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
        {/* navegación */}
      </Drawer>
      <main>{children}</main>
    </>
  );
}
```

### Charts (siempre Client Component)

Los charts usan D3/visx y siempre necesitan `'use client'`. El patrón recomendado
es fetch en el Server Component y render en el Client Component:

```tsx
// app/sales/page.tsx — Server Component
import SalesChart from './SalesChart';

export default async function SalesPage() {
  const data = await fetch('/api/sales').then(r => r.json());
  return <SalesChart data={data} />;
}
```

```tsx
// app/sales/SalesChart.tsx — Client Component
'use client';

import { Bar } from '@w3f/components';

export default function SalesChart({ data }: { data: any[] }) {
  return <Bar data={data} height={320} title="Ventas" />;
}
```

### Componentes con `dynamic` (SSR deshabilitado)

Para componentes que requieren APIs del browser en el montaje inicial:

```tsx
import dynamic from 'next/dynamic';

const FloatingWindow = dynamic(
  () => import('@w3f/components').then(m => m.Window),
  { ssr: false }
);
```

### Dark mode toggle

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@w3f/components';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('w3f-theme-dark', dark);
  }, [dark]);

  return (
    <Button variant="ghost" onClick={() => setDark(!dark)}>
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
```

---

## Personalización de tokens CSS

```css
/* app/globals.css */
@layer w3f-overrides {
  :root {
    --w3f-primary: #7c3aed;
    --w3f-radius-md: 12px;
    --w3f-font-sans: 'Inter', sans-serif;
  }
}
```

| Token | Valor por defecto | Uso |
|---|---|---|
| `--w3f-primary` | `#2563eb` | Color principal |
| `--w3f-secondary` | `#f97316` | Color secundario |
| `--w3f-success` | `#10b981` | Estado éxito |
| `--w3f-warning` | `#f59e0b` | Estado advertencia |
| `--w3f-danger` | `#ef4444` | Estado error |
| `--w3f-surface` | `#ffffff` | Fondo de tarjetas |
| `--w3f-background` | `#f8fafc` | Fondo de página |
| `--w3f-radius-md` | `8px` | Radio de bordes |
| `--w3f-space-4` | `16px` | Espaciado base |

---

## Solución de problemas

### El browser no se abre al correr `npm run dev`

Comportamiento normal de Next.js. Abrí manualmente:
```
http://localhost:3000
```

---

### Module not found: Can't resolve '@w3f/components'

**Causa:** Turbopack intenta `require()` el paquete en el contexto SSR. Un bundle
ESM (con `export {}` syntax) no puede ser `require()`d por Node.js.

**Verificación:** la primera línea de `dist/index.js` debe ser `"use strict"` (CJS).
Si empieza con `import`, el bundle está en formato ESM y hay que recompilarlo:

```bash
cd E:\GitHub\w3f-components
node esbuild.config.mjs
```

Si instalaste desde GitHub (no symlink local), reinstalá después:
```bash
npm install git+https://github.com/jmastrandreadeveloper/w3f-components.git --legacy-peer-deps
```

---

### Module not found: Can't resolve './MarkdownView.css'

Ocurre cuando copiás `CodeBlock.tsx` a tu proyecto pero `MarkdownView.css` no está
en la misma carpeta, o cuando el import usa una ruta que sale del directorio `app/`.

`CodeBlock.tsx` importa `'./MarkdownView.css'` — ambos archivos deben estar juntos:

```
app/CodeBlock.tsx       ← importa './MarkdownView.css'
app/MarkdownView.css    ← debe estar aquí, NO en la raíz del proyecto
```

**PowerShell:**
```powershell
Copy-Item MarkdownView.css app\MarkdownView.css
```

**CMD:**
```cmd
copy MarkdownView.css app\MarkdownView.css
```

Verificá que el import en `CodeBlock.tsx` sea exactamente:
```tsx
import './MarkdownView.css';   // correcto
// NO: import './../MarkdownView.css';
```

---

### Errores de tipo: `Bar`, `FlexContainer`, `ColorSchemeName` no encontrados

El bundle instalado fue compilado con una versión anterior del barrel que no
exportaba estos símbolos. Reinstalá para obtener la versión actualizada:

```bash
npm install git+https://github.com/jmastrandreadeveloper/w3f-components.git --legacy-peer-deps
cp node_modules/@w3f/components/dist/w3f.css public/w3f.css
```

---

### Los estilos no se aplican

1. Verificá que `public/w3f.css` existe y no está vacío
2. Verificá que `app/layout.tsx` tiene `<link rel="stylesheet" href="/w3f.css" />` dentro de `<head>`
3. El `<link>` debe estar en `<head>`, no en `<body>`

---

### Error de TypeScript en el build

`ignoreBuildErrors: true` en `next.config.ts` debería suprimirlos.
Para verificar tus propios tipos:
```bash
npx tsc --noEmit
```

---

### El CSS se rompe después de actualizar el paquete

Volvé a copiar el CSS después de cada actualización:

```bash
# Linux/Mac
cp node_modules/@w3f/components/dist/w3f.css public/w3f.css

# Windows PowerShell
Copy-Item node_modules/@w3f/components/dist/w3f.css public/w3f.css
```

---

## Checklist de instalación

- [ ] `@w3f/components` instalado en `package.json`
- [ ] `next.config.ts` con `transpilePackages: ['@w3f/components']`
- [ ] `next.config.ts` con `typescript: { ignoreBuildErrors: true }`
- [ ] `public/w3f.css` existe (copiado desde `node_modules/@w3f/components/dist/w3f.css`)
- [ ] `app/layout.tsx` tiene `<link rel="stylesheet" href="/w3f.css" />` en `<head>`
- [ ] Componentes interactivos tienen `'use client'`
- [ ] `dist/index.js` empieza con `"use strict"` (formato CJS — necesario para Turbopack)
