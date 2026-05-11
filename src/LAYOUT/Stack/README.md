# Stack

Contenedor flexbox de una dimension para apilar elementos vertical u horizontalmente con espaciado uniforme. Usa las clases CSS `w3f-stack` (vertical), `w3f-stack-sm` (vertical compacto) y `w3f-h-stack` (horizontal).

## Importacion

```tsx
import Stack from '@/components/LAYOUT/Stack/Stack';
```

## Uso basico

### Pila vertical (por defecto)

```tsx
<Stack>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Pila horizontal

```tsx
<Stack horizontal>
  <div>Item A</div>
  <div>Item B</div>
  <div>Item C</div>
</Stack>
```

## Tamanos (size)

Solo aplica a la pila vertical:

```tsx
<Stack size="default">...</Stack>   {/* w3f-stack — gap normal */}
<Stack size="sm">...</Stack>        {/* w3f-stack-sm — gap reducido */}
```

## Espaciado personalizado (spacing)

Sobreescribe el gap predefinido con un token de espaciado W3F:

```tsx
<Stack spacing="1">...</Stack>
<Stack spacing="2">...</Stack>
<Stack spacing="4">...</Stack>
<Stack spacing="6">...</Stack>
<Stack spacing="8">...</Stack>
<Stack spacing="12">...</Stack>
```

## Pila horizontal con espaciado

```tsx
<Stack horizontal spacing="6">
  <Avatar src="/foto.jpg" />
  <div>
    <p>Nombre de usuario</p>
    <p>Rol en el equipo</p>
  </div>
</Stack>
```

## Stacks anidados

Combina vertical y horizontal para layouts complejos:

```tsx
<Stack spacing="4">
  <Stack horizontal spacing="4">
    <div style={{ flex: 1 }}>Fila 1, Col A</div>
    <div style={{ flex: 1 }}>Fila 1, Col B</div>
  </Stack>
  <Stack horizontal spacing="4">
    <div style={{ flex: 1 }}>Fila 2, Col A</div>
    <div style={{ flex: 1 }}>Fila 2, Col B</div>
    <div style={{ flex: 1 }}>Fila 2, Col C</div>
  </Stack>
</Stack>
```

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Elementos a apilar |
| `horizontal` | `boolean` | `false` | Orientacion horizontal (`w3f-h-stack`) |
| `size` | `StackSize` | `'default'` | Tamano del gap predefinido (solo vertical) |
| `spacing` | `string` | — | Token de gap (`w3f-gap-{spacing}`) que sobreescribe `size` |
| `className` | `string` | — | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline adicionales |

## API

### Clases CSS generadas

| Condicion | Clase aplicada |
|---|---|
| `horizontal=false`, `size="default"` | `w3f-stack` |
| `horizontal=false`, `size="sm"` | `w3f-stack-sm` |
| `horizontal=true` | `w3f-h-stack` |
| `spacing="4"` | agrega `w3f-gap-4` |

### Patron de uso recomendado

```tsx
// 1. Lista de campos de formulario
<Stack spacing="4">
  <Input label="Nombre" name="name" />
  <Input label="Email" name="email" />
  <Select label="Pais" name="country" options={countries} />
  <Button type="submit">Enviar</Button>
</Stack>

// 2. Fila de acciones
<Stack horizontal spacing="2">
  <Button variant="text">Cancelar</Button>
  <Button variant="filled" color="primary">Guardar</Button>
</Stack>

// 3. Menu vertical compacto
<Stack size="sm">
  <NavItem href="/dashboard">Dashboard</NavItem>
  <NavItem href="/settings">Ajustes</NavItem>
  <NavItem href="/profile">Perfil</NavItem>
</Stack>
```

## Estructura de archivos

```
Stack/
  Stack.tsx            Componente principal
  Stack.types.ts       Interfaces TypeScript
  Stack.constants.ts   CSS class tokens y defaults
  Stack.utils.ts       buildStackClasses()
  README.md            Esta documentacion
```

CSS: clases `w3f-stack`, `w3f-stack-sm`, `w3f-h-stack` en `src/w3fussion/LAYOUT/_stack.css`
