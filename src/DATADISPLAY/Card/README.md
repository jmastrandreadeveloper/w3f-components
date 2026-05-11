# Card

Contenedor de contenido versatil basado en Flexbox. Soporta imagen en cuatro posiciones, cabecera, cuerpo de texto, acciones con botones, badge superpuesto y modo de layout CSS Grid compatible con CardBuilder.

## Importacion

```tsx
import Card from '@/components/DATADISPLAY/Card/Card';
```

## Uso basico

### Tarjeta simple

```tsx
<Card
  title="Titulo de la tarjeta"
  subtitle="Subtitulo descriptivo"
  content={<p>Contenido principal de la tarjeta.</p>}
/>
```

### Con imagen

```tsx
<Card
  imageSrc="https://picsum.photos/400/200"
  imageAlt="Paisaje"
  imagePosition="top"
  title="Tarjeta con imagen"
  content={<p>Imagen en la parte superior.</p>}
/>
```

### Horizontal (imagen a los lados)

```tsx
<Card
  imageSrc="https://picsum.photos/300/200"
  imageAlt="Producto"
  imagePosition="left"
  title="Layout horizontal"
  content={<p>La imagen ocupa el lado izquierdo.</p>}
  buttons={[{ text: 'Ver detalle', variant: 'flat', color: 'primary' }]}
/>
```

### Con acciones

```tsx
<Card
  title="Tarjeta con acciones"
  content={<p>Descripcion del elemento.</p>}
  buttons={[
    { text: 'Aceptar', variant: 'raised', color: 'primary' },
    { text: 'Cancelar', variant: 'flat', color: 'secondary' },
  ]}
  actionsAlign="end"
/>
```

### Con badge

```tsx
<Card
  imageSrc="https://picsum.photos/400/200"
  imagePosition="top"
  title="Producto nuevo"
  badge={{ content: 'Nuevo', color: 'success', size: 'sm' }}
  content={<p>Texto descriptivo.</p>}
/>

{/* Atajo con string */}
<Card title="Oferta" badge="-30%" content={<p>Descuento especial.</p>} />
```

### Hoverable y clickable

```tsx
<Card
  title="Tarjeta interactiva"
  content={<p>Mueve el cursor para ver el efecto.</p>}
  hoverable
  clickable
  onClick={(e) => console.log('card clicked', e)}
/>
```

### Layout CSS Grid (CardBuilder)

Cuando se proporciona `layoutStyle`, la tarjeta activa el modo grid y mapea cada seccion a un `grid-area` nombrado:

```tsx
<Card
  layoutStyle={{
    '--w3f-areas': '"media header" "media content" "media actions"',
    '--w3f-cols': '240px 1fr',
    '--w3f-rows': 'auto 1fr auto',
    '--w3f-gap': '0',
  } as React.CSSProperties}
  imageSrc="https://picsum.photos/240/300"
  title="Layout grid personalizado"
  content={<p>Cuerpo en columna derecha.</p>}
  buttons={[{ text: 'Ver mas', variant: 'flat', color: 'primary' }]}
/>
```

## Variantes

```tsx
<Card variant="default"  title="Default"  content={<p>Sombra sutil + borde.</p>} />
<Card variant="elevated" title="Elevated" content={<p>Sombra prominente, sin borde.</p>} />
<Card variant="outlined" title="Outlined" content={<p>Solo borde, sin sombra.</p>} />
<Card variant="filled"   title="Filled"   content={<p>Fondo surface-variant.</p>} />
```

## Tamanos

```tsx
<Card size="sm" title="Small"  content={<p>max-width 300px</p>} />
<Card size="md" title="Medium" content={<p>max-width 400px (default)</p>} />
<Card size="lg" title="Large"  content={<p>max-width 600px</p>} />
<Card fullWidth title="Full Width" content={<p>Ocupa todo el ancho disponible.</p>} />
```

## CSS Custom Properties

El componente no define su propio token root, pero hereda las variables del sistema W3Fussion. Para temas personalizados usa clases CSS que sobreescriban propiedades directamente sobre `.w3f-card`:

```css
.mi-card-glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.mi-card-dark {
  background: #1a1a2e;
  border: 1px solid #2a2a4a;
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
  color: #e0e0e0;
}
```

### Variables de layout (modo grid)

Estas variables se pasan mediante `layoutStyle` cuando se usa el modo CSS Grid:

| Variable | Descripcion |
|---|---|
| `--w3f-areas` | Valor de `grid-template-areas` (string de areas nombradas) |
| `--w3f-cols` | Valor de `grid-template-columns` |
| `--w3f-rows` | Valor de `grid-template-rows` |
| `--w3f-gap` | Gap entre celdas del grid |

### Variables de tema (heredadas del sistema)

| Variable | Descripcion |
|---|---|
| `--w3f-surface` | Color de fondo del card |
| `--w3f-on-surface` | Color de texto |
| `--w3f-surface-variant` | Fondo del header |
| `--w3f-outline-variant` | Color de borde por defecto |
| `--w3f-shadow-sm` | Sombra variante default |
| `--w3f-shadow-md` | Sombra variante elevated |
| `--w3f-shadow-lg` | Sombra en hover |
| `--w3f-radius-lg` | Radio de borde |
| `--w3f-transition-normal` | Duracion de transicion |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `title` | `ReactNode` | — | Titulo en el header |
| `subtitle` | `ReactNode` | — | Subtitulo en el header |
| `content` | `ReactNode` | — | Cuerpo principal de la tarjeta |
| `actions` | `ReactNode` | — | Slot de acciones (anula `buttons`) |
| `buttons` | `CardButtonProps[]` | `[]` | Botones generados automaticamente |
| `actionsAlign` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` | Alineacion de acciones |
| `imageSrc` | `string` | — | URL de la imagen |
| `imageAlt` | `string` | `''` | Texto alternativo de la imagen |
| `imagePosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posicion de la imagen |
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano maximo de la tarjeta |
| `hoverable` | `boolean` | `false` | Efecto de elevacion al pasar el cursor |
| `clickable` | `boolean` | `false` | Cursor pointer y efecto de clic |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | — | Handler de clic (excluye botones/links internos) |
| `fullWidth` | `boolean` | `false` | Ocupa el 100% del contenedor |
| `badge` | `CardBadgeConfig \| ReactNode \| string \| number` | — | Badge superpuesto en esquina superior derecha |
| `layoutStyle` | `React.CSSProperties` | — | CSS vars para activar modo CSS Grid |
| `headerExtra` | `ReactNode` | — | Contenido adicional en el header |
| `actionAreaContent` | `ReactNode` | — | Zona de accion secundaria (`.w3f-card-action-area`) |
| `customContent` | `ReactNode` | — | Zona libre sin semantica (`.w3f-card-custom`) |
| `className` | `string` | `''` | Clases CSS adicionales en el elemento raiz |
| `headerClassName` | `string` | `''` | Clases CSS adicionales en el header |
| `contentClassName` | `string` | `''` | Clases CSS adicionales en el contenido |
| `actionsClassName` | `string` | `''` | Clases CSS adicionales en las acciones |
| `style` | `React.CSSProperties` | — | Estilos inline adicionales |

### CardButtonProps

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `text` | `ReactNode` | — | Etiqueta del boton |
| `variant` | `'raised' \| 'outlined' \| 'flat' \| 'text'` | — | Variante visual |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — | Color del boton |
| `size` | `'sm' \| 'md' \| 'lg'` | — | Tamano del boton |
| `onClick` | `MouseEventHandler` | — | Handler de clic |
| `disabled` | `boolean` | — | Deshabilita el boton |
| `icon` | `ReactNode` | — | Icono del boton |
| `iconPosition` | `'left' \| 'right'` | — | Posicion del icono |

## API

### Entrada de datos

El Card acepta contenido por dos vias:

| Via | Props | Descripcion |
|---|---|---|
| Slots nombrados | `title`, `subtitle`, `content`, `actions`, `headerExtra`, `actionAreaContent`, `customContent` | ReactNode renderizado en cada seccion semantica |
| Shorthand de botones | `buttons: CardButtonProps[]` | Genera componentes `<Button>` automaticamente en la seccion actions |
| Imagen | `imageSrc` + `imageAlt` + `imagePosition` | Renderiza un `<img>` con lazy loading en la posicion indicada |
| Badge | `badge` | Acepta `CardBadgeConfig` (objeto de props para `<Badge>`), un `ReactElement`, o un `string`/`number` que se muestra como Badge primario |
| Layout | `layoutStyle` | CSS vars que activan el modo CSS Grid, generadas por CardBuilder |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClick` | `(e: MouseEvent<HTMLDivElement>) => void` | Clic sobre la tarjeta, siempre que el target no sea un elemento interactivo interno (button, a, input, textarea, select) |

La logica de delegacion de eventos evita que el `onClick` de la tarjeta interfiera con los botones del slot `actions`.

### Comunicacion con otros componentes

#### Con Badge (composicion interna)

El Card renderiza un `<Badge>` internamente cuando se usa la prop `badge` con configuracion de objeto. No hay ningun Context compartido; es pura composicion de renderizado.

#### Con Button (composicion interna)

Cuando se usa `buttons[]`, el Card instancia componentes `<Button>` directamente. El Card pasa las props de `CardButtonProps` al Button. No hay Context compartido.

#### Con CardBuilder (integracion via CSS vars)

CardBuilder genera objetos de CSS custom properties (`--w3f-areas`, `--w3f-cols`, `--w3f-rows`, `--w3f-gap`) que se pasan como `layoutStyle`. El Card activa la clase `.w3f-card--layout` cuando `layoutStyle` existe, convirtiendo el contenedor en un CSS Grid. Las secciones del card se mapean automaticamente a grid areas:

```
layoutStyle.--w3f-areas  →  grid-template-areas
.w3f-card-header         →  grid-area: header
.w3f-card-image          →  grid-area: media
.w3f-card-content        →  grid-area: content
.w3f-card-actions        →  grid-area: actions
.w3f-card-badge          →  grid-area: badge
.w3f-card-action-area    →  grid-area: action-area
.w3f-card-custom         →  grid-area: custom
```

#### Independiente (sin contexto requerido)

El Card no consume ningun Context ni requiere ninguna Provider. Opera de forma completamente autonoma en cualquier parte del arbol React.

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"button"` | Cuando `clickable` o `onClick` estan definidos |
| `tabIndex` | `0` | Cuando `role="button"` |
| `aria-pressed` | `false` | Cuando `role="button"` |
| Tecla Enter / Space | Dispara `onClick` | Cuando `role="button"` |
| `loading="lazy"` | En `<img>` | Siempre que `imageSrc` este definido |

Cuando la tarjeta es clickable, los clics sobre elementos interactivos internos (button, a, input) no propagan el evento al Card gracias a `target.closest('button, a, input, textarea, select')`.

### Patron de uso recomendado

```tsx
// 1. Tarjeta de producto en grid
<Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="1.5rem">
  {products.map(p => (
    <Card
      key={p.id}
      imageSrc={p.image}
      imagePosition="top"
      title={p.name}
      subtitle={p.category}
      content={<p>{p.description}</p>}
      badge={{ content: p.isNew ? 'Nuevo' : undefined, color: 'success' }}
      buttons={[{ text: 'Ver detalle', variant: 'flat', color: 'primary' }]}
    />
  ))}
</Grid>

// 2. Tarjeta de perfil horizontal
<Card
  imageSrc={user.avatar}
  imagePosition="left"
  title={user.name}
  subtitle={user.role}
  content={<p>{user.bio}</p>}
  buttons={[{ text: 'Contactar', variant: 'raised', color: 'primary' }]}
/>

// 3. Tarjeta de accion completa
<Card
  variant="elevated"
  hoverable
  onClick={() => navigate('/detail')}
  title="Elemento seleccionable"
  content={<p>Toda la tarjeta actua como link.</p>}
/>

// 4. Layout personalizado con CardBuilder
<Card
  layoutStyle={savedLayout.style}
  imageSrc={item.image}
  title={item.title}
  content={item.body}
/>
```

## Estructura de archivos

```
Card/
  Card.tsx            Componente principal
  Card.types.ts       Interfaces TypeScript (CardProps, CardButtonProps, CardBadgeConfig)
  Card.utils.ts       buildCardClasses(), buildHeaderClasses(), buildContentClasses(), buildActionsClasses()
  README.md           Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_card.css`
