# Capítulo 17 — Navegación avanzada: Stepper, SpeedDial, Sidenav

**Nivel:** 3 — Avanzado
**Capítulo:** 17 de 28

---

## ¿Qué vas a aprender?

1. `Stepper` — flujos multi-paso horizontales, verticales, con íconos personalizados y modo no-lineal
2. `SpeedDial` — botón de acción flotante que expande acciones secundarias en 4 direcciones
3. `Sidenav` — barra lateral de navegación con árbol de nodos anidados, variantes y estados

---

## Conceptos

Estos tres componentes cubren patrones de navegación específicos que aparecen en apps más elaboradas:

- **Stepper** — guía al usuario por un proceso secuencial (checkout, onboarding, wizard)
- **SpeedDial** — acceso rápido a múltiples acciones desde un FAB (Floating Action Button), sin llenar la UI de botones
- **Sidenav** — árbol de navegación lateral para dashboards y aplicaciones con muchas secciones

---

## Stepper

Indicador de progreso para flujos multi-paso. Soporta orientación horizontal y vertical, y puede ser lineal o libre.

```
packages/components/src/NAVIGATION/Stepper/Stepper.tsx
```

### Uso básico — horizontal

```tsx
import { Stepper, Step, StepLabel } from '@w3f/components/NAVIGATION/Stepper/Stepper';
import { useState } from 'react';

const PASOS = ['Datos personales', 'Método de pago', 'Revisión', 'Confirmación'];

function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Stepper activeStep={activeStep} orientation="horizontal">
        {PASOS.map((label, i) => (
          <Step key={label} completed={i < activeStep}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Botones de navegación */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(s => s - 1)}
        >
          Atrás
        </Button>
        <Button
          variant="raised"
          color="primary"
          disabled={activeStep === PASOS.length - 1}
          onClick={() => setActiveStep(s => s + 1)}
        >
          {activeStep === PASOS.length - 2 ? 'Finalizar' : 'Continuar'}
        </Button>
      </div>
    </>
  );
}
```

**Cómo funciona:**
- `activeStep` (índice 0-based) marca cuál paso está activo
- `completed` en cada `Step` determina el check de completado — típicamente `i < activeStep`
- El Stepper no maneja el estado internamente; vos controlás `activeStep` con `useState`

### Label alternativo — `alternativeLabel`

Con `alternativeLabel` los labels se muestran debajo de los íconos en lugar de al lado, ideal para steppers compactos:

```tsx
<Stepper activeStep={2} orientation="horizontal" alternativeLabel>
  <Step completed><StepLabel>Plan</StepLabel></Step>
  <Step completed><StepLabel>Cuenta</StepLabel></Step>
  <Step><StepLabel>Pago</StepLabel></Step>
  <Step><StepLabel>Listo</StepLabel></Step>
</Stepper>
```

### Vertical con `StepContent`

El modo vertical permite mostrar contenido colapsable debajo de cada paso activo:

```tsx
import { Stepper, Step, StepLabel, StepContent } from '@w3f/components/NAVIGATION/Stepper/Stepper';

const pasos = [
  { label: 'Información personal',  contenido: 'Completá tu nombre y apellido.' },
  { label: 'Dirección de envío',    contenido: 'Ingresá la dirección de entrega.' },
  { label: 'Método de pago',        contenido: 'Seleccioná tarjeta o transferencia.' },
];

function WizardVertical() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {pasos.map((paso, i) => (
        <Step key={paso.label} completed={i < activeStep}>
          <StepLabel>{paso.label}</StepLabel>
          <StepContent>
            <p>{paso.contenido}</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {i > 0 && (
                <Button variant="outlined" size="sm" onClick={() => setActiveStep(s => s - 1)}>
                  Atrás
                </Button>
              )}
              <Button
                variant="raised"
                color="primary"
                size="sm"
                onClick={() => setActiveStep(s => s + 1)}
              >
                {i === pasos.length - 1 ? 'Finalizar' : 'Continuar'}
              </Button>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}
```

`StepContent` solo es visible cuando ese `Step` está activo. Incluye animación de entrada/salida automática.

### Íconos personalizados

`StepLabel` acepta la prop `icon` para reemplazar el número por defecto:

```tsx
import { User, CreditCard, Package, Check } from 'lucide-react';

<Stepper activeStep={2} alternativeLabel>
  <Step completed>
    <StepLabel icon={<User size={16} />}>Cuenta</StepLabel>
  </Step>
  <Step completed>
    <StepLabel icon={<CreditCard size={16} />}>Pago</StepLabel>
  </Step>
  <Step>
    <StepLabel icon={<Package size={16} />}>Envío</StepLabel>
  </Step>
  <Step>
    <StepLabel icon={<Check size={16} />}>Listo</StepLabel>
  </Step>
</Stepper>
```

### Estado de error en un paso

```tsx
<Stepper activeStep={1}>
  <Step completed>
    <StepLabel>Cuenta creada</StepLabel>
  </Step>
  <Step>
    <StepLabel
      error
      optional={<span style={{ color: 'red', fontSize: '0.75rem' }}>Pago rechazado</span>}
    >
      Pago
    </StepLabel>
  </Step>
  <Step>
    <StepLabel>Confirmación</StepLabel>
  </Step>
</Stepper>
```

`error` aplica estilos de error al ícono y al label. `optional` renderiza un nodo debajo del label (útil para mensajes de error o subtítulos).

### Modo no-lineal — `nonLinear`

Con `nonLinear`, el usuario puede clickear cualquier paso para navegarlo libremente:

```tsx
function StepperLibre() {
  const [activeStep, setActiveStep] = useState(0);
  const [completados, setCompletados] = useState<Set<number>>(new Set());

  const marcarCompletado = () => {
    setCompletados(prev => new Set(prev).add(activeStep));
  };

  return (
    <Stepper activeStep={activeStep} nonLinear>
      {['Paso A', 'Paso B', 'Paso C'].map((label, i) => (
        <Step key={label} completed={completados.has(i)}>
          <StepLabel onClick={(_e, _idx) => setActiveStep(i)}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
```

Con `nonLinear`, el `onClick` del `StepLabel` recibe `(event, index)` y el usuario puede saltar entre pasos.

### Colores

```tsx
<Stepper activeStep={2} color="primary">...</Stepper>    {/* default */}
<Stepper activeStep={2} color="secondary">...</Stepper>
<Stepper activeStep={2} color="success">...</Stepper>
<Stepper activeStep={2} color="warning">...</Stepper>
<Stepper activeStep={2} color="danger">...</Stepper>
```

### Referencia rápida — Stepper

| Componente | Prop | Tipo | Descripción |
|---|---|---|---|
| `Stepper` | `activeStep` | `number` | Índice del paso activo (0-based) |
| `Stepper` | `orientation` | `'horizontal' \| 'vertical'` | Dirección del stepper |
| `Stepper` | `alternativeLabel` | `boolean` | Labels debajo de los íconos |
| `Stepper` | `nonLinear` | `boolean` | Pasos clickeables en cualquier orden |
| `Stepper` | `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | Color del indicador |
| `Stepper` | `connector` | `ReactElement \| null` | Conector personalizado entre pasos |
| `Step` | `completed` | `boolean` | Marca el paso como completado (check) |
| `Step` | `disabled` | `boolean` | Deshabilita la interacción del paso |
| `StepLabel` | `icon` | `ReactNode` | Ícono personalizado (reemplaza el número) |
| `StepLabel` | `optional` | `ReactNode` | Subtexto debajo del label |
| `StepLabel` | `error` | `boolean` | Estado de error |
| `StepLabel` | `onClick` | `(e, index) => void` | Callback al clickear (modo nonLinear) |
| `StepContent` | `transitionDuration` | `number` | Duración de la animación en ms |

---

## SpeedDial

Botón de acción flotante (FAB) que al abrirse muestra un conjunto de acciones secundarias en una dirección configurable.

```
packages/components/src/NAVIGATION/SpeedDial/SpeedDial.tsx
```

### Uso básico

```tsx
import { SpeedDial, SpeedDialAction } from '@w3f/components/NAVIGATION/SpeedDial/SpeedDial';
import { Plus, Copy, Save, Printer, Share2 } from 'lucide-react';

<SpeedDial
  ariaLabel="Acciones rápidas"
  icon={<Plus />}
  direction="up"
  position="bottom-right"
>
  <SpeedDialAction icon={<Copy />}    tooltipTitle="Copiar" />
  <SpeedDialAction icon={<Save />}    tooltipTitle="Guardar" />
  <SpeedDialAction icon={<Printer />} tooltipTitle="Imprimir" />
  <SpeedDialAction icon={<Share2 />}  tooltipTitle="Compartir" />
</SpeedDial>
```

`ariaLabel` es **requerido** para accesibilidad. `icon` es el ícono del FAB principal. Los hijos son `SpeedDialAction`.

El `SpeedDial` se posiciona de forma `fixed` según `position`. Para demos embebidas, conviene usar un contenedor con `position: relative` y desactivar `position`.

### Dirección de apertura

```tsx
<SpeedDial direction="up"    icon={<Plus />} ariaLabel="Up">...</SpeedDial>     {/* default */}
<SpeedDial direction="down"  icon={<Plus />} ariaLabel="Down">...</SpeedDial>
<SpeedDial direction="left"  icon={<Plus />} ariaLabel="Left">...</SpeedDial>
<SpeedDial direction="right" icon={<Plus />} ariaLabel="Right">...</SpeedDial>
```

### Posición en pantalla

```tsx
<SpeedDial position="bottom-right" ...>...</SpeedDial>  {/* default */}
<SpeedDial position="bottom-left"  ...>...</SpeedDial>
<SpeedDial position="top-right"    ...>...</SpeedDial>
<SpeedDial position="top-left"     ...>...</SpeedDial>
```

`offset` ajusta el margen respecto al borde (en píxeles, default 16):

```tsx
<SpeedDial position="bottom-right" offset={32} ...>...</SpeedDial>
```

### Ícono de apertura distinto — `openIcon`

Podés mostrar un ícono diferente cuando el SpeedDial está abierto:

```tsx
import { Plus, X } from 'lucide-react';

<SpeedDial
  ariaLabel="Acciones"
  icon={<Plus />}
  openIcon={<X />}
  direction="up"
  color="primary"
>
  <SpeedDialAction icon={<Copy />}   tooltipTitle="Copiar" />
  <SpeedDialAction icon={<Save />}   tooltipTitle="Guardar" />
  <SpeedDialAction icon={<Share2 />} tooltipTitle="Compartir" />
</SpeedDial>
```

### Tooltips siempre visibles — `tooltipOpen`

Por defecto los tooltips solo se muestran con hover. Con `tooltipOpen` en `SpeedDialAction` son siempre visibles:

```tsx
<SpeedDial ariaLabel="Acciones" icon={<Plus />} openIcon={<X />} direction="up">
  <SpeedDialAction icon={<Copy />}    tooltipTitle="Copiar"    tooltipOpen />
  <SpeedDialAction icon={<Save />}    tooltipTitle="Guardar"   tooltipOpen />
  <SpeedDialAction icon={<Printer />} tooltipTitle="Imprimir"  tooltipOpen />
</SpeedDial>
```

`tooltipPlacement` en `SpeedDialAction`: `'top'` | `'bottom'` | `'left'` | `'right'`

### Abrir con hover — `openOnHover`

```tsx
<SpeedDial ariaLabel="Acciones" icon={<Plus />} openOnHover direction="up">
  ...
</SpeedDial>
```

### Backdrop — `backdrop`

Agrega un overlay semitransparente detrás cuando el SpeedDial está abierto:

```tsx
<SpeedDial ariaLabel="Acciones" icon={<Plus />} backdrop direction="up">
  ...
</SpeedDial>
```

### Control externo — `open` / `onOpen` / `onClose`

Por defecto el SpeedDial maneja su propio estado. Para control externo:

```tsx
const [open, setOpen] = useState(false);

<SpeedDial
  ariaLabel="Acciones"
  icon={<Plus />}
  open={open}
  onOpen={(_e, _reason) => setOpen(true)}
  onClose={(_e, _reason) => setOpen(false)}
  direction="up"
>
  ...
</SpeedDial>
```

`onOpen` recibe `(event, reason)` donde `reason` puede ser `'toggle'` | `'hover'` | `'focus'`.
`onClose` recibe `(event, reason)` donde `reason` puede ser `'toggle'` | `'hover'` | `'blur'` | `'escapeKeyDown'` | `'backdropClick'`.

### Acciones con onClick

```tsx
<SpeedDial ariaLabel="Acciones" icon={<Plus />} direction="up">
  <SpeedDialAction
    icon={<Save />}
    tooltipTitle="Guardar"
    onClick={() => guardarDocumento()}
  />
  <SpeedDialAction
    icon={<Share2 />}
    tooltipTitle="Compartir"
    onClick={() => compartir()}
  />
  <SpeedDialAction
    icon={<Printer />}
    tooltipTitle="Imprimir"
    disabled
  />
</SpeedDial>
```

### Colores y tamaños

```tsx
<SpeedDial color="primary"   size="default" ...>...</SpeedDial>
<SpeedDial color="secondary" size="sm"      ...>...</SpeedDial>
<SpeedDial color="success"   size="lg"      ...>...</SpeedDial>
<SpeedDial color="warning"   ...>...</SpeedDial>
<SpeedDial color="danger"    ...>...</SpeedDial>
```

### Referencia rápida — SpeedDial

| Componente | Prop | Tipo | Descripción |
|---|---|---|---|
| `SpeedDial` | `ariaLabel` | `string` | **Requerido.** Etiqueta de accesibilidad |
| `SpeedDial` | `icon` | `ReactNode` | Ícono del FAB (cerrado) |
| `SpeedDial` | `openIcon` | `ReactNode` | Ícono del FAB (abierto) |
| `SpeedDial` | `direction` | `'up' \| 'down' \| 'left' \| 'right'` | Dirección de apertura |
| `SpeedDial` | `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | Posición en pantalla |
| `SpeedDial` | `offset` | `number` | Margen respecto al borde (px) |
| `SpeedDial` | `open` | `boolean` | Control externo del estado |
| `SpeedDial` | `defaultOpen` | `boolean` | Abierto por defecto (no controlado) |
| `SpeedDial` | `onOpen` | `(e, reason) => void` | Callback al abrir |
| `SpeedDial` | `onClose` | `(e, reason) => void` | Callback al cerrar |
| `SpeedDial` | `openOnHover` | `boolean` | Abrir con hover en lugar de click |
| `SpeedDial` | `backdrop` | `boolean` | Overlay de fondo al abrir |
| `SpeedDial` | `hidden` | `boolean` | Oculta el SpeedDial completamente |
| `SpeedDial` | `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | Color del FAB |
| `SpeedDial` | `size` | `'default' \| 'sm' \| 'lg'` | Tamaño del FAB |
| `SpeedDialAction` | `icon` | `ReactNode` | Ícono de la acción |
| `SpeedDialAction` | `tooltipTitle` | `string` | Texto del tooltip |
| `SpeedDialAction` | `tooltipOpen` | `boolean` | Tooltip siempre visible |
| `SpeedDialAction` | `tooltipPlacement` | `'top' \| 'bottom' \| 'left' \| 'right'` | Posición del tooltip |
| `SpeedDialAction` | `onClick` | `(e) => void` | Callback al clickear la acción |
| `SpeedDialAction` | `disabled` | `boolean` | Deshabilita la acción |
| `SpeedDialAction` | `color` | `SpeedDialColor` | Color individual de la acción |

---

## Sidenav

Barra lateral de navegación basada en un árbol de nodos. Admite anidamiento (carpetas/ítems), carga asíncrona y cuatro variantes visuales.

```
packages/components/src/SURFACES/Sidenav/Sidenav.tsx
```

### Uso básico

```tsx
import Sidenav from '@w3f/components/SURFACES/Sidenav/Sidenav';
import type { TreeNodeData } from '@w3f/components/SURFACES/Sidenav/Sidenav.types';

const navData: TreeNodeData[] = [
  { id: 'home',      name: 'Inicio',        icon: 'home' },
  { id: 'users',     name: 'Usuarios',      icon: 'users' },
  { id: 'settings',  name: 'Configuración', icon: 'settings' },
];

function SidebarApp() {
  return (
    <Sidenav
      treeData={navData}
      onNodeSelect={(node) => console.log('Seleccionado:', node.id)}
    />
  );
}
```

`treeData` es el único prop requerido. `onNodeSelect` recibe el `TreeNodeData` completo del nodo clickeado.

### Nodos anidados — árbol de carpetas

Los nodos pueden tener `children` para crear sub-secciones colapsables:

```tsx
const navData: TreeNodeData[] = [
  { id: 'dashboard', name: 'Dashboard', icon: 'home' },
  {
    id: 'gestion',
    name: 'Gestión',
    icon: 'users',
    type: 'folder',
    children: [
      { id: 'equipo',   name: 'Equipo',               type: 'file' },
      { id: 'roles',    name: 'Roles y permisos',      type: 'file' },
      { id: 'invitar',  name: 'Invitar miembros',      type: 'file' },
    ],
  },
  {
    id: 'reportes',
    name: 'Reportes',
    icon: 'bar-chart',
    type: 'folder',
    children: [
      { id: 'ventas',   name: 'Ventas',    type: 'file' },
      { id: 'trafico',  name: 'Tráfico',   type: 'file' },
    ],
  },
  { id: 'ajustes', name: 'Configuración', icon: 'settings' },
];

<Sidenav
  treeData={navData}
  onNodeSelect={(node) => navigate(`/${node.id}`)}
/>
```

`type: 'folder'` muestra el nodo como grupo colapsable. `type: 'file'` es un nodo hoja (link final).

### Variantes

```tsx
<Sidenav treeData={navData} variant="default" />   {/* default */}
<Sidenav treeData={navData} variant="compact" />   {/* más angosta */}
<Sidenav treeData={navData} variant="expanded" />  {/* ítems más separados */}
<Sidenav treeData={navData} variant="light" />     {/* fondo claro */}
```

### Estados de carga y error

```tsx
{/* Skeleton de carga */}
<Sidenav treeData={[]} loading />

{/* Mensaje de error */}
<Sidenav treeData={[]} error="No se pudo cargar la navegación" />
```

Útil cuando los datos vienen de una API:

```tsx
function SidebarConAPI() {
  const [data, setData]       = useState<TreeNodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetchNavData()
      .then(setData)
      .catch(() => setError('Error cargando la navegación'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Sidenav
      treeData={data}
      loading={loading}
      error={error}
      onNodeSelect={(node) => navigate(`/${node.id}`)}
    />
  );
}
```

### Integrar con React Router

`Sidenav` no depende de ningún router. Usá `onNodeSelect` para conectarlo al que uses:

```tsx
import { useNavigate } from 'react-router-dom';

function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidenav
      treeData={navData}
      onNodeSelect={(node) => navigate(`/${node.id}`)}
    />
  );
}
```

### Integrar en un layout de app

Patrón típico de dashboard con sidebar fija:

```tsx
import Stack from '@w3f/components/LAYOUT/Stack/Stack';

function AppLayout({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <Stack horizontal gap="0" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', flexShrink: 0 }}>
        <Sidenav
          treeData={navData}
          onNodeSelect={(node) => setCurrentPage(node.id as string)}
        />
      </div>

      {/* Contenido principal */}
      <main style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
        {children}
      </main>
    </Stack>
  );
}
```

### Referencia rápida — Sidenav

| Prop | Tipo | Descripción |
|---|---|---|
| `treeData` | `TreeNodeData[]` | **Requerido.** Array de nodos de navegación |
| `onNodeSelect` | `(node: TreeNodeData) => void` | Callback al seleccionar un nodo |
| `variant` | `'default' \| 'compact' \| 'expanded' \| 'light'` | Estilo visual |
| `loading` | `boolean` | Muestra skeleton de carga |
| `error` | `string \| null` | Muestra mensaje de error |

**`TreeNodeData`:**

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string \| number` | **Requerido.** Identificador único |
| `name` | `string` | **Requerido.** Texto visible |
| `icon` | `string` | Nombre del ícono (ej: `'home'`, `'users'`) |
| `iconId` | `string` | ID alternativo de ícono |
| `type` | `'folder' \| 'file'` | Tipo de nodo (folder = grupo colapsable) |
| `children` | `TreeNodeData[]` | Nodos hijos para anidamiento |

---

## Ejercicio práctico

Construí el shell de una app de dashboard con:

1. `Sidenav` con 3 secciones (una con hijos anidados) y `onNodeSelect` que actualiza el título visible
2. `Stepper` horizontal de 4 pasos en el contenido principal — avanzá y retrocedé
3. `SpeedDial` con `position="bottom-right"` y 3 acciones (Guardar, Exportar, Compartir)

**Solución:**

```tsx
import { useState } from 'react';
import Sidenav from '@w3f/components/SURFACES/Sidenav/Sidenav';
import { Stepper, Step, StepLabel } from '@w3f/components/NAVIGATION/Stepper/Stepper';
import { SpeedDial, SpeedDialAction } from '@w3f/components/NAVIGATION/SpeedDial/SpeedDial';
import Stack   from '@w3f/components/LAYOUT/Stack/Stack';
import Button  from '@w3f/components/INPUTS/Button/Button';
import { Save, Download, Share2, LayoutDashboard } from 'lucide-react';

const navData = [
  { id: 'dashboard', name: 'Dashboard',      icon: 'home' },
  {
    id: 'reportes',
    name: 'Reportes',
    icon: 'bar-chart',
    type: 'folder' as const,
    children: [
      { id: 'ventas',   name: 'Ventas',   type: 'file' as const },
      { id: 'trafico',  name: 'Tráfico',  type: 'file' as const },
    ],
  },
  { id: 'ajustes', name: 'Configuración', icon: 'settings' },
];

const PASOS = ['Datos básicos', 'Configuración', 'Revisión', 'Publicar'];

export function DashboardShell() {
  const [activePage, setActivePage]   = useState('Dashboard');
  const [activeStep, setActiveStep]   = useState(0);

  return (
    <Stack horizontal gap="0" style={{ height: '100vh', position: 'relative' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', flexShrink: 0 }}>
        <Sidenav
          treeData={navData}
          onNodeSelect={(node) => setActivePage(node.name)}
        />
      </div>

      {/* Contenido */}
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>{activePage}</h2>

        {/* Wizard de 4 pasos */}
        <Stepper activeStep={activeStep} orientation="horizontal" color="primary">
          {PASOS.map((label, i) => (
            <Step key={label} completed={i < activeStep}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stack horizontal gap="0.5rem" style={{ marginTop: '1.5rem' }}>
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={() => setActiveStep(s => s - 1)}
          >
            Atrás
          </Button>
          <Button
            variant="raised"
            color="primary"
            disabled={activeStep === PASOS.length - 1}
            onClick={() => setActiveStep(s => s + 1)}
          >
            {activeStep === PASOS.length - 2 ? 'Finalizar' : 'Continuar'}
          </Button>
        </Stack>
      </main>

      {/* SpeedDial */}
      <SpeedDial
        ariaLabel="Acciones"
        icon={<LayoutDashboard size={20} />}
        direction="up"
        position="bottom-right"
        color="primary"
      >
        <SpeedDialAction icon={<Save size={18} />}     tooltipTitle="Guardar"   onClick={() => console.log('guardado')} />
        <SpeedDialAction icon={<Download size={18} />} tooltipTitle="Exportar"  onClick={() => console.log('exportado')} />
        <SpeedDialAction icon={<Share2 size={18} />}   tooltipTitle="Compartir" onClick={() => console.log('compartido')} />
      </SpeedDial>
    </Stack>
  );
}
```

---

## Referencia rápida — imports

```tsx
// Stepper
import {
  Stepper, Step, StepLabel, StepContent,
} from '@w3f/components/NAVIGATION/Stepper/Stepper';

// SpeedDial
import { SpeedDial, SpeedDialAction } from '@w3f/components/NAVIGATION/SpeedDial/SpeedDial';

// Sidenav
import Sidenav from '@w3f/components/SURFACES/Sidenav/Sidenav';
import type { TreeNodeData } from '@w3f/components/SURFACES/Sidenav/Sidenav.types';
```

---

## En Next.js

`Stepper`, `SpeedDial` y `Sidenav` gestionan estado interno (paso activo, menú abierto, nodo seleccionado) — los tres requieren `'use client'`.

### Stepper con rutas de Next.js

El patrón más común en Next.js es sincronizar el Stepper con el router para que cada paso tenga su propia URL:

```tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Stepper, Step, StepLabel }   from '@w3f/components/NAVIGATION/Stepper/Stepper'
import Button                         from '@w3f/components/INPUTS/Button/Button'
import Stack                          from '@w3f/components/LAYOUT/Stack/Stack'

const PASOS = ['Datos', 'Confirmación', 'Pago', 'Listo']

export function CheckoutStepper() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const activeStep   = Number(searchParams.get('paso') ?? '0')

  const ir = (paso: number) => router.push(`?paso=${paso}`)

  return (
    <>
      <Stepper activeStep={activeStep} orientation="horizontal" color="primary">
        {PASOS.map((label, i) => (
          <Step key={label} completed={i < activeStep}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stack horizontal gap="0.5rem" style={{ marginTop: '1rem' }}>
        <Button variant="outlined" disabled={activeStep === 0} onClick={() => ir(activeStep - 1)}>
          Atrás
        </Button>
        <Button variant="raised" color="primary" disabled={activeStep === PASOS.length - 1} onClick={() => ir(activeStep + 1)}>
          Continuar
        </Button>
      </Stack>
    </>
  )
}
```

### Sidenav con `usePathname`

```tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import Sidenav                    from '@w3f/components/SURFACES/Sidenav/Sidenav'

const navData = [
  { id: '/dashboard',  name: 'Dashboard',  icon: 'home' },
  { id: '/usuarios',   name: 'Usuarios',   icon: 'users' },
  { id: '/reportes',   name: 'Reportes',   icon: 'bar-chart' },
]

export function AppSidenav() {
  const router   = useRouter()
  const pathname = usePathname()

  return (
    <Sidenav
      treeData={navData}
      onNodeSelect={(node) => router.push(node.id as string)}
    />
  )
}
```

### SpeedDial en App Router

`SpeedDial` con `position="bottom-right"` usa `position: fixed` — funciona perfectamente en Next.js después de la hidratación. Si hay mismatch de hidratación (el componente aparece en SSR pero no debería), podés suprimirlo con `suppressHydrationWarning` o montarlo solo en cliente:

```tsx
'use client'

import dynamic from 'next/dynamic'

const SpeedDialActions = dynamic(
  () => import('./speed-dial-actions'),
  { ssr: false }  // solo renderiza en cliente, evita mismatch de posición fixed
)
```

---

## Siguiente paso

[Capítulo 18 — Charts: introducción y arquitectura visx](./18-charts-intro.md)
