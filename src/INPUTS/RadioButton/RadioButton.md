🔄 Cambios implementados:
1. Integración con Form/LiveForm Context API

Importa useFormContext desde Form.jsx
Detecta automáticamente si está dentro de un Form o LiveForm
Soporta tres modos: Form controlado, prop controlada, y no controlado

2. Manejo de valores desde contexto
javascriptconst selectedValue = isFormControlled 
  ? (formContext.values[name] ?? defaultValue)
  : (controlledValue !== undefined ? controlledValue : internalValue);
3. Soporte para errores

Muestra errores desde el contexto de Form o desde prop error
Oculta el panel de selección cuando hay error
Atributo aria-invalid para accesibilidad

4. Eventos sintéticos para contexto

Crea eventos compatibles con handleChange y handleBlur del Form
Mantiene compatibilidad con onChange del usuario

5. Mejoras de accesibilidad

aria-required en el grupo
aria-invalid cuando hay error
Mensaje de error con role="alert"

✅ Ejemplos de uso:
jsx// Uso independiente (no controlado)
<RadioGroup 
  label="Selecciona tu plan" 
  defaultValue="basic"
  onChange={(value) => console.log(value)}
>
  <RadioButton label="Básico" value="basic" />
  <RadioButton label="Pro" value="pro" />
  <RadioButton label="Enterprise" value="enterprise" />
</RadioGroup>

// Uso independiente (controlado)
const [plan, setPlan] = useState('basic');
<RadioGroup 
  label="Selecciona tu plan" 
  value={plan}
  onChange={setPlan}
  direction="horizontal"
>
  <RadioButton label="Básico" value="basic" />
  <RadioButton label="Pro" value="pro" />
</RadioGroup>

// Con Form
<Form 
  initialValues={{ plan: 'basic', payment: 'monthly', notifications: 'email' }}
  onSubmit={(values) => console.log(values)}
>
  <RadioGroup name="plan" label="Selecciona tu plan" required>
    <RadioButton label="Básico - $9/mes" value="basic" />
    <RadioButton label="Pro - $29/mes" value="pro" />
    <RadioButton label="Enterprise - $99/mes" value="enterprise" />
  </RadioGroup>

  <RadioGroup 
    name="payment" 
    label="Frecuencia de pago" 
    direction="horizontal"
  >
    <RadioButton label="Mensual" value="monthly" />
    <RadioButton label="Anual (20% off)" value="yearly" />
  </RadioGroup>

  <RadioGroup name="notifications" label="Notificaciones">
    <RadioButton label="Email" value="email" />
    <RadioButton label="SMS" value="sms" />
    <RadioButton label="Push" value="push" />
    <RadioButton label="Ninguna" value="none" />
  </RadioGroup>

  <button type="submit">Continuar</button>
</Form>

// Con LiveForm para cambios en tiempo real
<LiveForm 
  initialValues={{ theme: 'light', language: 'es' }}
  onValuesChange={(values) => applySettings(values)}
>
  <RadioGroup name="theme" label="Tema" direction="horizontal">
    <RadioButton label="Claro" value="light" />
    <RadioButton label="Oscuro" value="dark" />
    <RadioButton label="Auto" value="auto" />
  </RadioGroup>

  <RadioGroup name="language" label="Idioma">
    <RadioButton label="Español" value="es" />
    <RadioButton label="English" value="en" />
    <RadioButton label="Português" value="pt" />
  </RadioGroup>
</LiveForm>

// Con validación de errores
<Form 
  initialValues={{ plan: '' }}
  onSubmit={(values, { setErrors }) => {
    if (!values.plan) {
      setErrors({ plan: 'Debes seleccionar un plan' });
      return;
    }
    console.log('Enviando:', values);
  }}
>
  <RadioGroup name="plan" label="Selecciona tu plan" required>
    <RadioButton label="Básico" value="basic" />
    <RadioButton label="Pro" value="pro" />
  </RadioGroup>
  <button type="submit">Continuar</button>
</Form>
El componente RadioGroup ahora está completamente integrado con tu framework W3F, manteniendo consistencia con todos los demás componentes de formulario. 🎯