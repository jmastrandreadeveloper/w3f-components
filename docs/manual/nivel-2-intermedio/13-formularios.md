# Capítulo 13 — Formularios: Form y LiveForm

**Nivel:** Intermedio
**Tiempo estimado de lectura:** 40 minutos

---

## ¿Qué vas a aprender?

- Cómo `Form` conecta automáticamente todos los inputs mediante el prop `name`
- Sistema de validación declarativa con `validationRules`
- El handler `onSubmit(values, helpers)` y sus helpers: `setErrors`, `resetForm`, `isSubmitting`
- `LiveForm` para reactividad sin submit: búsquedas, filtros, preview
- `FormField` para agrupar label, error y helper text
- Hooks avanzados: `useFormContext`, `useFormField`, `useFormFieldValue`

---

## Form vs LiveForm

| | `Form` | `LiveForm` |
|---|---|---|
| Cuándo se ejecuta el callback | Al hacer submit | En cada cambio de campo |
| Submit handler | `onSubmit(values, helpers)` | No tiene |
| Validación integrada | Sí (`validationRules`) | No |
| `isSubmitting` | Sí | No |
| Caso de uso | Formularios de registro, login, edición | Búsquedas, filtros, preview en tiempo real |

---

## Form — formularios con submit

`Form` envuelve sus hijos en un contexto. Cualquier input con la prop `name` que viva dentro de un `Form` se conecta automáticamente: lee su valor del contexto, escribe los cambios al contexto y recibe los errores del contexto.

No necesitás `useState` ni `onChange` en cada campo. `Form` lo gestiona todo.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `initialValues` | `Record<string, any>` | `{}` | Valores iniciales de los campos |
| `onSubmit` | `(values, helpers) => void \| Promise<void>` | — | Handler de submit |
| `validationRules` | `Record<string, ValidationRule>` | — | Reglas de validación por campo |
| `noValidate` | `boolean` | `true` | Evita validación nativa del browser |
| `className` | `string` | — | Clase CSS del `<form>` |

### Concepto clave: la prop `name` conecta el campo

La prop `name` de cada input debe coincidir con la clave en `initialValues`. Eso es todo lo que necesitás:

```tsx
import Form   from '@w3f/components/INPUTS/Form/Form'
import Input  from '@w3f/components/INPUTS/Input/Input'
import Button from '@w3f/components/INPUTS/Button/Button'

<Form
  initialValues={{ email: '', password: '' }}
  onSubmit={(values) => console.log(values)}
>
  {/* name="email" → se conecta a initialValues.email */}
  <Input name="email" label="Email" type="email" />

  {/* name="password" → se conecta a initialValues.password */}
  <Input name="password" label="Contraseña" type="password" />

  {/* type="submit" dispara el onSubmit del Form */}
  <Button type="submit">Entrar</Button>
</Form>
```

Cuando el usuario hace submit, `onSubmit` recibe:
```ts
values = { email: 'juan@empresa.com', password: 'secreto123' }
```

### El handler onSubmit

```tsx
<Form
  initialValues={{ nombre: '', email: '' }}
  onSubmit={async (values, helpers) => {
    // values — objeto con todos los valores del form
    console.log(values.nombre, values.email)

    // helpers disponibles:
    // helpers.setErrors({ campo: 'mensaje de error' })
    // helpers.resetForm()
    // helpers.setTouched({ campo: true })

    try {
      await api.crearUsuario(values)
      helpers.resetForm()
    } catch (err) {
      helpers.setErrors({ email: 'Este email ya está registrado' })
    }
  }}
>
  <Input name="nombre" label="Nombre" />
  <Input name="email"  label="Email" type="email" />
  <Button type="submit">Crear cuenta</Button>
</Form>
```

### isSubmitting — estado de carga

Mientras `onSubmit` está procesando (si es async), `isSubmitting` es `true`. Lo podés leer via `useFormContext()` o `useFormMeta()`:

```tsx
import { useFormMeta } from '@w3f/components/INPUTS/Form/Form.hooks'

function BotonSubmit() {
  const meta = useFormMeta()
  const isSubmitting = meta?.isSubmitting ?? false

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Guardando...' : 'Guardar'}
    </Button>
  )
}

// Usar dentro del Form:
<Form initialValues={...} onSubmit={...}>
  <Input name="nombre" label="Nombre" />
  <BotonSubmit />
</Form>
```

---

## Validación con validationRules

`validationRules` es un objeto donde cada clave es el `name` de un campo y el valor es un conjunto de reglas.

### Reglas disponibles

```ts
type ValidationRule = {
  required?: boolean | string          // true o mensaje personalizado
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  pattern?:  { value: RegExp; message: string }
  custom?:   (value: any, allValues: FormValues) => string | undefined
}
```

### Ejemplo completo de validación

```tsx
import Form    from '@w3f/components/INPUTS/Form/Form'
import Input   from '@w3f/components/INPUTS/Input/Input'
import Select  from '@w3f/components/INPUTS/Select/Select'
import Button  from '@w3f/components/INPUTS/Button/Button'
import Stack   from '@w3f/components/LAYOUT/Stack/Stack'

<Form
  initialValues={{
    nombre:   '',
    email:    '',
    password: '',
    confirm:  '',
    rol:      '',
  }}
  validationRules={{
    nombre: {
      required:  'El nombre es requerido',
      minLength: { value: 2,  message: 'Mínimo 2 caracteres' },
      maxLength: { value: 50, message: 'Máximo 50 caracteres' },
    },
    email: {
      required: 'El email es requerido',
      pattern: {
        value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Email inválido',
      },
    },
    password: {
      required:  'La contraseña es requerida',
      minLength: { value: 8, message: 'Mínimo 8 caracteres' },
      pattern: {
        value:   /^(?=.*[A-Z])(?=.*\d)/,
        message: 'Debe tener al menos una mayúscula y un número',
      },
    },
    confirm: {
      required: 'Confirmá la contraseña',
      custom: (value, values) =>
        value !== values.password ? 'Las contraseñas no coinciden' : undefined,
    },
    rol: {
      required: 'Seleccioná un rol',
    },
  }}
  onSubmit={async (values, { resetForm }) => {
    await api.registrar(values)
    resetForm()
  }}
>
  <Stack spacing="4">
    <Input  name="nombre"   label="Nombre completo" required />
    <Input  name="email"    label="Email" type="email" required />
    <Input  name="password" label="Contraseña" type="password" required />
    <Input  name="confirm"  label="Confirmar contraseña" type="password" required />
    <Select name="rol" label="Rol"
      options={[
        { value: '',      label: 'Seleccioná...', disabled: true },
        { value: 'admin', label: 'Administrador' },
        { value: 'user',  label: 'Usuario' },
      ]}
    />
    <Button type="submit" variant="raised" color="primary">
      Registrarse
    </Button>
  </Stack>
</Form>
```

Cuando el usuario hace submit con campos vacíos o inválidos:
- Los errores aparecen debajo de cada campo automáticamente
- El submit **no** se ejecuta
- `touched` se activa en todos los campos validados

### Validación custom — campos cruzados

La función `custom` recibe el valor del campo y **todos** los valores del form, lo que permite validaciones que dependen de otros campos:

```tsx
validationRules={{
  descuento: {
    custom: (value, values) => {
      if (Number(value) > Number(values.precio) * 0.5)
        return 'El descuento no puede superar el 50% del precio'
    },
  },
  fechaFin: {
    custom: (value, values) => {
      if (value && values.fechaInicio && value < values.fechaInicio)
        return 'La fecha de fin debe ser posterior a la de inicio'
    },
  },
}}
```

---

## Todos los inputs funcionan dentro de Form

`Input`, `Select`, `Checkbox`, `RadioGroup` y `SlideToggle` detectan si están dentro de un `Form` y se conectan automáticamente. Solo necesitás la prop `name`.

```tsx
import Form       from '@w3f/components/INPUTS/Form/Form'
import Input      from '@w3f/components/INPUTS/Input/Input'
import Select     from '@w3f/components/INPUTS/Select/Select'
import Checkbox   from '@w3f/components/INPUTS/Checkbox/Checkbox'
import { RadioGroup, RadioButton } from '@w3f/components/INPUTS/RadioButton/RadioButton'
import SlideToggle from '@w3f/components/INPUTS/SlideToggle/SlideToggle'
import Button      from '@w3f/components/INPUTS/Button/Button'
import Stack       from '@w3f/components/LAYOUT/Stack/Stack'

<Form
  initialValues={{
    nombre:       '',
    pais:         '',
    nivel:        'junior',
    notificaciones: false,
    newsletter:   false,
  }}
  onSubmit={(values) => console.log(values)}
>
  <Stack spacing="4">
    {/* Input — conectado automáticamente */}
    <Input name="nombre" label="Nombre" required />

    {/* Select — conectado automáticamente */}
    <Select name="pais" label="País"
      options={[
        { value: 'ar', label: 'Argentina' },
        { value: 'cl', label: 'Chile' },
        { value: 'uy', label: 'Uruguay' },
      ]}
    />

    {/* RadioGroup — conectado automáticamente */}
    <RadioGroup name="nivel" label="Nivel" direction="horizontal">
      <RadioButton label="Junior"  value="junior" />
      <RadioButton label="Semi"    value="semi" />
      <RadioButton label="Senior"  value="senior" />
    </RadioGroup>

    {/* SlideToggle — conectado automáticamente */}
    <SlideToggle name="notificaciones" label="Recibir notificaciones" />

    {/* Checkbox — conectado automáticamente */}
    <Checkbox name="newsletter" label="Suscribirme al newsletter" />

    <Button type="submit" variant="raised" color="primary">Guardar</Button>
  </Stack>
</Form>
```

Al hacer submit, `values` será:
```ts
{
  nombre: 'Juan',
  pais: 'ar',
  nivel: 'senior',
  notificaciones: true,
  newsletter: false,
}
```

---

## FormField — wrapper de label y error

`FormField` es un contenedor que agrega label, mensaje de error y helper text a cualquier input que no los tenga por sí solo (por ejemplo, un `input` nativo o un componente custom).

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | Etiqueta del campo |
| `name` | `string` | — | Conecta con el contexto del Form para leer errores |
| `error` | `string` | — | Error manual (si no está en el Form context) |
| `helperText` | `string` | — | Texto de ayuda debajo del campo |
| `required` | `boolean` | `false` | Agrega `*` al label |
| `disabled` | `boolean` | `false` | Aplica estado disabled a los hijos |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | Label encima o al costado |
| `children` | `ReactNode` | — | El input o control a envolver |

```tsx
import FormField from '@w3f/components/INPUTS/FormField/FormField'
import Form      from '@w3f/components/INPUTS/Form/Form'

// Envolviendo un input nativo
<Form initialValues={{ edad: '' }} onSubmit={...}>
  <FormField
    name="edad"
    label="Edad"
    helperText="Ingresá tu edad en años"
    required
  >
    <input
      type="number"
      name="edad"
      style={{
        width: '100%',
        padding: 'var(--w3f-space-3)',
        border: '1px solid var(--w3f-outline)',
        borderRadius: 'var(--w3f-radius-lg)',
        background: 'var(--w3f-surface)',
        color: 'var(--w3f-on-surface)',
      }}
    />
  </FormField>
</Form>

// Con layout inline (label al lado)
<FormField name="activo" label="Estado" layout="inline">
  <SlideToggle name="activo" />
</FormField>
```

---

## LiveForm — reactividad sin submit

`LiveForm` usa el mismo contexto que `Form`, por lo que todos los inputs se conectan igual. La diferencia es que no tiene submit: dispara `onValuesChange` en cada cambio.

### Props

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `initialValues` | `Record<string, any>` | `{}` | Valores iniciales |
| `onValuesChange` | `(values) => void` | — | Callback en cada cambio |
| `className` | `string` | — | Clase del contenedor |

### Búsqueda en tiempo real

```tsx
import LiveForm from '@w3f/components/INPUTS/LiveForm/LiveForm'
import Input    from '@w3f/components/INPUTS/Input/Input'
import Select   from '@w3f/components/INPUTS/Select/Select'
import { Search } from 'lucide-react'

function BuscadorProductos({ productos }: { productos: Producto[] }) {
  const [filtrados, setFiltrados] = useState(productos)

  const handleChange = (values: Record<string, any>) => {
    const { busqueda, categoria } = values
    setFiltrados(
      productos.filter(p => {
        const coincideTexto = p.nombre
          .toLowerCase()
          .includes((busqueda ?? '').toLowerCase())
        const coincideCategoria = !categoria || p.categoria === categoria
        return coincideTexto && coincideCategoria
      })
    )
  }

  return (
    <div>
      <LiveForm
        initialValues={{ busqueda: '', categoria: '' }}
        onValuesChange={handleChange}
      >
        <Stack horizontal spacing="3">
          <Input
            name="busqueda"
            label="Buscar producto"
            leadingIcon={<Search size={16} />}
          />
          <Select
            name="categoria"
            label="Categoría"
            options={[
              { value: '',          label: 'Todas' },
              { value: 'ropa',      label: 'Ropa' },
              { value: 'calzado',   label: 'Calzado' },
              { value: 'accesorios', label: 'Accesorios' },
            ]}
          />
        </Stack>
      </LiveForm>

      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap="var(--w3f-space-4)" style={{ marginTop: 'var(--w3f-space-5)' }}>
        {filtrados.map(p => (
          <Card key={p.id} title={p.nombre} content={p.precio} variant="outlined" />
        ))}
        {filtrados.length === 0 && (
          <p style={{ color: 'var(--w3f-outline)', gridColumn: '1/-1' }}>
            Sin resultados
          </p>
        )}
      </Grid>
    </div>
  )
}
```

### Preview en tiempo real

```tsx
// El panel de la derecha se actualiza mientras el usuario escribe
<Stack horizontal spacing="6" align="start">

  {/* Formulario */}
  <div style={{ flex: 1 }}>
    <LiveForm
      initialValues={{ titulo: 'Mi publicación', contenido: '', color: 'primary' }}
      onValuesChange={setPreview}
    >
      <Stack spacing="4">
        <Input  name="titulo"    label="Título" />
        <Input  name="contenido" label="Contenido" />
        <Select name="color" label="Color"
          options={[
            { value: 'primary',   label: 'Azul'    },
            { value: 'success',   label: 'Verde'   },
            { value: 'secondary', label: 'Naranja' },
          ]}
        />
      </Stack>
    </LiveForm>
  </div>

  {/* Preview */}
  <div style={{ flex: 1 }}>
    <Card
      title={preview.titulo || 'Título'}
      content={preview.contenido || 'Contenido...'}
      variant="elevated"
    />
  </div>

</Stack>
```

---

## Hooks para componentes dentro del Form

Cuando creás un componente custom que necesita leer o escribir el contexto del formulario:

### useFormContext — acceso completo

```tsx
import { useFormContext } from '@w3f/components/INPUTS/Form/Form.hooks'

function ResumenForm() {
  const { values, errors, isSubmitting } = useFormContext()

  return (
    <div>
      <p>Nombre: {values.nombre}</p>
      <p>Email: {values.email}</p>
      {errors.email && <p style={{ color: 'var(--w3f-danger)' }}>{errors.email}</p>}
      <p>Enviando: {isSubmitting ? 'Sí' : 'No'}</p>
    </div>
  )
}
```

### useFormField — valor + error de un campo

```tsx
import { useFormField } from '@w3f/components/INPUTS/Form/Form.hooks'

function CampoPersonalizado({ name }: { name: string }) {
  const { value, error, touched, setValue } = useFormField(name)

  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ borderColor: error && touched ? 'var(--w3f-danger)' : undefined }}
      />
      {error && touched && (
        <p style={{ color: 'var(--w3f-danger)', fontSize: '0.8rem' }}>{error}</p>
      )}
    </div>
  )
}
```

### useFormFieldValue — suscripción a un solo campo (optimizado)

```tsx
import { useFormFieldValue } from '@w3f/components/INPUTS/Form/Form.hooks'

// Solo re-renderiza cuando cambia "email", no cuando cambian otros campos
function PreviewEmail() {
  const email = useFormFieldValue('email')
  return <p>Email actual: {email || '—'}</p>
}
```

### setFieldValue — escribir un valor desde afuera

```tsx
import { useFormContext } from '@w3f/components/INPUTS/Form/Form.hooks'

function SelectorDireccion() {
  const { setFieldValue } = useFormContext()

  const seleccionarDireccion = (dir: Direccion) => {
    // Llenar múltiples campos con un solo click
    setFieldValue('calle',       dir.calle)
    setFieldValue('ciudad',      dir.ciudad)
    setFieldValue('codigoPostal', dir.cp)
  }

  return (
    <Button variant="outline" size="sm" onClick={() => seleccionarDireccion(miDireccion)}>
      Usar mi dirección guardada
    </Button>
  )
}
```

---

## Formulario completo — registro de usuario

Un ejemplo real que combina Form, validación, todos los tipos de input y feedback:

```tsx
import { useState }     from 'react'
import Form              from '@w3f/components/INPUTS/Form/Form'
import Input             from '@w3f/components/INPUTS/Input/Input'
import Select            from '@w3f/components/INPUTS/Select/Select'
import Checkbox          from '@w3f/components/INPUTS/Checkbox/Checkbox'
import { RadioGroup, RadioButton } from '@w3f/components/INPUTS/RadioButton/RadioButton'
import SlideToggle       from '@w3f/components/INPUTS/SlideToggle/SlideToggle'
import Button            from '@w3f/components/INPUTS/Button/Button'
import Stack             from '@w3f/components/LAYOUT/Stack/Stack'
import { FlexContainer } from '@w3f/components/LAYOUT/Flexbox/Flexbox'
import { useAlert }      from '@w3f/components/FEEDBACK/Alert/Alert.hooks'
import { useFormMeta }   from '@w3f/components/INPUTS/Form/Form.hooks'

// Botón que lee isSubmitting del contexto
function SubmitButton() {
  const meta = useFormMeta()
  return (
    <Button type="submit" variant="raised" color="primary"
      disabled={meta?.isSubmitting}>
      {meta?.isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
    </Button>
  )
}

export default function RegistroForm() {
  const { addAlert } = useAlert()
  const [exito, setExito] = useState(false)

  if (exito) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--w3f-space-8)' }}>
        <p className="w3f-font-semibold" style={{ fontSize: 'var(--w3f-text-xl)', color: 'var(--w3f-success)' }}>
          ¡Cuenta creada con éxito!
        </p>
        <Button variant="outline" onClick={() => setExito(false)}>
          Crear otra cuenta
        </Button>
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: 520, margin: '0 auto',
      padding: 'var(--w3f-space-6)',
      background: 'var(--w3f-surface)',
      borderRadius: 'var(--w3f-radius-xl)',
      boxShadow: 'var(--w3f-shadow-md)',
    }}>
      <h1 className="w3f-font-bold w3f-mb-6"
        style={{ fontSize: 'var(--w3f-text-2xl)', color: 'var(--w3f-on-surface)', margin: '0 0 var(--w3f-space-6)' }}>
        Crear cuenta
      </h1>

      <Form
        initialValues={{
          nombre: '', apellido: '', email: '', password: '', confirm: '',
          pais: '', tipo: 'personal', newsletter: false, terminos: false,
        }}
        validationRules={{
          nombre:   { required: 'Requerido', minLength: { value: 2, message: 'Mínimo 2 caracteres' } },
          apellido: { required: 'Requerido' },
          email:    { required: 'Requerido', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' } },
          password: {
            required: 'Requerido',
            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
            pattern: { value: /^(?=.*[A-Z])(?=.*\d)/, message: 'Debe incluir mayúscula y número' },
          },
          confirm: {
            required: 'Requerido',
            custom: (v, all) => v !== all.password ? 'Las contraseñas no coinciden' : undefined,
          },
          pais:     { required: 'Seleccioná un país' },
          terminos: { custom: (v) => !v ? 'Debés aceptar los términos' : undefined },
        }}
        onSubmit={async (values, { resetForm }) => {
          // Simular llamada a API
          await new Promise(r => setTimeout(r, 1500))
          console.log('Nuevo usuario:', values)
          addAlert({ message: `Bienvenido, ${values.nombre}!`, type: 'success' })
          resetForm()
          setExito(true)
        }}
      >
        <Stack spacing="4">

          {/* Fila nombre + apellido */}
          <Stack horizontal spacing="3">
            <div style={{ flex: 1 }}>
              <Input name="nombre"   label="Nombre"   required />
            </div>
            <div style={{ flex: 1 }}>
              <Input name="apellido" label="Apellido" required />
            </div>
          </Stack>

          <Input name="email"    label="Email" type="email" leadingIcon="mail" required />
          <Input name="password" label="Contraseña" type="password" required
            helperText="Mínimo 8 caracteres, una mayúscula y un número" />
          <Input name="confirm"  label="Confirmar contraseña" type="password" required />

          <Select name="pais" label="País" required
            options={[
              { value: '',   label: 'Seleccioná tu país...', disabled: true },
              { value: 'ar', label: 'Argentina' },
              { value: 'cl', label: 'Chile' },
              { value: 'uy', label: 'Uruguay' },
              { value: 'mx', label: 'México' },
            ]}
          />

          <RadioGroup name="tipo" label="Tipo de cuenta" direction="horizontal">
            <RadioButton label="Personal" value="personal" />
            <RadioButton label="Empresa"  value="empresa" />
          </RadioGroup>

          <SlideToggle name="newsletter" label="Recibir novedades y ofertas" />

          <Checkbox name="terminos"
            label="Acepto los términos y condiciones de uso" />

          <FlexContainer justifyContent="end" gap="var(--w3f-space-3)">
            <Button type="button" variant="flat">Cancelar</Button>
            <SubmitButton />
          </FlexContainer>

        </Stack>
      </Form>
    </div>
  )
}
```

---

## Ejercicio práctico

Construí un **formulario de edición de perfil** con dos secciones:

**Sección 1 — Datos públicos** (con `Form`)
- Input: Nombre de usuario (requerido, mínimo 3 chars, patrón solo alfanumérico)
- Input: Bio (máximo 160 caracteres)
- Input: Sitio web (patrón URL)
- Checkbox: Perfil público

**Sección 2 — Filtros en tiempo real** (con `LiveForm`)
- Input de búsqueda que filtra una lista de 5 etiquetas (tags) en tiempo real
- Select de categoría que filtra también

Al guardar el Form: `showSuccess('Perfil actualizado')` del hook `useSnackbar`.

---

## Referencia rápida

### Patrón mínimo con Form

```tsx
<Form
  initialValues={{ campo: '' }}
  onSubmit={(values, { setErrors, resetForm }) => { ... }}
  validationRules={{ campo: { required: 'Requerido' } }}
>
  <Input name="campo" label="Campo" />
  <Button type="submit">Enviar</Button>
</Form>
```

### Reglas de validación

```ts
validationRules={{
  campo: {
    required:  true | 'Mensaje personalizado',
    minLength: { value: 3,  message: '...' },
    maxLength: { value: 50, message: '...' },
    pattern:   { value: /regex/, message: '...' },
    custom:    (value, allValues) => value ? undefined : 'error',
  }
}}
```

### Patrón mínimo con LiveForm

```tsx
<LiveForm
  initialValues={{ busqueda: '' }}
  onValuesChange={(values) => filtrar(values.busqueda)}
>
  <Input name="busqueda" label="Buscar" />
</LiveForm>
```

### Hooks disponibles

| Hook | Para qué | Re-renderiza cuando |
|---|---|---|
| `useFormContext()` | Todo el contexto | Cualquier cambio |
| `useFormField(name)` | Un campo específico | Cualquier campo cambia |
| `useFormFieldValue(name)` | Solo el valor de un campo | Solo ese campo cambia |
| `useFormMeta()` | Errors, touched, isSubmitting | Errores o estado cambia |
| `useFormDispatch()` | Funciones estables | Nunca |

---

## En Next.js

`Form` y `LiveForm` son proveedores de contexto React — siempre necesitan `'use client'`. Cualquier archivo que los use debe declararlo:

```tsx
'use client'

import { Form, FormField } from '@w3f/components/INPUTS/Form/Form'
import { Input }           from '@w3f/components/INPUTS/Input/Input'
import Button              from '@w3f/components/INPUTS/Button/Button'

export default function FormularioContacto() {
  return (
    <Form
      initialValues={{ nombre: '', email: '', mensaje: '' }}
      onSubmit={async (values) => {
        // Llamada a una API route de Next.js
        await fetch('/api/contacto', {
          method: 'POST',
          body: JSON.stringify(values),
        })
      }}
    >
      <FormField name="nombre" label="Nombre" required>
        <Input name="nombre" />
      </FormField>
      <FormField name="email" label="Email" required>
        <Input name="email" type="email" />
      </FormField>
      <Button type="submit" variant="raised" color="primary">Enviar</Button>
    </Form>
  )
}
```

### Server Actions con Form W3F

Podés usar [Server Actions de Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) como handler de `onSubmit`. La función Server Action se ejecuta en el servidor, pero el componente Form sigue siendo Client Component:

```tsx
'use client'

import { Form } from '@w3f/components/INPUTS/Form/Form'
import { guardarContacto } from '@/app/actions/contacto'  // Server Action
import { dispatchAlert }   from '@w3f/components/FEEDBACK/Alert/Alert.hooks'

export default function FormularioContacto() {
  return (
    <Form
      onSubmit={async (values) => {
        const resultado = await guardarContacto(values)  // corre en el servidor
        if (resultado.ok) {
          dispatchAlert({ message: 'Mensaje enviado', type: 'success' })
        }
      }}
    >
      {/* campos */}
    </Form>
  )
}
```

```tsx
// app/actions/contacto.ts — Server Action (sin 'use client')
'use server'

export async function guardarContacto(data: Record<string, string>) {
  // acceso directo a DB, emails, etc.
  await db.contactos.create({ data })
  return { ok: true }
}
```

---

## Siguiente paso

[Capítulo 14 — Customización CSS básica](14-customizacion-css.md)

Vas a aprender a personalizar el look and feel del framework: override de tokens globales, temas por sección, el sistema `unstyled` y las clases utilitarias disponibles.
