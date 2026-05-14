# Capítulo 06 — CSS variables y tokens

**Nivel:** Principiante
**Tiempo estimado de lectura:** 20 minutos

---

## ¿Qué vas a aprender?

- Qué es un token de diseño y por qué importa
- Los grupos de variables CSS del framework: colores, spacing, tipografía, radius, sombras
- Cómo leer y depurar variables en el navegador (DevTools)
- Clases utilitarias disponibles para spacing, color y tipografía
- Los breakpoints del sistema responsive
- Cómo activar el dark mode

---

## ¿Qué es un token de diseño?

Un **token** es una variable con nombre que representa una decisión de diseño.
En lugar de escribir `#2563eb` directamente en el CSS, escribís `var(--w3f-primary)`.

```css
/* Sin tokens — frágil */
.mi-boton { background: #2563eb; }

/* Con tokens — mantenible */
.mi-boton { background: var(--w3f-primary); }
```

La ventaja: cambiando el valor de `--w3f-primary` en un solo lugar, todos los
componentes que lo usen se actualizan automáticamente.
Es la base del sistema de temas de W3F.

---

## Los grupos de tokens

Todos los tokens están definidos en `packages/css-framework/src/_variables.css`
y se aplican al selector `:root` — disponibles globalmente en toda la app.

### Colores semánticos

Los colores principales del framework, listos para usar:

```css
--w3f-primary:   #2563eb;   /* azul — acción principal */
--w3f-secondary: #f97316;   /* naranja — acción secundaria */
--w3f-success:   #10b981;   /* verde — confirmación */
--w3f-warning:   #f59e0b;   /* ámbar — atención */
--w3f-danger:    #ef4444;   /* rojo — error/eliminar */
--w3f-info:      #06b6d4;   /* cyan — informativo */
```

Cada color tiene una escala de 10 tonos (`-50` a `-900`):

```css
--w3f-primary-50:  #eff6ff;  /* muy claro */
--w3f-primary-100: #dbeafe;
--w3f-primary-200: #bfdbfe;
/* ... */
--w3f-primary-600: #2563eb;  /* base */
--w3f-primary-700: #1d4ed8;  /* oscuro */
--w3f-primary-900: #1e3a8a;  /* muy oscuro */
```

### Colores de superficie

Para fondos, bordes y texto sobre superficies:

```css
--w3f-background:      #f9fafb;  /* fondo de la página */
--w3f-surface:         #ffffff;  /* fondo de cards, panels */
--w3f-surface-variant: #f3f4f6;  /* fondo alternativo */
--w3f-on-surface:      #1f2937;  /* texto sobre surface */
--w3f-on-background:   #111827;  /* texto sobre background */
--w3f-on-primary:      #ffffff;  /* texto sobre botón primary */
--w3f-outline:         #9ca3af;  /* bordes */
--w3f-outline-variant: #e5e7eb;  /* bordes suaves */
```

Estos tokens son los que cambian entre el tema claro y el oscuro.

### Espaciado

Escala de 4px base (1 unidad = 0.25rem = 4px):

```css
--w3f-space-1:  0.25rem;  /*  4px */
--w3f-space-2:  0.5rem;   /*  8px */
--w3f-space-3:  0.75rem;  /* 12px */
--w3f-space-4:  1rem;     /* 16px */
--w3f-space-5:  1.25rem;  /* 20px */
--w3f-space-6:  1.5rem;   /* 24px */
--w3f-space-8:  2rem;     /* 32px */
--w3f-space-10: 2.5rem;   /* 40px */
--w3f-space-12: 3rem;     /* 48px */
--w3f-space-16: 4rem;     /* 64px */
```

Ejemplo de uso en CSS propio:

```css
.mi-card {
  padding: var(--w3f-space-4);   /* 16px */
  margin-bottom: var(--w3f-space-6); /* 24px */
  gap: var(--w3f-space-3);       /* 12px */
}
```

### Tipografía

```css
--w3f-font-family: 'Roboto', system-ui, sans-serif;
--w3f-font-display: 'Playfair Display', serif;   /* para títulos elegantes */
--w3f-font-mono: 'Space Mono', monospace;         /* para código */

--w3f-text-xs:   0.75rem;   /* 12px */
--w3f-text-sm:   0.875rem;  /* 14px */
--w3f-text-base: 1rem;      /* 16px — base */
--w3f-text-lg:   1.125rem;  /* 18px */
--w3f-text-xl:   1.25rem;   /* 20px */
--w3f-text-2xl:  1.5rem;    /* 24px */
--w3f-text-3xl:  1.875rem;  /* 30px */
```

### Radius (bordes redondeados)

```css
--w3f-radius-none: 0;
--w3f-radius-sm:   0.125rem;  /*  2px */
--w3f-radius:      0.25rem;   /*  4px */
--w3f-radius-md:   0.375rem;  /*  6px */
--w3f-radius-lg:   0.5rem;    /*  8px */
--w3f-radius-xl:   0.75rem;   /* 12px */
--w3f-radius-2xl:  1rem;      /* 16px */
--w3f-radius-3xl:  1.5rem;    /* 24px */
--w3f-radius-full: 9999px;    /* círculo/píldora */
```

### Sombras

```css
--w3f-shadow-sm: 0 1px 2px rgba(0,0,0,.05);
--w3f-shadow:    0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1);
--w3f-shadow-md: 0 4px 6px rgba(0,0,0,.1), ...;
--w3f-shadow-lg: 0 10px 15px rgba(0,0,0,.1), ...;
--w3f-shadow-xl: 0 20px 25px rgba(0,0,0,.1), ...;
```

### Transiciones

```css
--w3f-transition-fast:   150ms ease-out;
--w3f-transition-normal: 300ms ease;
--w3f-transition-slow:   500ms ease;
```

---

## Cómo leer tokens en el navegador

Abrí DevTools (`F12`) → pestaña **Computed** → buscá la propiedad.
O bien en la pestaña **Elements**, seleccioná el `:root` y ves todas las variables en **Styles**.

Para inspeccionar el valor de un token específico en la consola:

```js
// En la consola del navegador:
getComputedStyle(document.documentElement).getPropertyValue('--w3f-primary')
// → " #2563eb"
```

---

## Customizar tokens

La forma más directa de personalizar el framework es sobreescribir tokens en tu CSS.

### Override global (todo el proyecto)

```css
/* En tu archivo CSS principal, DESPUÉS de importar W3F */
:root {
  --w3f-primary: #7c3aed;   /* cambiar el azul por violeta */
  --w3f-radius-lg: 1rem;    /* bordes más redondeados */
  --w3f-font-family: 'Inter', system-ui, sans-serif;
}
```

Todos los componentes que usen `--w3f-primary` automáticamente pasan a violeta.

### Override por sección (tema local)

```css
/* Solo afecta a los elementos dentro de .mi-seccion-especial */
.mi-seccion-especial {
  --w3f-primary: #dc2626;   /* rojo solo en esta sección */
  --w3f-surface: #1a1a1a;
  --w3f-on-surface: #f5f5f5;
}
```

```tsx
<div className="mi-seccion-especial">
  <Button>Este botón es rojo</Button>
  <Input label="Este input usa variables locales" />
</div>
```

---

## Clases utilitarias

El framework incluye clases CSS de utilidad para los casos más comunes,
sin necesidad de escribir CSS propio.

### Spacing — margin y padding

```html
<!-- margin-top -->
<div class="w3f-mt-0">  <!-- 0     -->
<div class="w3f-mt-1">  <!-- 4px   -->
<div class="w3f-mt-2">  <!-- 8px   -->
<div class="w3f-mt-3">  <!-- 12px  -->
<div class="w3f-mt-4">  <!-- 16px  -->
<div class="w3f-mt-6">  <!-- 24px  -->
<div class="w3f-mt-8">  <!-- 32px  -->

<!-- margin-bottom: igual con w3f-mb-* -->

<!-- padding (todos los lados) -->
<div class="w3f-p-2">   <!-- 8px   -->
<div class="w3f-p-4">   <!-- 16px  -->
<div class="w3f-p-6">   <!-- 24px  -->
<div class="w3f-p-8">   <!-- 32px  -->
```

### Gap (para flex y grid)

```html
<div class="w3f-gap-2">    <!-- gap: 8px  -->
<div class="w3f-gap-4">    <!-- gap: 16px -->
<div class="w3f-gap-6">    <!-- gap: 24px -->
<div class="w3f-gap-x-4">  <!-- column-gap: 16px -->
<div class="w3f-gap-y-4">  <!-- row-gap: 16px -->
```

### Color de texto

```html
<span class="w3f-text-primary">   texto en color primary   </span>
<span class="w3f-text-danger">    texto en color danger    </span>
<span class="w3f-text-primary-700"> tono 700 del primary  </span>
```

### Tipografía

```html
<!-- Peso de fuente -->
<p class="w3f-font-medium">   peso 500 </p>
<p class="w3f-font-semibold"> peso 600 </p>
<p class="w3f-font-bold">     peso 700 </p>

<!-- Tamaño de fuente -->
<p class="w3f-text-sm">   14px </p>
<p class="w3f-text-base"> 16px </p>
<p class="w3f-text-lg">   18px </p>
<p class="w3f-text-xl">   20px </p>
```

En React las clases se aplican con `className`:

```tsx
<p className="w3f-text-sm w3f-font-medium w3f-text-primary">
  Texto pequeño, semibold, en color primary
</p>
```

---

## Breakpoints del sistema responsive

El framework usa 4 breakpoints con prefijos de clase:

| Prefijo | Ancho mínimo | Dispositivo típico |
|---|---|---|
| (sin prefijo) | 0px | Mobile — siempre activo |
| `w3f-sm:` | 640px | Tablet pequeña |
| `w3f-md:` | 768px | Tablet |
| `w3f-lg:` | 1024px | Desktop |
| `w3f-xl:` | 1280px | Desktop grande |

Se usan principalmente con el grid de 12 columnas:

```html
<!-- 12 cols en mobile, 6 en tablet, 4 en desktop -->
<div class="w3f-col-span-12 w3f-md:col-span-6 w3f-lg:col-span-4">
  contenido
</div>
```

---

## Dark mode

El dark mode se activa agregando la clase `w3f-theme-dark` al elemento que
querés oscurecer. Puede ser el `body`, un contenedor específico, o cualquier div.

```tsx
// Toda la app en modo oscuro
<body className="w3f-theme-dark">
  <App />
</body>

// Solo una sección en modo oscuro
<div className="w3f-theme-dark" style={{ padding: '2rem' }}>
  <Button>Este botón está en dark mode</Button>
  <Input label="Este input también" />
</div>
```

### Cómo implementar un toggle de tema

```tsx
import { useState } from 'react'
import Button from '@w3f/components/INPUTS/Button/Button'

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? 'w3f-theme-dark' : ''}>
      <Button
        variant="outline"
        onClick={() => setDark(d => !d)}
      >
        {dark ? 'Modo claro' : 'Modo oscuro'}
      </Button>

      {/* el resto de la app */}
    </div>
  );
}
```

### Qué cambia en dark mode

El framework redefine los tokens de superficie:

| Token | Claro | Oscuro |
|---|---|---|
| `--w3f-background` | `#f9fafb` | `#111827` |
| `--w3f-surface` | `#ffffff` | `#1f2937` |
| `--w3f-on-surface` | `#1f2937` | `#f3f4f6` |
| `--w3f-outline` | `#9ca3af` | `#4b5563` |
| `--w3f-primary` | `#2563eb` | `#60a5fa` |

Los componentes leen estos tokens, por lo que cambian automáticamente
sin ninguna configuración extra.

---

## Ejercicio práctico

Creá un componente `TemaDemo` que:

1. Muestre un texto con `--w3f-primary` usando la clase utilitaria
2. Tenga un card con padding usando variables de spacing
3. Permita togglear entre dark y light mode
4. En dark mode el card se vea con fondo oscuro automáticamente

### Solución

```tsx
import { useState } from 'react'
import Button from '@w3f/components/INPUTS/Button/Button'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'

export default function TemaDemo() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={dark ? 'w3f-theme-dark' : ''}
      style={{
        padding: 'var(--w3f-space-6)',
        background: 'var(--w3f-background)',
        minHeight: '100vh',
        transition: 'var(--w3f-transition-normal)',
      }}
    >
      <Stack gap="var(--w3f-space-4)">

        <p className="w3f-text-xl w3f-font-semibold w3f-text-primary">
          Sistema de tokens W3F
        </p>

        <div style={{
          padding: 'var(--w3f-space-4)',
          background: 'var(--w3f-surface)',
          borderRadius: 'var(--w3f-radius-lg)',
          border: '1px solid var(--w3f-outline-variant)',
          boxShadow: 'var(--w3f-shadow)',
        }}>
          <p style={{ margin: 0, color: 'var(--w3f-on-surface)' }}>
            Este card usa tokens CSS. En dark mode cambia automáticamente.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setDark(d => !d)}
        >
          {dark ? 'Cambiar a claro' : 'Cambiar a oscuro'}
        </Button>

      </Stack>
    </div>
  );
}
```

---

## Referencia rápida de tokens

| Categoría | Patrón | Ejemplos |
|---|---|---|
| Color semántico | `--w3f-{color}` | `--w3f-primary`, `--w3f-danger` |
| Tono de color | `--w3f-{color}-{n}` | `--w3f-primary-700`, `--w3f-success-100` |
| Superficie | `--w3f-{surface}` | `--w3f-surface`, `--w3f-on-surface` |
| Spacing | `--w3f-space-{n}` | `--w3f-space-4` (16px) |
| Tipografía | `--w3f-text-{size}` | `--w3f-text-sm`, `--w3f-text-2xl` |
| Radius | `--w3f-radius-{size}` | `--w3f-radius-lg`, `--w3f-radius-full` |
| Sombra | `--w3f-shadow-{size}` | `--w3f-shadow`, `--w3f-shadow-md` |
| Transición | `--w3f-transition-{speed}` | `--w3f-transition-fast` |

---

## Siguiente paso

[Capítulo 07 — Primera página completa](07-primera-pagina.md)

Vas a combinar todo lo aprendido en los capítulos anteriores para construir una página completa con AppBar, layout y contenido real.
