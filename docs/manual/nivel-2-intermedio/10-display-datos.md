# Capítulo 10 — Display de datos: Card, Badge, Text, Avatar

**Nivel:** Intermedio
**Tiempo estimado de lectura:** 35 minutos

---

## ¿Qué vas a aprender?

- `Card` y todas sus variantes: imagen, título, acciones, botones integrados y badge
- `Badge` como etiqueta standalone y como overlay con `BadgeWrapper`
- `Text` para tipografía semántica con control de alineación y espaciado
- `Avatar` con iniciales, imagen, estados de presencia y grupos
- Combinar los cuatro para construir tarjetas de equipo, listas de usuarios y paneles de notificaciones

---

## Card

El componente de superficie más usado. Agrupa información relacionada en un contenedor con borde, fondo y sombra opcionales.

### Props principales

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `title` | `ReactNode` | — | Título de la card |
| `subtitle` | `ReactNode` | — | Subtítulo debajo del título |
| `content` | `ReactNode` | — | Cuerpo de texto |
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del padding interno |
| `imageSrc` | `string` | — | URL de imagen |
| `imageAlt` | `string` | `''` | Alt de la imagen |
| `imagePosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posición de la imagen |
| `buttons` | `CardButtonProps[]` | — | Botones integrados en el área de acciones |
| `actions` | `ReactNode` | — | Slot libre de acciones (reemplaza `buttons`) |
| `actionsAlign` | `'start' \| 'center' \| 'end' \| 'space-between'` | `'end'` | Alineación del área de acciones |
| `badge` | `CardBadgeConfig \| ReactNode \| string \| number` | — | Badge superpuesto en la esquina |
| `hoverable` | `boolean` | `false` | Sombra y elevación al hacer hover |
| `clickable` | `boolean` | `false` | Cursor pointer + efecto click |
| `onClick` | `MouseEventHandler` | — | Handler de click en la card |
| `fullWidth` | `boolean` | `false` | Ocupa el 100% del ancho del padre |
| `headerExtra` | `ReactNode` | — | Slot adicional en el encabezado (ej: menú) |
| `customContent` | `ReactNode` | — | Slot de contenido completamente libre |

### Variantes visuales

```tsx
import Card from '@w3f/components/DATADISPLAY/Card/Card'

// Default — fondo surface + sombra sutil
<Card title="Default" content="Card con estilo por defecto." />

// Elevated — sombra más pronunciada
<Card title="Elevated" content="Sombra más visible." variant="elevated" />

// Outlined — solo borde, sin sombra
<Card title="Outlined" content="Solo borde, sin elevación." variant="outlined" />

// Filled — fondo de color surface-variant
<Card title="Filled" content="Fondo alternativo más sólido." variant="filled" />
```

### Con imagen

```tsx
// Imagen arriba (default)
<Card
  imageSrc="/producto.jpg"
  imageAlt="Producto estrella"
  title="Zapatillas Air Max"
  subtitle="Nike — Temporada 2026"
  content="Diseño innovador con amortiguación reactiva. Disponible en 8 colores."
  variant="elevated"
/>

// Imagen a la izquierda
<Card
  imageSrc="/avatar-empresa.png"
  imageAlt="Empresa"
  imagePosition="left"
  title="Acme Corp"
  content="Fundada en 1985. Líder en soluciones industriales."
  variant="outlined"
/>
```

### Con botones integrados

La prop `buttons` acepta un array de objetos que definen botones en el área de acciones:

```tsx
<Card
  title="Archivo compartido"
  subtitle="documento-final-v3.pdf  —  2.4 MB"
  content="Actualizado hace 2 horas por María García."
  variant="outlined"
  buttons={[
    { text: 'Descargar', variant: 'raised', color: 'primary', onClick: handleDescargar },
    { text: 'Compartir',  variant: 'flat',                     onClick: handleCompartir },
  ]}
  actionsAlign="end"
/>
```

### Con slot de acciones libre

Para mayor flexibilidad, usá `actions` en lugar de `buttons`:

```tsx
import Card from '@w3f/components/DATADISPLAY/Card/Card'
import Button from '@w3f/components/INPUTS/Button/Button'
import { FlexContainer } from '@w3f/components/LAYOUT/Flexbox/Flexbox'

<Card
  title="Plan Pro"
  subtitle="$ 9 / mes"
  content="Acceso a todas las funciones. Sin límite de proyectos."
  variant="elevated"
  actions={
    <FlexContainer justifyContent="between" alignItems="center" style={{ width: '100%' }}>
      <span className="w3f-text-sm" style={{ color: 'var(--w3f-outline)' }}>
        Cancelá cuando quieras
      </span>
      <Button variant="raised" color="primary" size="sm">
        Suscribirme
      </Button>
    </FlexContainer>
  }
/>
```

### Card interactiva (hoverable y clickable)

```tsx
// hoverable — solo efecto visual
<Card
  title="Ver reporte"
  content="Resultados del mes de mayo."
  hoverable
/>

// clickable — cursor pointer + efecto, ideal para listas de items
<Card
  title="Proyecto Alpha"
  subtitle="En progreso — 68%"
  content="3 tareas pendientes"
  clickable
  hoverable
  onClick={() => navigate('/proyectos/alpha')}
/>
```

### Con badge en la esquina

```tsx
// Badge con número
<Card
  title="Bandeja de entrada"
  content="Revisá tus mensajes pendientes."
  badge={12}
/>

// Badge con config completa
<Card
  title="Alertas del sistema"
  content="Hay incidencias que requieren atención."
  badge={{ color: 'danger', variant: 'solid', children: '!' }}
/>
```

### Con headerExtra

Útil para poner un menú contextual o un ícono en el encabezado:

```tsx
import { MoreVertical } from 'lucide-react'

<Card
  title="Configuración del proyecto"
  subtitle="Editado ayer"
  content="Variables de entorno, webhooks y permisos."
  headerExtra={
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--w3f-outline)' }}>
      <MoreVertical size={18} />
    </button>
  }
/>
```

### Con customContent

Para contenido completamente personalizado (sin slot de texto):

```tsx
<Card
  title="Progreso del mes"
  customContent={
    <div style={{ padding: 'var(--w3f-space-4)' }}>
      <div style={{ background: 'var(--w3f-outline-variant)', borderRadius: 'var(--w3f-radius-full)', height: 8 }}>
        <div style={{
          background: 'var(--w3f-primary)',
          borderRadius: 'var(--w3f-radius-full)',
          height: '100%',
          width: '72%',
          transition: 'width 0.6s ease',
        }} />
      </div>
      <p className="w3f-text-sm w3f-mt-2" style={{ color: 'var(--w3f-outline)', margin: '8px 0 0' }}>
        72% completado — 8 días restantes
      </p>
    </div>
  }
/>
```

---

## Badge

Etiqueta pequeña para indicar estado, cantidad o categoría.

Tiene dos modos de uso:
1. **Standalone** — `Badge` como elemento propio dentro de otro contenido
2. **Overlay** — `BadgeWrapper` envuelve un componente y superpone el badge en una esquina

### Props de Badge

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido del badge (texto, número) |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'gray'` | `'primary'` | Color de fondo |
| `variant` | `'solid' \| 'outline' \| 'soft' \| 'dot'` | `'solid'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `max` | `number` | `99` | Valor máximo — muestra `{max}+` si se supera |
| `pulse` | `boolean` | `false` | Animación de pulso (para alertas vivas) |
| `animate` | `boolean` | `false` | Animación de escala al aparecer |
| `invisible` | `boolean` | `false` | Oculta el badge sin desmontarlo |

### Props de BadgeWrapper

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `children` | `ReactNode` | — | El elemento sobre el que va el badge |
| `badgeContent` | `ReactNode` | — | Contenido del badge (número, texto) |
| `badgeProps` | `BadgeProps` | — | Props del badge interno |
| `overlap` | `boolean` | `true` | Badge se superpone al borde del elemento |
| `offset` | `string` | — | Distancia al borde: `'4px'`, `'-2px'` |

### Badge standalone

```tsx
import Badge from '@w3f/components/DATADISPLAY/Badge/Badge'

// Colores
<Badge color="primary">Nuevo</Badge>
<Badge color="success">Activo</Badge>
<Badge color="warning">Pendiente</Badge>
<Badge color="danger">Urgente</Badge>
<Badge color="info">Info</Badge>
<Badge color="gray">Inactivo</Badge>

// Variantes
<Badge color="primary" variant="solid">Solid</Badge>
<Badge color="primary" variant="outline">Outline</Badge>
<Badge color="primary" variant="soft">Soft</Badge>
<Badge color="danger"  variant="dot" />    {/* solo un punto, sin texto */}

// Con número máximo
<Badge color="danger" max={99}>{mensajes}</Badge>
// → Si mensajes=150, muestra "99+"

// Con animación
<Badge color="danger" pulse>En vivo</Badge>
<Badge color="success" animate>{conteo}</Badge>
```

### BadgeWrapper — badge overlay

```tsx
import Badge from '@w3f/components/DATADISPLAY/Badge/Badge'
import BadgeWrapper from '@w3f/components/DATADISPLAY/Badge/BadgeWrapper'
import Avatar from '@w3f/components/DATADISPLAY/Avatar/Avatar'

// Notificaciones sobre un ícono de campana
<BadgeWrapper
  badgeContent={notificaciones}
  badgeProps={{ color: 'danger', max: 9 }}
>
  <button style={{ background: 'none', border: 'none', fontSize: 24 }}>🔔</button>
</BadgeWrapper>

// Sobre un Avatar
<BadgeWrapper
  badgeContent={mensajes}
  badgeProps={{ color: 'primary', size: 'sm', animate: true }}
>
  <Avatar src="/foto.jpg" size="medium" />
</BadgeWrapper>

// Variant dot (solo indicador de presencia)
<BadgeWrapper
  badgeProps={{ variant: 'dot', color: 'success', pulse: true }}
>
  <Avatar>JG</Avatar>
</BadgeWrapper>

// Badge invisible (existe en DOM pero no se ve — útil para animar su aparición)
<BadgeWrapper
  badgeContent={0}
  badgeProps={{ color: 'danger', invisible: mensajes === 0 }}
>
  <button>Mensajes</button>
</BadgeWrapper>
```

---

## Text

Componente de tipografía semántica que controla el elemento HTML, la alineación y el espaciado de línea.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `element` | `React.ElementType` | `'p'` | Elemento HTML: `'p'`, `'h1'`…`'h6'`, `'span'`, `'div'`, `'blockquote'`… |
| `children` | `ReactNode` | — | Contenido (recomendado) |
| `content` | `ReactNode \| ReactNode[]` | — | Alternativa a children (acepta array) |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | — | Alineación del texto |
| `leading` | `'none' \| 'tight' \| 'snug' \| 'normal' \| 'relaxed' \| 'loose'` | — | Espaciado de línea (line-height) |
| `customClasses` | `string` | — | Clases CSS adicionales |

### Ejemplos

```tsx
import Text from '@w3f/components/DATADISPLAY/Text/Text'

// Párrafo simple
<Text>Texto normal en un párrafo.</Text>

// Heading semántico
<Text element="h1" customClasses="w3f-font-bold" style={{ fontSize: 'var(--w3f-text-3xl)' }}>
  Título principal
</Text>

<Text element="h2" customClasses="w3f-font-semibold" style={{ fontSize: 'var(--w3f-text-2xl)' }}>
  Subtítulo de sección
</Text>

// Alineación
<Text align="center">Texto centrado</Text>
<Text align="right">Alineado a la derecha</Text>
<Text align="justify">
  Texto justificado — el último renglón no se justifica. Útil para cuerpo de artículos
  donde la alineación prolija es importante.
</Text>

// Espaciado de línea
<Text leading="tight">Texto con líneas muy juntas.</Text>
<Text leading="relaxed">Texto con líneas más separadas — más fácil de leer en párrafos largos.</Text>
<Text leading="loose">Texto con el mayor espaciado disponible.</Text>

// Combinado
<Text
  element="blockquote"
  align="center"
  leading="relaxed"
  customClasses="w3f-font-medium"
  style={{
    fontSize: 'var(--w3f-text-lg)',
    color: 'var(--w3f-outline)',
    borderLeft: '4px solid var(--w3f-primary)',
    paddingLeft: 'var(--w3f-space-4)',
  }}
>
  "El buen diseño es tan poco diseño como sea posible." — Dieter Rams
</Text>

// Span inline
<Text element="span" customClasses="w3f-font-semibold w3f-text-primary">
  texto en negrita y color primary
</Text>
```

> **Cuándo usar `Text` vs elementos HTML directos:** Usá `Text` cuando necesitás control de `align` o `leading` sin escribir CSS. Para tipografía donde solo cambiás clases utilitarias, usar `<p className="...">` directamente es perfectamente válido.

---

## Avatar

Representa a un usuario o entidad con imagen, iniciales o ícono.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `src` | `string` | — | URL de la imagen |
| `alt` | `string` | `'Avatar'` | Alt text de la imagen |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Tamaño |
| `color` | `AvatarColor` | `'blue'` | Color de fondo cuando no hay imagen |
| `children` | `ReactNode` | — | Iniciales o ícono (cuando no hay `src`) |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | — | Indicador de presencia |
| `badge` | `number` | — | Número superpuesto (para notificaciones) |
| `hoverable` | `boolean` | `false` | Efecto de elevación al hover |
| `uploadable` | `boolean` | `false` | Clic abre selector de archivo |
| `onChange` | `(value: string) => void` | — | Recibe dataURL cuando se sube una imagen |
| `onClick` | `MouseEventHandler` | — | Handler de click |

**Colores disponibles para `color`:** `'red'`, `'pink'`, `'purple'`, `'deep-purple'`, `'indigo'`, `'blue'`, `'light-blue'`, `'cyan'`, `'teal'`, `'green'`, `'light-green'`, `'lime'`, `'yellow'`, `'amber'`, `'orange'`, `'brown'`, `'gray'`

### Ejemplos

```tsx
import { Avatar, AvatarGroup } from '@w3f/components/DATADISPLAY/Avatar/Avatar'

// Con imagen
<Avatar src="/usuarios/maria.jpg" alt="María García" size="medium" />

// Con iniciales (sin imagen)
<Avatar color="indigo" size="medium">MG</Avatar>
<Avatar color="teal"   size="large">JP</Avatar>

// Tamaños
<Avatar color="blue" size="small">AB</Avatar>
<Avatar color="blue" size="medium">AB</Avatar>
<Avatar color="blue" size="large">AB</Avatar>
<Avatar color="blue" size="xlarge">AB</Avatar>

// Con estado de presencia
<Avatar src="/foto.jpg" status="online" />
<Avatar color="purple" status="busy">LR</Avatar>
<Avatar color="gray"   status="away">??</Avatar>
<Avatar color="brown"  status="offline">MN</Avatar>

// Con badge numérico
<Avatar src="/foto.jpg" badge={3} />

// Clickeable (ej: abrir perfil)
<Avatar
  src="/foto.jpg"
  hoverable
  onClick={() => navigate('/perfil')}
/>

// Uploadable — clic abre el selector de archivo
const [foto, setFoto] = useState('')

<Avatar
  src={foto || undefined}
  uploadable
  onChange={setFoto}
  hoverable
  size="xlarge"
>
  {!foto && 'Subir'}
</Avatar>
```

### AvatarGroup — grupo con solapamiento

```tsx
// max=4 muestra los primeros 4 y "+N" para el resto
<AvatarGroup max={4}>
  <Avatar src="/users/ana.jpg"    alt="Ana"    />
  <Avatar src="/users/carlos.jpg" alt="Carlos" />
  <Avatar color="purple">LR</Avatar>
  <Avatar color="teal">  MN</Avatar>
  <Avatar color="orange">KP</Avatar>
  <Avatar color="red">   JD</Avatar>
</AvatarGroup>
// Muestra: Ana, Carlos, LR, MN, y "+2"
```

---

## Combinando los cuatro — tarjeta de miembro del equipo

Un ejemplo real que usa Card, Badge, Text y Avatar juntos:

```tsx
import Card         from '@w3f/components/DATADISPLAY/Card/Card'
import Badge        from '@w3f/components/DATADISPLAY/Badge/Badge'
import { Avatar }   from '@w3f/components/DATADISPLAY/Avatar/Avatar'
import Text         from '@w3f/components/DATADISPLAY/Text/Text'
import Stack        from '@w3f/components/LAYOUT/Stack/Stack'
import { FlexContainer, FlexItem } from '@w3f/components/LAYOUT/Flexbox/Flexbox'
import Button       from '@w3f/components/INPUTS/Button/Button'
import Grid         from '@w3f/components/LAYOUT/Grid/Grid'

const EQUIPO = [
  {
    nombre: 'Ana Martínez',
    rol: 'Tech Lead',
    src: '/team/ana.jpg',
    color: 'indigo' as const,
    status: 'online' as const,
    tareas: 5,
    tags: ['React', 'TypeScript'],
  },
  {
    nombre: 'Carlos Ruiz',
    rol: 'Backend Dev',
    src: undefined,
    color: 'teal' as const,
    status: 'busy' as const,
    tareas: 8,
    tags: ['Python', 'Docker'],
  },
  {
    nombre: 'Laura Pérez',
    rol: 'UX Designer',
    src: '/team/laura.jpg',
    color: 'pink' as const,
    status: 'away' as const,
    tareas: 2,
    tags: ['Figma', 'CSS'],
  },
]

function TarjetaMiembro({ miembro }: { miembro: typeof EQUIPO[0] }) {
  return (
    <Card
      variant="elevated"
      hoverable
      customContent={
        <Stack spacing="3" style={{ padding: 'var(--w3f-space-4)' }}>

          {/* Encabezado: avatar + nombre + rol */}
          <FlexContainer alignItems="center" gap="var(--w3f-space-3)">
            <Avatar
              src={miembro.src}
              color={miembro.color}
              size="large"
              status={miembro.status}
            >
              {!miembro.src && miembro.nombre.split(' ').map(n => n[0]).join('')}
            </Avatar>

            <div>
              <Text
                element="p"
                customClasses="w3f-font-semibold"
                style={{ margin: 0, color: 'var(--w3f-on-surface)', fontSize: 'var(--w3f-text-base)' }}
              >
                {miembro.nombre}
              </Text>
              <Text
                element="p"
                customClasses="w3f-text-sm"
                style={{ margin: 0, color: 'var(--w3f-outline)' }}
              >
                {miembro.rol}
              </Text>
            </div>
          </FlexContainer>

          {/* Tags de tecnología */}
          <FlexContainer wrap gap="var(--w3f-space-2)">
            {miembro.tags.map(tag => (
              <Badge key={tag} color="primary" variant="soft" size="sm">
                {tag}
              </Badge>
            ))}
          </FlexContainer>

          {/* Pie: tareas pendientes + botón */}
          <FlexContainer justifyContent="between" alignItems="center">
            <FlexContainer gap="var(--w3f-space-2)" alignItems="center">
              <Badge
                color={miembro.tareas > 5 ? 'warning' : 'success'}
                variant="solid"
                size="sm"
              >
                {miembro.tareas}
              </Badge>
              <Text
                element="span"
                customClasses="w3f-text-sm"
                style={{ color: 'var(--w3f-outline)' }}
              >
                tareas activas
              </Text>
            </FlexContainer>

            <Button variant="flat" size="xs" color="primary">
              Ver perfil
            </Button>
          </FlexContainer>

        </Stack>
      }
    />
  )
}

export default function PaginaEquipo() {
  return (
    <div style={{ padding: 'var(--w3f-space-6)', background: 'var(--w3f-background)' }}>
      <Stack spacing="6">

        <FlexContainer justifyContent="between" alignItems="center">
          <Text element="h1" customClasses="w3f-font-bold"
            style={{ fontSize: 'var(--w3f-text-2xl)', color: 'var(--w3f-on-background)', margin: 0 }}>
            Equipo
          </Text>
          <Badge color="primary" variant="soft">{EQUIPO.length} miembros</Badge>
        </FlexContainer>

        <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="var(--w3f-space-4)">
          {EQUIPO.map(m => <TarjetaMiembro key={m.nombre} miembro={m} />)}
        </Grid>

      </Stack>
    </div>
  )
}
```

---

## Ejercicio práctico

Construí un **panel de notificaciones** con esta estructura:

```
┌─────────────────────────────────────────┐
│  Notificaciones  [Badge: 4 nuevas]      │
├─────────────────────────────────────────┤
│  [Avatar JD] Juan Díaz comentó tu post  │
│              hace 5 min  [Badge: nuevo] │
├─────────────────────────────────────────┤
│  [Avatar AB] Ana Blanco te mencionó     │
│              hace 12 min               │
├─────────────────────────────────────────┤
│  [Avatar ★]  Sistema — Backup completado│
│              hace 1 hora [Badge: verde] │
└─────────────────────────────────────────┘
```

Cada fila es una `Card` con `customContent`. Usá:
- `Avatar` con iniciales o ícono según el tipo
- `Text` para el mensaje y la hora
- `Badge` para marcar las no leídas
- `FlexContainer` para el layout horizontal dentro de cada card

---

## Referencia rápida

### Card — variantes y props clave

| variant | Apariencia |
|---|---|
| `default` | Surface + sombra mínima |
| `elevated` | Surface + sombra notable |
| `outlined` | Solo borde, sin sombra |
| `filled` | Surface-variant (fondo más gris) |

```tsx
// Slots disponibles en Card:
title         // string o ReactNode — en el header
subtitle      // debajo del título
content       // texto del cuerpo
actions       // ReactNode libre en el footer
buttons       // array de botones en el footer
headerExtra   // ReactNode al extremo derecho del header
customContent // reemplaza title+content completamente
badge         // badge overlay en la esquina
```

### Badge — modos de uso

```tsx
// Standalone (inline, dentro de texto o listas)
<Badge color="danger" variant="soft">Urgente</Badge>

// Overlay (superpuesto sobre otro componente)
<BadgeWrapper badgeContent={5} badgeProps={{ color: 'danger' }}>
  <Avatar>JD</Avatar>
</BadgeWrapper>
```

### Avatar — cuando no hay imagen

```tsx
// Iniciales como children
<Avatar color="indigo" size="medium">AB</Avatar>

// Ícono como children
<Avatar color="gray" size="medium">
  <UserIcon size={18} />
</Avatar>
```

### Text — leading values

| `leading` | `line-height` aprox. |
|---|---|
| `tight` | 1.25 |
| `snug` | 1.375 |
| `normal` | 1.5 |
| `relaxed` | 1.625 |
| `loose` | 2 |

---

## En Next.js

`Text`, `Badge` y `BadgeWrapper` son componentes de display puro — podrían funcionar en Server Components si no tienen interactividad. Sin embargo, `Card` con `onClick`/`hoverable` y `Avatar` con `uploadable` usan eventos y hooks, por lo que necesitan `'use client'`.

La regla más segura: si el archivo tiene **cualquier interactividad** (onClick, onChange, useState), agregá `'use client'` al inicio del archivo. No hay penalidad real de rendimiento en páginas de aplicación.

```tsx
'use client'

import Card                from '@w3f/components/DATADISPLAY/Card/Card'
import { Badge }           from '@w3f/components/DATADISPLAY/Badge/Badge'
import Avatar              from '@w3f/components/DATADISPLAY/Avatar/Avatar'
import Text                from '@w3f/components/DATADISPLAY/Text/Text'

export default function PerfilUsuario({ usuario }) {
  return (
    <Card
      title={usuario.nombre}
      hoverable
      clickable
      onClick={() => console.log('ver perfil')}
    >
      <Avatar name={usuario.nombre} src={usuario.foto} status="online" />
      <Text element="p">{usuario.bio}</Text>
      <Badge color="success">Activo</Badge>
    </Card>
  )
}
```

Si la card es estática (sin onClick ni hoverable reactivo), podés usarla en un Server Component pasando solo strings como children.

---

## Siguiente paso

[Capítulo 11 — Navegación: AppBar, Tabs, Breadcrumbs, Drawer](11-navegacion.md)

Vas a aprender a construir sistemas de navegación completos: barra superior con menú responsive, pestañas, migas de pan y panel lateral deslizante.
