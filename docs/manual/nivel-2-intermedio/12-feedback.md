# Capítulo 12 — Feedback: Alert, Snackbar, Notification, Ripple

**Nivel:** Intermedio
**Tiempo estimado de lectura:** 35 minutos

---

## ¿Qué vas a aprender?

- Cuándo usar cada componente de feedback y en qué se diferencian
- `AlertProvider` + `useAlert` + `dispatchAlert` para toasts ligeros
- `Snackbar` + `useSnackbar` para mensajes breves con acción
- `NotificationProvider` + `useNotification` + `dispatchNotification` para notificaciones ricas
- `Ripple` para agregar efecto de onda a cualquier elemento interactivo

---

## Mapa de feedback — cuándo usar cada uno

| Componente | Apariencia | Cuándo usarlo |
|---|---|---|
| `Note` (cap 10) | Bloque inline en la página | Información persistente dentro del contenido |
| `Alert` (toast) | Toast pequeño en esquina, auto-desaparece | Confirmaciones rápidas: "Guardado", "Error al conectar" |
| `Snackbar` | Barra breve abajo/arriba, una a la vez | Acciones reversibles: "Elemento eliminado — Deshacer" |
| `Notification` | Card más rica con título y barra de progreso | Eventos del sistema, alertas importantes con contexto |
| `Ripple` | Efecto visual de onda al hacer clic | Botones, tarjetas, items de lista que necesiten respuesta táctil |

> **Regla práctica:** para confirmaciones simples usá `Alert`. Para mensajes con acción (Deshacer, Ver, etc.) usá `Snackbar`. Para eventos con título y detalle usá `Notification`. Para nota que el usuario debe leer y ya está en pantalla usá `Note`.

---

## Alert — toasts ligeros

`Alert` usa el patrón **Provider + hook**. El `AlertProvider` se coloca una sola vez en la raíz de la app y renderiza los toasts vía portal en `document.body`. Desde cualquier componente hijo podés disparar alertas.

### Setup: AlertProvider en la raíz

```tsx
// main.tsx / layout.tsx / App.tsx
import AlertProvider from '@w3f/components/FEEDBACK/Alert/Alert'

export default function App() {
  return (
    <AlertProvider position="top-right" maxAlerts={5}>
      {/* toda tu app acá */}
      <Router />
    </AlertProvider>
  )
}
```

### Props de AlertProvider

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Esquina donde aparecen los toasts |
| `maxAlerts` | `number` | `5` | Máximo de toasts simultáneos |

### Opción A — useAlert (dentro del Provider)

```tsx
import { useAlert } from '@w3f/components/FEEDBACK/Alert/Alert.hooks'
import Button from '@w3f/components/INPUTS/Button/Button'

function MiComponente() {
  const { addAlert } = useAlert()

  const handleGuardar = async () => {
    try {
      await guardarDatos()
      addAlert({ message: 'Cambios guardados correctamente', type: 'success' })
    } catch {
      addAlert({ message: 'Error al guardar. Intentá de nuevo.', type: 'danger' })
    }
  }

  return <Button onClick={handleGuardar}>Guardar</Button>
}
```

### Opción B — dispatchAlert (en cualquier lugar, sin contexto)

`dispatchAlert` usa un `CustomEvent` en `window` para que el `AlertProvider` lo escuche. Funciona desde interceptores de Axios, servicios, web workers, o cualquier código fuera del árbol React:

```tsx
import { dispatchAlert } from '@w3f/components/FEEDBACK/Alert/Alert.hooks'

// En un interceptor de API (fuera de React)
axios.interceptors.response.use(
  response => response,
  error => {
    dispatchAlert({
      message: `Error ${error.response?.status}: ${error.message}`,
      type: 'danger',
      duration: 8000,
    })
    return Promise.reject(error)
  }
)

// En un componente, sin necesidad de useAlert
function BotonEliminar({ id }: { id: string }) {
  const handleEliminar = async () => {
    await eliminarItem(id)
    dispatchAlert({ message: 'Elemento eliminado', type: 'success' })
  }
  return <Button color="danger" onClick={handleEliminar}>Eliminar</Button>
}
```

### Opción C — useAlertEvent (hook de dispatch)

```tsx
import { useAlertEvent } from '@w3f/components/FEEDBACK/Alert/Alert.hooks'

function Formulario() {
  const dispatch = useAlertEvent()

  const handleSubmit = () => {
    dispatch({ message: 'Formulario enviado', type: 'success', duration: 3000 })
  }

  return <Button onClick={handleSubmit}>Enviar</Button>
}
```

### Opciones de AddAlertOptions

| Opción | Tipo | Default | Descripción |
|---|---|---|---|
| `message` | `ReactNode` | — | Contenido del toast |
| `type` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tipo visual |
| `duration` | `number` | `5000` | Milisegundos hasta auto-cierre (`0` = permanente) |
| `dismissible` | `boolean` | `true` | Muestra botón × para cerrar manualmente |
| `icon` | `ReactNode` | — | Ícono personalizado |
| `shadow` | `string \| boolean` | `'md'` | Sombra del toast |
| `round` | `string \| boolean` | `'lg'` | Border radius del toast |

```tsx
// Tipos de toast
addAlert({ message: 'Datos cargados',    type: 'success', duration: 3000 })
addAlert({ message: 'Revisá tu email',   type: 'info',    duration: 6000 })
addAlert({ message: 'Sin conexión',      type: 'warning', duration: 0 })  // no se cierra solo
addAlert({ message: 'Permiso denegado',  type: 'danger',  dismissible: false })

// Con ícono personalizado
import { Download } from 'lucide-react'
addAlert({
  message: 'Descarga completada',
  type: 'success',
  icon: <Download size={16} />,
})
```

---

## Snackbar — mensaje breve con acción

`Snackbar` es un componente controlado: vos manejás `open` y `onClose`. Solo muestra un mensaje a la vez (no hace pila). El hook `useSnackbar` simplifica el manejo del estado.

### Props de Snackbar

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `open` | `boolean` | — | Muestra/oculta el snackbar |
| `message` | `ReactNode` | — | Mensaje a mostrar |
| `onClose` | `(e, reason) => void` | — | Callback de cierre |
| `autoHideDuration` | `number \| null` | `6000` | ms hasta auto-cierre; `null` = nunca |
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Color del snackbar |
| `anchorOrigin` | `{ vertical, horizontal }` | `{ vertical: 'bottom', horizontal: 'center' }` | Posición |
| `action` | `ReactNode` | — | Botón de acción al extremo derecho |

### useSnackbar

El hook devuelve el estado y helpers para cada variante:

```tsx
const {
  show,           // boolean — estado del snackbar
  message,        // ReactNode — mensaje actual
  variant,        // SnackbarVariant — variante actual
  duration,       // number — duración actual
  anchorOrigin,   // posición actual
  action,         // ReactNode — acción actual
  showSnackbar,   // (message, config?) => void
  closeSnackbar,  // () => void
  showSuccess,    // (message, config?) => void
  showWarning,    // (message, config?) => void
  showDanger,     // (message, config?) => void
  showInfo,       // (message, config?) => void
} = useSnackbar()
```

### Ejemplo básico

```tsx
import Snackbar, { useSnackbar }
  from '@w3f/components/FEEDBACK/Snackbar/Snackbar'
import Button from '@w3f/components/INPUTS/Button/Button'

function MiComponente() {
  const sb = useSnackbar()

  return (
    <>
      <Button onClick={() => sb.showSuccess('Perfil actualizado')}>
        Guardar perfil
      </Button>

      <Snackbar
        open={sb.show}
        message={sb.message}
        variant={sb.variant}
        autoHideDuration={sb.duration}
        anchorOrigin={sb.anchorOrigin}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') sb.closeSnackbar()
        }}
      />
    </>
  )
}
```

### Snackbar con acción "Deshacer"

El caso más clásico: eliminar un elemento y ofrecer revertirlo:

```tsx
function ListaItems() {
  const [items, setItems] = useState(['Item A', 'Item B', 'Item C'])
  const [eliminado, setEliminado] = useState<string | null>(null)
  const sb = useSnackbar()

  const eliminar = (item: string) => {
    setItems(prev => prev.filter(i => i !== item))
    setEliminado(item)
    sb.showSnackbar(`"${item}" eliminado`, {
      variant: 'default',
      duration: 5000,
      action: (
        <Button
          variant="flat"
          size="xs"
          style={{ color: 'var(--w3f-primary-200)' }}
          onClick={() => {
            if (eliminado) setItems(prev => [...prev, eliminado])
            sb.closeSnackbar()
          }}
        >
          Deshacer
        </Button>
      ),
    })
  }

  return (
    <>
      <Stack spacing="2">
        {items.map(item => (
          <FlexContainer key={item} justifyContent="between" alignItems="center"
            style={{ padding: 'var(--w3f-space-3)', background: 'var(--w3f-surface)',
                     borderRadius: 'var(--w3f-radius-lg)' }}>
            <span style={{ color: 'var(--w3f-on-surface)' }}>{item}</span>
            <Button variant="flat" size="xs" color="danger" onClick={() => eliminar(item)}>
              Eliminar
            </Button>
          </FlexContainer>
        ))}
      </Stack>

      <Snackbar
        open={sb.show}
        message={sb.message}
        variant={sb.variant}
        autoHideDuration={sb.duration}
        action={sb.action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') sb.closeSnackbar()
        }}
      />
    </>
  )
}
```

### Posiciones disponibles

```tsx
// Centro abajo (default)
anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}

// Esquina inferior izquierda
anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}

// Esquina superior derecha
anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

// Centro arriba
anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
```

---

## Notification — notificaciones ricas

`NotificationProvider` es la versión más completa. Cada notificación tiene `title`, `message` y una barra de progreso que muestra el tiempo restante hasta que se cierre.

### Setup: NotificationProvider en la raíz

```tsx
import { NotificationProvider }
  from '@w3f/components/FEEDBACK/Notifications/Notifications'

export default function App() {
  return (
    <AlertProvider>          {/* Alert y Notification pueden coexistir */}
      <NotificationProvider position="top-right" maxNotifications={4}>
        <Router />
      </NotificationProvider>
    </AlertProvider>
  )
}
```

### Props de NotificationProvider

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'top-right'` | Posición de las notificaciones |
| `maxNotifications` | `number` | `5` | Máximo simultáneo |

### Opción A — useNotification (dentro del Provider)

```tsx
import { useNotification }
  from '@w3f/components/FEEDBACK/Notifications/Notifications'

function PanelAcciones() {
  const { addNotification, clearAll } = useNotification()

  return (
    <Stack spacing="2">
      <Button onClick={() => addNotification({
        title: 'Backup completado',
        message: 'Se generó una copia de seguridad de 1.2 GB',
        type: 'success',
        showProgress: true,
        duration: 8000,
      })}>
        Simular backup
      </Button>

      <Button onClick={() => addNotification({
        title: 'Actualización disponible',
        message: 'La versión 2.4.1 está lista para instalar.',
        type: 'info',
        showProgress: true,
        dismissible: true,
        duration: 0,   // no se cierra solo
      })}>
        Simular actualización
      </Button>

      <Button color="danger" onClick={clearAll}>
        Limpiar todas
      </Button>
    </Stack>
  )
}
```

### Opción B — dispatchNotification (sin contexto)

```tsx
import { dispatchNotification }
  from '@w3f/components/FEEDBACK/Notifications/Notifications'

// En un WebSocket handler, service worker, etc.
websocket.onmessage = (event) => {
  const data = JSON.parse(event.data)

  dispatchNotification({
    title: 'Nuevo mensaje',
    message: `${data.sender}: ${data.preview}`,
    type: 'info',
    duration: 5000,
    showProgress: true,
  })
}
```

### AddNotificationOptions

| Opción | Tipo | Default | Descripción |
|---|---|---|---|
| `title` | `ReactNode` | — | Título en negrita (opcional) |
| `message` | `ReactNode` | — | Cuerpo de la notificación |
| `type` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tipo visual + ícono automático |
| `duration` | `number` | `5000` | ms hasta auto-cierre (`0` = permanente) |
| `dismissible` | `boolean` | `true` | Muestra botón × |
| `showProgress` | `boolean` | `false` | Barra de progreso del temporizador |
| `icon` | `ReactNode` | — | Ícono personalizado (reemplaza el automático) |

```tsx
// Sin título (solo message)
addNotification({ message: 'Procesando en segundo plano...', type: 'info' })

// Con título y progreso
addNotification({
  title: 'Deploy iniciado',
  message: 'Producción — rama main — commit a3f4d2',
  type: 'warning',
  showProgress: true,
  duration: 12000,
  dismissible: false,
})

// Permanente con ícono custom
import { Wifi } from 'lucide-react'
addNotification({
  title: 'Sin conexión',
  message: 'Verificá tu red. Los cambios se guardarán cuando vuelva la conexión.',
  type: 'danger',
  duration: 0,
  icon: <Wifi size={18} />,
})
```

### Alert vs Notification — diferencias clave

| | Alert | Notification |
|---|---|---|
| Tiene título | No | Sí (opcional) |
| Barra de progreso | No | Sí (`showProgress`) |
| Tamaño visual | Compacto (tipo Note) | Card más grande |
| `clearAll` | No | Sí |
| Ícono automático por tipo | No | Sí |
| Uso ideal | Confirmaciones rápidas | Eventos con contexto |

---

## Ripple — efecto de onda

`Ripple` envuelve a su `children` y agrega un efecto de onda al hacer clic, similar al efecto material de los botones.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `color` | `'light' \| 'dark' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'light'` | Color de la onda |
| `disabled` | `boolean` | `false` | Desactiva el efecto |
| `centered` | `boolean` | `false` | La onda siempre sale del centro (no del punto de clic) |
| `unbounded` | `boolean` | `false` | La onda se expande fuera del contenedor |
| `radius` | `number` | — | Radio máximo de la onda en px |
| `flat` | `boolean` | `false` | Sin `position: relative` extra (para contenedores que ya lo tienen) |
| `animation` | `{ enterDuration?, exitDuration? }` | — | Duración de la animación |
| `onClick` | `MouseEventHandler` | — | Handler de click |

### Ejemplos

```tsx
import Ripple from '@w3f/components/FEEDBACK/Ripples/Ripple'

// Botón personalizado con ripple
<Ripple color="primary" onClick={() => console.log('click')}>
  <div style={{
    padding: 'var(--w3f-space-3) var(--w3f-space-6)',
    background: 'var(--w3f-primary)',
    color: 'white',
    borderRadius: 'var(--w3f-radius-lg)',
    cursor: 'pointer',
    userSelect: 'none',
  }}>
    Clic aquí
  </div>
</Ripple>

// Item de lista con ripple
<Ripple color="dark">
  <div style={{
    padding: 'var(--w3f-space-3) var(--w3f-space-4)',
    cursor: 'pointer',
    borderRadius: 'var(--w3f-radius-md)',
    color: 'var(--w3f-on-surface)',
  }}>
    Elemento de lista
  </div>
</Ripple>

// Ripple claro (para fondos oscuros)
<Ripple color="light">
  <div style={{
    padding: 'var(--w3f-space-4)',
    background: 'var(--w3f-primary)',
    borderRadius: 'var(--w3f-radius-lg)',
    cursor: 'pointer',
    color: 'white',
  }}>
    Tarjeta oscura clickeable
  </div>
</Ripple>

// Centrado (efecto pulsante, no sigue el cursor)
<Ripple color="primary" centered>
  <div style={{ width: 48, height: 48, borderRadius: '50%',
                background: 'var(--w3f-surface-variant)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
    🔔
  </div>
</Ripple>

// Desactivado
<Ripple color="primary" disabled>
  <div style={{ opacity: 0.5, cursor: 'not-allowed', padding: 'var(--w3f-space-3)' }}>
    Elemento bloqueado
  </div>
</Ripple>
```

### Lista de menú con ripple

```tsx
const ITEMS_MENU = [
  { label: 'Dashboard',     icon: '📊' },
  { label: 'Proyectos',     icon: '📁' },
  { label: 'Equipo',        icon: '👥' },
  { label: 'Configuración', icon: '⚙️' },
]

<Stack spacing="1">
  {ITEMS_MENU.map(item => (
    <Ripple key={item.label} color="dark">
      <FlexContainer
        gap="var(--w3f-space-3)"
        alignItems="center"
        style={{
          padding: 'var(--w3f-space-3) var(--w3f-space-4)',
          borderRadius: 'var(--w3f-radius-lg)',
          cursor: 'pointer',
          color: 'var(--w3f-on-surface)',
        }}
      >
        <span>{item.icon}</span>
        <span style={{ fontSize: 'var(--w3f-text-base)' }}>{item.label}</span>
      </FlexContainer>
    </Ripple>
  ))}
</Stack>
```

---

## Ejemplo combinado — sistema de feedback completo

Una app que usa los cuatro mecanismos de feedback según el contexto:

```tsx
import AlertProvider from '@w3f/components/FEEDBACK/Alert/Alert'
import { useAlert } from '@w3f/components/FEEDBACK/Alert/Alert.hooks'
import Snackbar, { useSnackbar } from '@w3f/components/FEEDBACK/Snackbar/Snackbar'
import { NotificationProvider, useNotification }
  from '@w3f/components/FEEDBACK/Notifications/Notifications'
import Ripple from '@w3f/components/FEEDBACK/Ripples/Ripple'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import Button from '@w3f/components/INPUTS/Button/Button'
import Grid   from '@w3f/components/LAYOUT/Grid/Grid'
import Card   from '@w3f/components/DATADISPLAY/Card/Card'

// Componente de demo que usa los tres sistemas
function FeedbackDemo() {
  const { addAlert }          = useAlert()
  const { addNotification }   = useNotification()
  const sb                    = useSnackbar()

  return (
    <Stack spacing="6">

      <h2 className="w3f-font-semibold"
          style={{ fontSize: 'var(--w3f-text-xl)', color: 'var(--w3f-on-background)', margin: 0 }}>
        Sistema de feedback
      </h2>

      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap="var(--w3f-space-4)">

        {/* Alerts — confirmaciones rápidas */}
        <Card title="Alerts" subtitle="Toasts ligeros" variant="outlined"
          customContent={
            <Stack spacing="2" style={{ padding: 'var(--w3f-space-4)' }}>
              {([
                { label: 'Éxito', type: 'success', msg: 'Operación completada' },
                { label: 'Info',  type: 'info',    msg: 'Sincronización en curso' },
                { label: 'Aviso', type: 'warning', msg: 'Espacio casi lleno' },
                { label: 'Error', type: 'danger',  msg: 'Sin permisos' },
              ] as const).map(({ label, type, msg }) => (
                <Button key={label} variant="outline" size="sm" color={type === 'danger' ? 'danger' : 'primary'}
                  onClick={() => addAlert({ message: msg, type, duration: 3000 })}>
                  {label}
                </Button>
              ))}
            </Stack>
          }
        />

        {/* Snackbar — con acción */}
        <Card title="Snackbar" subtitle="Con acción reversible" variant="outlined"
          customContent={
            <Stack spacing="2" style={{ padding: 'var(--w3f-space-4)' }}>
              <Button variant="outline" size="sm"
                onClick={() => sb.showSuccess('Archivo guardado en la nube')}>
                Guardar archivo
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => sb.showSnackbar('Mensaje archivado', {
                  variant: 'default',
                  duration: 5000,
                  action: (
                    <Button variant="flat" size="xs"
                      style={{ color: 'white' }}
                      onClick={sb.closeSnackbar}>
                      Deshacer
                    </Button>
                  ),
                })}>
                Archivar mensaje
              </Button>
              <Button variant="outline" size="sm" color="danger"
                onClick={() => sb.showDanger('Acción no permitida')}>
                Acción bloqueada
              </Button>
            </Stack>
          }
        />

        {/* Notifications — con título y progreso */}
        <Card title="Notifications" subtitle="Cards enriquecidas" variant="outlined"
          customContent={
            <Stack spacing="2" style={{ padding: 'var(--w3f-space-4)' }}>
              <Button variant="outline" size="sm"
                onClick={() => addNotification({
                  title: 'Deploy completado',
                  message: 'Producción actualizada — v2.4.1',
                  type: 'success', showProgress: true, duration: 8000,
                })}>
                Deploy exitoso
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => addNotification({
                  title: 'Nueva actualización',
                  message: 'Versión 2.5.0 disponible. Incluye mejoras de rendimiento.',
                  type: 'info', showProgress: true, duration: 0, dismissible: true,
                })}>
                Actualización
              </Button>
            </Stack>
          }
        />

        {/* Ripple — efecto visual */}
        <Card title="Ripple" subtitle="Efecto en elementos" variant="outlined"
          customContent={
            <Stack spacing="2" style={{ padding: 'var(--w3f-space-4)' }}>
              {['primary', 'dark', 'light'].map(color => (
                <Ripple key={color} color={color as any}>
                  <div style={{
                    padding: 'var(--w3f-space-3)',
                    background: color === 'light'
                      ? 'var(--w3f-primary)'
                      : 'var(--w3f-surface-variant)',
                    borderRadius: 'var(--w3f-radius-lg)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    color: color === 'light' ? 'white' : 'var(--w3f-on-surface)',
                    fontSize: 'var(--w3f-text-sm)',
                  }}>
                    Ripple {color}
                  </div>
                </Ripple>
              ))}
            </Stack>
          }
        />

      </Grid>

      {/* Snackbar controlado por useSnackbar */}
      <Snackbar
        open={sb.show}
        message={sb.message}
        variant={sb.variant}
        autoHideDuration={sb.duration}
        action={sb.action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') sb.closeSnackbar()
        }}
      />
    </Stack>
  )
}

// Root con providers
export default function App() {
  return (
    <AlertProvider position="top-right">
      <NotificationProvider position="bottom-right" maxNotifications={3}>
        <div style={{ padding: 'var(--w3f-space-6)', background: 'var(--w3f-background)', minHeight: '100vh' }}>
          <FeedbackDemo />
        </div>
      </NotificationProvider>
    </AlertProvider>
  )
}
```

---

## Ejercicio práctico

Construí un **formulario de contacto** que use los tres sistemas de feedback:

1. Al hacer submit con campos vacíos: `addAlert` con `type: 'warning'` — "Completá todos los campos"
2. Al hacer submit exitoso: `showSuccess` del snackbar — "Mensaje enviado correctamente"
3. Al hacer submit (simular demora de 2 segundos): `addNotification` con `title: 'Procesando'`, `showProgress: true`, `duration: 2000`
4. Los botones de envío y cancelar usan `Ripple color="primary"` y `Ripple color="dark"` respectivamente

---

## Referencia rápida

### Cuándo usar qué

```
Acción completada sin fricción     → addAlert (success, 3000ms)
Error del servidor                 → addAlert (danger, 0) o dispatchAlert desde interceptor
Elemento eliminado con Deshacer    → showSnackbar + action button
Evento del sistema con detalle     → addNotification (title + showProgress)
Elemento interactivo custom        → <Ripple>
```

### Setup mínimo para Alert + Notification

```tsx
// main.tsx
<AlertProvider position="top-right">
  <NotificationProvider position="top-right" maxNotifications={3}>
    <App />
  </NotificationProvider>
</AlertProvider>
```

### useSnackbar — helpers por variante

```tsx
const sb = useSnackbar()

sb.showSnackbar('mensaje')           // default
sb.showSuccess('Guardado')           // verde
sb.showWarning('Atención')           // ámbar
sb.showDanger('Error')              // rojo
sb.showInfo('Cargando...')           // cyan

// Con config opcional
sb.showSuccess('Ok', { duration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'right' } })
```

### dispatchAlert / dispatchNotification — desde cualquier lugar

```tsx
// Sin necesidad de contexto ni hooks
import { dispatchAlert }        from '@w3f/components/FEEDBACK/Alert/Alert.hooks'
import { dispatchNotification } from '@w3f/components/FEEDBACK/Notifications/Notifications'

dispatchAlert({ message: 'Error 500', type: 'danger' })
dispatchNotification({ title: 'Sin red', message: 'Reconectando...', type: 'warning', duration: 0 })
```

---

## En Next.js

Este capítulo tiene la fricción más importante con Next.js App Router: los **providers de contexto** (`AlertProvider`, `SnackbarProvider`, `NotificationProvider`) deben vivir en Client Components, pero en App Router el `layout.tsx` es Server Component por defecto.

**La solución**: crear un archivo `providers.tsx` que agrupe todos los providers y montarlo desde el layout:

```tsx
// app/components/providers.tsx — Client Component
'use client'

import { AlertProvider }        from '@w3f/components/FEEDBACK/Alert/Alert'
import { SnackbarProvider }     from '@w3f/components/FEEDBACK/Snackbar/Snackbar'
import { NotificationProvider } from '@w3f/components/FEEDBACK/Notifications/Notifications'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider position="top-right" maxNotifications={5}>
      <AlertProvider position="top-center" maxAlerts={3}>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </AlertProvider>
    </NotificationProvider>
  )
}
```

```tsx
// app/layout.tsx — Server Component
import { Providers } from './components/providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

Una vez montado así, podés usar `dispatchAlert`, `dispatchNotification` y `useSnackbar` desde **cualquier Client Component de la app** sin importar dónde estén en el árbol de rutas.

**`dispatchAlert` / `dispatchNotification`** usan CustomEvents — funcionan desde cualquier Client Component, incluyendo callbacks de Server Actions invocados desde el cliente:

```tsx
'use client'

import { dispatchAlert } from '@w3f/components/FEEDBACK/Alert/Alert.hooks'

async function handleSubmit() {
  const res = await fetch('/api/guardar', { method: 'POST' })
  if (!res.ok) {
    dispatchAlert({ message: 'Error al guardar', type: 'danger' })
  } else {
    dispatchAlert({ message: 'Guardado correctamente', type: 'success' })
  }
}
```

---

## Siguiente paso

[Capítulo 13 — Formularios: Form y LiveForm](13-formularios.md)

Vas a aprender el sistema de formularios de W3F: `Form` para datos simples con validación integrada y `LiveForm` para formularios reactivos con actualizaciones en tiempo real.
