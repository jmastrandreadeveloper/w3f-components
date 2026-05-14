# Capítulo 11 — Navegación: AppBar, Tabs, Breadcrumbs, Drawer

**Nivel:** Intermedio
**Tiempo estimado de lectura:** 35 minutos

---

## ¿Qué vas a aprender?

- `AppBar` en profundidad: tamaños, elevación, menú hamburguesa y dark mode
- `Tabs` con tres variantes visuales, modo vertical y modo controlado
- `Breadcrumbs` con colapso automático, separador personalizado y soporte para router
- `Drawer` como panel lateral, inferior o superior: temporal, persistente y permanente
- Combinar los cuatro para construir el shell completo de una aplicación

---

## AppBar — en profundidad

Ya usaste `AppBar` en los capítulos anteriores. Acá vemos todas sus opciones.

### Props completas

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `color` | `'primary' \| 'secondary' \| 'surface' \| 'transparent' \| 'dark'` | `'primary'` | Color de fondo |
| `position` | `'fixed' \| 'sticky' \| 'static' \| 'relative'` | `'fixed'` | Posición CSS |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Altura del toolbar |
| `elevated` | `boolean` | `false` | Sombra más pronunciada |

Sub-componentes (exportados del mismo archivo):

| Componente | Slot | Uso típico |
|---|---|---|
| `AppBarLeading` | Izquierdo | Logo, botón de menú hamburguesa |
| `AppBarTitle` | Centro/izquierdo | Nombre de la app o sección |
| `AppBarTrailing` | Derecho | Botones de acción, avatar, toggle de tema |

### Colores

```tsx
import AppBar, { AppBarLeading, AppBarTitle, AppBarTrailing }
  from '@w3f/components/SURFACES/AppBar/AppBar'

// Azul — énfasis máximo, identidad de marca
<AppBar color="primary">...</AppBar>

// Naranja — variante secundaria
<AppBar color="secondary">...</AppBar>

// Blanco/gris oscuro — se adapta al dark mode
<AppBar color="surface">...</AppBar>

// Sin fondo — sobre imágenes o heroes
<AppBar color="transparent">...</AppBar>

// Siempre oscuro — independiente del tema
<AppBar color="dark">...</AppBar>
```

### Position: fixed vs sticky

```tsx
// sticky — se pega al top al hacer scroll, NO saca espacio del layout
<AppBar position="sticky">...</AppBar>

// fixed — flota sobre el contenido, necesitás padding-top en el <main>
<AppBar position="fixed">
  ...
</AppBar>
<main style={{ paddingTop: '64px' }}>  {/* compensar la altura del AppBar */}
  ...
</main>

// static — dentro del flujo normal del documento
<AppBar position="static">...</AppBar>
```

> Recomendado: `position="sticky"` para la mayoría de las apps. No requiere ajuste de padding.

### Tamaños

```tsx
<AppBar size="sm">...</AppBar>   // toolbar compacto
<AppBar size="md">...</AppBar>   // normal (default)
<AppBar size="lg">...</AppBar>   // toolbar amplio
```

### Menú hamburguesa (AppBar + Drawer)

El patrón más común en apps mobile: un botón en el `AppBarLeading` que abre el `Drawer`.

```tsx
import { useState } from 'react'
import AppBar, { AppBarLeading, AppBarTitle, AppBarTrailing }
  from '@w3f/components/SURFACES/AppBar/AppBar'
import Drawer from '@w3f/components/NAVIGATION/Drawer/Drawer'
import Button from '@w3f/components/INPUTS/Button/Button'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import { Menu } from 'lucide-react'

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <AppBar color="primary" position="sticky">
        <AppBarLeading>
          <button
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer',
                     color: 'white', display: 'flex', alignItems: 'center' }}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </AppBarLeading>

        <AppBarTitle>Mi Aplicación</AppBarTitle>

        <AppBarTrailing>
          <Button variant="flat" size="sm">Perfil</Button>
        </AppBarTrailing>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Stack spacing="2" style={{ padding: 'var(--w3f-space-4)' }}>
          <p className="w3f-font-semibold w3f-mb-4"
             style={{ color: 'var(--w3f-on-surface)' }}>Menú</p>
          {['Inicio', 'Proyectos', 'Equipo', 'Configuración'].map(item => (
            <button
              key={item}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 'var(--w3f-space-3)', textAlign: 'left',
                width: '100%', borderRadius: 'var(--w3f-radius-lg)',
                color: 'var(--w3f-on-surface)', fontSize: 'var(--w3f-text-base)',
              }}
              onClick={() => setDrawerOpen(false)}
            >
              {item}
            </button>
          ))}
        </Stack>
      </Drawer>
    </>
  )
}
```

---

## Tabs — pestañas con contenido

`Tabs` gestiona un conjunto de pestañas donde cada una tiene su propio contenido. El contenido se define mediante el array `initialTabsContent`.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `initialTabsContent` | `TabItem[]` | `[]` | Pestañas iniciales |
| `variant` | `'default' \| 'pills' \| 'underline'` | `'default'` | Estilo visual de las pestañas |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Color activo |
| `vertical` | `boolean` | `false` | Pestañas a la izquierda, contenido a la derecha |
| `closable` | `boolean` | `false` | Muestra botón × en cada pestaña |
| `currentTabId` | `string` | — | Pestaña activa (modo controlado) |
| `onTabChange` | `(tabId: string \| null) => void` | — | Callback al cambiar de pestaña |
| `highlightActiveTab` | `boolean` | `false` | Resalta el fondo de la pestaña activa |

### TabItem

```ts
{
  id: string           // identificador único
  title: string        // texto del tab
  content: ReactNode   // contenido del panel
}
```

### Variantes

```tsx
import Tabs from '@w3f/components/SURFACES/Tabs/Tabs'

const TABS = [
  { id: 'general',   title: 'General',   content: <p>Configuración general</p> },
  { id: 'seguridad', title: 'Seguridad', content: <p>Opciones de seguridad</p> },
  { id: 'billing',   title: 'Facturación', content: <p>Planes y pagos</p> },
]

// Default — pestañas con fondo al activarse
<Tabs initialTabsContent={TABS} variant="default" />

// Pills — pestañas redondeadas estilo cápsula
<Tabs initialTabsContent={TABS} variant="pills" />

// Underline — solo línea inferior en la pestaña activa
<Tabs initialTabsContent={TABS} variant="underline" />
```

### Con esquema de colores

```tsx
<Tabs initialTabsContent={TABS} variant="pills" colorScheme="primary"   />
<Tabs initialTabsContent={TABS} variant="pills" colorScheme="secondary" />
<Tabs initialTabsContent={TABS} variant="pills" colorScheme="success"   />
<Tabs initialTabsContent={TABS} variant="underline" colorScheme="danger" />
```

### Vertical

```tsx
<Tabs
  initialTabsContent={[
    { id: 'perfil',    title: 'Perfil',    content: <FormularioPerfil /> },
    { id: 'cuenta',    title: 'Cuenta',    content: <FormularioCuenta /> },
    { id: 'notif',     title: 'Notificaciones', content: <ConfigNotif /> },
    { id: 'privacidad', title: 'Privacidad', content: <ConfigPrivacidad /> },
  ]}
  vertical
  variant="default"
/>
```

### Modo controlado

Útil cuando necesitás sincronizar la pestaña activa con la URL o el estado de la app:

```tsx
const [tabActiva, setTabActiva] = useState('resumen')

<Tabs
  initialTabsContent={TABS}
  currentTabId={tabActiva}
  onTabChange={id => {
    if (id) setTabActiva(id)
  }}
  variant="underline"
/>

// Cambiar pestaña desde afuera (ej: un botón)
<Button onClick={() => setTabActiva('billing')}>
  Ir a Facturación
</Button>
```

### Pestañas cerrables

```tsx
const [tabs, setTabs] = useState([
  { id: 'home',    title: 'Inicio',    content: <p>Home</p> },
  { id: 'docs',    title: 'Docs',      content: <p>Documentación</p> },
  { id: 'api',     title: 'API',       content: <p>Referencia API</p> },
])

// Con closable, el usuario puede cerrar pestañas con el botón ×
// El componente gestiona el estado interno automáticamente
<Tabs
  initialTabsContent={tabs}
  closable
  variant="default"
  onTabChange={id => console.log('activa:', id)}
/>
```

> **Nota:** con `closable`, el componente gestiona el array de tabs internamente a partir de `initialTabsContent`. Una vez cerrada una pestaña no se puede recuperar (a menos que la re-inyectes via `initialTabsContent`).

### Tabs con contenido complejo

El campo `content` acepta cualquier `ReactNode`, así que podés pasar componentes enteros:

```tsx
import Input  from '@w3f/components/INPUTS/Input/Input'
import Select from '@w3f/components/INPUTS/Select/Select'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'

<Tabs
  variant="underline"
  colorScheme="primary"
  initialTabsContent={[
    {
      id: 'personal',
      title: 'Datos personales',
      content: (
        <Stack spacing="4" style={{ padding: 'var(--w3f-space-4) 0' }}>
          <Input label="Nombre" />
          <Input label="Email" type="email" />
          <Input label="Teléfono" mask="phone" />
        </Stack>
      ),
    },
    {
      id: 'empresa',
      title: 'Empresa',
      content: (
        <Stack spacing="4" style={{ padding: 'var(--w3f-space-4) 0' }}>
          <Input label="Razón social" />
          <Select
            label="País"
            options={[
              { value: 'ar', label: 'Argentina' },
              { value: 'cl', label: 'Chile' },
            ]}
          />
        </Stack>
      ),
    },
  ]}
/>
```

---

## Breadcrumbs — migas de pan

Muestra la ruta de navegación actual. Soporta colapso automático cuando hay muchos ítems.

### Props de Breadcrumbs

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `separator` | `ReactNode` | `<ChevronRight size={14} />` | Separador entre ítems |
| `maxItems` | `number` | — | Máximo de ítems visibles antes de colapsar |
| `itemsBeforeCollapse` | `number` | `1` | Ítems visibles al inicio cuando colapsado |
| `itemsAfterCollapse` | `number` | `1` | Ítems visibles al final cuando colapsado |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Color de los links |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del texto |
| `variant` | `'solid' \| 'outlined' \| 'ghost' \| 'soft'` | `'ghost'` | Estilo visual de los ítems |

### Props de BreadcrumbItem

| Prop | Tipo | Descripción |
|---|---|---|
| `href` | `string` | URL del ítem (lo convierte en `<a>`) |
| `active` | `boolean` | Ítem actual — no es link, texto normal |
| `disabled` | `boolean` | Ítem deshabilitado |
| `icon` | `ReactNode` | Ícono antes del texto |
| `onClick` | `(e) => void` | Handler de click (alternativa a href) |

### Ejemplos

```tsx
import Breadcrumbs, { BreadcrumbItem }
  from '@w3f/components/NAVIGATION/Breadcrumbs/Breadcrumbs'

// Básico
<Breadcrumbs>
  <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
  <BreadcrumbItem href="/proyectos">Proyectos</BreadcrumbItem>
  <BreadcrumbItem active>Proyecto Alpha</BreadcrumbItem>
</Breadcrumbs>

// Con ícono en el primer ítem (home)
import { Home } from 'lucide-react'

<Breadcrumbs>
  <BreadcrumbItem href="/" icon={<Home size={14} />}>Inicio</BreadcrumbItem>
  <BreadcrumbItem href="/configuracion">Configuración</BreadcrumbItem>
  <BreadcrumbItem href="/configuracion/equipo">Equipo</BreadcrumbItem>
  <BreadcrumbItem active>Editar miembro</BreadcrumbItem>
</Breadcrumbs>

// Separador personalizado
<Breadcrumbs separator="/">
  <BreadcrumbItem href="/">docs</BreadcrumbItem>
  <BreadcrumbItem href="/guia">guia</BreadcrumbItem>
  <BreadcrumbItem active>instalacion</BreadcrumbItem>
</Breadcrumbs>

// Separador con ReactNode
import { ChevronRight } from 'lucide-react'

<Breadcrumbs separator={<ChevronRight size={12} style={{ color: 'var(--w3f-outline)' }} />}>
  <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
  <BreadcrumbItem active>Página actual</BreadcrumbItem>
</Breadcrumbs>
```

### Colapso automático

Con rutas largas (más de 4–5 ítems), `maxItems` colapsa los intermedios mostrando `...`:

```tsx
// Sin maxItems — muestra los 6 ítems completos (puede ocupar mucho espacio)
<Breadcrumbs>
  <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
  <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
  <BreadcrumbItem href="/admin/usuarios">Usuarios</BreadcrumbItem>
  <BreadcrumbItem href="/admin/usuarios/empresa">Empresa S.A.</BreadcrumbItem>
  <BreadcrumbItem href="/admin/usuarios/empresa/equipo">Equipo Dev</BreadcrumbItem>
  <BreadcrumbItem active>Juan Pérez</BreadcrumbItem>
</Breadcrumbs>

// Con maxItems=4 — muestra Inicio ... Equipo Dev > Juan Pérez
// Clic en "..." expande el resto
<Breadcrumbs
  maxItems={4}
  itemsBeforeCollapse={1}
  itemsAfterCollapse={2}
>
  <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
  <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
  <BreadcrumbItem href="/admin/usuarios">Usuarios</BreadcrumbItem>
  <BreadcrumbItem href="/admin/usuarios/empresa">Empresa S.A.</BreadcrumbItem>
  <BreadcrumbItem href="/admin/usuarios/empresa/equipo">Equipo Dev</BreadcrumbItem>
  <BreadcrumbItem active>Juan Pérez</BreadcrumbItem>
</Breadcrumbs>
```

### Con onClick (integración con router SPA)

En una SPA con React Router o Next.js usás `onClick` para navegar sin recargar la página:

```tsx
// Con React Router
import { useNavigate } from 'react-router-dom'

function MisBreadcrumbs({ ruta }: { ruta: { label: string; path: string }[] }) {
  const navigate = useNavigate()

  return (
    <Breadcrumbs color="primary">
      {ruta.map((item, i) => (
        <BreadcrumbItem
          key={item.path}
          active={i === ruta.length - 1}
          onClick={i < ruta.length - 1 ? () => navigate(item.path) : undefined}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}

// Uso:
<MisBreadcrumbs ruta={[
  { label: 'Inicio',    path: '/' },
  { label: 'Proyectos', path: '/proyectos' },
  { label: 'Alpha',     path: '/proyectos/alpha' },
]} />
```

---

## Drawer — panel deslizante

Panel que se desliza desde cualquier lado de la pantalla. Tiene tres variantes de comportamiento:

| `variant` | Comportamiento |
|---|---|
| `temporary` | Modal — backdrop oscuro, se cierra al hacer clic afuera o Esc |
| `persistent` | Aparece junto al contenido (lo empuja), no tiene backdrop |
| `permanent` | Siempre visible, no se puede cerrar |

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `open` | `boolean` | `false` | Estado del drawer |
| `onClose` | `(e, reason) => void` | — | Callback de cierre |
| `anchor` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | De dónde aparece |
| `variant` | `'temporary' \| 'persistent' \| 'permanent'` | `'temporary'` | Comportamiento |
| `width` | `number \| string` | `280` | Ancho (para left/right) |
| `height` | `number \| string` | `300` | Alto (para top/bottom) |
| `showBackdrop` | `boolean` | `true` | Backdrop semitransparente |
| `showCloseButton` | `boolean` | `false` | Botón × integrado |
| `closeOnBackdropClick` | `boolean` | `true` | Cerrar al clic afuera |
| `closeOnEsc` | `boolean` | `true` | Cerrar con Esc |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color de fondo |

### Temporary (modal) — el más común

```tsx
import Drawer from '@w3f/components/NAVIGATION/Drawer/Drawer'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'

const [open, setOpen] = useState(false)

// Botón que abre el drawer
<Button onClick={() => setOpen(true)}>Abrir menú</Button>

// El Drawer en sí — puede estar en cualquier lugar del árbol
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  anchor="left"
  width={280}
>
  <Stack spacing="1" style={{ padding: 'var(--w3f-space-4)' }}>
    <p className="w3f-font-bold w3f-mb-2"
       style={{ color: 'var(--w3f-on-surface)', fontSize: 'var(--w3f-text-lg)' }}>
      Navegación
    </p>
    {['Dashboard', 'Proyectos', 'Equipo', 'Reportes', 'Configuración'].map(item => (
      <button
        key={item}
        onClick={() => setOpen(false)}
        style={{
          display: 'block', width: '100%', textAlign: 'left',
          padding: 'var(--w3f-space-3) var(--w3f-space-4)',
          background: 'none', border: 'none', cursor: 'pointer',
          borderRadius: 'var(--w3f-radius-lg)',
          color: 'var(--w3f-on-surface)',
          fontSize: 'var(--w3f-text-base)',
        }}
      >
        {item}
      </button>
    ))}
  </Stack>
</Drawer>
```

### Desde la derecha — panel de detalles

```tsx
<Drawer
  open={panelOpen}
  onClose={() => setPanelOpen(false)}
  anchor="right"
  width={400}
  showCloseButton
>
  <Stack spacing="4" style={{ padding: 'var(--w3f-space-5)' }}>
    <h2 className="w3f-font-semibold"
        style={{ color: 'var(--w3f-on-surface)', fontSize: 'var(--w3f-text-xl)', margin: 0 }}>
      Detalles del proyecto
    </h2>
    <p style={{ color: 'var(--w3f-outline)', fontSize: 'var(--w3f-text-sm)', margin: 0 }}>
      Proyecto Alpha — creado el 12 de mayo
    </p>
    {/* contenido del panel */}
    <Button variant="raised" color="primary">Editar</Button>
  </Stack>
</Drawer>
```

### Desde abajo — sheet en mobile

```tsx
<Drawer
  open={sheetOpen}
  onClose={() => setSheetOpen(false)}
  anchor="bottom"
  height="auto"
>
  <div style={{
    padding: 'var(--w3f-space-6)',
    paddingBottom: 'env(safe-area-inset-bottom, var(--w3f-space-6))',
  }}>
    <p className="w3f-font-semibold w3f-mb-4"
       style={{ color: 'var(--w3f-on-surface)' }}>
      ¿Qué querés hacer?
    </p>
    <Stack spacing="2">
      <Button variant="outline" fullWidth onClick={() => setSheetOpen(false)}>
        Compartir enlace
      </Button>
      <Button variant="outline" fullWidth color="danger" onClick={() => setSheetOpen(false)}>
        Eliminar
      </Button>
      <Button variant="flat" fullWidth onClick={() => setSheetOpen(false)}>
        Cancelar
      </Button>
    </Stack>
  </div>
</Drawer>
```

### Persistent — sidebar que empuja el contenido

```tsx
const [sidebarOpen, setSidebarOpen] = useState(true)

<div style={{ display: 'flex', minHeight: '100vh' }}>

  <Drawer
    open={sidebarOpen}
    variant="persistent"
    anchor="left"
    width={240}
  >
    <nav style={{ padding: 'var(--w3f-space-4)' }}>
      {/* items del sidebar */}
    </nav>
  </Drawer>

  <main style={{
    flex: 1,
    padding: 'var(--w3f-space-6)',
    transition: 'margin-left 300ms ease',
    // No hace falta ajuste manual — el variant persistent empuja el contenido
  }}>
    <Button onClick={() => setSidebarOpen(v => !v)}>
      {sidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
    </Button>
    {/* contenido */}
  </main>

</div>
```

---

## Shell completo — AppBar + Drawer + Tabs + Breadcrumbs

Un ejemplo que combina los cuatro en una app de administración:

```tsx
import { useState } from 'react'
import AppBar, { AppBarLeading, AppBarTitle, AppBarTrailing }
  from '@w3f/components/SURFACES/AppBar/AppBar'
import Drawer   from '@w3f/components/NAVIGATION/Drawer/Drawer'
import Tabs     from '@w3f/components/SURFACES/Tabs/Tabs'
import Breadcrumbs, { BreadcrumbItem }
  from '@w3f/components/NAVIGATION/Breadcrumbs/Breadcrumbs'
import Container from '@w3f/components/LAYOUT/Container/Container'
import Stack     from '@w3f/components/LAYOUT/Stack/Stack'
import Button    from '@w3f/components/INPUTS/Button/Button'
import { Avatar } from '@w3f/components/DATADISPLAY/Avatar/Avatar'
import { Menu, Home } from 'lucide-react'

const SECCIONES = ['Dashboard', 'Proyectos', 'Equipo', 'Reportes', 'Configuración']

const TABS_CONFIG = [
  {
    id: 'activos',
    title: 'Activos',
    content: (
      <Stack spacing="3" style={{ paddingTop: 'var(--w3f-space-4)' }}>
        <p style={{ color: 'var(--w3f-on-surface)' }}>3 proyectos activos</p>
      </Stack>
    ),
  },
  {
    id: 'pausados',
    title: 'Pausados',
    content: (
      <Stack spacing="3" style={{ paddingTop: 'var(--w3f-space-4)' }}>
        <p style={{ color: 'var(--w3f-on-surface)' }}>1 proyecto pausado</p>
      </Stack>
    ),
  },
  {
    id: 'completados',
    title: 'Completados',
    content: (
      <Stack spacing="3" style={{ paddingTop: 'var(--w3f-space-4)' }}>
        <p style={{ color: 'var(--w3f-on-surface)' }}>12 proyectos completados</p>
      </Stack>
    ),
  },
]

export default function AdminShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [seccion, setSeccion]       = useState('Proyectos')
  const [dark, setDark]             = useState(false)

  return (
    <div
      className={dark ? 'w3f-theme-dark' : ''}
      style={{ minHeight: '100vh', background: 'var(--w3f-background)' }}
    >
      {/* AppBar */}
      <AppBar color="surface" position="sticky" elevated>
        <AppBarLeading>
          <button
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer',
                     color: 'var(--w3f-on-surface)', display: 'flex' }}
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </AppBarLeading>

        <AppBarTitle>
          <span className="w3f-font-semibold" style={{ color: 'var(--w3f-on-surface)' }}>
            {seccion}
          </span>
        </AppBarTitle>

        <AppBarTrailing>
          <Stack horizontal spacing="2" align="center">
            <Button variant="outline" size="sm" onClick={() => setDark(v => !v)}>
              {dark ? 'Claro' : 'Oscuro'}
            </Button>
            <Avatar color="indigo" size="small">JP</Avatar>
          </Stack>
        </AppBarTrailing>
      </AppBar>

      {/* Drawer de navegación */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
        width={260}
      >
        <Stack spacing="1" style={{ padding: 'var(--w3f-space-4)' }}>
          <p className="w3f-font-bold w3f-mb-3"
             style={{ color: 'var(--w3f-primary)', fontSize: 'var(--w3f-text-lg)' }}>
            W3F Admin
          </p>
          {SECCIONES.map(s => (
            <button
              key={s}
              onClick={() => { setSeccion(s); setDrawerOpen(false) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: 'var(--w3f-space-3) var(--w3f-space-4)',
                background: s === seccion ? 'var(--w3f-primary-50)' : 'none',
                border: 'none', cursor: 'pointer',
                borderRadius: 'var(--w3f-radius-lg)',
                color: s === seccion ? 'var(--w3f-primary)' : 'var(--w3f-on-surface)',
                fontWeight: s === seccion ? 600 : 400,
                fontSize: 'var(--w3f-text-base)',
              }}
            >
              {s}
            </button>
          ))}
        </Stack>
      </Drawer>

      {/* Contenido principal */}
      <Container className="w3f-container-xl" style={{ paddingTop: 'var(--w3f-space-5)' }}>
        <Stack spacing="5">

          {/* Breadcrumbs */}
          <Breadcrumbs color="primary">
            <BreadcrumbItem icon={<Home size={14} />} onClick={() => setSeccion('Dashboard')}>
              Inicio
            </BreadcrumbItem>
            <BreadcrumbItem active>{seccion}</BreadcrumbItem>
          </Breadcrumbs>

          {/* Encabezado de sección */}
          <h1 className="w3f-font-bold"
              style={{ fontSize: 'var(--w3f-text-2xl)', color: 'var(--w3f-on-background)', margin: 0 }}>
            {seccion}
          </h1>

          {/* Tabs (visible solo en Proyectos) */}
          {seccion === 'Proyectos' && (
            <Tabs
              initialTabsContent={TABS_CONFIG}
              variant="underline"
              colorScheme="primary"
            />
          )}

          {seccion !== 'Proyectos' && (
            <p style={{ color: 'var(--w3f-outline)' }}>
              Contenido de la sección {seccion}.
            </p>
          )}

        </Stack>
      </Container>
    </div>
  )
}
```

---

## Ejercicio práctico

Construí una app de **documentación** con esta navegación:

1. `AppBar color="dark"` con logo a la izquierda y botón "GitHub" a la derecha
2. `Drawer anchor="left"` con el índice de la documentación (3 secciones, cada una con 3 ítems)
3. `Breadcrumbs` que refleje la sección/ítem activo (con ícono `<Home>` en el primer ítem)
4. `Tabs variant="underline"` con las pestañas: "Guía", "API", "Ejemplos"

El Drawer se abre con un botón hamburguesa en el `AppBarLeading` y se cierra al seleccionar un ítem.

---

## Referencia rápida

### AppBar — posición recomendada por caso

| Caso | position |
|---|---|
| App con scroll largo | `sticky` |
| App sin scroll (dashboard fullscreen) | `fixed` |
| Dentro de una sección del layout | `static` |

### Drawer — variante por caso de uso

| Caso | variant | anchor |
|---|---|---|
| Menú de navegación mobile | `temporary` | `left` |
| Panel de detalles | `temporary` | `right` |
| Acciones rápidas en mobile | `temporary` | `bottom` |
| Sidebar de admin desktop | `persistent` | `left` |
| Sidebar siempre visible | `permanent` | `left` |

### Tabs — resumen de props clave

```tsx
<Tabs
  initialTabsContent={[{ id, title, content }]}
  variant="default | pills | underline"
  colorScheme="primary | secondary | ..."
  vertical={false}
  closable={false}
  currentTabId="id"          // modo controlado
  onTabChange={id => ...}    // modo controlado
/>
```

### Breadcrumbs — colapso

```tsx
<Breadcrumbs
  maxItems={4}                  // colapsa si hay más de 4
  itemsBeforeCollapse={1}       // muestra 1 al inicio
  itemsAfterCollapse={2}        // muestra 2 al final
>
```

---

## En Next.js

`AppBar`, `Tabs`, `Breadcrumbs` y `Drawer` gestionan estado interno (menú abierto, tab activa, panel visible) — todos necesitan `'use client'`.

El patrón recomendado en App Router es separar la shell de navegación en un componente cliente e importarlo desde `layout.tsx`:

```tsx
// app/components/nav-shell.tsx — Client Component
'use client'

import { useState }        from 'react'
import AppBar, {
  AppBarLeading, AppBarTitle, AppBarTrailing,
}                          from '@w3f/components/SURFACES/AppBar/AppBar'
import Drawer              from '@w3f/components/NAVIGATION/Drawer/Drawer'
import Button              from '@w3f/components/INPUTS/Button/Button'
import { Menu }            from 'lucide-react'

export function NavShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <AppBar position="sticky" color="primary">
        <AppBarLeading>
          <Button variant="icon" onClick={() => setDrawerOpen(true)}>
            <Menu size={20} />
          </Button>
        </AppBarLeading>
        <AppBarTitle>Mi App</AppBarTitle>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {/* items de navegación */}
      </Drawer>

      <main>{children}</main>
    </>
  )
}
```

```tsx
// app/layout.tsx — puede ser Server Component
import { NavShell } from './components/nav-shell'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>
        <NavShell>{children}</NavShell>
      </body>
    </html>
  )
}
```

> **`Tabs` con URL**: si querés sincronizar la tab activa con la URL usá `useSearchParams()` de `next/navigation` — también requiere `'use client'` en el mismo archivo.

---

## Siguiente paso

[Capítulo 12 — Feedback: Alert, Snackbar, Notification, Ripple](12-feedback.md)

Vas a aprender a comunicar estados al usuario: alertas emergentes, notificaciones push, snackbars temporales y el efecto ripple en elementos interactivos.
