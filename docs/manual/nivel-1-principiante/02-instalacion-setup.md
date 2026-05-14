# Capítulo 02 — Instalación y setup

**Nivel:** Principiante
**Tiempo estimado de lectura:** 20 minutos

---

## ¿Qué vas a aprender?

- Requisitos previos para correr el proyecto
- Cómo clonar el repositorio e instalar las dependencias
- Cómo levantar el servidor de desarrollo
- Qué ves cuando abrís el navegador por primera vez
- Cómo importar un componente y verlo en pantalla

---

## Requisitos previos

Antes de empezar, necesitás tener instalado:

| Herramienta | Version minima | Para qué |
|---|---|---|
| Node.js | >= 18 | Runtime de JavaScript |
| pnpm | >= 9 | Gestor de paquetes del monorepo |
| Git | cualquier version reciente | Clonar el repositorio |

### Instalar pnpm

Si ya tenés Node instalado pero no pnpm:

```bash
npm install -g pnpm
```

Verificá que todo esté instalado:

```bash
node --version   # v18.x o superior
pnpm --version   # 9.x o superior
git --version
```

---

## Clonar e instalar

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/w3f-platform.git
cd w3f-platform

# 2. Instalar todas las dependencias del monorepo
pnpm install
```

`pnpm install` descarga las dependencias de todos los paquetes del monorepo de una sola vez.
La primera vez puede tardar unos minutos.

---

## Levantar el servidor de desarrollo

```bash
pnpm dev
```

Eso es todo. Este comando corre la app de demos en modo desarrollo.

Abrí el navegador en `http://localhost:5173`.

---

## ¿Qué ves al abrir el navegador?

El punto de entrada es el **W3F Hub** — una pantalla estilo launcher que te permite:

- Crear y gestionar proyectos del Studio
- Navegar al modo **Demos** (ver los 121 componentes en acción)
- Abrir el **Studio** (PageBuilder, TraitComposer, CSS Customizer)

```
+--------------------------------------------------+
|                   W3F Hub                        |
|                                                  |
|  [+ Nuevo Proyecto]  [Ver Demos]  [Docs]         |
|                                                  |
|  Proyectos recientes:                            |
|  [ Mi App ]  [ Dashboard ]  [ Landing ]          |
+--------------------------------------------------+
```

Para ver los componentes: hacé click en **Ver Demos** o en cualquier componente
de la galería. Cada demo es interactiva y muestra el código de uso.

---

## Estructura de la app de desarrollo

El punto de entrada es `apps/demo/src/`:

```
apps/demo/src/
├── main.tsx        <- monta la app React, importa el CSS global
├── App.tsx         <- router entre Hub / Studio / Demos
├── DemoIndex.tsx   <- carga lazy de todas las demos (121 componentes)
└── index.css       <- estilos propios de la app demo
```

### ¿Cómo se importa el CSS del framework?

En `main.tsx` hay una sola línea que trae todo el CSS:

```tsx
import '@w3f/w3fussion/main_W3_V2.css';
```

Eso importa el framework CSS completo (tokens, componentes, layout, utilidades).
En tu propio proyecto harías lo mismo, o importarías los archivos separados
`base.css` / `theme.css` del paquete publicado.

---

## Los alias de imports

Vite está configurado con alias para que los imports sean cortos y portables:

| Alias | Resuelve a |
|---|---|
| `@w3f/components` | `packages/components/src/` |
| `@w3f/components/DEMOS` | `packages/components/DEMOS/` |
| `@w3f/w3fussion` | `packages/css-framework/src/` |
| `@w3f/studio` | `packages/studio/src/` |

Eso significa que en cualquier archivo del proyecto podés escribir:

```tsx
import Button from '@w3f/components/INPUTS/Button/Button'
// en lugar de: import Button from '../../../../packages/components/src/INPUTS/Button/Button'
```

---

## Tu primer componente en pantalla

La forma más rapida de ver un componente funcionando es editar la demo activa.

Abri `apps/demo/src/DemoIndex.tsx` y fijate cómo están organizadas las demos.
Cada demo es un import lazy con un id de ruta:

```tsx
// Ejemplo de cómo se registra una demo en DemoIndex.tsx
{ id: 'button',  label: 'Button',  component: lazy(() => import('@w3f/components/DEMOS/INPUTS/Button/ButtonDemo')) },
{ id: 'card',    label: 'Card',    component: lazy(() => import('@w3f/components/DEMOS/DATADISPLAY/Card/CardDemo')) },
```

Si querés hacer una prueba rápida sin tocar el DemoIndex, podés editar `App.tsx`
directamente y renderizar un componente en el root:

```tsx
// apps/demo/src/App.tsx  (modificación temporal para pruebas)
import Button from '@w3f/components/INPUTS/Button/Button'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'

export default function App() {
  return (
    <Stack gap={4} padding={4}>
      <Button variant="filled" color="primary">Hola W3F</Button>
      <Button variant="outlined" color="secondary">Otro boton</Button>
      <Button variant="text">Texto</Button>
    </Stack>
  )
}
```

Guardá el archivo — Vite actualiza el navegador al instante (HMR).

Cuando termines las pruebas, revertí `App.tsx` a su estado original.

---

## Comandos disponibles

Desde la raíz del monorepo:

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Levanta la app de demos en modo desarrollo (puerto 5173) |
| `pnpm build` | Genera el bundle de producción de la app de demos |
| `pnpm test` | Corre los tests de los componentes |
| `pnpm lint` | Verifica el código con ESLint |

---

## Problemas frecuentes

### "Cannot find module '@w3f/components/...'"
El alias está definido solo en `apps/demo/vite.config.ts`.
Si corrés Vite desde otra carpeta, ese alias no existe.
Siempre corré `pnpm dev` desde la raíz del monorepo.

### "pnpm: command not found"
```bash
npm install -g pnpm
```

### El puerto 5173 ya está en uso
```bash
pnpm dev -- --port 5174
```

### Cambios en el código no se reflejan en el browser
Vite tiene HMR activo por defecto. Si no funciona, recargá manualmente con `Ctrl+R`.
Si el problema persiste, reiniciá el servidor con `Ctrl+C` y `pnpm dev` de nuevo.

---

## Resumen

```bash
git clone https://github.com/TU_USUARIO/w3f-platform.git
cd w3f-platform
pnpm install
pnpm dev
# → http://localhost:5173
```

Con eso tenés el framework corriendo localmente con los 121 componentes disponibles,
el Studio visual y todas las demos interactivas.

---

## Siguiente paso

[Capítulo 03 — Primer componente](03-primer-componente.md)

Vas a conocer el componente más simple del framework (`Button`), entender sus props
y combinarlo con `Stack` para construir tu primera UI.
