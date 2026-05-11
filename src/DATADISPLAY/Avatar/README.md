# Avatar

Componente de representacion visual de usuarios o entidades. Muestra una imagen, iniciales o un icono de respaldo dentro de un circulo con color configurable.

## Importacion

```tsx
import Avatar, { AvatarGroup } from '@/components/DATADISPLAY/Avatar/Avatar';
```

## Uso basico

### Con imagen

```tsx
<Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />
```

### Con iniciales

Cuando no hay imagen disponible, muestra iniciales con color de fondo:

```tsx
<Avatar color="blue">AB</Avatar>
<Avatar color="red">CD</Avatar>
<Avatar color="teal">EF</Avatar>
```

### Con icono de respaldo

Usa cualquier icono de Lucide como contenido:

```tsx
import { User } from 'lucide-react';

<Avatar color="gray"><User size={20} /></Avatar>
```

## Tamanos

Cuatro tamanos predefinidos controlados por CSS custom properties:

```tsx
<Avatar src="/foto.jpg" size="small" />   {/* 32px */}
<Avatar src="/foto.jpg" size="medium" />  {/* 48px (default) */}
<Avatar src="/foto.jpg" size="large" />   {/* 64px */}
<Avatar src="/foto.jpg" size="xlarge" />  {/* 96px */}
```

## Indicador de estado

Muestra un punto de color indicando presencia del usuario:

```tsx
<Avatar src="/foto.jpg" status="online" />
<Avatar src="/foto.jpg" status="offline" />
<Avatar src="/foto.jpg" status="busy" />
<Avatar src="/foto.jpg" status="away" />
```

## Badge numerico

Superpone un contador en la esquina superior derecha. Valores mayores a 99 se muestran como "99+":

```tsx
<Avatar src="/foto.jpg" badge={3} />
<Avatar src="/foto.jpg" badge={150} />  {/* muestra "99+" */}
```

## Avatar Group

Apila multiples avatares con superposicion. El prop `max` limita los visibles y muestra un contador del excedente:

```tsx
<AvatarGroup max={4}>
  <Avatar src="/foto1.jpg" />
  <Avatar src="/foto2.jpg" />
  <Avatar src="/foto3.jpg" />
  <Avatar src="/foto4.jpg" />
  <Avatar src="/foto5.jpg" />
  <Avatar src="/foto6.jpg" />
</AvatarGroup>
{/* Muestra 4 avatares + "+2" */}
```

## Modo interactivo

### Hoverable

Agrega efecto de escala al pasar el cursor:

```tsx
<Avatar src="/foto.jpg" hoverable onClick={() => abrirPerfil()} />
```

### Uploadable (selector de imagen)

Convierte el avatar en un boton que abre el file picker del sistema operativo. El resultado es un dataURL:

```tsx
<Avatar
  uploadable
  color="gray"
  size="xlarge"
  onChange={(dataUrl) => console.log('Nueva imagen:', dataUrl)}
>
  +
</Avatar>
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el avatar lee y escribe en `FormContext`:

```tsx
<Form initialValues={{ foto: '' }} onSubmit={handleSubmit}>
  <Avatar name="foto" uploadable size="xlarge" color="gray">?</Avatar>
  <Button type="submit">Guardar</Button>
</Form>
```

## CSS Custom Properties

El avatar es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
.mi-avatar-custom {
  --w3f-avatar-size: 72px;
  --w3f-avatar-bg: linear-gradient(135deg, #667eea, #764ba2);
  --w3f-avatar-border-width: 3px;
  --w3f-avatar-border-color: gold;
  --w3f-avatar-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  --w3f-avatar-hover-scale: 1.1;
  --w3f-avatar-hover-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-avatar-size` | per size class | Ancho y alto |
| `--w3f-avatar-bg` | per color class | Color de fondo |
| `--w3f-avatar-color` | `on-primary` | Color del texto |
| `--w3f-avatar-radius` | `radius-full` | Border radius |
| `--w3f-avatar-border-width` | `0` | Ancho del borde |
| `--w3f-avatar-border-color` | `transparent` | Color del borde |
| `--w3f-avatar-shadow` | `none` | Box shadow |
| `--w3f-avatar-font-size` | per size class | Tamano de iniciales |
| `--w3f-avatar-font-weight` | `500` | Peso de iniciales |
| `--w3f-avatar-transition` | `transform, box-shadow` | Transicion |
| `--w3f-avatar-hover-scale` | `1.05` | Escala en hover |
| `--w3f-avatar-hover-shadow` | `shadow-md` | Sombra en hover |
| `--w3f-avatar-img-fit` | `cover` | Object-fit de la imagen |
| `--w3f-avatar-img-filter` | `none` | Filtro CSS de la imagen |
| `--w3f-avatar-img-opacity` | `1` | Opacidad de la imagen |
| `--w3f-avatar-status-size` | `25%` | Tamano del punto de estado |
| `--w3f-avatar-status-ring-width` | `2px` | Anillo del punto de estado |
| `--w3f-avatar-badge-bg` | `danger-500` | Fondo del badge |
| `--w3f-avatar-badge-color` | `on-primary` | Color del badge |
| `--w3f-avatar-group-overlap` | `12px` | Superposicion en grupo |
| `--w3f-avatar-group-hover-lift` | `-4px` | Elevacion hover en grupo |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `src` | `string` | — | URL de la imagen |
| `alt` | `string` | `'Avatar'` | Texto alternativo |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Tamano |
| `color` | `AvatarColor` | `'gray'` | Color de fondo (17 opciones) |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | — | Indicador de presencia |
| `badge` | `number` | — | Contador superpuesto |
| `hoverable` | `boolean` | `false` | Efecto hover interactivo |
| `uploadable` | `boolean` | `false` | Modo selector de imagen |
| `accept` | `string` | `'image/*'` | Tipos MIME aceptados |
| `name` | `string` | — | Campo en Form/LiveForm |
| `onChange` | `(value: string) => void` | — | Callback al cambiar imagen |
| `onClick` | `MouseEventHandler` | — | Handler de clic |
| `className` | `string` | `''` | Clases CSS adicionales |
| `children` | `ReactNode` | — | Iniciales o contenido |

## API

### Entrada de datos

El Avatar acepta datos por tres vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Imagen URL | `src` | `string` | URL externa o dataURL base64. Prioridad maxima |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` como dataURL. Se usa cuando `src` no esta definido |
| Children | `children` | `ReactNode` | Iniciales (texto) o icono de Lucide como fallback visual |

**Prioridad de resolucion de imagen:**
```
src prop  →  FormContext.values[name]  →  children  →  "?"
```

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(dataUrl: string) => void` | El usuario selecciona un archivo en modo `uploadable`. Emite el contenido del archivo como dataURL base64 |
| `onClick` | `(e: MouseEvent<HTMLDivElement>) => void` | Click sobre el avatar (cualquier modo) |

En modo `uploadable`, el flujo completo es:
1. Click en avatar → abre `<input type="file">` nativo (hidden)
2. Usuario selecciona archivo
3. `FileReader.readAsDataURL()` convierte a base64
4. Se llama `FormContext.setFieldValue(name, dataUrl)` si esta dentro de Form
5. Se llama `onChange(dataUrl)` si el callback esta definido

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El Avatar consume `FormContext` via `useAvatarForm(name)`. La comunicacion es **bidireccional**:

```
Form.initialValues.foto = ""
        ↓ (lectura)
Avatar lee FormContext.values["foto"] como src
        ↓ (usuario sube imagen)
Avatar escribe FormContext.setFieldValue("foto", dataUrl)
        ↓ (propagacion)
Form.onSubmit recibe { foto: "data:image/png;base64,..." }
```

**Patron de deteccion:** `isFormControlled = !!(formContext && name)` — si `formContext` es `null` (fuera de Form) o `name` no existe, el Avatar funciona de forma independiente sin errores.

#### Con AvatarGroup (padre → hijo)

`AvatarGroup` es un **compound component** que no inyecta props. Solo controla visibilidad:

```tsx
<AvatarGroup max={3}>
  <Avatar ... />   {/* visible */}
  <Avatar ... />   {/* visible */}
  <Avatar ... />   {/* visible */}
  <Avatar ... />   {/* oculto, contribuye a "+2" */}
  <Avatar ... />   {/* oculto, contribuye a "+2" */}
</AvatarGroup>
```

Internamente usa `React.Children.toArray()` → `.slice(0, max)` para limitar los visibles y renderiza un Avatar extra con `+N` para el excedente.

#### Independiente (sin contexto requerido)

El Avatar no requiere ningun Provider ni Context para funcionar. Todos sus modos (imagen, iniciales, icono, status, badge) operan de forma autonoma:

```tsx
// Funciona en cualquier parte del arbol React
<Avatar src="/foto.jpg" status="online" badge={3} />
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"button"` | Cuando `onClick` o `uploadable` estan definidos |
| `tabIndex` | `0` | Cuando `role="button"` |
| `aria-label` | `"{alt} – clic para cambiar imagen"` | Cuando `uploadable` es `true` |
| `aria-hidden` | `"true"` | En el `<input type="file">` oculto |

### Patron de uso recomendado

```tsx
// 1. Display simple — sin interaccion
<Avatar src={user.avatar} alt={user.name} size="medium" />

// 2. Con estado de presencia
<Avatar src={user.avatar} status={user.isOnline ? 'online' : 'offline'} />

// 3. Selector de foto de perfil en formulario
<Form initialValues={{ avatar: '' }} onSubmit={save}>
  <Avatar name="avatar" uploadable size="xlarge" color="gray">
    <Camera size={24} />
  </Avatar>
</Form>

// 4. Lista de participantes
<AvatarGroup max={5}>
  {participants.map(p => (
    <Avatar key={p.id} src={p.avatar} alt={p.name} />
  ))}
</AvatarGroup>
```

## Colores disponibles

`red` · `pink` · `purple` · `deep-purple` · `indigo` · `blue` · `light-blue` · `cyan` · `teal` · `green` · `light-green` · `lime` · `yellow` · `amber` · `orange` · `brown` · `gray`

## Estructura de archivos

```
Avatar/
  Avatar.tsx            Componente principal + AvatarGroup
  Avatar.types.ts       Interfaces TypeScript
  Avatar.constants.ts   Clases CSS y defaults
  Avatar.utils.ts       buildAvatarClasses()
  Avatar.hooks.ts       useAvatarForm (integracion Form)
  README.md             Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_avatar.css`
