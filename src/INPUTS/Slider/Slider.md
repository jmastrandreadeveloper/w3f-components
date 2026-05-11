🔄 Cambios implementados:
1. Integración con Context API

Importa useFormContext desde Form.jsx
Detecta automáticamente si está dentro de un Form o LiveForm
Funciona tanto controlado como no controlado

2. Soporte para value controlado

Antes solo usaba defaultValue
Ahora soporta tanto value (controlado) como defaultValue (no controlado)

3. Mejoras de accesibilidad

Añadido id único con useId()
Atributos ARIA: aria-label, aria-valuemin, aria-valuemax, aria-valuenow
Label asociado correctamente con htmlFor

4. Prop name requerida para contexto

Necesaria para integración con Form/LiveForm
Opcional para uso independiente

✅ Ejemplos de uso:
jsx// Uso independiente (no controlado)
<Slider 
  label="Volumen" 
  defaultValue={50}
  onChange={(val) => console.log(val)} 
  min={0} 
  max={100} 
/>

// Uso independiente (controlado)
const [volume, setVolume] = useState(50);
<Slider 
  label="Volumen" 
  value={volume}
  onChange={setVolume} 
  min={0} 
  max={100} 
/>

// Con Form
<Form 
  initialValues={{ brightness: 50, contrast: 75, saturation: 100 }}
  onSubmit={(values) => console.log(values)}
>
  <Slider name="brightness" label="Brillo" min={0} max={100} />
  <Slider name="contrast" label="Contraste" min={0} max={100} />
  <Slider name="saturation" label="Saturación" min={0} max={200} />
  <button type="submit">Aplicar</button>
</Form>

// Con LiveForm para cambios en tiempo real
<LiveForm 
  initialValues={{ temperature: 20, humidity: 50 }}
  onValuesChange={(values) => updateSettings(values)}
>
  <Slider 
    name="temperature" 
    label="Temperatura (°C)" 
    min={10} 
    max={30} 
    step={0.5}
  />
  <Slider 
    name="humidity" 
    label="Humedad (%)" 
    min={0} 
    max={100} 
  />
</LiveForm>

// Con paso decimal para mayor precisión
<Slider 
  name="opacity" 
  label="Opacidad" 
  min={0} 
  max={1} 
  step={0.1} 
  defaultValue={1}
/>
El componente Slider ahora está completamente integrado con tu framework W3F, siguiendo el mismo patrón que Input, Checkbox y NumberField. 🎚️