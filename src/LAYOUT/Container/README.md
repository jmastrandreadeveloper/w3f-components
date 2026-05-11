# Container

Contenedor de anchura maxima responsivo basado en la filosofia w3-container. Aplica la clase `w3f-container` que centra el contenido con un `max-width` y padding lateral. Admite polimorfismo mediante la prop `as` para renderizar cualquier elemento HTML semantico.

## Importacion

```tsx
import Container from '@/components/LAYOUT/Container/Container';
```

## Uso basico

```tsx
<Container>
  <p>Contenido centrado con anchura maxima</p>
</Container>
```

## Polimorfismo (prop as)

Container puede renderizar como cualquier elemento HTML. Por defecto es `div`:

```tsx
<Container as="section">
  <h2>Seccion semantica</h2>
</Container>

<Container as="article">
  <p>Articulo semantico</p>
</Container>

<Container as="main">
  <p>Contenido principal de la pagina</p>
</Container>

<Container as="header">
  <p>Cabecera de pagina</p>
</Container>
```

## Con className personalizado

```tsx
<Container className="w3f-py-8 demo-font-inter">
  <p>Con clases utilitarias adicionales</p>
</Container>
```

## Con style inline

```tsx
<Container style={{ background: 'var(--w3f-primary-50)' }}>
  <p>Fondo personalizado</p>
</Container>
```

## CSS

El componente aplica la clase `w3f-container` que define:
- `max-width` responsivo (1200px por defecto)
- `margin: 0 auto` para centrado horizontal
- `padding` lateral horizontal

No expone CSS custom properties propias — usa clases utilitarias `w3f-*` para personalizar padding, margen y fondo.

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del contenedor |
| `as` | `React.ElementType` | `'div'` | Elemento HTML a renderizar |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | — | Estilos inline adicionales |

## API

### Entrada de datos

Container es un componente de presentacion pura. No gestiona estado ni datos — solo envuelve contenido.

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Children | `children` | `ReactNode` | Cualquier contenido React |
| Elemento | `as` | `React.ElementType` | Tipo de nodo DOM a renderizar |

### Salida de datos

Container no emite eventos ni callbacks. Es un contenedor pasivo.

### Patron de uso recomendado

```tsx
// 1. Pagina con layout principal
<Container as="main" className="w3f-py-8">
  <SectionTitle title="Mi Pagina" />
  <Section title="Contenido">
    ...
  </Section>
</Container>

// 2. Formulario semantico
<Container as="form" onSubmit={handleSubmit}>
  <Input name="email" />
  <Button type="submit">Enviar</Button>
</Container>

// 3. Articulo de blog
<Container as="article" className="w3f-prose">
  <h1>Titulo</h1>
  <p>Contenido...</p>
</Container>
```

### Accesibilidad

El polimorfismo permite usar elementos semanticos correctos (`main`, `section`, `article`, `header`, `footer`, `nav`) que mejoran la estructura del documento para lectores de pantalla y motores de busqueda.

## Estructura de archivos

```
Container/
  Container.tsx            Componente principal
  Container.types.ts       Interfaces TypeScript
  Container.constants.ts   Clase CSS base (w3f-container) y defaults
  Container.hooks.ts       useContainerProps (procesa className)
  Container.utils.ts       buildContainerClass()
  README.md                Esta documentacion
```

CSS: `src/w3fussion/LAYOUT/_container.css`
