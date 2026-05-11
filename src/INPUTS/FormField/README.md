# FormField

Wrapper de campo para formularios. Proporciona estructura visual consistente con label, texto helper, estado de error y layout configurable. Soporta integracion automatica con `Form` / `LiveForm` para validacion reactiva.

## Importacion

```tsx
import FormField from '@/components/INPUTS/FormField/FormField';
```

## Uso basico

Envuelve cualquier input con `FormField` para obtener label y mensajes consistentes:

```tsx
<FormField label="Nombre completo">
  <Input />
</FormField>
```

## Campo requerido

El prop `required` agrega un asterisco visual al label:

```tsx
<FormField label="Email" required>
  <Input type="email" />
</FormField>
```

## Texto de ayuda

Muestra una guia contextual debajo del input cuando no hay error:

```tsx
<FormField label="Contrasena" helperText="Minimo 8 caracteres, una mayuscula y un numero">
  <Input type="password" />
</FormField>
```

## Estado de error

El prop `error` activa el estado visual de error y reemplaza el helper text:

```tsx
<FormField label="Email" required error="Ingresa un email valido">
  <Input value="invalid" />
</FormField>
```

Cuando hay error, el label adopta el color de error (`--w3f-ff-error-color`) y se renderiza un `<p role="alert">` con el mensaje.

## Layout inline

El layout `inline` coloca el label y el input en la misma fila:

```tsx
<FormField label="Activo" layout="inline">
  <SlideToggle name="active" />
</FormField>

<FormField label="Cantidad" layout="inline" helperText="1 a 100">
  <NumberField min={1} max={100} />
</FormField>
```

El label tiene un `min-width` configurable via `--w3f-ff-label-min-width` (default: `120px`) para alinear multiples campos inline en columna.

## Estado deshabilitado

El prop `disabled` aplica opacidad reducida y bloquea la interaccion:

```tsx
<FormField label="Campo bloqueado" disabled helperText="Este campo no puede editarse">
  <Input disabled value="Solo lectura" />
</FormField>
```

## Integracion con Form / LiveForm

Cuando se usa dentro de `Form` o `LiveForm` y se provee el prop `name`, `FormField` lee automaticamente los errores de validacion desde `FormContext`. No requiere manejar el error manualmente:

```tsx
<Form
  initialValues={{ email: '' }}
  validationRules={{ email: { required: true, email: true } }}
  onSubmit={handleSubmit}
>
  <FormField name="email" label="Email" required>
    <Input name="email" />
  </FormField>
  <Button type="submit">Enviar</Button>
</Form>
```

Cuando `formContext.errors[name]` tiene un valor, se usa como mensaje de error en lugar del prop `error`. Fuera de `Form`, el componente funciona normalmente con `error` como prop directo.

## CSS Custom Properties

Todas las propiedades visuales son configurables via CSS custom properties. Aplica overrides en una clase custom:

```css
.mi-campo-compacto {
  --w3f-ff-margin-bottom: 0.75rem;
  --w3f-ff-stacked-gap: 0.25rem;
  --w3f-ff-label-font-size: 0.75rem;
  --w3f-ff-label-font-weight: 600;
  --w3f-ff-label-color: #4b5563;
}
```

```tsx
<FormField label="Nombre" className="mi-campo-compacto">
  <Input />
</FormField>
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-ff-margin-bottom` | `1.5rem` | Margen inferior del wrapper |
| `--w3f-ff-stacked-gap` | `0.5rem` | Espacio entre label y content en layout stacked |
| `--w3f-ff-inline-gap` | `1rem` | Espacio entre label y content en layout inline |
| `--w3f-ff-label-font-size` | `0.875rem` | Tamano de fuente del label |
| `--w3f-ff-label-font-weight` | `500` | Peso de fuente del label |
| `--w3f-ff-label-color` | `#374151` | Color del label |
| `--w3f-ff-label-margin-bottom` | `0.25rem` | Margen inferior del label (layout stacked) |
| `--w3f-ff-label-min-width` | `120px` | Ancho minimo del label en layout inline |
| `--w3f-ff-error-color` | `#dc2626` | Color del label y mensaje de error |
| `--w3f-ff-disabled-opacity` | `0.6` | Opacidad en estado deshabilitado |
| `--w3f-ff-disabled-label-color` | `#9ca3af` | Color del label en estado deshabilitado |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | Texto del label |
| `name` | `string` | — | Nombre del campo para leer errores desde FormContext |
| `error` | `string` | — | Mensaje de error (cuando no esta controlado por Form) |
| `helperText` | `string` | — | Texto de ayuda (visible cuando no hay error) |
| `required` | `boolean` | `false` | Muestra asterisco en el label |
| `disabled` | `boolean` | `false` | Aplica estado deshabilitado al wrapper |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | Disposicion del label respecto al input |
| `children` | `ReactNode` | — | Input u otro control a envolver |
| `className` | `string` | `''` | Clases CSS adicionales |

## Estructura DOM

```
div.w3f-form-field.w3f-form-field--{layout}[.has-error][.is-disabled]
  label.w3f-form-field__label
    {label text}
    span.w3f-input-required  (si required)
  div.w3f-form-field__content
    {children}
  div  (si hay error o helperText)
    p.w3f-input-message.w3f-input-message--error[role="alert"]  (si error)
    p.w3f-input-message.w3f-input-message--helper               (si helperText)
```

## API

### Entrada de datos

FormField es un **wrapper de presentacion puro**: no tiene valor propio ni lo gestiona. Su unica fuente de datos es el estado de error:

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Error manual | `error` | `string` | Mensaje de error pasado directamente desde el padre |
| FormContext | `name` | `string` | Lee `FormContext.errors[name]` cuando esta dentro de un `<Form>`. Tiene prioridad sobre `error` |
| Children | `children` | `ReactNode` | El input u otro control a envolver. FormField no modifica ni clona los hijos |

**Prioridad de resolucion de error:**
```
FormContext.errors[name]  →  prop error
```

FormField **no lee** `FormContext.values` ni escribe en el contexto. Es un shell de presentacion que solo consulta la clave `errors`.

### Salida de datos

FormField no emite eventos propios. No tiene `onChange`, `onBlur` ni ningun callback. Toda la logica de datos es responsabilidad de los inputs hijos.

| Salida | Tipo | Descripcion |
|---|---|---|
| DOM estructura | HTML | Renderiza el layout label + content + messages sin eventos propios |

### Comunicacion con otros componentes

#### Con Form / LiveForm (lectura de errores — unidireccional)

FormField consume `FormContext` via `useFormFieldContext()` de forma **exclusivamente de lectura**:

```
Form valida y establece errors["email"] = "Email invalido"
        ↓ (lectura)
FormField lee FormContext.errors["email"]
        ↓
FormField renderiza <p role="alert">Email invalido</p>
```

El FormField no escribe en FormContext ni interfiere con el submit.

#### Con inputs hijos (sin comunicacion directa)

FormField no usa `React.cloneElement` ni `React.Children`. Los hijos son renderizados tal cual dentro de `div.w3f-form-field__content`:

```tsx
<FormField label="Email" name="email">
  <Input name="email" />   {/* Input maneja su propia integracion con Form */}
</FormField>
```

El `label` de FormField no tiene un `htmlFor` automatico. Si se necesita asociacion label-input, el input hijo debe asignar su propio `id` o usar el patron de label flotante integrado en el input.

#### Independiente (sin contexto requerido)

```tsx
// Funciona en cualquier parte del arbol React
<FormField label="Contrasena" error="Minimo 8 caracteres" helperText="Una mayuscula y un numero">
  <Input type="password" />
</FormField>
```

### Accesibilidad

| Atributo | Valor | Elemento | Condicion |
|---|---|---|---|
| `role` | `"group"` | Contenedor raiz | Siempre |
| `aria-labelledby` | id del label | Contenedor raiz | Cuando `label` esta definido |
| `aria-hidden` | `"true"` | Asterisco `*` | Siempre (decorativo) |
| `role` | `"alert"` | Mensaje de error | Cuando hay error |

El `role="group"` con `aria-labelledby` agrupa semanticamente el label y el input para lectores de pantalla.

### Patron de uso recomendado

```tsx
// 1. Wrapper basico con helper text
<FormField label="Usuario" helperText="Solo letras y numeros">
  <Input name="username" />
</FormField>

// 2. Campo requerido con error manual
<FormField label="Email" required error={emailError}>
  <Input type="email" value={email} onChange={setEmail} />
</FormField>

// 3. Layout inline para toggles y checks
<FormField label="Notificaciones" layout="inline">
  <SlideToggle name="notifications" />
</FormField>

// 4. Con validacion automatica de Form
<Form
  initialValues={{ email: '' }}
  validationRules={{ email: { required: true, email: true } }}
  onSubmit={handleSubmit}
>
  <FormField name="email" label="Email" required>
    <Input name="email" />
  </FormField>
  <Button type="submit">Enviar</Button>
</Form>

// 5. Campo deshabilitado
<FormField label="ID de usuario" disabled helperText="Este campo no puede editarse">
  <Input disabled value="usr_12345" />
</FormField>
```

## Estructura de archivos

```
FormField/
  FormField.tsx           Componente principal
  FormField.types.ts      Interfaces TypeScript
  FormField.constants.ts  Clases CSS y defaults
  FormField.utils.ts      buildFormFieldClasses()
  FormField.hooks.ts      useFormFieldContext (integracion Form)
  README.md               Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_form-field.css`
