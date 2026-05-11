# Marquee

Componente de scroll infinito para logos, partners, testimoniales o cualquier contenido que necesite desplazarse continuamente. Soporta scroll horizontal (izquierda/derecha) y vertical (arriba/abajo).

## Importacion

```tsx
import Marquee from '@w3f/components/DATADISPLAY/Marquee/Marquee';
```

## Uso basico

```tsx
<Marquee>
  <img src="/logo1.png" alt="Partner 1" />
  <img src="/logo2.png" alt="Partner 2" />
  <img src="/logo3.png" alt="Partner 3" />
</Marquee>
```

## Direcciones

```tsx
{/* Horizontal: izquierda (default) */}
<Marquee direction="left">...</Marquee>

{/* Horizontal: derecha */}
<Marquee direction="right">...</Marquee>

{/* Vertical: arriba */}
<Marquee direction="up" style={{ height: 300 }}>...</Marquee>

{/* Vertical: abajo */}
<Marquee direction="down" style={{ height: 300 }}>...</Marquee>
```

## Velocidad

El prop `speed` controla la duracion de la animacion en segundos. Menor valor = mas rapido.

```tsx
<Marquee speed={10}>...</Marquee>  {/* Rapido */}
<Marquee speed={30}>...</Marquee>  {/* Normal (default) */}
<Marquee speed={60}>...</Marquee>  {/* Lento */}
```

## Pause on Hover

Activado por defecto. La animacion se pausa al hacer hover.

```tsx
<Marquee pauseOnHover={false}>...</Marquee>  {/* Sin pausa */}
```

## Fade en bordes

El prop `fadeEdge` controla el ancho del degradado en los bordes (px).

```tsx
<Marquee fadeEdge={60}>...</Marquee>   {/* Fade ancho */}
<Marquee fadeEdge={0}>...</Marquee>    {/* Sin fade */}
```

## Gap entre items

```tsx
<Marquee gap={40}>...</Marquee>   {/* Separacion amplia */}
<Marquee gap={12}>...</Marquee>   {/* Separacion compacta */}
```

## Repeticiones

El prop `repeat` controla cuantas veces se duplica el contenido para lograr el loop infinito.

```tsx
<Marquee repeat={3}>...</Marquee>  {/* 3 copias */}
```

## Accesibilidad

- El componente usa `role="marquee"` y `aria-label`
- Las copias duplicadas llevan `aria-hidden="true"`
- Respeta `prefers-reduced-motion`: la animacion se pausa automaticamente

```tsx
<Marquee aria-label="Nuestros partners">...</Marquee>
```

## Props

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Contenido a desplazar |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | `'left'` | Direccion del scroll |
| `speed` | `number` | `30` | Duracion de la animacion en segundos |
| `pauseOnHover` | `boolean` | `true` | Pausar al hacer hover |
| `gap` | `number` | `24` | Espacio entre items (px) |
| `repeat` | `number` | `2` | Copias del contenido para loop |
| `fadeEdge` | `number` | `40` | Ancho del degradado en bordes (px, 0 = sin fade) |
| `className` | `string` | `''` | Clases CSS adicionales |
| `style` | `CSSProperties` | `{}` | Estilos en linea |
| `aria-label` | `string` | `'Scrolling content'` | Etiqueta accesible |

## CSS Custom Properties

| Variable | Default | Descripcion |
|----------|---------|-------------|
| `--marquee-speed` | `30s` | Duracion de la animacion |
| `--marquee-gap` | `24px` | Espacio entre items |

## Estructura de archivos

```
Marquee/
  Marquee.tsx
  Marquee.types.ts
  Marquee.constants.ts
  Marquee.utils.ts
  test/
    Marquee.test.tsx
  README.md
```

CSS: `packages/css-framework/src/DATADISPLAY/_marquee.css`
