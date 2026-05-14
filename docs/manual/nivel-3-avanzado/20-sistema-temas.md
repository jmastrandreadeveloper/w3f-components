# Capítulo 20 — Sistema de temas

**Nivel:** 3 — Avanzado
**Capítulo:** 20 de 28

---

## ¿Qué vas a aprender?

1. Catálogo completo de tokens — todos los grupos de variables CSS disponibles
2. Crear un tema de marca completo de principio a fin
3. Dark mode avanzado: `prefers-color-scheme`, persistencia, sin flash de contenido
4. Sistema multi-tema (más de 2 temas)
5. Tokens de componente específicos — personalizar un componente sin afectar el resto
6. Estrategias de tema en Next.js — sin flash en SSR

> **Prerequisito**: el Cap 14 cubre los conceptos base (override de tokens, dark mode toggle básico, scoped themes). Este capítulo asume esa base y va más profundo.

---

## Catálogo completo de tokens

### Colores semánticos

Los colores semánticos controlan el aspecto de todos los componentes de forma coordinada. Cada color tiene una escala de 50–900:

```css
/* Primario — botones, links, focus rings, tabs activos, indicadores */
--w3f-primary:     #2563eb;  /* base — el más usado */
--w3f-primary-50:  #eff6ff;  /* fondos muy sutiles */
--w3f-primary-100: #dbeafe;
--w3f-primary-200: #bfdbfe;
--w3f-primary-300: #93c5fd;
--w3f-primary-400: #60a5fa;
--w3f-primary-500: #3b82f6;
--w3f-primary-600: #2563eb;  /* = --w3f-primary */
--w3f-primary-700: #1d4ed8;
--w3f-primary-800: #1e40af;
--w3f-primary-900: #1e3a8a;

/* Secundario — acentos, badges, elementos de soporte */
--w3f-secondary:   #f97316;
/* --w3f-secondary-50 a --w3f-secondary-900 */

/* Estados semánticos — siempre con escala completa */
--w3f-success:  #10b981;   /* emerald */
--w3f-warning:  #f59e0b;   /* amber */
--w3f-danger:   #ef4444;   /* red */
--w3f-info:     #06b6d4;   /* cyan */
```

### Colores de superficie

Estos son los tokens que cambian entre light y dark mode — controlan fondos, superficies y textos:

```css
/* Fondos */
--w3f-background:       #f9fafb;   /* página entera */
--w3f-surface:          #ffffff;   /* cards, paneles, modales */
--w3f-surface-variant:  #f3f4f6;   /* alternativa levemente diferente */

/* Textos sobre superficies */
--w3f-on-background:    #111827;   /* texto principal sobre background */
--w3f-on-surface:       #1f2937;   /* texto sobre cards y paneles */
--w3f-on-primary:       #ffffff;   /* texto sobre fondo primario */

/* Bordes */
--w3f-outline:          #9ca3af;   /* bordes visibles (inputs, cards outlined) */
--w3f-outline-variant:  #e5e7eb;   /* bordes sutiles (dividers, separators) */
```

### Grises base

Disponibles para cualquier uso directo que no encaje en los semánticos:

```css
--w3f-gray-50:   #f9fafb;
--w3f-gray-100:  #f3f4f6;
--w3f-gray-200:  #e5e7eb;
--w3f-gray-300:  #d1d5db;
--w3f-gray-400:  #9ca3af;
--w3f-gray-500:  #6b7280;
--w3f-gray-600:  #4b5563;
--w3f-gray-700:  #374151;
--w3f-gray-800:  #1f2937;
--w3f-gray-900:  #111827;
```

### Espaciado

Escala de espaciado usada por los componentes para padding, gap y margin:

```css
--w3f-space-1:   0.25rem;  /*  4px */
--w3f-space-2:   0.5rem;   /*  8px */
--w3f-space-3:   0.75rem;  /* 12px */
--w3f-space-4:   1rem;     /* 16px */
--w3f-space-5:   1.25rem;  /* 20px */
--w3f-space-6:   1.5rem;   /* 24px */
--w3f-space-8:   2rem;     /* 32px */
--w3f-space-10:  2.5rem;   /* 40px */
--w3f-space-12:  3rem;     /* 48px */
--w3f-space-16:  4rem;     /* 64px */
```

### Tipografía

```css
/* Familia de fuentes */
--w3f-font-family:   'Roboto', ui-sans-serif, system-ui, sans-serif;
--w3f-font-display:  'Playfair Display', serif;
--w3f-font-mono:     'Space Mono', monospace;

/* Escala de tamaños */
--w3f-text-xs:   0.75rem;   /* 12px */
--w3f-text-sm:   0.875rem;  /* 14px */
--w3f-text-base: 1rem;      /* 16px */
--w3f-text-lg:   1.125rem;  /* 18px */
--w3f-text-xl:   1.25rem;   /* 20px */
--w3f-text-2xl:  1.5rem;    /* 24px */
--w3f-text-3xl:  1.875rem;  /* 30px */
```

### Radio de bordes

```css
--w3f-radius-none:  0;
--w3f-radius-sm:    0.125rem;  /* 2px  */
--w3f-radius:       0.25rem;   /* 4px  — default de componentes */
--w3f-radius-md:    0.375rem;  /* 6px  */
--w3f-radius-lg:    0.5rem;    /* 8px  */
--w3f-radius-xl:    0.75rem;   /* 12px */
--w3f-radius-2xl:   1rem;      /* 16px */
--w3f-radius-3xl:   1.5rem;    /* 24px */
--w3f-radius-full:  9999px;    /* círculo */
```

### Sombras y transiciones

```css
--w3f-shadow-sm:  0 1px 2px 0 rgba(0,0,0,0.05);
--w3f-shadow:     0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1);
--w3f-shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1), ...;
--w3f-shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), ...;
--w3f-shadow-xl:  0 20px 25px -5px rgba(0,0,0,0.1), ...;

--w3f-transition-fast:    150ms ease-out;
--w3f-transition-normal:  300ms ease;
--w3f-transition-slow:    500ms ease;
```

---

## Crear un tema de marca completo

### Paso 1 — elegir los colores de marca

Para un tema coherente, definís el `primary` y el `secondary` de tu marca, y luego construís sus escalas. La escala 600 suele ser el color "base" que coincide con el logo:

```css
/* theme-fintech.css — tema para una app financiera */

:root {
  /* ── Primario: violeta intenso ── */
  --w3f-primary:      #6d28d9;
  --w3f-primary-50:   #f5f3ff;
  --w3f-primary-100:  #ede9fe;
  --w3f-primary-200:  #ddd6fe;
  --w3f-primary-300:  #c4b5fd;
  --w3f-primary-400:  #a78bfa;
  --w3f-primary-500:  #8b5cf6;
  --w3f-primary-600:  #7c3aed;
  --w3f-primary-700:  #6d28d9;
  --w3f-primary-800:  #5b21b6;
  --w3f-primary-900:  #4c1d95;

  /* ── Secundario: emerald ── */
  --w3f-secondary:      #059669;
  --w3f-secondary-50:   #ecfdf5;
  --w3f-secondary-100:  #d1fae5;
  --w3f-secondary-500:  #10b981;
  --w3f-secondary-600:  #059669;
  --w3f-secondary-700:  #047857;

  /* ── Tipografía de marca ── */
  --w3f-font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* ── Bordes más suaves ── */
  --w3f-radius:    0.5rem;
  --w3f-radius-md: 0.75rem;
  --w3f-radius-lg: 1rem;
  --w3f-radius-xl: 1.5rem;

  /* ── Sombras más pronunciadas ── */
  --w3f-shadow:    0 2px 8px rgba(109, 40, 217, 0.1);
  --w3f-shadow-md: 0 4px 16px rgba(109, 40, 217, 0.15);
  --w3f-shadow-lg: 0 8px 32px rgba(109, 40, 217, 0.2);
}
```

### Paso 2 — definir la dark variant del tema

Cada tema con dark mode necesita su propio bloque `.w3f-theme-dark`. Lo agregás en el mismo archivo:

```css
/* theme-fintech.css — continuación */

.w3f-theme-dark {
  /* Primario más claro para mejor contraste sobre oscuro */
  --w3f-primary:     #a78bfa;
  --w3f-secondary:   #34d399;

  /* Superficies oscuras */
  --w3f-background:      #0f0a1e;   /* fondo casi negro con tinte violeta */
  --w3f-surface:         #1a1030;
  --w3f-surface-variant: #251845;

  /* Textos claros */
  --w3f-on-background:   #f5f3ff;
  --w3f-on-surface:      #ede9fe;
  --w3f-on-primary:      #1a1030;

  /* Bordes sutiles en oscuro */
  --w3f-outline:         #4c1d95;
  --w3f-outline-variant: #2e1065;

  /* Sombras con tinte de marca */
  --w3f-shadow:    0 2px 8px rgba(0, 0, 0, 0.5);
  --w3f-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.6);
  --w3f-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.7);
}
```

### Paso 3 — cargar el tema

En Vite, importás el archivo después del CSS base del framework:

```tsx
// main.tsx
import '@w3f/w3fussion/main_W3_V2.css'
import './styles/theme-fintech.css'   // override de tokens
```

En Next.js, el orden es: `w3f.css` (via `<link>`) → `globals.css` (con tus tokens):

```css
/* app/globals.css */
@import './styles/theme-fintech.css';
```

---

## Dark mode avanzado

### Sistema automático — `prefers-color-scheme`

Para respetar la preferencia del sistema operativo del usuario sin intervención manual:

```css
/* globals.css */
@media (prefers-color-scheme: dark) {
  :root {
    /* Las mismas variables que .w3f-theme-dark */
    --w3f-background:      #111827;
    --w3f-surface:         #1f2937;
    --w3f-surface-variant: #374151;
    --w3f-on-background:   #f9fafb;
    --w3f-on-surface:      #f3f4f6;
    --w3f-outline:         #4b5563;
    --w3f-outline-variant: #374151;
    --w3f-primary:         #60a5fa;
    --w3f-secondary:       #fb923c;
  }
}
```

Esto aplica el tema oscuro automáticamente según el sistema, sin ningún JavaScript.

### Toggle manual con persistencia en localStorage

El patrón estándar para un toggle que recuerde la preferencia del usuario:

```tsx
// hooks/useDarkMode.ts
'use client'

import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    // Leer preferencia guardada, con fallback al sistema
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('w3f-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('w3f-theme-dark')
    } else {
      root.classList.remove('w3f-theme-dark')
    }
    localStorage.setItem('w3f-theme', dark ? 'dark' : 'light')
  }, [dark])

  return { dark, toggle: () => setDark(d => !d) }
}
```

```tsx
// components/dark-mode-toggle.tsx
'use client'

import { useDarkMode } from '@/hooks/useDarkMode'
import Button from '@w3f/components/INPUTS/Button/Button'
import { Sun, Moon } from 'lucide-react'

export function DarkModeToggle() {
  const { dark, toggle } = useDarkMode()

  return (
    <Button variant="icon" onClick={toggle} ariaLabel="Cambiar modo oscuro">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
```

### Sistema de 3 estados: light / dark / auto

Más completo — el usuario puede elegir light, dark o seguir al sistema:

```tsx
'use client'

import { useState, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'auto'

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'auto'
    return (localStorage.getItem('w3f-theme-mode') as ThemeMode) ?? 'auto'
  })

  useEffect(() => {
    const root = document.documentElement

    const apply = (isDark: boolean) => {
      root.classList.toggle('w3f-theme-dark', isDark)
    }

    if (mode === 'auto') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      apply(mq.matches)
      const handler = (e: MediaQueryListEvent) => apply(e.matches)
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    } else {
      apply(mode === 'dark')
    }

    localStorage.setItem('w3f-theme-mode', mode)
  }, [mode])

  return { mode, setMode }
}
```

---

## Sistema multi-tema

Para apps que ofrecen más de 2 temas (ej: light / dark / high-contrast / brand-blue):

### Definir los temas como clases CSS

```css
/* styles/themes.css */

/* Tema por defecto — light (ya definido en _variables.css) */

/* Tema oscuro */
.theme-dark {
  --w3f-background:     #111827;
  --w3f-surface:        #1f2937;
  --w3f-on-background:  #f9fafb;
  --w3f-on-surface:     #f3f4f6;
  --w3f-primary:        #60a5fa;
  /* ... */
}

/* Alto contraste */
.theme-high-contrast {
  --w3f-background:       #000000;
  --w3f-surface:          #1a1a1a;
  --w3f-on-background:    #ffffff;
  --w3f-on-surface:       #ffffff;
  --w3f-primary:          #ffff00;
  --w3f-outline:          #ffffff;
  --w3f-outline-variant:  #888888;
}

/* Tema corporativo azul */
.theme-corp-blue {
  --w3f-primary:     #0ea5e9;
  --w3f-secondary:   #0284c7;
  --w3f-background:  #f0f9ff;
  --w3f-surface:     #ffffff;
  --w3f-radius:      0.25rem;
  --w3f-radius-md:   0.375rem;
}
```

### Hook de multi-tema

```tsx
// hooks/useTheme.ts
'use client'

import { useState, useEffect } from 'react'

const THEMES = ['light', 'dark', 'high-contrast', 'corp-blue'] as const
type Theme = typeof THEMES[number]

const CLASS_MAP: Record<Theme, string | null> = {
  'light':          null,              // clase base — sin clase extra
  'dark':           'theme-dark',
  'high-contrast':  'theme-high-contrast',
  'corp-blue':      'theme-corp-blue',
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('w3f-active-theme') as Theme) ?? 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    // Remover todas las clases de tema anteriores
    Object.values(CLASS_MAP).forEach(cls => {
      if (cls) root.classList.remove(cls)
    })
    // Aplicar la nueva
    const cls = CLASS_MAP[theme]
    if (cls) root.classList.add(cls)

    localStorage.setItem('w3f-active-theme', theme)
  }, [theme])

  return { theme, setTheme, themes: THEMES }
}
```

```tsx
// components/theme-selector.tsx
'use client'

import { useTheme } from '@/hooks/useTheme'
import Select from '@w3f/components/INPUTS/Select/Select'

const LABELS = {
  'light':          'Claro',
  'dark':           'Oscuro',
  'high-contrast':  'Alto contraste',
  'corp-blue':      'Corporativo',
}

export function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <Select
      value={theme}
      onChange={(val) => setTheme(val as any)}
      options={themes.map(t => ({ value: t, label: LABELS[t] }))}
      label="Tema"
    />
  )
}
```

---

## Tokens de componente específicos

Además de los tokens globales, muchos componentes exponen sus propias variables CSS. Estas permiten personalizar un componente sin afectar nada más.

### Ejemplos de variables por componente

```css
/* Accordion */
.mi-accordion {
  --w3f-acc-radius:           12px;
  --w3f-acc-border-color:     #e5e7eb;
  --w3f-acc-summary-hover-bg: #f9fafb;
  --w3f-acc-icon-active-color: var(--w3f-primary);
  --w3f-acc-item-bg:          #ffffff;
  --w3f-acc-shadow:           0 2px 8px rgba(0,0,0,0.08);
}

/* Window */
.mi-ventana {
  --w3f-win-os-mac-radius:  12px;
  --w3f-win-os-mac-shadow:  0 20px 60px rgba(0,0,0,0.3);
  --w3f-win-os-mac-tb-bg:   rgba(240, 240, 240, 0.8);
  --w3f-win-body-bg:        rgba(255, 255, 255, 0.95);
}

/* SpeedDial / FAB */
.mi-fab {
  --w3f-sdial-fab-bg:       linear-gradient(135deg, #f43f5e, #ec4899);
  --w3f-sdial-fab-hover-bg: #e11d48;
  --w3f-sdial-fab-color:    #ffffff;
}

/* Menú */
.mi-menubar {
  --w3f-menu-trigger-color:     #e2e8f0;
  --w3f-menu-trigger-hover-bg:  rgba(255,255,255,0.08);
  --w3f-menu-dropdown-bg:       #1e293b;
  --w3f-menu-dropdown-border:   #334155;
  --w3f-menu-btn-color:         #cbd5e1;
  --w3f-menu-btn-hover-color:   #38bdf8;
}

/* Sidenav */
.mi-sidebar {
  --w3f-sidenav-bg:           #0f172a;
  --w3f-sidenav-tree-bg:      #1e293b;
  --w3f-sidenav-node-color:   #cbd5e1;
  --w3f-sidenav-node-hover-bg: #334155;
  --w3f-sidenav-icon-color:   #38bdf8;
}
```

Para aplicarlos, pasás la clase con `className` al componente y definís las variables en tu CSS:

```tsx
<Accordion className="mi-accordion">
  {/* ... */}
</Accordion>

<Window className="mi-ventana" title="Editor" draggable closable>
  {/* ... */}
</Window>
```

### Dónde encontrar las variables de cada componente

Cada componente tiene un `README.md` en su carpeta con la lista de CSS vars que expone:

```
packages/components/src/SURFACES/Acordion/README.md
packages/components/src/SURFACES/Window/README.md
packages/components/src/NAVIGATION/SpeedDial/README.md
```

---

## Tema en Next.js — sin flash de contenido

El problema clásico: el usuario guardó "dark mode", el servidor renderiza en "light", el cliente carga y corrige → flash de contenido (FOUC).

### Solución: script inline en `<head>`

El truco es ejecutar un pequeño script antes de que el HTML se pinte, que lea `localStorage` y aplique la clase de tema inmediatamente:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/w3f.css" />
        {/* Script inline — aplica el tema antes del primer paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('w3f-theme-mode');
                  var isDark = mode === 'dark' ||
                    (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) document.documentElement.classList.add('w3f-theme-dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

`suppressHydrationWarning` en `<html>` es necesario porque el script modifica la clase del DOM antes de que React hidrate, y React detectaría una diferencia entre el HTML del servidor y el cliente.

### Solución con cookies (para SSR más preciso)

Para que el servidor también conozca el tema y renderice correctamente desde el inicio:

```tsx
// middleware.ts — Next.js middleware (corre en el Edge antes del render)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const theme = request.cookies.get('w3f-theme')?.value ?? 'light'
  const response = NextResponse.next()
  // Pasar el tema como header para que el layout lo lea
  response.headers.set('x-w3f-theme', theme)
  return response
}
```

```tsx
// app/layout.tsx — lee el tema del header
import { headers } from 'next/headers'

export default async function RootLayout({ children }) {
  const headersList = await headers()
  const theme = headersList.get('x-w3f-theme') ?? 'light'

  return (
    <html lang="es" className={theme === 'dark' ? 'w3f-theme-dark' : ''}>
      <head>
        <link rel="stylesheet" href="/w3f.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// hooks/useTheme.ts — guarda en cookie además de localStorage
'use client'

useEffect(() => {
  document.cookie = `w3f-theme=${dark ? 'dark' : 'light'}; path=/; max-age=31536000`
  localStorage.setItem('w3f-theme', dark ? 'dark' : 'light')
  document.documentElement.classList.toggle('w3f-theme-dark', dark)
}, [dark])
```

---

## Ejercicio práctico

Construí un sistema de temas completo con 3 opciones:

1. Definí un archivo `themes.css` con los temas `light`, `dark` y `purple`
2. Creá un hook `useTheme` que persista en `localStorage`
3. Usá el `ThemeSelector` en el AppBar
4. Garantizá que no haya flash en Next.js con el script inline

**Solución:**

```css
/* styles/themes.css */
:root {
  /* Light — valores por defecto del framework */
}

.theme-dark {
  --w3f-background:     #111827;
  --w3f-surface:        #1f2937;
  --w3f-on-background:  #f9fafb;
  --w3f-on-surface:     #f3f4f6;
  --w3f-primary:        #60a5fa;
  --w3f-outline:        #4b5563;
  --w3f-outline-variant: #374151;
}

.theme-purple {
  --w3f-primary:     #7c3aed;
  --w3f-secondary:   #059669;
  --w3f-background:  #faf5ff;
  --w3f-surface:     #ffffff;
  --w3f-radius:      0.5rem;
  --w3f-radius-md:   0.75rem;
  --w3f-font-family: 'Inter', sans-serif;
}
```

```tsx
// hooks/useTheme.ts
'use client'

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'purple'
const CLASS_MAP: Record<Theme, string | null> = {
  light:  null,
  dark:   'theme-dark',
  purple: 'theme-purple',
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('w3f-theme') as Theme) ?? 'light'
  })

  const setTheme = (next: Theme) => {
    const root = document.documentElement
    Object.values(CLASS_MAP).forEach(c => { if (c) root.classList.remove(c) })
    const cls = CLASS_MAP[next]
    if (cls) root.classList.add(cls)
    localStorage.setItem('w3f-theme', next)
    setThemeState(next)
  }

  useEffect(() => {
    setTheme(theme)
  }, [])   // aplicar al montar

  return { theme, setTheme }
}
```

```tsx
// app/layout.tsx — sin flash
export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/w3f.css" />
        <link rel="stylesheet" href="/themes.css" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t = localStorage.getItem('w3f-theme') || 'light';
            if (t !== 'light') document.documentElement.classList.add('theme-' + t);
          })();
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Referencia rápida — tokens globales

| Grupo | Variables clave |
|---|---|
| Colores semánticos | `--w3f-primary`, `--w3f-secondary`, `--w3f-success`, `--w3f-warning`, `--w3f-danger`, `--w3f-info` |
| Escala por color | `--w3f-primary-{50..900}` (y equivalentes para secondary, success, etc.) |
| Superficie | `--w3f-background`, `--w3f-surface`, `--w3f-surface-variant`, `--w3f-on-*`, `--w3f-outline*` |
| Grises | `--w3f-gray-{50..900}` |
| Espaciado | `--w3f-space-{1,2,3,4,5,6,8,10,12,16}` |
| Tipografía | `--w3f-font-family`, `--w3f-font-display`, `--w3f-font-mono`, `--w3f-text-{xs..3xl}` |
| Radio | `--w3f-radius-{none,sm,,md,lg,xl,2xl,3xl,full}` |
| Sombras | `--w3f-shadow-{sm,,md,lg,xl}` |
| Transiciones | `--w3f-transition-{fast,normal,slow}` |

---

## Siguiente paso

[Capítulo 21 — Composable CSS y sistema de capas](./21-composable-css.md)
