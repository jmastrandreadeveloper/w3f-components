# Checkbox

Componente de seleccion booleana personalizado, compatible con Form y LiveForm mediante Context API. Soporta contenido anidado que se revela cuando esta marcado, variantes de color y estado deshabilitado.

## Importacion

```tsx
import Checkbox from '@/components/INPUTS/Checkbox/Checkbox';
```

## Uso basico

### Simple controlado

```tsx
const [accepted, setAccepted] = useState(false);

<Checkbox label="Acepto los terminos" checked={accepted} onChange={setAccepted} />
```

### No controlado

```tsx
<Checkbox label="Recordarme" />
```

## Colores

Cuatro variantes de color para el estado marcado:

```tsx
<Checkbox label="Primary"  color="primary"  checked onChange={() => {}} />
<Checkbox label="Success"  color="success"  checked onChange={() => {}} />
<Checkbox label="Warning"  color="warning"  checked onChange={() => {}} />
<Checkbox label="Danger"   color="danger"   checked onChange={() => {}} />
```

## Deshabilitado

```tsx
<Checkbox label="Deshabilitado sin marcar" disabled />
<Checkbox label="Deshabilitado marcado"    disabled checked onChange={() => {}} />
```

## Contenido anidado

Cuando el checkbox esta marcado, se revela el contenido `children` con una animacion de entrada:

```tsx
const [enabled, setEnabled] = useState(false);

<Checkbox
  label="Activar notificaciones"
  checked={enabled}
  onChange={setEnabled}
  color="primary"
>
  <p>Recibiras alertas por correo sobre actualizaciones importantes.</p>
</Checkbox>
```

## Grupo de checkboxes

Patron para gestionar multiples opciones independientes:

```tsx
const [email, setEmail]   = useState(true);
const [sms, setSms]       = useState(false);
const [push, setPush]     = useState(true);

<Checkbox label="Notificaciones por email" color="primary" checked={email} onChange={setEmail} />
<Checkbox label="Alertas SMS"              color="primary" checked={sms}   onChange={setSms} />
<Checkbox label="Push notifications"       color="primary" checked={push}  onChange={setPush} />
```

## Integracion con Form / LiveForm

Cuando se proporciona `name`, el checkbox lee y escribe en `FormContext` automaticamente:

```tsx
<Form initialValues={{ terms: false, newsletter: false }} onSubmit={handleSubmit}>
  <Checkbox name="terms"      label="Acepto los terminos y condiciones" />
  <Checkbox name="newsletter" label="Suscribirme al boletin" color="success" />
  <Button type="submit">Enviar</Button>
</Form>
```

## CSS Custom Properties

El checkbox es configurable via CSS custom properties. Aplica overrides en una clase propia:

```css
.mi-checkbox-custom {
  --w3f-cb-size: 22px;
  --w3f-cb-border-radius: 50%;
  --w3f-cb-border-color: #a78bfa;
  --w3f-cb-checked-bg: #8b5cf6;
  --w3f-cb-checked-border-color: #7c3aed;
  --w3f-cb-check-color: #ffffff;
  --w3f-cb-hover-border-color: #7c3aed;
  --w3f-cb-hover-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
  --w3f-cb-focus-outline-color: #8b5cf6;
  --w3f-cb-focus-shadow: 0 0 0 4px rgba(139, 92, 246, 0.25);
  --w3f-cb-label-color: #4c1d95;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-cb-size` | `1.25rem` | Ancho y alto del cuadro |
| `--w3f-cb-border-color` | `outline` | Color del borde en reposo |
| `--w3f-cb-border-radius` | `radius-sm` | Radio de borde |
| `--w3f-cb-bg` | `surface` | Fondo del cuadro en reposo |
| `--w3f-cb-checked-bg` | `primary` | Fondo cuando esta marcado |
| `--w3f-cb-checked-border-color` | `primary` | Borde cuando esta marcado |
| `--w3f-cb-check-color` | `on-primary` | Color del simbolo check |
| `--w3f-cb-hover-border-color` | `primary` | Borde al hacer hover |
| `--w3f-cb-hover-shadow` | `0 0 0 3px rgba(…, 0.1)` | Sombra al hacer hover |
| `--w3f-cb-focus-outline-color` | `primary` | Color del outline de foco |
| `--w3f-cb-focus-shadow` | `0 0 0 4px rgba(…, 0.2)` | Sombra en estado focus |
| `--w3f-cb-label-color` | `on-surface` | Color del texto de la etiqueta |
| `--w3f-cb-label-font-size` | `text-base` | Tamano del texto |
| `--w3f-cb-gap` | `space-2` | Espacio entre cuadro y etiqueta |
| `--w3f-cb-transition` | `opacity fast` | Transicion general |
| `--w3f-cb-children-border-color` | `outline-variant` | Borde izquierdo del contenido anidado |
| `--w3f-cb-disabled-opacity` | `0.6` | Opacidad en estado disabled |
| `--w3f-cb-disabled-bg` | `gray-100` | Fondo en estado disabled |
| `--w3f-cb-disabled-border-color` | `gray-300` | Borde en estado disabled |
| `--w3f-cb-disabled-label-color` | `gray-500` | Color de label en estado disabled |
| `--w3f-cb-success-color` | `success` | Color de la variante success |
| `--w3f-cb-warning-color` | `warning` | Color de la variante warning |
| `--w3f-cb-danger-color` | `danger` | Color de la variante danger |

## Props

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `label` | `string` | — | Texto de la etiqueta visible |
| `name` | `string` | — | Nombre del campo para Form/LiveForm |
| `checked` | `boolean` | `false` | Estado marcado (controlado) |
| `onChange` | `(checked: boolean) => void` | — | Callback al cambiar estado |
| `onBlur` | `(e: FocusEvent) => void` | — | Callback al perder foco |
| `disabled` | `boolean` | `false` | Deshabilita la interaccion |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Variante de color al marcar |
| `value` | `string` | — | Valor del campo (para formularios) |
| `className` | `string` | `''` | Clases CSS adicionales |
| `ariaLabel` | `string` | — | Etiqueta accesible (aria-label) |
| `ariaDescribedBy` | `string` | — | ID del elemento descriptor (aria-describedby) |
| `children` | `ReactNode` | — | Contenido revelado al marcar |

## API

### Entrada de datos

El Checkbox acepta datos por tres vias:

| Via | Prop / Fuente | Tipo | Descripcion |
|---|---|---|---|
| Estado controlado | `checked` | `boolean` | Estado marcado gestionado por el padre. Si se pasa `checked`, el padre es responsable de actualizarlo via `onChange` |
| FormContext | `name` | `string` | Lee `FormContext.values[name]` como booleano (`Boolean(formContext.values[name])`). Tiene prioridad sobre `checked` cuando hay Form activo |
| Estado no controlado | — | — | Si ni `checked` ni FormContext estan activos, el Checkbox usa `useState` interno inicializado en `false` |
| Contenido anidado | `children` | `ReactNode` | Cualquier contenido React revelado condicionalmente cuando el checkbox esta marcado |

**Prioridad de resolucion del estado:**
```
FormContext.values[name] (como Boolean)  →  prop checked  →  useState interno (false)
```

**Sincronizacion:** cuando `checked` cambia externamente en modo no controlado (sin FormContext), el hook usa `useEffect` para sincronizar el estado interno.

### Salida de datos

| Evento | Firma | Cuando se dispara |
|---|---|---|
| `onChange` | `(checked: boolean) => void` | Cada vez que el usuario hace clic. Recibe el **nuevo valor booleano** directamente (no el evento nativo). Se ejecuta siempre, independientemente de si hay FormContext activo |
| `onBlur` | `(e: React.FocusEvent<HTMLInputElement>) => void` | Cuando el checkbox pierde el foco. Si hay FormContext activo, primero notifica a `formContext.handleBlur(e)` |

**Diferencia clave respecto a Input/Select:** `onChange` recibe un `boolean` puro, no un `ChangeEvent`. Esto simplifica el uso en modo controlado:

```tsx
// Input: onChange={(e) => setVal(e.target.value)}
// Checkbox: onChange={(checked) => setAccepted(checked)}
```

El flujo completo de `onChange` es:
1. El usuario hace clic → evento nativo del `<input type="checkbox">`
2. Si `disabled`: el handler retorna sin hacer nada
3. Si `isFormControlled`: se llama `formContext.handleChange(e)` con el evento nativo
4. Si no es FormControlled: se actualiza el `useState` interno
5. Si `onChange` esta definido: se llama siempre con el booleano nuevo

### Comunicacion con otros componentes

#### Con Form / LiveForm (bidireccional)

El Checkbox consume `FormContext` via `useContext(FormContext)` en el hook `useCheckbox`. La comunicacion es **bidireccional**:

```
Form.initialValues.terms = false
        ↓ (lectura)
Checkbox lee Boolean(FormContext.values["terms"]) como estado marcado
        ↓ (usuario hace clic)
Checkbox llama formContext.handleChange(e) con el evento nativo del <input>
        ↓ (propagacion)
Form actualiza values["terms"] = true en su estado
        ↓ (submit)
Form.onSubmit recibe { terms: true }
```

**Patron de deteccion:** `isFormControlled = !!(formContext && name)` — si `formContext` es `null` (fuera de Form) o `name` no esta definido, el Checkbox opera de forma independiente sin errores.

**Conversion de tipos:** FormContext almacena los valores como strings en algunos casos. Por eso el Checkbox aplica `Boolean(formContext.values[name])` para garantizar un booleano limpio.

#### Con children (contenido condicional)

El Checkbox actua como contenedor condicional para sus hijos. El contenido se renderiza exclusivamente cuando `checkboxValue === true`:

```tsx
// El <Input> solo aparece en el DOM cuando el checkbox esta marcado
<Checkbox label="Agregar nota" checked={hasNote} onChange={setHasNote}>
  <Input label="Nota adicional" name="nota" />
</Checkbox>
```

No hay comunicacion de datos entre el Checkbox y sus children — solo controla su visibilidad.

#### Independiente (sin contexto requerido)

El Checkbox no requiere ningun Provider ni Form. Tres modos de operacion:

```tsx
// 1. No controlado — estado interno
<Checkbox label="Recordarme" />

// 2. Controlado — el padre gestiona el estado
const [val, setVal] = useState(false);
<Checkbox label="Acepto" checked={val} onChange={setVal} />

// 3. Con Form — completamente gestionado por FormContext
<Form initialValues={{ acepto: false }}>
  <Checkbox name="acepto" label="Acepto los terminos" />
</Form>
```

### Accesibilidad

| Atributo | Valor | Condicion |
|---|---|---|
| `aria-checked` | `true \| false` | Siempre presente en el `<input type="checkbox">`, refleja el estado actual |
| `aria-label` | valor del prop `ariaLabel` | Cuando `ariaLabel` esta definido; util cuando no hay `label` visible |
| `aria-describedby` | valor del prop `ariaDescribedBy` | Cuando `ariaDescribedBy` esta definido; apunta a un elemento descriptor externo |
| `id` / `htmlFor` | par unico via `useId()` | El `<input>` y su `<label>` siempre estan vinculados con un ID generado automaticamente |
| `disabled` | nativo | Propagado directamente al `<input>` HTML; el handler de `onChange` tambien hace guard con `if (disabled) return` |
| `type` | `"checkbox"` | Siempre `checkbox` — no es configurable |

### Patron de uso recomendado

```tsx
// 1. Simple no controlado
<Checkbox label="Recordarme en este dispositivo" />

// 2. Controlado con estado local
const [accepted, setAccepted] = useState(false);

<Checkbox
  label="Acepto los terminos y condiciones"
  checked={accepted}
  onChange={setAccepted}
  color="primary"
/>
<Button disabled={!accepted}>Continuar</Button>

// 3. Con contenido anidado revelado al marcar
const [wantsNewsletter, setWantsNewsletter] = useState(false);

<Checkbox
  label="Quiero recibir el boletin"
  checked={wantsNewsletter}
  onChange={setWantsNewsletter}
  color="success"
>
  <Select label="Frecuencia" options={FRECUENCIAS} name="frecuencia" />
</Checkbox>

// 4. Grupo de checkboxes independientes
const [permisos, setPermisos] = useState({ leer: true, escribir: false, admin: false });

const toggle = (key: string) => setPermisos(p => ({ ...p, [key]: !p[key] }));

<Checkbox label="Leer"    checked={permisos.leer}    onChange={() => toggle('leer')} />
<Checkbox label="Escribir" checked={permisos.escribir} onChange={() => toggle('escribir')} />
<Checkbox label="Admin"   checked={permisos.admin}   onChange={() => toggle('admin')} color="danger" />

// 5. Integrado en Form — estado gestionado automaticamente
<Form
  initialValues={{ terms: false, newsletter: false }}
  onSubmit={(values) => {
    if (!values.terms) return alert('Debes aceptar los terminos');
    registrar(values);
  }}
>
  <Checkbox name="terms"      label="Acepto los terminos y condiciones" />
  <Checkbox name="newsletter" label="Suscribirme al boletin" color="success" />
  <Button type="submit">Registrarse</Button>
</Form>
```

## Estructura de archivos

```
Checkbox/
  Checkbox.tsx            Componente principal
  Checkbox.types.ts       Interfaces TypeScript (CheckboxProps, CheckboxColor)
  Checkbox.constants.ts   Clases CSS BEM y defaults
  Checkbox.utils.ts       buildCheckboxInputClasses(), buildCheckboxContainerClasses(), buildCheckboxWrapperClasses()
  Checkbox.hooks.ts       useCheckbox (integracion FormContext)
  README.md               Esta documentacion
```

CSS: `src/w3fussion/INPUTS/_checkbox.css`
