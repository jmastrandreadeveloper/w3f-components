# Análisis FEEDBACK — Propuestas de Mejora

> Fecha: 2026-03-21
> Componentes analizados: Alert, Backdrop, Notifications, Ripple, Snackbar

---

## 1. Alert

### Estado actual
- `AlertProvider` + `useAlert` hook + `dispatchAlert` (CustomEvent)
- Renderiza `<Note>` internamente (delega 100% del visual)
- CSS: posiciones fixed, animación fade-in, responsive, dark mode
- 5 archivos TSX pattern completo

### Problemas detectados
- **Sin CSS custom properties** en `.w3f-alert-container` — no se puede tematizar via CSS vars (max-width, gap, z-index, etc. están hardcoded o usan tokens globales directamente)
- **Sin prop `position` en tiempo real** — una vez montado el AlertProvider, la posición no cambia dinámicamente si se actualiza la prop
- **`generateAlertId` usa counter** — funciona pero no es collision-safe entre múltiples providers

### Mejoras propuestas
| # | Mejora | Impacto | Esfuerzo |
|---|--------|---------|----------|
| A1 | Agregar CSS custom properties al `.w3f-alert-container` (`--w3f-alert-max-width`, `--w3f-alert-gap`, `--w3f-alert-z`, `--w3f-alert-offset`) | Tematización | Bajo |
| A2 | Agregar prop `className` al AlertProvider para poder aplicar overrides CSS | Flexibilidad | Bajo |
| A3 | Agregar soporte para `title` en las alertas (actualmente solo `message`) | Feature | Medio |

---

## 2. Backdrop

### Estado actual
- Portal rendering con `createPortal`
- ProgressSpinner integrado como loading indicator
- `useScrollLock` para bloquear scroll del body
- `useBackdrop` hook para gestión de estado
- forwardRef + component prop polimórfico
- 5 archivos TSX pattern completo

### Problemas detectados
- **Sin CSS custom properties** — `background-color`, `transition-duration`, `z-index` son inline o hardcoded
- **`z-index` inline** (`BACKDROP_Z_INDEX = 1200`) — no configurable via CSS
- **Sin animación de entrada/salida** — solo opacity transition, no hay slide o scale
- **`!open` retorna `null` inmediatamente** — no permite animación de salida (el componente desaparece antes de que la transición termine)

### Mejoras propuestas
| # | Mejora | Impacto | Esfuerzo |
|---|--------|---------|----------|
| B1 | Agregar CSS custom properties: `--w3f-backdrop-bg`, `--w3f-backdrop-z`, `--w3f-backdrop-transition`, `--w3f-backdrop-blur` | Tematización | Bajo |
| B2 | Implementar exit animation (mantener en DOM durante `transitionDuration` ms antes de desmontar) | UX | Medio |
| B3 | Agregar prop `blur` para backdrop-filter blur nativo (actualmente solo via className custom) | Feature | Bajo |
| B4 | Mover z-index de inline a CSS custom property | Consistencia | Bajo |

---

## 3. Notifications

### Estado actual
- `NotificationProvider` + `useNotification` + `dispatchNotification` (CustomEvent)
- `NotificationCard` con progress bar, pause-on-hover, exit animation
- Glassmorphic card design (backdrop-filter blur)
- SVG icons inline por tipo
- 5 archivos TSX pattern completo

### Problemas detectados
- **Sin CSS custom properties** en `.w3f-notification` — los colores, tamaños, blur, border-radius están hardcoded en el CSS
- **`dangerouslySetInnerHTML`** para iconos SVG — funciona pero es un vector de XSS si los iconos vienen de input externo (actualmente son constantes internas, así que es seguro, pero el patrón es mejorable)
- **Progress bar timer drift** — usa `requestAnimationFrame` + `Date.now()` que es correcto, pero `remainingRef` se calcula en el mouseEnter handler y puede desincronizarse del visual si hay pausas múltiples
- **`clearAll` no tiene animación de salida** — los cards desaparecen inmediatamente

### Mejoras propuestas
| # | Mejora | Impacto | Esfuerzo |
|---|--------|---------|----------|
| N1 | Agregar CSS custom properties: `--w3f-notif-bg`, `--w3f-notif-radius`, `--w3f-notif-shadow`, `--w3f-notif-blur`, `--w3f-notif-border`, `--w3f-notif-icon-size`, `--w3f-notif-progress-height` | Tematización | Bajo |
| N2 | Reemplazar `dangerouslySetInnerHTML` con componentes React SVG (como los iconos de Window) | Seguridad | Bajo |
| N3 | Agregar `clearAll` con animación de salida secuencial (stagger) | UX | Medio |
| N4 | Agregar prop `position` dinámica al provider (reaccionar a cambios en runtime) | Feature | Bajo |

---

## 4. Ripple

### Estado actual
- Material Design ripple effect con click + keyboard handlers
- Imperative ref API (`launch`, `fadeOutAll`)
- Color variants via `data-ripple-color` attribute
- Flat mode, centered mode, disabled state
- 5 archivos TSX pattern completo

### Problemas detectados
- **`transition: all` en `.w3f-ripple-container`** — causa lag en hover/active (mismo problema que Window tenía). Debe ser específico: `transition: transform, box-shadow`
- **Sin CSS custom properties** — animation duration, ripple opacity, hover transform, etc. están hardcoded
- **Hover eleva TODOS los ripple containers** — `translateY(-2px)` + box-shadow en hover es agresivo para containers que ya tienen su propio styling (ej: cards)
- **`useRipple` crea DOM elements manualmente** — `document.createElement('div')` + `appendChild` — no es React-idiomatic (funciona pero bypasses React reconciliation)

### Mejoras propuestas
| # | Mejora | Impacto | Esfuerzo |
|---|--------|---------|----------|
| R1 | **Cambiar `transition: all` a `transition: transform var(...), box-shadow var(...)`** | Performance | Bajo |
| R2 | Agregar CSS custom properties: `--w3f-ripple-duration`, `--w3f-ripple-opacity`, `--w3f-ripple-hover-y`, `--w3f-ripple-hover-shadow`, `--w3f-ripple-color` | Tematización | Bajo |
| R3 | Agregar prop `noHoverEffect` (alias de `flat` pero más explícito) o documentar que `flat` desactiva hover | DX | Bajo |
| R4 | Considerar migrar creación de ripple elements a React state (array de ripples) en vez de DOM manual — mejoraría debugging y React DevTools | Calidad | Alto |

---

## 5. Snackbar

### Estado actual
- Material Design snackbar con 5 variantes de color
- 6 posiciones anchor
- Action slot custom
- Pause-on-hover, Escape key
- `useSnackbar` hook con helpers tipados (showSuccess, showWarning, etc.)
- Backwards-compatible aliases (show/duration)
- 5 archivos TSX pattern completo

### Problemas detectados
- **Sin CSS custom properties** — bg, text color, radius, shadow, max-width, z-index todos hardcoded
- **`transition: all` en `.w3f-snackbar__close`** — debería ser `transition: background-color, transform`
- **Solo un snackbar a la vez** — `useSnackbar` gestiona un solo estado. Si se llama `showSnackbar` mientras otro está visible, lo reemplaza sin animación de salida
- **Exit animation + desmontaje** — el timeout de exit usa `SNACKBAR_DEFAULTS.exitAnimationDuration` (150ms) pero si el componente se re-renderiza durante ese periodo, puede haber flash

### Mejoras propuestas
| # | Mejora | Impacto | Esfuerzo |
|---|--------|---------|----------|
| S1 | Agregar CSS custom properties: `--w3f-snack-bg`, `--w3f-snack-color`, `--w3f-snack-radius`, `--w3f-snack-shadow`, `--w3f-snack-max-width`, `--w3f-snack-z`, `--w3f-snack-close-color` | Tematización | Bajo |
| S2 | **Cambiar `transition: all` a específico en `.w3f-snackbar__close`** | Performance | Bajo |
| S3 | Agregar soporte para queue de snackbars (mostrar siguiente después de que el actual se cierre) | Feature | Medio |
| S4 | Portal rendering (actualmente es `position: fixed` sin portal — funciona pero puede ser clippeado por `overflow: hidden` en ancestros) | Robustez | Medio |

---

## Resumen de prioridades

### Hacer AHORA (impacto alto, esfuerzo bajo)
- **R1**: Quitar `transition: all` de Ripple (causa lag real, mismo fix que Window)
- **S2**: Quitar `transition: all` de Snackbar close button
- **B1, N1, S1, R2, A1**: Agregar CSS custom properties a los 5 componentes (consistencia con el resto del framework — los ~54 componentes restantes ya lo tienen)

### Hacer DESPUÉS (features)
- B2: Exit animation para Backdrop
- N2: Eliminar dangerouslySetInnerHTML de Notifications
- N3: clearAll con stagger animation
- S3: Queue de snackbars
- A3: Title en alertas
- S4: Portal para Snackbar

### CONSIDERAR (refactoring mayor)
- R4: Migrar Ripple de DOM manual a React state
