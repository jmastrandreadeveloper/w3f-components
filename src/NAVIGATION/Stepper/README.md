# Stepper

Indicador de progreso de pasos para flujos multi-etapa. Compound component con cinco sub-componentes: `Stepper`, `Step`, `StepLabel`, `StepContent` y `StepConnector`. Soporta orientacion horizontal/vertical, labels alternativos, modo no-lineal, iconos personalizados y estado de error.

## Importacion

```tsx
import Stepper, { Step, StepLabel, StepContent, StepConnector } from '@/components/NAVIGATION/Stepper/Stepper';
```

## Uso basico (horizontal)

```tsx
const [activeStep, setActiveStep] = useState(0);
const steps = ['Datos personales', 'Direccion', 'Confirmacion'];

<Stepper activeStep={activeStep}>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>

<Button onClick={() => setActiveStep(s => s + 1)}>Siguiente</Button>
<Button onClick={() => setActiveStep(s => s - 1)}>Atras</Button>
```

## Vertical con contenido expandible

```tsx
<Stepper activeStep={activeStep} orientation="vertical">
  {steps.map((step, i) => (
    <Step key={step.label}>
      <StepLabel>{step.label}</StepLabel>
      <StepContent>
        <p>{step.description}</p>
        <Button onClick={() => setActiveStep(s => s + 1)}>Continuar</Button>
        <Button onClick={() => setActiveStep(s => Math.max(0, s - 1))}>Atras</Button>
      </StepContent>
    </Step>
  ))}
</Stepper>
```

## Labels alternativos (debajo del icono)

```tsx
<Stepper activeStep={2} alternativeLabel>
  <Step><StepLabel>Seleccion</StepLabel></Step>
  <Step><StepLabel>Informacion</StepLabel></Step>
  <Step><StepLabel>Pago</StepLabel></Step>
  <Step><StepLabel>Completado</StepLabel></Step>
</Stepper>
```

## Label con subetiqueta opcional

```tsx
<StepLabel optional={<span style={{ fontSize: '0.75rem' }}>Opcional</span>}>
  Informacion adicional
</StepLabel>
```

## Estado de error

```tsx
<Step>
  <StepLabel error optional={<span style={{ color: 'red' }}>Pago fallido</span>}>
    Pago
  </StepLabel>
</Step>
```

## Iconos personalizados

```tsx
import { User, CreditCard, Package, Check } from 'lucide-react';

<Stepper activeStep={2} alternativeLabel>
  <Step completed><StepLabel icon={<User size={16} />}>Cuenta</StepLabel></Step>
  <Step completed><StepLabel icon={<CreditCard size={16} />}>Pago</StepLabel></Step>
  <Step><StepLabel icon={<Package size={16} />}>Envio</StepLabel></Step>
  <Step><StepLabel icon={<Check size={16} />}>Listo</StepLabel></Step>
</Stepper>
```

## Modo no-lineal

Permite navegar a cualquier paso haciendo clic en su etiqueta:

```tsx
<Stepper activeStep={activeStep} nonLinear>
  {steps.map((label, i) => (
    <Step key={label} completed={completedSteps.has(i)}>
      <StepLabel onClick={(_e, idx) => setActiveStep(i)}>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
```

## Colores

```tsx
<Stepper activeStep={1} color="primary">...</Stepper>    {/* default */}
<Stepper activeStep={1} color="secondary">...</Stepper>
<Stepper activeStep={1} color="success">...</Stepper>
<Stepper activeStep={1} color="warning">...</Stepper>
<Stepper activeStep={1} color="danger">...</Stepper>
```

## Conector personalizado

```tsx
<Stepper activeStep={1} connector={<StepConnector className="mi-connector" />}>
  ...
</Stepper>

{/* Sin conector */}
<Stepper activeStep={1} connector={null}>...</Stepper>
```

## CSS Custom Properties

```css
.mi-stepper-custom {
  --w3f-step-icon-active-bg: #10b981;
  --w3f-step-icon-completed-bg: #10b981;
  --w3f-step-connector-completed-color: #10b981;
  --w3f-step-icon-size: 36px;
}
```

### Variables disponibles

| Variable | Default | Descripcion |
|---|---|---|
| `--w3f-step-connector-color` | `gray-300` | Color del conector inactivo |
| `--w3f-step-connector-completed-color` | `primary` | Color del conector completado |
| `--w3f-step-icon-bg` | `gray-300` | Fondo del icono inactivo |
| `--w3f-step-icon-color` | `gray-600` | Color del numero/icono inactivo |
| `--w3f-step-icon-active-bg` | `primary` | Fondo del icono activo |
| `--w3f-step-icon-completed-bg` | `primary` | Fondo del icono completado |
| `--w3f-step-icon-active-color` | `on-primary` | Color del icono activo |
| `--w3f-step-icon-completed-color` | `on-primary` | Color del icono completado |
| `--w3f-step-icon-size` | `32px` | Tamano del circulo del icono |
| `--w3f-step-title-color` | `on-surface` | Color del texto del label |
| `--w3f-step-optional-color` | `gray-500` | Color del texto opcional |
| `--w3f-step-hover-bg` | `gray-100` | Fondo hover (modo no-lineal) |
| `--w3f-step-transition` | `transition-fast` | Transicion de animaciones |
| `--w3f-step-focus-color` | `primary` | Color del anillo de foco |
| `--w3f-step-disabled-opacity` | `0.5` | Opacidad del paso deshabilitado |
| `--w3f-step-error-color` | `danger` | Color del estado de error |

## Props

### Stepper

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `activeStep` | `number` | `0` | Indice del paso activo |
| `children` | `ReactNode` | — | `Step` elements |
| `orientation` | `StepperOrientation` | `'horizontal'` | Distribucion del stepper |
| `alternativeLabel` | `boolean` | `false` | Labels centrados debajo del icono |
| `nonLinear` | `boolean` | `false` | Permite navegar a cualquier paso |
| `connector` | `ReactElement \| null` | `<StepConnector />` | Elemento conector entre pasos |
| `color` | `StepperColor` | `'primary'` | Color del icono activo/completado |
| `className` | `string` | `''` | Clases CSS adicionales |

### Step

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `active` | `boolean` | auto por `activeStep` | Fuerza el estado activo |
| `completed` | `boolean` | auto por `activeStep` | Fuerza el estado completado |
| `disabled` | `boolean` | auto por `activeStep` | Fuerza el estado deshabilitado |
| `index` | `number` | inyectado | Posicion en el stepper (inyectado) |
| `children` | `ReactNode` | — | `StepLabel` y opcionalmente `StepContent` |
| `className` | `string` | `''` | Clases CSS adicionales |

### StepLabel

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Texto del label |
| `optional` | `ReactNode` | — | Subetiqueta secundaria |
| `icon` | `ReactNode` | — | Icono personalizado (reemplaza numero) |
| `error` | `boolean` | `false` | Estado de error en este paso |
| `StepIconComponent` | `ComponentType` | — | Componente personalizado de icono completo |
| `onClick` | `(e, index) => void` | — | Navegacion en modo no-lineal |
| `className` | `string` | `''` | Clases CSS adicionales |

### StepContent

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `children` | `ReactNode` | — | Contenido expandible del paso |
| `transitionDuration` | `number` | `300` | Duracion de la animacion en ms |
| `className` | `string` | `''` | Clases CSS adicionales |

### StepConnector

| Prop | Tipo | Default | Descripcion |
|---|---|---|---|
| `className` | `string` | `''` | Clases CSS adicionales |

## API

#### Entrada de datos

| Via | Prop | Tipo | Descripcion |
|---|---|---|---|
| Paso activo | `activeStep` | `number` | Controlado siempre desde el padre |
| Estados manuales | `active`, `completed`, `disabled` en `Step` | `boolean` | Sobreescriben el calculo automatico |

#### Salida de datos

| Evento | Componente | Firma | Descripcion |
|---|---|---|---|
| `onClick` | `StepLabel` | `(e: SyntheticEvent, index: number) => void` | Click en modo no-lineal |

No hay callback en `Stepper` directamente — el flujo lo gestiona el padre actualizando `activeStep`.

#### Comunicacion con otros componentes

El `Stepper` usa `React.cloneElement` para inyectar estado calculado en cada `Step`, y `Step` a su vez lo inyecta en `StepLabel` y `StepContent`:

```
Stepper (activeStep=2)
  ├── cloneElement(Step[0], { active: false, completed: true, disabled: false, index: 0, ... })
  ├── cloneElement(StepConnector, { _active, _completed, _alternativeLabel, ... })
  ├── cloneElement(Step[1], { active: false, completed: true, ... })
  ├── cloneElement(StepConnector, ...)
  └── cloneElement(Step[2], { active: true, completed: false, disabled: false, ... })
        ↓
      Step[2] → cloneElement(StepLabel, { _active: true, _completed: false, ... })
             → cloneElement(StepContent, { _active: true, _last: false })
```

Las props con prefijo `_` son internas al sistema de inyeccion — no deben pasarse manualmente.

`StepContent` anima su altura usando `useStepContentAnimation` que mide el `scrollHeight` del contenido y hace una transicion CSS de `max-height: 0 → scrollHeight`.

#### Accesibilidad

| Atributo | Elemento | Condicion | Descripcion |
|---|---|---|---|
| `role` | `StepLabel div` | `nonLinear` o `onClick` | `"button"` para navegacion |
| `tabIndex` | `StepLabel div` | clickable | `0` para navegacion por teclado |
| `onKeyDown` | `StepLabel div` | clickable | Enter/Space activa el click |

#### Patron de uso recomendado

```tsx
// 1. Wizard de checkout (horizontal)
const [step, setStep] = useState(0);
const steps = ['Carrito', 'Envio', 'Pago', 'Confirmacion'];

<Stepper activeStep={step} alternativeLabel color="primary">
  {steps.map((label, i) => (
    <Step key={label} completed={i < step}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
<div>
  {step === 0 && <CartStep />}
  {step === 1 && <ShippingStep />}
  {step === 2 && <PaymentStep />}
</div>
<Button onClick={() => setStep(s => s + 1)} disabled={step >= steps.length - 1}>Siguiente</Button>
<Button onClick={() => setStep(s => s - 1)} disabled={step === 0}>Atras</Button>

// 2. Configuracion vertical con contenido
<Stepper activeStep={step} orientation="vertical">
  <Step>
    <StepLabel>Configuracion basica</StepLabel>
    <StepContent>
      <Form initialValues={config} onSubmit={handleNext}>
        <Input name="appName" label="Nombre" />
        <Button type="submit">Continuar</Button>
      </Form>
    </StepContent>
  </Step>
  <Step>
    <StepLabel>Permisos</StepLabel>
    <StepContent>...</StepContent>
  </Step>
</Stepper>
```

## Estructura de archivos

```
Stepper/
  Stepper.tsx          Componente principal + Step + StepLabel + StepContent + StepConnector
  Stepper.types.ts     Interfaces TypeScript
  Stepper.constants.ts Clases CSS y defaults
  Stepper.utils.ts     buildStepperClasses(), buildStepClasses(), buildConnectorClasses(), etc.
  Stepper.hooks.ts     useStepContentAnimation
  README.md            Esta documentacion
```

CSS: `src/w3fussion/NAVIGATION/_stepper.css`
