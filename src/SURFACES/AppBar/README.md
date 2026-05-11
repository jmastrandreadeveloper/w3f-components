# AppBar

Barra de aplicacion superior con slots semanticos para organizar el contenido en tres zonas: leading (izquierda), title (centro-izquierda) y trailing (derecha). Soporte para 5 variantes de color, 4 posiciones CSS, 3 tamanos y sombra elevada.

## Importacion

```tsx
import {
  AppBar,
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
} from '@/components/SURFACES/AppBar/AppBar';
```

## Uso basico

```tsx
<AppBar color="primary" position="sticky">
  <AppBarTitle>Mi Aplicacion</AppBarTitle>
</AppBar>
```

## Con slots completos

```tsx
import { Menu, Search, Bell, User } from 'lucide-react';

<AppBar color="primary" position="sticky">
  <AppBarLeading>
    <Button variant="text" icon={<Menu size={20} />} style={{ color: 'inherit' }} />
  </AppBarLeading>
  <AppBarTitle>Dashboard</AppBarTitle>
  <AppBarTrailing>
    <Button variant="text" icon={<Search size={20} />} style={{ color: 'inherit' }} />
    <Button variant="text" icon={<Bell size={20} />} style={{ color: 'inherit' }} />
    <Button variant="text" icon={<User size={20} />} style={{ color: 'inherit' }} />
  </AppBarTrailing>
</AppBar>
```

## Colores

Cinco variantes de color disponibles:

```tsx
<AppBar color="primary">...</AppBar>
<AppBar color="secondary">...</AppBar>
<AppBar color="surface">...</AppBar>
<AppBar color="transparent">...</AppBar>
<AppBar color="dark">...</AppBar>
```

## Posicion

Controla el comportamiento de posicionamiento CSS:

```tsx
<AppBar position="static">...</AppBar>    {/* Posicion normal en flujo */}
<AppBar position="sticky">...</AppBar>    {/* Queda fija al hacer scroll */}
<AppBar position="fixed">...</AppBar>     {/* Fija en viewport, fuera del flujo */}
<AppBar position="relative">...</AppBar> {/* Relativa al padre */}
```

## Tamanos

```tsx
<AppBar size="sm">...</AppBar>  {/* 40px height */}
<AppBar size="md">...</AppBar>  {/* 56px height (default) */}
<AppBar size="lg">...</AppBar>  {/* 72px height */}
```

## Sombra elevada

```tsx
<AppBar color="primary" elevated>...</AppBar>
```

## CSS Custom Properties

```css
.mi-appbar-glass {
  --w3f-appbar-bg: rgba(255, 255, 255, 0.15);
  --w3f-appbar-color: #fff;
  --w3f-appbar-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-appbar-bg` | `primary` | Color de fondo (sobreescrito por cada variante de color) |
| `--w3f-appbar-color` | `on-primary` | Color del texto e iconos |
| `--w3f-appbar-border-color` | `outline-variant` | Borde inferior (activo en variante surface) |
| `--w3f-appbar-toolbar-gap` | `space-3` | Separacion entre elementos del toolbar |
| `--w3f-appbar-toolbar-pad-h` | `space-4` | Padding horizontal del toolbar |
| `--w3f-appbar-toolbar-min-height` | `56px` | Altura minima del toolbar |
| `--w3f-appbar-title-font-size` | `text-lg` | Tamano de fuente del titulo |
| `--w3f-appbar-title-font-weight` | `600` | Peso de fuente del titulo |
| `--w3f-appbar-slot-gap` | `space-2` | Separacion interna en slots leading/trailing |
| `--w3f-appbar-shadow` | `none` | Sombra (activa con `elevated`) |
| `--w3f-appbar-elevated-shadow` | `shadow-md` | Sombra cuando `elevated=true` |
| `--w3f-appbar-z-index` | `1100` | z-index (relevante para `fixed` y `sticky`) |

## Props

### AppBar

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Slots AppBarLeading, AppBarTitle, AppBarTrailing o contenido libre |
| `color` | `'primary' \| 'secondary' \| 'surface' \| 'transparent' \| 'dark'` | `'primary'` | Variante de color |
| `position` | `'fixed' \| 'sticky' \| 'static' \| 'relative'` | `'static'` | Comportamiento de posicion CSS |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del toolbar |
| `elevated` | `boolean` | `true` | Aplica sombra via CSS var |
| `className` | `string` | `''` | Clases CSS adicionales |

### AppBarLeading

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Icono de menu, logo, boton back, etc. |
| `className` | `string` | `''` | Clases CSS adicionales |

### AppBarTitle

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Titulo de la aplicacion o pagina actual |
| `className` | `string` | `''` | Clases CSS adicionales |

### AppBarTrailing

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | requerido | Acciones, avatar, iconos de busqueda, etc. |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

#### Entrada de datos

El AppBar es un componente de presentacion pura. No consume estado ni contexto. Su contenido se define por composicion via children y slots.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Slot leading | children de AppBarLeading | `ReactNode` | Zona izquierda: hamburguesa, logo, back button |
| Slot title | children de AppBarTitle | `ReactNode` | Zona central: nombre de pagina o app |
| Slot trailing | children de AppBarTrailing | `ReactNode` | Zona derecha: acciones, avatar, iconos |
| Libre | children directos | `ReactNode` | Contenido directo sin slots — va dentro del toolbar |

#### Salida de datos

El AppBar no emite eventos propios. Toda la interactividad proviene de los componentes hijos (Button, etc.) que el usuario coloca en los slots.

| Evento | Firma | Cuando |
|---|---|---|
| — | — | No hay callbacks propios |

#### Comunicacion con otros componentes

El AppBar es completamente independiente — no usa Context ni se comunica con otros componentes del framework. El patron de uso tipico es componer con `Button` en los slots:

```
AppBar
  └─ AppBarLeading
       └─ Button (onClick: abre Drawer o Sidenav)
  └─ AppBarTitle
       └─ texto o logo
  └─ AppBarTrailing
       └─ Button (onClick: handler propio)
       └─ Avatar (src, onClick: abre menu de perfil)
```

**Con Drawer / Sidenav:**
```tsx
const [open, setOpen] = useState(false);

<AppBar position="sticky" color="primary">
  <AppBarLeading>
    <Button
      variant="text"
      icon={<Menu size={20} />}
      onClick={() => setOpen(true)}
      style={{ color: 'inherit' }}
    />
  </AppBarLeading>
  <AppBarTitle>Mi App</AppBarTitle>
</AppBar>
<Drawer open={open} onClose={() => setOpen(false)}>...</Drawer>
```

#### Accesibilidad

| Atributo | Valor | Elemento | Descripcion |
|---|---|---|---|
| elemento | `<header>` | AppBar | Marca semantica correcta para la zona de cabecera |

El uso de `<header>` como elemento raiz garantiza compatibilidad con lectores de pantalla y navegacion por landmarks. Los botones dentro de los slots deben tener `aria-label` cuando son icon-only.

#### Patron de uso recomendado

```tsx
// 1. AppBar minima — solo titulo
<AppBar position="sticky" color="surface">
  <AppBarTitle>Configuracion</AppBarTitle>
</AppBar>

// 2. AppBar completa — navegacion + acciones
<AppBar position="fixed" color="primary" elevated>
  <AppBarLeading>
    <Button variant="text" icon={<Menu size={20} />} onClick={openDrawer}
      style={{ color: 'inherit' }} aria-label="Abrir menu" />
  </AppBarLeading>
  <AppBarTitle>W3F Studio</AppBarTitle>
  <AppBarTrailing>
    <Button variant="text" icon={<Search size={20} />} style={{ color: 'inherit' }}
      aria-label="Buscar" />
    <Avatar src={user.avatar} size="small" hoverable onClick={openProfile} />
  </AppBarTrailing>
</AppBar>

// 3. AppBar transparente sobre imagen hero
<div style={{ position: 'relative' }}>
  <img src="/hero.jpg" />
  <AppBar position="absolute" color="transparent" elevated={false}>
    <AppBarTitle style={{ color: '#fff' }}>Mi Portafolio</AppBarTitle>
  </AppBar>
</div>
```

## Estructura de archivos

```
AppBar/
  AppBar.tsx            AppBar + AppBarLeading + AppBarTitle + AppBarTrailing
  AppBar.types.ts       AppBarProps, AppBarColor, AppBarPosition, AppBarSize
  AppBar.constants.ts   APP_BAR_DEFAULTS, APP_BAR_CLASSES
  AppBar.utils.ts       buildAppBarClasses()
  README.md             Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_app-bar.css`
