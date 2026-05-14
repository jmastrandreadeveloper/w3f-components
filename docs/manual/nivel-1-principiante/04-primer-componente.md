# Capítulo 04 — Primer componente

**Nivel:** Principiante
**Tiempo estimado de lectura:** 20 minutos

---

## ¿Qué vas a aprender?

- Cómo importar y usar el componente `Button`
- Las props fundamentales: `variant`, `color`, `size`, `onClick`, `icon`
- Cómo combinar botones con `Stack` para agruparlos
- La diferencia entre variantes visuales: raised, flat, outline
- Ejercicio: barra de acciones con botones e iconos

---

## El componente más simple: Button

`Button` es el punto de entrada perfecto para entender cómo funciona W3F.
Es declarativo, tipado, y refleja el patrón que siguen todos los demás componentes.

```tsx
import Button from '@w3f/components/INPUTS/Button/Button'

<Button>Guardar</Button>
```

Eso es todo. Sin configuración extra, sin clases manuales.
El resultado es un botón con estilo `raised` + color `primary` (los defaults).

---

## Props principales

### `variant` — forma visual del botón

| Valor | Descripción |
|---|---|
| `"raised"` | Relleno sólido con sombra. Default. |
| `"flat"` | Relleno sólido sin sombra. |
| `"outline"` | Solo borde, fondo transparente. |

```tsx
<Button variant="raised">Raised</Button>
<Button variant="flat">Flat</Button>
<Button variant="outline">Outline</Button>
```

### `color` — color semántico

| Valor | Uso sugerido |
|---|---|
| `"primary"` | Acción principal. Default. |
| `"secondary"` | Acción secundaria o neutral. |
| `"success"` | Confirmar, guardar, completar. |
| `"danger"` | Eliminar, cancelar de forma destructiva. |
| `"warning"` | Acción que requiere atención. |
| `"info"` | Informativo, no crítico. |

```tsx
<Button color="primary">Guardar</Button>
<Button color="danger">Eliminar</Button>
<Button color="success">Confirmar</Button>
```

### `size` — tamaño

Opciones de menor a mayor: `"xxxs"` `"xxs"` `"xs"` `"sm"` `"md"` `"lg"` `"xl"`

```tsx
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano (default)</Button>
<Button size="lg">Grande</Button>
```

### `onClick` — manejador de evento

```tsx
<Button onClick={() => console.log('click!')}>Click me</Button>

// Con el evento:
<Button onClick={(e) => {
  e.preventDefault();
  handleSave();
}}>
  Guardar
</Button>
```

### `disabled` — estado deshabilitado

```tsx
<Button disabled>No disponible</Button>
<Button disabled={!formIsValid}>Enviar</Button>
```

### `fullWidth` — ocupa todo el ancho

```tsx
<Button fullWidth>Botón de ancho completo</Button>
```

### `icon` + `iconPosition` — ícono integrado

W3F usa `lucide-react` para iconos. El ícono se integra directamente en el botón:

```tsx
import { Save, Trash2, Plus } from 'lucide-react'
import Button from '@w3f/components/INPUTS/Button/Button'

<Button icon={<Save size={16} />}>Guardar</Button>
<Button icon={<Trash2 size={16} />} color="danger">Eliminar</Button>
<Button icon={<Plus size={16} />} iconPosition="right">Agregar</Button>
```

`iconPosition` puede ser `"left"` (default) o `"right"`.

### `type` — tipo de botón HTML

Importante dentro de formularios:

```tsx
<Button type="submit">Enviar formulario</Button>
<Button type="reset">Limpiar</Button>
<Button type="button">Acción sin submit</Button>  {/* default */}
```

---

## Agrupar botones con Stack

`Stack` es el componente de layout más usado. Alinea elementos en fila o columna
con separación uniforme.

```tsx
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import Button from '@w3f/components/INPUTS/Button/Button'

// Fila horizontal con separación de 0.5rem entre botones
<Stack horizontal gap="0.5rem">
  <Button>Cancelar</Button>
  <Button color="success">Guardar</Button>
</Stack>
```

### Props de Stack

| Prop | Tipo | Descripción |
|---|---|---|
| `horizontal` | `boolean` | Fila en lugar de columna. Default: `false` (columna). |
| `gap` | `string` | Separación libre entre hijos (ej. `"0.5rem"`, `"16px"`). |
| `spacing` | `string` | Gap por token del sistema (ej. `"4"` → `w3f-gap-4`). |
| `align` | `string` | `align-items`: `start` / `center` / `end` / `stretch`. |
| `justify` | `string` | `justify-content`: `start` / `center` / `end` / `between`. |
| `as` | `React.ElementType` | Elemento HTML a renderizar. Default: `div`. |

```tsx
// Botones centrados en fila
<Stack horizontal gap="1rem" justify="center">
  <Button variant="outline">Atrás</Button>
  <Button>Siguiente</Button>
</Stack>

// Botones en columna que ocupan todo el ancho
<Stack gap="0.75rem">
  <Button fullWidth variant="raised" color="primary">Iniciar sesión</Button>
  <Button fullWidth variant="outline">Crear cuenta</Button>
</Stack>
```

---

## Combinaciones comunes

### Barra de acciones (toolbar)

```tsx
import { Save, X, RotateCcw } from 'lucide-react'

<Stack horizontal gap="0.5rem" align="center">
  <Button
    variant="outline"
    color="secondary"
    icon={<X size={16} />}
    onClick={handleCancel}
  >
    Cancelar
  </Button>
  <Button
    variant="outline"
    color="warning"
    icon={<RotateCcw size={16} />}
    onClick={handleReset}
  >
    Resetear
  </Button>
  <Button
    variant="raised"
    color="success"
    icon={<Save size={16} />}
    onClick={handleSave}
  >
    Guardar
  </Button>
</Stack>
```

### Botón de acción destructiva

```tsx
const [confirmando, setConfirmando] = useState(false);

{!confirmando ? (
  <Button
    variant="outline"
    color="danger"
    onClick={() => setConfirmando(true)}
  >
    Eliminar cuenta
  </Button>
) : (
  <Stack horizontal gap="0.5rem">
    <Button variant="flat" color="secondary" onClick={() => setConfirmando(false)}>
      No, cancelar
    </Button>
    <Button variant="raised" color="danger" onClick={handleDelete}>
      Sí, eliminar
    </Button>
  </Stack>
)}
```

### Botones de tamaños mixtos

```tsx
<Stack horizontal gap="0.5rem" align="center">
  <Button size="lg" variant="raised">Principal</Button>
  <Button size="md" variant="outline">Secundario</Button>
  <Button size="sm" variant="flat" color="secondary">Opcional</Button>
</Stack>
```

---

## Ejercicio práctico

Construí una barra de acciones para un editor de texto con estas características:

- Botón "Nuevo" con ícono `FilePlus` — variant `outline`, color `secondary`
- Botón "Guardar" con ícono `Save` — variant `raised`, color `primary`
- Botón "Exportar" con ícono `Download` — variant `flat`, color `info`
- Botón "Eliminar" — variant `outline`, color `danger`, aparece solo si `hasContent` es true
- Los 4 botones en fila horizontal con `gap="0.5rem"`

### Solución

```tsx
import { useState }                          from 'react'
import { FilePlus, Save, Download, Trash2 }  from 'lucide-react'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import Button from '@w3f/components/INPUTS/Button/Button'

export default function EditorToolbar() {
  const [hasContent, setHasContent] = useState(false);

  return (
    <Stack horizontal gap="0.5rem" align="center">

      <Button
        variant="outline"
        color="secondary"
        icon={<FilePlus size={16} />}
        onClick={() => setHasContent(false)}
      >
        Nuevo
      </Button>

      <Button
        variant="raised"
        color="primary"
        icon={<Save size={16} />}
        onClick={() => setHasContent(true)}
      >
        Guardar
      </Button>

      <Button
        variant="flat"
        color="info"
        icon={<Download size={16} />}
      >
        Exportar
      </Button>

      {hasContent && (
        <Button
          variant="outline"
          color="danger"
          icon={<Trash2 size={16} />}
          onClick={() => setHasContent(false)}
        >
          Eliminar
        </Button>
      )}

    </Stack>
  );
}
```

---

## Referencia rápida — Button

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `"raised" \| "flat" \| "outline"` | `"raised"` | Forma visual |
| `color` | `"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info"` | `"primary"` | Color semántico |
| `size` | `"xxxs"…"xl"` | `"md"` | Tamaño |
| `onClick` | `(e) => void` | — | Handler de click |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Tipo HTML |
| `disabled` | `boolean` | `false` | Deshabilitar |
| `fullWidth` | `boolean` | `false` | Ancho completo |
| `icon` | `ReactNode` | — | Ícono (lucide-react) |
| `iconPosition` | `"left" \| "right"` | `"left"` | Posición del ícono |
| `unstyled` | `boolean` | `false` | Sin estilos visuales |
| `bindId` | `string` | — | Conexión al Bridge |

## Referencia rápida — Stack

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `horizontal` | `boolean` | `false` | Dirección horizontal |
| `gap` | `string` | — | Separación libre (`"1rem"`, `"16px"`) |
| `spacing` | `string` | — | Separación por token (`"4"`) |
| `align` | `string` | — | `align-items` |
| `justify` | `string` | — | `justify-content` |
| `as` | `ElementType` | `"div"` | Elemento HTML |

---

## Siguiente paso

[Capítulo 05 — Estructura del proyecto](05-estructura-del-proyecto.md)

Vas a entender cómo está organizado el monorepo, qué hay en cada carpeta,
y cómo los 5 archivos de cada componente se relacionan entre sí.
