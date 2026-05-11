# Fonts

Componente de presentacion tipografica que aplica clases CSS W3Fussion para tamanio, familia, peso, cursiva y subrayado. Renderiza cualquier elemento HTML mediante el prop `element` y acepta clases CSS adicionales via `customClasses`.

Incluye el hook `useFonts` para gestionar estado de tipografia en demos e interfaces de configuracion.

## Importacion

```tsx
import Fonts from '@/components/DATADISPLAY/Fonts/Fonts';
import { useFonts } from '@/components/DATADISPLAY/Fonts/Fonts.hooks';
```

## Uso basico

```tsx
<Fonts text="Hola mundo" />
```

## Tamanos de fuente

Once tamanos disponibles de 2xs a 6xl:

```tsx
<Fonts text="Extra extra small" size="2xs" element="p" />
<Fonts text="Extra small" size="xs" element="p" />
<Fonts text="Small" size="sm" element="p" />
<Fonts text="Base (default)" size="base" element="p" />
<Fonts text="Large" size="lg" element="p" />
<Fonts text="Extra Large" size="xl" element="p" />
<Fonts text="Display" size="2xl" element="p" />
<Fonts text="Larger Display" size="3xl" element="p" />
<Fonts text="Hero" size="4xl" element="p" />
<Fonts text="Mega" size="5xl" element="p" />
<Fonts text="Giant" size="6xl" element="p" />
```

## Familias tipograficas

Seis familias disponibles:

```tsx
<Fonts text="Sans (Inter)" family="sans" size="lg" element="p" />
<Fonts text="Display (Outfit)" family="display" size="lg" element="p" />
<Fonts text="Mono (JetBrains Mono)" family="mono" size="lg" element="p" />
<Fonts text="Roboto" family="roboto" size="lg" element="p" />
<Fonts text="Playfair Display" family="playfair" size="lg" element="p" />
<Fonts text="Space Mono" family="spacemono" size="lg" element="p" />
```

## Pesos de fuente

Nueve pesos desde thin hasta black:

```tsx
<Fonts text="Thin (100)" weight="thin" size="xl" element="p" />
<Fonts text="Extra Light (200)" weight="extralight" size="xl" element="p" />
<Fonts text="Light (300)" weight="light" size="xl" element="p" />
<Fonts text="Normal (400)" weight="normal" size="xl" element="p" />
<Fonts text="Medium (500)" weight="medium" size="xl" element="p" />
<Fonts text="Semibold (600)" weight="semibold" size="xl" element="p" />
<Fonts text="Bold (700)" weight="bold" size="xl" element="p" />
<Fonts text="Extrabold (800)" weight="extrabold" size="xl" element="p" />
<Fonts text="Black (900)" weight="black" size="xl" element="p" />
```

## Cursiva y subrayado

```tsx
<Fonts text="Texto en cursiva" italic size="lg" element="p" />
<Fonts text="Texto subrayado" underline size="lg" element="p" />
<Fonts text="Bold cursiva subrayado" italic underline weight="bold" size="lg" element="p" />
```

## Elemento HTML personalizado

Por defecto renderiza un `<span>`. Usa el prop `element` para cualquier elemento HTML:

```tsx
<Fonts text="Titulo principal" family="display" weight="bold" size="4xl" element="h1" />
<Fonts text="Subtitulo" family="display" weight="semibold" size="2xl" element="h2" />
<Fonts text="Parrafo normal" family="sans" size="base" element="p" />
<Fonts text="Codigo inline" family="mono" size="sm" element="code" />
```

## Clases CSS adicionales

```tsx
<Fonts
  text="Texto con clases extra"
  family="display"
  size="2xl"
  customClasses="w3f-text-primary w3f-mb-4"
  element="p"
/>
```

## Combinacion avanzada

```tsx
<Fonts
  text="Display Bold 3xl"
  family="display"
  weight="bold"
  size="3xl"
  element="h2"
/>

<Fonts
  text="Mono Semibold Italic"
  family="mono"
  weight="semibold"
  italic
  size="lg"
  element="p"
/>

<Fonts
  text="Playfair Light Subrayado"
  family="playfair"
  weight="light"
  underline
  size="2xl"
  element="p"
/>
```

## Hook useFonts

Gestiona el estado de configuracion tipografica con opciones y metodos listos para usar:

```tsx
import { useFonts } from '@/components/DATADISPLAY/Fonts/Fonts.hooks';

const FontPicker = () => {
  const {
    selectedSize, setSelectedSize,
    selectedFamily, setSelectedFamily,
    selectedWeight, setSelectedWeight,
    isItalic, setIsItalic,
    isUnderline, setIsUnderline,
    getFontClasses,
    resetToDefaults,
    FONT_SIZES,
    FONT_FAMILIES,
    FONT_WEIGHTS,
  } = useFonts();

  return (
    <>
      <select value={selectedFamily} onChange={e => setSelectedFamily(e.target.value)}>
        {FONT_FAMILIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
      </select>

      <p className={getFontClasses('w3f-text-lg')}>Vista previa del texto</p>

      <button onClick={resetToDefaults}>Resetear</button>
    </>
  );
};
```

## CSS Custom Properties

Fonts aplica clases utilitarias `w3f-*` del framework. No tiene variables `--w3f-fonts-*` propias.

Las clases de familia tipografica referencian fuentes cargadas via Google Fonts (configuradas en el proyecto):

| Familia | Clase CSS | Fuente Google |
|---|---|---|
| `sans` | `w3f-font-sans` | Inter |
| `display` | `w3f-font-display` | Outfit / DM Sans |
| `mono` | `w3f-font-mono` | JetBrains Mono |
| `roboto` | `w3f-font-roboto` | Roboto |
| `playfair` | `w3f-font-playfair` | Playfair Display |
| `spacemono` | `w3f-font-space-mono` | Space Mono |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `text` | `string` | `'Texto de ejemplo'` | Texto a renderizar |
| `size` | `FontSize` | `'base'` | Tamano de fuente: `2xs \| xs \| sm \| base \| lg \| xl \| 2xl \| 3xl \| 4xl \| 5xl \| 6xl` |
| `family` | `FontFamily` | `'sans'` | Familia tipografica: `sans \| display \| mono \| roboto \| playfair \| spacemono` |
| `weight` | `FontWeight` | `'normal'` | Peso: `thin \| extralight \| light \| normal \| medium \| semibold \| bold \| extrabold \| black` |
| `italic` | `boolean` | `false` | Aplicar estilo cursiva |
| `underline` | `boolean` | `false` | Aplicar subrayado |
| `element` | `React.ElementType` | `'span'` | Elemento HTML a renderizar |
| `customClasses` | `string` | `''` | Clases CSS adicionales |

## API

### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Texto | `text` | `string` | Contenido textual a mostrar |
| Tamano | `size` | `FontSize` | Mapeado a clase `w3f-text-{size}` |
| Familia | `family` | `FontFamily` | Mapeado a clase `w3f-font-{family}` |
| Peso | `weight` | `FontWeight` | Mapeado a clase `w3f-font-{weight}` |
| Estilo | `italic`, `underline` | `boolean` | Agregan `w3f-italic` y `w3f-underline` |
| Elemento | `element` | `React.ElementType` | Determina el tag HTML generado |
| Clases extra | `customClasses` | `string` | Se agregan al inicio de la lista de clases |

### Salida de datos

El componente no emite eventos ni callbacks. Es un componente de display puro.

### Comunicacion con otros componentes

#### Independiente

Fonts no requiere ningun Provider, Context ni componente padre especial. Funciona de forma completamente autonoma.

#### Composicion con useFonts

El hook `useFonts` es un helper de estado desacoplado del componente. Se puede usar junto a `Fonts` o independientemente para generar clases:

```tsx
const { getFontClasses } = useFonts();

// Aplicar clases a cualquier elemento
<div className={getFontClasses('mi-clase-extra')}>Texto</div>

// O usarlo con el componente Fonts
<Fonts text="Preview" size={selectedSize} family={selectedFamily} weight={selectedWeight} />
```

### Accesibilidad

El componente renderiza el elemento HTML semantico correcto segun el prop `element`. Para titulos, usar `h1`-`h6`; para parrafos, usar `p`; para codigo, usar `code` o `pre`.

El componente no agrega atributos ARIA propios — la semantica depende del `element` elegido.

### Patron de uso recomendado

```tsx
// 1. Titulo principal de pagina
<Fonts text="Bienvenido a W3F" family="display" weight="bold" size="4xl" element="h1" />

// 2. Subtitulo de seccion
<Fonts text="Componentes disponibles" family="display" weight="semibold" size="xl" element="h2" />

// 3. Texto de codigo
<Fonts text="npm install w3f-components" family="mono" size="sm" element="code" />

// 4. Caption o leyenda
<Fonts text="Figura 1. Diagrama de componentes" family="sans" weight="light" italic size="sm" element="p" />

// 5. Configurador de tipografia dinamico
const { selectedSize, setSelectedSize, getFontClasses, FONT_SIZES } = useFonts();
<Fonts text="Preview en tiempo real" size={selectedSize} />
```

## Estructura de archivos

```
Fonts/
  Fonts.tsx         Componente principal
  Fonts.types.ts    Tipos: FontsProps, FontSize, FontFamily, FontWeight, FontOption, UseFontsReturn
  Fonts.utils.ts    FONT_SIZES_MAP, FONT_STYLES_MAP, FONT_WEIGHTS_MAP, opciones pre-generadas
  Fonts.hooks.ts    useFonts() — hook de estado para configuradores de tipografia
  README.md         Esta documentacion
```

El componente usa clases utilitarias definidas en `src/w3fussion/_typography.css` y `src/w3fussion/_utilities.css`.
