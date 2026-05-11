# Note

Componente de alerta contextual para mensajes de retroalimentacion con niveles de severidad (info, success, warning, danger). Soporta icono personalizado, boton de cierre, posicion de borde, esquinas redondeadas, sombra y temas via CSS custom properties.

## Importacion

```tsx
import Note from '@/components/DATADISPLAY/Note/Note';
```

## Uso basico

```tsx
<Note type="info">
  <p>Este es un mensaje informativo.</p>
</Note>

<Note type="success">
  <p>Operacion completada correctamente.</p>
</Note>

<Note type="warning">
  <p>Advertencia: los cambios no se han guardado.</p>
</Note>

<Note type="danger">
  <p>Error: no se pudo conectar al servidor.</p>
</Note>
```

## Con icono

```tsx
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

<Note type="info" icon={<Info size={20} />}>
  <p>Hay una nueva version disponible.</p>
</Note>

<Note type="success" icon={<CheckCircle size={20} />}>
  <p>Pago procesado exitosamente.</p>
</Note>
```

## Con titulo y descripcion

```tsx
<Note type="info" icon={<Info size={20} />}>
  <h6 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Mantenimiento programado</h6>
  <p>El sistema estara en mantenimiento el sabado de 2:00 a 6:00 UTC.</p>
</Note>
```

## Dismissible (cerrable)

```tsx
<Note type="warning" icon={<AlertTriangle size={20} />} dismissible>
  <p>Esta alerta puede cerrarse una vez leida.</p>
</Note>

{/* Con callback al cerrar */}
<Note
  type="danger"
  dismissible
  onDismiss={() => console.log('nota cerrada')}
>
  <p>Error que el usuario puede descartar.</p>
</Note>
```

## Variantes de borde

```tsx
{/* Borde izquierdo (default) */}
<Note type="info" border="left"><p>Borde izquierdo</p></Note>

{/* Otros lados */}
<Note type="success" border="top"><p>Borde superior</p></Note>
<Note type="warning" border="right"><p>Borde derecho</p></Note>
<Note type="danger"  border="bottom"><p>Borde inferior</p></Note>

{/* Multiples bordes */}
<Note type="info" border={['left', 'top']}><p>Borde izquierdo y superior</p></Note>

{/* Borde completo */}
<Note type="info" fullBorder round="lg"><p>Borde completo con esquinas redondeadas</p></Note>
```

## Redondeado y sombra

```tsx
<Note type="info" round="xl" shadow="md" icon={<Info size={20} />}>
  <p>Esquinas XL con sombra media.</p>
</Note>

<Note type="success" round="lg" shadow="lg" icon={<CheckCircle size={20} />}>
  <p>Esquinas grandes con sombra grande.</p>
</Note>
```

## CSS Custom Properties

```css
/* Tema docs-callout con borde grueso */
.mi-nota-callout .w3f-note {
  --w3f-note-radius: 0;
  --w3f-note-border-width: 6px;
  --w3f-note-padding: 16px 20px;
}

.mi-nota-callout .w3f-note-info {
  --w3f-note-info-bg: #eff6ff;
  --w3f-note-info-border: #3b82f6;
  --w3f-note-info-color: #1e3a5f;
}

/* Tema card sin borde */
.mi-nota-card.w3f-note {
  --w3f-note-radius: 16px;
  --w3f-note-border-width: 0;
  --w3f-note-padding: 20px 24px;
  border-width: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-note-margin` | `var(--w3f-space-4)` | Margen inferior de la nota |
| `--w3f-note-padding` | `var(--w3f-space-4)` | Padding interno |
| `--w3f-note-radius` | `0` | Border radius |
| `--w3f-note-shadow` | `none` | Box shadow |
| `--w3f-note-font-size` | `inherit` | Tamano de fuente |
| `--w3f-note-line-height` | `inherit` | Interlineado |
| `--w3f-note-border-width` | `var(--w3f-space-4)` | Ancho del borde lateral |
| `--w3f-note-icon-margin` | `var(--w3f-space-4)` | Margen derecho del icono |
| `--w3f-note-icon-color` | `inherit` | Color del icono |
| `--w3f-note-icon-size` | `inherit` | Tamano del icono |
| `--w3f-note-text-font-size` | `inherit` | Fuente del texto |
| `--w3f-note-text-line-height` | `inherit` | Interlineado del texto |
| `--w3f-note-dismiss-margin` | `var(--w3f-space-4)` | Margen izquierdo del boton de cierre |
| `--w3f-note-dismiss-padding` | `var(--w3f-space-1)` | Padding del boton de cierre |
| `--w3f-note-dismiss-opacity` | `0.7` | Opacidad del boton de cierre |
| `--w3f-note-dismiss-hover-opacity` | `1` | Opacidad en hover |
| `--w3f-note-dismiss-size` | `var(--w3f-text-lg)` | Tamano del icono de cierre |
| `--w3f-note-dismiss-color` | `inherit` | Color del boton de cierre |
| `--w3f-note-info-bg` | `var(--w3f-primary-100)` | Fondo tipo info |
| `--w3f-note-info-border` | `var(--w3f-primary-700)` | Color de borde tipo info |
| `--w3f-note-info-color` | `var(--w3f-primary-900)` | Texto tipo info |
| `--w3f-note-success-bg` | `var(--w3f-success-100)` | Fondo tipo success |
| `--w3f-note-success-border` | `var(--w3f-success-700)` | Color de borde tipo success |
| `--w3f-note-success-color` | `var(--w3f-success-900)` | Texto tipo success |
| `--w3f-note-warning-bg` | `var(--w3f-warning-100)` | Fondo tipo warning |
| `--w3f-note-warning-border` | `var(--w3f-warning-700)` | Color de borde tipo warning |
| `--w3f-note-warning-color` | `var(--w3f-warning-900)` | Texto tipo warning |
| `--w3f-note-danger-bg` | `var(--w3f-danger-100)` | Fondo tipo danger |
| `--w3f-note-danger-border` | `var(--w3f-danger-700)` | Color de borde tipo danger |
| `--w3f-note-danger-color` | `var(--w3f-danger-900)` | Texto tipo danger |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido de la nota (obligatorio) |
| `type` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Nivel de severidad |
| `round` | `boolean \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `true` | Radio de esquinas. `true` = `w3f-round-md` |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `false` | Sombra. `true` = `w3f-shadow-md` |
| `border` | `'left' \| 'right' \| 'top' \| 'bottom' \| (sides)[]` | `'left'` | Posicion del borde de acento. Acepta array para multiples lados |
| `fullBorder` | `boolean` | `false` | Borde completo en los cuatro lados (anula `border`) |
| `dismissible` | `boolean` | — | Muestra boton de cierre |
| `onDismiss` | `() => void` | — | Callback cuando el usuario cierra la nota |
| `icon` | `ReactNode` | — | Icono a mostrar a la izquierda del texto |
| `className` | `string` | — | Clases CSS adicionales |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | — | Otros atributos HTML pasados al elemento raiz |

## API

### Entrada de datos

| Via | Prop | Descripcion |
|---|---|---|
| Contenido | `children` | Todo el cuerpo de la nota. Puede ser texto, elementos HTML o componentes React |
| Severidad | `type` | Define la clase de color (`w3f-note-info`, `w3f-note-success`, etc.) y el esquema de colores CSS |
| Icono | `icon` | ReactNode renderizado en `.w3f-note-icon` a la izquierda del contenido |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onDismiss` | `() => void` | El usuario pulsa el boton de cierre cuando `dismissible` es `true` |

**Flujo de dismiss:**
1. El usuario hace clic en el boton `✕`
2. El hook `useNoteDismiss` llama `setIsVisible(false)` — la nota desaparece del DOM (retorna `null`)
3. Se invoca `onDismiss()` si esta definido

El estado de visibilidad es gestionado internamente por el hook `useNoteDismiss`. Una vez cerrada la nota no se puede reabrir sin remontar el componente.

### Comunicacion con otros componentes

#### Con Button (composicion interna)

Cuando `dismissible` es `true`, el Note renderiza un `<Button variant="icon" size="sm">` como boton de cierre. No hay Context compartido; es pura composicion de renderizado.

#### Independiente (sin contexto requerido)

Note no consume ningun Context ni requiere ninguna Provider. Opera de forma completamente autonoma.

### Accesibilidad

| Atributo | Valor | Descripcion |
|---|---|---|
| `role` | `"alert"` | Siempre presente en el elemento raiz `.w3f-note`. Los lectores de pantalla anuncian el contenido automaticamente |
| `aria-label` | `"Cerrar"` | En el boton de cierre cuando `dismissible` es `true` |

La presencia de `role="alert"` significa que cuando el Note aparece o su contenido cambia, los lectores de pantalla lo anuncian en modo live region. Usar con cuidado en notas que aparecen dinamicamente para no saturar al usuario.

### Patron de uso recomendado

```tsx
// 1. Alerta de sistema simple
<Note type="info">
  <p>Su cuenta esta pendiente de verificacion.</p>
</Note>

// 2. Alerta contextual con titulo y boton de cierre
<Note type="warning" icon={<AlertTriangle size={20} />} dismissible onDismiss={() => hideWarning()}>
  <strong>Sesion proxima a expirar</strong>
  <p>Su sesion expirara en 5 minutos. Guarde su trabajo.</p>
</Note>

// 3. Callout de documentacion (borde grueso)
<div className="docs-callout">
  <Note type="info" icon={<Info size={20} />}>
    <strong>Nota</strong>
    <p>Esta funcion requiere permisos de administrador.</p>
  </Note>
</div>

// 4. Feedback de formulario
function FormFeedback({ error, success }: { error?: string; success?: string }) {
  if (error)   return <Note type="danger">{error}</Note>;
  if (success) return <Note type="success">{success}</Note>;
  return null;
}
```

## Estructura de archivos

```
Note/
  Note.tsx            Componente principal
  Note.types.ts       Interfaces TypeScript (NoteProps, NoteType, NoteRound, NoteShadow, NoteBorderSide)
  Note.hooks.ts       useNoteDismiss (logica de visibilidad)
  Note.utils.ts       buildNoteClasses()
  README.md           Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_notes.css`
