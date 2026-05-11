# Console

Terminal de log estilo OS con soporte para niveles de mensaje, filtros, busqueda en tiempo real, timestamps y exportacion. Actua como Provider: cualquier componente hijo puede enviar mensajes usando `useConsole()`.

## Importacion

```tsx
import Console, { useConsole } from '@/components/DATADISPLAY/Console/Console';
```

## Uso basico

```tsx
<Console title="App Log" height="300px">
  <MiComponente />
</Console>

// Dentro de MiComponente:
const { log, success, error } = useConsole();
log('Aplicacion iniciada', 'App');
```

## Provider y useConsole()

`<Console>` expone un `ConsoleContext` a todos sus descendientes. El hook `useConsole()` permite a cualquier componente hijo enviar mensajes:

```tsx
const MiFormulario: React.FC = () => {
  const { log, warn, error, success, debug } = useConsole();

  const handleSubmit = async (values) => {
    log('POST /api/users', 'Request');
    try {
      const res = await api.post(values);
      success(res.data, 'Response 200');
    } catch (err) {
      error(err.message, 'Error');
    }
  };

  return <Form onSubmit={handleSubmit}>...</Form>;
};

// En el padre:
<Console title="API Monitor" height="280px" theme="dark">
  <MiFormulario />
</Console>
```

## Metodos de logging

| Metodo | Nivel | Color |
|---|---|---|
| `log(content, label?)` | `info` | Azul claro |
| `warn(content, label?)` | `warn` | Amarillo |
| `error(content, label?)` | `error` | Rojo |
| `success(content, label?)` | `success` | Verde |
| `debug(content, label?)` | `debug` | Morado |
| `logMessage(content, level?, label?)` | cualquiera | segun nivel |

El parametro `label` es opcional y aparece como categoria entre el nivel y el contenido:

```tsx
success({ users: 42 }, 'Response 200');
// → [SUCCESS] › Response 200 ‹  {"users": 42}
```

Los objetos JSON se detectan automaticamente y se formatean con sangria en un bloque expandible.

## Temas

```tsx
<Console theme="dark" />   {/* default — fondo #1e1e1e */}
<Console theme="light" />  {/* fondo #f5f5f5 */}
```

## Filtros y busqueda

```tsx
<Console
  showLevelFilter    {/* botones All | INFO | WARN | ERROR | SUCCESS | DEBUG */}
  showSearch         {/* input de busqueda en tiempo real */}
  showClearButton    {/* boton para limpiar todos los mensajes */}
  showExportButton   {/* boton para exportar como .log */}
  defaultLevel="all" {/* filtro activo al inicio */}
/>
```

## Timestamps

```tsx
<Console showTimestamps />
{/* Muestra HH:MM:SS.mmm antes de cada mensaje */}
```

## Limite de mensajes

```tsx
<Console maxMessages={500} />
{/* Descarta los mas antiguos cuando se supera el limite */}
```

## Exportacion

Si no se proporciona `onExport`, el boton de exportar descarga un archivo `.log` con todos los mensajes:

```tsx
{/* Descarga automatica */}
<Console showExportButton />

{/* Callback personalizado */}
<Console
  showExportButton
  onExport={(messages) => {
    const json = JSON.stringify(messages, null, 2);
    enviarAlServidor(json);
  }}
/>
```

## Limpiar mensajes programaticamente

```tsx
const MiComponente: React.FC = () => {
  const { clear } = useConsole();
  return <Button onClick={clear}>Limpiar</Button>;
};

<Console>
  <MiComponente />
</Console>
```

## CSS Custom Properties

El componente es totalmente personalizable via CSS custom properties aplicadas sobre `.w3f-console`:

```css
.mi-consola-custom.w3f-console {
  --w3f-console-bg: #0a0a0a;
  --w3f-console-color: #00ff41;
  --w3f-console-font-family: 'Courier New', monospace;
  --w3f-console-header-bg: #0d1a00;
  --w3f-console-title-color: #00ff41;
  --w3f-console-level-info: #00ff41;
  --w3f-console-level-error: #ff073a;
  --w3f-console-text-info: #00ff41;
}
```

```tsx
<Console className="mi-consola-custom" theme="dark" ... />
```

### Variables disponibles

| Variable | Default (dark) | Descripcion |
|---|---|---|
| `--w3f-console-bg` | `#1e1e1e` | Fondo del area de mensajes |
| `--w3f-console-color` | `#d4d4d4` | Color de texto base |
| `--w3f-console-border-color` | `#3c3c3c` | Borde exterior |
| `--w3f-console-radius` | `radius-lg` | Border radius |
| `--w3f-console-font-family` | Cascadia Code, Fira Code, Consolas | Familia monospace |
| `--w3f-console-font-size` | `12.5px` | Tamano de fuente |
| `--w3f-console-line-height` | `1.5` | Altura de linea |
| `--w3f-console-header-bg` | `#2d2d2d` | Fondo del header |
| `--w3f-console-header-border-color` | `#3c3c3c` | Borde inferior del header |
| `--w3f-console-title-color` | `#9cdcfe` | Color del titulo |
| `--w3f-console-badge-bg` | `#3c3c3c` | Fondo del contador de mensajes |
| `--w3f-console-badge-color` | `#9cdcfe` | Color del contador |
| `--w3f-console-action-color` | `#808080` | Color de botones de accion |
| `--w3f-console-action-hover-bg` | `#3c3c3c` | Fondo hover de botones |
| `--w3f-console-filter-color` | `#808080` | Color de botones de filtro |
| `--w3f-console-filter-active-bg` | `#3c3c3c` | Fondo del filtro activo |
| `--w3f-console-search-bg` | `#1e1e1e` | Fondo del input de busqueda |
| `--w3f-console-search-border` | `#3c3c3c` | Borde del input |
| `--w3f-console-search-focus-border` | `#9cdcfe` | Borde focus del input |
| `--w3f-console-scrollbar-width` | `6px` | Ancho del scrollbar |
| `--w3f-console-scrollbar-thumb` | `#3c3c3c` | Color del thumb |
| `--w3f-console-msg-json-bg` | `#2d2d2d` | Fondo de bloques JSON |
| `--w3f-console-level-info` | `#9cdcfe` | Color de nivel INFO |
| `--w3f-console-level-success` | `#4ec9b0` | Color de nivel SUCCESS |
| `--w3f-console-level-warn` | `#dcdcaa` | Color de nivel WARN |
| `--w3f-console-level-error` | `#f44747` | Color de nivel ERROR |
| `--w3f-console-level-debug` | `#c586c0` | Color de nivel DEBUG |
| `--w3f-console-text-info` | `#d4d4d4` | Color de texto mensajes INFO |
| `--w3f-console-text-success` | `#4ec9b0` | Color de texto mensajes SUCCESS |
| `--w3f-console-text-warn` | `#dcdcaa` | Color de texto mensajes WARN |
| `--w3f-console-text-error` | `#f44747` | Color de texto mensajes ERROR |
| `--w3f-console-text-debug` | `#c586c0` | Color de texto mensajes DEBUG |

## Props

### Console

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Componentes que usan `useConsole()` para enviar mensajes |
| `title` | `string` | `'Console'` | Texto del header |
| `maxMessages` | `number` | `200` | Limite de mensajes retenidos. Los mas antiguos se descartan |
| `showTimestamps` | `boolean` | `false` | Muestra la columna de timestamp `HH:MM:SS.mmm` |
| `showLevelFilter` | `boolean` | `false` | Muestra botones de filtro por nivel |
| `showSearch` | `boolean` | `false` | Muestra input de busqueda en tiempo real |
| `showClearButton` | `boolean` | `false` | Muestra boton para limpiar mensajes |
| `showExportButton` | `boolean` | `false` | Muestra boton de exportar como `.log` |
| `defaultLevel` | `ConsoleLevelFilter` | `'all'` | Filtro activo al montar |
| `onExport` | `(messages: ConsoleMessage[]) => void` | — | Callback de exportacion personalizado. Sin el, descarga un `.log` |
| `height` | `string` | `'300px'` | Altura del area de mensajes (CSS string) |
| `theme` | `'dark' \| 'light'` | `'dark'` | Tema visual |
| `className` | `string` | `''` | Clase CSS adicional en el contenedor raiz |

## API

### useConsole()

El hook retorna el `ConsoleContextValue` completo. Lanza un error si se llama fuera de `<Console>`:

```tsx
const {
  messages,       // ConsoleMessage[] — lista de mensajes actual
  logMessage,     // (content, level?, label?) => void — log generico
  log,            // (content, label?) => void — alias de nivel 'info'
  warn,           // (content, label?) => void
  error,          // (content, label?) => void
  success,        // (content, label?) => void
  debug,          // (content, label?) => void
  clear,          // () => void — vacia todos los mensajes
} = useConsole();
```

### ConsoleMessage

```tsx
interface ConsoleMessage {
  id: string;        // UUID unico
  timestamp: string; // ISO 8601
  content: unknown;  // string, number, object, array…
  level: ConsoleLevel;
  label?: string;    // categoria opcional
}
```

### Entrada de datos

| Via | Metodo | Descripcion |
|---|---|---|
| Hijo directo | `useConsole().log(...)` | Componente dentro de `<Console>` envia mensajes via context |
| useEffect inicial | `useConsole()` en `useEffect` | Mensajes enviados en el montaje aparecen inmediatamente |
| Async / promesas | `useConsole()` en callbacks | Funciona en cualquier async handler sin restricciones |

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onExport` | `(messages: ConsoleMessage[]) => void` | Click en el boton de exportar. Si no se provee, descarga el `.log` automaticamente |

### Comunicacion con otros componentes

#### Con Form / LiveForm

El Console puede envolver formularios. Los handlers del form usan `useConsole()` para loguear resultados:

```tsx
const FormConLog: React.FC = () => {
  const { success, error } = useConsole();
  return (
    <Form
      initialValues={{ email: '' }}
      onSubmit={async (values) => {
        try {
          await api.post('/register', values);
          success('Usuario registrado', 'Auth');
        } catch (e) {
          error(e.message, 'Auth');
        }
      }}
    >
      <Input name="email" label="Email" />
      <Button type="submit">Registrar</Button>
    </Form>
  );
};

<Console title="Auth Log" height="250px" showTimestamps showLevelFilter>
  <FormConLog />
</Console>
```

#### Independiente (sin children)

El Console funciona sin children como visor de mensajes donde los logs se envian desde fuera via ref o estado compartido. Sin embargo, el patron recomendado es usar children con `useConsole()`.

### Accesibilidad

| Atributo | Valor | Elemento |
|---|---|---|
| `role` | `"log"` | Area de mensajes |
| `aria-live` | `"polite"` | Area de mensajes — notifica cambios a lectores |
| `aria-label` | El valor de `title` | Area de mensajes |
| `aria-label` | `"Buscar en consola"` | Input de busqueda |
| `aria-label` | `"Exportar"` / `"Limpiar"` | Botones de accion |

### Patron de uso recomendado

```tsx
// 1. Consola full-featured para desarrollo
<Console
  title="Dev Console"
  height="350px"
  theme="dark"
  showTimestamps
  showLevelFilter
  showSearch
  showClearButton
  showExportButton
>
  <MiApp />
</Console>

// 2. Log compacto solo de errores
<Console
  title="Errors"
  height="150px"
  defaultLevel="error"
  showClearButton
>
  <MiFormulario />
</Console>

// 3. Exportacion a servidor
<Console
  showExportButton
  onExport={(msgs) => sendToSentry(msgs)}
>
  <MiApp />
</Console>
```

## Estructura de archivos

```
Console/
  Console.tsx          Componente principal + re-exports publicos
  Console.types.ts     Interfaces TypeScript
  Console.hooks.ts     useConsoleState, useConsoleFilter, useAutoScroll, useConsole
  Console.constants.ts CONSOLE_DEFAULTS, CONSOLE_CLASSES, CONSOLE_LEVELS
  Console.utils.ts     filterMessages, formatTimestamp, exportMessagesAsLog
  Console.context.ts   ConsoleContext (createContext)
  README.md            Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_console.css`
