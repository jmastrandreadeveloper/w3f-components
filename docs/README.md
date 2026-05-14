# W3F Components — Documentación

Biblioteca de 121 componentes React + 43 charts con sistema de estilos propio (W3Fussion).

---

## Inicio rápido

```bash
npm install @w3f/components lucide-react
node node_modules/@w3f/components/scripts/init-nextjs.mjs
```

El script configura automáticamente Next.js: `transpilePackages`, CSS en `public/` y el `<link>` en el layout.

**[Guía completa de Next.js →](./nextjs.md)**

---

## Manual de usuario

Manual estructurado por niveles — de principiante a experto.

### Nivel 1 — Principiante
> Instalar el framework, entender qué es y renderizar los primeros componentes.

| # | Capítulo |
|---|---|
| 01 | [¿Qué es W3F?](./manual/nivel-1-principiante/01-que-es-w3f.md) |
| 02 | [Instalación y setup](./manual/nivel-1-principiante/02-instalacion-setup.md) |
| 03 | [Integración con Next.js](./manual/nivel-1-principiante/03-nextjs-integracion.md) |
| 04 | [Primer componente (Button + Stack)](./manual/nivel-1-principiante/04-primer-componente.md) |
| 05 | [Estructura del proyecto](./manual/nivel-1-principiante/05-estructura-del-proyecto.md) |
| 06 | [CSS variables y tokens](./manual/nivel-1-principiante/06-css-variables-tokens.md) |
| 07 | [Primera página completa](./manual/nivel-1-principiante/07-primera-pagina.md) |

### Nivel 2 — Intermedio
> Dominar el sistema de layout, los inputs principales, los formularios y la customización básica.

| # | Capítulo |
|---|---|
| 08 | [Layout: Stack, Grid, Container, Flexbox](./manual/nivel-2-intermedio/08-layout.md) |
| 09 | [Inputs básicos: Input, Select, Checkbox, Radio, SlideToggle](./manual/nivel-2-intermedio/09-inputs-basicos.md) |
| 10 | [Display de datos: Card, Badge, Text, Avatar](./manual/nivel-2-intermedio/10-display-datos.md) |
| 11 | [Navegación: AppBar, Tabs, Breadcrumbs, Drawer](./manual/nivel-2-intermedio/11-navegacion.md) |
| 12 | [Feedback: Alert, Snackbar, Notification, Ripple](./manual/nivel-2-intermedio/12-feedback.md) |
| 13 | [Formularios: Form y LiveForm](./manual/nivel-2-intermedio/13-formularios.md) |
| 14 | [Customización CSS básica](./manual/nivel-2-intermedio/14-customizacion-css.md) |

### Nivel 3 — Avanzado
> Dominar todo el catálogo, el sistema de charts y la personalización profunda.

| # | Capítulo |
|---|---|
| 15 | [Inputs completos: Autocomplete, RangeSlider, Rating, DatePicker, TimePicker](./manual/nivel-3-avanzado/15-inputs-completos.md) |
| 16 | [Surfaces: Accordion, PopUp, Menu, Window, Tabs](./manual/nivel-3-avanzado/16-surfaces.md) |
| 17 | [Navegación avanzada: Stepper, SpeedDial, Sidenav](./manual/nivel-3-avanzado/17-navegacion-avanzada.md) |
| 18 | [Charts: introducción y arquitectura visx](./manual/nivel-3-avanzado/18-charts-intro.md) |
| 19 | [Charts: catálogo completo (43 charts)](./manual/nivel-3-avanzado/19-charts-catalogo.md) |
| 20 | [Sistema de temas](./manual/nivel-3-avanzado/20-sistema-temas.md) |
| 21 | [Composable CSS y sistema de capas (@layer)](./manual/nivel-3-avanzado/21-composable-css.md) |

### Nivel 4 — Experto
> Crear componentes propios, usar W3F Studio y deployar.

| # | Capítulo |
|---|---|
| 22 | [Crear componentes nuevos (patrón TSX de 5 archivos)](./manual/nivel-4-experto/22-crear-componentes.md) |
| 23–28 | W3F Studio, CSS Customizer, Trait Composer, Node Editor, Bridge, Deploy *(próximamente)* |

**[Índice completo del manual →](./manual/README.md)**

---

## Uso

```tsx
'use client';
import { Button, Input, Card, Stack } from '@w3f/components';

export default function Page() {
  return (
    <Stack gap="1rem">
      <Card title="Bienvenido">
        <Input label="Email" type="email" />
        <Button variant="raised" color="primary">Ingresar</Button>
      </Card>
    </Stack>
  );
}
```

---

## Componentes disponibles (121)

### INPUTS
`Button` · `ButtonGroup` · `ButtonToggle` · `Checkbox` · `FloatingActionButton`
`Input` · `NumberField` · `RadioButton` · `RangeSlider` · `Rating` · `Select`
`SlideToggle` · `Slider` · `TransferList` · `Autocomplete` · `FormField` · `ToggleButton`

### DATADISPLAY
`Avatar` · `AvatarGroup` · `Badge` · `BadgeWrapper` · `BottomSheetPanel`
`Card` · `Chip` · `Console` · `Dialog` · `Divider` · `Image` · `Marquee`
`Note` · `ProgressBar` · `ProgressSpinner` · `Table` · `Tag` · `Text`
`Tooltip` · `Tree`

### CHARTS (43)
Bar · BarHorizontal · BarGrouped · BarStacked · Line · LineMulti · Area · AreaStacked
Scatter · Bubble · Heatmap · BoxPlot · Histogram · Pie · Donut · Radar · Gauge
Treemap · Pack · Network · Sankey · Funnel · Waterfall · Candlestick · Sparkline
CalendarHeatmap · Sunburst · Chord · PolarBar · Waffle · WordCloud · Geo · y más

### NAVIGATION
`AppBar` · `BottomNavigation` · `Breadcrumbs` · `Drawer` · `Link` · `Pagination`
`SpeedDial` · `Stepper`

### SURFACES
`Accordion` · `AccordionHorizontal` · `ContextMenu` · `ImageGallery`
`Menu` · `PopUp` · `Sidenav` · `Tabs` · `Window` · `WindowGrid`

### FEEDBACK
`Alert` · `AlertProvider` · `Backdrop` · `Notification` · `NotificationProvider`
`Ripple` · `Snackbar` · `SnackbarProvider`

### FORMS
`Form` · `LiveForm` — todos los inputs se conectan con solo la prop `name`

### LAYOUT
`Container` · `Display` · `Flexbox` · `Grid` · `Panel` · `Stack`

### UTILS
`DatePicker` · `DateRangePicker` · `MultipleDatePicker` · `TimePicker`

---

## Tokens CSS

```css
/* Sobreescribir tokens globalmente */
@layer w3f-overrides {
  :root {
    --w3f-primary:   #7c3aed;   /* color principal */
    --w3f-radius-md: 12px;      /* bordes más redondeados */
    --w3f-font-family: 'Inter', sans-serif;
  }
}
```

Dark mode: clase `w3f-theme-dark` en cualquier contenedor.

| Token | Default | Descripción |
|---|---|---|
| `--w3f-primary` | `#2563eb` | Color principal |
| `--w3f-secondary` | `#f97316` | Color secundario |
| `--w3f-success` | `#10b981` | Estado éxito |
| `--w3f-danger` | `#ef4444` | Estado error |
| `--w3f-surface` | `#ffffff` | Fondo de cards |
| `--w3f-background` | `#f9fafb` | Fondo de página |
| `--w3f-space-4` | `1rem` (16px) | Spacing base |
| `--w3f-radius-md` | `6px` | Radio de bordes |
| `--w3f-transition-normal` | `300ms ease` | Transición estándar |

---

## Scripts del repo

| Script | Descripción |
|---|---|
| `npm run build` | Compila TSX → JS + genera `dist/w3f.css` |
| `npm run update` | Sincroniza desde w3f-platform (sin commit) |
| `npm run update:commit` | Sincroniza + hace git commit |
| `npm run update:push` | Sincroniza + commit + git push |
| `w3f-init` (bin) | Setup automático en proyectos Next.js |

### Opciones del script de actualización

```bash
node scripts/update.mjs [opciones]

  --commit          Hace git commit con los cambios
  --push            Hace git push (implica --commit)
  --message "texto" Mensaje de commit personalizado
  --dry-run         Muestra qué haría sin ejecutarlo
  --no-build        Omite el rebuild de dist/w3f.css
  --platform <path> Ruta alternativa al repo w3f-platform
```
