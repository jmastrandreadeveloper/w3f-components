# Tag

Componente de etiqueta de color para categorizar, marcar estados o etiquetar contenido. Similar a la clase `w3-tag` de W3.CSS. Acepta cualquier contenido como children incluyendo texto, iconos o combinaciones.

## Importacion

```tsx
import Tag from '@/components/DATADISPLAY/Tag/Tag';
```

## Uso basico

```tsx
<Tag color="primary">Primary</Tag>
<Tag color="success">Success</Tag>
<Tag color="danger">Danger</Tag>
```

## Colores

Siete colores semanticos disponibles:

```tsx
<Tag color="primary">primary</Tag>
<Tag color="secondary">secondary</Tag>
<Tag color="success">success</Tag>
<Tag color="warning">warning</Tag>
<Tag color="danger">danger</Tag>
<Tag color="info">info</Tag>
<Tag color="gray">gray</Tag>
```

## Variante light

La variante `light` usa un tono mas suave del color, ideal para presencias UI menos prominentes:

```tsx
<Tag color="primary" light>Primary Light</Tag>
<Tag color="success" light>Success Light</Tag>
<Tag color="danger" light>Danger Light</Tag>
```

## Con iconos

Los children aceptan cualquier ReactNode, permitiendo combinar iconos de Lucide con texto:

```tsx
import { Star, Shield, Zap } from 'lucide-react';

<Tag color="warning">
  <Star size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
  Featured
</Tag>

<Tag color="success">
  <Shield size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
  Secure
</Tag>
```

## Tag con accion de cierre

Tag no tiene un boton de cierre integrado. Para tags eliminables, incluir un icono `X` como children:

```tsx
import { X } from 'lucide-react';

const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

{tags.map(tag => (
  <Tag key={tag} color="primary" light>
    {tag}
    <X
      size={14}
      style={{ marginLeft: 6, cursor: 'pointer', verticalAlign: 'middle' }}
      onClick={() => setTags(prev => prev.filter(t => t !== tag))}
    />
  </Tag>
))}
```

## Tag clickable

Tag acepta todos los atributos HTML de `<span>`, incluido `onClick`:

```tsx
<Tag color="primary" onClick={() => alert('clicked')} style={{ cursor: 'pointer' }}>
  Click Me
</Tag>
```

## Modo unstyled

Elimina todos los estilos visuales para componer apariencia via trait classes o CSS propio:

```tsx
<Tag color="primary" unstyled className="mi-tag-custom">
  Custom
</Tag>
```

## CSS Custom Properties

```css
.mi-tag-custom {
  --w3f-tag-bg: linear-gradient(135deg, #667eea, #764ba2);
  --w3f-tag-color: #fff;
  --w3f-tag-radius: var(--w3f-radius-full);
  --w3f-tag-font-weight: 700;
  --w3f-tag-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tag-bg` | per color class | Color o gradiente de fondo |
| `--w3f-tag-color` | `on-primary` | Color del texto |
| `--w3f-tag-px` | `space-2` | Padding horizontal |
| `--w3f-tag-py` | `space-1` | Padding vertical |
| `--w3f-tag-radius` | `radius-md` | Border radius |
| `--w3f-tag-font-size` | `text-sm` | Tamano del texto |
| `--w3f-tag-font-weight` | `500` | Peso del texto |
| `--w3f-tag-line-height` | `1` | Altura de linea |
| `--w3f-tag-white-space` | `nowrap` | Salto de linea del texto |
| `--w3f-tag-border-width` | `0` | Ancho del borde |
| `--w3f-tag-border-color` | `transparent` | Color del borde |
| `--w3f-tag-shadow` | `none` | Box shadow |
| `--w3f-tag-letter-spacing` | `normal` | Espaciado entre letras |
| `--w3f-tag-text-transform` | `none` | Transformacion del texto (uppercase, etc.) |
| `--w3f-tag-transition` | `none` | Transicion CSS |
| `--w3f-tag-cursor` | `default` | Cursor del puntero |
| `--w3f-tag-max-width` | `none` | Ancho maximo |
| `--w3f-tag-hover-bg` | igual a tag-bg | Fondo en hover |
| `--w3f-tag-hover-color` | igual a tag-color | Texto en hover |
| `--w3f-tag-hover-shadow` | igual a tag-shadow | Sombra en hover |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'gray'` | — | **Requerido.** Color semantico de la etiqueta |
| `light` | `boolean` | `false` | Variante de color suave |
| `children` | `ReactNode` | — | **Requerido.** Contenido (texto, iconos, etc.) |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | `{}` | Estilos en linea |
| `unstyled` | `boolean` | `false` | Elimina estilos visuales |
| `...rest` | `HTMLAttributes<HTMLSpanElement>` | — | Cualquier atributo HTML de span |

## API

### Entrada de datos

Tag es un componente de **display puro** sin estado interno. Toda la informacion llega exclusivamente por props:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Color | `color` | `TagColor` | Determina el color de fondo y texto segun el sistema de colores del framework |
| Variante | `light` | `boolean` | Activa la variante suave del color seleccionado |
| Contenido | `children` | `ReactNode` | Cualquier contenido: texto plano, iconos Lucide, JSX mixto |
| Estilo | `className` / `style` | `string / CSSProperties` | Personalizacion visual adicional |

### Salida de datos

Tag **no emite ningun callback propio**. No tiene `onChange`, `onClose` ni ninguna funcion de salida nativa:

- No lee ni escribe en `FormContext`
- No tiene estado de seleccion ni eliminacion propio
- Acepta todos los atributos HTML nativos de `<span>` via `...rest`, por lo que el padre puede agregar `onClick` si necesita interactividad

### Comunicacion con otros componentes

#### Independiente (sin contexto requerido)

Tag es completamente autonomo. No requiere ningun Provider, Context ni componente padre especifico. Funciona en cualquier parte del arbol React:

```tsx
// Funciona en cualquier contexto
<Tag color="success">Activo</Tag>
```

#### Sin FormContext

Tag **no consume FormContext** y no se integra con `Form` / `LiveForm`. Es un componente de presentacion puro orientado a display, no a captura de datos.

#### Patrones de composicion con otros componentes

Tag se combina naturalmente con otros componentes del framework:

```tsx
// Con X de Lucide para eliminacion
<Tag color="primary" light>
  React
  <X size={14} onClick={handleRemove} />
</Tag>

// Con iconos para enriquecer el contexto
<Tag color="warning">
  <Star size={14} />
  Destacado
</Tag>

// En contenedores Grid o flex
<Grid templateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap="0.5rem">
  {categories.map(cat => (
    <Tag key={cat.id} color={cat.color}>{cat.name}</Tag>
  ))}
</Grid>
```

### Accesibilidad

Tag renderiza un elemento `<span>` sin semantica interactiva por defecto. Consideraciones:

| Situacion | Recomendacion |
|---|---|
| Tag solo de display | Sin cambios — `<span>` es semanticamente neutro |
| Tag clickable | Agregar `role="button"` y `tabIndex={0}` via `...rest` |
| Tag con X de cierre | El `X` debe tener `aria-label="Eliminar etiqueta {nombre}"` |
| Lista de tags | Envolver en `<ul>/<li>` o agregar `role="list"` al contenedor |

### Patron de uso recomendado

```tsx
// 1. Etiquetas de categoria en tarjetas
<Tag color="info">Frontend</Tag>
<Tag color="success">Open Source</Tag>

// 2. Estado de un item
<Tag color={item.active ? 'success' : 'gray'} light>
  {item.active ? 'Activo' : 'Inactivo'}
</Tag>

// 3. Lista de tags eliminables
const [tags, setTags] = useState(['React', 'TypeScript']);

<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
  {tags.map(tag => (
    <Tag key={tag} color="primary" light>
      {tag}
      <X
        size={14}
        style={{ marginLeft: 6, cursor: 'pointer' }}
        onClick={() => setTags(prev => prev.filter(t => t !== tag))}
      />
    </Tag>
  ))}
</div>

// 4. Tag con tema custom via CSS variables
.estado-critico {
  --w3f-tag-bg: #fff1f2;
  --w3f-tag-color: #e11d48;
  --w3f-tag-border-width: 1px;
  --w3f-tag-border-color: #fecdd3;
}

<Tag color="danger" className="estado-critico">Critico</Tag>
```

## Estructura de archivos

```
Tag/
  Tag.tsx           Componente principal
  Tag.types.ts      Interfaces TypeScript (TagProps, TagColor)
  Tag.utils.ts      buildTagClasses()
  README.md         Esta documentacion
```

CSS: `src/w3fussion/PRESETS/_tag.preset.css`
