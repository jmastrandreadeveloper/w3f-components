# Capítulo 09 — Inputs básicos

**Nivel:** Intermedio
**Tiempo estimado de lectura:** 40 minutos

---

## ¿Qué vas a aprender?

- Uso completo de `Input`: tipos, variantes, íconos, validación y máscaras
- `Select` con opciones simples y grupos de opciones
- `Checkbox` controlado y no controlado
- `RadioGroup` + `RadioButton` para selección única
- `SlideToggle` para estados on/off
- Patrones de estado controlado vs no controlado
- Cómo capturar y mostrar errores en cada input

---

## Controlado vs no controlado

Antes de entrar en cada componente, hay que entender este concepto:

**No controlado** — React no gestiona el valor. El componente maneja su propio estado interno:

```tsx
// No controlado — útil para prototipos rápidos
<Input label="Nombre" />
<Checkbox label="Acepto términos" />
```

**Controlado** — vos gestionás el valor con `useState`. Es el patrón recomendado para formularios reales:

```tsx
// Controlado — vos manejás el valor
const [nombre, setNombre] = useState('')

<Input
  label="Nombre"
  value={nombre}
  onChange={e => setNombre(e.target.value)}
/>
```

La regla práctica: usá controlado siempre que necesites leer o validar el valor.

---

## Input

El componente más versátil del framework. Soporta todos los tipos HTML (`text`, `email`, `password`, `number`, `tel`, etc.) más variantes visuales, íconos, máscaras y validación.

### Props principales

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | Etiqueta flotante del campo |
| `type` | `string` | `'text'` | Tipo HTML del input |
| `name` | `string` | — | Nombre del campo (necesario en formularios) |
| `value` | `string` | — | Valor controlado |
| `onChange` | `(e) => void` | — | Callback de cambio |
| `error` | `string` | — | Mensaje de error (colorea el borde en rojo) |
| `helperText` | `string` | — | Texto de ayuda debajo del campo |
| `required` | `boolean` | `false` | Marca el campo como requerido |
| `disabled` | `boolean` | `false` | Deshabilita el campo |
| `variant` | `'solid' \| 'outlined' \| 'ghost' \| 'soft'` | `'solid'` | Estilo visual |
| `size` | `'xxxs' \| 'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamaño del campo |
| `leadingIcon` | `ReactNode \| string` | — | Ícono al inicio |
| `trailingIcon` | `ReactNode \| string` | — | Ícono al final |
| `onIconClick` | `() => void` | — | Click en el trailing icon |
| `mask` | `string \| MaskDefinition` | — | Máscara de formato |
| `pattern` | `string \| RegExp` | — | Regex de validación al salir del campo |

### Ejemplos básicos

```tsx
import Input from '@w3f/components/INPUTS/Input/Input'

// Campo simple
<Input label="Nombre" />

// Controlado
<Input
  label="Email"
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
/>

// Con validación y mensaje de error
<Input
  label="Usuario"
  value={usuario}
  onChange={e => setUsuario(e.target.value)}
  error={usuario.length < 3 ? 'Mínimo 3 caracteres' : ''}
  helperText="Solo letras y números"
  required
/>

// Con helper text (sin error)
<Input
  label="Contraseña"
  type="password"
  helperText="Mínimo 8 caracteres, una mayúscula y un número"
/>

// Deshabilitado
<Input label="Campo de solo lectura" value="No editable" disabled />
```

### Variantes visuales

```tsx
// Solid (default) — fondo sólido con borde sutil
<Input label="Solid" variant="solid" />

// Outlined — solo borde, sin fondo
<Input label="Outlined" variant="outlined" />

// Ghost — sin borde visible, fondo transparente
<Input label="Ghost" variant="ghost" />

// Soft — fondo suave translúcido
<Input label="Soft" variant="soft" />
```

### Tamaños

```tsx
<Input label="Extra pequeño" size="xs" />
<Input label="Pequeño"       size="sm" />
<Input label="Mediano"       size="md" />   {/* default */}
<Input label="Grande"        size="lg" />
<Input label="Extra grande"  size="xl" />
```

### Con íconos

Los íconos aceptan cualquier `ReactNode` (componente de Lucide) o un string con el nombre del ícono del registry de W3F:

```tsx
import { Search, Mail, Eye, EyeOff } from 'lucide-react'

// Ícono al inicio (leadingIcon)
<Input
  label="Buscar"
  leadingIcon={<Search size={16} />}
/>

// Ícono al inicio con string del registry
<Input
  label="Email"
  type="email"
  leadingIcon="mail"
/>

// Ícono al final clickeable (ej: mostrar/ocultar contraseña)
const [showPass, setShowPass] = useState(false)

<Input
  label="Contraseña"
  type={showPass ? 'text' : 'password'}
  trailingIcon={showPass ? <EyeOff size={16} /> : <Eye size={16} />}
  onIconClick={() => setShowPass(v => !v)}
/>
```

### Máscaras de formato

Las máscaras formatean automáticamente el valor mientras el usuario escribe:

```tsx
// Máscaras predefinidas
<Input label="Teléfono"       mask="phone" />        // (555) 123-4567
<Input label="Fecha"          mask="date" />          // DD/MM/YYYY
<Input label="Tarjeta"        mask="credit-card" />   // 1234 5678 9012 3456
<Input label="Código postal"  mask="zip-code" />      // 12345
<Input label="Monto"          mask="currency" />      // $0.00
<Input label="CUIT"           mask="cuit" />          // 20-12345678-9
```

> Las máscaras formatean lo que se muestra pero `onChange` recibe el valor limpio (sin separadores).

### Validación con pattern

```tsx
// Valida al salir del campo (onBlur)
<Input
  label="Solo números"
  pattern={/^\d+$/}
  helperText="Ingresá solo dígitos"
/>

<Input
  label="Email corporativo"
  type="email"
  pattern={/^[a-zA-Z0-9._%+-]+@empresa\.com$/}
  helperText="Debe ser @empresa.com"
/>
```

Si el valor no coincide con el patrón al salir del campo, se muestra automáticamente un error.

---

## Select

Desplegable nativo estilizado. Soporta opciones simples y grupos de opciones.

### Props principales

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | Etiqueta flotante |
| `options` | `SelectOption[] \| SelectOptionGroup[]` | — | Opciones a mostrar |
| `value` | `string \| string[]` | — | Valor controlado |
| `onChange` | `(e) => void` | — | Callback de cambio |
| `error` | `string` | — | Mensaje de error |
| `helperText` | `string` | — | Texto de ayuda |
| `multiple` | `boolean` | `false` | Selección múltiple |
| `required` | `boolean` | `false` | Campo requerido |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `variant` | `'solid' \| 'outlined' \| 'ghost' \| 'soft'` | `'solid'` | Estilo visual |
| `leadingIcon` | `ReactNode` | — | Ícono al inicio |

### SelectOption

```ts
{
  value: string | number | null   // valor interno
  label: string                   // texto que ve el usuario
  disabled?: boolean              // opción deshabilitada
}
```

### Opciones simples

```tsx
import Select from '@w3f/components/INPUTS/Select/Select'

const PAISES = [
  { value: 'ar', label: 'Argentina' },
  { value: 'br', label: 'Brasil' },
  { value: 'cl', label: 'Chile' },
  { value: 'uy', label: 'Uruguay' },
]

// No controlado
<Select label="País" options={PAISES} />

// Controlado
const [pais, setPais] = useState('ar')

<Select
  label="País"
  options={PAISES}
  value={pais}
  onChange={e => setPais(e.target.value)}
/>
```

### Grupos de opciones

```tsx
const OPCIONES = [
  {
    label: 'América del Sur',
    options: [
      { value: 'ar', label: 'Argentina' },
      { value: 'br', label: 'Brasil' },
    ],
  },
  {
    label: 'Europa',
    options: [
      { value: 'es', label: 'España' },
      { value: 'fr', label: 'Francia' },
      { value: 'de', label: 'Alemania', disabled: true },
    ],
  },
]

<Select label="País" options={OPCIONES} />
```

### Selección múltiple

```tsx
const [lenguajes, setLenguajes] = useState<string[]>(['ts'])

<Select
  label="Lenguajes"
  multiple
  options={[
    { value: 'ts',  label: 'TypeScript' },
    { value: 'js',  label: 'JavaScript' },
    { value: 'py',  label: 'Python' },
    { value: 'go',  label: 'Go' },
  ]}
  value={lenguajes}
  onChange={e => {
    const selected = Array.from(e.target.selectedOptions, o => o.value)
    setLenguajes(selected)
  }}
  helperText="Mantené Ctrl para seleccionar varios"
/>
```

### Con error

```tsx
<Select
  label="Rol"
  options={[
    { value: '',      label: 'Elegir rol...', disabled: true },
    { value: 'admin', label: 'Administrador' },
    { value: 'user',  label: 'Usuario' },
  ]}
  value={rol}
  onChange={e => setRol(e.target.value)}
  error={!rol ? 'Seleccioná un rol' : ''}
  required
/>
```

---

## Checkbox

Casilla de verificación para selecciones booleanas (verdadero/falso).

> **Nota importante:** a diferencia de `Input`, el callback `onChange` de `Checkbox` recibe directamente el valor booleano (`boolean`), no un evento.

### Props principales

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | Texto junto al checkbox |
| `name` | `string` | — | Nombre del campo |
| `checked` | `boolean` | — | Estado controlado |
| `onChange` | `(checked: boolean) => void` | — | Callback — recibe boolean, no evento |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color del tick |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `value` | `string` | — | Valor para formularios HTML |

### Ejemplos

```tsx
import Checkbox from '@w3f/components/INPUTS/Checkbox/Checkbox'

// No controlado
<Checkbox label="Recordarme" />

// Controlado — onChange recibe boolean directamente
const [acepto, setAcepto] = useState(false)

<Checkbox
  label="Acepto los términos y condiciones"
  checked={acepto}
  onChange={setAcepto}   // setAcepto recibe boolean: perfecto
/>

// Con color
<Checkbox label="Urgente"    color="danger"  checked={urgente}  onChange={setUrgente} />
<Checkbox label="Completado" color="success" checked={hecho}    onChange={setHecho} />
<Checkbox label="En revisión" color="warning" checked={revision} onChange={setRevision} />

// Deshabilitado
<Checkbox label="Opción bloqueada" checked={true} disabled />
```

### Lista de checkboxes

```tsx
const PERMISOS = ['Leer', 'Escribir', 'Eliminar', 'Administrar']

const [seleccionados, setSeleccionados] = useState<string[]>([])

const toggle = (permiso: string) => {
  setSeleccionados(prev =>
    prev.includes(permiso)
      ? prev.filter(p => p !== permiso)
      : [...prev, permiso]
  )
}

<Stack spacing="2">
  {PERMISOS.map(p => (
    <Checkbox
      key={p}
      label={p}
      checked={seleccionados.includes(p)}
      onChange={() => toggle(p)}
    />
  ))}
</Stack>

<p className="w3f-text-sm w3f-mt-2" style={{ color: 'var(--w3f-outline)' }}>
  Seleccionados: {seleccionados.join(', ') || 'Ninguno'}
</p>
```

---

## RadioGroup + RadioButton

Para elegir una sola opción de una lista. Requiere el patrón grupo + items:

```
RadioGroup   ← gestiona el estado y el nombre del grupo
└── RadioButton value="a"  ← opción A
└── RadioButton value="b"  ← opción B
└── RadioButton value="c"  ← opción C
```

### Props de RadioGroup

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `name` | `string` | auto | Nombre HTML del grupo |
| `value` | `string` | — | Valor controlado |
| `defaultValue` | `string` | `''` | Valor inicial (no controlado) |
| `onChange` | `(value: string) => void` | — | Callback — recibe string con el valor |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Orientación de los botones |
| `label` | `string` | — | Leyenda del grupo (`<legend>`) |
| `error` | `string` | — | Mensaje de error del grupo |
| `required` | `boolean` | `false` | Grupo requerido |
| `showSelection` | `boolean` | `false` | Muestra un panel con la opción elegida |

### Props de RadioButton

| Prop | Tipo | Descripción |
|---|---|---|
| `label` | `string` | Texto de la opción |
| `value` | `string` | Valor que representa esta opción |
| `disabled` | `boolean` | Deshabilita esta opción específica |

### Ejemplos

```tsx
import { RadioGroup, RadioButton } from '@w3f/components/INPUTS/RadioButton/RadioButton'

// No controlado
<RadioGroup label="Tamaño" defaultValue="md">
  <RadioButton label="Pequeño" value="sm" />
  <RadioButton label="Mediano" value="md" />
  <RadioButton label="Grande"  value="lg" />
</RadioGroup>

// Controlado
const [plan, setPlan] = useState('basico')

<RadioGroup
  name="plan"
  label="Plan de suscripción"
  value={plan}
  onChange={setPlan}
>
  <RadioButton label="Básico — gratis"          value="basico" />
  <RadioButton label="Pro — $ 9/mes"            value="pro" />
  <RadioButton label="Enterprise — $ 49/mes"    value="enterprise" />
  <RadioButton label="Corporativo — contactar"  value="corp" disabled />
</RadioGroup>

// Horizontal
<RadioGroup
  name="turno"
  label="Turno"
  direction="horizontal"
  value={turno}
  onChange={setTurno}
>
  <RadioButton label="Mañana" value="manana" />
  <RadioButton label="Tarde"  value="tarde" />
  <RadioButton label="Noche"  value="noche" />
</RadioGroup>

// Con error
<RadioGroup
  name="genero"
  label="Género"
  value={genero}
  onChange={setGenero}
  error={!genero ? 'Seleccioná una opción' : ''}
  required
>
  <RadioButton label="Masculino"    value="m" />
  <RadioButton label="Femenino"     value="f" />
  <RadioButton label="No binario"   value="nb" />
  <RadioButton label="Prefiero no indicar" value="nd" />
</RadioGroup>
```

---

## SlideToggle

Switch deslizante para estados on/off. Ideal para configuraciones, permisos y preferencias.

> **Nota:** igual que `Checkbox`, el callback `onChange` recibe directamente un `boolean`.

### Props principales

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `label` | `string` | — | Texto descriptivo del toggle |
| `checked` | `boolean` | — | Estado controlado |
| `onChange` | `(checked: boolean) => void` | — | Callback — recibe boolean |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del switch |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color activo |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Posición del texto |
| `showIcon` | `boolean` | `false` | Muestra ✓ / ✕ dentro del thumb |
| `loading` | `boolean` | `false` | Estado de carga (deshabilita y anima) |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `helperText` | `string` | — | Texto de ayuda debajo |
| `error` | `string` | — | Mensaje de error |

### Ejemplos

```tsx
import SlideToggle from '@w3f/components/INPUTS/SlideToggle/SlideToggle'

// No controlado
<SlideToggle label="Activar notificaciones" />

// Controlado
const [notif, setNotif] = useState(true)

<SlideToggle
  label="Notificaciones push"
  checked={notif}
  onChange={setNotif}
/>

// Variantes de color
<SlideToggle label="Activo"    variant="success"   checked={true}  onChange={() => {}} />
<SlideToggle label="Peligro"   variant="danger"    checked={true}  onChange={() => {}} />
<SlideToggle label="Atención"  variant="warning"   checked={true}  onChange={() => {}} />

// Tamaños
<SlideToggle label="Pequeño" size="sm" checked={true} onChange={() => {}} />
<SlideToggle label="Mediano" size="md" checked={true} onChange={() => {}} />
<SlideToggle label="Grande"  size="lg" checked={true} onChange={() => {}} />

// Con ícono en el thumb
<SlideToggle
  label="Dark mode"
  showIcon
  checked={dark}
  onChange={setDark}
/>

// Label a la izquierda
<SlideToggle
  label="Recibir emails"
  labelPosition="left"
  checked={emails}
  onChange={setEmails}
/>

// Con texto de ayuda
<SlideToggle
  label="Modo mantenimiento"
  variant="danger"
  checked={mantenimiento}
  onChange={setMantenimiento}
  helperText="Cuando está activo, solo los admins pueden acceder"
/>

// Estado de carga (por ejemplo mientras guardás en el servidor)
<SlideToggle
  label="Guardando..."
  loading={guardando}
  checked={valor}
  onChange={handleToggle}
/>
```

### Lista de configuraciones

```tsx
const CONFIGURACIONES = [
  { id: 'emails',       label: 'Emails de marketing',      variant: 'primary'   },
  { id: 'push',         label: 'Notificaciones push',       variant: 'primary'   },
  { id: 'sms',          label: 'Mensajes de texto',         variant: 'secondary' },
  { id: 'mantenimiento', label: 'Modo mantenimiento',       variant: 'danger'    },
] as const

const [config, setConfig] = useState({
  emails: true, push: true, sms: false, mantenimiento: false,
})

<Stack spacing="3">
  {CONFIGURACIONES.map(({ id, label, variant }) => (
    <SlideToggle
      key={id}
      label={label}
      variant={variant}
      checked={config[id]}
      onChange={val => setConfig(prev => ({ ...prev, [id]: val }))}
    />
  ))}
</Stack>
```

---

## Combinando inputs — formulario de registro

Un ejemplo que reúne todos los inputs del capítulo:

```tsx
import { useState } from 'react'
import Stack              from '@w3f/components/LAYOUT/Stack/Stack'
import Button             from '@w3f/components/INPUTS/Button/Button'
import Input              from '@w3f/components/INPUTS/Input/Input'
import Select             from '@w3f/components/INPUTS/Select/Select'
import Checkbox           from '@w3f/components/INPUTS/Checkbox/Checkbox'
import { RadioGroup, RadioButton } from '@w3f/components/INPUTS/RadioButton/RadioButton'
import SlideToggle        from '@w3f/components/INPUTS/SlideToggle/SlideToggle'
import { FlexContainer }  from '@w3f/components/LAYOUT/Flexbox/Flexbox'

const ROLES = [
  { value: 'dev',     label: 'Desarrollador' },
  { value: 'design',  label: 'Diseñador' },
  { value: 'pm',      label: 'Product Manager' },
  { value: 'other',   label: 'Otro' },
]

export default function FormularioRegistro() {
  const [nombre,    setNombre]    = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [showPass,  setShowPass]  = useState(false)
  const [rol,       setRol]       = useState('')
  const [nivel,     setNivel]     = useState('junior')
  const [acepto,    setAcepto]    = useState(false)
  const [notif,     setNotif]     = useState(true)

  const [errores, setErrores] = useState<Record<string, string>>({})

  const validar = () => {
    const nuevos: Record<string, string> = {}
    if (!nombre.trim())             nuevos.nombre   = 'El nombre es requerido'
    if (!email.includes('@'))       nuevos.email    = 'Email inválido'
    if (password.length < 8)        nuevos.password = 'Mínimo 8 caracteres'
    if (!rol)                       nuevos.rol      = 'Seleccioná un rol'
    if (!acepto)                    nuevos.acepto   = 'Debés aceptar los términos'
    setErrores(nuevos)
    return Object.keys(nuevos).length === 0
  }

  const handleSubmit = () => {
    if (validar()) {
      console.log({ nombre, email, password, rol, nivel, notif })
    }
  }

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      padding: 'var(--w3f-space-6)',
      background: 'var(--w3f-surface)',
      borderRadius: 'var(--w3f-radius-xl)',
      boxShadow: 'var(--w3f-shadow-md)',
    }}>
      <h2
        className="w3f-font-bold w3f-mb-6"
        style={{ fontSize: 'var(--w3f-text-xl)', color: 'var(--w3f-on-surface)', marginTop: 0 }}
      >
        Crear cuenta
      </h2>

      <Stack spacing="4">

        <Input
          label="Nombre completo"
          name="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          error={errores.nombre}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          leadingIcon="mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errores.email}
          required
        />

        <Input
          label="Contraseña"
          name="password"
          type={showPass ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={errores.password}
          helperText="Mínimo 8 caracteres"
          trailingIcon={showPass ? '👁' : '🔒'}
          onIconClick={() => setShowPass(v => !v)}
          required
        />

        <Select
          label="Rol"
          name="rol"
          options={[{ value: '', label: 'Seleccioná un rol...', disabled: true }, ...ROLES]}
          value={rol}
          onChange={e => setRol(e.target.value)}
          error={errores.rol}
          required
        />

        <RadioGroup
          name="nivel"
          label="Nivel de experiencia"
          direction="horizontal"
          value={nivel}
          onChange={setNivel}
        >
          <RadioButton label="Junior"  value="junior" />
          <RadioButton label="Semi"    value="semi" />
          <RadioButton label="Senior"  value="senior" />
        </RadioGroup>

        <SlideToggle
          label="Recibir notificaciones del equipo"
          checked={notif}
          onChange={setNotif}
        />

        <Checkbox
          label="Acepto los términos y condiciones"
          name="acepto"
          checked={acepto}
          onChange={setAcepto}
        />
        {errores.acepto && (
          <p className="w3f-text-sm" style={{ color: 'var(--w3f-danger)', margin: 0 }}>
            {errores.acepto}
          </p>
        )}

        <FlexContainer justifyContent="end" gap="var(--w3f-space-3)">
          <Button variant="flat">Cancelar</Button>
          <Button variant="raised" color="primary" onClick={handleSubmit}>
            Crear cuenta
          </Button>
        </FlexContainer>

      </Stack>
    </div>
  )
}
```

---

## Ejercicio práctico

Construí un formulario de **configuración de perfil** con estas secciones:

**Sección 1 — Datos personales**
- Input: Nombre (requerido)
- Input: Email (type email, requerido)
- Input: Teléfono (mask `phone`)

**Sección 2 — Preferencias**
- Select: Idioma (`es` / `en` / `pt`)
- RadioGroup horizontal: Tema (`light` / `dark` / `auto`)

**Sección 3 — Notificaciones**
- SlideToggle: Emails semanales
- SlideToggle: Alertas de seguridad (variant `danger`)
- SlideToggle: Novedades del producto

**Botón final**: "Guardar cambios" — solo activo si Nombre y Email están completos

### Pista para el botón deshabilitado

```tsx
<Button
  variant="raised"
  color="primary"
  disabled={!nombre.trim() || !email.includes('@')}
>
  Guardar cambios
</Button>
```

---

## Referencia rápida

### Comparativa de onChange

| Componente | onChange recibe |
|---|---|
| `Input` | `React.ChangeEvent<HTMLInputElement>` → leer `.target.value` |
| `Select` | `React.ChangeEvent<HTMLSelectElement>` → leer `.target.value` |
| `Checkbox` | `boolean` directamente |
| `RadioGroup` | `string` (el value del RadioButton elegido) |
| `SlideToggle` | `boolean` directamente |

### Máscaras disponibles

| mask | Formato |
|---|---|
| `'phone'` | `(555) 123-4567` |
| `'date'` | `DD/MM/YYYY` |
| `'currency'` | `$0.00` |
| `'credit-card'` | `1234 5678 9012 3456` |
| `'zip-code'` | `12345` |
| `'cuit'` | `20-12345678-9` |

### Variantes de Input / Select

| variant | Estilo |
|---|---|
| `solid` | Fondo sólido + borde sutil (default) |
| `outlined` | Solo borde, sin fondo |
| `ghost` | Sin borde, fondo transparente |
| `soft` | Fondo suave translúcido |

---

## En Next.js

Todos los inputs usan hooks (`useState`, `useRef`, `useContext`) y manejan eventos del DOM — son **siempre Client Components**. Cualquier archivo que importe un input de W3F debe comenzar con `'use client'`:

```tsx
'use client'  // ← obligatorio

import { useState }  from 'react'
import { Input }     from '@w3f/components/INPUTS/Input/Input'
import Select        from '@w3f/components/INPUTS/Select/Select'
import Checkbox      from '@w3f/components/INPUTS/Checkbox/Checkbox'
import Button        from '@w3f/components/INPUTS/Button/Button'

export default function Formulario() {
  const [nombre, setNombre] = useState('')

  return (
    <form>
      <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <Button type="submit" variant="raised" color="primary">Enviar</Button>
    </form>
  )
}
```

En Next.js App Router el patrón recomendado es separar la lógica del cliente en componentes dedicados e importarlos desde las páginas (que pueden ser Server Components):

```tsx
// app/registro/page.tsx — Server Component (sin 'use client')
import FormularioRegistro from './formulario-registro'

export default function Page() {
  return <FormularioRegistro />
}

// app/registro/formulario-registro.tsx — Client Component
'use client'
import { Input } from '@w3f/components/INPUTS/Input/Input'
// ...
```

---

## Siguiente paso

[Capítulo 10 — Display de datos: Card, Badge, Text, Avatar](10-display-datos.md)

Vas a aprender los componentes de presentación: cómo mostrar información con Card, etiquetar con Badge, tipar texto con Text y representar usuarios con Avatar.
