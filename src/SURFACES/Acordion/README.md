# Accordion

Componente de paneles colapsables con soporte para expansion unica o multiple. Sigue el patron compound component: el contenedor `Accordion` gestiona el estado y lo inyecta automaticamente en sus `AccordionItem` hijos.

## Importacion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@/components/SURFACES/Acordion/Accordion';
```

## Uso basico

```tsx
<Accordion>
  <AccordionItem id="panel1">
    <AccordionSummary>Que es este framework?</AccordionSummary>
    <AccordionDetails>
      <p>W3Fussion es un sistema de diseno con componentes React y CSS tokens.</p>
    </AccordionDetails>
  </AccordionItem>
  <AccordionItem id="panel2">
    <AccordionSummary>Como lo instalo?</AccordionSummary>
    <AccordionDetails>
      <p>Clona el repositorio y ejecuta npm install.</p>
    </AccordionDetails>
  </AccordionItem>
</Accordion>
```

## Con icono personalizado

```tsx
import { Settings } from 'lucide-react';

<Accordion>
  <AccordionItem id="settings" color="primary">
    <AccordionSummary icon={<Settings size={18} />}>
      Configuracion
    </AccordionSummary>
    <AccordionDetails>
      <p>Opciones de configuracion avanzada.</p>
    </AccordionDetails>
  </AccordionItem>
</Accordion>
```

## Con AccordionActions

Los botones dentro de `AccordionActions` cuyo texto contenga "close" o "cerrar" cierran el panel automaticamente via prop inyectada `closePanel`:

```tsx
<Accordion variant="elevated">
  <AccordionItem id="form" color="primary">
    <AccordionSummary>Agregar usuario</AccordionSummary>
    <AccordionDetails>
      <p>Contenido del formulario aqui.</p>
    </AccordionDetails>
    <AccordionActions>
      <Button variant="outlined" size="sm">Close</Button>
      <Button variant="raised" size="sm" color="primary">Guardar</Button>
    </AccordionActions>
  </AccordionItem>
</Accordion>
```

## Expansion multiple

Con `multiple`, varios paneles pueden estar abiertos simultaneamente:

```tsx
<Accordion multiple>
  <AccordionItem id="a"><AccordionSummary>Panel A</AccordionSummary><AccordionDetails>...</AccordionDetails></AccordionItem>
  <AccordionItem id="b"><AccordionSummary>Panel B</AccordionSummary><AccordionDetails>...</AccordionDetails></AccordionItem>
</Accordion>
```

## Item deshabilitado

```tsx
<AccordionItem id="locked" disabled>
  <AccordionSummary disabled>Bloqueado</AccordionSummary>
  <AccordionDetails>Inaccesible</AccordionDetails>
</AccordionItem>
```

## Variantes y tamanos

```tsx
<Accordion variant="outlined" size="sm">...</Accordion>
<Accordion variant="elevated" size="md">...</Accordion>
<Accordion variant="borderless" size="lg">...</Accordion>
```

## CSS Custom Properties

Aplica overrides en una clase custom pasada via `className`:

```css
.mi-accordion {
  --w3f-acc-bg: #f8f9fa;
  --w3f-acc-border-color: #dee2e6;
  --w3f-acc-radius: 0;
  --w3f-acc-summary-hover-bg: #e9ecef;
  --w3f-acc-icon-active-color: #6c757d;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-acc-bg` | `surface` | Fondo del contenedor |
| `--w3f-acc-item-bg` | `surface` | Fondo de cada item |
| `--w3f-acc-border-color` | `outline-variant` | Color del borde |
| `--w3f-acc-radius` | `radius-lg` | Border radius del contenedor |
| `--w3f-acc-shadow` | `shadow-sm` | Sombra del contenedor |
| `--w3f-acc-summary-bg` | `surface` | Fondo del header |
| `--w3f-acc-summary-color` | `on-surface` | Color del texto del header |
| `--w3f-acc-summary-font-size` | `text-base` | Tamano de fuente del header |
| `--w3f-acc-summary-font-weight` | `500` | Peso de fuente del header |
| `--w3f-acc-summary-pad-v` | `space-4` | Padding vertical del header |
| `--w3f-acc-summary-pad-h` | `space-6` | Padding horizontal del header |
| `--w3f-acc-summary-hover-bg` | `surface-variant` | Fondo en hover |
| `--w3f-acc-summary-active-bg` | `gray-200` | Fondo al hacer click |
| `--w3f-acc-icon-color` | `gray-500` | Color del icono chevron |
| `--w3f-acc-icon-active-color` | `primary` | Color del icono cuando esta expandido |
| `--w3f-acc-icon-size` | `20px` | Tamano del icono |
| `--w3f-acc-details-bg` | `surface` | Fondo del contenido |
| `--w3f-acc-details-color` | `on-surface` | Color del contenido |
| `--w3f-acc-details-pad` | `space-6` | Padding del contenido |
| `--w3f-acc-actions-bg` | `surface-variant` | Fondo del footer de acciones |
| `--w3f-acc-actions-border-color` | `outline-variant` | Borde superior de acciones |
| `--w3f-acc-actions-gap` | `space-3` | Separacion entre botones de accion |
| `--w3f-acc-actions-pad-v` | `space-4` | Padding vertical del footer |
| `--w3f-acc-actions-pad-h` | `space-6` | Padding horizontal del footer |
| `--w3f-acc-transition` | `transition-fast` | Duracion de transicion rapida |
| `--w3f-acc-transition-normal` | `transition-normal` | Duracion de transicion normal |
| `--w3f-acc-focus-color` | `primary` | Color del outline de foco |
| `--w3f-acc-disabled-opacity` | `0.5` | Opacidad de item deshabilitado |
| `--w3f-acc-primary-bg` | `primary-50` | Fondo del color primary |
| `--w3f-acc-primary-border` | `primary` | Borde del color primary |

## Props

### Accordion

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Uno o mas `AccordionItem` |
| `multiple` | `boolean` | `false` | Permite multiples paneles expandidos |
| `variant` | `'default' \| 'outlined' \| 'borderless' \| 'elevated'` | `'default'` | Estilo visual del contenedor |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del componente |
| `className` | `string` | `''` | Clases CSS adicionales |

### AccordionItem

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `id` | `string` | requerido | Identificador unico del panel |
| `children` | `ReactNode` | requerido | Summary, Details y/o Actions |
| `disabled` | `boolean` | `false` | Deshabilita la interaccion |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| null` | `null` | Color accent del item |
| `className` | `string` | `''` | Clases CSS adicionales |
| `isExpanded` | `boolean` | — | **@internal** inyectado por Accordion |
| `togglePanel` | `() => void` | — | **@internal** inyectado por Accordion |
| `closePanel` | `() => void` | — | **@internal** inyectado por Accordion |

### AccordionSummary

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Texto o contenido del header |
| `disabled` | `boolean` | `false` | Deshabilita el boton |
| `icon` | `ReactNode` | chevron SVG | Icono a la izquierda del texto |
| `className` | `string` | `''` | Clases CSS adicionales |
| `isExpanded` | `boolean` | — | **@internal** inyectado por AccordionItem |
| `togglePanel` | `() => void` | — | **@internal** inyectado por AccordionItem |
| `id` | `string` | — | **@internal** inyectado por AccordionItem |

### AccordionDetails

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Contenido expandible |
| `className` | `string` | `''` | Clases CSS adicionales |

### AccordionActions

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Botones de accion |
| `className` | `string` | `''` | Clases CSS adicionales |
| `closePanel` | `() => void` | — | **@internal** inyectado por AccordionItem |

## API

#### Entrada de datos

El Accordion no consume datos externos. Todo el estado es interno gestionado por `useAccordionState`. La unica entrada del usuario es la lista de `AccordionItem` hijos con sus `id` string.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Children | `children` | `ReactNode` | Arbol de sub-componentes compound |
| ID del panel | `id` en AccordionItem | `string` | Clave para rastrear estado expandido |
| Multiple | `multiple` | `boolean` | Define el modo de expansion |

#### Salida de datos

El Accordion no emite eventos externos. El estado de expansion permanece encapsulado dentro del componente. Para reaccionar a cambios de expansion, el patron recomendado es hacer el control externo (wrapping) o extender `useAccordionState`.

| Evento | Firma | Cuando |
|---|---|---|
| — | — | No hay callbacks de salida en la API publica actual |

#### Comunicacion con otros componentes

**Patron compound (padre → hijo via React.cloneElement):**

El `Accordion` inyecta props a sus hijos `AccordionItem` automaticamente:
```
Accordion (estado: expanded = ['panel1'])
  └─ React.cloneElement(AccordionItem, { isExpanded: true, togglePanel, closePanel })
       └─ React.cloneElement(AccordionSummary, { isExpanded, togglePanel, id, disabled })
       └─ React.cloneElement(AccordionActions, { closePanel })
```

Las props marcadas `@internal` NO deben ser pasadas manualmente — son inyectadas por el padre en el ciclo de render.

**AccordionActions auto-close:**
`AccordionActions` inspecciona el texto y className de cada hijo. Si algun hijo contiene "close" o "cerrar", le inyecta un `onClick` que llama `closePanel()` ademas del handler original del boton.

**Integracion con Form / LiveForm:**
`AccordionDetails` acepta cualquier `ReactNode`, incluyendo `<Form>` y `<LiveForm>`. No hay integracion directa con FormContext — es un contenedor generico.

#### Accesibilidad

| Atributo | Valor | Componente | Condicion |
|---|---|---|---|
| `aria-expanded` | `true \| false` | AccordionSummary (Button) | Siempre presente |
| `disabled` | atributo HTML | AccordionSummary (Button) | Cuando `disabled=true` |
| `type` | `"button"` | AccordionSummary | Evita submit en forms |

#### Patron de uso recomendado

```tsx
// 1. FAQ simple
<Accordion>
  <AccordionItem id="q1">
    <AccordionSummary>Pregunta frecuente</AccordionSummary>
    <AccordionDetails><p>Respuesta detallada.</p></AccordionDetails>
  </AccordionItem>
</Accordion>

// 2. Panel de configuracion con acciones
<Accordion variant="elevated">
  <AccordionItem id="cfg" color="primary">
    <AccordionSummary icon={<Settings size={18} />}>Ajustes</AccordionSummary>
    <AccordionDetails>
      <Form onSubmit={save}><Input name="email" /></Form>
    </AccordionDetails>
    <AccordionActions>
      <Button variant="outlined">Close</Button>
      <Button color="primary">Guardar</Button>
    </AccordionActions>
  </AccordionItem>
</Accordion>

// 3. Multiple expansion para comparacion
<Accordion multiple variant="borderless">
  {items.map(item => (
    <AccordionItem key={item.id} id={item.id}>
      <AccordionSummary>{item.title}</AccordionSummary>
      <AccordionDetails>{item.content}</AccordionDetails>
    </AccordionItem>
  ))}
</Accordion>
```

## Estructura de archivos

```
Acordion/
  Accordion.tsx           Todos los sub-componentes (Accordion, AccordionItem, AccordionSummary, AccordionDetails, AccordionActions)
  Accordion.types.ts      Interfaces TypeScript
  Accordion.constants.ts  Clases CSS BEM y defaults
  Accordion.utils.ts      buildAccordionClasses, buildAccordionItemClasses, buildContentContainerClasses
  Accordion.hooks.ts      useAccordionState (expanded state, togglePanel, closePanel)
  README.md               Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_accordion.css`
