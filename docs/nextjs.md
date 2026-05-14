# W3F Components — Guía de integración con Next.js 15

Guía completa para usar `@w3f/components` en proyectos Next.js 15 con App Router.

---

## Requisitos previos

- Next.js 15 o superior
- React 19
- Node.js 18+

---

## Instalación automática (recomendada)

Desde la raíz de tu proyecto Next.js, ejecuta el script de setup:

```bash
node node_modules/@w3f/components/scripts/init-nextjs.mjs
```

El script realiza automáticamente los 4 pasos de configuración descritos a continuación.
Es **idempotente**: se puede ejecutar varias veces sin romper nada.

---

## Instalación manual (paso a paso)

### 1. Instalar el paquete

```bash
# npm
npm install @w3f/components lucide-react

# pnpm
pnpm add @w3f/components lucide-react

# yarn
yarn add @w3f/components lucide-react

# bun
bun add @w3f/components lucide-react
```

### 2. Configurar `next.config.mjs`

W3F Components distribuye código fuente TSX sin precompilar. Next.js necesita
transpilarlo a través de webpack/SWC. Agrega la siguiente configuración:

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpila los paquetes W3F (código TSX fuente)
  transpilePackages: ['@w3f/components'],

  // Omite el type-check en el build de Next.js.
  // Los tipos siguen disponibles en tu editor.
  // Verifica con: npx tsc --noEmit
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
```

> **¿Por qué `ignoreBuildErrors`?**
> Next.js usa su propio compilador TypeScript que no resuelve correctamente las
> referencias cruzadas entre paquetes de workspace. La compilación webpack funciona
> perfectamente. Esta opción solo afecta al type-check del build, no a tu editor.

### 3. Cargar el CSS

W3F Components usa CSS moderno (`@layer`, `@property`, `grid-column: span X`) que
el post-procesador de Next.js (cssnano-simple) no soporta. La solución es servir
el CSS como archivo estático pre-compilado.

**Copiar el CSS a `public/`:**

```bash
cp node_modules/@w3f/components/dist/w3f.css public/w3f.css
```

**Actualizar `app/layout.tsx`:**

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi App',
  description: '...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* W3F Components CSS — pre-compilado, servido como asset estático */}
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> **Nota:** Cada vez que actualices `@w3f/components`, vuelve a copiar el CSS:
> ```bash
> cp node_modules/@w3f/components/dist/w3f.css public/w3f.css
> ```
> O agrega el paso a tu script de build en `package.json`:
> ```json
> "prebuild": "cp node_modules/@w3f/components/dist/w3f.css public/w3f.css"
> ```

---

## Uso básico

### Server Components vs Client Components

Todos los componentes W3F incluyen `'use client'`. Esto significa que puedes
importarlos directamente desde Server Components, pero se renderizarán en el cliente.

```tsx
// app/page.tsx — Server Component
// No necesita 'use client' porque solo importa componentes W3F
import { Card, Text, Badge } from '@w3f/components';

export default async function Page() {
  const data = await fetchData(); // fetch en el server

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
  const [loading, setLoading] = useState(false);

  return (
    <Form onSubmit={(values) => console.log(values)}>
      <Input name="email" label="Email" type="email" />
      <Input name="password" label="Contraseña" type="password" />
      <Button type="submit" loading={loading}>Ingresar</Button>
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

**Regla simple:** Si el componente reacciona a clicks o cambia de apariencia
según el estado del usuario, necesita `'use client'`.

---

## Patrones comunes

### Layout con AppBar y Drawer

```tsx
// app/components/NavShell.tsx
'use client';

import { useState } from 'react';
import {
  AppBar, AppBarLeading, AppBarTitle, AppBarTrailing,
  Drawer, Button
} from '@w3f/components';
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

```tsx
// app/layout.tsx
import NavShell from './components/NavShell';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>
        <NavShell>{children}</NavShell>
      </body>
    </html>
  );
}
```

### Providers de feedback (Alert, Snackbar, Notification)

Los providers deben estar en un Client Component que wrappee la app:

```tsx
// app/providers.tsx
'use client';

import { AlertProvider, SnackbarProvider, NotificationProvider } from '@w3f/components';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider position="top-right" maxAlerts={3}>
      <SnackbarProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </SnackbarProvider>
    </AlertProvider>
  );
}
```

```tsx
// app/layout.tsx
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Desde cualquier componente cliente:**

```tsx
'use client';

import { useAlert, useSnackbar, dispatchAlert } from '@w3f/components';

function MyComponent() {
  const { showSuccess, showDanger } = useSnackbar();

  const handleSave = () => {
    showSuccess('Guardado correctamente');
  };

  return <Button onClick={handleSave}>Guardar</Button>;
}
```

**Desde Server Actions (sin hooks):**

```ts
// app/actions.ts
'use server';

import { dispatchAlert } from '@w3f/components';

export async function saveData(formData: FormData) {
  // dispatchAlert usa CustomEvent — funciona desde server actions via revalidation
  // o despacha desde el client component que llama la action
}
```

### Form con Server Actions

```tsx
// app/components/ContactForm.tsx
'use client';

import { Form, FormField, Input, Select, Button, useSnackbar } from '@w3f/components';
import { submitContact } from '../actions';

export default function ContactForm() {
  const { showSuccess, showDanger } = useSnackbar();

  async function handleSubmit(values: Record<string, unknown>) {
    const result = await submitContact(values);
    if (result.ok) {
      showSuccess('Mensaje enviado');
    } else {
      showDanger('Error al enviar');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Nombre" name="name" required>
        <Input name="name" placeholder="Tu nombre" />
      </FormField>
      <FormField label="Asunto" name="subject">
        <Select
          name="subject"
          options={[
            { value: 'info', label: 'Información' },
            { value: 'support', label: 'Soporte' },
          ]}
        />
      </FormField>
      <Button type="submit" variant="filled" color="primary">
        Enviar
      </Button>
    </Form>
  );
}
```

```ts
// app/actions.ts
'use server';

export async function submitContact(data: Record<string, unknown>) {
  // lógica del server
  return { ok: true };
}
```

### Tabs con URL (navegación real)

```tsx
// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import DashboardTabs from './DashboardTabs';

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab ?? 'overview';
  return <DashboardTabs activeTab={activeTab} />;
}
```

```tsx
// app/dashboard/DashboardTabs.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from '@w3f/components';

export default function DashboardTabs({ activeTab }: { activeTab: string }) {
  const router = useRouter();

  const tabs = [
    { id: 'overview',  label: 'Resumen',   content: <Overview /> },
    { id: 'analytics', label: 'Analytics', content: <Analytics /> },
    { id: 'settings',  label: 'Config',    content: <Settings /> },
  ];

  return (
    <Tabs
      initialTabsContent={tabs}
      onTabChange={(tabId) => router.push(`?tab=${tabId}`)}
    />
  );
}
```

### Dark mode toggle

```tsx
// app/components/DarkModeToggle.tsx
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

### Datos del server a charts (Client Component)

Los charts usan D3/visx y siempre necesitan `'use client'`. El patrón es:
fetch en el Server Component, renderiza el chart en el Client Component.

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

import { BarChart } from '@w3f/components';

export default function SalesChart({ data }: { data: any[] }) {
  return <BarChart data={data} xKey="month" yKey="total" />;
}
```

### Componentes con `dynamic` (SSR deshabilitado)

Para componentes que requieren acceso a APIs del browser en el montaje inicial
(como `Window` o `Desktop`):

```tsx
import dynamic from 'next/dynamic';

const FloatingWindow = dynamic(
  () => import('@w3f/components').then(m => m.Window),
  { ssr: false }
);

export default function Page() {
  return <FloatingWindow title="Panel" />;
}
```

---

## Personalización de tokens CSS

Agrega tus overrides en `app/globals.css` o en un archivo CSS propio, **después** de
cargar `w3f.css`. Usa la capa `@layer w3f-overrides` para asegurar que tus estilos
siempre ganen:

```css
/* app/globals.css */
@layer w3f-overrides {
  :root {
    --w3f-primary: #7c3aed;          /* morado en lugar de azul */
    --w3f-radius-md: 12px;           /* bordes más redondeados */
    --w3f-font-sans: 'Inter', sans-serif;
  }
}
```

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // tus overrides

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

**Tokens disponibles:**

| Token | Valor por defecto | Uso |
|---|---|---|
| `--w3f-primary` | `#2563eb` | Color principal |
| `--w3f-secondary` | `#f97316` | Color secundario |
| `--w3f-success` | `#10b981` | Estado éxito |
| `--w3f-warning` | `#f59e0b` | Estado advertencia |
| `--w3f-danger` | `#ef4444` | Estado error |
| `--w3f-info` | `#06b6d4` | Estado informativo |
| `--w3f-surface` | `#ffffff` | Fondo de tarjetas |
| `--w3f-background` | `#f8fafc` | Fondo de página |
| `--w3f-radius-md` | `8px` | Radio de bordes |
| `--w3f-space-4` | `16px` | Espaciado base |

---

## Referencia de archivos generados

Después de correr el script de setup, tu proyecto queda con:

```
tu-proyecto/
├── public/
│   └── w3f.css              ← CSS compilado de W3F
├── app/
│   └── layout.tsx           ← con <link rel="stylesheet" href="/w3f.css">
└── next.config.mjs          ← con transpilePackages + ignoreBuildErrors
```

---

## Solución de problemas

### Los estilos no se aplican

Verifica que:
1. `public/w3f.css` existe y no está vacío
2. `app/layout.tsx` tiene `<link rel="stylesheet" href="/w3f.css" />`
3. El `<link>` está dentro de `<head>`, no en `<body>`

### Error: Module not found '@w3f/components'

```bash
# Verifica la instalación:
ls node_modules/@w3f/components
# Si no existe, instala:
npm install @w3f/components
```

### Error de TypeScript en el build

El `ignoreBuildErrors: true` en `next.config.mjs` debería suprimirlos.
Si persiste, verifica que el campo está en la config:

```js
typescript: {
  ignoreBuildErrors: true,
},
```

Para verificar tus propios tipos (independiente del build):
```bash
npx tsc --noEmit
```

### El CSS se rompe después de actualizar el paquete

Después de `npm update @w3f/components`, vuelve a copiar el CSS:

```bash
cp node_modules/@w3f/components/dist/w3f.css public/w3f.css
```

Para automatizarlo, agrega a `package.json`:
```json
{
  "scripts": {
    "postinstall": "cp node_modules/@w3f/components/dist/w3f.css public/w3f.css"
  }
}
```

---

## Checklist de instalación completa

- [ ] `@w3f/components` instalado en `package.json`
- [ ] `next.config.mjs` con `transpilePackages: ['@w3f/components']`
- [ ] `next.config.mjs` con `typescript: { ignoreBuildErrors: true }`
- [ ] `public/w3f.css` existe (copiado desde `node_modules/@w3f/components/dist/w3f.css`)
- [ ] `app/layout.tsx` tiene `<link rel="stylesheet" href="/w3f.css" />` en `<head>`
- [ ] Componentes interactivos tienen `'use client'` en el archivo donde se usan
