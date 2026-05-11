# @w3f/components

Libreria de componentes React del framework W3Fussion.

- **121 componentes UI** — inputs, layout, surfaces, navigation, feedback, datadisplay, media, auth, commerce
- **43 charts** — bar, line, area, pie, scatter, heatmap, network, sankey, y mas (basados en visx)
- **CSS custom properties** — theming completo via `--w3f-*` vars, sin !important
- **Composable CSS** — modo `unstyled` para control total de estilos
- **TypeScript** — tipos completos para todos los componentes

---

## Instalacion

```bash
# Desde este repo (recomendado)
npm install git+https://github.com/USER/w3f-components.git

# Una vez publicado en npm
npm install @w3f/components
```

## Uso basico

```tsx
// 1. Importar CSS (obligatorio)
import '@w3f/components/css/base'    // estructura y layout
import '@w3f/components/css/theme'   // presets visuales (opcional)

// 2. Importar componentes
import Button from '@w3f/components/INPUTS/Button/Button'
import Input  from '@w3f/components/INPUTS/Input/Input'
import Stack  from '@w3f/components/LAYOUT/Stack/Stack'
import Card   from '@w3f/components/DATADISPLAY/Card/Card'

// 3. Usar
function App() {
  return (
    <Stack gap="1rem">
      <Input label="Nombre" name="name" />
      <Button variant="raised" color="primary">Guardar</Button>
    </Stack>
  );
}
```

## Importar charts

```tsx
import BarChart from '@w3f/components/DATADISPLAY/Charts/BarChart/BarChart'
import LineChart from '@w3f/components/DATADISPLAY/Charts/LineChart/LineChart'
```

## Personalizacion de estilos

```css
/* Nivel 1: Override global via CSS vars */
:root {
  --w3f-primary: #6200ee;
  --w3f-button-radius: 24px;
  --w3f-input-border-color: #ccc;
}

/* Nivel 2: Clase tema */
.mi-tema .w3f-button {
  --w3f-button-bg: #bb86fc;
  --w3f-button-color: #000;
}

/* Nivel 3: Unstyled + custom total */
/* <Button unstyled className="mi-boton"> */
.mi-boton {
  /* estilos desde cero */
}
```

## Estructura del repo

```
src/           — codigo fuente de los componentes
css/           — CSS framework (base, theme, tokens, presets)
docs/          — manual de usuario (en construccion)
scripts/       — utilidades de sync y build
dist/          — output compilado (gitignored, generado con npm run build)
```

## Desarrollo

Este paquete se desarrolla en [w3f-platform](https://github.com/USER/w3f-platform) (monorepo laboratorio).
Los cambios estables se sincronizan aqui via `scripts/sync-from-platform.sh`.

---

Ver [docs/README.md](docs/README.md) para el manual completo (en construccion).
