# Capítulo 22 — Crear componentes nuevos (patrón TSX)

**Nivel:** Experto
**Último update:** 2026-05-14

---

## ¿Qué vas a aprender?

1. La estructura de 5 archivos que usa todo componente W3F
2. Cómo separar tipos, constantes, utilidades, hooks y JSX
3. Cómo crear el CSS estructural y el CSS visual (preset)
4. Cómo registrar el componente en el framework
5. Cuándo y cómo agregar integración con Form y Bridge

---

## La estructura de 5 archivos

Cada componente W3F vive en su propia carpeta con exactamente 5 archivos `.ts`/`.tsx`:

```
packages/components/src/<CATEGORIA>/<ComponenteName>/
├── ComponenteName.tsx          ← JSX del componente (forwardRef)
├── ComponenteName.types.ts     ← Tipos TypeScript e interfaces de props
├── ComponenteName.constants.ts ← Valores por defecto y mapas de clases CSS
├── ComponenteName.utils.ts     ← Funciones puras (buildClasses, transformaciones)
└── ComponenteName.hooks.ts     ← Custom hooks (contexto, estado interno)
```

**Regla crítica:** Los archivos `.ts` **NO** pueden contener JSX. Solo `.tsx` puede tener JSX. Si una función devuelve `<algo>`, va en `.tsx`.

### El CSS del componente

Además de los 5 archivos TypeScript, cada componente tiene una carpeta `css/` con:

```
css/
├── ComponenteName.structural.css  ← Layout, display, cursor, transiciones
├── ComponenteName.defaults.css    ← Valores de CSS vars por defecto
├── ComponenteName.preset.css      ← Estilos visuales (gated con :not(.--unstyled))
└── ComponenteName.overrides.css   ← Overrides opcionales
```

---

## Tutorial: creando el componente `Callout`

Vamos a crear un componente `Callout` — un bloque de texto destacado con variantes de color, ícono opcional y título. Es un componente realista que ilustra todos los aspectos del patrón.

```tsx
// Cómo se va a usar:
<Callout variant="info" title="Información">
  Esta operación no puede deshacerse.
</Callout>

<Callout variant="warning" icon={<AlertTriangle size={18} />}>
  Recordá guardar antes de salir.
</Callout>

<Callout variant="success">
  El proyecto fue creado exitosamente.
</Callout>
```

### Paso 1 — `Callout.types.ts`

Definimos todos los tipos en un archivo `.ts` puro:

```ts
// packages/components/src/DATADISPLAY/Callout/Callout.types.ts

import type React from 'react';

// ─── Union types para cada prop de variante ─────────────────────
export type CalloutVariant = 'info' | 'success' | 'warning' | 'danger';

// ─── Props del componente ────────────────────────────────────────
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variante semántica del callout. Define el color y el ícono por defecto. */
  variant?: CalloutVariant;

  /** Texto del encabezado (opcional). */
  title?: string;

  /** Ícono a mostrar a la izquierda del título. Si no se provee, se usa
   *  el ícono por defecto de la variante. */
  icon?: React.ReactNode;

  /** Contenido principal del callout. */
  children?: React.ReactNode;

  /** Clase CSS extra a aplicar al elemento raíz. */
  className?: string;

  /** Cuando true, elimina los estilos visuales. Solo queda el layout estructural.
   *  Usá trait classes en className para componer la apariencia. */
  unstyled?: boolean;
}
```

**Convenciones:**
- Extendemos el HTML nativo del elemento raíz (`HTMLAttributes<HTMLDivElement>`) para heredar `style`, `id`, `aria-*`, `data-*`, etc.
- `Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>` si algún prop tuyo colisiona con uno HTML nativo.
- Los tipos union se exportan como named exports junto con la interface.

---

### Paso 2 — `Callout.constants.ts`

Las constantes tienen dos responsabilidades: valores por defecto de props y mapas de clases CSS:

```ts
// packages/components/src/DATADISPLAY/Callout/Callout.constants.ts

import type { CalloutVariant } from './Callout.types';

// ─── Valores por defecto de cada prop ──────────────────────────────
export const CALLOUT_DEFAULTS = {
  variant: 'info' as CalloutVariant,
  title: '',
  unstyled: false,
  className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────
export const CALLOUT_CLASSES = {
  // Clase raíz del componente
  base: 'w3f-callout',

  // Clases de sub-elementos
  icon: 'w3f-callout__icon',
  title: 'w3f-callout__title',
  body: 'w3f-callout__body',

  // Clases de variante (modificadores BEM)
  variants: {
    info:    'w3f-callout--info',
    success: 'w3f-callout--success',
    warning: 'w3f-callout--warning',
    danger:  'w3f-callout--danger',
  } satisfies Record<CalloutVariant, string>,

  // Modificador unstyled
  unstyled: 'w3f-callout--unstyled',
} as const;
```

**Convenciones:**
- `CALLOUT_DEFAULTS` usa `as const` para que TypeScript infiera tipos literales.
- `CALLOUT_CLASSES` mapea cada variante a su clase BEM correspondiente.
- `satisfies Record<CalloutVariant, string>` detecta en compile-time si falta una variante.

---

### Paso 3 — `Callout.utils.ts`

Las utilidades son funciones puras que no tienen estado ni efectos secundarios:

```ts
// packages/components/src/DATADISPLAY/Callout/Callout.utils.ts

import type { CalloutVariant } from './Callout.types';
import { CALLOUT_CLASSES } from './Callout.constants';

/**
 * Construye el string de clases CSS del callout a partir de sus props.
 * Cuando unstyled=true, solo se emiten clases estructurales.
 */
export function buildCalloutClasses(
  variant: CalloutVariant,
  className: string,
  unstyled: boolean,
): string {
  if (unstyled) {
    return [
      CALLOUT_CLASSES.base,
      CALLOUT_CLASSES.unstyled,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    CALLOUT_CLASSES.base,
    CALLOUT_CLASSES.variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
```

**Convenciones:**
- Una función por responsabilidad: `buildCalloutClasses`, `formatCalloutTitle`, etc.
- Siempre funciones puras: mismo input → mismo output, sin efectos secundarios.
- Importan solo desde `types` y `constants` — nunca desde `.tsx` o `.hooks`.

---

### Paso 4 — `Callout.hooks.ts`

Los hooks encapsulan lógica con estado o efectos secundarios. Si el componente no tiene lógica compleja, el archivo puede estar casi vacío — pero **siempre existe** para mantener la consistencia del patrón:

```ts
// packages/components/src/DATADISPLAY/Callout/Callout.hooks.ts

// Callout es un componente de display estático — no necesita hooks propios.
// Si en el futuro necesitás integración con Form o estado interno,
// los hooks van aquí.

// Ejemplo de lo que vendría aquí si hubiera integración con Form:
//
// import { useContext } from 'react';
// import { FormContext } from '../Form/Form';
//
// export function useCalloutFormContext() {
//   return useContext(FormContext);
// }
```

**Cuándo agregar lógica real a hooks:**
- Integración con `FormContext` (leer/escribir valores del Form)
- Estado interno que depende de props (ej: `isOpen` derivado de props)
- Suscripciones a eventos externos
- `useCallback` / `useMemo` que involucran lógica de negocio

---

### Paso 5 — `Callout.tsx`

El componente React. Usa `forwardRef` para exponer la ref del elemento raíz:

```tsx
// packages/components/src/DATADISPLAY/Callout/Callout.tsx
'use client'

import React from 'react';
import type { CalloutProps } from './Callout.types';
import { CALLOUT_CLASSES, CALLOUT_DEFAULTS } from './Callout.constants';
import { buildCalloutClasses } from './Callout.utils';

export type { CalloutVariant, CalloutProps } from './Callout.types';

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      variant  = CALLOUT_DEFAULTS.variant,
      title    = CALLOUT_DEFAULTS.title,
      icon,
      children,
      className = CALLOUT_DEFAULTS.className,
      unstyled  = CALLOUT_DEFAULTS.unstyled,
      ...rest
    },
    ref,
  ) => {
    const classes = buildCalloutClasses(variant, className, unstyled);

    return (
      <div ref={ref} className={classes} {...rest}>
        {(icon || title) && (
          <div className={CALLOUT_CLASSES.title}>
            {icon && (
              <span className={CALLOUT_CLASSES.icon}>{icon}</span>
            )}
            {title && <span>{title}</span>}
          </div>
        )}
        {children && (
          <div className={CALLOUT_CLASSES.body}>{children}</div>
        )}
      </div>
    );
  },
);

Callout.displayName = 'Callout';

export { Callout };
export default Callout;
```

**Convenciones del `.tsx`:**
- `'use client'` siempre al principio (todos los componentes W3F son Client Components).
- `React.forwardRef` para exponer la ref del elemento raíz.
- Re-exportar los tipos necesarios desde el `.tsx` principal.
- `displayName` para que aparezca correctamente en React DevTools.
- Spread de `...rest` para pasar atributos HTML nativos al elemento raíz.
- Las props tienen valores por defecto desde `DEFAULTS`, no hardcodeados.

---

### Paso 6 — El CSS del componente

#### `Callout.structural.css` — solo layout

```css
/* packages/components/src/DATADISPLAY/Callout/css/Callout.structural.css */

/* =====================================================================
   CALLOUT — STRUCTURAL CSS
   Solo propiedades de layout que hacen funcionar el componente.
   Los estilos visuales viven en Callout.preset.css (opt-in por defecto).
   ===================================================================== */

.w3f-callout {
  display: flex;
  flex-direction: column;
  gap: var(--w3f-callout-gap, var(--w3f-space-2));
  padding: var(--w3f-callout-padding, var(--w3f-space-4));
  border-left-width: var(--w3f-callout-border-width, 4px);
  border-left-style: solid;
}

.w3f-callout__title {
  display: flex;
  align-items: center;
  gap: var(--w3f-space-2);
  font-weight: 600;
}

.w3f-callout__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.w3f-callout__body {
  font-size: var(--w3f-callout-font-size, var(--w3f-text-sm));
  line-height: 1.6;
}
```

#### `Callout.defaults.css` — valores por defecto de CSS vars

```css
/* packages/components/src/DATADISPLAY/Callout/css/Callout.defaults.css */

:root {
  --w3f-callout-bg-info:    var(--w3f-info-100);
  --w3f-callout-color-info: var(--w3f-info-700);
  --w3f-callout-border-info: var(--w3f-info);

  --w3f-callout-bg-success:    var(--w3f-success-100);
  --w3f-callout-color-success: var(--w3f-success-700);
  --w3f-callout-border-success: var(--w3f-success);

  --w3f-callout-bg-warning:    var(--w3f-warning-100);
  --w3f-callout-color-warning: var(--w3f-warning-700);
  --w3f-callout-border-warning: var(--w3f-warning);

  --w3f-callout-bg-danger:    var(--w3f-danger-100);
  --w3f-callout-color-danger: var(--w3f-danger-700);
  --w3f-callout-border-danger: var(--w3f-danger);
}
```

#### `Callout.preset.css` — estilos visuales

```css
/* packages/components/src/DATADISPLAY/Callout/css/Callout.preset.css */
/* Auto-generado del contrato CSS — estilos gateados con :not(.w3f-callout--unstyled) */

.w3f-callout--info:not(.w3f-callout--unstyled) {
  background-color: var(--w3f-callout-bg-info);
  color: var(--w3f-callout-color-info);
  border-left-color: var(--w3f-callout-border-info);
  border-radius: var(--w3f-radius-md);
}

.w3f-callout--success:not(.w3f-callout--unstyled) {
  background-color: var(--w3f-callout-bg-success);
  color: var(--w3f-callout-color-success);
  border-left-color: var(--w3f-callout-border-success);
  border-radius: var(--w3f-radius-md);
}

.w3f-callout--warning:not(.w3f-callout--unstyled) {
  background-color: var(--w3f-callout-bg-warning);
  color: var(--w3f-callout-color-warning);
  border-left-color: var(--w3f-callout-border-warning);
  border-radius: var(--w3f-radius-md);
}

.w3f-callout--danger:not(.w3f-callout--unstyled) {
  background-color: var(--w3f-callout-bg-danger);
  color: var(--w3f-callout-color-danger);
  border-left-color: var(--w3f-callout-border-danger);
  border-radius: var(--w3f-radius-md);
}
```

---

### Paso 7 — Registrar en el CSS del framework

Abrís `packages/css-framework/src/main_W3_V2.css` y agregás las importaciones en las secciones correspondientes:

```css
/* En la sección "Layer: Structural" */
@import url('../../components/src/DATADISPLAY/Callout/css/Callout.structural.css') layer(w3f-structural);

/* En la sección "Layer: Presets" */
@import url('../../components/src/DATADISPLAY/Callout/css/Callout.defaults.css')  layer(w3f-presets);
@import url('../../components/src/DATADISPLAY/Callout/css/Callout.preset.css')    layer(w3f-presets);
```

---

### Paso 8 — Exportar desde el barrel

Si el componente se va a distribuir públicamente, lo exportás desde el barrel del paquete:

```ts
// packages/components/src/index.ts (o el barrel de DATADISPLAY)

export { Callout } from './DATADISPLAY/Callout/Callout';
export type { CalloutProps, CalloutVariant } from './DATADISPLAY/Callout/Callout';
```

---

## Variaciones del patrón

### Componente con estado interno

Si el componente tiene estado propio (ej: un `Collapsible` que puede abrirse/cerrarse):

```ts
// Collapsible.hooks.ts
import { useState, useCallback } from 'react';

export function useCollapsible(defaultOpen: boolean) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const open   = useCallback(() => setIsOpen(true), []);
  const close  = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
}
```

```tsx
// Collapsible.tsx
'use client'
const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ defaultOpen = false, children, ...props }, ref) => {
    const { isOpen, toggle } = useCollapsible(defaultOpen);
    // ...
  }
);
```

### Componente con integración Form/LiveForm

Si el componente puede ser parte de un formulario (leer/escribir un valor):

```ts
// MiInput.hooks.ts
import { useContext } from 'react';
import { FormContext } from '../Form/Form';

// Patrón correcto: useContext retorna null fuera del Form
// NO usar useFormContext (ese lanza error si no está en Form)
export function useMiInputFormContext() {
  return useContext(FormContext);
}
```

```tsx
// MiInput.tsx
'use client'
const MiInput = forwardRef<HTMLInputElement, MiInputProps>(
  ({ name, value, onChange, ...props }, ref) => {
    const formContext = useMiInputFormContext();
    const isFormControlled = !!(formContext && name);

    // Si está en un Form, toma el valor del contexto
    const effectiveValue = isFormControlled
      ? formContext.values[name] ?? ''
      : value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isFormControlled) {
        formContext.dispatch({ type: 'SET_FIELD', name, value: e.target.value });
      }
      onChange?.(e);
    };

    return <input ref={ref} value={effectiveValue} onChange={handleChange} {...props} />;
  }
);
```

### Componente con sub-componentes

Si el componente tiene partes independientes (como Accordion con AccordionItem/AccordionSummary):

```tsx
// Timeline.tsx
'use client'

// Sub-componentes definidos en el mismo archivo si son pequeños
const TimelineItem: React.FC<TimelineItemProps> = ({ children, ...props }) => (
  <li className="w3f-timeline__item" {...props}>{children}</li>
);
TimelineItem.displayName = 'TimelineItem';

const TimelineDot: React.FC<TimelineDotProps> = ({ color = 'primary' }) => (
  <span className={`w3f-timeline__dot w3f-timeline__dot--${color}`} />
);
TimelineDot.displayName = 'TimelineDot';

// Componente principal
const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  ({ children, ...props }, ref) => (
    <ul ref={ref} className="w3f-timeline" {...props}>{children}</ul>
  )
);
Timeline.displayName = 'Timeline';

// Exportá el componente principal con los sub como propiedades
export { Timeline, TimelineItem, TimelineDot };
```

---

## Guía de decisiones

### ¿Dónde va cada cosa?

```
¿Es un tipo TypeScript?           → .types.ts
¿Es un valor por defecto?          → .constants.ts (DEFAULTS)
¿Es un mapa de clase CSS?          → .constants.ts (CLASSES)
¿Es una función pura sin estado?   → .utils.ts
¿Es un hook (useState/useContext)? → .hooks.ts
¿Es JSX?                           → .tsx
¿Es un efecto secundario?          → .hooks.ts o directamente en .tsx
```

### ¿Qué va en el CSS estructural vs el preset?

```
STRUCTURAL (.structural.css):
  ✓ display, flex, grid
  ✓ cursor
  ✓ transition (las propiedades, no los valores)
  ✓ overflow, position, z-index de layout
  ✓ gap, padding estructural (usando vars con fallback)

PRESET (.preset.css):
  ✓ background-color, color, border-color
  ✓ border-radius (el valor, no el layout)
  ✓ padding visual (el valor final desde vars)
  ✓ font-size, font-weight, letter-spacing
  ✓ box-shadow, opacity
  ✓ Todos los estados: :hover, :focus, :disabled, :checked
  ✓ SIEMPRE dentro de :not(.w3f-{componente}--unstyled)
```

---

## Referencia rápida

### Checklist para un componente nuevo

```
□ Carpeta: packages/components/src/<CATEGORIA>/<NombreComponente>/
□ ComponenteName.types.ts    — tipos e interfaces
□ ComponenteName.constants.ts — DEFAULTS + CLASSES
□ ComponenteName.utils.ts    — buildClasses() y funciones puras
□ ComponenteName.hooks.ts    — hooks (puede estar vacío con un comentario)
□ ComponenteName.tsx         — 'use client' + forwardRef + displayName

□ css/ComponenteName.structural.css — layout y comportamiento
□ css/ComponenteName.defaults.css   — valores de CSS vars en :root
□ css/ComponenteName.preset.css     — visual gateado con :not(.--unstyled)

□ Registrar structural en main_W3_V2.css → layer(w3f-structural)
□ Registrar defaults + preset en main_W3_V2.css → layer(w3f-presets)
□ Exportar desde barrel si es público
```

### Esqueleto copy-paste

```tsx
// ComponenteName.tsx
'use client'

import React from 'react';
import type { ComponenteNameProps } from './ComponenteName.types';
import { COMPONENTENAME_CLASSES, COMPONENTENAME_DEFAULTS } from './ComponenteName.constants';
import { buildComponenteNameClasses } from './ComponenteName.utils';

export type { ComponenteNameProps } from './ComponenteName.types';

const ComponenteName = React.forwardRef<HTMLDivElement, ComponenteNameProps>(
  (
    {
      children,
      className = COMPONENTENAME_DEFAULTS.className,
      unstyled  = COMPONENTENAME_DEFAULTS.unstyled,
      ...rest
    },
    ref,
  ) => {
    const classes = buildComponenteNameClasses(className, unstyled);

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

ComponenteName.displayName = 'ComponenteName';

export { ComponenteName };
export default ComponenteName;
```

---

## En Next.js

### `'use client'` es obligatorio

Todos los componentes W3F llevan `'use client'` al principio del `.tsx`. Esto es intencional: los componentes usan `forwardRef`, event handlers y potencialmente hooks — todos requieren el runtime del cliente.

```tsx
'use client'  // ← siempre, en todo componente W3F
```

### Importar y usar en App Router

```tsx
// app/page.tsx — Server Component
// Podés importar directamente; Next.js detecta 'use client' en el componente

import { Callout } from '@w3f/components/DATADISPLAY/Callout';

export default function Page() {
  return (
    <main>
      <Callout variant="info" title="Tip">
        Esta página se renderiza en el servidor.
      </Callout>
    </main>
  );
}
```

Aunque `page.tsx` es un Server Component, podés importar `Callout` directamente — Next.js sabe que `Callout` es un Client Component por el `'use client'` en su código fuente y lo hidrata en el cliente automáticamente.

### Componentes con estado en App Router

Si tu componente nuevo tiene estado interno (`useState`), solo puede usarse en Client Components. Si lo importás en un Server Component que necesite estado, el que tiene que agregar `'use client'` es el **contenedor**, no necesariamente la página entera:

```tsx
// components/CalloutDismissable.tsx — Client Component wrapper
'use client'

import { useState } from 'react';
import { Callout } from '@w3f/components/DATADISPLAY/Callout';

export function CalloutDismissable({ children, ...props }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <Callout {...props} onClick={() => setVisible(false)}>
      {children}
    </Callout>
  );
}
```

```tsx
// app/page.tsx — Server Component (no necesita 'use client')
import { CalloutDismissable } from '@/components/CalloutDismissable';

export default function Page() {
  return <CalloutDismissable variant="warning">Atención</CalloutDismissable>;
}
```

---

## Ejercicio práctico

**Objetivo:** crear un componente `KbdKey` que muestra un atajo de teclado estilizado como una tecla física.

```tsx
// Resultado esperado:
<KbdKey>⌘</KbdKey>
<KbdKey>Ctrl</KbdKey>
<KbdKey size="lg">Enter</KbdKey>
```

### Solución

**`KbdKey.types.ts`:**
```ts
import type React from 'react';

export type KbdKeySize = 'sm' | 'md' | 'lg';

export interface KbdKeyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: KbdKeySize;
  className?: string;
  unstyled?: boolean;
}
```

**`KbdKey.constants.ts`:**
```ts
import type { KbdKeySize } from './KbdKey.types';

export const KBDKEY_DEFAULTS = {
  size: 'md' as KbdKeySize,
  className: '',
  unstyled: false,
} as const;

export const KBDKEY_CLASSES = {
  base: 'w3f-kbd',
  unstyled: 'w3f-kbd--unstyled',
  sizes: {
    sm: 'w3f-kbd--sm',
    md: 'w3f-kbd--md',
    lg: 'w3f-kbd--lg',
  } satisfies Record<KbdKeySize, string>,
} as const;
```

**`KbdKey.utils.ts`:**
```ts
import type { KbdKeySize } from './KbdKey.types';
import { KBDKEY_CLASSES } from './KbdKey.constants';

export function buildKbdKeyClasses(
  size: KbdKeySize,
  className: string,
  unstyled: boolean,
): string {
  if (unstyled) {
    return [KBDKEY_CLASSES.base, KBDKEY_CLASSES.unstyled, className]
      .filter(Boolean).join(' ');
  }
  return [KBDKEY_CLASSES.base, KBDKEY_CLASSES.sizes[size], className]
    .filter(Boolean).join(' ');
}
```

**`KbdKey.hooks.ts`:**
```ts
// KbdKey es un componente de display estático — no necesita hooks propios.
```

**`KbdKey.tsx`:**
```tsx
'use client'

import React from 'react';
import type { KbdKeyProps } from './KbdKey.types';
import { KBDKEY_DEFAULTS } from './KbdKey.constants';
import { buildKbdKeyClasses } from './KbdKey.utils';

export type { KbdKeySize, KbdKeyProps } from './KbdKey.types';

const KbdKey = React.forwardRef<HTMLElement, KbdKeyProps>(
  (
    {
      children,
      size      = KBDKEY_DEFAULTS.size,
      className = KBDKEY_DEFAULTS.className,
      unstyled  = KBDKEY_DEFAULTS.unstyled,
      ...rest
    },
    ref,
  ) => {
    const classes = buildKbdKeyClasses(size, className, unstyled);
    return (
      <kbd ref={ref} className={classes} {...rest}>
        {children}
      </kbd>
    );
  },
);

KbdKey.displayName = 'KbdKey';

export { KbdKey };
export default KbdKey;
```

**`css/KbdKey.structural.css`:**
```css
.w3f-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, monospace;
  line-height: 1;
  white-space: nowrap;
}
```

**`css/KbdKey.preset.css`:**
```css
.w3f-kbd:not(.w3f-kbd--unstyled) {
  background-color: var(--w3f-surface-2);
  color: var(--w3f-on-surface);
  border: 1px solid var(--w3f-border);
  border-bottom-width: 3px;
  border-radius: var(--w3f-radius-sm);
}

.w3f-kbd--sm:not(.w3f-kbd--unstyled) {
  padding: 2px 6px;
  font-size: var(--w3f-text-xs);
}

.w3f-kbd--md:not(.w3f-kbd--unstyled) {
  padding: 3px 8px;
  font-size: var(--w3f-text-sm);
}

.w3f-kbd--lg:not(.w3f-kbd--unstyled) {
  padding: 5px 12px;
  font-size: var(--w3f-text-base);
}
```

---

## Siguiente paso

[Cap 23 — W3F Studio: PageBuilder](23-pagebuilder.md)
