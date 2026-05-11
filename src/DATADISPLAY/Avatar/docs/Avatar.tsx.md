# Avatar.tsx

**Ruta:** `src/components/DATADISPLAY/Avatar/Avatar.tsx`

---

## Finalidad

Es el punto de entrada del módulo. Exporta dos componentes React:

| Componente | Export | Descripción |
|---|---|---|
| `Avatar` | `default` | Componente individual de avatar |
| `AvatarGroup` | named | Contenedor apilado de múltiples avatares |

Orquesta los otros archivos del módulo: recibe props, resuelve el estado
efectivo (imagen, modo de control), construye clases CSS y renderiza el árbol JSX.

---

## Imports internos

```ts
import React, { useRef }             from 'react';
import type { AvatarProps, AvatarGroupProps } from './Avatar.types';
import { buildAvatarClasses }        from './Avatar.utils';
import { useAvatarForm }             from './Avatar.hooks';
import { AVATAR_DEFAULTS }           from './Avatar.constants';
```

| Import | Archivo fuente | Para qué |
|---|---|---|
| `AvatarProps` | `Avatar.types.ts` | Contrato TypeScript del componente principal |
| `AvatarGroupProps` | `Avatar.types.ts` | Contrato del grupo |
| `buildAvatarClasses` | `Avatar.utils.ts` | Construir la cadena de clases CSS |
| `useAvatarForm` | `Avatar.hooks.ts` | Integración con FormContext |
| `AVATAR_DEFAULTS` | `Avatar.constants.ts` | Valores por defecto de las props |

---

## Componente `Avatar`

### Desestructuración de props

```tsx
function Avatar({
  src,
  alt       = AVATAR_DEFAULTS.alt,        // 'Avatar'
  size      = AVATAR_DEFAULTS.size,       // 'medium'
  color     = AVATAR_DEFAULTS.color,      // 'gray'
  status,
  badge,
  hoverable  = AVATAR_DEFAULTS.hoverable, // false
  uploadable = AVATAR_DEFAULTS.uploadable,// false
  accept     = 'image/*',
  className  = AVATAR_DEFAULTS.className, // ''
  children,
  onClick,
  name,
  onChange,
  ...rest                                  // HTML attrs del <div> raíz
}: AvatarProps)
```

El operador `...rest` captura cualquier atributo HTML estándar (`data-*`, `aria-*`,
`style`, etc.) y lo aplica directamente al `<div>` raíz.

---

### Referencias y hooks

```tsx
const fileInputRef = useRef<HTMLInputElement>(null);
const { isFormControlled, formValue, setFormValue } = useAvatarForm(name);
```

- `fileInputRef` — apunta al `<input type="file">` invisible. Se activa programáticamente
  en `handleClick` cuando `uploadable = true`.
- `useAvatarForm(name)` — lee/escribe en `FormContext`. Retorna `isFormControlled: false`
  y no-ops si no hay formulario o no hay `name`.

---

### Resolución del src efectivo

```tsx
const effectiveSrc = src ?? (isFormControlled ? formValue : undefined);
```

**Prioridad de fuente de imagen:**

```
1. src (prop explícita)
     ↓ si undefined
2. formValue (valor del Form/LiveForm, si está controlado)
     ↓ si undefined
3. undefined → muestra children o '?'
```

Esto garantiza que la prop `src` siempre tenga prioridad sobre el valor del formulario,
permitiendo un modo mixto donde el formulario gestiona el estado pero el consumidor
puede forzar una imagen externa.

---

### Clases CSS

```tsx
const avatarClasses = buildAvatarClasses(
  size,
  hoverable || uploadable,  // ambos activan el cursor pointer y efecto hover
  effectiveSrc,             // determina si se añade clase de color
  color,
  className,
);
```

`hoverable || uploadable` — el modo upload implica interactividad, así que activa
automáticamente el estilo hoverable aunque `hoverable` sea `false`.

---

### Handlers de eventos

#### `handleClick`

```tsx
const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  if (uploadable && fileInputRef.current) {
    fileInputRef.current.click(); // dispara el diálogo del OS
  }
  onClick?.(e); // propaga el evento al consumidor
};
```

Si `uploadable` está activo, el clic en el div activa el input file. Además,
el `onClick` externo siempre se ejecuta (si existe), permitiendo combinar
upload y lógica adicional en el mismo gesto.

#### `handleFileChange`

```tsx
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    const dataUrl = reader.result as string;
    setFormValue(dataUrl); // actualiza FormContext
    onChange?.(dataUrl);   // notifica al consumidor
  };
  reader.readAsDataURL(file);
  e.target.value = ''; // permite re-seleccionar el mismo archivo
};
```

**Flujo detallado:**
1. El usuario selecciona un archivo → `input[type=file]` dispara `change`
2. Se toma el primer archivo (`files[0]`)
3. `FileReader` lo convierte a `dataURL` de forma asíncrona
4. Al terminar: `setFormValue` actualiza el Form → el Avatar re-renderiza con la imagen
5. `onChange?.(dataUrl)` notifica externamente (útil fuera de un Form)
6. `e.target.value = ''` limpia el input, permitiendo seleccionar el mismo archivo otra vez

---

### Contenido del avatar (`avatarContent`)

```tsx
const avatarContent = effectiveSrc ? (
  <img src={effectiveSrc} alt={alt} className="w3f-avatar-img" />
) : (
  <span className="w3f-avatar-text">{children || '?'}</span>
);
```

| Condición | Qué renderiza |
|---|---|
| `effectiveSrc` truthy | `<img>` con la URL efectiva |
| Sin imagen | `<span>` con `children` o `'?'` como último recurso |

El `<span>` aplica `text-transform: uppercase` vía CSS, así las iniciales
siempre se muestran en mayúsculas aunque se pasen en minúsculas.

---

### Elemento del avatar (`avatarElement`)

```tsx
const avatarElement = (
  <div
    className={avatarClasses}
    onClick={handleClick}
    role={onClick || uploadable ? 'button' : undefined}
    tabIndex={onClick || uploadable ? 0 : undefined}
    aria-label={uploadable ? `${alt} – clic para cambiar imagen` : undefined}
    {...rest}
  >
    {avatarContent}
    {uploadable && (
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        aria-hidden="true"
      />
    )}
  </div>
);
```

**Detalles de accesibilidad:**

| Atributo | Cuándo aplica | Valor |
|---|---|---|
| `role="button"` | `onClick` o `uploadable` | Indica al AT que es interactivo |
| `tabIndex={0}` | `onClick` o `uploadable` | Permite navegación por teclado |
| `aria-label` | Solo `uploadable` | Describe la acción de subir imagen |
| `aria-hidden` | El `<input type="file">` | El input está oculto; no debe ser anunciado |

**El `<input type="file">`:**
- `display: none` → invisible para el usuario
- Solo se renderiza si `uploadable = true` (condicional)
- `accept={accept}` filtra los tipos de archivo en el selector del SO
- `aria-hidden="true"` lo excluye del árbol de accesibilidad

---

### Ramificación por wrapper

```tsx
if (status || badge !== undefined) {
  return (
    <div className="w3f-avatar-wrapper">
      {avatarElement}
      {status && (
        <span
          className={`w3f-avatar-status w3f-avatar-status-${status}`}
          aria-label={`Estado: ${status}`}
        />
      )}
      {badge !== undefined && (
        <span className="w3f-avatar-badge">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </div>
  );
}

return avatarElement;
```

Cuando se necesita mostrar el indicador de estado o el badge, el componente
envuelve `avatarElement` en un contenedor relativo `.w3f-avatar-wrapper` que
sirve como contexto de posicionamiento absoluto para los overlays.

**Indicador de estado (`.w3f-avatar-status`):**
- Posicionado en `bottom: 0; right: 0`
- Tamaño proporcional al avatar (25% × 25%)
- Color determinado por la clase modificadora: `w3f-avatar-status-{status}`
- Borde blanco (`var(--w3f-surface)`) que lo separa visualmente del avatar

**Badge numérico (`.w3f-avatar-badge`):**
- Posicionado en `top: -4px; right: -4px`
- Rojo (`var(--w3f-danger-500)`) con borde blanco
- Muestra el número o `'99+'` si `badge > 99`

---

## Componente `AvatarGroup`

```tsx
export function AvatarGroup({ children, max = 5, className = '' }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const extraCount = max && childrenArray.length > max
    ? childrenArray.length - max
    : 0;

  return (
    <div className={`w3f-avatar-group ${className}`}>
      {visibleChildren}
      {extraCount > 0 && (
        <Avatar color="gray" size="medium">
          +{extraCount}
        </Avatar>
      )}
    </div>
  );
}
```

### Funcionamiento

1. `React.Children.toArray(children)` — normaliza los hijos a un array plano con keys estables.
2. `childrenArray.slice(0, max)` — toma solo los primeros `max` avatares.
3. Si hay más avatares que `max`, calcula `extraCount = total - max`.
4. Renderiza un `Avatar` adicional de color gris con el texto `+N` para indicar el excedente.

### CSS de superposición

El contenedor `.w3f-avatar-group` usa:
- `display: inline-flex` con `padding-left: 12px`
- Cada hijo tiene `margin-left: -12px` → superposición de 12 px entre avatares
- `border: 2px solid var(--w3f-surface)` → separa visualmente cada avatar
- `:hover` aplica `translateY(-4px) z-index: 10` → efecto "levantar" en hover

---

## Exports del módulo

```ts
export default Avatar;       // import Avatar from './Avatar'
export { AvatarGroup };      // import { AvatarGroup } from './Avatar'
```

Uso combinado:
```tsx
import Avatar, { AvatarGroup } from '@/components/DATADISPLAY/Avatar/Avatar';
```
