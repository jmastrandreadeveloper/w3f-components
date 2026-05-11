# Notification

Sistema de notificaciones rich tipo toast. Renderiza tarjetas con icono, titulo opcional, barra de progreso animada y pausa al hacer hover. Soporta Context API (`useNotification`) y CustomEvent (`dispatchNotification`) para disparar notificaciones desde cualquier parte de la app.

## Importacion

```tsx
import NotificationProvider from '@/components/FEEDBACK/Notifications/Notifications';
import { useNotification, dispatchNotification } from '@/components/FEEDBACK/Notifications/Notifications.hooks';
```

## Uso basico

### Con Context API

```tsx
// 1. Envuelve tu app
<NotificationProvider position="top-right" maxNotifications={5}>
  <App />
</NotificationProvider>

// 2. Dentro del arbol, usa el hook
const { addNotification, removeNotification, clearAll } = useNotification();

addNotification({
  title: 'Guardado',
  message: 'Los cambios se guardaron correctamente',
  type: 'success',
});
```

### Con CustomEvent (sin Provider en el arbol de llamada)

```tsx
import { dispatchNotification } from '@/components/FEEDBACK/Notifications/Notifications.hooks';

dispatchNotification({
  title: 'Error de red',
  message: 'No se pudo conectar al servidor',
  type: 'danger',
  showProgress: true,
});
```

## Tipos

```tsx
addNotification({ title: 'Info', message: 'Mensaje informativo', type: 'info' });
addNotification({ title: 'Exito', message: 'Operacion completada', type: 'success' });
addNotification({ title: 'Aviso', message: 'El disco esta lleno al 90%', type: 'warning' });
addNotification({ title: 'Error', message: 'Fallo al procesar', type: 'danger' });
```

## Sin titulo

```tsx
addNotification({ message: 'Archivo subido', type: 'success' });
```

## Barra de progreso y pausa

La barra de progreso muestra visualmente el tiempo restante. Hovear sobre la notificacion pausa el contador:

```tsx
addNotification({
  title: 'Descargando',
  message: 'Hover sobre esta notificacion para pausar',
  type: 'info',
  duration: 10000,
  showProgress: true,
});
```

## Persistente

`duration: 0` mantiene la notificacion hasta que el usuario la cierre manualmente:

```tsx
addNotification({ title: 'Accion requerida', message: 'Confirma tu email', type: 'warning', duration: 0 });
```

## Limpiar todas

```tsx
const { clearAll } = useNotification();
<Button onClick={clearAll}>Limpiar todo</Button>
```

## Posiciones

```tsx
<NotificationProvider position="top-right" />      {/* default */}
<NotificationProvider position="top-left" />
<NotificationProvider position="top-center" />
<NotificationProvider position="bottom-right" />
<NotificationProvider position="bottom-left" />
<NotificationProvider position="bottom-center" />
```

## CSS Custom Properties

```css
.mi-seccion {
  /* Contenedor del stack */
  --w3f-notif-z: 1200;
  --w3f-notif-max-width: 420px;
  --w3f-notif-gap: 0.75rem;
  --w3f-notif-offset: 1.25rem;

  /* Tarjeta individual */
  --w3f-notif-bg: rgba(255, 255, 255, 0.95);
  --w3f-notif-radius: 0.75rem;
  --w3f-notif-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  --w3f-notif-blur: 12px;
  --w3f-notif-border: 1px solid #e5e7eb;
  --w3f-notif-padding: 1rem;
  --w3f-notif-icon-size: 36px;
  --w3f-notif-progress-height: 3px;
  --w3f-notif-title-color: #111827;
  --w3f-notif-message-color: #4b5563;
  --w3f-notif-close-color: #9ca3af;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-notif-z` | `1200` | z-index del contenedor |
| `--w3f-notif-max-width` | `420px` | Ancho maximo del stack |
| `--w3f-notif-gap` | `space-3` | Separacion entre notificaciones |
| `--w3f-notif-offset` | `space-5` | Distancia al borde de la pantalla |
| `--w3f-notif-bg` | `rgba(255,255,255,0.95)` | Fondo de la tarjeta |
| `--w3f-notif-radius` | `radius-lg` | Border radius de la tarjeta |
| `--w3f-notif-shadow` | `shadow-lg` | Sombra de la tarjeta |
| `--w3f-notif-blur` | `12px` | Desenfoque del fondo |
| `--w3f-notif-border` | `1px solid gray-200` | Borde de la tarjeta |
| `--w3f-notif-padding` | `space-4` | Padding interno |
| `--w3f-notif-icon-size` | `36px` | Tamano del area de icono |
| `--w3f-notif-progress-height` | `3px` | Alto de la barra de progreso |
| `--w3f-notif-title-color` | `gray-900` | Color del titulo |
| `--w3f-notif-message-color` | `gray-600` | Color del mensaje |
| `--w3f-notif-close-color` | `gray-400` | Color del boton de cierre |

## Props de NotificationProvider

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Arbol de componentes |
| `position` | `NotificationPosition` | `'top-right'` | Posicion del stack |
| `maxNotifications` | `number` | `5` | Maximo de notificaciones visibles a la vez |

## Opciones de addNotification / dispatchNotification

| Opcion | Tipo | Default | Descripcion |
|---|---|---|---|
| `title` | `ReactNode` | — | Titulo de la notificacion (opcional) |
| `message` | `ReactNode` | — | Cuerpo del mensaje. Requerido |
| `type` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tipo visual |
| `duration` | `number` | `5000` | Ms hasta auto-cerrar. `0` = persistente |
| `dismissible` | `boolean` | `true` | Muestra boton de cierre manual |
| `icon` | `ReactNode` | — | Icono custom. Reemplaza el SVG por defecto del tipo |
| `showProgress` | `boolean` | `true` | Muestra barra de progreso animada |

## API

#### Entrada de datos

Las notificaciones no reciben datos de entrada del DOM. Los mensajes se inyectan mediante:

| Mecanismo | Funcion | Requiere Provider |
|---|---|---|
| Context API | `addNotification(options)` via `useNotification()` | Si |
| CustomEvent | `dispatchNotification(options)` | No |

`addNotification` retorna el `id: number` de la notificacion creada, utilizable con `removeNotification(id)`.

#### Salida de datos

El sistema no genera eventos de salida al padre. Las notificaciones se eliminan silenciosamente.

| Funcion | Firma | Descripcion |
|---|---|---|
| `addNotification` | `(options) => number` | Crea una notificacion, devuelve su id |
| `removeNotification` | `(id: number) => void` | Elimina una notificacion por id |
| `clearAll` | `() => void` | Elimina todas las notificaciones activas |
| `notifications` | `NotificationItem[]` | Lista reactiva de notificaciones activas |

#### Comunicacion con otros componentes

Notification es un sistema independiente que no se comunica con Form ni ningun otro componente.

**Flujo CustomEvent:**

```
dispatchNotification({ title, message, type, ... })
  → window.dispatchEvent('notification:show', detail)
  → NotificationProvider listener
  → addNotification(detail)
  → setNotifications(prev + nueva)
  → NotificationCard renderizada en portal
```

El evento es `'notification:show'` (constante `SHOW_NOTIFICATION_EVENT`).

**Pausa en hover:**
`NotificationCard` gestiona su propio timer interno. Al hacer `onMouseEnter` guarda el tiempo restante y pausa el countdown. Al hacer `onMouseLeave` reinicia el timer con el tiempo guardado.

#### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `role` | `"alert"` | En cada `NotificationCard` |
| `aria-live` | `"polite"` | Anuncia la notificacion al lector de pantalla |
| `aria-atomic` | `"true"` | El contenido se lee completo |
| Boton cerrar | `aria-label="Cerrar notificacion"` | Boton X de la tarjeta |

#### Patron de uso recomendado

```tsx
// 1. Layout global — una sola vez
<NotificationProvider position="top-right">
  <App />
</NotificationProvider>

// 2. Dentro de componentes — hook
const { addNotification } = useNotification();

const handleSubmit = async (data) => {
  try {
    await api.save(data);
    addNotification({ title: 'Guardado', message: 'Datos sincronizados', type: 'success', showProgress: true });
  } catch (e) {
    addNotification({ title: 'Error', message: e.message, type: 'danger', duration: 0 });
  }
};

// 3. Servicios / stores — sin contexto
dispatchNotification({ title: 'Sesion expirada', message: 'Por favor inicia sesion nuevamente', type: 'warning' });
```

## Estructura de archivos

```
Notifications/
  Notifications.tsx             NotificationProvider + NotificationCard + NotificationContext
  Notifications.types.ts        NotificationType, NotificationPosition, NotificationItem, etc.
  Notifications.constants.ts    NOTIFICATION_DEFAULTS, NOTIFICATION_ICONS, SHOW_NOTIFICATION_EVENT
  Notifications.hooks.ts        useNotification(), dispatchNotification(), useNotificationEvent()
  Notifications.utils.ts        buildNotificationContainerClasses(), buildNotificationClasses()
  README.md                     Esta documentacion
```

CSS: `src/w3fussion/FEEDBACK/_notification.css`
