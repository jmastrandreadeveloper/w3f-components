# ProgressSpinner

Indicador circular de progreso basado en SVG. Soporta modo indeterminado (animacion infinita de carga) y modo determinado (arco que se llena segun un valor de 0 a 100).

## Importacion

```tsx
import ProgressSpinner from '@/components/DATADISPLAY/ProgressSpinner/ProgressSpinner';
```

## Uso basico

```tsx
{/* Indeterminado — por defecto */}
<ProgressSpinner />

{/* Determinado con valor */}
<ProgressSpinner mode="determinate" value={75} />
```

## Modos

### Indeterminado

Animacion continua de rotacion + dasharray, ideal para estados de carga de duracion desconocida:

```tsx
<ProgressSpinner mode="indeterminate" color="primary" />
```

### Determinado

Arco SVG que se llena proporcionalmente al `value` (0–100). Transicion animada al cambiar el valor:

```tsx
<ProgressSpinner mode="determinate" value={60} color="success" />
```

## Tamanos

### Tamanos nombrados

Cinco tamanos predefinidos (xs=16px · sm=24px · md=40px · lg=56px · xl=72px):

```tsx
<ProgressSpinner size="xs" />
<ProgressSpinner size="sm" />
<ProgressSpinner size="md" />   {/* default */}
<ProgressSpinner size="lg" />
<ProgressSpinner size="xl" />
```

### Tamano numerico

Se puede pasar cualquier numero en pixeles directamente:

```tsx
<ProgressSpinner size={32} />
<ProgressSpinner size={80} />
<ProgressSpinner size={120} />
```

## Colores

Siete colores nombrados que mapean a las variables CSS del framework:

```tsx
<ProgressSpinner color="primary" />
<ProgressSpinner color="secondary" />
<ProgressSpinner color="success" />
<ProgressSpinner color="warning" />
<ProgressSpinner color="danger" />
<ProgressSpinner color="info" />
<ProgressSpinner color="gray" />
```

### Color CSS personalizado

Cualquier cadena CSS valida se usa directamente como color de trazo:

```tsx
<ProgressSpinner color="#e11d48" />
<ProgressSpinner color="hsl(262, 80%, 50%)" />
<ProgressSpinner color="var(--mi-color-custom)" />
```

## Grosor de trazo

Controla el ancho del arco SVG en pixeles:

```tsx
<ProgressSpinner strokeWidth={2} size="lg" />  {/* fino */}
<ProgressSpinner strokeWidth={4} size="lg" />  {/* default */}
<ProgressSpinner strokeWidth={8} size="lg" />  {/* grueso */}
```

## Progreso animado

El componente reacciona a cambios del prop `value` con una transicion suave:

```tsx
const [value, setValue] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setValue(prev => (prev >= 100 ? 0 : prev + 1));
  }, 80);
  return () => clearInterval(id);
}, []);

<ProgressSpinner mode="determinate" value={value} color="primary" size="lg" />
```

## CSS Custom Properties

El spinner usa variables de animacion del framework, sobreescribibles en el contenedor padre:

```css
.mi-spinner-wrapper .w3f-spinner-rotate {
  --w3f-spinner-rotate-duration: 1s;  /* mas rapido */
}

.mi-spinner-wrapper .w3f-spinner-path {
  --w3f-spinner-dash-duration: 0.8s;
}
```

Para efectos visuales adicionales, usa filtros CSS en el elemento raiz:

```css
.mi-spinner-glow {
  filter: drop-shadow(0 0 8px var(--w3f-primary));
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-spinner-rotate-duration` | `2s` | Duracion de la rotacion completa (indeterminate) |
| `--w3f-spinner-dash-duration` | `1.35s` | Duracion del ciclo del dasharray (indeterminate) |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `mode` | `'indeterminate' \| 'determinate'` | `'indeterminate'` | Modo de operacion |
| `value` | `number` | `0` | Porcentaje de progreso (0–100). Solo relevante en modo `determinate` |
| `size` | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamano del spinner |
| `strokeWidth` | `number` | `4` | Grosor del arco SVG en pixeles |
| `color` | `SpinnerColorName \| string` | `'primary'` | Color del trazo. Nombre semantico o cualquier cadena CSS |
| `ariaLabel` | `string` | `'Cargando'` / `'Progreso: X%'` | Texto accesible para `aria-label` |
| `diameter` | `number` | — | **Deprecated.** Usar `size` en su lugar |

## API

### Entrada de datos

El ProgressSpinner es un componente de **solo visualizacion**: no gestiona su propio estado ni emite eventos.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Modo | `mode` | `string` | Controla si anima infinitamente o muestra un valor concreto |
| Progreso | `value` | `number` | Porcentaje (0–100) visible solo en modo `determinate`. Se limita al rango automaticamente |

### Salida de datos

No emite callbacks. El componente es puramente receptivo:

```tsx
// El padre controla el estado — el spinner solo muestra
<ProgressSpinner mode="determinate" value={processPercent} />
```

### Comunicacion con otros componentes

No requiere Context ni Provider. Funciona de forma autonoma:

```tsx
// Uso en cualquier punto del arbol
<ProgressSpinner color="primary" />
```

### Accesibilidad

| Atributo | Valor | Descripcion |
|---|---|---|
| `role` | `"status"` | En el div contenedor |
| `aria-live` | `"polite"` | Notifica cambios a lectores de pantalla |
| `aria-label` | `"Cargando"` / `"Progreso: X%"` | Generado automaticamente segun el modo |
| `aria-hidden` | `"true"` | En el elemento SVG (decorativo) |

### Patron de uso recomendado

```tsx
// 1. Carga generica
<ProgressSpinner />

// 2. Dentro de un boton durante una operacion async
<Button disabled={loading}>
  {loading ? <ProgressSpinner size="sm" color="primary" /> : 'Guardar'}
</Button>

// 3. Progreso de instalacion / proceso largo
<ProgressSpinner
  mode="determinate"
  value={installPercent}
  size="xl"
  color="success"
  strokeWidth={6}
/>

// 4. Mini spinner de tabla
<ProgressSpinner size={20} color="gray" strokeWidth={2} />
```

## Colores disponibles

`primary` · `secondary` · `success` · `warning` · `danger` · `info` · `gray` · cualquier cadena CSS

## Estructura de archivos

```
ProgressSpinner/
  ProgressSpinner.tsx         Componente principal (SVG)
  ProgressSpinner.types.ts    Interfaces TypeScript
  ProgressSpinner.utils.ts    resolveSpinnerDiameter, resolveSpinnerColor, calcDashOffset
  README.md                   Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_progress-spinner.css`
