# Drawer

Panel lateral deslizable que emerge desde cualquier borde de la pantalla. Soporta tres variantes de comportamiento: `temporary` (modal con backdrop), `persistent` (desplaza el contenido) y `permanent` (siempre visible). Compatible con Form/LiveForm anidados.

## Importacion

```tsx
import Drawer from '@/components/NAVIGATION/Drawer/Drawer';
```

## Uso basico

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Abrir</Button>

<Drawer open={open} onClose={() => setOpen(false)}>
  <p>Contenido del drawer</p>
</Drawer>
```

## Anchors (direcciones)

```tsx
<Drawer open={open} onClose={handleClose} anchor="left">...</Drawer>   {/* default */}
<Drawer open={open} onClose={handleClose} anchor="right">...</Drawer>
<Drawer open={open} onClose={handleClose} anchor="top">...</Drawer>
<Drawer open={open} onClose={handleClose} anchor="bottom">...</Drawer>
```

## Variantes

```tsx
{/* Temporal (modal) — con backdrop semitransparente */}
<Drawer open={open} onClose={handleClose} variant="temporary">...</Drawer>

{/* Persistente — sin backdrop, desplaza el contenido adyacente */}
<Drawer open={open} variant="persistent" anchor="left" width={240}>...</Drawer>

{/* Permanente — siempre visible, parte del layout */}
<Drawer open variant="permanent" anchor="left" width={240}>...</Drawer>
```

## Control de cierre

El evento `onClose` recibe la razon del cierre como segundo argumento:

```tsx
<Drawer
  open={open}
  onClose={(e, reason) => {
    // reason: 'backdropClick' | 'escapeKeyDown' | 'closeButton'
    if (reason === 'backdropClick') return; // ignorar clic en backdrop
    setOpen(false);
  }}
  showCloseButton
  closeOnBackdropClick
  closeOnEsc
>
  ...
</Drawer>
```

## Tamano

Controla el ancho (drawers izq/der) o alto (drawers sup/inf) con un numero en pixeles o string CSS:

```tsx
<Drawer open={open} onClose={handleClose} anchor="right" width={400}>...</Drawer>
<Drawer open={open} onClose={handleClose} anchor="bottom" height="60vh">...</Drawer>
```

## Colores (acento)

Agrega un borde de acento al borde de apertura:

```tsx
<Drawer open={open} onClose={handleClose} color="primary">...</Drawer>
<Drawer open={open} onClose={handleClose} color="secondary">...</Drawer>
<Drawer open={open} onClose={handleClose} color="success">...</Drawer>
<Drawer open={open} onClose={handleClose} color="warning">...</Drawer>
<Drawer open={open} onClose={handleClose} color="danger">...</Drawer>
```

## Con Form/LiveForm

```tsx
<Drawer open={open} onClose={handleClose} anchor="right" width={400}>
  <Form initialValues={{ name: '', email: '' }} onSubmit={handleSubmit}>
    <Input name="name" label="Nombre" />
    <Input name="email" label="Email" />
    <Button type="submit">Guardar</Button>
  </Form>
</Drawer>
```

## CSS Custom Properties

```css
.mi-drawer-custom {
  --w3f-drawer-bg: #1e293b;
  --w3f-drawer-color: #f1f5f9;
  --w3f-drawer-border-color: #334155;
  --w3f-drawer-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  --w3f-drawer-backdrop-bg: rgba(0, 0, 0, 0.6);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-drawer-bg` | `surface` | Fondo del panel |
| `--w3f-drawer-color` | `on-surface` | Color del texto |
| `--w3f-drawer-border-color` | `gray-200` | Color del borde del panel |
| `--w3f-drawer-shadow` | `shadow-xl` | Sombra del panel |
| `--w3f-drawer-close-color` | `gray-500` | Color del icono de cierre |
| `--w3f-drawer-close-hover-bg` | `gray-100` | Fondo hover del boton de cierre |
| `--w3f-drawer-close-hover-color` | `on-surface` | Color hover del boton de cierre |
| `--w3f-drawer-close-radius` | `radius-md` | Radio del boton de cierre |
| `--w3f-drawer-backdrop-bg` | `rgba(0,0,0,0.5)` | Color del backdrop |
| `--w3f-drawer-z-index` | `1200` | Nivel z del drawer temporal |
| `--w3f-drawer-transition` | `0.3s cubic-bezier(0.4,0,0.2,1)` | Duracion y easing de la animacion |
| `--w3f-drawer-focus-color` | `primary` | Color del anillo de foco |
| `--w3f-drawer-accent-color` | `primary` | Color del borde de acento |
| `--w3f-drawer-accent-width` | `3px` | Grosor del borde de acento |
| `--w3f-drawer-scrollbar-thumb` | `gray-300` | Color del scrollbar |
| `--w3f-drawer-scrollbar-thumb-hover` | `gray-400` | Color hover del scrollbar |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `open` | `boolean` | `false` | Abre o cierra el drawer |
| `onClose` | `(e, reason) => void` | — | Callback de cierre con razon |
| `anchor` | `DrawerAnchor` | `'left'` | Borde desde el que emerge |
| `variant` | `DrawerVariant` | `'temporary'` | Comportamiento del drawer |
| `width` | `number \| string` | `280` | Ancho (drawers izq/der) |
| `height` | `number \| string` | `'40vh'` | Alto (drawers sup/inf) |
| `showBackdrop` | `boolean` | `true` | Muestra el backdrop en variante temporal |
| `showCloseButton` | `boolean` | `false` | Muestra boton de cierre (X) |
| `closeOnBackdropClick` | `boolean` | `true` | Cierra al hacer clic en el backdrop |
| `closeOnEsc` | `boolean` | `true` | Cierra con tecla Escape |
| `color` | `DrawerColor` | `'default'` | Color del borde de acento |
| `className` | `string` | `''` | Clases CSS adicionales |
| `children` | `ReactNode` | — | Contenido del drawer |

## API

#### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Estado | `open` | `boolean` | Controlado siempre desde el padre |
| Posicion | `anchor` | `DrawerAnchor` | Define desde que borde emerge |
| Tamano | `width` / `height` | `number \| string` | Dimension del panel |

#### Salida de datos

| Evento | Firma | Razon | Descripcion |
|---|---|---|---|
| `onClose` | `(e, 'backdropClick') => void` | `backdropClick` | Clic en el backdrop |
| `onClose` | `(e, 'escapeKeyDown') => void` | `escapeKeyDown` | Tecla Escape |
| `onClose` | `(e, 'closeButton') => void` | `closeButton` | Clic en el boton X |

El padre decide si realmente cierra basandose en la razon:

```tsx
onClose={(e, reason) => {
  if (reason === 'backdropClick' && formDirty) return; // no cerrar si hay cambios
  setOpen(false);
}}
```

#### Comunicacion con otros componentes

El Drawer acepta cualquier contenido en `children`, incluyendo Form/LiveForm. No inyecta props ni consume contexto de formulario — actua como un contenedor puro.

- **Focus trap**: en variante `temporary`, el foco queda atrapado dentro del drawer (hook `useDrawerFocusTrap`)
- **Body scroll lock**: en variante `temporary`, bloquea el scroll del `<body>` mientras el drawer esta abierto (hook `useDrawerBodyScroll`)
- **Escape key**: gestionado por `useDrawerEscKey`; no actua en variante `permanent`

#### Accesibilidad

| Atributo | Elemento | Valor | Descripcion |
|---|---|---|---|
| `role` | `<aside>` temporal | `"dialog"` | Semantica de dialogo modal |
| `aria-modal` | `<aside>` temporal | `"true"` | Indica que es modal |
| `tabIndex` | `<aside>` temporal | `-1` | Permite recibir foco programatico |
| `aria-label` | boton cierre | `"Cerrar"` | Accesibilidad del boton X |

#### Patron de uso recomendado

```tsx
// 1. Sidebar de navegacion (persistente)
<div style={{ display: 'flex' }}>
  <Drawer open={sidebarOpen} variant="persistent" anchor="left" width={240}>
    <nav>...</nav>
  </Drawer>
  <main style={{ marginLeft: sidebarOpen ? 240 : 0, transition: '0.3s' }}>
    <PageContent />
  </main>
</div>

// 2. Panel de formulario (temporal)
<Drawer open={open} onClose={() => setOpen(false)} anchor="right" width={400} showCloseButton closeOnEsc>
  <Form initialValues={data} onSubmit={save}>
    <Input name="name" />
    <Button type="submit">Guardar</Button>
  </Form>
</Drawer>

// 3. Menu de navegacion movil (bottom sheet)
<Drawer open={menuOpen} onClose={() => setMenuOpen(false)} anchor="bottom" height="50vh">
  <MobileMenu />
</Drawer>
```

## Estructura de archivos

```
Drawer/
  Drawer.tsx          Componente principal
  Drawer.types.ts     Interfaces TypeScript
  Drawer.constants.ts Clases CSS y defaults
  Drawer.utils.ts     buildDrawerClasses(), buildDrawerSizeStyle()
  Drawer.hooks.ts     useDrawerAnimation, useDrawerEscKey, useDrawerBodyScroll, useDrawerFocusTrap
  README.md           Esta documentacion
```

CSS: `src/w3fussion/NAVIGATION/_drawer.css`
