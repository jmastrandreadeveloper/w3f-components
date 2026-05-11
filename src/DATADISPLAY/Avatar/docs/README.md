# Avatar

> Componente de representación visual de usuarios o entidades dentro del sistema W3F.

---

## ¿Qué es?

**Avatar** es un componente de presentación circular que muestra la identidad visual de un
usuario, contacto o entidad. Puede mostrar una fotografía real, las iniciales del nombre o
un carácter de respaldo cuando no hay imagen disponible.

Incluye su variante compuesta **AvatarGroup**, que apila múltiples avatares en fila con
superposición y límite configurable.

---

## ¿Para qué sirve?

| Caso de uso | Descripción |
|---|---|
| Identificación de usuario | Cabeceras de perfil, listas de contactos, comentarios |
| Estado de presencia | Indicadores `online`, `offline`, `busy`, `away` |
| Contadores de notificación | Badge numérico superpuesto (máx. `99+`) |
| Selector de foto de perfil | Modo `uploadable` para subir una imagen desde el sistema de archivos |
| Formularios | Integración directa con `<Form>` y `<LiveForm>` vía prop `name` |
| Grupos de colaboradores | `AvatarGroup` en listas de asignados, participantes de reunión, etc. |

---

## ¿Dónde se usa?

- Cabeceras de perfil de usuario
- Tarjetas de contacto y listas de usuarios
- Secciones de comentarios o actividad
- Formularios de edición de perfil (con `uploadable`)
- Tablas con columna de usuario
- Aplicaciones de mensajería y colaboración

---

## Estructura de archivos

```
Avatar/
├── Avatar.tsx           → Componente principal + AvatarGroup
├── Avatar.types.ts      → Interfaces y tipos TypeScript
├── Avatar.constants.ts  → Constantes de clases CSS y valores por defecto
├── Avatar.utils.ts      → Función buildAvatarClasses (lógica de clases)
├── Avatar.hooks.ts      → useAvatarForm (integración Form/LiveForm)
└── docs/                → Esta documentación
    ├── README.md
    ├── Avatar.tsx.md
    ├── Avatar.types.md
    ├── Avatar.constants.md
    ├── Avatar.utils.md
    └── Avatar.hooks.md
```

El CSS vive fuera del componente en:
```
src/w3fussion/DATADISPLAY/_avatar.css
```

---

## Flujo de interacción entre archivos

```
Avatar.tsx
  │
  ├── importa tipos de ─────────────────→ Avatar.types.ts
  │     (AvatarProps, AvatarGroupProps)
  │
  ├── importa lógica de clases de ──────→ Avatar.utils.ts
  │     (buildAvatarClasses)              └── usa AVATAR_SIZE_CLASSES de Avatar.constants.ts
  │
  ├── importa defaults de ──────────────→ Avatar.constants.ts
  │     (AVATAR_DEFAULTS)
  │
  └── importa hook de formulario de ────→ Avatar.hooks.ts
        (useAvatarForm)                   └── consume FormContext de Form/Form.tsx
```

---

## Uso básico

```tsx
import Avatar, { AvatarGroup } from '@/components/DATADISPLAY/Avatar/Avatar';

// Con imagen
<Avatar src="/foto.jpg" alt="Juan García" size="large" />

// Con iniciales
<Avatar color="blue" size="medium">JG</Avatar>

// Con estado de presencia
<Avatar src="/foto.jpg" status="online" size="large" />

// Con badge de notificaciones
<Avatar src="/foto.jpg" badge={5} size="large" />

// Interactivo
<Avatar src="/foto.jpg" hoverable onClick={() => abrirPerfil()} size="large" />

// Grupo de avatares
<AvatarGroup max={4}>
  <Avatar src="/foto1.jpg" />
  <Avatar src="/foto2.jpg" />
  <Avatar color="purple">AB</Avatar>
</AvatarGroup>
```

---

## Integración con Form y LiveForm

Avatar puede actuar como campo de formulario cuando se le proporciona la prop `name`.
Con `uploadable`, al hacer clic abre el selector de archivos del sistema operativo y
sincroniza el `dataURL` resultante con el contexto del formulario.

```tsx
import { Form } from '@/components/INPUTS/Form/Form';

// Form con submit explícito
<Form
  initialValues={{ foto: '', nombre: '' }}
  onSubmit={(values) => enviarAlBackend(values)}
>
  <Avatar
    name="foto"
    uploadable
    size="xlarge"
    color="gray"
  >
    ?
  </Avatar>
  <Button type="submit">Guardar perfil</Button>
</Form>
```

```tsx
import { LiveForm } from '@/components/INPUTS/LiveForm/LiveForm';

// LiveForm con propagación en tiempo real
<LiveForm
  initialValues={{ avatarUrl: '' }}
  onValuesChange={(values) => setPreview(values.avatarUrl)}
>
  <Avatar name="avatarUrl" uploadable size="large" color="teal">
    +
  </Avatar>
</LiveForm>
```

**Regla clave:** La prop `name` hace que Avatar lea y escriba en `FormContext`.
Si no hay contexto de formulario, `name` se ignora silenciosamente (sin errores).

---

## Props de `<Avatar>`

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `src` | `string` | — | URL de la imagen |
| `alt` | `string` | `'Avatar'` | Texto alternativo de la imagen |
| `size` | `AvatarSize` | `'medium'` | Tamaño del avatar |
| `color` | `AvatarColor` | `'gray'` | Color de fondo cuando no hay imagen |
| `status` | `AvatarStatus` | — | Indicador de presencia (punto de color) |
| `badge` | `number` | — | Número superpuesto en esquina superior derecha |
| `hoverable` | `boolean` | `false` | Activa efecto hover y cursor pointer |
| `uploadable` | `boolean` | `false` | Convierte el avatar en selector de archivos |
| `accept` | `string` | `'image/*'` | Tipos MIME aceptados en el selector |
| `name` | `string` | — | Nombre del campo en Form/LiveForm |
| `onChange` | `(value: string) => void` | — | Callback con el dataURL al seleccionar imagen |
| `onClick` | `MouseEventHandler` | — | Handler de clic personalizado |
| `className` | `string` | `''` | Clases CSS adicionales |
| `children` | `ReactNode` | — | Iniciales o contenido de respaldo |

---

## Props de `<AvatarGroup>`

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `children` | `ReactNode` | — | Avatares a mostrar |
| `max` | `number` | `5` | Máximo de avatares visibles antes del contador |
| `className` | `string` | `''` | Clases CSS adicionales |

---

## Tipos y valores disponibles

**`AvatarSize`** → `'small'` (32px) · `'medium'` (48px) · `'large'` (64px) · `'xlarge'` (96px)

**`AvatarColor`** → `'red'` · `'pink'` · `'purple'` · `'deep-purple'` · `'indigo'` · `'blue'`
· `'light-blue'` · `'cyan'` · `'teal'` · `'green'` · `'light-green'` · `'lime'` · `'yellow'`
· `'amber'` · `'orange'` · `'brown'` · `'gray'`

**`AvatarStatus`** → `'online'` · `'offline'` · `'busy'` · `'away'`
