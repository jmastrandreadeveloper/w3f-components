# Input

Componente de campo de texto con etiqueta flotante, iconos leading/trailing, mensajes de ayuda y estados de validacion. Se integra nativamente con Form / LiveForm para manejo de estado controlado.

## Importacion

```tsx
import Input from '@/components/INPUTS/Input/Input';
```

## Uso basico

```tsx
<Input label="First Name" />
<Input label="Last Name" />
<Input label="Username" placeholder="your-username" />
```

## Variantes por tipo

Acepta todos los tipos de `<input>` HTML:

```tsx
<Input label="Text"     type="text" />
<Input label="Email"    type="email" />
<Input label="Password" type="password" />
<Input label="Phone"    type="tel" />
<Input label="Date"     type="date" />
<Input label="Number"   type="number" />
```

Los tipos `date`, `time`, `datetime-local`, `month`, `week` y `color` siempre mantienen la etiqueta flotante.

## Con iconos

### Leading icon

```tsx
import { Search, Mail, User } from 'lucide-react';

<Input label="Search"       leadingIcon={<Search size={18} />} />
<Input label="Email Address" leadingIcon={<Mail size={18} />} />
<Input label="Full Name"    leadingIcon={<User size={18} />} />
```

### Trailing icon interactivo (p.ej. mostrar/ocultar contrasena)

```tsx
import { Eye, EyeOff } from 'lucide-react';

const [show, setShow] = useState(false);

<Input
  label="Password"
  type={show ? 'text' : 'password'}
  trailingIcon={show ? <EyeOff size={18} /> : <Eye size={18} />}
  onIconClick={() => setShow(!show)}
/>
```

### Ambos iconos simultaneos

```tsx
import { CreditCard, Lock } from 'lucide-react';

<Input
  label="Card Number"
  leadingIcon={<CreditCard size={18} />}
  trailingIcon={<Lock size={16} />}
/>
```

## Texto de ayuda y errores

```tsx
{/* Helper text */}
<Input label="Username" helperText="Choose a unique username" />
<Input label="Email"    helperText="We will never share your email" />

{/* Error state */}
<Input label="Email"    error="Invalid email address" value="john@" />
<Input label="Username" error="Username is already taken" value="admin" />
<Input label="Password" type="password" error="Password too short" value="123" />
```

## Estados

```tsx
{/* Disabled */}
<Input label="Disabled Empty"      disabled />
<Input label="Disabled with Value" disabled value="Cannot edit" />

{/* Required */}
<Input label="Required Field" required />

{/* Read only */}
<Input label="Read Only" readOnly value="Read-only content" />
```

## Prefix / Suffix (icono como string)

Los props `leadingIcon` y `trailingIcon` aceptan tanto `ReactNode` como `string` (nombre de icono del componente `Icon`):

```tsx
<Input label="Username" leadingIcon="user" />
<Input label="Search"   trailingIcon="search" />
```

## Integracion con Form / LiveForm

Cuando se proporciona el prop `name` dentro de un `<Form>`, el Input lee y escribe automaticamente en el `FormContext`:

```tsx
import Form from '@/components/INPUTS/Form/Form';
import Button from '@/components/INPUTS/Button/Button';

<Form
  initialValues={{ email: '', password: '' }}
  onSubmit={(values) => console.log(values)}
>
  <Input label="Email"    name="email"    type="email" />
  <Input label="Password" name="password" type="password" />
  <Button type="submit">Iniciar sesion</Button>
</Form>
```

Cuando `name` esta presente y hay un `FormContext` activo:
- El valor se lee de `formContext.values[name]`
- Los errores se leen de `formContext.errors[name]`
- Los eventos `onChange` y `onBlur` notifican al Form

## CSS Custom Properties

El Input es 100% configurable via CSS custom properties. Aplica overrides en una clase custom:

```css
/* Rounded Soft Theme */
.mi-input-rounded .w3f-input-wrapper {
  --w3f-input-radius: 999px;
  --w3f-input-bg: #f0f4ff;
  --w3f-input-border-color: #c7d2fe;
  --w3f-input-focus-border-color: #6366f1;
  --w3f-input-focus-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

/* Dark Theme */
.mi-input-dark .w3f-input-wrapper {
  --w3f-input-bg: #2a2a3e;
  --w3f-input-border-color: #3a3a52;
  --w3f-input-color: #e4e4ef;
  --w3f-input-focus-border-color: #818cf8;
  --w3f-input-focus-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
}
```

```tsx
<Input label="Email" className="mi-input-rounded" />
<Input label="Username" className="mi-input-dark" />
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-input-padding` | `12px` | Padding interno del campo |
| `--w3f-input-font-family` | `inherit` | Familia tipografica |
| `--w3f-input-font-size` | `1rem` | Tamano de fuente |
| `--w3f-input-line-height` | `1.5` | Alto de linea |
| `--w3f-input-color` | `inherit` | Color del texto |
| `--w3f-input-bg` | `transparent` | Fondo del campo |
| `--w3f-input-border-width` | `1px` | Grosor del borde |
| `--w3f-input-border-color` | `gray-300` | Color del borde |
| `--w3f-input-radius` | `8px` | Border radius |
| `--w3f-input-shadow` | `none` | Box shadow base |
| `--w3f-input-transition` | `border-color 0.2s, box-shadow 0.2s` | Transicion |
| `--w3f-input-focus-border-color` | `primary` | Borde en foco |
| `--w3f-input-focus-shadow` | `none` | Sombra en foco |
| `--w3f-input-focus-bg` | `var(--w3f-input-bg)` | Fondo en foco |
| `--w3f-input-disabled-bg` | `#f3f4f6` | Fondo deshabilitado |
| `--w3f-input-disabled-color` | `#9ca3af` | Texto deshabilitado |
| `--w3f-input-disabled-cursor` | `not-allowed` | Cursor deshabilitado |
| `--w3f-input-error-border-color` | `danger` | Borde en error |
| `--w3f-input-error-shadow` | `none` | Sombra en error |
| `--w3f-input-error-bg` | `var(--w3f-input-bg)` | Fondo en error |
| `--w3f-input-icon-color` | `gray-400` | Color del icono |
| `--w3f-input-icon-size` | `inherit` | Tamano del icono |
| `--w3f-input-icon-leading-left` | `12px` | Posicion del leading icon |
| `--w3f-input-icon-trailing-right` | `12px` | Posicion del trailing icon |
| `--w3f-input-icon-focus-color` | `primary` | Icono en foco |
| `--w3f-input-icon-error-color` | `danger` | Icono en error |
| `--w3f-input-label-position-left` | `12px` | Posicion horizontal de la etiqueta |
| `--w3f-input-label-font-size` | `1rem` | Tamano de la etiqueta |
| `--w3f-input-label-color` | `gray-400` | Color de la etiqueta |
| `--w3f-input-label-padding` | `0 4px` | Padding de la etiqueta |
| `--w3f-input-label-transition` | `all 0.2s ease-out` | Transicion de la etiqueta |
| `--w3f-input-label-float-top` | `-10px` | Posicion flotante de la etiqueta |
| `--w3f-input-label-float-font-size` | `0.75rem` | Tamano en estado flotante |
| `--w3f-input-label-float-color` | `var(--w3f-input-label-color)` | Color en estado flotante |
| `--w3f-input-label-float-bg` | `white` | Fondo de la etiqueta flotante |
| `--w3f-input-message-font-size` | `0.75rem` | Tamano del mensaje |
| `--w3f-input-message-margin` | `4px` | Margen del mensaje |
| `--w3f-input-message-error-color` | `danger` | Color del mensaje de error |
| `--w3f-input-message-helper-color` | `gray-400` | Color del mensaje de ayuda |
| `--w3f-input-container-margin` | `space-6` | Margen inferior del contenedor |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | Texto de la etiqueta flotante |
| `type` | `string` | `'text'` | Tipo de campo HTML |
| `name` | `string` | — | Nombre del campo; activa integracion con Form/LiveForm |
| `value` | `string` | — | Valor controlado |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | Callback al cambiar el valor |
| `error` | `string` | — | Mensaje de error (sobreescribe el de FormContext) |
| `helperText` | `string` | — | Texto de ayuda bajo el campo |
| `disabled` | `boolean` | `false` | Deshabilita el campo |
| `required` | `boolean` | `false` | Marca el campo como obligatorio con asterisco |
| `autoComplete` | `string` | — | Valor del atributo autocomplete |
| `autoFocus` | `boolean` | `false` | Foco automatico al montar |
| `leadingIcon` | `ReactNode \| string` | — | Icono al inicio del campo |
| `trailingIcon` | `ReactNode \| string` | — | Icono al final del campo |
| `onIconClick` | `() => void` | — | Handler click en el trailing icon |
| `readOnly` | `boolean` | — | Campo de solo lectura (via HTML attr) |
| `placeholder` | `string` | — | Texto placeholder (visible al enfocar) |
| `className` | `string` | `''` | Clases CSS adicionales al contenedor |

Adicionalmente acepta todos los atributos HTML nativos de `<input>` excepto `onChange` y `size` (redefinidos).

## API

### Entrada de datos

El Input acepta datos por tres vias:

| Via | Prop / Fuente | Tipo | Descripcion |
|---|---|---|---|
| Valor controlado | `value` | `string` | Valor externo controlado por el padre. Tiene prioridad sobre estado interno |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` como valor del campo. Activo cuando `name` esta definido y hay un `<Form>` en el arbol |
| Valor no controlado | — | — | Si ni `value` ni `FormContext` estan activos, el input opera con `defaultValue=""` y estado interno nativo del DOM |

**Prioridad de resolucion del valor:**
```
FormContext.values[name]  →  prop value  →  defaultValue=""
```

**Prioridad de resolucion del error:**
```
FormContext.errors[name]  →  prop error
```

**Tipos con label siempre flotante** (no requieren foco ni valor para flotar):
```
date · time · datetime-local · month · week · color
```

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | Cada vez que el usuario modifica el valor del campo. Se ejecuta siempre, independientemente de si hay FormContext activo |
| `onBlur` | `(e: React.FocusEvent<HTMLInputElement>) => void` | Cuando el campo pierde el foco. Si hay FormContext, primero notifica a `formContext.handleBlur(e)`, luego llama al callback propio |
| `onIconClick` | `() => void` | Click sobre el trailing icon. Solo activo cuando `trailingIcon` esta definido. El elemento recibe `role="button"` automaticamente |

El flujo completo de `onChange` es:
1. El usuario escribe → se dispara el evento nativo
2. Si `isFormControlled`: se llama `formContext.handleChange(e)` → Form actualiza `values[name]`
3. Si `onChange` esta definido: se llama siempre, con el evento nativo sin modificar

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El Input consume `FormContext` via `useInputFormContext()`. La comunicacion es **bidireccional**:

```
Form.initialValues.email = ""
        ↓ (lectura)
Input lee FormContext.values["email"] como value
        ↓ (usuario escribe)
Input llama formContext.handleChange(e)
        ↓ (propagacion)
Form actualiza values["email"] en su estado
        ↓ (submit)
Form.onSubmit recibe { email: "usuario@ejemplo.com" }
```

**Patron de deteccion:** `isFormControlled = !!(formContext && name)` — si `formContext` es `null` (fuera de Form) o `name` no esta definido, el Input opera como campo controlado/no controlado independiente sin errores.

**Errores de validacion:** cuando el Form setea `errors[name]`, el Input renderiza automaticamente el mensaje de error y activa `aria-invalid="true"` en el elemento `<input>`.

#### Independiente (sin contexto requerido)

El Input no requiere ningun Provider ni Form para funcionar. Puede usarse de forma totalmente autonoma:

```tsx
// Campo no controlado — React no gestiona su valor
<Input label="Buscar" />

// Campo controlado — el padre gestiona el estado
const [val, setVal] = useState('');
<Input label="Email" value={val} onChange={(e) => setVal(e.target.value)} />
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `aria-invalid` | `"true"` | Cuando hay un mensaje de error (de FormContext o del prop `error`) |
| `aria-describedby` | `"{id}-error"` | Cuando hay error activo; apunta al `<p>` con el mensaje |
| `aria-describedby` | `"{id}-helper"` | Cuando hay `helperText` y no hay error; apunta al `<p>` de ayuda |
| `role` | `"alert"` | En el `<p>` del mensaje de error (para anuncio inmediato a lectores de pantalla) |
| `role` | `"button"` | En el contenedor del trailing icon cuando `onIconClick` esta definido |
| `id` / `htmlFor` | par unico via `useId()` | El `<input>` y su `<label>` siempre estan vinculados con un ID generado automaticamente |
| `disabled` | nativo | Propagado directamente al `<input>` HTML |
| `required` | nativo | Propagado directamente al `<input>` HTML |

### Patron de uso recomendado

```tsx
// 1. Campo de texto simple no controlado
<Input label="Nombre" />

// 2. Campo controlado con validacion manual
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setError(e.target.value.includes('@') ? '' : 'Email invalido');
  }}
  error={error}
  helperText="Escribe tu correo electronico"
/>

// 3. Campo de contrasena con toggle de visibilidad
const [show, setShow] = useState(false);

<Input
  label="Contrasena"
  type={show ? 'text' : 'password'}
  trailingIcon={show ? <EyeOff size={18} /> : <Eye size={18} />}
  onIconClick={() => setShow(!show)}
/>

// 4. Integrado en Form — estado y errores gestionados automaticamente
<Form
  initialValues={{ nombre: '', email: '' }}
  onSubmit={(values) => guardarPerfil(values)}
>
  <Input label="Nombre completo" name="nombre" required />
  <Input label="Email"           name="email"  type="email" />
  <Button type="submit">Guardar</Button>
</Form>

// 5. Ref forwarding — acceso directo al elemento DOM
const inputRef = useRef<HTMLInputElement>(null);

<Input
  ref={inputRef}
  label="Codigo"
  onFocus={() => inputRef.current?.select()}
/>
```

## Estructura de archivos

```
Input/
  Input.tsx             Componente principal (forwardRef)
  Input.types.ts        Interfaz InputProps
  Input.constants.ts    Clases CSS (INPUT_CLASSES)
  Input.utils.ts        buildInputClasses, buildLabelClasses, buildIconClasses, buildContainerClasses
  Input.hooks.ts        useInputFormContext, useInputFocus
  README.md             Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_input.css`
