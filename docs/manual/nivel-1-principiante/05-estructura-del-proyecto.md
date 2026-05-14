# Capítulo 05 — Estructura del proyecto

**Nivel:** Principiante
**Tiempo estimado de lectura:** 20 minutos

---

## ¿Qué vas a aprender?

- Qué hay en cada carpeta del monorepo
- Por qué cada componente tiene exactamente 5 archivos y qué rol cumple cada uno
- Cómo funciona el sistema de demos y cómo navegar entre ellas
- Cómo agregar tu propia demo al DemoIndex

---

## El monorepo: vista general

El proyecto es un monorepo gestionado con pnpm workspaces.
Cada subcarpeta de `packages/` y `apps/` es un paquete independiente con su propio `package.json`.

```
w3f-platform/
├── packages/
│   ├── components/       <- los componentes React (el núcleo)
│   ├── css-framework/    <- el sistema de estilos W3Fussion
│   ├── studio/           <- W3F Studio (PageBuilder, TraitComposer, etc.)
│   ├── bridge/           <- conexión bidireccional UI ↔ backend
│   ├── services/         <- servicios compartidos (AI, storage, etc.)
│   ├── shared/           <- tipos y utilidades compartidas entre paquetes
│   ├── docs/             <- documentación (este manual)
│   └── css-framework-contract/  <- contratos CSS de variables
│
├── apps/
│   ├── demo/             <- app de desarrollo Vite (puerto 5173)
│   ├── nextjs/           <- app Next.js 15 (puerto 3000)
│   └── legacy-demos/     <- demos antiguas, no usar
│
├── scripts/              <- scripts de mantenimiento del monorepo
└── package.json          <- scripts raíz (pnpm dev, pnpm build, etc.)
```

### ¿Qué necesitás para trabajar día a día?

En la práctica, trabajás con estas dos carpetas:

| Carpeta | Para qué |
|---|---|
| `packages/components/src/` | Código fuente de los componentes |
| `packages/components/DEMOS/` | Demos interactivas de cada componente |

La app `apps/demo/` levanta todo eso en el navegador con `pnpm dev`.

---

## `packages/components/` en detalle

```
packages/components/
├── src/                  <- código fuente de producción
│   ├── INPUTS/
│   ├── DATADISPLAY/
│   │   └── Charts/       <- los 43 charts con visx
│   ├── LAYOUT/
│   ├── SURFACES/
│   ├── NAVIGATION/
│   ├── FEEDBACK/
│   ├── MEDIA/
│   ├── AUTH/
│   ├── COMMERCE/
│   ├── UTILS/            <- DatePicker, TimePicker, utilidades
│   ├── types/            <- tipos globales compartidos
│   └── index.ts          <- re-exporta todos los componentes
│
└── DEMOS/                <- demos interactivas (fuera de src/)
    ├── INPUTS/
    ├── DATADISPLAY/
    │   └── Charts/
    ├── SURFACES/
    ├── NAVIGATION/
    ├── FEEDBACK/
    ├── LAYOUT/
    ├── MEDIA/
    ├── AUTH/
    ├── COMMERCE/
    └── _shared/          <- helpers compartidos entre demos
        ├── MarkdownView/ <- renderiza README.md dentro de la demo
        └── CodeBlock/    <- resalta snippets de código
```

---

## El patrón de 5 archivos

Cada componente vive en su propia carpeta y siempre tiene exactamente 5 archivos.
Tomemos `Button` como ejemplo:

```
INPUTS/Button/
├── Button.tsx            <- JSX: el componente React
├── Button.types.ts       <- tipos TypeScript (props, variantes)
├── Button.hooks.ts       <- custom hooks (lógica con estado)
├── Button.constants.ts   <- clases CSS y valores por defecto
├── Button.utils.ts       <- funciones puras (buildClasses, etc.)
├── css/                  <- CSS co-localizado del componente
│   ├── Button.structural.css   <- layout y estructura (sin colores)
│   ├── Button.preset.css       <- apariencia visual (colores, sombras)
│   ├── Button.defaults.css     <- valores default de las variables
│   └── Button.overrides.css    <- overrides específicos
├── README.md             <- documentación del componente
└── test/
    └── Button.test.tsx   <- tests con Vitest
```

### Qué hace cada archivo

**`Button.tsx`** — El componente React. Solo contiene JSX y el render.
Importa tipos, hooks, constants y utils. No tiene lógica de negocio directa.

```tsx
// Estructura típica de un .tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, color, size, onClick, children, ...props }, ref) => {
    const formContext = useButtonFormContext(); // hook
    const classes = buildButtonClasses(variant, color, size); // util

    return <button ref={ref} className={classes} {...props}>{children}</button>;
  }
);
```

**`Button.types.ts`** — Todos los tipos TypeScript del componente.
Sin JSX, solo definiciones de tipos e interfaces.

```ts
export type ButtonVariant = 'raised' | 'flat' | 'outline';
export type ButtonColor   = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // ...
}
```

**`Button.hooks.ts`** — Custom hooks del componente. Solo lógica con estado.

```ts
// Detecta si el Button está dentro de un Form
export function useButtonFormContext() {
  const formContext = useContext(FormContext);
  return formContext;
}
```

**`Button.constants.ts`** — Valores por defecto y mapeo de clases CSS.

```ts
export const BUTTON_DEFAULTS = {
  variant: 'raised' as const,
  color: 'primary' as const,
  size: 'md' as const,
} as const;

export const BUTTON_CLASSES = {
  base: 'w3f-button',
  variants: { raised: 'w3f-button--raised', flat: 'w3f-button--flat' },
  // ...
} as const;
```

**`Button.utils.ts`** — Funciones puras. La más común es `buildClasses()`.

```ts
// Construye el className final combinando variante, color, tamaño
export function buildButtonClasses(
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  fullWidth: boolean,
  className: string,
  unstyled: boolean,
): string {
  // combina clases BEM + modifiers
}
```

### La regla clave

> **JSX solo en `.tsx`.** Los archivos `.ts` no pueden contener JSX.
> Si una función retorna HTML/JSX, va en el `.tsx`.
> Si es lógica pura, va en `.ts`.

Esta separación hace que el código sea predecible y fácil de navegar:
nunca buscás lógica en el JSX ni JSX en la lógica.

---

## `packages/css-framework/` en detalle

El CSS del framework vive separado de los componentes.
El archivo principal es `main_W3_V2.css`, que importa todo lo demás:

```
css-framework/src/
├── main_W3_V2.css        <- entry point: importa todo
├── _variables.css        <- tokens globales (colores, spacing, radius, etc.)
├── COLORS/               <- paletas de color
├── LAYOUT/               <- grid, flex, container, stack
├── INPUTS/               <- estilos de botones, inputs, selects, etc.
├── DATADISPLAY/          <- cards, badges, chips, etc.
├── SURFACES/             <- modales, drawers, accordions, etc.
├── NAVIGATION/           <- appbar, tabs, breadcrumbs, etc.
├── FEEDBACK/             <- alerts, snackbars, spinners, etc.
├── PRESETS/              <- estilos visuales por componente (colores, sombras)
├── THEMES/               <- temas predefinidos (dark, etc.)
└── TRAITS/               <- clases composables de utilidad
```

En la práctica no necesitás editar estos archivos directamente.
Customizás el estilo sobreescribiendo variables CSS en tu propia hoja de estilos.

---

## El sistema de demos

Las demos viven en `packages/components/DEMOS/` (fuera de `src/`).
Cada demo tiene exactamente 2 archivos:

```
DEMOS/INPUTS/Button/
├── ButtonDemo.tsx   <- el componente de demo (React)
└── ButtonDemo.css   <- estilos específicos de esa demo
```

Una demo típica muestra el componente en todas sus variantes, con código copiable:

```tsx
// ButtonDemo.tsx (estructura simplificada)
import readme from '@w3f/components/INPUTS/Button/README.md?raw';
import MarkdownView from '@w3f/components/DEMOS/_shared/MarkdownView';

export default function ButtonDemo() {
  return (
    <>
      <MarkdownView content={readme} />  {/* muestra el README */}

      <Section title="Variantes">
        <Button variant="raised">Raised</Button>
        <Button variant="flat">Flat</Button>
        <Button variant="outline">Outline</Button>
      </Section>

      {/* más secciones... */}
    </>
  );
}
```

### Cómo se cargan las demos en la app

`apps/demo/src/DemoIndex.tsx` registra todas las demos con lazy imports:

```tsx
// 1. Import lazy (solo carga cuando se navega a esa demo)
const ButtonDemo = lazy(
  () => import('@w3f/components/DEMOS/INPUTS/Button/ButtonDemo')
);

// 2. Registro en el array de categorías
const DEMO_CATEGORIES = [
  {
    id: 'inputs',
    label: 'INPUTS',
    demos: [
      { id: 'button', label: 'Button', component: ButtonDemo },
      // ...
    ],
  },
  // ...
];
```

---

## Cómo agregar una nueva demo

Si creás un componente nuevo o querés agregar una demo propia, el proceso es:

### Paso 1 — Crear los archivos de la demo

```
packages/components/DEMOS/INPUTS/MiComponente/
├── MiComponenteDemo.tsx
└── MiComponenteDemo.css
```

```tsx
// MiComponenteDemo.tsx
import './MiComponenteDemo.css';
import MiComponente from '@w3f/components/INPUTS/MiComponente/MiComponente';

export default function MiComponenteDemo() {
  return (
    <div>
      <h2>MiComponente</h2>
      <MiComponente />
    </div>
  );
}
```

### Paso 2 — Registrar en DemoIndex

En `apps/demo/src/DemoIndex.tsx`:

```tsx
// Agregar el import lazy junto a los demás de su categoría
const MiComponenteDemo = lazy(
  () => import('@w3f/components/DEMOS/INPUTS/MiComponente/MiComponenteDemo')
);

// Agregar en el array DEMO_CATEGORIES, dentro de la categoría correcta
{ id: 'mi-componente', label: 'MiComponente', component: MiComponenteDemo },
```

### Paso 3 — Ver el resultado

```bash
pnpm dev
# → http://localhost:5173
# La demo aparece en la categoría INPUTS del sidebar
```

---

## Reglas para no perderse

| Regla | Por qué importa |
|---|---|
| JSX solo en `.tsx` | Vite puede procesar `.tsx` con esbuild; `.ts` no puede contener JSX |
| Si existe `.jsx` y `.tsx` para el mismo componente, el `.jsx` tiene prioridad en Vite | Al refactorizar a TSX, siempre eliminar el `.jsx` original |
| Las demos viven en `DEMOS/`, NO en `src/` | Las demos no se incluyen en el paquete publicado |
| No importar `useFormContext` de `Form.hooks.ts` | Ese hook lanza error si no está dentro de un Form; usar `useContext(FormContext)` directamente |

---

## Resumen visual

```
Querés usar un componente en tu app:
  → import X from '@w3f/components/CATEGORIA/X/X'

Querés ver cómo funciona:
  → http://localhost:5173 → buscar en el sidebar

Querés entender el código de un componente:
  → packages/components/src/CATEGORIA/X/
    → X.tsx (qué renderiza)
    → X.types.ts (qué props acepta)
    → X.hooks.ts (qué lógica tiene)
    → X.constants.ts (qué defaults y clases usa)
    → X.utils.ts (cómo construye las clases CSS)

Querés agregar una demo:
  → packages/components/DEMOS/CATEGORIA/X/XDemo.tsx
  → registrar en apps/demo/src/DemoIndex.tsx
```

---

## Siguiente paso

[Capítulo 06 — CSS variables y tokens](06-css-variables-tokens.md)

Vas a entender el sistema de tokens CSS del framework: cómo customizar colores,
spacing y radius con una sola variable, sin tocar el código de los componentes.
