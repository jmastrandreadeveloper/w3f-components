# Backdrop

Overlay de pantalla completa que bloquea la interaccion con el contenido subyacente. Renderiza via portal en `document.body`. Muestra un spinner de carga por defecto y bloquea el scroll del `body` mientras esta abierto.

## Importacion

```tsx
import Backdrop, { useBackdrop } from '@/components/FEEDBACK/Backdrop/Backdrop';
```

## Uso basico

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Cargar</Button>
<Backdrop open={open} onClick={() => setOpen(false)} />
```

## Con hook useBackdrop

```tsx
const { isOpen, open, close, toggle } = useBackdrop();

<Button onClick={open}>Abrir</Button>
<Backdrop open={isOpen} onClick={close} />
```

## Spinner personalizado

```tsx
<Backdrop open={open} spinnerColor="success" spinnerSize="xl" onClick={close} />
```

## Sin spinner (backdrop invisible)

```tsx
<Backdrop open={open} invisible showSpinner={false} onClick={close}>
  <div>Contenido centrado sobre fondo transparente</div>
</Backdrop>
```

## Con contenido custom

Cuando se pasan `children`, el spinner se oculta y se muestra el contenido:

```tsx
<Backdrop open={isLoading} showSpinner={false}>
  <Panel card round>
    <Text element="h4">Procesando...</Text>
    <Button onClick={cancelOperation}>Cancelar</Button>
  </Panel>
</Backdrop>
```

## CSS Custom Properties

```css
.mi-carga {
  --w3f-backdrop-bg: rgba(15, 23, 42, 0.75);
  --w3f-backdrop-blur: 4px;
  --w3f-backdrop-transition: ease-out;
  --w3f-backdrop-z: 1400;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-backdrop-bg` | `rgba(0,0,0,0.5)` | Color de fondo del overlay |
| `--w3f-backdrop-z` | `1200` | z-index del backdrop |
| `--w3f-backdrop-blur` | `0px` | Desenfoque del fondo (backdrop-filter) |
| `--w3f-backdrop-transition` | `ease-in-out` | Funcion de timing de la transicion |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `open` | `boolean` | — | Controla la visibilidad. Requerido |
| `children` | `ReactNode` | — | Contenido superpuesto sobre el overlay. Si se pasa, reemplaza el spinner |
| `invisible` | `boolean` | `false` | Fondo transparente. Util para capturar clicks fuera de un popup |
| `onClick` | `(e: MouseEvent) => void` | — | Handler de clic sobre el overlay |
| `transitionDuration` | `number` | `300` | Duracion de la transicion en ms |
| `showSpinner` | `boolean` | `true` | Muestra el `ProgressSpinner` cuando no hay children |
| `spinnerColor` | `SpinnerColor` | `'primary'` | Color del spinner |
| `spinnerSize` | `SpinnerSize \| number` | `'lg'` | Tamano del spinner |
| `component` | `ElementType` | `'div'` | Elemento raiz del backdrop |
| `sx` | `CSSProperties` | — | Estilos inline adicionales |
| `className` | `string` | — | Clases CSS adicionales |

`SpinnerColor`: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'`

`SpinnerSize`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`

## useBackdrop

```tsx
const { isOpen, open, close, toggle } = useBackdrop(initialOpen?: boolean);
```

| Retorno | Tipo | Descripcion |
|---|---|---|
| `isOpen` | `boolean` | Estado actual |
| `open` | `() => void` | Abre el backdrop |
| `close` | `() => void` | Cierra el backdrop |
| `toggle` | `() => void` | Alterna entre abierto y cerrado |

## API

#### Entrada de datos

El Backdrop no gestiona datos de formulario ni integra FormContext. Solo acepta estado de control externo:

| Prop | Descripcion |
|---|---|
| `open` | Estado booleano controlado por el padre (o por `useBackdrop`) |
| `children` | Contenido opcional a centrar sobre el overlay |

#### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onClick` | `(e: MouseEvent<HTMLDivElement>) => void` | Click directo sobre el overlay (no sobre los children) |

El patron tipico es usar `onClick` para cerrar el backdrop:

```tsx
<Backdrop open={isOpen} onClick={close} />
```

#### Comunicacion con otros componentes

El Backdrop es un componente de presentacion autonomo. No emite eventos globales ni lee ningun contexto del framework.

**Integracion con Drawer / Modal (patron recomendado):**

```tsx
// El Drawer o Modal gestiona su propio estado y pasa open al Backdrop
const [drawerOpen, setDrawerOpen] = useState(false);

<>
  <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
  <Backdrop open={drawerOpen} onClick={() => setDrawerOpen(false)} />
</>
```

**Bloqueo de scroll:**
El hook `useScrollLock` se ejecuta internamente cuando `open=true`. Calcula el ancho de la scrollbar para evitar el salto de layout y restaura el estado original al cerrarse.

#### Accesibilidad

| Atributo | Valor | Descripcion |
|---|---|---|
| `role` | `"presentation"` | El overlay no es contenido semantico |
| Scroll lock | `body.style.overflow = 'hidden'` | Bloquea el scroll del documento mientras esta abierto |
| Portal | `document.body` | Se renderiza fuera del arbol normal para garantizar z-index correcto |

#### Patron de uso recomendado

```tsx
// 1. Carga asincrona — spinner por defecto
const { isOpen, open, close } = useBackdrop();

const handleFetch = async () => {
  open();
  await fetchData();
  close();
};

<Button onClick={handleFetch}>Cargar datos</Button>
<Backdrop open={isOpen} />

// 2. Click-away para popups
<Backdrop open={popupOpen} onClick={closePopup} invisible showSpinner={false} />
<Popup open={popupOpen} />

// 3. Proceso cancelable con contenido custom
<Backdrop open={uploading} showSpinner={false}>
  <UploadProgress onCancel={cancelUpload} />
</Backdrop>
```

## Estructura de archivos

```
Backdrop/
  Backdrop.tsx            Componente principal con forwardRef + portal
  Backdrop.types.ts       BackdropProps, SpinnerColor, SpinnerSize, UseBackdropResult
  Backdrop.constants.ts   BACKDROP_DEFAULTS, BACKDROP_Z_INDEX
  Backdrop.hooks.ts       useBackdrop(), useScrollLock()
  Backdrop.utils.ts       buildBackdropClasses()
  README.md               Esta documentacion
```

CSS: `src/w3fussion/FEEDBACK/_backdrop.css`
