# Tabs

Componente de navegacion por pestanas con soporte para modo controlado/no controlado, layout vertical, pestanas cerrables, tres variantes visuales y seis esquemas de color. Los datos de cada tab (id, titulo, contenido) se pasan via `initialTabsContent` como array de objetos `TabItem`.

## Importacion

```tsx
import { Tabs } from '@/components/SURFACES/Tabs/Tabs';
import type { TabItem } from '@/components/SURFACES/Tabs/Tabs.types';
```

## Uso basico

```tsx
const tabs: TabItem[] = [
  { id: 'home', title: 'Inicio', content: <p>Bienvenido</p> },
  { id: 'profile', title: 'Perfil', content: 'Texto del perfil' },
  { id: 'settings', title: 'Ajustes', content: <SettingsPanel /> },
];

<Tabs initialTabsContent={tabs} />
```

## Variantes visuales

```tsx
<Tabs initialTabsContent={tabs} variant="default" />
<Tabs initialTabsContent={tabs} variant="pills" />
<Tabs initialTabsContent={tabs} variant="underline" />
```

## Esquemas de color

```tsx
<Tabs initialTabsContent={tabs} variant="pills" colorScheme="primary" />
<Tabs initialTabsContent={tabs} variant="pills" colorScheme="secondary" />
<Tabs initialTabsContent={tabs} variant="pills" colorScheme="success" />
<Tabs initialTabsContent={tabs} variant="pills" colorScheme="warning" />
<Tabs initialTabsContent={tabs} variant="pills" colorScheme="danger" />
<Tabs initialTabsContent={tabs} variant="pills" colorScheme="info" />
```

## Layout vertical

Tabs a la izquierda con contenido a la derecha:

```tsx
<Tabs initialTabsContent={tabs} vertical variant="default" />
<Tabs initialTabsContent={tabs} vertical variant="pills" colorScheme="primary" />
```

## Pestanas cerrables

```tsx
<Tabs
  initialTabsContent={tabs}
  closable
  variant="default"
/>
```

Cuando se cierran todas las pestanas, se muestra un estado vacio con icono.

## Modo controlado

Controla la pestana activa externamente via `currentTabId` y `onTabChange`:

```tsx
const [activeTab, setActiveTab] = useState<string | null>('home');

<Tabs
  initialTabsContent={tabs}
  currentTabId={activeTab ?? undefined}
  onTabChange={(id) => setActiveTab(id)}
  variant="underline"
  colorScheme="primary"
/>
```

## Con titulo

```tsx
<Tabs
  initialTabsContent={tabs}
  title="Panel de Navegacion"
  variant="underline"
/>
```

## Tabs con contenido JSX

`TabItem.content` acepta cualquier `ReactNode`:

```tsx
const tabs: TabItem[] = [
  {
    id: 'form',
    title: 'Formulario',
    content: (
      <Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
        <Input name="name" label="Nombre" />
        <Button type="submit">Guardar</Button>
      </Form>
    ),
  },
];
```

## CSS Custom Properties

```css
.demo-tabs-rounded {
  --w3f-tabs-pill-radius: 999px;
  --w3f-tabs-pill-active-bg: #6d28d9;
  --w3f-tabs-pill-active-color: #fff;
  --w3f-tabs-item-hover-bg: #ede9fe;
}

.demo-tabs-slim {
  --w3f-tabs-item-pad: 0.5rem 1rem;
  --w3f-tabs-item-font: var(--w3f-text-sm);
  --w3f-tabs-active-indicator-size: 2px;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-tabs-margin-bottom` | `space-6` | Margen inferior del contenedor |
| `--w3f-tabs-title-font` | `text-xl` | Tamano del titulo opcional |
| `--w3f-tabs-title-weight` | `600` | Peso del titulo |
| `--w3f-tabs-title-color` | `on-surface` | Color del titulo |
| `--w3f-tabs-vertical-gap` | `space-4` | Separacion en layout vertical |
| `--w3f-tabs-list-bg` | `surface` | Fondo de la lista de tabs |
| `--w3f-tabs-list-radius` | `radius-lg` | Border radius de la lista |
| `--w3f-tabs-list-border-color` | `outline-variant` | Borde inferior (horizontal) o derecho (vertical) |
| `--w3f-tabs-list-scrollbar-color` | `gray-400` | Color del scrollbar |
| `--w3f-tabs-list-min-w-vertical` | `200px` | Ancho minimo en modo vertical |
| `--w3f-tabs-item-pad` | `space-3 space-5` | Padding de cada tab |
| `--w3f-tabs-item-font` | `text-base` | Tamano de fuente del tab |
| `--w3f-tabs-item-weight` | `500` | Peso de fuente del tab |
| `--w3f-tabs-item-color` | `gray-600` | Color del texto inactivo |
| `--w3f-tabs-item-hover-color` | `on-surface` | Color en hover |
| `--w3f-tabs-item-hover-bg` | `gray-100` | Fondo en hover |
| `--w3f-tabs-item-transition` | `transition-fast` | Transicion de estados |
| `--w3f-tabs-active-color` | `on-surface` | Color del tab activo |
| `--w3f-tabs-active-bg` | `gray-200` | Fondo del tab activo |
| `--w3f-tabs-active-weight` | `600` | Peso del tab activo |
| `--w3f-tabs-active-indicator-size` | `3px` | Grosor del indicador activo |
| `--w3f-tabs-pill-radius` | `radius-lg` | Border radius de tabs pills |
| `--w3f-tabs-pill-active-color` | `on-primary` | Color del pill activo |
| `--w3f-tabs-pill-active-bg` | `primary` | Fondo del pill activo |
| `--w3f-tabs-pill-shadow` | `shadow-sm` | Sombra del pill activo |
| `--w3f-tabs-pill-hover-bg` | `gray-200` | Fondo del pill en hover |
| `--w3f-tabs-underline-color` | `primary` | Color del indicador underline |
| `--w3f-tabs-scheme-color` | `primary` | Color del esquema activo |
| `--w3f-tabs-scheme-on-color` | `on-primary` | Color sobre el esquema activo |
| `--w3f-tabs-close-size` | `20px` | Tamano del boton de cierre |
| `--w3f-tabs-close-hover-bg` | `rgba(0,0,0,0.1)` | Fondo del boton cierre en hover |
| `--w3f-tabs-panel-pad` | `space-6` | Padding del panel de contenido |
| `--w3f-tabs-panel-bg` | `surface` | Fondo del panel |
| `--w3f-tabs-panel-radius` | `radius-lg` | Border radius del panel |
| `--w3f-tabs-panel-border-color` | `outline-variant` | Borde del panel |
| `--w3f-tabs-panel-title-font` | `text-lg` | Tamano del titulo del panel |
| `--w3f-tabs-highlight-bg` | `primary` | Fondo con highlightActiveTab |
| `--w3f-tabs-highlight-color` | `on-primary` | Texto con highlightActiveTab |

## Props

### Tabs

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `initialTabsContent` | `TabItem[]` | `[]` | Array de objetos tab con id, title y content |
| `closable` | `boolean` | `false` | Muestra boton de cierre en cada tab |
| `title` | `string` | `'Pestanas'` | Titulo visible sobre la lista de tabs |
| `currentTabId` | `string` | — | ID del tab activo (modo controlado) |
| `onTabChange` | `(tabId: string \| null) => void` | — | Callback al cambiar tab activo |
| `highlightActiveTab` | `boolean` | `false` | Aplica fondo de color al tab activo |
| `vertical` | `boolean` | `false` | Dispone la lista de tabs a la izquierda |
| `variant` | `'default' \| 'pills' \| 'underline'` | `'default'` | Estilo visual de la lista de tabs |
| `colorScheme` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Esquema de color del tab activo |

### TabItem (tipo de dato)

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | `string` | Identificador unico del tab |
| `title` | `string` | Etiqueta visible en la lista de tabs |
| `content` | `ReactNode \| string` | Contenido del panel. Si es string, se renderiza con titulo y parrafo. Si es ReactNode, se renderiza directamente |

## API

#### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Array de tabs | `initialTabsContent` | `TabItem[]` | Define todos los tabs, titulos y contenidos |
| Controlado | `currentTabId` | `string` | Fuerza el tab activo desde el exterior |

**Modo no controlado (default):** el componente gestiona internamente `internalActiveTab`, inicializado al primer tab del array. Cambia al hacer click.

**Modo controlado:** cuando se pasa `currentTabId`, el estado activo es el prop — el componente no gestiona estado propio de activacion. `onTabChange` es el canal de actualizacion:

```tsx
// Sincronizacion bidireccional
const [tab, setTab] = useState('home');
<Tabs currentTabId={tab} onTabChange={setTab} initialTabsContent={tabs} />
```

#### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onTabChange` | `(tabId: string \| null) => void` | El usuario hace click en un tab diferente al activo. En modo controlado es el unico canal de actualizacion. Emite `null` si se cierran todos los tabs (`closable=true`) |

**Flujo de cierre de tab:**
1. Click en boton × del tab `tabId`
2. `e.stopPropagation()` evita activar el tab
3. Tab se elimina del array interno
4. Si era el activo, se activa el primer tab restante
5. `onTabChange(nextId)` se llama si esta definido

#### Comunicacion con otros componentes

El componente Tabs es autonomo — no usa Context ni se comunica con Form/LiveForm directamente. Sin embargo, `content` puede contener cualquier componente del framework:

```
Tabs
  └─ [panel activo].content → ReactNode libre
       └─ Form > Input, Button (sin restricciones)
       └─ Table, Chart, cualquier componente
```

**ARIA roles (tablist / tab / tabpanel):**

```
div[role="tablist"]
  └─ div[role="tab"][aria-selected][aria-controls="panel-{id}"]
       └─ span (titulo)
       └─ Button (cerrar, si closable)

div[role="tabpanel"][id="panel-{id}"][hidden]
  └─ contenido del tab
```

La prop `hidden` en tabpanel oculta el contenido inactivo sin desmontarlo, preservando el estado de los componentes hijos.

#### Accesibilidad

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `role` | `"tablist"` | Lista de tabs | Siempre |
| `role` | `"tab"` | Cada tab | Siempre |
| `aria-selected` | `true \| false` | Cada tab | Siempre |
| `aria-controls` | `"panel-{id}"` | Cada tab | Siempre |
| `tabIndex` | `0` | Cada tab | Para navegacion por teclado |
| `role` | `"tabpanel"` | Cada panel | Siempre |
| `id` | `"panel-{id}"` | Cada panel | Referenciado por aria-controls |
| `hidden` | atributo HTML | Panel inactivo | Cuando el tab no esta activo |
| `aria-label` | `"Cerrar {title}"` | Boton cierre | Cuando `closable=true` |
| `aria-label` | valor de `title` | Contenedor | Cuando `title` esta definido |

La navegacion por teclado soporta `Enter` y `Space` para activar un tab.

#### Patron de uso recomendado

```tsx
// 1. Navegacion de contenido estatico
const contentTabs: TabItem[] = [
  { id: 'overview', title: 'Resumen', content: <Overview /> },
  { id: 'details', title: 'Detalles', content: <Details /> },
  { id: 'history', title: 'Historial', content: <History /> },
];
<Tabs initialTabsContent={contentTabs} variant="underline" colorScheme="primary" />

// 2. Editor multi-archivo (cerrable + controlado)
const [files, setFiles] = useState<TabItem[]>(openFiles);
const [active, setActive] = useState(files[0]?.id ?? null);

<Tabs
  initialTabsContent={files}
  currentTabId={active ?? undefined}
  onTabChange={setActive}
  closable
  variant="default"
/>

// 3. Formulario por pasos en tabs
<Tabs
  initialTabsContent={[
    { id: 'step1', title: 'Datos', content: <StepOneForm /> },
    { id: 'step2', title: 'Direccion', content: <StepTwoForm /> },
    { id: 'step3', title: 'Confirmar', content: <ConfirmStep /> },
  ]}
  variant="pills"
  colorScheme="primary"
/>
```

## Estructura de archivos

```
Tabs/
  Tabs.tsx            Componente principal con CloseIcon y EmptyIcon inline
  Tabs.types.ts       TabsProps, TabItem, TabsVariant, TabsColorScheme
  Tabs.constants.ts   TABS_DEFAULTS, TABS_CLASSES
  Tabs.utils.ts       buildTabsLayoutClass, buildTabsListClass, buildTabsItemClass
  Tabs.hooks.ts       useTabsState (modo controlado/no controlado, cierre de tabs)
  README.md           Esta documentacion
```

CSS: `src/w3fussion/SURFACES/_tabs.css`
