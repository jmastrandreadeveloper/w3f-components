# AccordionHorizontal

Variante horizontal del Accordion. Los paneles se expanden lateralmente en lugar de verticalmente — el tab de cada item es una barra estrecha con el titulo en orientacion vertical. En pantallas moviles degrada automaticamente a layout vertical.

## Importacion

```tsx
import AccordionHorizontal, {
  AccordionItemH,
  AccordionSummaryH,
  AccordionDetailsH,
  AccordionActionsH,
} from '@/components/SURFACES/AccordionHorizontal/AccordionHorizontal';
```

## Uso basico

```tsx
<AccordionHorizontal height="350px">
  <AccordionItemH id="panel1" color="primary">
    <AccordionSummaryH>Caracteristicas</AccordionSummaryH>
    <AccordionDetailsH>
      <h4>Titulo</h4>
      <p>Contenido del panel expandido lateralmente.</p>
    </AccordionDetailsH>
  </AccordionItemH>
  <AccordionItemH id="panel2" color="success">
    <AccordionSummaryH>Instalacion</AccordionSummaryH>
    <AccordionDetailsH>
      <p>Pasos de instalacion.</p>
    </AccordionDetailsH>
  </AccordionItemH>
</AccordionHorizontal>
```

## Orientacion del texto

El tab vertical puede mostrar el texto en tres modos:

```tsx
<AccordionHorizontal textOrientation="upright">...</AccordionHorizontal>
<AccordionHorizontal textOrientation="clockwise">...</AccordionHorizontal>
<AccordionHorizontal textOrientation="counter-clockwise">...</AccordionHorizontal>
```

- `upright` — cada caracter se muestra vertical, sin rotacion
- `clockwise` — texto rotado 90 grados en sentido horario
- `counter-clockwise` — texto rotado 90 grados en sentido antihorario (default)

## Altura configurable

```tsx
<AccordionHorizontal height="300px">...</AccordionHorizontal>
<AccordionHorizontal height={400}>...</AccordionHorizontal>  {/* px implicito */}
```

## Variantes

```tsx
<AccordionHorizontal variant="outlined">...</AccordionHorizontal>
<AccordionHorizontal variant="elevated">...</AccordionHorizontal>
<AccordionHorizontal variant="borderless">...</AccordionHorizontal>
```

## Expansion multiple

```tsx
<AccordionHorizontal multiple height="300px">
  <AccordionItemH id="a" color="primary">
    <AccordionSummaryH>Seccion A</AccordionSummaryH>
    <AccordionDetailsH><p>Contenido A</p></AccordionDetailsH>
  </AccordionItemH>
  <AccordionItemH id="b" color="success">
    <AccordionSummaryH>Seccion B</AccordionSummaryH>
    <AccordionDetailsH><p>Contenido B</p></AccordionDetailsH>
  </AccordionItemH>
</AccordionHorizontal>
```

## Con AccordionActionsH

```tsx
<AccordionItemH id="edit" color="primary">
  <AccordionSummaryH>Editar</AccordionSummaryH>
  <AccordionDetailsH><p>Formulario de edicion.</p></AccordionDetailsH>
  <AccordionActionsH>
    <Button variant="outlined" size="sm">Close</Button>
    <Button color="primary" size="sm">Guardar</Button>
  </AccordionActionsH>
</AccordionItemH>
```

## CSS Custom Properties

```css
.mi-accordion-h {
  --w3f-acch-bg: #1e1e2e;
  --w3f-acch-item-bg: #1e1e2e;
  --w3f-acch-border-color: #313244;
  --w3f-acch-summary-bg: #181825;
  --w3f-acch-summary-color: #cdd6f4;
  --w3f-acch-summary-hover-bg: #313244;
  --w3f-acch-summary-hover-color: #89b4fa;
  --w3f-acch-details-bg: #1e1e2e;
  --w3f-acch-details-color: #cdd6f4;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-acch-bg` | `surface` | Fondo del contenedor |
| `--w3f-acch-item-bg` | `surface` | Fondo de cada item |
| `--w3f-acch-border-color` | `outline-variant` | Color del borde |
| `--w3f-acch-radius` | `radius-lg` | Border radius del contenedor |
| `--w3f-acch-shadow` | `shadow-sm` | Sombra del contenedor |
| `--w3f-acch-min-height` | `400px` | Altura minima del contenedor |
| `--w3f-acch-summary-bg` | `surface` | Fondo del tab vertical |
| `--w3f-acch-summary-color` | `on-surface` | Color del texto del tab |
| `--w3f-acch-summary-font-size` | `text-base` | Tamano de fuente del tab |
| `--w3f-acch-summary-font-weight` | `600` | Peso de fuente del tab |
| `--w3f-acch-summary-gap` | `space-3` | Separacion icono-texto en tab |
| `--w3f-acch-summary-pad-v` | `space-6` | Padding vertical del tab |
| `--w3f-acch-summary-pad-h` | `space-3` | Padding horizontal del tab |
| `--w3f-acch-summary-min-width` | `56px` | Ancho minimo del tab colapsado |
| `--w3f-acch-summary-hover-bg` | `surface-variant` | Fondo del tab en hover |
| `--w3f-acch-summary-hover-color` | `primary` | Color del tab en hover |
| `--w3f-acch-icon-color` | `gray-500` | Color del icono chevron |
| `--w3f-acch-icon-active-color` | `primary` | Color del icono cuando esta expandido |
| `--w3f-acch-icon-size` | `20px` | Tamano del icono |
| `--w3f-acch-details-bg` | `surface` | Fondo del contenido expandido |
| `--w3f-acch-details-color` | `on-surface` | Color del texto del contenido |
| `--w3f-acch-details-pad` | `space-6` | Padding del contenido |
| `--w3f-acch-actions-bg` | `surface-variant` | Fondo del footer de acciones |
| `--w3f-acch-actions-border-color` | `outline-variant` | Borde del footer |
| `--w3f-acch-actions-gap` | `space-3` | Separacion entre botones |
| `--w3f-acch-transition` | `transition-fast` | Transicion rapida |
| `--w3f-acch-transition-normal` | `transition-normal` | Transicion del flex width |
| `--w3f-acch-focus-color` | `primary` | Outline de foco |
| `--w3f-acch-disabled-opacity` | `0.5` | Opacidad de item deshabilitado |
| `--w3f-acch-collapsed-width` | `56px` | Ancho del panel colapsado |
| `--w3f-acch-expanded-min-width` | `280px` | Ancho minimo del panel expandido |
| `--w3f-acch-primary-bg` | `primary-50` | Fondo del color primary |
| `--w3f-acch-primary-color` | `primary` | Acento del color primary |

## Props

### AccordionHorizontal

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Uno o mas `AccordionItemH` |
| `multiple` | `boolean` | `false` | Permite multiples paneles expandidos |
| `variant` | `'default' \| 'outlined' \| 'elevated' \| 'borderless'` | `'default'` | Estilo visual del contenedor |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del componente |
| `height` | `string \| number` | `'400px'` | Altura del contenedor |
| `textOrientation` | `'upright' \| 'clockwise' \| 'counter-clockwise'` | `'counter-clockwise'` | Orientacion del texto en tabs |
| `className` | `string` | `''` | Clases CSS adicionales |

### AccordionItemH

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `id` | `string` | requerido | Identificador unico del panel |
| `children` | `ReactNode` | requerido | SummaryH, DetailsH y/o ActionsH |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| null` | `null` | Color accent del item |
| `disabled` | `boolean` | `false` | Deshabilita la interaccion |
| `className` | `string` | `''` | Clases CSS adicionales |
| `isExpanded` | `boolean` | — | **@internal** inyectado por AccordionHorizontal |
| `togglePanel` | `() => void` | — | **@internal** inyectado por AccordionHorizontal |
| `textOrientation` | `AccordionHTextOrientation` | — | **@internal** inyectado por AccordionHorizontal |

### AccordionSummaryH

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Texto del tab vertical |
| `disabled` | `boolean` | `false` | Deshabilita el boton |
| `icon` | `ReactNode` | chevron SVG | Icono en el tab |
| `className` | `string` | `''` | Clases CSS adicionales |
| `isExpanded` | `boolean` | — | **@internal** inyectado por AccordionItemH |
| `togglePanel` | `() => void` | — | **@internal** inyectado por AccordionItemH |
| `textOrientation` | `AccordionHTextOrientation` | — | **@internal** inyectado por AccordionItemH |

### AccordionDetailsH

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Contenido del panel expandido |
| `className` | `string` | `''` | Clases CSS adicionales |

### AccordionActionsH

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Botones de accion |
| `className` | `string` | `''` | Clases CSS adicionales |
| `closePanel` | `() => void` | — | **@internal** inyectado por AccordionItemH |

## API

#### Entrada de datos

La entrada principal son los `AccordionItemH` hijos con `id` unico. El `textOrientation` del contenedor se propaga automaticamente a todos los items.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Children | `children` | `ReactNode` | Arbol de sub-componentes compound |
| ID del panel | `id` en AccordionItemH | `string` | Clave para rastrear estado expandido |
| Altura | `height` | `string \| number` | Controla la dimension vertical del contenedor |
| Orientacion | `textOrientation` | `AccordionHTextOrientation` | Propaga orientacion del texto a todos los tabs |

#### Salida de datos

No emite eventos externos. El estado de expansion es totalmente encapsulado.

| Evento | Firma | Cuando |
|---|---|---|
| — | — | No hay callbacks de salida en la API publica actual |

#### Comunicacion con otros componentes

**Patron compound (padre → hijo via React.cloneElement):**

```
AccordionHorizontal (estado: expanded)
  └─ React.cloneElement(AccordionItemH, { isExpanded, togglePanel, textOrientation })
       └─ React.cloneElement(AccordionSummaryH, { isExpanded, togglePanel, id, disabled, textOrientation })
```

La prop `textOrientation` fluye del contenedor raiz a todos los items y luego a todos los SummaryH — no es necesario repetirla en cada sub-componente.

**Diferencia con Accordion vertical:**
- El layout es `display: flex; flex-direction: row` en lugar de `column`
- Los tabs son barras verticales de ancho fijo (`--w3f-acch-collapsed-width`)
- La animacion de expansion es `flex` width, no `grid-template-rows`
- No hay `AccordionItemH.closePanel` por defecto en la API (se puede agregar via `AccordionActionsH`)

#### Accesibilidad

| Atributo | Valor | Componente | Condicion |
|---|---|---|---|
| `aria-expanded` | `true \| false` | AccordionSummaryH (button) | Siempre presente |
| `disabled` | atributo HTML | AccordionSummaryH (button) | Cuando `disabled=true` |
| `type` | `"button"` | AccordionSummaryH | Evita submit en forms |

#### Patron de uso recomendado

```tsx
// 1. Showcase de caracteristicas — layout de columnas
<AccordionHorizontal height="400px" textOrientation="counter-clockwise">
  {features.map(f => (
    <AccordionItemH key={f.id} id={f.id} color={f.color}>
      <AccordionSummaryH>{f.name}</AccordionSummaryH>
      <AccordionDetailsH>
        <h4>{f.name}</h4>
        <p>{f.description}</p>
      </AccordionDetailsH>
    </AccordionItemH>
  ))}
</AccordionHorizontal>

// 2. Dashboard con multiples secciones visibles
<AccordionHorizontal multiple height="350px">
  <AccordionItemH id="stats" color="primary">
    <AccordionSummaryH>Stats</AccordionSummaryH>
    <AccordionDetailsH><Chart /></AccordionDetailsH>
  </AccordionItemH>
  <AccordionItemH id="logs" color="info">
    <AccordionSummaryH>Logs</AccordionSummaryH>
    <AccordionDetailsH><LogTable /></AccordionDetailsH>
  </AccordionItemH>
</AccordionHorizontal>
```

## Estructura de archivos

```
AccordionHorizontal/
  AccordionHorizontal.tsx           Sub-componentes (AccordionHorizontal, AccordionItemH, AccordionSummaryH, AccordionDetailsH, AccordionActionsH)
  AccordionHorizontal.types.ts      Interfaces TypeScript + AccordionHTextOrientation
  AccordionHorizontal.constants.ts  Clases CSS BEM y defaults
  AccordionHorizontal.utils.ts      buildAccordionHClasses, buildAccordionItemHClasses, buildAccordionHContentClasses
  AccordionHorizontal.hooks.ts      useAccordionState (reutiliza el mismo patron que Accordion vertical)
  README.md                         Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_accordion-horizontal.css`
