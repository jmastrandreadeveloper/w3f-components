# ImageGallery

Galeria de imagenes responsiva con tres layouts (grid, masonry, carousel), lightbox integrado, navegacion por teclado y soporte para imagenes en miniatura independientes. Muestra un estado vacio ilustrado cuando no hay imagenes.

## Importacion

```tsx
import ImageGallery from '@/components/SURFACES/ImageGallery/ImageGallery';
```

## Uso basico

```tsx
const images = [
  { id: 1, src: '/foto1.jpg', alt: 'Paisaje montanoso', caption: 'Amanecer en los Alpes' },
  { id: 2, src: '/foto2.jpg', alt: 'Playa tropical', caption: 'Costa caribe' },
  { id: 3, src: '/foto3.jpg', alt: 'Ciudad nocturna', caption: 'Skyline a medianoche' },
];

<ImageGallery
  images={images}
  title="Mi coleccion"
  layout="grid"
  columns={3}
  showCaptions
  lightbox
/>
```

## Layouts

### Grid

Cuadricula CSS con numero de columnas configurable:

```tsx
<ImageGallery images={images} layout="grid" columns={4} lightbox />
```

### Masonry

Columnas CSS que permiten imagenes de distinta altura sin espacios vacios:

```tsx
<ImageGallery images={images} layout="masonry" columns={3} showCaptions lightbox />
```

### Carousel

Scroll horizontal con snap points:

```tsx
<ImageGallery images={images} layout="carousel" showCaptions lightbox />
```

## Lightbox

Cuando `lightbox={true}`, hacer clic en cualquier imagen abre un overlay de pantalla completa con navegacion anterior/siguiente y contador de posicion. Admite cierre por clic en el overlay o en el boton de cerrar. La navegacion por teclado (ArrowLeft, ArrowRight, Escape) se activa automaticamente.

```tsx
<ImageGallery
  images={images}
  lightbox
  imageHoverEffect="zoom"
/>
```

## Miniaturas independientes

Cuando `thumbnails={true}` y cada imagen tiene un campo `thumbnail`, la cuadricula muestra la miniatura y el lightbox carga la imagen original de alta resolucion:

```tsx
const images = [
  {
    id: 1,
    src: '/foto-hd.jpg',
    thumbnail: '/foto-thumb.jpg',
    alt: 'Foto en alta resolucion',
    caption: 'Vista de detalle',
  },
];

<ImageGallery images={images} thumbnails showCaptions lightbox />
```

## Efectos en imagenes

```tsx
{/* Esquinas redondeadas y sombra */}
<ImageGallery images={images} imageRounded="lg" imageShadow="md" lightbox />

{/* Efecto zoom al pasar el cursor */}
<ImageGallery images={images} imageHoverEffect="zoom" lightbox />
```

## Estado vacio

Cuando `images` esta vacio, muestra un panel ilustrado con mensaje personalizable:

```tsx
<ImageGallery
  images={[]}
  emptyMessage="No hay imagenes. Sube fotos para comenzar."
/>
```

## CSS Custom Properties

```css
.mi-galeria {
  --w3f-gallery-title-font-size: 1.5rem;
  --w3f-gallery-title-color: var(--w3f-primary);
  --w3f-gallery-caption-font-size: 0.75rem;
  --w3f-gallery-caption-color: var(--w3f-gray-500);
  --w3f-gallery-lb-overlay-bg: rgba(0, 0, 0, 0.9);
  --w3f-gallery-lb-image-radius: 12px;
  --w3f-gallery-carousel-item-width: 350px;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-gallery-title-font-size` | `text-xl` | Tamano del titulo de la galeria |
| `--w3f-gallery-title-font-weight` | `600` | Peso del titulo |
| `--w3f-gallery-title-color` | `on-surface` | Color del titulo |
| `--w3f-gallery-title-margin-bottom` | `space-4` | Margen bajo el titulo |
| `--w3f-gallery-margin-bottom` | `space-6` | Margen inferior del contenedor |
| `--w3f-gallery-masonry-columns` | `3` | Columnas del layout masonry |
| `--w3f-gallery-masonry-gap` | `space-4` | Gap del layout masonry |
| `--w3f-gallery-carousel-gap` | `space-4` | Gap entre items del carousel |
| `--w3f-gallery-carousel-item-width` | `300px` | Ancho de cada item en carousel |
| `--w3f-gallery-carousel-scrollbar-color` | `gray-400` | Color del scrollbar |
| `--w3f-gallery-carousel-scrollbar-track` | `gray-100` | Color del track del scrollbar |
| `--w3f-gallery-caption-font-size` | `text-sm` | Tamano del texto de caption |
| `--w3f-gallery-caption-color` | `gray-600` | Color del caption |
| `--w3f-gallery-empty-bg` | `gray-50` | Fondo del estado vacio |
| `--w3f-gallery-empty-border-color` | `outline-variant` | Borde del estado vacio |
| `--w3f-gallery-empty-radius` | `radius-lg` | Border radius del estado vacio |
| `--w3f-gallery-empty-icon-color` | `gray-400` | Color del icono vacio |
| `--w3f-gallery-empty-text-color` | `gray-600` | Color del texto vacio |
| `--w3f-gallery-transition` | `transition-normal` | Transicion de imagenes |
| `--w3f-gallery-transition-fast` | `transition-fast` | Transicion de controles del lightbox |
| `--w3f-gallery-focus-color` | `primary` | Color de outline al enfocar |
| `--w3f-gallery-lb-overlay-bg` | `rgba(0,0,0,0.95)` | Fondo del overlay del lightbox |
| `--w3f-gallery-lb-image-radius` | `radius-lg` | Border radius de la imagen en lightbox |
| `--w3f-gallery-lb-image-shadow` | `shadow-xl` | Sombra de la imagen en lightbox |
| `--w3f-gallery-lb-caption-bg` | `rgba(0,0,0,0.8)` | Fondo del caption en lightbox |
| `--w3f-gallery-lb-caption-color` | `white` | Color del caption en lightbox |
| `--w3f-gallery-lb-counter-color` | `gray-300` | Color del contador (X / N) |
| `--w3f-gallery-lb-btn-bg` | `rgba(0,0,0,0.6)` | Fondo de botones de navegacion |
| `--w3f-gallery-lb-btn-border` | `2px solid rgba(255,255,255,0.3)` | Borde de botones de navegacion |
| `--w3f-gallery-lb-btn-color` | `white` | Color de iconos de botones |
| `--w3f-gallery-lb-btn-hover-bg` | `rgba(255,255,255,0.2)` | Fondo de botones en hover |
| `--w3f-gallery-lb-btn-size` | `48px` | Tamano de los botones del lightbox |
| `--w3f-gallery-lb-btn-icon-size` | `24px` | Tamano del icono de los botones |
| `--w3f-gallery-lb-btn-radius` | `radius-full` | Border radius de los botones |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `images` | `GalleryImage[]` | `[]` | Array de imagenes a mostrar |
| `title` | `string` | — | Titulo opcional sobre la galeria |
| `layout` | `'grid' \| 'masonry' \| 'carousel'` | `'grid'` | Algoritmo de layout |
| `columns` | `number` | `3` | Numero de columnas (grid y masonry) |
| `gap` | `number` | — | Separacion entre imagenes en px |
| `showCaptions` | `boolean` | `false` | Muestra el campo `caption` bajo cada imagen |
| `lightbox` | `boolean` | `false` | Activa el visor de pantalla completa al hacer clic |
| `imageRounded` | `string` | — | Border radius de las imagenes (e.g. `'lg'`) |
| `imageShadow` | `string` | — | Sombra de las imagenes (e.g. `'md'`) |
| `imageHoverEffect` | `string` | — | Efecto al pasar el cursor (e.g. `'zoom'`) |
| `thumbnails` | `boolean` | `false` | Usa `GalleryImage.thumbnail` en la cuadricula |
| `emptyMessage` | `string` | — | Mensaje del estado vacio |

### GalleryImage

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `string \| number` | Identificador unico (opcional, usa index como fallback) |
| `src` | `string` | URL de la imagen a mostrar en lightbox y como fallback |
| `alt` | `string` | Texto alternativo para accesibilidad |
| `caption` | `string` | Texto descriptivo bajo la imagen |
| `thumbnail` | `string` | URL de la miniatura (se usa en cuadricula cuando `thumbnails=true`) |

## API

### Entrada de datos

ImageGallery es un componente controlado externamente. La lista de imagenes se pasa via `images` prop. No mantiene estado de la lista de imagenes — solo el estado de la imagen activa en el lightbox.

### Salida de datos

ImageGallery no emite callbacks de seleccion. El lightbox gestiona su propia navegacion interna. Para aplicaciones que necesiten reaccionar a la seleccion de imagen, envuelve el componente o implementa `onClick` en el nivel padre.

### Comunicacion con otros componentes

#### Independiente (sin contexto requerido)

ImageGallery no requiere ningun Provider. Funciona de forma autonoma con solo el array `images`:

```tsx
<ImageGallery images={fotos} lightbox />
```

#### Navegacion por teclado (lightbox)

Cuando el lightbox esta abierto, el hook `useImageGallery` registra listeners de teclado:

| Tecla | Accion |
|---|---|
| `ArrowLeft` | Imagen anterior |
| `ArrowRight` | Imagen siguiente |
| `Escape` | Cerrar lightbox |

### Accesibilidad

| Elemento | Atributo | Valor |
|---|---|---|
| Overlay lightbox | `role` | `"dialog"` |
| Overlay lightbox | `aria-modal` | `"true"` |
| Overlay lightbox | `aria-label` | `"Vista ampliada de imagen"` |
| Boton cerrar | `aria-label` | `"Cerrar lightbox"` |
| Boton anterior | `aria-label` | `"Imagen anterior"` |
| Boton siguiente | `aria-label` | `"Siguiente imagen"` |

### Patron de uso recomendado

```tsx
// 1. Galeria fotografica con lightbox
<ImageGallery
  images={fotos}
  title="Portafolio"
  layout="grid"
  columns={3}
  showCaptions
  lightbox
  imageHoverEffect="zoom"
/>

// 2. Carousel para hero/banner
<ImageGallery
  images={banners}
  layout="carousel"
  lightbox={false}
/>

// 3. Cuadricula de miniaturas con visor HD
<ImageGallery
  images={imagenes.map(img => ({
    ...img,
    thumbnail: img.thumbUrl,
    src: img.hdUrl,
  }))}
  layout="grid"
  columns={4}
  thumbnails
  lightbox
/>

// 4. Masonry de alturas variadas
<ImageGallery
  images={mixtas}
  layout="masonry"
  columns={3}
  imageRounded="md"
  imageShadow="sm"
  showCaptions
  lightbox
/>
```

## Estructura de archivos

```
ImageGallery/
  ImageGallery.tsx            Componente principal
  ImageGallery.types.ts       Interfaces TypeScript
  ImageGallery.constants.ts   Clases CSS y defaults
  ImageGallery.utils.ts       buildGalleryClasses(), buildGridStyle()
  ImageGallery.hooks.ts       useImageGallery (lightbox state + keyboard)
  README.md                   Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_image-gallery.css`
