# Card_2

Variante del Card orientada a la composicion, construida sobre CSS Grid nativo. A diferencia de Card (que usa Flexbox con orden fijo), Card_2 mapea cada seccion a un named grid area (`w3f-slot-*`), lo que permite controlar la posicion de cualquier seccion mediante CSS Grid externo sin modificar el markup.

## Importacion

```tsx
import Card_2 from '@/components/DATADISPLAY/Card_2/Card_2';
```

## Uso basico

### Tarjeta simple

```tsx
<Card_2
  title="Titulo"
  subtitle="Subtitulo"
  content={<p>Contenido de la tarjeta.</p>}
/>
```

### Con imagen

```tsx
<Card_2
  variant="elevated"
  imageSrc="https://picsum.photos/400/200"
  imageAlt="Paisaje"
  title="Mountain View"
  subtitle="Photography"
  content={<p>Descripcion de la imagen.</p>}
  buttons={[{ text: 'Ver', variant: 'raised', color: 'primary', size: 'sm' }]}
/>
```

### Con badge

```tsx
<Card_2
  variant="elevated"
  title="Notificaciones"
  badge={{ content: '3', color: 'danger', size: 'sm' }}
  content={<p>Tienes 3 notificaciones nuevas.</p>}
/>

{/* Atajo string */}
<Card_2 title="Novedad" badge="NEW" content={<p>Funcion recien lanzada.</p>} />
```

### Hoverable y clickable

```tsx
<Card_2
  variant="elevated"
  hoverable
  title="Hoverable"
  content={<p>Efecto de elevacion al pasar el cursor.</p>}
/>

<Card_2
  variant="outlined"
  clickable
  onClick={() => console.log('clicked')}
  title="Clickable"
  content={<p>Actua como boton con soporte de teclado.</p>}
/>
```

### Layout CSS Grid personalizado (layoutStyle)

Pasa CSS custom properties como `layoutStyle` para definir las areas del grid. Las secciones se ubican automaticamente segun el valor de `--w3f-areas`:

```tsx
<Card_2
  variant="elevated"
  layoutStyle={{
    '--w3f-areas': '"media header" "media content" "media actions"',
    '--w3f-cols': '200px 1fr',
    '--w3f-rows': 'auto 1fr auto',
    '--w3f-gap': '0',
  } as React.CSSProperties}
  imageSrc="https://picsum.photos/200/250"
  imageAlt="Lateral"
  title="Imagen a la izquierda"
  subtitle="Grid-powered"
  content={<p>El contenido aparece a la derecha de la imagen.</p>}
  buttons={[{ text: 'Ver mas', variant: 'flat', color: 'primary' }]}
/>
```

### Layout por nombre (layoutName — CardBuilder)

Si el layout fue creado con CardBuilder y ya esta definido como clase CSS:

```tsx
<Card_2
  layoutName="mi-layout"
  imageSrc="https://picsum.photos/400/200"
  title="Layout guardado"
  content={<p>Usa la clase .w3f-card-layout--mi-layout del CSS generado.</p>}
/>
```

## Variantes

```tsx
<Card_2 variant="default"  title="Default"  content={<p>Sombra sutil + borde.</p>} />
<Card_2 variant="elevated" title="Elevated" content={<p>Sombra prominente.</p>} />
<Card_2 variant="outlined" title="Outlined" content={<p>Solo borde visible.</p>} />
<Card_2 variant="filled"   title="Filled"   content={<p>Fondo surface-variant.</p>} />
```

## Tamanos

```tsx
<Card_2 size="sm" title="Small"  content={<p>max-width 300px</p>} />
<Card_2 size="md" title="Medium" content={<p>max-width 400px (default)</p>} />
<Card_2 size="lg" title="Large"  content={<p>max-width 600px</p>} />
<Card_2 fullWidth title="Full Width" content={<p>Ocupa todo el ancho disponible.</p>} />
```

## CSS Custom Properties

Card_2 expone un sistema completo de tokens CSS para theming sin necesidad de sobreescribir clases:

```css
.mi-tema-oscuro {
  --w3f-card-bg: #1a1a2e;
  --w3f-card-color: #e0e0e0;
  --w3f-card-border-color: #2a2a4a;
  --w3f-card-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
  --w3f-card-radius: 16px;
  --w3f-card-hover-shadow: 0 12px 40px rgba(99, 102, 241, 0.25);
  --w3f-card-title-color: #ffffff;
  --w3f-card-subtitle-color: #9ca3af;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-card-bg` | `var(--w3f-surface)` | Color de fondo del card |
| `--w3f-card-color` | `var(--w3f-on-surface)` | Color de texto |
| `--w3f-card-radius` | `var(--w3f-radius-lg)` | Border radius |
| `--w3f-card-shadow` | `var(--w3f-shadow-sm/md)` | Sombra (segun variante) |
| `--w3f-card-border-width` | `1px` o `2px` | Ancho del borde |
| `--w3f-card-border-color` | `var(--w3f-outline-variant/outline)` | Color del borde |
| `--w3f-card-transition` | `all var(--w3f-transition-normal)` | Transicion de propiedades |
| `--w3f-card-hover-lift` | `-4px` | Desplazamiento vertical en hover |
| `--w3f-card-hover-shadow` | `var(--w3f-shadow-lg)` | Sombra en hover |
| `--w3f-card-focus-outline` | `2px solid var(--w3f-primary)` | Outline en foco |
| `--w3f-card-focus-outline-offset` | `2px` | Offset del outline |
| `--w3f-card-header-padding` | `var(--w3f-space-6)` | Padding del slot header |
| `--w3f-card-header-bg` | `var(--w3f-surface-variant)` | Fondo del slot header |
| `--w3f-card-header-border-width` | `1px` | Borde inferior del header |
| `--w3f-card-header-border-color` | `var(--w3f-outline-variant)` | Color del borde del header |
| `--w3f-card-title-font-size` | `var(--w3f-text-xl)` | Tamano de fuente del titulo |
| `--w3f-card-title-font-weight` | `600` | Peso del titulo |
| `--w3f-card-title-color` | `var(--w3f-on-surface)` | Color del titulo |
| `--w3f-card-title-line-height` | `1.3` | Interlineado del titulo |
| `--w3f-card-title-margin` | `var(--w3f-space-2)` | Margen inferior del titulo |
| `--w3f-card-subtitle-font-size` | `var(--w3f-text-sm)` | Tamano del subtitulo |
| `--w3f-card-subtitle-color` | `var(--w3f-gray-600)` | Color del subtitulo |
| `--w3f-card-subtitle-line-height` | `1.4` | Interlineado del subtitulo |
| `--w3f-card-content-padding` | `var(--w3f-space-6)` | Padding del slot content |
| `--w3f-card-content-font-size` | `inherit` | Fuente del contenido |
| `--w3f-card-content-line-height` | `inherit` | Interlineado del contenido |
| `--w3f-card-media-fit` | `cover` | Object-fit de la imagen |
| `--w3f-card-media-max-height` | `300px` | Altura maxima de la imagen |
| `--w3f-card-media-filter` | `none` | Filtro CSS de la imagen |
| `--w3f-card-actions-padding` | `var(--w3f-space-4) var(--w3f-space-6)` | Padding del slot actions |
| `--w3f-card-actions-border-width` | `1px` | Borde superior de actions |
| `--w3f-card-actions-border-color` | `var(--w3f-outline-variant)` | Color del borde de actions |
| `--w3f-card-actions-gap` | `var(--w3f-space-3)` | Gap entre botones |
| `--w3f-card-max-width` | `300/400/600px` | Ancho maximo segun size |

### Variables de layout grid

| Variable | Descripcion |
|---|---|
| `--w3f-areas` | `grid-template-areas` (string de areas nombradas) |
| `--w3f-cols` | `grid-template-columns` |
| `--w3f-rows` | `grid-template-rows` |
| `--w3f-gap` | Gap entre celdas del grid |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `layoutName` | `string` | — | Nombre del layout de CardBuilder (aplica `.w3f-card-layout--{name}`) |
| `layoutStyle` | `React.CSSProperties` | — | CSS vars de grid inline (alternativa a `layoutName`) |
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano maximo |
| `hoverable` | `boolean` | `false` | Efecto de elevacion en hover |
| `clickable` | `boolean` | `false` | Cursor pointer y efecto de clic |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | — | Handler de clic (no propaga desde elementos interactivos) |
| `fullWidth` | `boolean` | `false` | Ocupa el 100% del contenedor |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `React.CSSProperties` | — | Estilos inline adicionales |
| `title` | `ReactNode` | — | Titulo en `.w3f-slot-header` |
| `subtitle` | `ReactNode` | — | Subtitulo en `.w3f-slot-header` |
| `headerExtra` | `ReactNode` | — | Contenido extra en el header |
| `imageSrc` | `string` | — | URL de la imagen |
| `imageAlt` | `string` | `''` | Texto alternativo de la imagen |
| `content` | `ReactNode` | — | Cuerpo en `.w3f-slot-content` |
| `actions` | `ReactNode` | — | Slot de acciones (anula `buttons`) |
| `buttons` | `Card2ButtonProps[]` | `[]` | Botones generados automaticamente |
| `actionsAlign` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | Alineacion de acciones |
| `actionAreaContent` | `ReactNode` | — | Zona de accion secundaria (`.w3f-slot-action-area`) |
| `customContent` | `ReactNode` | — | Zona libre sin semantica (`.w3f-slot-custom`) |
| `badge` | `Card2BadgeConfig \| ReactNode \| string \| number` | — | Badge superpuesto en esquina superior derecha |

## Slots CSS (clases de named areas)

| Clase | Grid area | Descripcion |
|---|---|---|
| `.w3f-slot-header` | `header` | Titulo, subtitulo y headerExtra |
| `.w3f-slot-media` | `media` | Contenedor de la imagen |
| `.w3f-slot-content` | `content` | Cuerpo de texto |
| `.w3f-slot-actions` | `actions` | Botones de accion |
| `.w3f-slot-action-area` | `action-area` | Zona de accion secundaria |
| `.w3f-slot-custom` | `custom` | Zona libre sin semantica |

## API

### Entrada de datos

| Via | Props | Descripcion |
|---|---|---|
| Slots nombrados | `title`, `subtitle`, `content`, `actions`, `headerExtra`, `actionAreaContent`, `customContent` | ReactNode colocado en el slot CSS Grid correspondiente |
| Imagen | `imageSrc` + `imageAlt` | Renderiza `<img>` con lazy loading dentro de `.w3f-slot-media` |
| Botones | `buttons: Card2ButtonProps[]` | Genera componentes `<Button>` automaticamente en `.w3f-slot-actions` |
| Badge | `badge` | Acepta objeto de props para `<Badge>`, ReactElement, o string/number |
| Layout por clase | `layoutName` | Aplica la clase `.w3f-card-layout--{name}` generada por CardBuilder |
| Layout inline | `layoutStyle` | CSS vars que definen el CSS Grid directamente en el elemento |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClick` | `(e: MouseEvent<HTMLDivElement>) => void` | Clic sobre la tarjeta, excluyendo elementos interactivos internos |

### Comunicacion con otros componentes

#### Con CardBuilder (integracion via CSS vars o clase)

CardBuilder puede exportar layouts de dos formas:
- **`layoutStyle`**: objeto de CSS vars pasado directamente al card (solo afecta esa instancia).
- **`layoutName`**: nombre de clase que referencia un bloque CSS generado por CardBuilder (`.w3f-card-layout--{name}`).

Las secciones del card se posicionan automaticamente segun el valor de `--w3f-areas`:

```
--w3f-areas → grid-template-areas
.w3f-slot-header     → grid-area: header
.w3f-slot-media      → grid-area: media
.w3f-slot-content    → grid-area: content
.w3f-slot-actions    → grid-area: actions
.w3f-slot-action-area→ grid-area: action-area
.w3f-slot-custom     → grid-area: custom
```

#### Con Badge y Button (composicion interna)

Igual que Card, Card_2 instancia `<Badge>` y `<Button>` internamente. No hay Context compartido.

#### Independiente (sin contexto requerido)

Card_2 no consume ningun Context ni requiere ninguna Provider.

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"button"` | Cuando `clickable` o `onClick` estan definidos |
| `tabIndex` | `0` | Cuando `role="button"` |
| `aria-pressed` | `false` | Cuando `role="button"` |
| Tecla Enter / Space | Dispara `onClick` | Cuando `role="button"` |
| `loading="lazy"` | En `<img>` | Siempre que `imageSrc` este definido |

### Patron de uso recomendado

```tsx
// 1. Galeria de items con imagen y acciones
<Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="1.5rem">
  {items.map(item => (
    <Card_2
      key={item.id}
      variant="elevated"
      imageSrc={item.cover}
      title={item.title}
      subtitle={item.date}
      content={<p>{item.excerpt}</p>}
      buttons={[{ text: 'Leer', variant: 'flat', color: 'primary', size: 'sm' }]}
    />
  ))}
</Grid>

// 2. Layout personalizado con imagen lateral
<Card_2
  variant="elevated"
  layoutStyle={{
    '--w3f-areas': '"media header" "media content" "media actions"',
    '--w3f-cols': '200px 1fr',
    '--w3f-rows': 'auto 1fr auto',
    '--w3f-gap': '0',
  } as React.CSSProperties}
  imageSrc={product.image}
  title={product.name}
  content={<p>{product.description}</p>}
  buttons={[{ text: 'Comprar', variant: 'raised', color: 'primary' }]}
/>

// 3. Tema personalizado via CSS vars
<Card_2
  className="mi-tema-oscuro"
  variant="elevated"
  title="Card personalizada"
  content={<p>Tema con variables CSS.</p>}
/>
```

## Diferencias con Card

| Aspecto | Card | Card_2 |
|---|---|---|
| Layout base | Flexbox | CSS Grid (siempre activo) |
| Imagen | `imagePosition` prop | Posicion por `--w3f-areas` |
| Slots CSS | Clases `w3f-card-*` | Clases `w3f-slot-*` |
| CSS vars | Sin tokens propios | ~28 tokens `--w3f-card-*` |
| Layout externo | `layoutStyle` (activa modo grid) | `layoutStyle` o `layoutName` (siempre grid) |

## Estructura de archivos

```
Card_2/
  Card_2.tsx            Componente principal
  Card_2.types.ts       Interfaces TypeScript (Card2Props, Card2ButtonProps, Card2BadgeConfig)
  Card_2.constants.ts   CARD2_DEFAULTS y CARD2_CLASSES
  Card_2.utils.ts       buildCard2Classes(), buildCard2ActionsClasses()
  README.md             Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_card-2.css`
