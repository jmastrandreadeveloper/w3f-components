# ProgressBar

Indicadores visuales de progreso horizontal. Soporta tres variantes: determinada (valor 0–100), indeterminada (animacion infinita) y buffer (progreso + zona de precarga).

## Importacion

```tsx
import ProgressBar from '@/components/DATADISPLAY/ProgressBar/ProgressBar';
import ProgressBarBuffer from '@/components/DATADISPLAY/ProgressBar/ProgressBarBuffer';
import ProgressBarIndeterminate from '@/components/DATADISPLAY/ProgressBar/ProgressBarIndeterminate';
```

## Uso basico

```tsx
<ProgressBar progress={75} />
```

## Colores

Seis colores semanticos disponibles:

```tsx
<ProgressBar progress={60} color="primary" />
<ProgressBar progress={60} color="secondary" />
<ProgressBar progress={60} color="success" />
<ProgressBar progress={60} color="warning" />
<ProgressBar progress={60} color="danger" />
<ProgressBar progress={60} color="info" />
```

## Tamanos

Tres tamanos predefinidos controlados por CSS custom properties:

```tsx
<ProgressBar progress={65} size="sm" />  {/* pequeño */}
<ProgressBar progress={65} size="md" />  {/* default */}
<ProgressBar progress={65} size="lg" />  {/* grande */}
```

## Etiqueta

Por defecto muestra el porcentaje como texto dentro de la barra. Se puede personalizar o suprimir:

```tsx
{/* Etiqueta automatica: "75%" */}
<ProgressBar progress={75} />

{/* Etiqueta personalizada */}
<ProgressBar progress={42} label="Subiendo archivos..." />

{/* Sin etiqueta */}
<ProgressBar progress={35} showLabel={false} />
```

## Modo indeterminado

Para cuando el tiempo de finalizacion es desconocido. Dos variantes de animacion:

```tsx
{/* Barra que se desliza de izquierda a derecha */}
<ProgressBarIndeterminate color="primary" variant="slide" />

{/* Barra con animacion de pulso suave */}
<ProgressBarIndeterminate color="success" variant="pulse" />
```

## Modo buffer

Muestra simultaneamente el progreso real y el buffer precargado (util para reproductores de video/audio):

```tsx
<ProgressBarBuffer
  progress={30}
  buffer={65}
  progressColor="primary"
  bufferColor="info"
/>
```

## Progreso animado

El componente acepta actualizaciones dinamicas del prop `progress`:

```tsx
const [value, setValue] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setValue(prev => Math.min(prev + 2, 100));
  }, 100);
  return () => clearInterval(id);
}, []);

<ProgressBar progress={value} color="success" size="lg" />
```

## CSS Custom Properties

El componente es configurable via CSS custom properties aplicadas en el contenedor:

```css
.mi-barra-custom {
  --w3f-pbar-height: 20px;
  --w3f-pbar-radius: 50px;
  border-radius: 50px;
  overflow: hidden;
}

.mi-barra-custom .w3f-progress-bar-fill {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 50px;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-pbar-height` | `space-6` (md) | Alto del contenedor |
| `--w3f-pbar-radius` | `radius-full` | Border radius del contenedor y fill |
| `--w3f-pbar-transition` | `width transition-normal` | Transicion del ancho del fill |
| `--w3f-pbar-text-color` | `on-primary` | Color del texto de la etiqueta |
| `--w3f-pbar-text-font-size` | `text-sm` | Tamano de fuente de la etiqueta |
| `--w3f-pbar-text-font-weight` | `500` | Peso de fuente de la etiqueta |
| `--w3f-pbar-text-padding` | `space-2` | Padding derecho del texto |
| `--w3f-pbar-buffer-opacity` | `0.3` | Opacidad de la barra de buffer |
| `--w3f-pbar-indeterminate-width` | `30%` | Ancho del bloque indeterminado |
| `--w3f-pbar-indeterminate-duration` | `1.5s` | Duracion de la animacion slide |
| `--w3f-pbar-pulse-duration` | `2s` | Duracion de la animacion pulse |

## Props

### ProgressBar

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `progress` | `number` | — | **Requerido.** Valor de 0 a 100. Se limita automaticamente al rango |
| `color` | `ProgressBarColor` | `'success'` | Color semantico de la barra |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano de la barra |
| `showLabel` | `boolean` | `true` | Muestra texto dentro de la barra |
| `label` | `string` | — | Texto personalizado. Si no se provee, muestra `"{progress}%"` |
| `ariaLabel` | `string` | `'Progreso: X%'` | Texto para `aria-label` del contenedor |

### ProgressBarBuffer

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `progress` | `number` | — | **Requerido.** Progreso real (0–100) |
| `buffer` | `number` | — | **Requerido.** Nivel de buffer (0–100). Nunca se renderiza menor que `progress` |
| `progressColor` | `ProgressBarColor` | `'success'` | Color de la barra de progreso principal |
| `bufferColor` | `ProgressBarColor` | `'primary'` | Color de la zona de buffer |
| `showLabel` | `boolean` | `true` | Muestra texto del porcentaje de progreso |
| `label` | `string` | — | Texto personalizado de la etiqueta |
| `ariaLabel` | `string` | — | Texto accesible compuesto automaticamente |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano |

### ProgressBarIndeterminate

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `color` | `ProgressBarColor` | `'primary'` | Color de la barra animada |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano |
| `variant` | `'slide' \| 'pulse'` | `'slide'` | Tipo de animacion |
| `ariaLabel` | `string` | `'Cargando'` | Texto accesible para el estado de carga |

## API

### Entrada de datos

El ProgressBar es un componente de **solo visualizacion**: no gestiona su propio estado. Recibe datos unicamente via props.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Progreso | `progress` | `number` | Valor actual (0–100). El componente lo limita con `Math.min(100, Math.max(0, value))` |
| Buffer | `buffer` | `number` | Solo en `ProgressBarBuffer`. Zona de precarga visualizada con menor opacidad |

### Salida de datos

El ProgressBar es **display-only**: no emite eventos ni callbacks. Para animar el progreso, el padre controla el estado:

```tsx
// Patron tipico: estado externo
const [progress, setProgress] = useState(0);

// El componente solo renderiza — no hay onComplete ni onChange
<ProgressBar progress={progress} color="success" />
```

### Comunicacion con otros componentes

El ProgressBar no requiere Context ni Provider. Funciona de forma autonoma en cualquier parte del arbol React:

```tsx
// Funciona directamente en cualquier lugar
<ProgressBar progress={uploadPercent} color="primary" />
```

### Accesibilidad

El contenedor raiz usa `role="progressbar"` con atributos ARIA estandar:

| Atributo | Valor |
|---|---|
| `role` | `"progressbar"` |
| `aria-valuenow` | Valor actual (0–100) |
| `aria-valuemin` | `0` |
| `aria-valuemax` | `100` |
| `aria-label` | `"Progreso: X%"` (o el `ariaLabel` proporcionado) |
| `aria-busy` | `"true"` (solo en `ProgressBarIndeterminate`) |

### Patron de uso recomendado

```tsx
// 1. Subida de archivo
<ProgressBar progress={uploadProgress} color="primary" label="Subiendo..." />

// 2. Carga desconocida
<ProgressBarIndeterminate color="info" variant="slide" />

// 3. Reproductor multimedia
<ProgressBarBuffer
  progress={playPosition}
  buffer={buffered}
  progressColor="primary"
  bufferColor="info"
/>

// 4. Barra minima sin etiqueta
<ProgressBar progress={75} size="sm" showLabel={false} color="success" />
```

## Colores disponibles

`primary` · `secondary` · `success` · `warning` · `danger` · `info`

## Estructura de archivos

```
ProgressBar/
  ProgressBar.tsx              Barra determinada
  ProgressBarBuffer.tsx        Variante con zona de buffer
  ProgressBarIndeterminate.tsx Variante con animacion infinita
  ProgressBar.types.ts         Interfaces TypeScript
  ProgressBar.utils.ts         clampProgress, getSizeClass, getProgressBgClass
  README.md                    Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_progress-bar.css`
