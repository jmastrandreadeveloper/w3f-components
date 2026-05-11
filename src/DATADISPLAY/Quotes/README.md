# Quotes

Componente de cita tipografica basado en `<blockquote>`. Muestra texto con barra lateral de color, fondo suave, comillas decorativas opcionales, icono personalizado y atribucion de autor.

## Importacion

```tsx
import Quotes from '@/components/DATADISPLAY/Quotes/Quotes';
```

## Uso basico

```tsx
<Quotes author="Albert Einstein">
  Imagination is more important than knowledge.
</Quotes>
```

## Via prop text (alternativa a children)

```tsx
<Quotes text="La imaginacion es mas importante que el conocimiento." author="Albert Einstein" />
```

## Variantes de color

El prop `color` controla la barra lateral izquierda y el fondo suave:

```tsx
<Quotes color="primary" author="Steve Jobs">Stay hungry, stay foolish.</Quotes>
<Quotes color="secondary" author="Marie Curie">Nothing in life is to be feared.</Quotes>
<Quotes color="success" author="Winston Churchill">Success is not final.</Quotes>
<Quotes color="warning" author="Mark Twain">The secret of getting ahead is getting started.</Quotes>
<Quotes color="danger" author="Nietzsche">What does not kill us makes us stronger.</Quotes>
<Quotes color="info" author="Socrates">The only true wisdom is knowing you know nothing.</Quotes>
<Quotes color="dark" author="Confucius">It does not matter how slowly you go.</Quotes>
<Quotes color="light" author="Anon">A simple light-themed quote.</Quotes>
```

## Tamanos

```tsx
<Quotes size="sm" color="primary" author="Autor pequeno">Cita en tamano pequeno.</Quotes>
<Quotes size="md" color="secondary" author="Autor mediano">Cita en tamano mediano (default).</Quotes>
<Quotes size="lg" color="success" author="Autor grande">Cita en tamano grande.</Quotes>
```

## Sin marca de cita

Oculta las comillas decorativas — ideal para callouts y bloques informativos:

```tsx
<Quotes showQuoteMark={false} color="info" author="Leonardo da Vinci">
  Simplicity is the ultimate sophistication.
</Quotes>
```

## Con icono personalizado

Reemplaza las comillas decorativas con cualquier componente React (ej. icono Lucide):

```tsx
import { BookOpen, Lightbulb, Heart } from 'lucide-react';

<Quotes icon={<BookOpen size={24} />} color="primary" author="Borges">
  I have always imagined that Paradise will be a kind of library.
</Quotes>

<Quotes icon={<Lightbulb size={24} />} color="warning" author="Edison">
  Genius is one percent inspiration and ninety-nine percent perspiration.
</Quotes>
```

## Sin autor

El footer del autor es opcional:

```tsx
<Quotes color="info">
  Este es un callout informativo sin atribucion de autor.
</Quotes>
```

## Clases CSS personalizadas

El componente usa clases utilitarias del framework. Para personalizar estilos adicionales:

```tsx
<Quotes color="primary" className="mi-cita-custom" author="Autor">
  Texto de la cita
</Quotes>
```

```css
.mi-cita-custom {
  border-left-width: 6px;
  padding: 1.5rem 2rem;
  font-style: italic;
}
```

## CSS Custom Properties

Quotes no tiene variables CSS propias (`--w3f-quote-*`). Usa exclusivamente clases utilitarias del framework W3Fussion:

| Clase aplicada | Descripcion |
|---|---|
| `w3f-quote` | Clase base del blockquote |
| `w3f-quote-{size}` | Variante de tamano (sm, md, lg) |
| `w3f-border-l-4` | Barra lateral izquierda de 4px |
| `w3f-border-{color}` | Color de la barra (primary, success, etc.) |
| `w3f-bg-{color}-subtle` | Fondo suave del color |
| `w3f-text-{color}` | Color de las comillas decorativas |
| `w3f-quote-content` | Contenedor del icono y texto |
| `w3f-quote-mark` | Comilla decorativa (❝) |
| `w3f-quote-icon` | Icono personalizado |
| `w3f-quote-text` | Parrafo de texto |
| `w3f-quote-author` | Footer con autor |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | **Requerido\*** Texto de la cita como children |
| `text` | `string` | — | Texto alternativo a children |
| `author` | `string` | — | Autor o fuente de la cita |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'light' \| 'dark'` | `'primary'` | Color de la barra lateral y fondo suave |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano de la cita |
| `showQuoteMark` | `boolean` | `true` | Mostrar comillas decorativas (ignorado si `icon` esta definido) |
| `icon` | `ReactNode` | — | Icono personalizado que reemplaza las comillas |
| `className` | `string` | — | Clases CSS adicionales |

\* `children` o `text` deben ser proporcionados. Si ambos estan presentes, `children` tiene prioridad.

## API

### Entrada de datos

El componente Quotes es exclusivamente de presentacion. No maneja estado ni interaccion del usuario.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Texto como hijo | `children` | `ReactNode` | Contenido principal de la cita |
| Texto como prop | `text` | `string` | Alternativa a children — util para datos dinamicos de API |
| Autor | `author` | `string` | Se muestra en un `<footer><cite>` semantico |
| Icono | `icon` | `ReactNode` | Reemplaza las comillas; acepta cualquier componente React |

### Salida de datos

El componente no emite eventos ni callbacks. Es un componente de display puro — renderiza y no interactua.

### Comunicacion con otros componentes

#### Sin dependencias

Quotes no importa ni requiere ningun otro componente del framework, Provider o Context. Funciona de forma completamente autonoma:

```tsx
// Funciona en cualquier parte del arbol React
<Quotes color="primary" author="Autor">Texto de la cita</Quotes>
```

#### Componer con iconos de Lucide

```tsx
import { Quote, Star, Heart } from 'lucide-react';

<Quotes icon={<Quote size={20} />} color="secondary">
  Una cita con icono de Lucide.
</Quotes>
```

### Accesibilidad

El componente usa HTML semantico nativo:

| Elemento | Proposito |
|---|---|
| `<blockquote>` | Elemento raiz — semanticamente indica una cita de bloque |
| `<footer>` | Contiene la atribucion del autor |
| `<cite>` | Marca semanticamente la fuente o autor |
| `aria-hidden="true"` | Las comillas decorativas (❝) y el icono estan ocultos para lectores de pantalla |

El texto de la cita esta dentro de `<p>` para estructura correcta del documento.

### Patron de uso recomendado

```tsx
// 1. Cita de testimonial con autor
<Quotes color="primary" author="Cliente satisfecho" size="lg">
  Este producto cambio completamente nuestra forma de trabajar.
</Quotes>

// 2. Callout informativo sin autor
<Quotes color="warning" showQuoteMark={false}>
  Recuerda guardar tus cambios antes de salir de la pagina.
</Quotes>

// 3. Cita con icono tematico
<Quotes icon={<BookOpen size={20} />} color="info" author="Manual de usuario">
  Lee la documentacion completa antes de comenzar la integracion.
</Quotes>

// 4. Datos dinamicos desde API
{testimonials.map(t => (
  <Quotes key={t.id} color="secondary" author={t.name} size="md">
    {t.text}
  </Quotes>
))}
```

## Estructura de archivos

```
Quotes/
  Quotes.tsx        Componente principal
  Quotes.types.ts   Tipos: QuotesProps, QuoteColor, QuoteSize
  Quotes.utils.ts   buildQuoteClasses(), getQuoteBgClass()
  README.md         Esta documentacion
```

El componente no tiene un archivo CSS propio. Utiliza clases utilitarias del framework: `w3f-border-*`, `w3f-bg-*-subtle`, `w3f-text-*` definidas en `src/w3fussion/`.
