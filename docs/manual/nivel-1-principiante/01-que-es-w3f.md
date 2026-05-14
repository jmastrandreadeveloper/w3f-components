# Capítulo 01 — ¿Qué es W3F?

**Nivel:** Principiante
**Tiempo estimado de lectura:** 15 minutos

---

## ¿Qué vas a aprender?

- Qué problema resuelve W3F y por qué existe
- En qué se diferencia de MUI, Chakra UI y shadcn/ui
- Cómo está organizado el proyecto (monorepo)
- Qué categorías de componentes existen
- Qué es el W3F Studio y para qué sirve

---

## ¿Qué es W3F?

W3F es un framework de componentes React construido sobre un sistema de diseño propio.
Incluye más de 120 componentes listos para usar, 43 tipos de gráficos y un conjunto de herramientas
visuales (W3F Studio) para construir interfaces sin tocar código.

Está pensado para proyectos que necesitan:

- Interfaces de usuario completas y consistentes
- Gráficos de datos interactivos
- Personalización profunda del estilo sin depender de un framework CSS de terceros
- Herramientas visuales de diseño integradas al flujo de desarrollo

---

## ¿Qué problema resuelve?

Cuando construís una aplicación web, normalmente enfrentás estas decisiones:

1. **¿Qué componentes uso?** — botones, inputs, tablas, modales, sliders...
2. **¿Cómo los estilo?** — con Tailwind, CSS Modules, un design system propio...
3. **¿Cómo los personalizo?** — sobreescribiendo clases, editando variables, usando temas...
4. **¿Cómo visualizo los datos?** — eligiendo una librería de charts separada...

Cada una de esas decisiones implica elegir y combinar herramientas distintas.
W3F integra todo eso en un solo paquete coherente:

```
Componentes UI     → @w3f/components (121 componentes React)
Sistema de estilos → @w3f/css-framework (CSS vars + BEM + utilidades)
Gráficos           → incluidos en @w3f/components (43 charts con visx)
Herramientas       → W3F Studio (visual, corre en el mismo proyecto)
```

No necesitás instalar Recharts por un lado, MUI por otro y Tailwind encima.
Todo habla el mismo idioma de tokens CSS y el mismo sistema de props.

---

## Comparación con otros frameworks

| Característica | W3F | MUI (Material UI) | Chakra UI | shadcn/ui |
|---|---|---|---|---|
| Componentes React | 121 | ~90 | ~60 | ~50 |
| Charts incluidos | 43 | No | No | No |
| CSS framework propio | Si (W3Fussion) | No (emotion/JSS) | No (emotion) | No (Tailwind) |
| Personalización | CSS vars + unstyled | sx prop / themes | Chakra tokens | copiar y editar |
| Herramientas visuales | W3F Studio | No | No | No |
| Sin TypeScript obligatorio | Si (esbuild, .tsx opcional) | No | No | No |
| Dependencias de terceros | React + lucide-react | React + emotion + MUI | React + emotion + Radix | React + Radix + Tailwind |

### La diferencia principal con shadcn/ui

shadcn/ui te da el código fuente de los componentes para que los edites directamente.
W3F te da los componentes compilados y los personalizas **desde afuera** con CSS custom properties.

Eso significa que cuando el framework se actualiza, tus personalizaciones no se pierden.

### La diferencia principal con MUI

MUI aplica estilos con JavaScript en runtime (emotion/JSS).
W3F usa CSS puro con variables, lo que es más performático y más fácil de depurar en devtools.

---

## Arquitectura del monorepo

El proyecto vive en un monorepo con esta estructura:

```
w3f-platform/
├── packages/
│   ├── components/          <- el corazon del framework
│   │   ├── src/             <- codigo fuente de los 121 componentes
│   │   └── DEMOS/           <- demos interactivas de cada componente
│   │
│   ├── css-framework/       <- el sistema de estilos W3Fussion
│   │   └── src/
│   │       ├── _variables.css      <- tokens globales (colores, spacing, radius)
│   │       ├── main_W3_V2.css      <- entry point que importa todo
│   │       ├── INPUTS/             <- CSS de componentes de entrada
│   │       ├── SURFACES/           <- CSS de superficies (cards, modales)
│   │       ├── LAYOUT/             <- CSS de layout (grid, flex, container)
│   │       └── ...
│   │
│   ├── studio/              <- W3F Studio (PageBuilder, TraitComposer, etc.)
│   └── docs/                <- documentacion (este manual)
│
└── apps/
    └── demo/                <- app de desarrollo con todas las demos
```

### Lo que importa en un proyecto externo

Cuando usas W3F en tu propio proyecto, solo necesitas:

```tsx
// Los componentes
import Button from '@w3f/components/INPUTS/Button/Button'
import Card   from '@w3f/components/DATADISPLAY/Card/Card'

// El CSS (una sola vez en el entry point)
import '@w3f/components/css/base.css'   // estilos estructurales (obligatorio)
import '@w3f/components/css/theme.css'  // defaults visuales (opcional)
```

---

## Categorías de componentes

Los 121 componentes están organizados en categorias:

### INPUTS (17 componentes)
Elementos que reciben datos del usuario.

```
Button         ButtonGroup      ButtonToggle
Checkbox       FloatingActionButton  Autocomplete
Input          NumberField      Select
RadioButton    Rating           SlideToggle
Slider         RangeSlider      TransferList
FormField      ToggleButton
```

### DATADISPLAY (23 componentes + 43 charts)
Elementos que muestran datos e informacion.

```
Avatar         Badge            BottomSheetPanel
Card           Chip             Console
Dialog         Divider          Fonts
Icon           Image            Marquee
Note           ProgressBar      ProgressSpinner
Quotes         Reloj            Table
Tag            Text             Tooltip
Tree

-- Charts (43): Bar, Line, Area, Scatter, Pie, Radar, Gauge, Treemap,
   Network, Sankey, Candlestick, CalendarHeatmap, WordCloud, Geo, y mas...
```

### LAYOUT (8 componentes)
Estructura y disposicion de elementos en la pagina.

```
Container      Display          Flexbox
Grid           GridWithDividers ImageList
Panel          Stack
```

### SURFACES (13 componentes)
Contenedores con comportamiento (modales, menus, paneles).

```
Accordion      AccordionHorizontal   AppBar
ContextMenu    Desktop               ImageGallery
Masonry        Menu                  Paper
PopUp          Sidenav               Tabs
Window         WindowGrid
```

### NAVIGATION (7 componentes)
Elementos de navegacion entre vistas.

```
BottomNavigation   Breadcrumbs   Drawer
Link               Pagination    SpeedDial
Stepper
```

### FEEDBACK (5 componentes)
Respuestas visuales a acciones del usuario.

```
Alert    Backdrop    Notification
Ripple   Snackbar
```

### UTILS (2 componentes)
Utilidades de seleccion de fecha y hora.

```
DatePicker    TimePicker
```

### MEDIA (2 componentes)

```
AudioPlayer    VideoPlayer
```

---

## W3F Studio

W3F Studio es un conjunto de herramientas visuales que corre dentro del mismo proyecto.
No es una aplicacion separada — vive en la pestaña "Studio" de la app de desarrollo.

Incluye:

**PageBuilder** — canvas visual drag & drop para disenar paginas
- Arrastra componentes a un canvas de 12 columnas
- Configura props desde un inspector visual
- Preview en tiempo real, exporta HTML+CSS standalone

**CSS Customizer** — editor visual de variables CSS por componente
- Selecciona un componente, ve todas sus variables CSS
- Edita colores, tamanos, sombras, radius en vivo
- Guarda configuraciones y exporta como tema CSS

**Trait Composer** — composicion de clases CSS visuales
- Combina traits (color, size, shadow, glow, radius)
- Preview con estados hover/focus/disabled
- Genera el className final para copiar al codigo

**Node Editor** — logica visual estilo Blueprint (Unreal Engine)
- Conecta nodos de datos entre si sin escribir codigo
- Bindea nodos a componentes del PageBuilder
- Exporta como JavaScript standalone

El Studio es una herramienta de desarrollo — no se incluye en el paquete publicado.

---

## Resumen

W3F es:

- Un conjunto de 121 componentes React + 43 charts, listos para usar
- Un sistema de estilos propio (W3Fussion) basado en CSS custom properties
- Personalizable sin tocar el codigo fuente, solo con variables CSS
- Acompanado de herramientas visuales (Studio) para disenar sin codigo
- Publicado como paquete npm privado (`@w3f/components`)

No es:
- Un framework CSS tipo Tailwind o Bootstrap
- Un reemplazo de React Router o un gestor de estado
- Una herramienta no-code (el Studio complementa el codigo, no lo reemplaza)

---

## Siguiente paso

[Capitulo 02 — Instalacion y setup](02-instalacion-setup.md)

Vas a clonar el repositorio, instalar las dependencias y ver el primer componente funcionando en el navegador.
