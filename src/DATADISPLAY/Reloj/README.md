# RelojAnalogico

Reloj analogico funcional renderizado con divs absolutos. Muestra las manecillas de hora, minuto y segundo en tiempo real usando `Date`. El radio de la esfera, la longitud y el grosor de las manecillas, y las marcas de tics se calculan proporcionalmente al prop `size`. Soporta tematizacion completa via CSS custom properties.

## Importacion

```tsx
import RelojAnalogico from '@/components/DATADISPLAY/Reloj/RelojAnalogico';
```

## Uso basico

```tsx
<RelojAnalogico />
```

## Tamano personalizado

El prop `size` controla el diametro en pixeles. Todos los elementos del reloj se escalan proporcionalmente:

```tsx
<RelojAnalogico size={120} />   {/* compacto */}
<RelojAnalogico size={200} />
<RelojAnalogico size={300} />   {/* default */}
<RelojAnalogico size={400} />   {/* grande */}
```

## Numeros en la esfera

```tsx
{/* Default: solo 12, 3, 6, 9 */}
<RelojAnalogico size={200} />

{/* Todos los numeros del 1 al 12 */}
<RelojAnalogico size={200} showAllNumbers />

{/* Solo numeros especificos */}
<RelojAnalogico size={200} numbersToShow={[12, 6]} />
<RelojAnalogico size={200} numbersToShow={[12]} />
```

## Marcas y manecillas

```tsx
{/* Sin marcas de tic */}
<RelojAnalogico size={200} showTics={false} />

{/* Sin manecilla de segundos */}
<RelojAnalogico size={200} showSeconds={false} />

{/* Minimalista */}
<RelojAnalogico size={200} showTics={false} showSeconds={false} numbersToShow={[12]} />
```

## Tematizacion via CSS Custom Properties

Aplica overrides en un selector padre o en una clase custom:

```css
/* Tema luxe/dorado */
.reloj-gold {
  --w3f-clock-background: #1a1008;
  --w3f-clock-border-color: #c9a227;
  --w3f-clock-border-width: 6px;
  --w3f-clock-hour-hand-color: #c9a227;
  --w3f-clock-minute-hand-color: #e8d5a3;
  --w3f-clock-second-hand-color: #ff6b35;
  --w3f-clock-center-dot-color: #c9a227;
  --w3f-clock-tic-hour-color: #c9a227;
  --w3f-clock-tic-minute-color: #6b5a2e;
}

/* Tema neon/cyberpunk */
.reloj-neon {
  --w3f-clock-background: #0a0a1a;
  --w3f-clock-border-color: #0ff;
  --w3f-clock-border-width: 2px;
  --w3f-clock-hour-hand-color: #0ff;
  --w3f-clock-minute-hand-color: #0af;
  --w3f-clock-second-hand-color: #f0f;
  --w3f-clock-center-dot-color: #f0f;
  --w3f-clock-tic-hour-color: #0ff;
  --w3f-clock-tic-minute-color: #015;
}
```

```tsx
<div className="reloj-gold">
  <RelojAnalogico size={220} showAllNumbers />
</div>
```

## CSS Custom Properties

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-clock-background` | `var(--w3f-surface)` | Color de fondo de la esfera |
| `--w3f-clock-border-width` | `var(--w3f-space-2)` | Grosor del borde circular |
| `--w3f-clock-border-color` | `var(--w3f-on-surface)` | Color del borde circular |
| `--w3f-clock-hour-hand-color` | `var(--w3f-on-surface)` | Color de la manecilla de hora |
| `--w3f-clock-minute-hand-color` | `var(--w3f-gray-600)` | Color de la manecilla de minuto |
| `--w3f-clock-second-hand-color` | `var(--w3f-danger)` | Color de la manecilla de segundo |
| `--w3f-clock-center-dot-color` | `var(--w3f-primary)` | Color del punto central |
| `--w3f-clock-tic-hour-color` | `var(--w3f-on-surface)` | Color de las marcas de hora |
| `--w3f-clock-tic-minute-color` | `var(--w3f-gray-500)` | Color de las marcas de minuto |
| `--w3f-clock-center-dot-size` | `var(--w3f-space-4)` | Tamano del punto central |

### Tema oscuro automatico

El archivo CSS incluye overrides para `.w3f-theme-dark`:

```css
.w3f-theme-dark {
  --w3f-clock-border-color: var(--w3f-gray-300);
  --w3f-clock-hour-hand-color: var(--w3f-gray-100);
  --w3f-clock-minute-hand-color: var(--w3f-gray-400);
  --w3f-clock-second-hand-color: var(--w3f-danger-400);
  --w3f-clock-center-dot-color: var(--w3f-primary-400);
  /* ... */
}
```

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `size` | `number` | `300` | Diametro del reloj en pixeles |
| `showTics` | `boolean` | `true` | Mostrar marcas de horas y minutos |
| `showAllNumbers` | `boolean` | `false` | Mostrar todos los numeros del 1 al 12 |
| `numbersToShow` | `number[]` | — | Array especifico de numeros a mostrar (tiene prioridad sobre `showAllNumbers`) |
| `showSeconds` | `boolean` | `true` | Mostrar la manecilla de segundos |
| `className` | `string` | `''` | Clases CSS adicionales |

**Prioridad de numeros visibles:**
```
numbersToShow  →  showAllNumbers  →  [12, 3, 6, 9] (default)
```

## API

### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Dimension | `size` | `number` | Diametro en px — todos los elementos se escalan proporcionalmente |
| Numeros | `showAllNumbers` / `numbersToShow` | `boolean` / `number[]` | Controla que digitos aparecen en la esfera |
| Visibilidad | `showTics`, `showSeconds` | `boolean` | Activan/desactivan elementos visuales |
| Estilos | `className` | `string` | Para aplicar temas via CSS vars en un selector padre |

El componente **no acepta hora como prop** — siempre muestra la hora del sistema en tiempo real via `new Date()`.

### Salida de datos

El componente no emite eventos ni callbacks. Es un display de tiempo de solo lectura.

No hay `onTick`, `onMinuteChange` ni ningun otro callback de tiempo. Para reaccionar al tiempo, usa `setInterval(() => ..., 1000)` directamente en el componente padre.

### Comunicacion con otros componentes

#### Usa Text internamente

Los numeros de la esfera (12, 3, 6, 9, etc.) se renderizan con el componente `Text` de `DATADISPLAY/Text/Text`.

#### Sin contextos requeridos

El reloj funciona completamente autonomo. No requiere ningun Provider ni Context:

```tsx
// Funciona en cualquier parte del arbol React
<RelojAnalogico size={200} />
```

#### useClock (hook interno)

El hook `useClock` gestiona la actualizacion del tiempo internamente con `setInterval`:

```tsx
// Hook interno — no es necesario usarlo externamente
const { hours, minutes, seconds } = useClock();
// Actualiza cada 1000ms via setInterval
// Se limpia automaticamente al desmontar
```

### Accesibilidad

| Atributo | Valor | Descripcion |
|---|---|---|
| `role` | `"img"` | El contenedor del reloj es un elemento de imagen |
| `aria-label` | `"Reloj analogico mostrando H:MM"` | Descripcion legible de la hora actual |
| `aria-hidden` | `"true"` | Manecillas y marcas estan ocultas para lectores de pantalla |

Los lectores de pantalla leen la hora a traves del `aria-label` del contenedor, que se actualiza cada segundo.

El CSS incluye soporte para `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .w3f-clock-analog-hand { transition: none; }
}
```

### Patron de uso recomendado

```tsx
// 1. Reloj de escritorio estandar
<RelojAnalogico size={300} />

// 2. Reloj compacto en barra lateral
<RelojAnalogico size={120} showTics={false} showSeconds={false} />

// 3. Reloj de pared grande con todos los numeros
<RelojAnalogico size={400} showAllNumbers />

// 4. Reloj minimalista solo con el 12
<RelojAnalogico size={200} numbersToShow={[12]} showTics={false} />

// 5. Reloj tematizado con CSS vars
<div style={{ '--w3f-clock-background': '#1a1a2e', '--w3f-clock-border-color': '#e94560' }}>
  <RelojAnalogico size={250} />
</div>
```

## Estructura de archivos

```
Reloj/
  RelojAnalogico.tsx          Componente principal
  RelojAnalogico.types.ts     Interfaces: RelojAnalogicoProps, HandAngles
  RelojAnalogico.hooks.ts     useClock() — setInterval + cleanup
  RelojAnalogico.utils.ts     calculateAngles(), getVisibleNumbers(), buildHourNumberStyle(), generateTics(), HAND_BASE_STYLE
  README.md                   Esta documentacion
```

CSS: `src/w3fussion/DATADISPLAY/_reloj-analogico.css`
