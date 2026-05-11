# BottomNavigation

Barra de navegacion inferior para aplicaciones moviles. Muestra un conjunto de acciones con iconos y etiquetas opcionales, indicando el item activo con un resaltado de color. Implementa el patron compound component via `BottomNavContext`.

## Importacion

```tsx
import BottomNavigation, { BottomNavigationAction } from '@/components/NAVIGATION/BottomNavigation/BottomNavigation';
```

## Uso basico

```tsx
const [value, setValue] = useState('home');

<BottomNavigation value={value} onChange={(_e, v) => setValue(v)}>
  <BottomNavigationAction icon={<Home />} value="home" />
  <BottomNavigationAction icon={<Search />} value="search" />
  <BottomNavigationAction icon={<Heart />} value="favorites" />
  <BottomNavigationAction icon={<User />} value="profile" />
</BottomNavigation>
```

## Con etiquetas

El prop `showLabels` en el padre activa las etiquetas en todas las acciones. Tambien puede controlarse individualmente en cada `BottomNavigationAction`:

```tsx
<BottomNavigation value={value} onChange={(_e, v) => setValue(v)} showLabels>
  <BottomNavigationAction icon={<Home />} label="Home" value="home" />
  <BottomNavigationAction icon={<Search />} label="Search" value="search" />
  <BottomNavigationAction icon={<Heart />} label="Favorites" value="favorites" />
  <BottomNavigationAction icon={<User />} label="Profile" value="profile" />
</BottomNavigation>
```

## Con badges

Muestra contadores de notificacion sobre los iconos:

```tsx
<BottomNavigation value={value} onChange={(_e, v) => setValue(v)} showLabels>
  <BottomNavigationAction icon={<Home />} label="Home" value="home" />
  <BottomNavigationAction icon={<MessageSquare />} label="Messages" value="messages" badge={3} />
  <BottomNavigationAction icon={<Bell />} label="Alerts" value="alerts" badge={99} />
</BottomNavigation>
```

## Colores

Cinco esquemas de color para el indicador activo:

```tsx
<BottomNavigation color="primary" ...>...</BottomNavigation>
<BottomNavigation color="secondary" ...>...</BottomNavigation>
<BottomNavigation color="success" ...>...</BottomNavigation>
<BottomNavigation color="warning" ...>...</BottomNavigation>
<BottomNavigation color="danger" ...>...</BottomNavigation>
```

## Variantes visuales

```tsx
<BottomNavigation variant="filled" ...>...</BottomNavigation>   {/* fondo solido */}
<BottomNavigation variant="flat" ...>...</BottomNavigation>     {/* sin borde ni sombra */}
<BottomNavigation variant="elevated" ...>...</BottomNavigation> {/* sombra superior */}
```

## Modo no controlado

Usa `defaultValue` para estado interno sin necesidad de gestionar `value` externamente:

```tsx
<BottomNavigation defaultValue="home" showLabels>
  <BottomNavigationAction icon={<Home />} label="Home" value="home" />
  <BottomNavigationAction icon={<Search />} label="Explore" value="explore" />
</BottomNavigation>
```

## CSS Custom Properties

```css
.mi-nav-custom {
  --w3f-bnav-bg: #1e1b4b;
  --w3f-bnav-active-color: #a78bfa;
  --w3f-bnav-pill-bg: rgba(167, 139, 250, 0.15);
  --w3f-bnav-color: #94a3b8;
  --w3f-bnav-badge-bg: #f43f5e;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-bnav-bg` | `surface` | Fondo de la barra |
| `--w3f-bnav-color` | `gray-500` | Color de iconos/texto inactivos |
| `--w3f-bnav-active-color` | `primary` | Color del item activo |
| `--w3f-bnav-pill-bg` | `primary-100` | Fondo del indicador activo (pill) |
| `--w3f-bnav-border-top` | `1px solid gray-200` | Borde superior |
| `--w3f-bnav-elevated-shadow` | `0 -2px 10px rgba(0,0,0,0.08)` | Sombra variante elevated |
| `--w3f-bnav-hover-bg` | `gray-100` | Fondo en hover |
| `--w3f-bnav-transition` | `150ms ease-out` | Transicion de animaciones |
| `--w3f-bnav-focus-color` | `primary` | Color del anillo de foco |
| `--w3f-bnav-disabled-opacity` | `0.5` | Opacidad de la barra deshabilitada |
| `--w3f-bnav-action-disabled-opacity` | `0.4` | Opacidad de accion deshabilitada |
| `--w3f-bnav-badge-bg` | `danger` | Fondo del badge |
| `--w3f-bnav-badge-color` | `#ffffff` | Color del texto del badge |
| `--w3f-bnav-badge-border` | `none` | Borde del badge |
| `--w3f-bnav-icon-size` | `24px` | Tamano de los iconos |
| `--w3f-bnav-label-font` | `0.75rem` | Tamano de fuente de etiquetas |
| `--w3f-bnav-label-weight` | `500` | Peso de fuente de etiquetas |
| `--w3f-bnav-label-active-weight` | `600` | Peso de fuente etiqueta activa |

## Props

### BottomNavigation

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `value` | `string \| number` | — | Valor activo (modo controlado) |
| `defaultValue` | `string \| number` | — | Valor inicial (modo no controlado) |
| `onChange` | `(e, value) => void` | — | Callback al cambiar el item activo |
| `showLabels` | `boolean` | `false` | Muestra etiquetas en todas las acciones |
| `color` | `BottomNavColor` | `'primary'` | Esquema de color del indicador activo |
| `variant` | `BottomNavVariant` | `'filled'` | Variante visual de la barra |
| `fixed` | `boolean` | `false` | Posicion fija en la parte inferior de la pantalla |
| `disabled` | `boolean` | `false` | Deshabilita toda la barra |
| `className` | `string` | `''` | Clases CSS adicionales |
| `children` | `ReactNode` | — | `BottomNavigationAction` elements |

### BottomNavigationAction

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `icon` | `ReactNode` | — | Icono de la accion |
| `label` | `string` | — | Texto de la etiqueta |
| `value` | `string \| number` | — | Identificador de la accion |
| `showLabel` | `boolean` | — | Fuerza visibilidad de etiqueta (anula contexto) |
| `disabled` | `boolean` | `false` | Deshabilita esta accion |
| `badge` | `ReactNode \| number` | — | Contenido del badge |
| `className` | `string` | `''` | Clases CSS adicionales |
| `onClick` | `(e) => void` | — | Handler de clic adicional |

## API

#### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Controlado | `value` | `string \| number` | El padre gestiona el estado activo |
| No controlado | `defaultValue` | `string \| number` | Estado inicial interno, sin control externo |

#### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(e: MouseEvent<HTMLButtonElement>, value: string \| number) => void` | Al hacer clic en una accion habilitada con `value` definido |

El flujo de seleccion es:
1. Usuario hace clic en `BottomNavigationAction`
2. La accion llama a `ctx.onChange(e, value)` del contexto
3. El contexto actualiza `currentValue` (no controlado) o notifica al padre (controlado)
4. El padre actualiza su estado y re-renderiza

#### Comunicacion con otros componentes

`BottomNavigation` crea un `BottomNavContext` que inyecta en todos los `BottomNavigationAction` hijos:

```
BottomNavigation (Provider)
  ├── value actual
  ├── onChange handler
  ├── showLabels flag
  └── color
        ↓ (Context)
BottomNavigationAction (Consumer)
  ├── Lee si es activo: ctx.value === value
  ├── Lee showLabels del contexto
  └── Llama ctx.onChange al hacer clic
```

El componente no se integra con Form/LiveForm — es un componente de navegacion puro.

#### Accesibilidad

| Atributo | Elemento | Valor | Descripcion |
|---|---|---|---|
| `role` | `<nav>` | `"tablist"` | Semantica de grupo de pestanas |
| `role` | `<button>` | `"tab"` | Semantica de pestana individual |
| `aria-selected` | `<button>` | `true/false` | Estado activo de la accion |
| `aria-label` | `<button>` | Valor de `label` | Accesibilidad cuando no hay texto visible |
| `disabled` | `<button>` | atributo HTML | Deshabilita la accion nativa |

#### Patron de uso recomendado

```tsx
// 1. Navegacion movil con 4 secciones
const [tab, setTab] = useState('home');

<BottomNavigation value={tab} onChange={(_e, v) => setTab(v)} showLabels color="primary">
  <BottomNavigationAction icon={<Home />} label="Home" value="home" />
  <BottomNavigationAction icon={<Search />} label="Search" value="search" />
  <BottomNavigationAction icon={<Bell />} label="Alerts" value="alerts" badge={notifCount} />
  <BottomNavigationAction icon={<User />} label="Profile" value="profile" />
</BottomNavigation>

// 2. Icono-only (sin labels)
<BottomNavigation value={tab} onChange={(_e, v) => setTab(v)}>
  <BottomNavigationAction icon={<Home />} value="home" />
  <BottomNavigationAction icon={<Search />} value="search" />
  <BottomNavigationAction icon={<Settings />} value="settings" />
</BottomNavigation>

// 3. Fija en el viewport
<BottomNavigation fixed value={tab} onChange={(_e, v) => setTab(v)} showLabels>
  ...
</BottomNavigation>
```

## Estructura de archivos

```
BottomNavigation/
  BottomNavigation.tsx          Componente principal + BottomNavigationAction
  BottomNavigation.types.ts     Interfaces TypeScript
  BottomNavigation.constants.ts Clases CSS y defaults
  BottomNavigation.utils.ts     buildBottomNavClasses(), buildActionClasses(), formatBadge()
  BottomNavigation.hooks.ts     BottomNavContext, useBottomNav, useBottomNavAction
  README.md                     Esta documentacion
```

CSS: `src/w3fussion/NAVIGATION/_bottom-navigation.css`
