# Capítulo 08 — Layout: Stack, Grid, Container, Flexbox

**Nivel:** Intermedio
**Tiempo estimado de lectura:** 35 minutos

---

## ¿Qué vas a aprender?

- Cómo elegir la herramienta de layout correcta para cada situación
- `Stack` — para apilar elementos en columna o fila con espaciado uniforme
- `Container` — para centrar y limitar el ancho del contenido
- `Grid` — para layouts bidimensionales con CSS Grid completo
- `FlexContainer` + `FlexItem` — para control fino sobre ejes y tamaños
- Combinar los cuatro en una página real

---

## Mapa de herramientas

Antes de entrar en detalle, acá está la regla de cuándo usar cada uno:

| Herramienta | Cuándo usarla |
|---|---|
| `Stack` | Apilar elementos en una dirección con espacio uniforme entre ellos |
| `Container` | Centrar horizontalmente el contenido y limitar su ancho máximo |
| `Grid` | Layouts de 2 ejes (filas + columnas), áreas nombradas, spans |
| `FlexContainer` | Control fino de alineación, orden y tamaño individual de items |

> **La regla de oro**: empezá con `Stack`. Si necesitás columnas + filas, pasá a `Grid`. Si necesitás control individual por item, usá `FlexContainer`. `Container` siempre envuelve el contenido de la página.

---

## Container — el envoltorio de página

`Container` aplica la clase `w3f-container` que centra el contenido horizontalmente y agrega padding lateral. Es el primer componente que ponés al entrar en el `<main>` de tu página.

### Lo que hace `w3f-container`

```css
.w3f-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--w3f-space-4);   /* 16px */
  padding-right: var(--w3f-space-4);  /* 16px */
}
```

Por sí solo no limita el ancho — se expande al 100%. Para establecer un ancho máximo, agregás una clase adicional:

| Clase | Max-width |
|---|---|
| `w3f-container-sm` | 640px |
| `w3f-container-md` | 768px |
| `w3f-container-lg` | 1024px |
| `w3f-container-xl` | 1280px |
| `w3f-container-2xl` | 1536px |

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `as` | `React.ElementType` | `'div'` | Elemento HTML a renderizar |
| `className` | `string` | — | Clases adicionales |
| `style` | `CSSProperties` | — | Estilos inline |

### Ejemplos

```tsx
import Container from '@w3f/components/LAYOUT/Container/Container'

// Contenido centrado con ancho máximo 1280px
<Container className="w3f-container-xl">
  <p>Contenido de la página</p>
</Container>

// Usando 'section' como elemento semántico
<Container as="section" className="w3f-container-lg">
  <h2>Sección del sitio</h2>
</Container>

// Contenido de formulario: más estrecho
<Container as="form" className="w3f-container-md">
  {/* campos del formulario */}
</Container>
```

### Patrón típico de página

```tsx
<body>
  <AppBar ... />

  <main>
    <Container className="w3f-container-xl">
      {/* Todo el contenido de la página va acá */}
    </Container>
  </main>
</body>
```

---

## Stack — apilar con espacio

`Stack` es el componente de layout que más vas a usar. Pone elementos uno tras otro (vertical por defecto, u horizontal) con espacio uniforme entre ellos.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `horizontal` | `boolean` | `false` | Dirección horizontal en lugar de vertical |
| `spacing` | `string` | — | Gap por token del sistema: `'2'`, `'4'`, `'6'`, `'8'`… |
| `gap` | `string` | — | Gap libre: `'1rem'`, `'24px'`. Tiene prioridad sobre `spacing` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | align-items |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | justify-content |
| `as` | `React.ElementType` | `'div'` | Elemento HTML a renderizar |
| `className` | `string` | — | Clases adicionales |
| `style` | `CSSProperties` | — | Estilos inline |

### spacing vs gap

- **`spacing`**: usa los tokens del sistema. `spacing="4"` aplica la clase `w3f-gap-4` (16px). Es el valor recomendado.
- **`gap`**: cualquier valor CSS libre. Útil cuando necesitás un valor que no existe como token.

```tsx
// Token del sistema (recomendado)
<Stack spacing="4">...</Stack>   // gap: 16px

// Valor libre
<Stack gap="0.75rem">...</Stack> // gap: 12px (no hay token para 12px)
```

### Stack vertical (default)

```tsx
import Stack from '@w3f/components/LAYOUT/Stack/Stack'

<Stack spacing="4">
  <p>Elemento 1</p>
  <p>Elemento 2</p>
  <p>Elemento 3</p>
</Stack>
```

Los tres elementos se apilan en columna con 16px de separación entre ellos.

### Stack horizontal

```tsx
// Fila de botones con espacio entre ellos
<Stack horizontal spacing="2">
  <Button variant="raised" color="primary">Guardar</Button>
  <Button variant="outline">Cancelar</Button>
</Stack>

// Alineación centrada
<Stack horizontal spacing="4" align="center">
  <img src="/avatar.png" style={{ width: 40, borderRadius: '50%' }} />
  <span>Juan Pérez</span>
</Stack>
```

### Stack con justify

```tsx
// Empuja el segundo elemento al extremo derecho
<Stack horizontal justify="between" align="center">
  <h2>Título de la sección</h2>
  <Button variant="outline" size="sm">Ver todo</Button>
</Stack>
```

### Stack anidado

Los stacks se pueden anidar para crear layouts compuestos:

```tsx
// Layout: sidebar + contenido principal
<Stack horizontal spacing="6" align="start">

  {/* Sidebar */}
  <div style={{ width: 240, flexShrink: 0 }}>
    <Stack spacing="2">
      <a href="#">Inicio</a>
      <a href="#">Proyectos</a>
      <a href="#">Contacto</a>
    </Stack>
  </div>

  {/* Área principal */}
  <div style={{ flex: 1 }}>
    <Stack spacing="6">
      <h1>Contenido</h1>
      <p>Párrafo...</p>
    </Stack>
  </div>

</Stack>
```

---

## Grid — layout bidimensional

`Grid` es un wrapper de CSS Grid que expone todas sus propiedades como props de React. Usalo cuando necesitás controlar filas y columnas al mismo tiempo.

Sub-componentes exportados:
- `Grid` — el contenedor grid
- `GridAreaItem` — un hijo con posicionamiento específico

### Props de `Grid` (las más usadas)

| Prop | Tipo | Descripción |
|---|---|---|
| `templateColumns` | `string` | `grid-template-columns` |
| `templateRows` | `string` | `grid-template-rows` |
| `templateAreas` | `string` | `grid-template-areas` |
| `gap` | `string` | Gap entre celdas (filas y columnas) |
| `rowGap` | `string` | Gap solo entre filas |
| `columnGap` | `string` | Gap solo entre columnas |
| `autoColumns` | `string` | Tamaño de columnas implícitas |
| `autoRows` | `string` | Tamaño de filas implícitas |
| `autoFlow` | `'row' \| 'column' \| 'row dense' \| 'column dense'` | Flujo automático |
| `alignItems` | `'start' \| 'end' \| 'center' \| 'stretch'` | Alineación de items |
| `justifyItems` | `'start' \| 'end' \| 'center' \| 'stretch'` | Justificación de items |

### Props de `GridAreaItem`

| Prop | Tipo | Descripción |
|---|---|---|
| `colSpan` | `number \| string` | Columnas que abarca (genera `w3f-col-span-{n}`) |
| `gridArea` | `string` | Nombre del área (para `templateAreas`) |
| `gridColumn` | `string` | Posición explícita de columna |
| `gridRow` | `string` | Posición explícita de fila |

### Grid de 3 columnas iguales

```tsx
import Grid, { GridAreaItem } from '@w3f/components/LAYOUT/Grid/Grid'

<Grid templateColumns="1fr 1fr 1fr" gap="var(--w3f-space-4)">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</Grid>

// Equivalente más conciso:
<Grid templateColumns="repeat(3, 1fr)" gap="var(--w3f-space-4)">
  ...
</Grid>
```

### Grid con colSpan (elemento que abarca varias columnas)

```tsx
<Grid templateColumns="repeat(3, 1fr)" gap="var(--w3f-space-4)">
  <GridAreaItem colSpan={3}>
    <div style={{ background: 'var(--w3f-surface)', padding: 'var(--w3f-space-4)' }}>
      Header — ocupa las 3 columnas
    </div>
  </GridAreaItem>

  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>

  <GridAreaItem colSpan={2}>
    <div>Ocupa 2 columnas</div>
  </GridAreaItem>
  <div>Col 3</div>
</Grid>
```

### Grid con áreas nombradas

Las áreas nombradas hacen el layout muy legible:

```tsx
<Grid
  templateAreas={`
    "header header header"
    "sidebar main    main"
    "footer footer  footer"
  `}
  templateColumns="240px 1fr 1fr"
  templateRows="auto 1fr auto"
  gap="var(--w3f-space-4)"
  style={{ minHeight: '100vh' }}
>
  <GridAreaItem gridArea="header">
    <AppBar color="surface" position="static">...</AppBar>
  </GridAreaItem>

  <GridAreaItem gridArea="sidebar">
    <nav>Menú lateral</nav>
  </GridAreaItem>

  <GridAreaItem gridArea="main">
    <main>Contenido principal</main>
  </GridAreaItem>

  <GridAreaItem gridArea="footer">
    <footer>Footer</footer>
  </GridAreaItem>
</Grid>
```

### Grid responsive con auto-fill

```tsx
// Las columnas se crean automáticamente según el espacio disponible
<Grid
  templateColumns="repeat(auto-fill, minmax(280px, 1fr))"
  gap="var(--w3f-space-4)"
>
  {cards.map(card => (
    <Card key={card.id} title={card.title} content={card.content} />
  ))}
</Grid>
```

Con `minmax(280px, 1fr)`:
- En mobile (360px): 1 columna
- En tablet (768px): ~2 columnas
- En desktop (1280px): ~4 columnas

Todo sin media queries.

### Grid de 12 columnas (sistema del framework)

W3F tiene clases para el sistema de 12 columnas integrado con responsive:

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--w3f-space-4)' }}>

  {/* Full width en mobile, mitad en tablet, tercio en desktop */}
  <div className="w3f-col-span-12 w3f-md:col-span-6 w3f-lg:col-span-4">
    Columna A
  </div>

  <div className="w3f-col-span-12 w3f-md:col-span-6 w3f-lg:col-span-4">
    Columna B
  </div>

  <div className="w3f-col-span-12 w3f-md:col-span-12 w3f-lg:col-span-4">
    Columna C
  </div>

</div>
```

| Clase | Efecto |
|---|---|
| `w3f-col-span-{1..12}` | Siempre (mobile-first) |
| `w3f-sm:col-span-{n}` | Desde 640px |
| `w3f-md:col-span-{n}` | Desde 768px |
| `w3f-lg:col-span-{n}` | Desde 1024px |
| `w3f-xl:col-span-{n}` | Desde 1280px |

---

## FlexContainer — control fino

`FlexContainer` es el wrapper de CSS Flexbox con control total. Usalo cuando `Stack` no alcanza — por ejemplo cuando necesitás que un item tenga un tamaño específico, que otro se empuje al final, o que los items crezcan de forma diferente.

Sub-componentes exportados:
- `FlexContainer` — el contenedor flex
- `FlexItem` — item con control de crecimiento y orden
- `FlexBoxItem` — caja visual predefinida (útil para prototipos)

### Props de `FlexContainer`

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `direction` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` | flex-direction |
| `wrap` | `boolean \| 'wrap' \| 'nowrap' \| 'wrap-reverse'` | `false` | flex-wrap |
| `justifyContent` | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `'start'` | justify-content |
| `alignItems` | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'stretch'` | align-items |
| `gap` | `string \| number` | — | Gap entre items |
| `inline` | `boolean` | `false` | `display: inline-flex` |

### Props de `FlexItem`

| Prop | Tipo | Descripción |
|---|---|---|
| `grow` | `number \| boolean` | flex-grow |
| `shrink` | `number \| boolean` | flex-shrink |
| `basis` | `string` | flex-basis: `'200px'`, `'30%'`, `'auto'` |
| `order` | `number \| string` | Orden visual del item |
| `mlAuto` | `boolean` | `margin-left: auto` — empuja el item al extremo derecho |
| `mrAuto` | `boolean` | `margin-right: auto` — empuja el item al extremo izquierdo |
| `alignSelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | Alineación individual |

### Ejemplos

```tsx
import {
  FlexContainer,
  FlexItem,
} from '@w3f/components/LAYOUT/Flexbox/Flexbox'

// Barra de herramientas: logo + nav + botones
<FlexContainer justifyContent="between" alignItems="center" gap="var(--w3f-space-4)">
  <FlexItem>
    <span className="w3f-font-bold">Logo</span>
  </FlexItem>

  <FlexItem grow={1}>
    <nav>Menú de navegación</nav>
  </FlexItem>

  <FlexItem>
    <Button variant="raised" color="primary" size="sm">Login</Button>
  </FlexItem>
</FlexContainer>
```

```tsx
// Sidebar fija + contenido que crece
<FlexContainer gap="var(--w3f-space-6)" alignItems="start">

  <FlexItem basis="240px" shrink={0}>
    <aside>Sidebar (ancho fijo)</aside>
  </FlexItem>

  <FlexItem grow={1}>
    <main>Contenido principal (crece al espacio disponible)</main>
  </FlexItem>

</FlexContainer>
```

```tsx
// Lista de tags que wrappean
<FlexContainer wrap gap="var(--w3f-space-2)">
  {tags.map(tag => (
    <FlexItem key={tag}>
      <Chip label={tag} />
    </FlexItem>
  ))}
</FlexContainer>
```

```tsx
// mlAuto — elemento empujado al final
<FlexContainer alignItems="center" gap="var(--w3f-space-2)">
  <span>Nombre del usuario</span>
  <Avatar size="sm" />
  <FlexItem mlAuto>
    <Button variant="flat" size="xs">Salir</Button>
  </FlexItem>
</FlexContainer>
```

### Stack vs FlexContainer

`Stack` es un wrapper de `FlexContainer` simplificado. Esta tabla muestra cuándo usar cada uno:

| Caso | Usar |
|---|---|
| Simplemente apilar elementos con el mismo espacio | `Stack` |
| Fila de botones con espacio uniforme | `Stack horizontal` |
| Un item tiene ancho fijo y el otro crece | `FlexContainer + FlexItem` |
| Items con `wrap` automático | `FlexContainer wrap` |
| Empujar un item al extremo (mlAuto) | `FlexContainer + FlexItem mlAuto` |
| Items de tamaños completamente distintos | `FlexContainer + FlexItem basis` |

---

## Combinando los cuatro — layout de página típico

Esta es la estructura que vas a usar en la mayoría de las páginas:

```tsx
import Container   from '@w3f/components/LAYOUT/Container/Container'
import Stack       from '@w3f/components/LAYOUT/Stack/Stack'
import Grid, { GridAreaItem } from '@w3f/components/LAYOUT/Grid/Grid'
import { FlexContainer, FlexItem } from '@w3f/components/LAYOUT/Flexbox/Flexbox'
import AppBar, { AppBarLeading, AppBarTitle, AppBarTrailing } from '@w3f/components/SURFACES/AppBar/AppBar'
import Button from '@w3f/components/INPUTS/Button/Button'
import Card   from '@w3f/components/DATADISPLAY/Card/Card'

const CARDS = [
  { title: 'Usuarios',   content: '1.284 registrados esta semana.' },
  { title: 'Ventas',     content: '$ 23.410 en los últimos 7 días.' },
  { title: 'Tickets',    content: '42 abiertos, 8 críticos.' },
  { title: 'Uptime',     content: '99.97% en los últimos 30 días.' },
]

export default function PaginaLayout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--w3f-background)' }}>

      {/* 1. AppBar — fuera del Container para que sea full-width */}
      <AppBar color="surface" position="sticky">
        <AppBarLeading>
          <span className="w3f-font-bold w3f-text-primary"
            style={{ fontSize: 'var(--w3f-text-lg)' }}>W3F</span>
        </AppBarLeading>
        <AppBarTitle>Panel de control</AppBarTitle>
        <AppBarTrailing>
          <Button variant="outline" size="sm" color="primary">Perfil</Button>
        </AppBarTrailing>
      </AppBar>

      {/* 2. Container — centra y limita el ancho */}
      <Container className="w3f-container-xl" style={{ paddingTop: 'var(--w3f-space-6)' }}>

        {/* 3. Stack — secciones verticales de la página */}
        <Stack spacing="8">

          {/* Encabezado de sección con botón a la derecha */}
          <FlexContainer justifyContent="between" alignItems="center">
            <div>
              <h1 className="w3f-font-bold"
                style={{ fontSize: 'var(--w3f-text-2xl)', color: 'var(--w3f-on-background)', margin: 0 }}>
                Dashboard
              </h1>
              <p className="w3f-text-sm w3f-mt-1" style={{ color: 'var(--w3f-outline)' }}>
                Vista general del sistema
              </p>
            </div>
            <Button variant="raised" color="primary" size="sm">
              Nuevo proyecto
            </Button>
          </FlexContainer>

          {/* 4. Grid — grilla de cards con auto-fill responsive */}
          <section>
            <h2 className="w3f-font-semibold w3f-mb-4"
              style={{ fontSize: 'var(--w3f-text-base)', color: 'var(--w3f-on-background)' }}>
              Métricas
            </h2>
            <Grid
              templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
              gap="var(--w3f-space-4)"
            >
              {CARDS.map(card => (
                <Card key={card.title} title={card.title} content={card.content}
                  variant="raised" elevation={1} />
              ))}
            </Grid>
          </section>

          {/* Sección de 2 columnas: contenido + aside */}
          <Grid templateColumns="1fr 320px" gap="var(--w3f-space-6)">

            {/* Columna principal */}
            <Stack spacing="4">
              <h2 className="w3f-font-semibold"
                style={{ fontSize: 'var(--w3f-text-base)', color: 'var(--w3f-on-background)' }}>
                Actividad reciente
              </h2>
              {['Proyecto A creado', 'Usuario B se unió', 'Deploy completado'].map((item, i) => (
                <div key={i} style={{
                  padding: 'var(--w3f-space-3)',
                  background: 'var(--w3f-surface)',
                  borderRadius: 'var(--w3f-radius-lg)',
                  border: '1px solid var(--w3f-outline-variant)',
                  color: 'var(--w3f-on-surface)',
                  fontSize: 'var(--w3f-text-sm)',
                }}>
                  {item}
                </div>
              ))}
            </Stack>

            {/* Sidebar derecho */}
            <Stack spacing="4">
              <h2 className="w3f-font-semibold"
                style={{ fontSize: 'var(--w3f-text-base)', color: 'var(--w3f-on-background)' }}>
                Acciones rápidas
              </h2>
              <Stack spacing="2">
                <Button variant="raised" color="primary">Nuevo usuario</Button>
                <Button variant="outline" color="secondary">Exportar reporte</Button>
                <Button variant="flat">Ver logs</Button>
              </Stack>
            </Stack>

          </Grid>

        </Stack>
      </Container>
    </div>
  )
}
```

---

## Ejercicio práctico

Construí un layout de **página de blog** con esta estructura:

```
┌─────────────────────────────────────┐
│  AppBar: [Mi Blog]        [Suscribir]│
├─────────────────────────────────────┤
│                                     │
│  Últimas publicaciones   [Buscar]   │  ← FlexContainer between
│                                     │
│  ┌─────────┐┌─────────┐┌─────────┐ │  ← Grid auto-fill
│  │Post 1   ││Post 2   ││Post 3   │ │
│  │...      ││...      ││...      │ │
│  └─────────┘└─────────┘└─────────┘ │
│                                     │
│  ┌────────────────┐ ┌────────────┐ │  ← Grid 2 cols
│  │ Post destacado │ │ Categorías │ │
│  │ (col span 2)   │ │            │ │
│  └────────────────┘ └────────────┘ │
└─────────────────────────────────────┘
```

### Restricciones
- Usá `Container` con `w3f-container-lg` para limitar el ancho
- Usá `Stack spacing="8"` para las secciones principales
- El header "Últimas publicaciones / Buscar" debe usar `FlexContainer` con `justifyContent="between"`
- Los 3 posts: `Grid` con `repeat(auto-fill, minmax(280px, 1fr))`
- La sección inferior: `Grid` con `templateColumns="2fr 1fr"` y `GridAreaItem` para el post destacado

### Solución

```tsx
import Container         from '@w3f/components/LAYOUT/Container/Container'
import Stack             from '@w3f/components/LAYOUT/Stack/Stack'
import Grid, { GridAreaItem } from '@w3f/components/LAYOUT/Grid/Grid'
import { FlexContainer } from '@w3f/components/LAYOUT/Flexbox/Flexbox'
import AppBar, { AppBarLeading, AppBarTitle, AppBarTrailing } from '@w3f/components/SURFACES/AppBar/AppBar'
import Button from '@w3f/components/INPUTS/Button/Button'
import Card   from '@w3f/components/DATADISPLAY/Card/Card'

const POSTS = [
  { title: 'Primeros pasos con React 19', content: 'Exploramos las nuevas features...' },
  { title: 'CSS Grid en la práctica',     content: 'Layouts complejos sin frameworks...' },
  { title: 'TypeScript avanzado',         content: 'Tipos genéricos y condicionales...' },
]

export default function BlogLayout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--w3f-background)' }}>

      <AppBar color="primary" position="sticky">
        <AppBarLeading>
          <span className="w3f-font-bold" style={{ fontSize: 'var(--w3f-text-lg)', color: 'white' }}>
            Mi Blog
          </span>
        </AppBarLeading>
        <AppBarTitle>Tecnología y diseño</AppBarTitle>
        <AppBarTrailing>
          <Button variant="flat" size="sm">Suscribir</Button>
        </AppBarTrailing>
      </AppBar>

      <Container className="w3f-container-lg" style={{ paddingTop: 'var(--w3f-space-6)' }}>
        <Stack spacing="8">

          {/* Encabezado con búsqueda */}
          <FlexContainer justifyContent="between" alignItems="center">
            <h1 className="w3f-font-bold"
              style={{ fontSize: 'var(--w3f-text-2xl)', color: 'var(--w3f-on-background)', margin: 0 }}>
              Últimas publicaciones
            </h1>
            <Button variant="outline" size="sm">Buscar</Button>
          </FlexContainer>

          {/* Grid de posts */}
          <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="var(--w3f-space-4)">
            {POSTS.map(post => (
              <Card key={post.title} title={post.title} content={post.content}
                variant="raised" elevation={1} />
            ))}
          </Grid>

          {/* Post destacado + categorías */}
          <Grid templateColumns="2fr 1fr" gap="var(--w3f-space-6)">
            <Card
              title="Post destacado: Diseño de sistemas"
              content="Un sistema de diseño bien construido acelera el desarrollo, mejora la consistencia visual y reduce las decisiones repetitivas."
              variant="outlined"
              elevation={0}
            />

            <Stack spacing="3">
              <h3 className="w3f-font-semibold"
                style={{ fontSize: 'var(--w3f-text-sm)', color: 'var(--w3f-on-background)', margin: 0 }}>
                Categorías
              </h3>
              {['React', 'CSS', 'TypeScript', 'Performance', 'Diseño'].map(cat => (
                <div key={cat} style={{
                  padding: 'var(--w3f-space-2) var(--w3f-space-3)',
                  background: 'var(--w3f-surface)',
                  border: '1px solid var(--w3f-outline-variant)',
                  borderRadius: 'var(--w3f-radius-lg)',
                  color: 'var(--w3f-on-surface)',
                  fontSize: 'var(--w3f-text-sm)',
                  cursor: 'pointer',
                }}>
                  {cat}
                </div>
              ))}
            </Stack>
          </Grid>

        </Stack>
      </Container>
    </div>
  )
}
```

---

## Referencia rápida

### Patrones de uso más comunes

```tsx
// Apilar secciones de una página
<Stack spacing="8"> ... </Stack>

// Fila de elementos con espacio
<Stack horizontal spacing="4"> ... </Stack>

// Título + botón en extremos opuestos
<Stack horizontal justify="between" align="center"> ... </Stack>

// Centrar y limitar ancho de página
<Container className="w3f-container-xl"> ... </Container>

// Grid responsive sin media queries
<Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="1rem"> ... </Grid>

// Grid con áreas (layout complejo)
<Grid templateAreas={`"sidebar main"`} templateColumns="240px 1fr"> ... </Grid>

// Item con ancho fijo + item que crece
<FlexContainer>
  <FlexItem basis="240px" shrink={0}>Sidebar</FlexItem>
  <FlexItem grow={1}>Main</FlexItem>
</FlexContainer>

// Tags que wrappean
<FlexContainer wrap gap="0.5rem"> ... </FlexContainer>
```

### Colores de contenedor del sistema

```css
background: var(--w3f-background)  /* página */
background: var(--w3f-surface)     /* cards, paneles */
```

---

## En Next.js

Los componentes de layout (`Stack`, `Container`, `Grid`, `FlexContainer`) son estructurales — no usan eventos de browser ni hooks complejos. En teoría, un archivo que solo los use como envoltorios estáticos puede ser Server Component.

En la práctica, cualquier página que combine layout con inputs, botones o lógica de estado necesita `'use client'`:

```tsx
'use client'  // ← necesario cuando el archivo tiene useState, onClick, etc.

import Container   from '@w3f/components/LAYOUT/Container/Container'
import Stack       from '@w3f/components/LAYOUT/Stack/Stack'
import { Grid }    from '@w3f/components/LAYOUT/Grid/Grid'
import Button      from '@w3f/components/INPUTS/Button/Button'
import { useState } from 'react'

export default function MiPagina() {
  const [abierto, setAbierto] = useState(false)

  return (
    <Container>
      <Stack gap="1.5rem">
        <Grid templateColumns="1fr 1fr" gap="1rem">
          {/* ... */}
        </Grid>
        <Button onClick={() => setAbierto(true)}>Abrir</Button>
      </Stack>
    </Container>
  )
}
```

**Regla práctica:** si dudás, agregá `'use client'`. El costo de rendimiento es mínimo para páginas de aplicación. Reservá los Server Components puros para páginas de solo contenido (blogs, marketing) donde no hay interactividad.

---

## Siguiente paso

[Capítulo 09 — Inputs básicos](09-inputs-basicos.md)

Vas a aprender los 6 inputs más usados del framework: Button, Input, Select, Checkbox, RadioButton y SlideToggle.
