# Avatar.types.ts

**Ruta:** `src/components/DATADISPLAY/Avatar/Avatar.types.ts`

---

## Finalidad

Define el contrato TypeScript completo del componente Avatar. Centraliza todos los tipos,
enumeraciones y shapes de props que usan el componente principal (`Avatar.tsx`) y el
componente de grupo (`AvatarGroup`). Ningún archivo del módulo define tipos propios;
todos los importan desde aquí.

---

## Exports

### `AvatarSize`

```ts
type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
```

Controla el diámetro del avatar mediante clases CSS dedicadas.

| Valor | Diámetro | Font-size |
|---|---|---|
| `small` | 32 px | `--w3f-text-xs` |
| `medium` | 48 px | `--w3f-text-base` |
| `large` | 64 px | `--w3f-text-xl` |
| `xlarge` | 96 px | `--w3f-text-3xl` |

**Responsive:** en pantallas `≤ 640px` el tamaño `xlarge` se reduce a 80 px.

---

### `AvatarColor`

```ts
type AvatarColor =
  | 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue'
  | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green'
  | 'lime' | 'yellow' | 'amber' | 'orange' | 'brown' | 'gray';
```

Color de fondo del avatar cuando **no** se provee una imagen (`src`). Cada valor mapea a
una clase CSS `.w3f-avatar-{color}` que usa tokens del design system W3F o valores
hexadecimales fijos para colores que no tienen token definido.

> **Nota:** cuando `src` está presente (o cuando el form controlado tiene un valor),
> el color de fondo queda oculto por la imagen y este prop no tiene efecto visual.

---

### `AvatarStatus`

```ts
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
```

Estado de presencia del usuario. Cuando se pasa esta prop, el componente envuelve el
avatar en un `.w3f-avatar-wrapper` y muestra un punto de color superpuesto en la
esquina inferior derecha.

| Valor | Color CSS |
|---|---|
| `online` | `var(--w3f-success-500)` — verde |
| `offline` | `var(--w3f-gray-400)` — gris |
| `busy` | `var(--w3f-danger-500)` — rojo |
| `away` | `var(--w3f-warning-500)` — amarillo/naranja |

---

### `AvatarProps`

```ts
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  status?: AvatarStatus;
  badge?: number;
  hoverable?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  name?: string;
  onChange?: (value: string) => void;
  uploadable?: boolean;
  accept?: string;
}
```

#### Descripción de cada prop

| Prop | Tipo | Comportamiento |
|---|---|---|
| `src` | `string` | Si se provee, muestra un `<img>`. Tiene prioridad sobre el valor del Form. |
| `alt` | `string` | Texto alternativo de la imagen. Por defecto `'Avatar'`. |
| `size` | `AvatarSize` | Tamaño. Por defecto `'medium'`. |
| `color` | `AvatarColor` | Color de fondo cuando no hay imagen. Por defecto `'gray'`. |
| `status` | `AvatarStatus` | Activa el punto de presencia. Fuerza el wrapper. |
| `badge` | `number` | Activa el badge numérico. Fuerza el wrapper. Valores > 99 muestran `99+`. |
| `hoverable` | `boolean` | Añade `cursor: pointer` y escala 1.05 al hover. |
| `uploadable` | `boolean` | Convierte el avatar en selector de archivos al hacer clic. |
| `accept` | `string` | Filtro de tipos MIME para el input file. Por defecto `'image/*'`. |
| `name` | `string` | Nombre del campo. Si hay `FormContext` activo, lee y escribe en él. |
| `onChange` | `(value: string) => void` | Callback alternativo al `FormContext`. Recibe el `dataURL`. |
| `onClick` | `MouseEventHandler` | Handler de clic personalizado (compatible con `uploadable`). |
| `className` | `string` | Clases CSS adicionales al wrapper principal. |
| `children` | `ReactNode` | Iniciales u otro contenido de respaldo cuando no hay imagen. |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | Cualquier atributo HTML válido para un `<div>`. |

#### Relación `src` vs. Form vs. `children`

```
¿Hay src explícito?
  └─ Sí → muestra la imagen (src tiene prioridad absoluta)
  └─ No → ¿hay FormContext con name y valor?
             └─ Sí → muestra el dataURL del formulario como imagen
             └─ No → muestra children (iniciales) o '?' como fallback
```

---

### `AvatarGroupProps`

```ts
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}
```

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `children` | `ReactNode` | — | Instancias de `<Avatar>` a apilar |
| `max` | `number` | `5` | Límite de avatares visibles. El excedente se muestra como `+N`. |
| `className` | `string` | `''` | Clases adicionales al contenedor `.w3f-avatar-group`. |

---

## Interacción con otros archivos

| Consumidor | Qué importa |
|---|---|
| `Avatar.tsx` | `AvatarProps`, `AvatarGroupProps` |
| `Avatar.utils.ts` | `AvatarSize` |
| `Avatar.constants.ts` | `AvatarSize`, `AvatarColor` |
| `Avatar.hooks.ts` | _(no importa tipos de aquí; usa los de Form)_ |
