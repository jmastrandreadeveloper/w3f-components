# Image

Componente de imagen responsivo con esquinas redondeadas, sombras, bordes, filtros CSS y efectos hover. Extiende `React.ImgHTMLAttributes` para pasar cualquier atributo nativo a la etiqueta `<img>`.

## Importacion

```tsx
import { Image } from '@/components/DATADISPLAY/Image/Image';
```

## Uso basico

```tsx
<Image src="https://picsum.photos/400/300" alt="Descripcion de la imagen" />
```

Con dimensiones explicitas:

```tsx
<Image
  src="https://picsum.photos/400/300"
  alt="Paisaje"
  width={400}
  height={300}
/>
```

## Border radius

```tsx
<Image src="..." alt="..." rounded="sm" />   {/* border-radius pequeño */}
<Image src="..." alt="..." rounded="md" />   {/* border-radius medio */}
<Image src="..." alt="..." rounded="lg" />   {/* border-radius grande */}
<Image src="..." alt="..." circle />          {/* circulo perfecto */}
```

## Sombras

```tsx
<Image src="..." alt="..." shadow="sm" />
<Image src="..." alt="..." shadow="md" />
<Image src="..." alt="..." shadow="lg" />
<Image src="..." alt="..." shadow="xl" />
```

## Borde

```tsx
<Image src="..." alt="..." border />
<Image src="..." alt="..." border rounded="lg" />
<Image src="..." alt="..." border circle />
```

El borde usa `--w3f-img-border-width` y `--w3f-img-border-color`.

## Filtros CSS

Los filtros se aplican sobre la imagen y se eliminan al hacer hover:

```tsx
<Image src="..." alt="..." filter="grayscale" />
<Image src="..." alt="..." filter="sepia" />
<Image src="..." alt="..." filter="opacity" />
```

## Efectos hover

```tsx
<Image src="..." alt="..." hoverEffect="zoom" rounded="md" shadow="md" />
<Image src="..." alt="..." hoverEffect="lift" rounded="md" shadow="md" />
```

- `zoom`: escala la imagen a `--w3f-img-hover-zoom-scale` (default 1.05) al hacer hover
- `lift`: eleva la imagen `--w3f-img-hover-lift-y` px y aplica shadow de elevacion

## Clase en el wrapper

```tsx
<Image
  src="..."
  alt="..."
  rounded="sm"
  shadow="lg"
  wrapperClassName="mi-frame-polaroid"
/>
```

## CSS Custom Properties

```css
.mi-galeria {
  --w3f-img-border-width: 2px;
  --w3f-img-border-color: var(--w3f-gray-300);
  --w3f-img-hover-zoom-scale: 1.08;
  --w3f-img-hover-lift-y: -6px;
  --w3f-img-hover-lift-shadow: 0 16px 24px -6px rgba(0, 0, 0, 0.25);
  --w3f-img-transition: 0.3s ease;
  --w3f-img-filter-opacity: 0.5;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-img-border-width` | `2px` | Ancho del borde cuando `border=true` |
| `--w3f-img-border-color` | `gray-300` | Color del borde |
| `--w3f-img-hover-zoom-scale` | `1.05` | Factor de escala en hoverEffect=zoom |
| `--w3f-img-hover-lift-y` | `-4px` | Desplazamiento Y en hoverEffect=lift |
| `--w3f-img-hover-lift-shadow` | sombra media | Box-shadow en lift hover |
| `--w3f-img-transition` | `normal` | Duracion/curva de transicion |
| `--w3f-img-filter-opacity` | `0.6` | Opacidad en filter=opacity |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `src` | `string` | — **(requerido)** | URL de la imagen |
| `alt` | `string` | — **(requerido)** | Texto alternativo accesible |
| `rounded` | `'sm' \| 'md' \| 'lg'` | — | Nivel de border-radius |
| `circle` | `boolean` | `false` | Forma circular (border-radius 50%) |
| `border` | `boolean` | `false` | Borde visible alrededor de la imagen |
| `shadow` | `'sm' \| 'md' \| 'lg' \| 'xl'` | — | Nivel de sombra |
| `filter` | `'grayscale' \| 'sepia' \| 'opacity'` | — | Filtro CSS con transicion al hover |
| `hoverEffect` | `'zoom' \| 'lift'` | — | Animacion al pasar el cursor |
| `className` | `string` | `''` | Clases adicionales para la etiqueta `<img>` |
| `wrapperClassName` | `string` | `''` | Clases adicionales para el `<div>` wrapper |
| `width` | `number` | — | Ancho en pixeles (`width` attr del img) |
| `height` | `number` | — | Alto en pixeles (`height` attr del img) |
| `...rest` | `ImgHTMLAttributes` | — | Cualquier atributo HTML nativo de `<img>` (loading, decoding, etc.) |

## API

### Entrada de datos

| Via | Prop | Descripcion |
|---|---|---|
| URL | `src` | URL externa, dataURL o ruta relativa. Requerido |
| Texto alt | `alt` | Requerido para accesibilidad. Describe el contenido de la imagen |
| Dimensiones | `width` / `height` | Definen el aspect ratio para evitar layout shift (CLS) |
| Atributos nativos | `...rest` | `loading="lazy"`, `decoding="async"`, `fetchPriority`, `sizes`, `srcSet`, etc. |

Para lazy loading nativo:

```tsx
<Image
  src="https://..."
  alt="..."
  width={800}
  height={600}
  loading="lazy"
  decoding="async"
/>
```

### Salida de datos

El componente Image **no emite callbacks propios**. Los eventos del elemento `<img>` se pasan via spread:

```tsx
<Image
  src="..."
  alt="..."
  onClick={() => abrirLightbox(src)}
  onLoad={() => setLoaded(true)}
  onError={() => setError(true)}
/>
```

### Comunicacion con otros componentes

El componente Image es **completamente independiente**. No consume ningun Context ni requiere Provider. Se puede combinar con otros componentes de layout:

```tsx
// En una galeria
<Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="1rem">
  {photos.map(photo => (
    <Image
      key={photo.id}
      src={photo.url}
      alt={photo.title}
      rounded="md"
      shadow="sm"
      hoverEffect="zoom"
      width={400}
      height={300}
      onClick={() => setLightbox(photo)}
    />
  ))}
</Grid>
```

### Estructura DOM

```
div.w3f-image-wrapper [wrapperClassName]
  img.w3f-image [+ modifiers] [className]
```

Las clases de modificador sobre `<img>`:
- `w3f-image--rounded-sm/md/lg`
- `w3f-image--circle`
- `w3f-image--border`
- `w3f-image--shadow-sm/md/lg/xl`
- `w3f-image--filter-grayscale/sepia/opacity`
- `w3f-image--hover-zoom`
- `w3f-image--hover-lift`

### Accesibilidad

| Atributo | Requerimiento | Descripcion |
|---|---|---|
| `alt` | Requerido | Texto alternativo para lectores de pantalla. Para imagenes decorativas usar `alt=""` |
| `width` + `height` | Recomendado | Previene Cumulative Layout Shift (CLS) al reservar el espacio antes de carga |
| `loading="lazy"` | Opcional via spread | Lazy loading nativo del navegador para imagenes fuera del viewport |

### Patron de uso recomendado

```tsx
// 1. Imagen en tarjeta de contenido
<Image
  src={article.coverUrl}
  alt={article.title}
  rounded="md"
  shadow="sm"
  width={600}
  height={400}
  loading="lazy"
/>

// 2. Foto de perfil circular
<Image
  src={user.avatarUrl}
  alt={`Foto de ${user.name}`}
  circle
  border
  width={80}
  height={80}
/>

// 3. Galeria con hover
<Image
  src={photo.url}
  alt={photo.description}
  rounded="lg"
  shadow="md"
  hoverEffect="zoom"
  onClick={() => openLightbox(photo)}
/>

// 4. Imagen editorial con marco
<Image
  src="..."
  alt="..."
  rounded="sm"
  shadow="lg"
  wrapperClassName="demo-img-polaroid"
/>
```

## Estructura de archivos

```
Image/
  Image.tsx           Componente principal
  Image.types.ts      Interfaces TypeScript
  Image.utils.ts      buildImageClasses()
  README.md           Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_image.css`
