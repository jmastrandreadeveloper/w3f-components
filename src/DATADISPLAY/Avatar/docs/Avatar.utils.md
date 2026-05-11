# Avatar.utils.ts

**Ruta:** `src/components/DATADISPLAY/Avatar/Avatar.utils.ts`

---

## Finalidad

Contiene la lógica pura de construcción de clases CSS para el elemento raíz del Avatar.
Al ser una función sin efectos secundarios (sin estado, sin React, sin DOM), puede
probarse de forma aislada con cualquier test runner.

Este archivo NO contiene JSX. Solo opera sobre strings y booleans para producir
una cadena de clases CSS.

---

## Exports

### `buildAvatarClasses`

```ts
function buildAvatarClasses(
  size:      AvatarSize,
  hoverable: boolean,
  src:       string | undefined,
  color:     string,
  className: string
): string
```

#### Parámetros

| Parámetro | Tipo | Descripción |
|---|---|---|
| `size` | `AvatarSize` | Tamaño deseado. Resuelto contra `AVATAR_SIZE_CLASSES`. |
| `hoverable` | `boolean` | `true` cuando `hoverable` o `uploadable` están activos. |
| `src` | `string \| undefined` | URL de imagen efectiva (puede venir de prop o del Form). |
| `color` | `string` | Valor del prop `color`. Solo aplica si no hay imagen. |
| `className` | `string` | Clases CSS extra aportadas por el consumidor. |

#### Retorno

Cadena de clases CSS unidas por espacios, sin duplicados ni valores vacíos.

#### Lógica interna

```ts
return [
  'w3f-avatar',                                    // 1. Clase base siempre presente
  'w3f-avatar-circle',                             // 2. Forma circular (border-radius full)
  AVATAR_SIZE_CLASSES[size] || AVATAR_SIZE_CLASSES.medium, // 3. Clase de tamaño con fallback
  hoverable && 'w3f-avatar-hoverable',             // 4. Hover solo si aplica
  !src && `w3f-avatar-${color}`,                   // 5. Color de fondo solo sin imagen
  className                                        // 6. Clases custom del consumidor
].filter(Boolean).join(' ');
```

**Descripción de cada paso:**

1. **Clase base** — `.w3f-avatar` aplica `display: inline-flex`, `overflow: hidden`,
   `user-select: none` y la transición. Siempre presente.

2. **Forma circular** — `.w3f-avatar-circle` aplica `border-radius: var(--w3f-radius-full)`.
   Se mantiene como clase separada para permitir en el futuro variantes cuadradas sin
   modificar la base.

3. **Tamaño con fallback** — Si `size` es un valor fuera del mapa (e.g., por un dato
   dinámico inesperado), la expresión `|| AVATAR_SIZE_CLASSES.medium` garantiza que
   siempre haya una clase de tamaño válida.

4. **Hoverable condicional** — Solo se añade `.w3f-avatar-hoverable` si `hoverable` es
   `true`. En `Avatar.tsx` este parámetro recibe `hoverable || uploadable`, por lo que
   el modo upload también activa el cursor pointer y el efecto scale.

5. **Color condicional** — La clase de color (`.w3f-avatar-{color}`) se omite cuando
   hay imagen (`src` truthy). Con imagen, el fondo queda oculto y añadir la clase sería
   inútil y confuso.

6. **Clases custom** — Se agregan al final para que el consumidor pueda sobrescribir
   estilos si lo necesita. La cadena vacía `''` es eliminada por `filter(Boolean)`.

#### Ejemplos de salida

```ts
// Avatar con imagen, grande, sin hover
buildAvatarClasses('large', false, 'https://...', 'blue', '')
// → 'w3f-avatar w3f-avatar-circle w3f-avatar-large'

// Avatar de iniciales, mediano, hoverable, color teal
buildAvatarClasses('medium', true, undefined, 'teal', 'mi-clase')
// → 'w3f-avatar w3f-avatar-circle w3f-avatar-medium w3f-avatar-hoverable w3f-avatar-teal mi-clase'

// Avatar uploadable (src del Form disponible, tamaño xlarge)
buildAvatarClasses('xlarge', true, 'data:image/png;base64,...', 'gray', '')
// → 'w3f-avatar w3f-avatar-circle w3f-avatar-xlarge w3f-avatar-hoverable'
//    (no agrega color porque hay imagen)
```

---

## Interacción con otros archivos

| Archivo | Relación |
|---|---|
| `Avatar.constants.ts` | Importa `AVATAR_SIZE_CLASSES` para resolver el tamaño |
| `Avatar.types.ts` | Importa `AvatarSize` para tipar el primer parámetro |
| `Avatar.tsx` | Llama a `buildAvatarClasses(size, hoverable \|\| uploadable, effectiveSrc, color, className)` |

---

## Testabilidad

Al ser una función pura, se puede probar directamente:

```ts
import { buildAvatarClasses } from './Avatar.utils';

test('añade color solo sin imagen', () => {
  const sinImg = buildAvatarClasses('medium', false, undefined, 'blue', '');
  expect(sinImg).toContain('w3f-avatar-blue');

  const conImg = buildAvatarClasses('medium', false, 'foto.jpg', 'blue', '');
  expect(conImg).not.toContain('w3f-avatar-blue');
});
```
