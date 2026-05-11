# _avatar.css

**Ruta:** `src/w3fussion/DATADISPLAY/_avatar.css`
**Importado en:** `src/w3fussion/main_W3_V2.css`

---

## Finalidad

Define todos los estilos visuales del componente Avatar usando el sistema de tokens
de diseño W3F (`var(--w3f-*)`). Las clases son generadas dinámicamente por
`buildAvatarClasses` en `Avatar.utils.ts` y aplicadas en `Avatar.tsx`.

No hay estilos en línea (`style={...}`) en el componente, salvo el `display: none`
del input file oculto. Todo lo demás vive aquí.

---

## Secciones del archivo

### 1. Clase base — `.w3f-avatar`

```css
.w3f-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  flex-shrink: 0;
  position: relative;
  font-weight: 500;
  color: var(--w3f-on-primary);
  transition: transform var(--w3f-transition-fast),
              box-shadow var(--w3f-transition-fast);
}
```

| Propiedad | Razón |
|---|---|
| `display: inline-flex` + centrado | Centra imagen o texto sin importar el tamaño |
| `overflow: hidden` | Recorta la imagen para que no sobresalga del círculo |
| `user-select: none` | Evita selección de texto de las iniciales al hacer clic |
| `flex-shrink: 0` | Impide que el avatar se comprima en layouts flex |
| `position: relative` | Punto de referencia para los overlays de status y badge |
| `font-weight: 500` | Las iniciales aparecen en peso medio |
| `color: var(--w3f-on-primary)` | Texto blanco sobre fondos de color |
| `transition` | Anima el efecto hover (transform + box-shadow) |

---

### 2. Forma circular — `.w3f-avatar-circle`

```css
.w3f-avatar-circle {
  border-radius: var(--w3f-radius-full);
}
```

Clase separada de la base para permitir en el futuro variantes cuadradas o
redondeadas sin duplicar reglas.

---

### 3. Tamaños

```css
.w3f-avatar-small  { width: 32px;  height: 32px;  font-size: var(--w3f-text-xs);   }
.w3f-avatar-medium { width: 48px;  height: 48px;  font-size: var(--w3f-text-base); }
.w3f-avatar-large  { width: 64px;  height: 64px;  font-size: var(--w3f-text-xl);   }
.w3f-avatar-xlarge { width: 96px;  height: 96px;  font-size: var(--w3f-text-3xl);  }
```

La fuente escala con el tamaño para que las iniciales siempre sean proporcionales.

---

### 4. Contenido interno

```css
/* Imagen */
.w3f-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Iniciales */
.w3f-avatar-text {
  text-transform: uppercase;
  line-height: 1;
}
```

- `object-fit: cover` — recorta la imagen para llenar el círculo sin deformarla.
- `text-transform: uppercase` — las iniciales siempre en mayúsculas.

---

### 5. Paleta de colores de fondo

Cada color mapea a un token W3F o a un valor hexadecimal fijo:

| Clase | Color | Token o Hex |
|---|---|---|
| `.w3f-avatar-red` | Rojo | `var(--w3f-danger-500)` |
| `.w3f-avatar-pink` | Rosa | `#e91e63` |
| `.w3f-avatar-purple` | Púrpura | `#9c27b0` |
| `.w3f-avatar-deep-purple` | Púrpura oscuro | `#673ab7` |
| `.w3f-avatar-indigo` | Índigo | `#3f51b5` |
| `.w3f-avatar-blue` | Azul | `var(--w3f-primary-600)` |
| `.w3f-avatar-light-blue` | Azul claro | `var(--w3f-primary-400)` |
| `.w3f-avatar-cyan` | Cian | `var(--w3f-info-500)` |
| `.w3f-avatar-teal` | Teal | `#009688` |
| `.w3f-avatar-green` | Verde | `var(--w3f-success-500)` |
| `.w3f-avatar-light-green` | Verde claro | `var(--w3f-success-400)` |
| `.w3f-avatar-lime` | Lima | `#cddc39` |
| `.w3f-avatar-yellow` | Amarillo | `var(--w3f-warning-400)` |
| `.w3f-avatar-amber` | Ámbar | `var(--w3f-warning-500)` |
| `.w3f-avatar-orange` | Naranja | `var(--w3f-secondary-500)` |
| `.w3f-avatar-brown` | Marrón | `#795548` |
| `.w3f-avatar-gray` | Gris | `var(--w3f-gray-500)` |

> Solo se aplica cuando no hay imagen (`buildAvatarClasses` omite esta clase si `src` es truthy).

---

### 6. Efectos hover — `.w3f-avatar-hoverable`

```css
.w3f-avatar-hoverable           { cursor: pointer; }
.w3f-avatar-hoverable:hover     { transform: scale(1.05); box-shadow: var(--w3f-shadow-md); }
.w3f-avatar-hoverable:active    { transform: scale(0.98); }
```

- `:hover` → crecimiento del 5% + sombra para indicar interactividad.
- `:active` → compresión al 98% para feedback táctil de pulsación.

Esta clase se activa cuando `hoverable = true` o `uploadable = true`.

---

### 7. Contenedor wrapper — `.w3f-avatar-wrapper`

```css
.w3f-avatar-wrapper {
  position: relative;
  display: inline-block;
}
```

Se renderiza solo cuando hay `status` o `badge`. Provee el contexto de
`position: relative` para los elementos posicionados absolutamente.

---

### 8. Indicador de estado — `.w3f-avatar-status`

```css
.w3f-avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  min-width: 10px;
  min-height: 10px;
  border-radius: var(--w3f-radius-full);
  border: 2px solid var(--w3f-surface);
  box-sizing: content-box;
}
```

- Esquina inferior derecha del wrapper.
- Tamaño proporcional (25%) con mínimo fijo de 10 px para legibilidad en tamaños pequeños.
- Borde del color del fondo del surface → crea separación visual del avatar.

| Modificador | Color |
|---|---|
| `.w3f-avatar-status-online` | `var(--w3f-success-500)` — verde |
| `.w3f-avatar-status-offline` | `var(--w3f-gray-400)` — gris |
| `.w3f-avatar-status-busy` | `var(--w3f-danger-500)` — rojo |
| `.w3f-avatar-status-away` | `var(--w3f-warning-500)` — amarillo |

---

### 9. Badge numérico — `.w3f-avatar-badge`

```css
.w3f-avatar-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--w3f-danger-500);
  color: var(--w3f-on-primary);
  border-radius: var(--w3f-radius-full);
  padding: 2px 6px;
  font-size: var(--w3f-text-xs);
  font-weight: 600;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--w3f-surface);
  box-sizing: content-box;
  line-height: 1;
}
```

- Posicionado en la esquina superior derecha con desplazamiento negativo de 4 px.
- Fondo rojo (siempre danger, independiente del color del avatar).
- `min-width: 20px` → círculo para un dígito, píldora para múltiples.

---

### 10. Grupo de avatares — `.w3f-avatar-group`

```css
.w3f-avatar-group {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
}

.w3f-avatar-group .w3f-avatar,
.w3f-avatar-group .w3f-avatar-wrapper {
  margin-left: -12px;
  border: 2px solid var(--w3f-surface);
  box-sizing: content-box;
  transition: transform var(--w3f-transition-fast);
}

.w3f-avatar-group .w3f-avatar-wrapper .w3f-avatar {
  border: none; /* evita doble borde */
}

.w3f-avatar-group .w3f-avatar:hover,
.w3f-avatar-group .w3f-avatar-wrapper:hover {
  transform: translateY(-4px);
  z-index: 10;
}
```

**Técnica de superposición:**
- El grupo tiene `padding-left: 12px` para compensar el desplazamiento del primer elemento.
- Cada avatar tiene `margin-left: -12px` → solapamiento de 12 px.
- El borde blanco actúa como separador visual entre avatares solapados.
- En hover: `translateY(-4px)` levanta el avatar y `z-index: 10` lo coloca encima de sus vecinos.

---

### 11. Responsive

```css
@media (max-width: 640px) {
  .w3f-avatar-xlarge {
    width: 80px;
    height: 80px;
    font-size: var(--w3f-text-2xl);
  }
}
```

En móvil, `xlarge` se reduce de 96 px a 80 px para evitar desbordamientos en
layouts estrechos.

---

## Tokens W3F utilizados

| Token | Uso en Avatar |
|---|---|
| `--w3f-on-primary` | Color del texto (iniciales) |
| `--w3f-transition-fast` | Duración de todas las transiciones |
| `--w3f-radius-full` | Forma circular (9999px) |
| `--w3f-shadow-md` | Sombra en hover |
| `--w3f-surface` | Borde blanco en status, badge y grupo |
| `--w3f-text-xs/sm/base/xl/2xl/3xl` | Font-sizes para iniciales y badge |
| `--w3f-primary-400/600` | Azules |
| `--w3f-success-400/500` | Verdes |
| `--w3f-danger-500` | Rojo (busy, badge) |
| `--w3f-warning-400/500` | Amarillos |
| `--w3f-gray-400/500` | Grises |
| `--w3f-secondary-500` | Naranja |
| `--w3f-info-500` | Cian |
