# 🏷️ Badge Component - Documentación Completa

## 📋 Índice

1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [API del Componente](#api-del-componente)
4. [Variantes](#variantes)
5. [Ejemplos de Uso](#ejemplos-de-uso)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Accesibilidad](#accesibilidad)
8. [Personalización](#personalización)

---

## 🎯 Introducción

El componente **Badge** es un componente versátil para mostrar:
- Etiquetas de estado
- Contadores de notificaciones
- Indicadores visuales (dots)
- Etiquetas de categoría
- Información contextual pequeña

### ✨ Características Principales

- ✅ **7 colores predefinidos** (primary, secondary, success, warning, danger, info, gray)
- ✅ **3 tamaños** (sm, md, lg)
- ✅ **4 variantes de estilo** (solid, outline, soft, dot)
- ✅ **8 posiciones** para badges absolutos
- ✅ **Animaciones** (pulse, bounce-in)
- ✅ **Contador con límite** (muestra "99+" automáticamente)
- ✅ **Accesible** con ARIA labels
- ✅ **Modo oscuro** incluido
- ✅ **TypeScript** compatible

---

## 📦 Instalación

### Archivos Necesarios

```
src/
├── components/
│   ├── Badge/
│   │   ├── Badge.jsx (o Badge.tsx)
│   │   ├── BadgeWrapper.jsx (o BadgeWrapper.tsx)
│   │   └── index.js
├── styles/
│   ├── _variables.css
│   ├── _base.css
│   ├── _utilities.css  ⬅️ NUEVO
│   └── _badge.css
```

### Orden de Importación en tu CSS Principal

```css
/* main.css */
@import './_variables.css';
@import './_base.css';
@import './_utilities.css';  /* ⬅️ NUEVO */
@import './_badge.css';
```

### Importación del Componente

```javascript
// JavaScript
import Badge from './components/Badge/Badge';
import BadgeWrapper from './components/Badge/BadgeWrapper';

// TypeScript
import Badge from './components/Badge/Badge';
import BadgeWrapper from './components/Badge/BadgeWrapper';
import type { BadgeProps, BadgeColor } from './components/Badge/Badge';
```

---

## 📖 API del Componente

### Badge Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Contenido del badge |
| `color` | `BadgeColor` | `'primary'` | Color del badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del badge |
| `variant` | `'solid' \| 'outline' \| 'soft' \| 'dot'` | `'solid'` | Variante de estilo |
| `position` | `BadgePosition` | `null` | Posición absoluta (requiere parent relativo) |
| `invisible` | `boolean` | `false` | Si el badge debe ocultarse |
| `ariaLabel` | `string` | `''` | Label para accesibilidad |
| `max` | `number` | `99` | Número máximo antes de mostrar "+" |
| `pulse` | `boolean` | `false` | Activar animación de pulso |
| `animate` | `boolean` | `false` | Activar animación de entrada |
| `className` | `string` | `''` | Clases CSS adicionales |

### BadgeColor

```typescript
type BadgeColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info' 
  | 'gray';
```

### BadgePosition

```typescript
type BadgePosition = 
  | 'top-right' 
  | 'top-left' 
  | 'top-center'
  | 'bottom-right' 
  | 'bottom-left' 
  | 'bottom-center'
  | 'middle-right' 
  | 'middle-left';
```

---

## 🎨 Variantes

### 1. Solid (Default)

Badge con fondo sólido de color.

```jsx
<Badge color="primary">Solid</Badge>
<Badge color="danger">Error</Badge>
```

### 2. Outline

Badge con borde y fondo transparente/sutil.

```jsx
<Badge variant="outline" color="primary">Outline</Badge>
<Badge variant="outline" color="success">Approved</Badge>
```

### 3. Soft

Badge con fondo suave y texto del color principal.

```jsx
<Badge variant="soft" color="info">Beta</Badge>
<Badge variant="soft" color="warning">Draft</Badge>
```

### 4. Dot

Indicador de punto sin texto (ideal para estados online/offline).

```jsx
<Badge variant="dot" color="success" />
<Badge variant="dot" color="danger" pulse />
```

---

## 💡 Ejemplos de Uso

### Ejemplo Básico

```jsx
import Badge from './components/Badge';

function App() {
  return (
    <div>
      <Badge color="primary">New</Badge>
      <Badge color="success">Active</Badge>
      <Badge color="danger">Error</Badge>
    </div>
  );
}
```

### Contador de Notificaciones

```jsx
import Badge from './components/Badge';

function NotificationBadge({ count }) {
  return (
    <Badge color="danger" max={99}>
      {count}
    </Badge>
  );
}

// Uso:
<NotificationBadge count={5} />    // Muestra: 5
<NotificationBadge count={150} />  // Muestra: 99+
```

### Badge Posicionado con Wrapper

```jsx
import BadgeWrapper from './components/Badge';

function NotificationIcon() {
  return (
    <BadgeWrapper
      badgeContent={12}
      badgeProps={{ 
        color: 'danger', 
        size: 'sm',
        position: 'top-right' 
      }}
    >
      <button>🔔 Notifications</button>
    </BadgeWrapper>
  );
}
```

### Indicador de Estado Online

```jsx
import BadgeWrapper from './components/Badge';

function UserAvatar({ isOnline, name, avatar }) {
  return (
    <BadgeWrapper
      badgeContent=""
      badgeProps={{
        variant: 'dot',
        color: isOnline ? 'success' : 'gray',
        position: 'bottom-right',
        pulse: isOnline
      }}
    >
      <img 
        src={avatar} 
        alt={name}
        style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%' 
        }}
      />
    </BadgeWrapper>
  );
}
```

### Etiquetas de Producto

```jsx
function ProductCard({ product }) {
  const getStatusBadge = (status) => {
    const badges = {
      'in-stock': { color: 'success', text: 'In Stock' },
      'low-stock': { color: 'warning', text: 'Low Stock' },
      'out-of-stock': { color: 'danger', text: 'Out of Stock' },
    };
    
    const badge = badges[status];
    
    return (
      <Badge 
        variant="soft" 
        color={badge.color}
      >
        {badge.text}
      </Badge>
    );
  };
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      {getStatusBadge(product.status)}
    </div>
  );
}
```

### Lista con Contadores

```jsx
function TaskList({ tasks }) {
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  
  return (
    <div>
      <div className="task-row">
        <span>Pending Tasks</span>
        <Badge color="warning" size="sm">{pendingCount}</Badge>
      </div>
      <div className="task-row">
        <span>Completed</span>
        <Badge color="success" size="sm">{completedCount}</Badge>
      </div>
    </div>
  );
}
```

### Navegación con Notificaciones

```jsx
function Navigation() {
  return (
    <nav>
      <BadgeWrapper
        badgeContent={5}
        badgeProps={{ color: 'danger', size: 'sm' }}
      >
        <a href="/messages">Messages</a>
      </BadgeWrapper>
      
      <BadgeWrapper
        badgeContent=""
        badgeProps={{ 
          variant: 'dot', 
          color: 'success',
          pulse: true 
        }}
      >
        <a href="/updates">Updates</a>
      </BadgeWrapper>
    </nav>
  );
}
```

---

## ✅ Mejores Prácticas

### 1. Usa BadgeWrapper para Posicionamiento

❌ **Evitar:**
```jsx
<div style={{ position: 'relative' }}>
  <button>Messages</button>
  <Badge position="top-right" color="danger">5</Badge>
</div>
```

✅ **Recomendado:**
```jsx
<BadgeWrapper badgeContent={5} badgeProps={{ color: 'danger' }}>
  <button>Messages</button>
</BadgeWrapper>
```

### 2. Limita los Números con `max`

```jsx
// Evita mostrar números muy grandes
<Badge color="danger" max={99}>{count}</Badge>
```

### 3. Usa Variante Apropiada según el Contexto

- **Solid**: Para información importante o CTAs
- **Outline**: Para categorías o filtros
- **Soft**: Para estados secundarios
- **Dot**: Para indicadores de presencia/estado

### 4. Oculta Badges Vacíos

```jsx
<Badge invisible={count === 0}>{count}</Badge>
```

O usa BadgeWrapper que maneja esto automáticamente:

```jsx
<BadgeWrapper 
  badgeContent={count} 
  badgeProps={{ color: 'danger' }}
>
  <IconButton />
</BadgeWrapper>
```

### 5. Usa Pulse para Notificaciones Urgentes

```jsx
<Badge color="danger" pulse>
  {urgentCount}
</Badge>
```

---

## ♿ Accesibilidad

### 1. ARIA Labels Automáticos

El componente provee aria-labels automáticos:

```jsx
// Badge numérico
<Badge color="danger">{5}</Badge>
// aria-label="5 notifications"

// Badge dot
<Badge variant="dot" color="success" />
// aria-label="Notification indicator"
```

### 2. ARIA Labels Personalizados

```jsx
<Badge 
  color="danger" 
  ariaLabel="15 mensajes sin leer"
>
  {15}
</Badge>
```

### 3. Role Status

Todos los badges tienen `role="status"` para anunciar cambios a lectores de pantalla.

### 4. Contraste de Color

Todas las variantes cumplen con WCAG AA:
- Solid: Contraste automático con `--w3f-on-primary`
- Outline/Soft: Fondos sutiles con texto de color fuerte

---

## 🎨 Personalización

### Modificar Colores

Edita las variables en `_variables.css`:

```css
:root {
  --w3f-primary: #your-color;
  --w3f-primary-700: #your-darker-color;
}
```

### Agregar Nuevo Color

1. **En `_variables.css`:**
```css
:root {
  --w3f-custom: #ff6b6b;
  --w3f-custom-700: #ee5a52;
}
```

2. **En `_utilities.css`:**
```css
.w3f-bg-custom {
  background-color: var(--w3f-custom);
}

.w3f-text-custom {
  color: var(--w3f-custom);
}
```

3. **En `_badge.css`:**
```css
.w3f-badge-outline.w3f-bg-custom {
  color: var(--w3f-custom);
  background-color: var(--w3f-custom-50);
  border-color: var(--w3f-custom);
}
```

4. **En `Badge.jsx`:**
```javascript
const badgeColors = {
  // ... existing colors
  custom: 'w3f-bg-custom',
};
```

### Crear Nuevo Tamaño

En `_badge.css`:

```css
.w3f-badge-xl {
  padding: var(--w3f-space-3) var(--w3f-space-4);
  font-size: var(--w3f-text-base);
  min-width: 2.5rem;
  height: 2.5rem;
}
```

En `Badge.jsx`:

```javascript
const badgeSizes = {
  sm: 'w3f-badge-sm',
  md: 'w3f-badge-md',
  lg: 'w3f-badge-lg',
  xl: 'w3f-badge-xl', // Nuevo
};
```

---

## 🌙 Tema Oscuro

El componente soporta tema oscuro automáticamente cuando aplicas la clase `w3f-theme-dark` al body o contenedor:

```jsx
// Aplicar tema oscuro globalmente
<body className="w3f-theme-dark">
  <App />
</body>

// O en un contenedor específico
<div className="w3f-theme-dark">
  <Badge color="primary">Dark Mode</Badge>
</div>
```

---

## 🔧 Solución de Problemas

### Badge no se posiciona correctamente

✅ **Solución:** Usa `BadgeWrapper` o asegúrate que el padre tenga `position: relative`:

```jsx
<div style={{ position: 'relative' }}>
  <YourComponent />
  <Badge position="top-right">5</Badge>
</div>
```

### Colores no se aplican

✅ **Solución:** Verifica que `_utilities.css` esté importado:

```css
@import './_utilities.css';
```

### Badge no se ve en modo oscuro

✅ **Solución:** Los estilos de tema oscuro están al final de `_badge.css`. Asegúrate de que el archivo se importó completamente.

---

## 📊 Comparación de Variantes

| Variante | Uso Principal | Visibilidad | Mejor Para |
|----------|---------------|-------------|------------|
| **Solid** | Status importante | Alta | CTAs, alertas, contadores |
| **Outline** | Categorías | Media | Filtros, tags, categorías |
| **Soft** | Status secundario | Media-Baja | Estados sutiles, metadata |
| **Dot** | Indicador presencia | Baja | Online/offline, notificaciones discretas |

---

## 🎯 Conclusión

El componente Badge mejorado ofrece:

✅ **Flexibilidad** - 4 variantes × 7 colores × 3 tamaños = 84 combinaciones  
✅ **Accesibilidad** - ARIA labels automáticos y role status  
✅ **Performance** - CSS puro, sin JavaScript pesado  
✅ **Mantenibilidad** - Basado en variables CSS  
✅ **DX** - PropTypes/TypeScript incluido  
✅ **UX** - Animaciones sutiles y responsive  

---

## 📚 Recursos Adicionales

- [MDN - ARIA Status Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role)
- [Material Design - Badges](https://m3.material.io/components/badges/overview)
- [WCAG 2.1 - Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)