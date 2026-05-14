# Capítulo 14 — Customización CSS básica

**Nivel:** 2 — Intermedio
**Capítulo:** 14 de 28

---

## ¿Qué vas a aprender?

1. Cómo sobreescribir tokens de diseño globales con CSS variables en `:root`
2. Cómo crear temas locales (scoped) para secciones específicas de la UI
3. Cómo funciona el modo oscuro con la clase `w3f-theme-dark`
4. Qué son las utility classes de W3F y cuándo usarlas
5. Cómo usar la prop `unstyled` para construir componentes desde cero

---

## Conceptos

### El sistema de tokens

W3F usa **CSS custom properties** (variables CSS) como capa de abstracción entre los valores concretos y los componentes. Todas las variables viven en `_variables.css` bajo `:root`.

```
Token abstracto         Componente lo consume
--w3f-primary  ──────>  .w3f-button--primary { background: var(--w3f-primary) }
```

Esto significa que cambiar `--w3f-primary` en un solo lugar actualiza automáticamente **todos** los componentes que usan ese token: botones, links, inputs focus ring, tabs activos, etc.

### Jerarquía de override

CSS custom properties respetan la cascada: una variable definida en un elemento hijo **reemplaza** la del padre para ese elemento y sus descendientes.

```
:root                     /* tokens globales — afectan toda la app */
└── .mi-seccion           /* override scoped — afecta solo esa sección */
    └── .w3f-button       /* override directo — afecta solo ese componente */
```

---

## Ejemplos de código

### 1. Override global — cambiar el color primario de toda la app

El lugar más simple para personalizar W3F es tu archivo CSS principal (el que importa el framework):

```css
/* styles/globals.css */

:root {
  /* Cambiar el color primario a violeta */
  --w3f-primary:     #7c3aed;
  --w3f-primary-50:  #f5f3ff;
  --w3f-primary-100: #ede9fe;
  --w3f-primary-200: #ddd6fe;
  --w3f-primary-300: #c4b5fd;
  --w3f-primary-400: #a78bfa;
  --w3f-primary-500: #8b5cf6;
  --w3f-primary-600: #7c3aed;
  --w3f-primary-700: #6d28d9;
  --w3f-primary-800: #5b21b6;
  --w3f-primary-900: #4c1d95;

  /* Cambiar la tipografía base */
  --w3f-font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Bordes más redondeados en toda la app */
  --w3f-radius:    0.5rem;
  --w3f-radius-md: 0.75rem;
  --w3f-radius-lg: 1rem;
}
```

Con solo esas líneas todos los botones, inputs, selects, tabs y badges adoptarán el color violeta.

### 2. Override scoped — tema para una sección

Podés aplicar un tema diferente a **una sola sección** de la UI sin afectar el resto:

```css
/* El panel de peligro usa rojo como "primario" */
.panel-danger-zone {
  --w3f-primary:     var(--w3f-danger);
  --w3f-primary-600: var(--w3f-danger-600);
  --w3f-primary-700: var(--w3f-danger-700);
}
```

```tsx
<div className="panel-danger-zone">
  <Stack spacing={4}>
    <Text element="h2">Zona de peligro</Text>
    {/* Este botón se ve en rojo, no en el azul global */}
    <Button variant="filled" color="primary">Eliminar cuenta</Button>
    <Button variant="outlined" color="primary">Revocar acceso</Button>
  </Stack>
</div>
```

### 3. Override de tokens de espaciado y tipografía

```css
:root {
  /* Más espacio por defecto (app para desktop, no mobile) */
  --w3f-space-4:  1.25rem;  /* era 1rem */
  --w3f-space-6:  2rem;     /* era 1.5rem */
  --w3f-space-8:  2.5rem;   /* era 2rem */

  /* Texto base más grande */
  --w3f-text-base: 1.0625rem;  /* era 1rem */
  --w3f-text-sm:   0.9375rem;  /* era 0.875rem */
}
```

### 4. Modo oscuro con `w3f-theme-dark`

W3F incluye un tema oscuro listo para usar. Solo hay que agregar la clase `w3f-theme-dark` al contenedor correcto:

```tsx
// Al body completo (app entera en dark)
document.body.classList.add('w3f-theme-dark');

// O a un contenedor específico (solo esa sección en dark)
<div className="w3f-theme-dark">
  {/* Todo lo de adentro usa el tema oscuro */}
</div>
```

El tema oscuro redefine automáticamente:

| Token | Light | Dark |
|---|---|---|
| `--w3f-background` | `#f9fafb` (gray-50) | `#111827` (gray-900) |
| `--w3f-surface` | `#ffffff` | `#1f2937` (gray-800) |
| `--w3f-surface-variant` | `#f3f4f6` (gray-100) | `#374151` (gray-700) |
| `--w3f-on-background` | `#111827` (gray-900) | `#f9fafb` (gray-50) |
| `--w3f-on-surface` | `#1f2937` (gray-800) | `#f3f4f6` (gray-100) |
| `--w3f-primary` | `#2563eb` | `#60a5fa` (más claro) |
| `--w3f-outline` | `#9ca3af` (gray-400) | `#4b5563` (gray-600) |

**Toggle de tema con React:**

```tsx
import { useState } from 'react';
import { Button } from '@w3f/components/INPUTS/Button/Button';

function AppRoot() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? 'w3f-theme-dark' : ''}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setDark(d => !d)}
      >
        {dark ? 'Modo claro' : 'Modo oscuro'}
      </Button>

      {/* El resto de la app */}
    </div>
  );
}
```

**Persistir la preferencia del usuario:**

```tsx
function useTheme() {
  const [dark, setDark] = useState(() => {
    // Leer de localStorage al iniciar
    return localStorage.getItem('w3f-theme') === 'dark';
  });

  const toggle = () => {
    setDark(d => {
      const next = !d;
      localStorage.setItem('w3f-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return { dark, toggle };
}
```

### 5. Extender el tema oscuro

Podés agregar tus propias variables al override de dark mode:

```css
/* Tu archivo de tema */
.w3f-theme-dark {
  /* Los defaults de W3F ya están, acá agregás los tuyos */
  --mi-sidebar-bg:     #0f172a;
  --mi-sidebar-text:   #cbd5e1;
  --mi-card-highlight: rgba(99, 102, 241, 0.15);
}

/* Light mode */
:root {
  --mi-sidebar-bg:     #1e293b;
  --mi-sidebar-text:   #f1f5f9;
  --mi-card-highlight: rgba(99, 102, 241, 0.08);
}
```

### 6. Utility classes

W3F incluye clases de utilidad para casos donde no vale la pena escribir CSS propio:

**Colores de fondo:**

```tsx
// Fondo semántico
<div className="w3f-bg-primary">...</div>
<div className="w3f-bg-success">...</div>
<div className="w3f-bg-danger">...</div>
<div className="w3f-bg-warning">...</div>
<div className="w3f-bg-info">...</div>

// Variantes claras (ideal para banners, alertas inline)
<div className="w3f-bg-primary-light">...</div>
<div className="w3f-bg-success-light">...</div>

// Grises específicos
<div className="w3f-bg-gray-100">...</div>
<div className="w3f-bg-gray-800">...</div>
```

**Colores de texto:**

```tsx
<p className="w3f-text-primary">Texto azul primario</p>
<p className="w3f-text-danger">Texto rojo error</p>
<p className="w3f-text-gray">Texto gris neutro</p>
<p className="w3f-text-on-surface">Texto sobre superficies</p>
<p className="w3f-text-gray-600">Texto gris oscuro</p>
```

**Colores de borde:**

```tsx
<div className="w3f-border-primary" style={{ border: '1px solid' }}>...</div>
<div className="w3f-border-danger"  style={{ border: '1px solid' }}>...</div>
```

**Display:**

```tsx
<span className="w3f-block">Bloque</span>
<span className="w3f-inline-block">Inline-block</span>
<div  className="w3f-flex">Flex container</div>
<div  className="w3f-hidden">Oculto</div>
```

**Posición:**

```tsx
<div className="w3f-relative">
  <span className="w3f-absolute">Posición absoluta dentro del padre</span>
</div>
<header className="w3f-sticky" style={{ top: 0 }}>Header sticky</header>
```

**Opacidad y z-index:**

```tsx
<div className="w3f-opacity-50">50% opaco</div>
<div className="w3f-opacity-0">Invisible (pero ocupa espacio)</div>

<div className="w3f-z-10">z-index: 10</div>
<div className="w3f-z-50">z-index: 50</div>
```

**Accesibilidad:**

```tsx
{/* Texto visible solo para screen readers */}
<span className="w3f-sr-only">Cerrar diálogo</span>
```

**Cuándo usar utilities vs CSS propio:**

| Caso | Enfoque recomendado |
|---|---|
| Color semántico sobre un elemento | Utility class (`w3f-bg-danger`) |
| Layout complejo o reutilizable | CSS propio con tokens |
| Sección con tema distinto | CSS scoped + override de vars |
| Efecto visual único | CSS propio |
| Visibilidad rápida | `w3f-hidden`, `w3f-block` |

### 7. La prop `unstyled` — construir desde cero

Algunos componentes admiten la prop `unstyled`. Cuando está activa, el componente retiene su **estructura y comportamiento** pero descarta todos los estilos visuales (colores, bordes, padding, sombras).

```tsx
{/* Botón normal — tiene todos los estilos W3F */}
<Button variant="filled" color="primary">Normal</Button>

{/* Botón unstyled — solo estructura, sin visual */}
<Button unstyled className="mi-boton-custom">Mi diseño</Button>
```

Con `unstyled` solo recibís las clases estructurales mínimas (`w3f-button w3f-button--unstyled`) más las que pasés en `className`. Sos libre de estilizarlo completamente:

```css
/* styles/mi-boton-custom.css */
.mi-boton-custom {
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 2rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 150ms ease;
}

.mi-boton-custom:hover {
  opacity: 0.85;
}
```

> **Nota:** La prop `unstyled` está disponible en Button, Input y otros componentes del catálogo. Revisá la referencia rápida de cada componente para confirmarlo.

---

## Ejercicio práctico

**Objetivo:** crear una página de pricing con dos temas — uno claro (default) y uno oscuro — y una sección destacada con tema "premium" (color violeta).

### Paso 1 — Preparar los temas

```css
/* styles/pricing.css */

/* Tema premium: violeta */
.pricing-premium {
  --w3f-primary:     #7c3aed;
  --w3f-primary-50:  #f5f3ff;
  --w3f-primary-100: #ede9fe;
  --w3f-primary-600: #7c3aed;
  --w3f-primary-700: #6d28d9;
  --w3f-surface:     #faf5ff;
}

/* Clase para el badge de precio destacado */
.price-tag {
  font-size: var(--w3f-text-3xl);
  font-weight: 700;
  color: var(--w3f-primary);
}

.price-period {
  font-size: var(--w3f-text-sm);
  color: var(--w3f-gray-500);
}
```

### Paso 2 — Componente de pricing card

```tsx
import { Card }   from '@w3f/components/DATADISPLAY/Card/Card';
import { Stack }  from '@w3f/components/LAYOUT/Stack/Stack';
import { Button } from '@w3f/components/INPUTS/Button/Button';
import { Badge }  from '@w3f/components/DATADISPLAY/Badge/Badge';
import { Text }   from '@w3f/components/DATADISPLAY/Text/Text';
import './pricing.css';

interface PlanCardProps {
  name:     string;
  price:    number;
  features: string[];
  premium?: boolean;
}

function PlanCard({ name, price, features, premium = false }: PlanCardProps) {
  return (
    <div className={premium ? 'pricing-premium' : ''}>
      <Card variant={premium ? 'elevated' : 'outlined'}>
        <Stack spacing={4}>
          {premium && (
            <Badge color="primary" variant="filled">
              Más popular
            </Badge>
          )}
          <Text element="h3">{name}</Text>
          <div>
            <span className="price-tag">${price}</span>
            <span className="price-period">/mes</span>
          </div>
          <Stack spacing={2}>
            {features.map(f => (
              <Text key={f} element="p">✓ {f}</Text>
            ))}
          </Stack>
          <Button
            variant={premium ? 'filled' : 'outlined'}
            color="primary"
            fullWidth
          >
            {premium ? 'Empezar ahora' : 'Elegir plan'}
          </Button>
        </Stack>
      </Card>
    </div>
  );
}
```

### Paso 3 — Página completa con toggle de modo oscuro

```tsx
import { useState } from 'react';
import { Stack }    from '@w3f/components/LAYOUT/Stack/Stack';
import { Grid, GridAreaItem } from '@w3f/components/LAYOUT/Grid/Grid';
import { Button }   from '@w3f/components/INPUTS/Button/Button';
import { Text }     from '@w3f/components/DATADISPLAY/Text/Text';

const PLANS = [
  {
    name: 'Starter',
    price: 9,
    features: ['5 proyectos', '2 usuarios', 'Soporte email'],
    premium: false,
  },
  {
    name: 'Pro',
    price: 29,
    features: ['Proyectos ilimitados', '10 usuarios', 'Soporte prioritario', 'API access'],
    premium: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    features: ['Todo lo de Pro', 'Usuarios ilimitados', 'SLA 99.9%', 'Onboarding dedicado'],
    premium: false,
  },
];

export default function PricingPage() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={dark ? 'w3f-theme-dark' : ''}
      style={{ minHeight: '100vh', background: 'var(--w3f-background)', padding: '2rem' }}
    >
      <Stack spacing={8} align="center">
        {/* Header */}
        <Stack spacing={2} align="center">
          <Text element="h1">Planes y precios</Text>
          <Text element="p">Elegí el plan que mejor se adapte a tu equipo.</Text>
          <Button
            variant="ghost"
            color="primary"
            onClick={() => setDark(d => !d)}
          >
            {dark ? 'Cambiar a claro' : 'Cambiar a oscuro'}
          </Button>
        </Stack>

        {/* Cards de pricing */}
        <Grid
          templateColumns="repeat(3, 1fr)"
          style={{ gap: '1.5rem', maxWidth: '900px', width: '100%' }}
        >
          {PLANS.map(plan => (
            <GridAreaItem key={plan.name}>
              <PlanCard {...plan} />
            </GridAreaItem>
          ))}
        </Grid>
      </Stack>
    </div>
  );
}
```

**Resultado esperado:**
- Los tres cards están alineados en grid de 3 columnas
- El card "Pro" tiene el tema violeta (`pricing-premium`): botón violeta, surface levemente lila, badge
- Al hacer click en "Cambiar a oscuro" toda la página, incluidos los cards, pasa al modo oscuro
- El card Pro en modo oscuro mantiene el violeta porque sus overrides locales tienen mayor especificidad

---

## Referencia rápida

### Tokens globales por categoría

| Categoría | Variables |
|---|---|
| Color primario | `--w3f-primary` (+ 50→900) |
| Color secundario | `--w3f-secondary` (+ 50→900) |
| Semánticos | `--w3f-success`, `--w3f-warning`, `--w3f-danger`, `--w3f-info` (+ 50→900) |
| Grises | `--w3f-gray-50` → `--w3f-gray-900` |
| Superficies | `--w3f-background`, `--w3f-surface`, `--w3f-surface-variant` |
| Texto sobre superficies | `--w3f-on-background`, `--w3f-on-surface`, `--w3f-on-primary` |
| Bordes | `--w3f-outline`, `--w3f-outline-variant` |
| Espaciado | `--w3f-space-1` (4px) → `--w3f-space-16` (64px) |
| Tipografía | `--w3f-font-family`, `--w3f-text-4xs` → `--w3f-text-3xl` |
| Radius | `--w3f-radius-none` → `--w3f-radius-full` (9999px) |
| Sombras | `--w3f-shadow-sm` → `--w3f-shadow-xl` |
| Transiciones | `--w3f-transition-fast` (150ms) / `--w3f-transition-normal` (300ms) / `--w3f-transition-slow` (500ms) |

### Utility classes

| Categoría | Clases |
|---|---|
| Background | `w3f-bg-{primary\|secondary\|success\|warning\|danger\|info\|gray}` |
| Background light | `w3f-bg-{semantic}-light` |
| Background grises | `w3f-bg-gray-{50\|100\|200\|300\|400\|600\|700\|800\|900}` |
| Texto semántico | `w3f-text-{primary\|secondary\|success\|warning\|danger\|info\|gray}` |
| Texto sobre superficie | `w3f-text-on-{primary\|surface\|background}` |
| Texto grises | `w3f-text-gray-{50→900}` |
| Borde | `w3f-border-{primary\|secondary\|success\|warning\|danger\|info\|gray}` |
| Display | `w3f-block`, `w3f-inline-block`, `w3f-inline`, `w3f-flex`, `w3f-inline-flex`, `w3f-hidden` |
| Posición | `w3f-relative`, `w3f-absolute`, `w3f-fixed`, `w3f-sticky` |
| Opacidad | `w3f-opacity-{0\|25\|30\|50\|75\|100}` |
| Z-index | `w3f-z-{0\|1\|2\|10\|20\|30\|40\|50}` |
| Accesibilidad | `w3f-sr-only`, `w3f-not-sr-only` |

### Modo oscuro

| Qué aplicar | Dónde | Efecto |
|---|---|---|
| `w3f-theme-dark` en `<body>` | Toda la app en oscuro | Global |
| `w3f-theme-dark` en un `<div>` | Solo esa sección en oscuro | Scoped |
| Override dentro de `.w3f-theme-dark {}` | Ajustar variables en dark mode | Parcial |

### Prop `unstyled`

| Componente | Soporta `unstyled` | Clases emitidas |
|---|---|---|
| `<Button unstyled>` | Sí | `w3f-button w3f-button--unstyled` + `className` |
| Otros componentes | Revisar types.ts | Varía por componente |

---

## En Next.js

La customización CSS de W3F es completamente compatible con Next.js — no hay fricciones porque trabaja con CSS plano, no con CSS-in-JS ni APIs de browser.

### CSS global — `globals.css` o `layout.tsx`

Los overrides de tokens van en el CSS global de tu app Next.js:

```css
/* app/globals.css */
:root {
  --w3f-primary: #7c3aed;
  --w3f-radius-md: 12px;
}

.w3f-theme-dark {
  --w3f-primary: #a78bfa;
}
```

```tsx
// app/layout.tsx
import './globals.css'  // ← estilos de tu app (después del w3f.css del <link>)
```

El orden importa: `w3f.css` (via `<link>` en `<head>`) se carga antes que tu CSS global, así tus overrides tienen precedencia correctamente.

### Dark mode con estado — necesita `'use client'`

El toggle de dark mode que cambia una clase en el DOM necesita `'use client'`:

```tsx
// app/components/dark-mode-toggle.tsx
'use client'

import { useState, useEffect } from 'react'
import Button from '@w3f/components/INPUTS/Button/Button'

export function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('w3f-theme-dark', dark)
  }, [dark])

  return (
    <Button variant="icon" onClick={() => setDark(d => !d)}>
      {dark ? '☀️' : '🌙'}
    </Button>
  )
}
```

### Clases utilitarias y scoped themes

Las clases `w3f-*` y los overrides de CSS vars scoped funcionan en cualquier contexto — Server Component, Client Component, SSR, SSG. Son CSS puro, no necesitan JavaScript.

---

## Siguiente paso

[Capítulo 15 — Inputs completos](../nivel-3-avanzado/15-inputs-completos.md)

En el siguiente capítulo exploramos el catálogo completo de inputs: DatePicker, TimePicker, Autocomplete con async, TransferList, RangeSlider y Rating — incluyendo sus integraciones con Form.
