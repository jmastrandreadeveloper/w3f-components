# Avatar.constants.ts

**Ruta:** `src/components/DATADISPLAY/Avatar/Avatar.constants.ts`

---

## Finalidad

Centraliza todos los valores fijos del componente Avatar: el mapa de clases CSS por
tamaño y los valores por defecto de cada prop. Esto evita que los literales estén
dispersos en el componente principal y facilita cambios en un único lugar.

---

## Exports

### `AVATAR_SIZE_CLASSES`

```ts
const AVATAR_SIZE_CLASSES: Record<AvatarSize, string> = {
  small:  'w3f-avatar-small',
  medium: 'w3f-avatar-medium',
  large:  'w3f-avatar-large',
  xlarge: 'w3f-avatar-xlarge',
};
```

Mapea cada valor de `AvatarSize` a su clase CSS correspondiente. Este mapa es consumido
por `buildAvatarClasses` en `Avatar.utils.ts` para construir la cadena de clases del
elemento raíz.

**Cómo funciona:**
1. El componente recibe `size` como prop.
2. `buildAvatarClasses` accede a `AVATAR_SIZE_CLASSES[size]`.
3. Si `size` no existe en el mapa (valor inesperado), cae en `|| AVATAR_SIZE_CLASSES.medium`.
4. La clase resultante controla el `width` y `height` vía CSS.

#### Correspondencia CSS

| Clave | Clase CSS | Tamaño aplicado |
|---|---|---|
| `small` | `.w3f-avatar-small` | 32 × 32 px |
| `medium` | `.w3f-avatar-medium` | 48 × 48 px |
| `large` | `.w3f-avatar-large` | 64 × 64 px |
| `xlarge` | `.w3f-avatar-xlarge` | 96 × 96 px |

---

### `AVATAR_DEFAULTS`

```ts
const AVATAR_DEFAULTS = {
  size:       'medium'  as AvatarSize,
  color:      'gray'    as AvatarColor,
  alt:        'Avatar',
  hoverable:  false,
  uploadable: false,
  className:  '',
} as const;
```

Valores por defecto usados directamente en la desestructuración de props en `Avatar.tsx`.
El `as const` garantiza que TypeScript trate cada valor como un literal inmutable.

| Campo | Valor | Razón del default |
|---|---|---|
| `size` | `'medium'` | Tamaño neutro, ni muy pequeño ni dominante |
| `color` | `'gray'` | Color neutro cuando no hay imagen ni color definido |
| `alt` | `'Avatar'` | Texto mínimo accesible para screen readers |
| `hoverable` | `false` | No interactivo por defecto (solo visual) |
| `uploadable` | `false` | No activa el file picker a menos que se solicite explícitamente |
| `className` | `''` | Sin clases extras; no rompe `filter(Boolean)` del builder |

---

## Interacción con otros archivos

| Archivo | Lo que usa |
|---|---|
| `Avatar.tsx` | `AVATAR_DEFAULTS` — para valores por defecto de props desestructuradas |
| `Avatar.utils.ts` | `AVATAR_SIZE_CLASSES` — para construir la cadena de clases |
| `Avatar.types.ts` | Es importado aquí para tipar `AvatarSize` y `AvatarColor` |

---

## Ejemplo de uso implícito (en Avatar.tsx)

```tsx
function Avatar({
  size      = AVATAR_DEFAULTS.size,       // 'medium'
  color     = AVATAR_DEFAULTS.color,      // 'gray'
  alt       = AVATAR_DEFAULTS.alt,        // 'Avatar'
  hoverable = AVATAR_DEFAULTS.hoverable,  // false
  uploadable= AVATAR_DEFAULTS.uploadable, // false
  className = AVATAR_DEFAULTS.className,  // ''
  ...
}: AvatarProps) { ... }
```

Y en `Avatar.utils.ts`:

```ts
AVATAR_SIZE_CLASSES[size] || AVATAR_SIZE_CLASSES.medium
// Ej.: AVATAR_SIZE_CLASSES['large'] → 'w3f-avatar-large'
```
