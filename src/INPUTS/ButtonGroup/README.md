# ButtonGroup

Agrupa botones visualmente con estilos compartidos y orientacion configurable. Hereda `variant`, `color`, `size` y `disabled` a todos los hijos, y aplica bordes redondeados correctos al primero y ultimo usando `data-attributes`. Compatible con Form y LiveForm mediante Context API.

## Importacion

```tsx
import { ButtonGroup } from '@/components/INPUTS/ButtonGroup/ButtonGroup';
import Button from '@/components/INPUTS/Button/Button';
```

## Uso basico

### Grupo horizontal

```tsx
<ButtonGroup>
  <Button>Previous</Button>
  <Button>Current</Button>
  <Button>Next</Button>
</ButtonGroup>
```

### Con variant e iconos

```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

<ButtonGroup variant="outline">
  <Button icon={<ChevronLeft size={16} />}>Back</Button>
  <Button>Page 1</Button>
  <Button>Page 2</Button>
  <Button icon={<ChevronRight size={16} />} iconPosition="right">Forward</Button>
</ButtonGroup>
```

## Orientacion vertical

Apila los botones en columna. Cada boton ocupa el ancho completo automaticamente:

```tsx
<ButtonGroup orientation="vertical" variant="outline" color="primary">
  <Button>Dashboard</Button>
  <Button>Analytics</Button>
  <Button>Reports</Button>
</ButtonGroup>
```

## Tamanos

Tres tamanos predefinidos heredados por todos los hijos:

```tsx
<ButtonGroup size="sm" variant="outline" color="primary">
  <Button>Small</Button>
  <Button>Group</Button>
  <Button>Buttons</Button>
</ButtonGroup>

<ButtonGroup size="md" variant="outline" color="primary">
  <Button>Medium</Button>
  <Button>Group</Button>
  <Button>Buttons</Button>
</ButtonGroup>

<ButtonGroup size="lg" variant="outline" color="primary">
  <Button>Large</Button>
  <Button>Group</Button>
  <Button>Buttons</Button>
</ButtonGroup>
```

## Colores

Aplica un color semantico a todo el grupo. Los hijos pueden sobreescribir su color individualmente:

```tsx
<ButtonGroup color="primary"><Button>Primary</Button><Button>Group</Button></ButtonGroup>
<ButtonGroup color="success"><Button>Success</Button><Button>Group</Button></ButtonGroup>
<ButtonGroup color="danger"><Button>Danger</Button><Button>Group</Button></ButtonGroup>
<ButtonGroup color="warning" variant="outline"><Button>Warning</Button><Button>Outline</Button></ButtonGroup>
<ButtonGroup color="info" variant="outline"><Button>Info</Button><Button>Outline</Button></ButtonGroup>
<ButtonGroup color="secondary" variant="flat"><Button>Secondary</Button><Button>Flat</Button></ButtonGroup>
```

## Estado activo y disabled

### Boton activo con estado local

```tsx
const [active, setActive] = useState('left');

<ButtonGroup variant="outline" color="primary">
  <Button
    icon={<AlignLeft size={16} />}
    variant={active === 'left' ? 'raised' : 'outline'}
    onClick={() => setActive('left')}
  />
  <Button
    icon={<AlignCenter size={16} />}
    variant={active === 'center' ? 'raised' : 'outline'}
    onClick={() => setActive('center')}
  />
  <Button
    icon={<AlignRight size={16} />}
    variant={active === 'right' ? 'raised' : 'outline'}
    onClick={() => setActive('right')}
  />
</ButtonGroup>
```

### Deshabilitar boton individual

```tsx
<ButtonGroup variant="outline">
  <Button icon={<ZoomIn size={16} />}>Zoom In</Button>
  <Button icon={<RotateCcw size={16} />}>Reset</Button>
  <Button icon={<ZoomOut size={16} />} disabled>Zoom Out</Button>
</ButtonGroup>
```

### Deshabilitar el grupo completo

```tsx
<ButtonGroup disabled variant="outline" color="secondary">
  <Button>All</Button>
  <Button>Buttons</Button>
  <Button>Disabled</Button>
</ButtonGroup>
```

## Full width

Expande el grupo al ancho completo del contenedor. Cada boton ocupa la misma fraccion:

```tsx
<ButtonGroup fullWidth variant="outline" color="primary">
  <Button>Inicio</Button>
  <Button>Perfil</Button>
  <Button>Ajustes</Button>
</ButtonGroup>
```

## Responsive

En pantallas menores a 640px, el grupo cambia a orientacion vertical automaticamente:

```tsx
<ButtonGroup responsive variant="outline" color="primary">
  <Button>Mobile</Button>
  <Button>Stacks</Button>
  <Button>Vertical</Button>
</ButtonGroup>
```

## Integracion con Form / LiveForm

ButtonGroup detecta el contexto de formulario y evita submits accidentales asignando `type="button"` por defecto a los hijos:

```tsx
<Form onSubmit={handleSubmit}>
  <ButtonGroup>
    <Button type="submit">Enviar</Button>
    <Button type="reset">Limpiar</Button>
  </ButtonGroup>
</Form>
```

## CSS Custom Properties

El componente expone dos variables configurables:

```css
.mi-grupo-custom {
  --w3f-bgrp-radius: 999px;           /* Border radius de las esquinas externas */
  --w3f-bgrp-disabled-opacity: 0.4;   /* Opacidad cuando el grupo esta deshabilitado */
}
```

### Ejemplo: Grupo redondeado (pill-style)

```css
.demo-bgrp-rounded {
  --w3f-bgrp-radius: 999px;
  border-radius: 999px;
  overflow: hidden;
  background: #eef2ff;
  padding: 4px;
}

.demo-bgrp-rounded .w3f-btn {
  border-radius: 999px !important;
  border: none;
}
```

### Ejemplo: Grupo minimalista flat

```css
.demo-bgrp-flat {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2px;
}

.demo-bgrp-flat .w3f-btn {
  border: none !important;
  border-radius: 6px !important;
  background: transparent;
}

.demo-bgrp-flat .w3f-btn:hover {
  background: #e5e7eb;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-bgrp-radius` | `var(--w3f-radius)` | Border radius de las esquinas externas del grupo |
| `--w3f-bgrp-disabled-opacity` | `0.6` | Opacidad del grupo cuando `disabled` es true |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Botones hijos (se esperan elementos `<Button>`) |
| `variant` | `'raised' \| 'flat' \| 'outline'` | `'raised'` | Variante visual heredada por los hijos |
| `color` | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'secondary'` | `'primary'` | Color semantico heredado por los hijos |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano heredado por los hijos |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direccion del grupo |
| `fullWidth` | `boolean` | `false` | Expande el grupo al 100% del contenedor |
| `disabled` | `boolean` | `false` | Deshabilita todos los botones del grupo |
| `responsive` | `boolean` | `false` | Cambia a vertical en pantallas menores a 640px |
| `className` | `string` | `''` | Clases CSS adicionales |
| `aria-label` | `string` | `'button group'` | Etiqueta accesible del grupo |

## Herencia de props en hijos

Los hijos pueden sobreescribir cualquier prop heredada del grupo:

```tsx
<ButtonGroup variant="outline" color="primary" size="md">
  <Button color="danger">Cancelar</Button>   {/* color sobreescrito */}
  <Button size="lg">Confirmar</Button>        {/* size sobreescrito */}
  <Button variant="raised">Destacado</Button> {/* variant sobreescrito */}
</ButtonGroup>
```

## Clases CSS generadas

| Clase | Condicion |
|---|---|
| `w3f-button-group` | Siempre (base) |
| `w3f-button-group--horizontal` | `orientation="horizontal"` (default) |
| `w3f-button-group--vertical` | `orientation="vertical"` |
| `w3f-button-group--full-width` | `fullWidth={true}` |
| `w3f-button-group--disabled` | `disabled={true}` |
| `w3f-button-group--responsive` | `responsive={true}` |

Los hijos reciben ademas `data-button-group-child` y `data-button-position` (`first` / `middle` / `last`) para que el CSS aplique los border-radius correctos.

## API

### Entrada de datos

ButtonGroup no tiene valor propio. Su unica funcion de datos es **inyectar props en sus hijos** via `React.cloneElement`:

| Prop del grupo | Prop inyectada en cada hijo | Logica |
|---|---|---|
| `variant` | `variant` | Se aplica si el hijo no tiene su propio `variant` |
| `color` | `color` | Se aplica si el hijo no tiene su propio `color` |
| `size` | `size` | Se aplica si el hijo no tiene su propio `size` |
| `disabled` | `disabled` | `true` si el grupo esta deshabilitado O si el hijo lo esta individualmente |
| `orientation="vertical"` | `fullWidth={true}` | Los botones en modo vertical ocupan el ancho completo |
| — | `type="button"` | Se asigna si el hijo no especifica `type`, evitando submits accidentales en Forms |
| — | `data-button-group-child` | `true` en todos los hijos (para CSS de grupo) |
| — | `data-button-position` | `"first"` / `"middle"` / `"last"` (para CSS de border-radius) |

Los hijos pueden sobrescribir `variant`, `color` y `size` asignando sus propios props.

### Salida de datos

ButtonGroup no emite eventos propios. Toda la logica de eventos (clicks, submits) la manejan los botones hijos individualmente.

| Evento | Origen | Descripcion |
|---|---|---|
| Click | Boton hijo | Cada `<Button>` emite su propio `onClick` |
| Submit | Boton hijo con `type="submit"` | Solo si el hijo declara explicitamente `type="submit"` |

### Comunicacion con otros componentes

#### Con Button (inyeccion de props via cloneElement)

```
ButtonGroup render:
  React.Children.toArray(children)
        ↓
  .map((child, index) => React.cloneElement(child, {
    variant: child.props.variant ?? groupVariant,
    color:   child.props.color   ?? groupColor,
    size:    child.props.size    ?? groupSize,
    type:    child.props.type    ?? 'button',
    disabled: groupDisabled || child.props.disabled,
    'data-button-position': 'first' | 'middle' | 'last'
  }))
```

El CSS usa `[data-button-position="first"]` y `[data-button-position="last"]` para aplicar el border-radius solo en las esquinas externas del grupo.

#### Con Form / LiveForm (deteccion pasiva)

ButtonGroup llama a `useButtonGroupFormContext()` para detectar si esta dentro de un Form. Este hook se usa principalmente para asegurar que los hijos reciban `type="button"` por defecto (evitando submits accidentales). El grupo no lee ni escribe valores en el FormContext.

#### Independiente (sin contexto requerido)

```tsx
// Funciona en cualquier parte del arbol React
<ButtonGroup variant="outline">
  <Button>Anterior</Button>
  <Button>Siguiente</Button>
</ButtonGroup>
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"group"` | Siempre (en el contenedor) |
| `aria-label` | valor de `aria-label` o `'button group'` | Siempre |
| `aria-orientation` | `"horizontal"` / `"vertical"` | Segun prop `orientation` |

Los botones hijos mantienen sus propios atributos ARIA. El `role="group"` es suficiente para que los lectores de pantalla anuncien el grupo como unidad.

### Patron de uso recomendado

```tsx
// 1. Grupo de paginacion
<ButtonGroup variant="outline" color="primary">
  <Button icon={<ChevronLeft size={16} />}>Anterior</Button>
  <Button>Pagina 1</Button>
  <Button>Pagina 2</Button>
  <Button icon={<ChevronRight size={16} />} iconPosition="right">Siguiente</Button>
</ButtonGroup>

// 2. Selector de alineacion con estado activo
const [align, setAlign] = useState('left');
<ButtonGroup variant="outline" color="primary">
  <Button variant={align === 'left'   ? 'raised' : 'outline'} onClick={() => setAlign('left')}>
    <AlignLeft size={16} />
  </Button>
  <Button variant={align === 'center' ? 'raised' : 'outline'} onClick={() => setAlign('center')}>
    <AlignCenter size={16} />
  </Button>
  <Button variant={align === 'right'  ? 'raised' : 'outline'} onClick={() => setAlign('right')}>
    <AlignRight size={16} />
  </Button>
</ButtonGroup>

// 3. Grupo vertical full-width
<ButtonGroup orientation="vertical" variant="outline" color="primary" fullWidth>
  <Button>Dashboard</Button>
  <Button>Reportes</Button>
  <Button>Configuracion</Button>
</ButtonGroup>

// 4. En Form con botones de accion
<Form onSubmit={handleSubmit}>
  <Input name="query" placeholder="Buscar..." />
  <ButtonGroup>
    <Button type="submit" color="primary">Buscar</Button>
    <Button type="reset" color="secondary">Limpiar</Button>
  </ButtonGroup>
</Form>

// 5. Grupo deshabilitado con boton individual activo
<ButtonGroup disabled variant="outline">
  <Button>Opcion A</Button>
  <Button disabled={false} color="danger">Siempre activo</Button>
  <Button>Opcion C</Button>
</ButtonGroup>
```

## Estructura de archivos

```
ButtonGroup/
  ButtonGroup.tsx           Componente principal
  ButtonGroup.types.ts      Interfaces TypeScript
  ButtonGroup.constants.ts  Clases CSS y defaults
  ButtonGroup.utils.ts      buildButtonGroupClasses(), getButtonPosition()
  ButtonGroup.hooks.ts      useButtonGroupFormContext (integracion Form)
  README.md                 Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_button-group.css`
