# Icon

Wrapper de iconos Lucide-React con resolucion dinamica por nombre, tamaños predefinidos y colores del sistema de diseño W3Fussion. Convierte nombres en kebab-case o alias cortos al PascalCase de Lucide automaticamente.

## Importacion

```tsx
import Icon from '@/components/DATADISPLAY/Icon/Icon';
```

## Uso basico

```tsx
<Icon name="Home" />
<Icon name="User" />
<Icon name="Settings" />
```

## Tamaños

### Tamaños predefinidos

| Nombre | Pixels |
|---|---|
| `xs` | 16px |
| `sm` | 20px |
| `md` | 24px (default) |
| `lg` | 32px |
| `xl` | 40px |
| `xxl` | 48px |

```tsx
<Icon name="Star" size="xs" />
<Icon name="Star" size="sm" />
<Icon name="Star" size="md" />
<Icon name="Star" size="lg" />
<Icon name="Star" size="xl" />
<Icon name="Star" size="xxl" />
```

### Tamaño numerico custom

```tsx
<Icon name="Zap" size={12} />
<Icon name="Zap" size={36} />
<Icon name="Zap" size={64} />
```

## Colores

### Colores del sistema

```tsx
<Icon name="Heart" color="primary" />
<Icon name="Heart" color="secondary" />
<Icon name="Heart" color="success" />
<Icon name="Heart" color="danger" />
<Icon name="Heart" color="warning" />
<Icon name="Heart" color="info" />
<Icon name="Heart" color="dark" />
<Icon name="Heart" color="gray" />
<Icon name="Heart" color="white" />
<Icon name="Heart" color="black" />
```

### Color hex / CSS custom

```tsx
<Icon name="Heart" color="#e91e63" />
<Icon name="Star" color="#ff9800" />
<Icon name="Shield" color="var(--w3f-primary)" />
```

## Resolucion de nombres

El componente acepta tres formas de nombre:

```tsx
// PascalCase directo (recomendado)
<Icon name="ChevronRight" />

// kebab-case (convertido automaticamente)
<Icon name="chevron-right" />
<Icon name="panel-left" />

// Alias cortos (resueltos via IconAliases)
<Icon name="search" />     // → Search
<Icon name="email" />      // → Mail
<Icon name="password" />   // → Lock
<Icon name="location" />   // → MapPin
<Icon name="corazon" />    // → Heart
```

Si el nombre no se puede resolver, se muestra el nombre como texto con una advertencia en consola.

## Clase CSS adicional

```tsx
<Icon name="Home" className="mi-icono-custom" />
```

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `name` | `string` | — **(requerido)** | Nombre del icono Lucide. PascalCase, kebab-case o alias |
| `size` | `number \| IconSizeName` | `24` | Tamaño en px o nombre predefinido (`xs` `sm` `md` `lg` `xl` `xxl`) |
| `color` | `string \| IconColorName` | `'currentColor'` | Color del icono: nombre de sistema, hex, CSS var |
| `className` | `string` | `''` | Clases CSS adicionales aplicadas al wrapper `<span>` |

## API

### Entrada de datos

| Via | Prop | Descripcion |
|---|---|---|
| Nombre | `name` | String que identifica el icono. Se resuelve via alias → verificacion directa → conversion kebab→PascalCase |
| Tamaño | `size` | Numero de pixels o nombre predefinido resuelto en `resolveIconSize()` |
| Color | `color` | Nombre de sistema resuelto a CSS var en `resolveIconColor()`, o valor CSS directo |
| Clase | `className` | Se aplica al `<span>` wrapper sin modificacion |

**Pipeline de resolucion del nombre:**
```
name string
  → buscar en IconAliases (alias explícitos)
  → verificar en LucideIcons tal cual
  → convertir kebab-case a PascalCase y verificar
  → nombre original (fallback con warning)
```

### Salida de datos

El componente Icon **no emite eventos ni callbacks**. Es un componente de presentacion puro. La interactividad se delega al elemento padre:

```tsx
// Icono dentro de un boton — el onClick es del boton, no del Icon
<button onClick={handleClick}>
  <Icon name="Heart" size="md" color="danger" />
  Me gusta
</button>
```

### Comunicacion con otros componentes

El componente Icon es **completamente independiente**. No consume ningun Context ni requiere Provider.

Se usa frecuentemente como parte de otros componentes del framework:

```tsx
// Dentro de Avatar como fallback visual
<Avatar color="gray"><User size={20} /></Avatar>

// Dentro de Button
<Button><Icon name="Download" size="sm" /> Descargar</Button>

// En listas de navegacion
<Icon name="Home" size="md" color="primary" />
```

### Accesibilidad

| Atributo | Valor | Descripcion |
|---|---|---|
| `aria-hidden` | `"true"` | El `<span>` wrapper es invisible para lectores de pantalla. Los iconos decorativos no deben ser anunciados |
| `role` | `"img"` | Rol semantico del wrapper — si el icono es funcional, el elemento padre debe proveer `aria-label` |
| `lineHeight` | `0` | Inline style en el wrapper para eliminar espacio base de linea en contextos inline |

Para iconos funcionales sin texto visible, envolverlos con un elemento que provea etiqueta:

```tsx
<button aria-label="Buscar">
  <Icon name="Search" size="md" />
</button>
```

### Patron de uso recomendado

```tsx
// 1. Icono decorativo en texto
<Text element="p">
  <Icon name="Check" size="sm" color="success" /> Completado
</Text>

// 2. Icono de estado en lista
<Icon name="AlertCircle" size="md" color="warning" />

// 3. Grid de iconos con nombre
{iconNames.map(name => (
  <div key={name} className="w3f-flex w3f-flex-col w3f-items-center w3f-gap-1">
    <Icon name={name} size="md" color="gray" />
    <Text element="p" customClasses="w3f-text-xs">{name}</Text>
  </div>
))}

// 4. Icono con color custom
<Icon name="Star" size="lg" color="#f59e0b" />
```

## Aliases disponibles

| Alias | Icono Lucide |
|---|---|
| `search`, `buscar`, `lupa` | `Search` |
| `email`, `mail` | `Mail` |
| `password`, `lock-icon` | `Lock` |
| `location`, `city`, `address` | `MapPin` |
| `user`, `profile`, `perfil`, `account` | `User` |
| `corazon`, `love`, `like`, `favorite` | `Heart` |
| `settings`, `config`, `configuracion` | `Settings` |
| `document`, `archivo` | `File` |
| `folder`, `carpeta` | `Folder` |
| `check`, `checkmark`, `tick` | `Check` |
| `close`, `cancel`, `cerrar` | `X` |
| `house`, `inicio`, `home-icon` | `Home` |

## Estructura de archivos

```
Icon/
  Icon.tsx            Componente principal
  Icon.types.ts       Interfaces TypeScript (IconProps, UseIconResult)
  Icon.hooks.ts       useIcon() — normalizacion de name/size/color
  Icon.constants.ts   IconSizes, IconColors, IconAliases, IconDefaults
  Icon.utils.ts       resolveIconName(), resolveIconSize(), resolveIconColor()
  README.md           Esta documentacion
```

CSS: Ningun archivo CSS propio — el icono hereda el color del contexto via `currentColor` y se estiliza desde el componente padre.
