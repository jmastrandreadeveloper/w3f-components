Cambios implementados:
🔄 Integración con Context API

Importa useFormContext desde Form.jsx
Detecta automáticamente si está dentro de un Form o LiveForm
Funciona de forma independiente si no hay contexto

🎯 Comportamiento adaptativo

Modo Form/LiveForm (cuando tiene name y está en contexto):

El valor viene de formContext.values[name]
Los cambios se manejan con formContext.handleChange
Soporte para handleBlur del contexto


Modo independiente (sin contexto):

Mantiene su estado local con useState
Funciona exactamente como antes



✅ Ejemplos de uso
jsx// Uso independiente (como antes)
<Checkbox 
  label="Acepto términos" 
  checked={accepted} 
  onChange={setAccepted} 
/>

// Con Form
<Form initialValues={{ newsletter: true, terms: false }}>
  <Checkbox name="newsletter" label="Suscribirse al newsletter" />
  <Checkbox name="terms" label="Acepto términos y condiciones">
    <p className="w3f-text-sm w3f-text-muted">
      Al marcar esta casilla aceptas nuestras políticas.
    </p>
  </Checkbox>
</Form>

// Con LiveForm
<LiveForm 
  initialValues={{ filter: false }}
  onValuesChange={(values) => console.log(values)}
>
  <Checkbox name="filter" label="Mostrar solo activos" />
</LiveForm>
El componente ahora sigue exactamente el mismo patrón que Input.jsx, garantizando consistencia en todo tu framework W3F. 🚀