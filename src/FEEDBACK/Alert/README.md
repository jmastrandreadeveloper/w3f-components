# Alert

Sistema de alertas tipo toast. Renderiza mensajes flotantes mediante un portal en `document.body`. Soporta dos canales de disparo independientes: Context API (`useAlert`) y CustomEvent (`dispatchAlert`) sin requerir un Provider.

## Importacion

```tsx
import AlertProvider from '@/components/FEEDBACK/Alert/Alert';
import { useAlert, dispatchAlert } from '@/components/FEEDBACK/Alert/Alert.hooks';
```

## Uso basico

### Con Context API

```tsx
// 1. Envuelve tu app (o la seccion que necesite alertas)
<AlertProvider position="top-right" maxAlerts={5}>
  <App />
</AlertProvider>

// 2. Dentro del arbol, usa el hook
const { addAlert } = useAlert();

addAlert({ message: 'Operacion exitosa', type: 'success' });
```

### Con CustomEvent (sin Provider en el arbol de llamada)

```tsx
import { dispatchAlert } from '@/components/FEEDBACK/Alert/Alert.hooks';

// Llama desde cualquier lugar — servicios, interceptors, etc.
dispatchAlert({ message: 'Error al conectar', type: 'danger', duration: 8000 });
```

## Tipos de alerta

```tsx
addAlert({ message: 'Informacion general', type: 'info' });
addAlert({ message: 'Guardado correctamente', type: 'success' });
addAlert({ message: 'Revisa el formulario', type: 'warning' });
addAlert({ message: 'Error inesperado', type: 'danger' });
```

## Duracion

La duracion se expresa en milisegundos. `duration: 0` hace la alerta persistente (solo se cierra al hacer clic en la X):

```tsx
addAlert({ message: 'Rapido', type: 'info', duration: 2000 });
addAlert({ message: 'Persistente', type: 'danger', duration: 0, dismissible: true });
```

## Posicion del contenedor

Seis posiciones disponibles controladas por `AlertProvider`:

```tsx
<AlertProvider position="top-right" />     {/* default */}
<AlertProvider position="top-left" />
<AlertProvider position="top-center" />
<AlertProvider position="bottom-right" />
<AlertProvider position="bottom-left" />
<AlertProvider position="bottom-center" />
```

## Estilos opcionales

Las alertas usan el componente `Note` internamente. Puedes pasar `round`, `shadow` y `border`:

```tsx
addAlert({ message: 'Con bordes y sombra', type: 'success', round: true, shadow: true, border: true });
```

## CSS Custom Properties

Aplica overrides en el contenedor padre para personalizar el posicionamiento y tamano del stack:

```css
.mi-seccion {
  --w3f-alert-max-width: 360px;
  --w3f-alert-gap: 0.5rem;
  --w3f-alert-offset: 1.5rem;
  --w3f-alert-z: 9999;
  --w3f-alert-animation-duration: 200ms;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-alert-z` | `1100` | z-index del contenedor de alertas |
| `--w3f-alert-max-width` | `400px` | Ancho maximo de cada alerta |
| `--w3f-alert-gap` | `space-3` | Separacion entre alertas apiladas |
| `--w3f-alert-offset` | `space-5` | Distancia al borde de la pantalla |
| `--w3f-alert-animation-duration` | `transition-normal` | Duracion de la animacion de entrada |

## Props de AlertProvider

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Arbol de componentes que tendra acceso al contexto |
| `position` | `AlertPosition` | `'top-right'` | Posicion del stack de alertas |
| `maxAlerts` | `number` | `5` | Maximo de alertas visibles simultaneamente |

## Opciones de addAlert / dispatchAlert

| Opcion | Tipo | Default | Descripcion |
|---|---|---|---|
| `message` | `ReactNode` | — | Contenido de la alerta (texto o JSX) |
| `type` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Tipo de severidad |
| `duration` | `number` | `5000` | Milisegundos hasta auto-cerrar. `0` = persistente |
| `dismissible` | `boolean` | `true` | Muestra boton de cierre manual |
| `icon` | `ReactNode` | — | Icono custom que reemplaza el icono del tipo |
| `round` | `string \| boolean` | `'lg'` | Border radius de la alerta |
| `shadow` | `string \| boolean` | `'md'` | Sombra de la alerta |
| `border` | `string \| string[] \| boolean` | `false` | Borde de la alerta |

## API

#### Entrada de datos

El sistema de alertas no recibe datos de entrada directamente. Los mensajes se inyectan mediante dos mecanismos de disparo:

| Mecanismo | Funcion | Requiere contexto |
|---|---|---|
| Context API | `addAlert(options)` de `useAlert()` | Si — debe estar dentro de `AlertProvider` |
| CustomEvent | `dispatchAlert(options)` | No — funciona desde cualquier lugar de la app |

`addAlert` retorna el `id: number` de la alerta creada, utilizable para llamar a `removeAlert(id)` antes de que expire.

#### Salida de datos

El sistema no genera eventos de salida hacia el padre. Las alertas se descartan silenciosamente al expirar o al hacer clic en la X. Para reaccionar al cierre, usa `removeAlert` del contexto como callback tras la eliminacion.

| Funcion | Firma | Descripcion |
|---|---|---|
| `addAlert` | `(options: AddAlertOptions) => number` | Crea una alerta y devuelve su id |
| `removeAlert` | `(id: number) => void` | Elimina una alerta por id antes de su expiracion |
| `alerts` | `AlertItem[]` | Lista reactiva de alertas activas (lectura) |

#### Comunicacion con otros componentes

Alert no se comunica con Form ni con ningun otro componente del framework. Es un sistema independiente.

**Patron Context vs CustomEvent:**

```
Opcion A — dentro del Provider:
  useAlert().addAlert({ ... })
  → AlertContext.addAlert → setAlerts(prev + newAlert)
  → AlertProvider re-renderiza el portal

Opcion B — fuera del Provider (servicios, interceptors, callbacks async):
  dispatchAlert({ ... })
  → window.dispatchEvent('alert:show')
  → AlertProvider listener → addAlert(detail)
  → mismo flujo que Opcion A
```

El evento CustomEvent es `'alert:show'` (constante `SHOW_ALERT_EVENT`). El `AlertProvider` lo escucha via `window.addEventListener` y delega a su `addAlert` interno.

#### Accesibilidad

Cada alerta renderiza un componente `Note` con sus propios atributos de accesibilidad (`role="note"` o equivalente segun el tipo). El contenedor del stack es un `<div>` posicionado fuera del flujo con `role` implicito de presentacion.

| Atributo | Valor | Descripcion |
|---|---|---|
| `role` | heredado de Note | Cada alerta usa el role del componente Note subyacente |
| Boton dismiss | `aria-label="Cerrar"` | Boton X de cierre de la alerta individual |

#### Patron de uso recomendado

```tsx
// 1. Layout de la app — AlertProvider una sola vez
const App = () => (
  <AlertProvider position="top-right" maxAlerts={5}>
    <Router />
  </AlertProvider>
);

// 2. Componente con acciones — usa hook
const SaveButton = () => {
  const { addAlert } = useAlert();

  const handleSave = async () => {
    try {
      await api.save();
      addAlert({ message: 'Guardado correctamente', type: 'success' });
    } catch {
      addAlert({ message: 'Error al guardar', type: 'danger', duration: 0 });
    }
  };

  return <Button onClick={handleSave}>Guardar</Button>;
};

// 3. Servicio HTTP — usa dispatchAlert sin contexto
api.interceptors.response.use(null, (error) => {
  dispatchAlert({ message: error.message, type: 'danger' });
});
```

## Estructura de archivos

```
Alert/
  Alert.tsx             AlertProvider + AlertContext
  Alert.types.ts        AlertType, AlertPosition, AlertItem, AddAlertOptions
  Alert.constants.ts    ALERT_DEFAULTS, ALERT_POSITIONS, SHOW_ALERT_EVENT
  Alert.hooks.ts        useAlert(), dispatchAlert(), useAlertEvent()
  Alert.utils.ts        buildAlertContainerClasses(), generateAlertId()
  README.md             Esta documentacion
```

CSS: `src/w3fussion/FEEDBACK/_alert.css`
