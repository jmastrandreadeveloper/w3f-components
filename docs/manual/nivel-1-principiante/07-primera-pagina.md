# Capítulo 07 — Primera página completa

**Nivel:** Principiante
**Tiempo estimado de lectura:** 30 minutos

---

## ¿Qué vas a aprender?

- Cómo estructurar una página real combinando múltiples componentes
- Usar `AppBar` como barra de navegación superior
- Armar el layout principal con `Stack`
- Mostrar contenido con `Card` y mensajes con `Note`
- Implementar un toggle de dark mode funcional
- Cómo el sistema de tokens hace que todo "encaje" visualmente

---

## El objetivo

Al final de este capítulo vas a tener esto funcionando:

```
┌──────────────────────────────────────────────┐
│  AppBar: [W3F App]              [Claro/Oscuro]│
├──────────────────────────────────────────────┤
│                                              │
│  Bienvenido al dashboard                    │
│                                              │
│  [Nota informativa]                         │
│                                              │
│  ┌───────────────┐  ┌───────────────┐       │
│  │ Card Usuarios │  │ Card Ventas   │       │
│  │      128      │  │    $ 4.320    │       │
│  │ [Ver detalles]│  │ [Ver detalles]│       │
│  └───────────────┘  └───────────────┘       │
│                                              │
│  ┌────────────────────────────────────┐     │
│  │ Card Actividad reciente            │     │
│  │ Últimas acciones del sistema       │     │
│  │                          [Exportar]│     │
│  └────────────────────────────────────┘     │
└──────────────────────────────────────────────┘
```

---

## Los componentes que vamos a usar

Repaso rápido de lo que ya conocés más dos componentes nuevos:

| Componente | Ruta de import | Para qué |
|---|---|---|
| `AppBar` | `@w3f/components/SURFACES/AppBar/AppBar` | Barra de navegación superior |
| `AppBarLeading` | (mismo archivo) | Slot izquierdo del AppBar |
| `AppBarTitle` | (mismo archivo) | Slot central/título del AppBar |
| `AppBarTrailing` | (mismo archivo) | Slot derecho del AppBar |
| `Stack` | `@w3f/components/LAYOUT/Stack/Stack` | Layout vertical u horizontal |
| `Button` | `@w3f/components/INPUTS/Button/Button` | Acciones |
| `Card` | `@w3f/components/DATADISPLAY/Card/Card` | Contenedores de contenido |
| `Note` | `@w3f/components/DATADISPLAY/Note/Note` | Mensajes informativos inline |

---

## AppBar — barra de navegación

El `AppBar` divide su espacio en tres slots:

```
┌──────────────────────────────────────┐
│  Leading    │      Title     │Trailing│
└──────────────────────────────────────┘
```

### Props principales

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `color` | `'primary' \| 'secondary' \| 'surface' \| 'transparent' \| 'dark'` | `'primary'` | Color de fondo |
| `position` | `'fixed' \| 'sticky' \| 'static' \| 'relative'` | `'fixed'` | Posición CSS |
| `elevation` | `number` | `4` | Nivel de sombra (0–24) |

### Ejemplo básico

```tsx
import AppBar, {
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
} from '@w3f/components/SURFACES/AppBar/AppBar'
import Button from '@w3f/components/INPUTS/Button/Button'

function MiNavbar() {
  return (
    <AppBar color="primary" position="sticky">
      <AppBarLeading>
        {/* Icono de menu o logo */}
        <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>W3F</span>
      </AppBarLeading>

      <AppBarTitle>
        Mi Aplicación
      </AppBarTitle>

      <AppBarTrailing>
        <Button variant="flat" color="primary" size="sm">
          Cerrar sesión
        </Button>
      </AppBarTrailing>
    </AppBar>
  )
}
```

Con `position="sticky"` el AppBar se queda visible al hacer scroll pero no saca espacio del layout — recomendado para la mayoría de los casos.

Con `position="fixed"` el AppBar flota sobre el contenido y necesitás agregar `padding-top` al cuerpo de la página.

---

## Note — mensajes inline

El componente `Note` muestra un bloque de aviso con icono y color según el tipo.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `type` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Variante visual |
| `title` | `string` | — | Título en negrita (opcional) |
| `children` | `ReactNode` | — | Contenido del mensaje |

```tsx
import Note from '@w3f/components/DATADISPLAY/Note/Note'

// Informativo
<Note type="info" title="Recordatorio">
  Tu suscripción vence el 30 de junio.
</Note>

// Éxito
<Note type="success" title="Guardado">
  Los cambios se guardaron correctamente.
</Note>

// Advertencia
<Note type="warning" title="Atención">
  Quedan 3 usuarios disponibles en tu plan.
</Note>

// Error
<Note type="danger" title="Error">
  No se pudo conectar al servidor. Intentá de nuevo.
</Note>
```

---

## Card — contenedor de contenido

El componente `Card` agrupa información relacionada dentro de un contenedor con borde y sombra.

### Props principales

| Prop | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Título de la card |
| `content` | `string` | Texto del cuerpo |
| `elevation` | `number` | Nivel de sombra (0–5) |
| `variant` | `'raised' \| 'outlined' \| 'flat'` | Estilo visual |

> **Nota:** `Card` usa la prop `content` para el texto del cuerpo, no `children`.
> Si necesitás contenido complejo (botones, listas, etc.) agregalo después de la Card o usá un `div` con tokens como se ve en los ejemplos de abajo.

---

## Armando la página paso a paso

### Paso 1 — Estructura base y estado

Empezamos con el esqueleto del componente: el contenedor raíz con dark mode y el estado para controlarlo.

```tsx
import { useState } from 'react'

export default function Dashboard() {
  const [dark, setDark] = useState(false)

  return (
    <div
      className={dark ? 'w3f-theme-dark' : ''}
      style={{
        minHeight: '100vh',
        background: 'var(--w3f-background)',
      }}
    >
      {/* Contenido va acá */}
    </div>
  )
}
```

### Paso 2 — AppBar con toggle de tema

```tsx
import AppBar, {
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
} from '@w3f/components/SURFACES/AppBar/AppBar'
import Button from '@w3f/components/INPUTS/Button/Button'

// Dentro del return:
<AppBar color="surface" position="sticky">
  <AppBarLeading>
    <span
      className="w3f-font-bold w3f-text-primary"
      style={{ fontSize: 'var(--w3f-text-lg)' }}
    >
      W3F App
    </span>
  </AppBarLeading>

  <AppBarTitle>
    Dashboard
  </AppBarTitle>

  <AppBarTrailing>
    <Button
      variant="outline"
      size="sm"
      onClick={() => setDark(d => !d)}
    >
      {dark ? 'Modo claro' : 'Modo oscuro'}
    </Button>
  </AppBarTrailing>
</AppBar>
```

Usamos `color="surface"` para que el AppBar use los colores de superficie y respete el dark mode automáticamente.

### Paso 3 — Layout principal con Stack

```tsx
import Stack from '@w3f/components/LAYOUT/Stack/Stack'

// Después del AppBar:
<main style={{ padding: 'var(--w3f-space-6)' }}>
  <Stack spacing="6">

    {/* Título de sección */}
    <div>
      <h1
        className="w3f-font-bold"
        style={{
          fontSize: 'var(--w3f-text-2xl)',
          color: 'var(--w3f-on-background)',
          margin: 0,
        }}
      >
        Bienvenido al dashboard
      </h1>
      <p
        className="w3f-text-sm w3f-mt-1"
        style={{ color: 'var(--w3f-outline)' }}
      >
        Resumen del sistema al día de hoy
      </p>
    </div>

    {/* Nota informativa */}
    {/* Cards y contenido — siguientes pasos */}

  </Stack>
</main>
```

### Paso 4 — Note informativo

```tsx
import Note from '@w3f/components/DATADISPLAY/Note/Note'

// Dentro del Stack, después del título:
<Note type="info" title="Actualización disponible">
  Hay una nueva versión del sistema. Actualizá para acceder a las últimas mejoras.
</Note>
```

### Paso 5 — Fila de cards métricas

Para mostrar dos cards en fila usamos un `Stack` horizontal:

```tsx
import Card from '@w3f/components/DATADISPLAY/Card/Card'

// Fila de métricas:
<Stack horizontal gap="var(--w3f-space-4)">
  <div style={{ flex: 1 }}>
    <Card
      title="Usuarios activos"
      content="128 usuarios conectados en las últimas 24 horas."
      variant="raised"
      elevation={2}
    />
    <div className="w3f-mt-2">
      <Button variant="flat" size="sm" color="primary">
        Ver detalles
      </Button>
    </div>
  </div>

  <div style={{ flex: 1 }}>
    <Card
      title="Ventas del mes"
      content="$ 4.320 acumulados. Meta mensual: $ 5.000 (86%)."
      variant="raised"
      elevation={2}
    />
    <div className="w3f-mt-2">
      <Button variant="flat" size="sm" color="secondary">
        Ver detalles
      </Button>
    </div>
  </div>
</Stack>
```

### Paso 6 — Card de actividad con botón de acción

```tsx
// Card con layout interno personalizado:
<div
  style={{
    background: 'var(--w3f-surface)',
    border: '1px solid var(--w3f-outline-variant)',
    borderRadius: 'var(--w3f-radius-xl)',
    padding: 'var(--w3f-space-5)',
    boxShadow: 'var(--w3f-shadow)',
  }}
>
  {/* Encabezado con título y botón */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'var(--w3f-space-3)',
    }}
  >
    <h2
      className="w3f-font-semibold"
      style={{
        fontSize: 'var(--w3f-text-base)',
        color: 'var(--w3f-on-surface)',
        margin: 0,
      }}
    >
      Actividad reciente
    </h2>
    <Button variant="outline" size="xs" color="primary">
      Exportar
    </Button>
  </div>

  {/* Lista de actividad */}
  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
    {[
      { texto: 'Usuario admin inició sesión', tiempo: 'hace 5 min' },
      { texto: 'Nuevo pedido #1042 creado', tiempo: 'hace 12 min' },
      { texto: 'Reporte mensual generado', tiempo: 'hace 1 hora' },
    ].map((item, i) => (
      <li
        key={i}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 'var(--w3f-space-2) 0',
          borderBottom: i < 2 ? '1px solid var(--w3f-outline-variant)' : 'none',
          color: 'var(--w3f-on-surface)',
          fontSize: 'var(--w3f-text-sm)',
        }}
      >
        <span>{item.texto}</span>
        <span style={{ color: 'var(--w3f-outline)' }}>{item.tiempo}</span>
      </li>
    ))}
  </ul>
</div>
```

---

## Código completo

Uniendo todos los pasos:

```tsx
import { useState } from 'react'
import AppBar, {
  AppBarLeading,
  AppBarTitle,
  AppBarTrailing,
} from '@w3f/components/SURFACES/AppBar/AppBar'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import Button from '@w3f/components/INPUTS/Button/Button'
import Card   from '@w3f/components/DATADISPLAY/Card/Card'
import Note   from '@w3f/components/DATADISPLAY/Note/Note'

const ACTIVIDAD = [
  { texto: 'Usuario admin inició sesión',  tiempo: 'hace 5 min'  },
  { texto: 'Nuevo pedido #1042 creado',    tiempo: 'hace 12 min' },
  { texto: 'Reporte mensual generado',     tiempo: 'hace 1 hora' },
]

export default function Dashboard() {
  const [dark, setDark] = useState(false)

  return (
    <div
      className={dark ? 'w3f-theme-dark' : ''}
      style={{ minHeight: '100vh', background: 'var(--w3f-background)' }}
    >
      {/* Barra de navegación */}
      <AppBar color="surface" position="sticky">
        <AppBarLeading>
          <span
            className="w3f-font-bold w3f-text-primary"
            style={{ fontSize: 'var(--w3f-text-lg)' }}
          >
            W3F App
          </span>
        </AppBarLeading>

        <AppBarTitle>Dashboard</AppBarTitle>

        <AppBarTrailing>
          <Button variant="outline" size="sm" onClick={() => setDark(d => !d)}>
            {dark ? 'Modo claro' : 'Modo oscuro'}
          </Button>
        </AppBarTrailing>
      </AppBar>

      {/* Contenido principal */}
      <main style={{ padding: 'var(--w3f-space-6)' }}>
        <Stack spacing="6">

          {/* Encabezado */}
          <div>
            <h1
              className="w3f-font-bold"
              style={{
                fontSize: 'var(--w3f-text-2xl)',
                color: 'var(--w3f-on-background)',
                margin: 0,
              }}
            >
              Bienvenido al dashboard
            </h1>
            <p
              className="w3f-text-sm w3f-mt-1"
              style={{ color: 'var(--w3f-outline)' }}
            >
              Resumen del sistema al día de hoy
            </p>
          </div>

          {/* Nota */}
          <Note type="info" title="Actualización disponible">
            Hay una nueva versión del sistema. Actualizá para acceder a las últimas mejoras.
          </Note>

          {/* Fila de métricas */}
          <Stack horizontal gap="var(--w3f-space-4)">
            <div style={{ flex: 1 }}>
              <Card
                title="Usuarios activos"
                content="128 usuarios conectados en las últimas 24 horas."
                variant="raised"
                elevation={2}
              />
              <div className="w3f-mt-2">
                <Button variant="flat" size="sm" color="primary">Ver detalles</Button>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Card
                title="Ventas del mes"
                content="$ 4.320 acumulados. Meta mensual: $ 5.000 (86%)."
                variant="raised"
                elevation={2}
              />
              <div className="w3f-mt-2">
                <Button variant="flat" size="sm" color="secondary">Ver detalles</Button>
              </div>
            </div>
          </Stack>

          {/* Card de actividad */}
          <div
            style={{
              background: 'var(--w3f-surface)',
              border: '1px solid var(--w3f-outline-variant)',
              borderRadius: 'var(--w3f-radius-xl)',
              padding: 'var(--w3f-space-5)',
              boxShadow: 'var(--w3f-shadow)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--w3f-space-3)',
              }}
            >
              <h2
                className="w3f-font-semibold"
                style={{
                  fontSize: 'var(--w3f-text-base)',
                  color: 'var(--w3f-on-surface)',
                  margin: 0,
                }}
              >
                Actividad reciente
              </h2>
              <Button variant="outline" size="xs" color="primary">Exportar</Button>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {ACTIVIDAD.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 'var(--w3f-space-2) 0',
                    borderBottom: i < ACTIVIDAD.length - 1
                      ? '1px solid var(--w3f-outline-variant)'
                      : 'none',
                    color: 'var(--w3f-on-surface)',
                    fontSize: 'var(--w3f-text-sm)',
                  }}
                >
                  <span>{item.texto}</span>
                  <span style={{ color: 'var(--w3f-outline)' }}>{item.tiempo}</span>
                </li>
              ))}
            </ul>
          </div>

        </Stack>
      </main>
    </div>
  )
}
```

---

## Por qué el dark mode funciona solo

Cuando agregás `w3f-theme-dark` al contenedor raíz, el framework redefine los tokens de superficie dentro de ese scope:

```css
.w3f-theme-dark {
  --w3f-background: #111827;
  --w3f-surface:    #1f2937;
  --w3f-on-surface: #f3f4f6;
  --w3f-outline:    #4b5563;
  /* etc. */
}
```

Como toda tu página usa `var(--w3f-background)`, `var(--w3f-surface)`, etc., todos los elementos responden al cambio automáticamente — sin CSS extra de tu parte.

Los componentes (`AppBar`, `Card`, `Note`, `Button`) también leen estos mismos tokens, por eso también cambian solos.

---

## Ejercicio práctico

Modificá el `Dashboard` para que:

1. Tenga un tercer card de métrica — "Incidencias abiertas" con el valor `7` y color `danger`
2. La `Note` cambie de `info` a `warning` si hay más de 5 incidencias abiertas
3. El botón "Exportar" muestre una `Note` de `success` debajo de la lista al hacer click

### Pistas

- Usá `useState` para guardar la cantidad de incidencias y si se exportó
- La condición del Note puede ser: `type={incidencias > 5 ? 'warning' : 'info'}`
- Para mostrar/ocultar el Note de éxito: `{exportado && <Note type="success">...</Note>}`

### Solución

```tsx
export default function DashboardEjercicio() {
  const [dark, setDark]         = useState(false)
  const [exportado, setExportado] = useState(false)
  const incidencias              = 7  // podría venir de una API

  return (
    <div
      className={dark ? 'w3f-theme-dark' : ''}
      style={{ minHeight: '100vh', background: 'var(--w3f-background)' }}
    >
      <AppBar color="surface" position="sticky">
        <AppBarLeading>
          <span className="w3f-font-bold w3f-text-primary"
            style={{ fontSize: 'var(--w3f-text-lg)' }}>W3F App</span>
        </AppBarLeading>
        <AppBarTitle>Dashboard</AppBarTitle>
        <AppBarTrailing>
          <Button variant="outline" size="sm" onClick={() => setDark(d => !d)}>
            {dark ? 'Modo claro' : 'Modo oscuro'}
          </Button>
        </AppBarTrailing>
      </AppBar>

      <main style={{ padding: 'var(--w3f-space-6)' }}>
        <Stack spacing="6">

          <div>
            <h1 className="w3f-font-bold"
              style={{ fontSize: 'var(--w3f-text-2xl)', color: 'var(--w3f-on-background)', margin: 0 }}>
              Bienvenido al dashboard
            </h1>
          </div>

          {/* Note condicional */}
          <Note
            type={incidencias > 5 ? 'warning' : 'info'}
            title={incidencias > 5 ? 'Atención' : 'Actualización disponible'}
          >
            {incidencias > 5
              ? `Hay ${incidencias} incidencias abiertas que requieren atención.`
              : 'Hay una nueva versión del sistema disponible.'}
          </Note>

          {/* Tres cards en fila */}
          <Stack horizontal gap="var(--w3f-space-4)">
            <div style={{ flex: 1 }}>
              <Card title="Usuarios activos"
                content="128 usuarios en las últimas 24 horas."
                variant="raised" elevation={2} />
              <div className="w3f-mt-2">
                <Button variant="flat" size="sm" color="primary">Ver detalles</Button>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Card title="Ventas del mes"
                content="$ 4.320 acumulados. Meta: $ 5.000 (86%)."
                variant="raised" elevation={2} />
              <div className="w3f-mt-2">
                <Button variant="flat" size="sm" color="secondary">Ver detalles</Button>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Card title="Incidencias abiertas"
                content={`${incidencias} incidencias requieren resolución esta semana.`}
                variant="raised" elevation={2} />
              <div className="w3f-mt-2">
                <Button variant="flat" size="sm" color="danger">Ver detalles</Button>
              </div>
            </div>
          </Stack>

          {/* Card actividad */}
          <div style={{
            background: 'var(--w3f-surface)',
            border: '1px solid var(--w3f-outline-variant)',
            borderRadius: 'var(--w3f-radius-xl)',
            padding: 'var(--w3f-space-5)',
            boxShadow: 'var(--w3f-shadow)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 'var(--w3f-space-3)' }}>
              <h2 className="w3f-font-semibold"
                style={{ fontSize: 'var(--w3f-text-base)', color: 'var(--w3f-on-surface)', margin: 0 }}>
                Actividad reciente
              </h2>
              <Button variant="outline" size="xs" color="primary"
                onClick={() => setExportado(true)}>
                Exportar
              </Button>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {ACTIVIDAD.map((item, i) => (
                <li key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: 'var(--w3f-space-2) 0',
                  borderBottom: i < ACTIVIDAD.length - 1
                    ? '1px solid var(--w3f-outline-variant)' : 'none',
                  color: 'var(--w3f-on-surface)',
                  fontSize: 'var(--w3f-text-sm)',
                }}>
                  <span>{item.texto}</span>
                  <span style={{ color: 'var(--w3f-outline)' }}>{item.tiempo}</span>
                </li>
              ))}
            </ul>

            {exportado && (
              <div className="w3f-mt-3">
                <Note type="success" title="Exportado">
                  El reporte se generó correctamente.
                </Note>
              </div>
            )}
          </div>

        </Stack>
      </main>
    </div>
  )
}
```

---

## Referencia rápida

### Estructura de página recomendada

```tsx
<div className={dark ? 'w3f-theme-dark' : ''}
     style={{ minHeight: '100vh', background: 'var(--w3f-background)' }}>

  <AppBar color="surface" position="sticky">
    <AppBarLeading>  {/* logo / icono */}  </AppBarLeading>
    <AppBarTitle>    {/* titulo */}        </AppBarTitle>
    <AppBarTrailing> {/* acciones */}      </AppBarTrailing>
  </AppBar>

  <main style={{ padding: 'var(--w3f-space-6)' }}>
    <Stack spacing="6">
      {/* secciones */}
    </Stack>
  </main>

</div>
```

### Colors de AppBar

| `color` | Fondo | Dark mode |
|---|---|---|
| `primary` | `--w3f-primary` (azul) | Mismo color |
| `surface` | `--w3f-surface` (blanco) | `--w3f-surface` (gris oscuro) |
| `dark` | `#1f2937` | `#111827` |
| `transparent` | transparente | transparente |

### Stack — orientaciones

```tsx
<Stack spacing="4">         {/* vertical, gap de token "4" = 16px */}
<Stack horizontal gap="1rem"> {/* horizontal, gap libre en CSS */}
```

---

## Lo que aprendiste en el Nivel 1

Con este capítulo terminaste el Nivel 1. Repaso de lo que dominás:

| Capítulo | Concepto |
|---|---|
| 01 | Qué es W3F y para qué sirve |
| 02 | Instalación en Vite y Next.js |
| 03 | Integración con Next.js App Router |
| 04 | Primer componente: Button, Stack |
| 05 | Estructura del monorepo, patrón de 5 archivos |
| 06 | Tokens CSS: colores, spacing, tipografía, dark mode |
| 07 | Primera página completa: AppBar, Cards, Notes |

---

## Siguiente paso

El Nivel 2 arranca con el sistema de layout completo.

[Capítulo 08 — Layout: Stack, Grid, Container, Flexbox](../nivel-2-intermedio/08-layout.md)

Vas a aprender a construir cualquier disposición visual usando el sistema de grid de 12 columnas y los componentes de layout del framework.
