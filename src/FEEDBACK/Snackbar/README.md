# Snackbar

Barra de notificacion temporal alineada al borde de la pantalla. Informa al usuario de una accion o proceso sin interrumpir el flujo. Soporta cierre automatico con pausa en hover, seis posiciones, cinco variantes de color y un slot de accion personalizada.

## Importacion

```tsx
import Snackbar, { useSnackbar } from '@/components/FEEDBACK/Snackbar/Snackbar';
```

## Uso basico con useSnackbar

```tsx
const snack = useSnackbar();

<Button onClick={() => snack.showSnackbar('Operacion completada')}>
  Mostrar
</Button>

<Snackbar
  open={snack.show}
  message={snack.message}
  variant={snack.variant}
  autoHideDuration={snack.duration}
  onClose={snack.closeSnackbar}
/>
```

## Helpers por variante

```tsx
const snack = useSnackbar({ defaultDuration: 3000 });

snack.showSnackbar('Mensaje por defecto');
snack.showSuccess('Guardado correctamente');
snack.showWarning('Revisa tu configuracion');
snack.showDanger('Error al procesar');
snack.showInfo('Nueva actualizacion disponible');
```

## Posiciones

Six posiciones via `anchorOrigin`:

```tsx
snack.showSnackbar('Top Left',      { anchorOrigin: { vertical: 'top', horizontal: 'left' } });
snack.showSnackbar('Top Center',    { anchorOrigin: { vertical: 'top', horizontal: 'center' } });
snack.showSnackbar('Top Right',     { anchorOrigin: { vertical: 'top', horizontal: 'right' } });
snack.showSnackbar('Bottom Left',   { anchorOrigin: { vertical: 'bottom', horizontal: 'left' } });
snack.showSnackbar('Bottom Center', { anchorOrigin: { vertical: 'bottom', horizontal: 'center' } }); // default
snack.showSnackbar('Bottom Right',  { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
```

## Duracion custom

```tsx
snack.showSnackbar('Rapido', { duration: 1500 });
snack.showSnackbar('Largo',  { duration: 8000 });
```

## Slot de accion

Reemplaza el boton de cierre por un elemento custom (ej. boton "DESHACER"):

```tsx
snack.showSnackbar('Elemento eliminado', {
  variant: 'danger',
  duration: 6000,
  action: (
    <button type="button" onClick={() => { undo(); snack.closeSnackbar(); }}>
      DESHACER
    </button>
  ),
});

<Snackbar
  open={snack.show}
  message={snack.message}
  variant={snack.variant}
  autoHideDuration={snack.duration}
  action={snack.action}
  onClose={snack.closeSnackbar}
/>
```

## Uso directo (sin useSnackbar)

```tsx
const [open, setOpen] = useState(false);

<Snackbar
  open={open}
  message="Mensaje de prueba"
  variant="success"
  autoHideDuration={3000}
  onClose={(e, reason) => {
    console.log('Motivo de cierre:', reason); // 'timeout' | 'clickaway' | 'escapeKeyDown'
    setOpen(false);
  }}
/>
```

## CSS Custom Properties

```css
.mi-snackbar {
  --w3f-snack-bg: #1e293b;
  --w3f-snack-color: #f8fafc;
  --w3f-snack-radius: 0.5rem;
  --w3f-snack-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  --w3f-snack-max-width: 480px;
  --w3f-snack-offset: 1.5rem;
  --w3f-snack-padding-v: 0.75rem;
  --w3f-snack-padding-h: 1rem;
  --w3f-snack-close-color: #4ade80;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-snack-bg` | `gray-800` | Color de fondo |
| `--w3f-snack-color` | `gray-50` | Color del texto |
| `--w3f-snack-radius` | `radius-md` | Border radius |
| `--w3f-snack-shadow` | `shadow-lg` | Sombra |
| `--w3f-snack-max-width` | `568px` | Ancho maximo |
| `--w3f-snack-z` | `1000` | z-index |
| `--w3f-snack-offset` | `space-5` | Distancia al borde de la pantalla |
| `--w3f-snack-padding-v` | `space-3` | Padding vertical |
| `--w3f-snack-padding-h` | `space-4` | Padding horizontal |
| `--w3f-snack-close-color` | `success-400` | Color del boton de cierre / texto de accion |

## Props de Snackbar

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `open` | `boolean` | — | Controla la visibilidad. Requerido |
| `message` | `ReactNode` | — | Texto o JSX del mensaje |
| `onClose` | `(e, reason: SnackbarCloseReason) => void` | — | Callback al cerrar |
| `autoHideDuration` | `number \| null` | `3000` | Ms hasta auto-cerrar. `null` = nunca |
| `variant` | `SnackbarVariant` | `'default'` | Variante de color |
| `anchorOrigin` | `SnackbarAnchorOrigin` | `{ vertical:'bottom', horizontal:'center' }` | Posicion en pantalla |
| `action` | `ReactNode` | — | Slot de accion que reemplaza el boton X |
| `resumeHideDuration` | `number` | — | Duracion tras reanudar despues de hover |
| `className` | `string` | — | Clases CSS adicionales |

`SnackbarVariant`: `'default' | 'success' | 'warning' | 'danger' | 'info'`

`SnackbarCloseReason`: `'timeout' | 'clickaway' | 'escapeKeyDown'`

**Props deprecadas** (backward compat):
- `show` → usar `open`
- `duration` → usar `autoHideDuration`

## useSnackbar

```tsx
const snack = useSnackbar(options?: UseSnackbarOptions);
```

| Opcion | Tipo | Default | Descripcion |
|---|---|---|---|
| `defaultDuration` | `number` | `3000` | Duracion por defecto para todas las llamadas |
| `defaultVariant` | `SnackbarVariant` | `'default'` | Variante por defecto |

### Retorno de useSnackbar

| Campo | Tipo | Descripcion |
|---|---|---|
| `show` | `boolean` | Estado open actual |
| `message` | `ReactNode` | Mensaje actual |
| `variant` | `SnackbarVariant` | Variante actual |
| `duration` | `number` | Duracion actual |
| `anchorOrigin` | `SnackbarAnchorOrigin \| undefined` | Posicion actual |
| `action` | `ReactNode \| undefined` | Accion actual |
| `showSnackbar` | `(msg, config?) => void` | Muestra un snackbar |
| `closeSnackbar` | `() => void` | Cierra el snackbar |
| `showSuccess` | `(msg, config?) => void` | Atajo para variante success |
| `showWarning` | `(msg, config?) => void` | Atajo para variante warning |
| `showDanger` | `(msg, config?) => void` | Atajo para variante danger |
| `showInfo` | `(msg, config?) => void` | Atajo para variante info |

## API

#### Entrada de datos

El Snackbar no integra FormContext ni consume datos de formulario. Recibe toda su configuracion via props o `useSnackbar`:

| Prop | Descripcion |
|---|---|
| `open` | Estado booleano controlado externamente |
| `message` | Contenido del mensaje |
| `action` | Slot de accion (ej. boton "DESHACER") |

#### Salida de datos

| Evento | Firma | Motivos posibles |
|---|---|---|
| `onClose` | `(event: Event \| SyntheticEvent \| null, reason: SnackbarCloseReason) => void` | `'timeout'` — expiro el timer |
| | | `'clickaway'` — clic en el boton X |
| | | `'escapeKeyDown'` — tecla Escape presionada |

El `reason` permite al padre distinguir si el cierre fue iniciado por el usuario o automatico, para decidir si revertir una accion:

```tsx
onClose={(e, reason) => {
  if (reason === 'timeout') {
    api.confirmDelete(itemId); // cierre automatico = confirmar
  }
  // Si fue clickaway el usuario cerro manualmente — sin accion
  setOpen(false);
}}
```

#### Comunicacion con otros componentes

Snackbar es un componente de presentacion autonomo. No usa portales — se renderiza en su posicion en el arbol React y usa `position: fixed` para el posicionamiento en pantalla.

**Pausa en hover:**
El timer interno se pausa en `onMouseEnter` y se reanuda en `onMouseLeave`. Si `resumeHideDuration` esta definido, se usa esa duracion al reanudar en lugar del `autoHideDuration` original.

**Escape key:**
Cuando `open=true`, se registra un listener global `document.keydown` que detecta `Escape` y dispara `onClose(null, 'escapeKeyDown')`.

#### Accesibilidad

| Atributo | Valor | Descripcion |
|---|---|---|
| `role` | `"alert"` | El snackbar es leido por lectores de pantalla |
| `aria-live` | `"polite"` | No interrumpe la lectura actual |
| `aria-atomic` | `"true"` | Se lee el contenido completo |
| Boton cerrar | `aria-label="Cerrar notificacion"` | Cuando no hay `action` |

#### Patron de uso recomendado

```tsx
// Patron recomendado — useSnackbar en el componente que dispara la accion
const MyForm = () => {
  const snack = useSnackbar({ defaultDuration: 4000 });

  const handleSubmit = async (data) => {
    try {
      await api.save(data);
      snack.showSuccess('Cambios guardados');
    } catch (e) {
      snack.showDanger(`Error: ${e.message}`);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* campos */}
        <Button type="submit">Guardar</Button>
      </Form>

      <Snackbar
        open={snack.show}
        message={snack.message}
        variant={snack.variant}
        autoHideDuration={snack.duration}
        onClose={snack.closeSnackbar}
      />
    </>
  );
};
```

## Estructura de archivos

```
Snackbar/
  Snackbar.tsx            Componente principal con forwardRef
  Snackbar.types.ts       SnackbarVariant, SnackbarCloseReason, SnackbarProps, UseSnackbarReturn
  Snackbar.constants.ts   SNACKBAR_DEFAULTS, SNACKBAR_VARIANTS, SNACKBAR_POSITIONS
  Snackbar.hooks.ts       useSnackbar() con helpers por variante
  Snackbar.utils.ts       buildSnackbarClasses()
  README.md               Esta documentacion
```

CSS: `src/w3fussion/FEEDBACK/_snackbar.css`
