# Rating

Componente de calificacion interactivo con soporte para estrellas, corazones y emojis. Admite precision de media estrella, teclado completo, estados de error/disabled/readOnly e integracion con Form/LiveForm.

## Importacion

```tsx
import Rating from '@/components/INPUTS/Rating/Rating';
```

## Uso basico

```tsx
const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} showValue />
```

## Tipos de icono

Tres variantes visuales controladas por `iconType`:

```tsx
<Rating value={4} iconType="star" showValue />   {/* estrellas amarillas (default) */}
<Rating value={4} iconType="heart" showValue />  {/* corazones rojos */}
<Rating value={3} iconType="smiley" showValue /> {/* emojis con color segun valor */}
```

El modo `smiley` muestra Frown (1), Meh (2) y Smile (3-5) con colores progresivos de danger a success.

## Tamanos

Tres tamanos predefinidos que controlan el tamano del icono y el padding:

```tsx
<Rating defaultValue={4} size="small" />   {/* icono 20px */}
<Rating defaultValue={4} size="medium" />  {/* icono 28px (default) */}
<Rating defaultValue={4} size="large" />   {/* icono 36px */}
```

## Precision de media estrella

Activa incrementos de 0.5 moviendo el cursor sobre la mitad izquierda o derecha de cada icono:

```tsx
<Rating
  value={halfRating}
  onChange={setHalfRating}
  precision={0.5}
  showValue
  size="large"
/>
```

La media estrella se renderiza usando un `linearGradient` SVG dinamico.

## Numero maximo de iconos

Por defecto son 5. Usa `max` para escalas distintas:

```tsx
<Rating defaultValue={7} max={10} showValue />        {/* escala de 10 */}
<Rating defaultValue={2} max={3} showValue />          {/* escala de 3 */}
<Rating defaultValue={5} max={7} iconType="heart" />   {/* 7 corazones */}
```

## Limpiar calificacion

Con `allowClear={true}` (default) aparece un boton × cuando hay valor seleccionado. Click en la misma estrella activa tambien limpia si el nuevo valor coincide con el actual:

```tsx
<Rating defaultValue={3} allowClear showValue />

{/* Desactivar limpieza */}
<Rating defaultValue={3} allowClear={false} showValue />
```

## Estados read-only y disabled

```tsx
<Rating value={4} readOnly showValue />   {/* sin cursor, sin interaccion */}
<Rating value={3} disabled showValue />   {/* opacidad reducida, pointer-events none */}
```

## Etiquetas personalizadas

Provee un array de strings para cada valor. Se usan en el `title` nativo del icono y en la logica de display:

```tsx
<Rating
  value={rating}
  onChange={setRating}
  labels={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
  showValue
  size="large"
  allowClear
/>
```

## Con label y validacion

```tsx
<Rating
  label="Calificacion del producto"
  required
  value={rating}
  onChange={setRating}
  error="Debes seleccionar una calificacion"
  helperText="Selecciona entre 1 y 5 estrellas"
/>
```

Cuando hay `error` el contenedor recibe la clase `w3f-rating-error` y un shake animation.

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el rating lee y escribe en `FormContext` automaticamente:

```tsx
<Form initialValues={{ calificacion: 0 }} onSubmit={handleSubmit}>
  <Rating
    name="calificacion"
    label="Calificacion"
    required
    error="Obligatorio"
    showValue
  />
  <Button type="submit">Enviar</Button>
</Form>
```

El valor del campo se sincroniza mediante `formContext.setFieldValue`. Los errores de validacion del formulario reemplazan al prop `error`.

## Navegacion por teclado

El componente implementa el patron ARIA `radiogroup` / `radio`:

| Tecla | Accion |
|---|---|
| `ArrowRight` / `ArrowUp` | Aumenta el valor en `precision` |
| `ArrowLeft` / `ArrowDown` | Reduce el valor en `precision` |
| `Home` | Establece el minimo (`precision`) |
| `End` | Establece el maximo (`max`) |
| `Space` / `Enter` | Selecciona el icono enfocado |
| `Delete` / `Backspace` | Limpia el valor (si `allowClear`) |

## CSS Custom Properties

Aplica overrides en una clase custom pasada por `className`:

```css
.mi-rating-custom {
  --w3f-rating-gap: 8px;
  --w3f-rating-item-radius: 4px;
  --w3f-rating-focus-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
  --w3f-rating-error-color: var(--w3f-danger-500);
  --w3f-rating-clear-color: var(--w3f-gray-400);
  --w3f-rating-clear-hover-bg: var(--w3f-gray-200);
  --w3f-rating-clear-hover-color: var(--w3f-gray-700);
  --w3f-rating-value-font-size: var(--w3f-text-sm);
  --w3f-rating-value-color: var(--w3f-gray-700);
  --w3f-rating-disabled-opacity: 0.5;
}
```

### Temas de ejemplo

```css
/* Estrellas doradas */
.rating-gold {
  --w3f-rating-gap: 6px;
  --w3f-rating-focus-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
}

/* Corazones rojos intensos */
.rating-hearts {
  --w3f-rating-gap: 4px;
  --w3f-rating-focus-shadow: 0 0 0 3px rgba(225, 29, 72, 0.3);
  --w3f-rating-clear-hover-bg: #ffe4e6;
}

/* Esmeraldas */
.rating-emerald {
  --w3f-rating-gap: 8px;
  --w3f-rating-focus-shadow: 0 0 0 3px rgba(5, 150, 105, 0.3);
}
```

```tsx
<Rating className="rating-gold" defaultValue={4} showValue size="large" />
<Rating className="rating-hearts" defaultValue={4} iconType="heart" showValue />
<Rating className="rating-emerald" defaultValue={3} showValue size="large" />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-rating-gap` | `space-2` | Separacion entre iconos en el wrapper |
| `--w3f-rating-margin-bottom` | `space-4` | Margen inferior del wrapper |
| `--w3f-rating-item-radius` | `radius-md` | Border-radius de cada item |
| `--w3f-rating-item-transition` | `transform, opacity, box-shadow` | Transicion de los items |
| `--w3f-rating-focus-shadow` | `0 0 0 3px rgba(37,99,235,0.3)` | Sombra de foco (teclado) |
| `--w3f-rating-focus-shadow-dark` | `0 0 0 3px rgba(96,165,250,0.4)` | Sombra de foco en dark mode |
| `--w3f-rating-error-color` | `danger-500` | Color del borde de error |
| `--w3f-rating-clear-color` | `gray-400` | Color del boton limpiar |
| `--w3f-rating-clear-hover-bg` | `gray-200` | Fondo hover del boton limpiar |
| `--w3f-rating-clear-hover-color` | `gray-700` | Color hover del boton limpiar |
| `--w3f-rating-clear-active-bg` | `gray-300` | Fondo activo del boton limpiar |
| `--w3f-rating-value-font-size` | `text-sm` | Tamano de fuente del display de valor |
| `--w3f-rating-value-color` | `gray-700` | Color del display de valor |
| `--w3f-rating-value-empty-color` | `gray-500` | Color cuando no hay valor |
| `--w3f-rating-outlined-border-color` | `outline-variant` | Borde del modo outlined |
| `--w3f-rating-outlined-radius` | `radius-lg` | Radio del modo outlined |
| `--w3f-rating-outlined-bg` | `surface` | Fondo del modo outlined |
| `--w3f-rating-disabled-opacity` | `0.5` | Opacidad en estado disabled |

### Clases utilitarias CSS

| Clase | Efecto |
|---|---|
| `w3f-rating-inline` | Elimina padding vertical del contenedor |
| `w3f-rating-compact` | Gap de 2px y padding de 2px entre iconos |
| `w3f-rating-outlined` | Agrega borde, radio y fondo al contenedor |
| `w3f-rating-glow` | Efecto drop-shadow en hover (color del icono) |
| `w3f-rating-celebrating` | Animacion de celebracion en los items |
| `w3f-rating-warning` | Animacion de pulso de advertencia |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `name` | `string` | — | Campo en Form/LiveForm |
| `defaultValue` | `number` | `0` | Valor inicial (no controlado) |
| `value` | `number` | — | Valor controlado |
| `max` | `number` | `5` | Numero maximo de iconos |
| `readOnly` | `boolean` | `false` | Modo solo lectura |
| `disabled` | `boolean` | `false` | Modo deshabilitado |
| `onChange` | `(value: number) => void` | — | Callback al cambiar valor |
| `onHoverChange` | `(value: number) => void` | — | Callback al hacer hover (-1 al salir) |
| `iconType` | `'star' \| 'heart' \| 'smiley'` | `'star'` | Tipo de icono |
| `precision` | `1 \| 0.5` | `1` | Incremento de seleccion |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamano del componente |
| `showValue` | `boolean` | `false` | Muestra el valor numerico |
| `allowClear` | `boolean` | `true` | Muestra boton para limpiar valor |
| `labels` | `string[]` | `[]` | Etiquetas personalizadas por valor |
| `error` | `string` | — | Mensaje de error |
| `helperText` | `string` | — | Texto de ayuda |
| `required` | `boolean` | `false` | Campo requerido |
| `label` | `string` | — | Etiqueta del campo |
| `className` | `string` | `''` | Clases CSS adicionales |

## API

### Entrada de datos

El Rating acepta datos por tres vias:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `value` | `number` | Valor impuesto desde el padre. Reactivo a cambios externos |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` cuando el componente esta dentro de un `<Form>` |
| Valor inicial | `defaultValue` | `number` | Valor inicial del estado interno en modo no controlado (default `0`) |

**Prioridad de resolucion de valor:**
```
FormContext.values[name]  →  prop value  →  estado interno (defaultValue)
```

La precision `0.5` activa la deteccion de media estrella: al mover el cursor sobre la mitad izquierda del icono el hover muestra `index + 0.5`, la mitad derecha muestra `index + 1`. La media estrella se renderiza con un `linearGradient` SVG dinamico.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(value: number) => void` | El usuario hace clic en un icono o usa el teclado. Emite el nuevo valor (puede ser `0` si `allowClear` esta activo y se hace clic en el mismo icono) |
| `onHoverChange` | `(value: number) => void` | Al mover el cursor sobre los iconos. Emite el valor del icono bajo el cursor, o `-1` cuando el cursor sale del componente |

Flujo de seleccion:
1. Click en icono → `handleChange(ratingIndex)`
2. Si `allowClear && newValue === value` → emite `0`
3. Si es form-controlled: llama a `formContext.setFieldValue(name, next)`
4. Siempre llama a `onChange(next)` si el callback esta definido

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El Rating consume `FormContext` via `useRatingFormContext()`. Usa `setFieldValue` (no `handleChange`) porque el valor es numerico, no de un input nativo:

```
Form.initialValues.calificacion = 0
        ↓ (lectura)
Rating lee FormContext.values["calificacion"]
        ↓ (usuario hace clic en estrella 4)
Rating llama formContext.setFieldValue("calificacion", 4)
        ↓ (propagacion)
Form.onSubmit recibe { calificacion: 4 }
```

Los errores de Form (`formContext.errors[name]`) reemplazan al prop `error`. Un `<input type="hidden">` con el valor actual garantiza que el dato se incluye en el submit nativo del formulario.

#### Independiente (sin contexto requerido)

```tsx
// Funciona en cualquier parte del arbol React
<Rating defaultValue={3} onChange={(v) => console.log(v)} />
```

### Accesibilidad

El componente implementa el patron ARIA `radiogroup` / `radio`:

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `role` | `"radiogroup"` | Contenedor de iconos | Siempre |
| `aria-label` | valor de `label` o `'Rating'` | Contenedor de iconos | Siempre |
| `aria-required` | `true` / `false` | Contenedor de iconos | Segun prop `required` |
| `aria-invalid` | `true` / `false` | Contenedor de iconos | Cuando hay error |
| `role` | `"radio"` | Cada icono | Siempre |
| `aria-checked` | `true` / `false` | Cada icono | Si el valor actual es igual al indice |
| `aria-label` | `"N de M"` o label personalizado | Cada icono | Siempre |
| `tabIndex` | `0` | Icono activo o primero | Solo el icono con foco recibe tab |
| `aria-live` | `"polite"` | Display de valor | Cuando `showValue` es `true` |
| `role` | `"alert"` | Mensaje de error | Cuando hay error |

Navegacion por teclado completa: `ArrowRight`/`ArrowUp` aumentan, `ArrowLeft`/`ArrowDown` reducen, `Home`/`End` van al minimo/maximo, `Delete`/`Backspace` limpian (si `allowClear`).

### Patron de uso recomendado

```tsx
// 1. Controlado basico
const [stars, setStars] = useState(3);
<Rating value={stars} onChange={setStars} showValue />

// 2. Con precision de media estrella
<Rating
  value={rating}
  onChange={setRating}
  precision={0.5}
  size="large"
  showValue
/>

// 3. Solo lectura — display de valoracion
<Rating value={4.5} readOnly precision={0.5} iconType="star" />

// 4. Integrado en Form con validacion
<Form initialValues={{ estrellas: 0 }} onSubmit={handleSubmit}>
  <Rating
    name="estrellas"
    label="Calificacion del producto"
    required
    showValue
  />
  <Button type="submit">Enviar resena</Button>
</Form>

// 5. Con etiquetas descriptivas y corazones
<Rating
  value={feeling}
  onChange={setFeeling}
  iconType="heart"
  labels={['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente']}
  showValue
/>
```

## Estructura de archivos

```
Rating/
  Rating.tsx            Componente principal + renderRatingIcon
  Rating.types.ts       RatingProps, RatingIconType, RatingSize
  Rating.constants.ts   RATING_CLASSES, RATING_ICON_SIZES
  Rating.utils.ts       buildContainerClasses(), getIconColor(), getFillPercentage()
  Rating.hooks.ts       useRatingFormContext, useRatingHover
  README.md             Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_rating.css`
