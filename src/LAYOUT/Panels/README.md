# Panel

Contenedor de proposito general para agrupar y presentar contenido. Combina modificadores booleanos (`card`, `round`, `border`) con un prop de color para componer distintos estilos de superficie.

## Importacion

```tsx
import { Panel } from '@/components/LAYOUT/Panels/Panel';
```

## Uso basico

```tsx
<Panel>
  <p>Contenido basico con padding</p>
</Panel>
```

## Variantes

```tsx
{/* Elevacion — sombra */}
<Panel card>
  <p>Card con sombra media</p>
</Panel>

{/* Borde explícito */}
<Panel border>
  <p>Panel con borde sutil</p>
</Panel>

{/* Redondeo grande */}
<Panel round>
  <p>Panel con border-radius 2xl</p>
</Panel>
```

## Combinaciones

```tsx
<Panel card round>
  <p>Sombra + redondeo</p>
</Panel>

<Panel border round>
  <p>Borde + redondeo</p>
</Panel>

<Panel card round border>
  <p>Todos los modificadores</p>
</Panel>
```

## Color de fondo

```tsx
<Panel round color="var(--w3f-primary-50)">
  <p>Fondo azul claro</p>
</Panel>

<Panel round color="var(--w3f-success-50)">
  <p>Fondo verde claro</p>
</Panel>

<Panel round color="var(--w3f-warning-50)">
  <p>Fondo amarillo claro</p>
</Panel>
```

## Sin padding

```tsx
<Panel card round padding={false}>
  <img src="/hero.jpg" style={{ borderRadius: 'inherit', width: '100%' }} />
</Panel>
```

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del panel |
| `color` | `string` | — | Color CSS de fondo (cualquier valor valido) |
| `card` | `boolean` | `false` | Agrega sombra (`w3f-shadow-md`) |
| `round` | `boolean` | `false` | Agrega redondeo grande (`w3f-round-2xl`) |
| `padding` | `boolean` | `true` | Aplica padding grande (`w3f-p-6`) |
| `border` | `boolean` | `false` | Agrega borde explicito (`w3f-border`) |
| `className` | `string` | — | Clases CSS adicionales |

## API

### Clases CSS generadas

| Condicion | Clase aplicada |
|---|---|
| Siempre | `w3f-panel` |
| `padding=true` (default) | `w3f-p-6` |
| `card=true` | `w3f-shadow-md` |
| `round=true` | `w3f-round-2xl` |
| `border=true` | `w3f-border` |
| `color` definido | `style={{ backgroundColor: color }}` (inline) |

### Patron de uso recomendado

```tsx
// 1. Tarjeta de contenido estandar (el patron mas comun)
<Panel card round>
  <h3>Titulo</h3>
  <p>Contenido del panel</p>
</Panel>

// 2. Widget de dashboard con color semantico
<Panel card round color="var(--w3f-success-50)">
  <Text element="p" customClasses="w3f-text-xs w3f-text-gray-500">Usuarios activos</Text>
  <Text element="p" customClasses="w3f-text-2xl w3f-font-bold">1,234</Text>
  <Text element="p" customClasses="w3f-text-xs w3f-text-success-600">+5% esta semana</Text>
</Panel>

// 3. Media card (imagen edge-to-edge)
<Panel card round padding={false}>
  <img src="/foto.jpg" style={{ borderRadius: 'inherit', display: 'block', width: '100%' }} />
  <div style={{ padding: '1rem' }}>
    <p>Descripcion de la imagen</p>
  </div>
</Panel>

// 4. Seccion de formulario con borde
<Panel border round>
  <Stack spacing="4">
    <Input label="Nombre" name="name" />
    <Input label="Email" name="email" />
  </Stack>
</Panel>
```

### Accesibilidad

Panel es un `<div>` sin rol semantico implicito. Para contenido semanticamente significativo, usa la prop `as` de `Container` en su lugar, o agrega `role` y `aria-label` directamente:

```tsx
<Panel card round role="region" aria-label="Resumen de estadisticas">
  ...
</Panel>
```

## Estructura de archivos

```
Panels/
  Panel.tsx            Componente principal
  Panel.types.ts       Interfaces TypeScript
  Panel.constants.ts   CSS class tokens y defaults
  Panel.hooks.ts       usePanel (hook interno)
  Panel.utils.ts       buildPanelClassNames()
  README.md            Esta documentacion
```

CSS: clases `w3f-panel` y modificadores en `src/w3fussion/LAYOUT/_panel.css`
