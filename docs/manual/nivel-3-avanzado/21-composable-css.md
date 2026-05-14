# Capítulo 21 — Composable CSS y sistema de capas

**Nivel:** Avanzado
**Último update:** 2026-05-14

---

## ¿Qué vas a aprender?

1. La arquitectura de 5 capas CSS (`@layer`) de W3F y por qué existe
2. La separación entre CSS estructural y CSS visual (preset)
3. El prop `unstyled` y cómo usar componentes sin estilos predeterminados
4. El sistema de traits: clases CSS composables para construir apariencias custom
5. Cómo crear temas de componente con CSS vars

---

## Conceptos

### El problema que resuelve `@layer`

Sin `@layer`, el orden de los `@import` y la especificidad de los selectores determina qué regla gana. Esto genera conflictos cuando:

- Tu CSS global sobreescribe el CSS de W3F (o viceversa)
- Querés customizar un componente sin usar `!important`
- Cargás hojas de estilo en distintos momentos (Server vs Client en Next.js)

CSS Cascade Layers (`@layer`) soluciona esto declarando un orden de prioridad **explícito** entre capas. Las capas definidas después tienen más prioridad, independientemente del orden de importación o de la especificidad de los selectores.

### Las 5 capas de W3F

En `main_W3_V2.css`, la primera línea del framework declara:

```css
@layer w3f-reset, w3f-structural, w3f-traits, w3f-presets, w3f-overrides;
```

El orden de menor a mayor prioridad:

```
w3f-reset → w3f-structural → w3f-traits → w3f-presets → w3f-overrides
```

| Capa | Contenido | Prioridad |
|---|---|---|
| `w3f-reset` | Variables CSS, reset, utilidades, colores | Menor |
| `w3f-structural` | Layout y comportamiento de cada componente | ↑ |
| `w3f-traits` | Clases composables (color, tamaño, radio, etc.) | ↑ |
| `w3f-presets` | Apariencia visual por defecto de cada componente | ↑ |
| `w3f-overrides` | Tu CSS custom de overrides | Mayor |

**Implicación clave:** cualquier CSS que escribas en `w3f-overrides` siempre gana, sin importar la especificidad de los selectores del framework.

### Diagrama de capas

```
┌─────────────────────────────────────────────────┐
│  w3f-overrides   ← Tu CSS custom siempre gana   │  (mayor prioridad)
├─────────────────────────────────────────────────┤
│  w3f-presets     ← Apariencia visual W3F         │
├─────────────────────────────────────────────────┤
│  w3f-traits      ← Clases composables            │
├─────────────────────────────────────────────────┤
│  w3f-structural  ← Layout y estructura           │
├─────────────────────────────────────────────────┤
│  w3f-reset       ← Variables y reset             │  (menor prioridad)
└─────────────────────────────────────────────────┘
```

---

## CSS Estructural vs CSS Visual

Cada componente tiene sus estilos divididos en **dos archivos separados**:

### `Button.structural.css` — solo layout

```css
/* Solo define: display, flex, cursor, transitions */
.w3f-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  cursor: var(--w3f-btn-cursor, pointer);
  transition: background-color var(--w3f-transition-fast), ...;
}

.w3f-button__content {
  display: flex;
  align-items: center;
  gap: var(--w3f-btn-content-gap, var(--w3f-space-2));
}
```

El CSS estructural define **cómo funciona** el componente: su layout interno, el cursor, las transiciones de interacción. No define colores, radios, fondos ni tipografía.

### `Button.preset.css` — solo visual

```css
/* Gated con :not(.w3f-button--unstyled) */
.w3f-button:not(.w3f-button--unstyled) {
  background-color: var(--w3f-btn-bg);
  border-radius: var(--w3f-btn-radius-tl) var(--w3f-btn-radius-tr) ...;
  padding: var(--w3f-btn-padding-top) var(--w3f-btn-padding-right) ...;
  color: var(--w3f-btn-text-color);
  font-size: var(--w3f-btn-font-size);
  font-weight: var(--w3f-btn-font-weight);
}
```

El CSS visual define **cómo se ve** el componente, siempre dentro de un selector `:not(.w3f-button--unstyled)`. Esto es lo que activa o desactiva el prop `unstyled`.

### La regla de la puerta

Todos los estilos visuales están "detrás de una puerta" que se abre por defecto:

```
Sin unstyled:   .w3f-button                    → puerta abierta → preset activo
Con unstyled:   .w3f-button.w3f-button--unstyled → puerta cerrada → solo structural
```

---

## El prop `unstyled`

La mayoría de los componentes W3F aceptan `unstyled` como prop:

```tsx
// Con estilos visuales por defecto (comportamiento normal)
<Button color="primary">Guardar</Button>

// Sin estilos visuales — solo estructura funcional
<Button unstyled onClick={handleClick}>
  Mi botón completamente custom
</Button>
```

Con `unstyled`, el botón:
- **Conserva**: `display: inline-flex`, `cursor: pointer`, `transition`
- **Pierde**: colores, padding, border-radius, tipografía, sombras

Esto te da un componente que **funciona** (accesibilidad, eventos, estados) pero que podés estilizar desde cero.

### Cuándo usar `unstyled`

| Caso de uso | Recomendación |
|---|---|
| Customización leve (color, radio) | CSS vars o traits — no uses `unstyled` |
| Customización moderada (padding, sombras) | CSS vars del componente |
| Diseño completamente diferente al preset | `unstyled` + tus propias clases |
| Integrar W3F en un design system existente | `unstyled` + traits del design system |

### Componentes que soportan `unstyled`

Button, Chip, Badge, Tag, Alert, Input, Select, Checkbox, RadioButton, Slider, Rating, SlideToggle, Card, Avatar, Accordion, Tabs, AppBar, Drawer, Stepper, SpeedDial y la mayoría de los componentes del framework.

---

## El sistema de traits

Las **trait classes** son clases CSS composables que vivien en la capa `w3f-traits`. Son independientes de cualquier componente: podés aplicarlas a cualquier elemento HTML o a componentes `unstyled`.

### Las 9 categorías de traits

```
TRAITS/
├── _color-variants.css  ← filled | ghost | outlined | soft × 6 colores
├── _sizing.css          ← xs | sm | md | lg | xl
├── _radius.css          ← rounded-none ... rounded-full
├── _shadows.css         ← shadow-sm | shadow | shadow-md | shadow-lg | shadow-xl
├── _effects.css         ← opacity, blur, brightness
├── _spacing.css         ← p-{0-10}, px-{0-10}, py-{0-10}, m-{0-10}
├── _typography.css      ← text-xs ... text-4xl, font-light ... font-black
├── _transitions.css     ← transition-fast | transition | transition-slow
└── _glow.css            ← glow-primary | glow-success | etc.
```

### 1. Color variants — el más usado

Patrón: `.w3f-{estilo}-{color}`

| Estilo | Descripción | Ejemplo |
|---|---|---|
| `filled` | Fondo sólido, texto blanco | `.w3f-filled-primary` |
| `ghost` | Fondo transparente, texto de color | `.w3f-ghost-danger` |
| `outlined` | Borde de color, fondo transparente | `.w3f-outlined-success` |
| `soft` | Fondo muy suave (100), texto oscuro (700) | `.w3f-soft-warning` |

Colores disponibles: `primary`, `secondary`, `success`, `warning`, `danger`, `info`

```css
/* Lo que hace .w3f-filled-primary: */
.w3f-filled-primary {
  background-color: var(--w3f-primary);
  color: var(--w3f-on-primary);
}

/* Lo que hace .w3f-soft-danger: */
.w3f-soft-danger {
  background-color: var(--w3f-danger-100);
  color: var(--w3f-danger-700);
}
```

Para activar hover en filled, combinás con `.w3f-hoverable`:

```tsx
<Button unstyled className="w3f-filled-primary w3f-hoverable w3f-rounded-md w3f-size-md">
  Botón custom
</Button>
```

### 2. Sizing

```css
.w3f-size-xs { padding: var(--w3f-space-1) var(--w3f-space-2);  font-size: var(--w3f-text-xs); }
.w3f-size-sm { padding: var(--w3f-space-1) var(--w3f-space-4);  font-size: var(--w3f-text-xs); }
.w3f-size-md { padding: var(--w3f-space-2) var(--w3f-space-6);  font-size: var(--w3f-text-sm); }
.w3f-size-lg { padding: var(--w3f-space-3) var(--w3f-space-8);  font-size: var(--w3f-text-base); }
.w3f-size-xl { padding: var(--w3f-space-4) var(--w3f-space-10); font-size: var(--w3f-text-lg); }
```

### 3. Radius

```
.w3f-rounded-none   → 0
.w3f-rounded-sm     → var(--w3f-radius-sm)    /* 2px */
.w3f-rounded        → var(--w3f-radius)        /* 4px */
.w3f-rounded-md     → var(--w3f-radius-md)     /* 6px */
.w3f-rounded-lg     → var(--w3f-radius-lg)     /* 8px */
.w3f-rounded-xl     → var(--w3f-radius-xl)     /* 12px */
.w3f-rounded-2xl    → var(--w3f-radius-2xl)    /* 16px */
.w3f-rounded-3xl    → var(--w3f-radius-3xl)    /* 24px */
.w3f-rounded-full   → 9999px
```

---

## Ejemplos de código

### Ejemplo 1 — Botón totalmente custom con traits

```tsx
// 'use client'

function MiBoton({ children, variante = 'primary' }) {
  return (
    <Button
      unstyled
      className={`
        w3f-filled-${variante}
        w3f-hoverable
        w3f-rounded-xl
        w3f-size-md
      `}
    >
      {children}
    </Button>
  )
}

// Uso:
<MiBoton variante="success">Confirmar</MiBoton>
<MiBoton variante="danger">Eliminar</MiBoton>
```

### Ejemplo 2 — Chip custom con traits combinadas

```tsx
// 'use client'

// Un chip que es un div estilizado con traits — sin componente Chip
function EtiquetaEstado({ estado }) {
  const claseColor = {
    activo: 'w3f-soft-success',
    inactivo: 'w3f-soft-danger',
    pendiente: 'w3f-soft-warning',
  }[estado]

  return (
    <span className={`${claseColor} w3f-rounded-full w3f-size-xs`}
          style={{ display: 'inline-block' }}>
      {estado}
    </span>
  )
}
```

### Ejemplo 3 — Override via `w3f-overrides`

Usás `@layer w3f-overrides` en tu CSS para asegurar que tu código siempre gana:

```css
/* mi-app.css */
@layer w3f-overrides {
  /* Este selector tiene baja especificidad, pero al estar en w3f-overrides
     siempre gana contra cualquier cosa en w3f-presets o w3f-traits */
  .w3f-button {
    font-family: 'Mi Fuente Especial', sans-serif;
    letter-spacing: 0.05em;
  }

  /* Solo afecta botones dentro de mi sección de marketing */
  .seccion-hero .w3f-button {
    border-radius: 2px;
    text-transform: uppercase;
  }
}
```

### Ejemplo 4 — Componente `unstyled` + CSS propio

```tsx
// 'use client'
// MiCard.tsx

import './MiCard.css'

export function MiCard({ titulo, children }) {
  return (
    <Card unstyled className="mi-card">
      <div className="mi-card__header">{titulo}</div>
      <div className="mi-card__body">{children}</div>
    </Card>
  )
}
```

```css
/* MiCard.css — diseño completamente custom */
.mi-card {
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.mi-card__header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.5rem 2rem;
  font-weight: 700;
}

.mi-card__body {
  padding: 2rem;
}
```

### Ejemplo 5 — Temas de componente con CSS vars

Un "tema de componente" es una clase CSS que sobreescribe las vars específicas de un componente:

```css
/* temas.css */

/* Tema "Océano" para Chip */
.chip-tema-oceano {
  --w3f-chip-bg: #0ea5e9;
  --w3f-chip-color: #fff;
  --w3f-chip-radius: 4px;
  --w3f-chip-border-color: #0284c7;
}

/* Tema "Bosque" para Button */
.btn-tema-bosque {
  --w3f-btn-bg: #16a34a;
  --w3f-btn-text-color: #fff;
  --w3f-btn-radius-tl: 2px;
  --w3f-btn-radius-tr: 2px;
  --w3f-btn-radius-br: 2px;
  --w3f-btn-radius-bl: 2px;
}
```

```tsx
// 'use client'

// Aplicar el tema al componente
<Chip className="chip-tema-oceano">Deploy</Chip>

<Button className="btn-tema-bosque">Confirmar</Button>

// También podés aplicar el tema a un contenedor
// y afecta a todos los chips dentro
<div className="chip-tema-oceano">
  <Chip>Feature</Chip>
  <Chip>Bug</Chip>
  <Chip>Hotfix</Chip>
</div>
```

### Ejemplo 6 — Combinación completa: `unstyled` + traits + vars

```tsx
// 'use client'
// SistemaDiseno.tsx — integrando W3F en un design system existente

// Botón primario del design system custom
export function DsButton({ variant, size, children, ...props }) {
  // Mapeamos el design system propio a traits W3F
  const colorTrait = {
    brand: 'w3f-filled-primary',
    destructive: 'w3f-filled-danger',
    neutral: 'w3f-outlined-secondary',
    subtle: 'w3f-ghost-secondary',
  }[variant] ?? 'w3f-filled-primary'

  const sizeTrait = {
    compact: 'w3f-size-xs',
    default: 'w3f-size-sm',
    large: 'w3f-size-lg',
  }[size] ?? 'w3f-size-sm'

  return (
    <Button
      unstyled
      className={`ds-button ${colorTrait} ${sizeTrait} w3f-rounded-md w3f-hoverable`}
      {...props}
    >
      {children}
    </Button>
  )
}
```

---

## Cómo funciona la especificidad con `@layer`

Un malentendido común: "si mi clase `.w3f-filled-primary` tiene baja especificidad, ¿no la sobreescriben los presets?"

**No**, porque la especificidad importa **solo dentro de la misma capa**. Entre capas diferentes, gana la capa de mayor prioridad sin importar la especificidad.

```css
/* Capa w3f-presets — especificidad (0,2,0) */
.w3f-button:not(.w3f-button--unstyled) {
  background-color: var(--w3f-btn-bg);
}

/* Capa w3f-traits — especificidad (0,1,0) — MÁS BAJA */
/* Pero w3f-traits tiene MAYOR prioridad que w3f-presets */
.w3f-filled-primary {
  background-color: var(--w3f-primary);
}
```

Resultado: `.w3f-filled-primary` gana si el componente tiene ambas clases, porque `w3f-traits` > `w3f-presets`.

> **Nota:** Cuando usás traits en un componente con preset activo (sin `unstyled`), el trait gana por la prioridad de capa. Cuando usás `unstyled`, el preset se desactiva completamente.

---

## Referencia rápida

### Tabla de traits de color

| Clase | Efecto |
|---|---|
| `.w3f-filled-primary` | Fondo `--w3f-primary`, texto blanco |
| `.w3f-filled-secondary` | Fondo `--w3f-secondary`, texto blanco |
| `.w3f-filled-success` | Fondo `--w3f-success`, texto blanco |
| `.w3f-filled-warning` | Fondo `--w3f-warning`, texto blanco |
| `.w3f-filled-danger` | Fondo `--w3f-danger`, texto blanco |
| `.w3f-filled-info` | Fondo `--w3f-info`, texto blanco |
| `.w3f-ghost-{color}` | Fondo transparente, texto de color |
| `.w3f-outlined-{color}` | Borde de color, fondo transparente |
| `.w3f-soft-{color}` | Fondo tenue (100), texto oscuro (700) |
| `.w3f-hoverable` | Activa hover en filled (oscurece al 700) |

### Tabla de traits de tamaño y forma

| Clase | Padding / Font-size |
|---|---|
| `.w3f-size-xs` | `space-1/space-2` / `text-xs` |
| `.w3f-size-sm` | `space-1/space-4` / `text-xs` |
| `.w3f-size-md` | `space-2/space-6` / `text-sm` |
| `.w3f-size-lg` | `space-3/space-8` / `text-base` |
| `.w3f-size-xl` | `space-4/space-10` / `text-lg` |
| `.w3f-rounded-none` | `border-radius: 0` |
| `.w3f-rounded` | `border-radius: 4px` |
| `.w3f-rounded-lg` | `border-radius: 8px` |
| `.w3f-rounded-full` | `border-radius: 9999px` |

### Cuándo usar cada técnica

| Necesidad | Técnica |
|---|---|
| Cambiar color del componente | CSS vars del componente (`--w3f-btn-bg`) |
| Cambiar apariencia global de un tipo | Tema de componente (clase con CSS vars) |
| Componente visual completamente diferente | `unstyled` + traits |
| Tu CSS no se aplica por especificidad | `@layer w3f-overrides` |
| Paleta semántica cross-componente | Color variants traits |

---

## En Next.js

El sistema de capas CSS funciona igual en Next.js, pero hay un detalle importante con el orden de importación en `globals.css`.

### Importar W3F antes de tu CSS

```css
/* app/globals.css */

/* 1. W3F — declara @layer y todos los estilos */
@import 'w3f.css';

/* 2. Tu CSS — se carga después, puede usar @layer w3f-overrides */
@layer w3f-overrides {
  /* Tus overrides globales aquí */
}
```

Si usás un archivo CSS local que define `@layer w3f-overrides`, importalo después del CSS de W3F:

```css
/* app/globals.css */
@import 'w3f.css';
@import './overrides.css';  /* Contiene @layer w3f-overrides { ... } */
```

### `w3f-overrides` en Next.js App Router

```css
/* app/overrides.css */
@layer w3f-overrides {
  /* Esto afecta TODOS los componentes W3F en toda la app */
  .w3f-button {
    font-family: var(--font-geist-sans);
  }

  /* Forzar dark mode en sección específica */
  .dashboard-layout {
    color-scheme: dark;
  }
}
```

### Traits con Server Components

Las trait classes son solo strings de texto — podés construirlas en Server Components sin `'use client'`:

```tsx
// app/components/Badge.tsx — Server Component
// No necesita 'use client' porque solo construye className

interface BadgeProps {
  tipo: 'activo' | 'inactivo' | 'beta'
}

export function EstadoBadge({ tipo }: BadgeProps) {
  const clases = {
    activo: 'w3f-soft-success w3f-rounded-full w3f-size-xs',
    inactivo: 'w3f-soft-danger w3f-rounded-full w3f-size-xs',
    beta: 'w3f-soft-warning w3f-rounded-full w3f-size-xs',
  }[tipo]

  return <span className={clases}>{tipo}</span>
}
```

> Los traits son clases CSS puras — no requieren JavaScript, funcionan en Server Components y en RSC de manera nativa.

---

## Ejercicio práctico

**Objetivo:** crear un sistema de botones custom usando `unstyled` + traits, sin sobreescribir el diseño global.

### Requerimientos

1. Tres variantes: `primary` (filled azul), `outline` (outlined azul), `ghost` (ghost gris)
2. Dos tamaños: `sm` y `lg`
3. El botón debe tener hover suave
4. Funciona en Next.js App Router

### Solución

```tsx
// 'use client'
// components/ui/AppButton.tsx

import { Button } from '@w3f/components/INPUTS/Button'

type Variante = 'primary' | 'outline' | 'ghost'
type Tamaño = 'sm' | 'lg'

interface AppButtonProps {
  variante?: Variante
  tamaño?: Tamaño
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const COLOR_CLASS: Record<Variante, string> = {
  primary: 'w3f-filled-primary w3f-hoverable',
  outline: 'w3f-outlined-primary w3f-hoverable',
  ghost:   'w3f-ghost-secondary w3f-hoverable',
}

const SIZE_CLASS: Record<Tamaño, string> = {
  sm: 'w3f-size-sm',
  lg: 'w3f-size-lg',
}

export function AppButton({
  variante = 'primary',
  tamaño = 'sm',
  children,
  ...props
}: AppButtonProps) {
  return (
    <Button
      unstyled
      className={`app-btn ${COLOR_CLASS[variante]} ${SIZE_CLASS[tamaño]} w3f-rounded-lg`}
      {...props}
    >
      {children}
    </Button>
  )
}
```

```css
/* components/ui/AppButton.css */
.app-btn {
  font-family: inherit;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: opacity 0.15s ease, transform 0.1s ease;
}

.app-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.app-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```tsx
// Uso:
<AppButton variante="primary" tamaño="lg">Crear proyecto</AppButton>
<AppButton variante="outline" tamaño="sm">Cancelar</AppButton>
<AppButton variante="ghost" tamaño="sm" disabled>No disponible</AppButton>
```

---

## Siguiente paso

Completaste el **Nivel 3 — Avanzado**.

Ahora dominás todo el catálogo de componentes W3F, el sistema de charts y la arquitectura CSS completa.

En el **Nivel 4 — Experto** vas a aprender a:
- Crear componentes nuevos desde cero siguiendo el patrón TSX (Cap 22)
- Usar W3F Studio: PageBuilder, CSS Customizer, Trait Composer (Caps 23–25)
- Conectar tu app a servicios backend con el Node Editor (Cap 26)
- Integrar con Python via W3F Bridge (Cap 27)
- Exportar, deployar y distribuir tu app (Cap 28)

**Siguiente capítulo:** [Cap 22 — Crear componentes nuevos (patrón TSX)](../nivel-4-experto/22-crear-componentes.md)
