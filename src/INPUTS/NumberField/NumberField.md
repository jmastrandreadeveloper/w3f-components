🔄 Cambios principales:
1. Integración con Context API

Importa useFormContext desde Form.jsx
Detecta automáticamente si está dentro de un Form o LiveForm
Obtiene valores y errores desde el contexto cuando está disponible

2. Función notifyChange unificada

Centraliza la lógica de notificación de cambios
Crea eventos sintéticos para el contexto cuando es necesario
Mantiene compatibilidad con el callback onChange del usuario

3. Manejo de valores desde contexto
javascriptconst fieldValue = isFormControlled ? (formContext.values[name] ?? '') : value;
const fieldError = isFormControlled ? formContext.errors[name] : error;
4. Soporte para handleBlur

Notifica al contexto cuando se pierde el foco
Mantiene la funcionalidad de formato y validación

✅ Ejemplos de uso:
jsx// Uso independiente (como antes)
<NumberField 
  label="Cantidad" 
  value={count} 
  onChange={setCount} 
  min={0} 
  max={100} 
/>

// Con Form
<Form initialValues={{ quantity: 1, price: 99.99, discount: 0 }}>
  <NumberField 
    name="quantity" 
    label="Cantidad" 
    min={1} 
    max={999} 
  />
  <NumberField 
    name="price" 
    label="Precio" 
    precision={2} 
    step={0.01}
    leadingIcon={<span>$</span>}
  />
  <NumberField 
    name="discount" 
    label="Descuento %" 
    min={0} 
    max={100} 
  />
</Form>

// Con LiveForm para búsqueda en tiempo real
<LiveForm 
  initialValues={{ minPrice: 0, maxPrice: 1000 }}
  onValuesChange={(values) => filterProducts(values)}
>
  <NumberField name="minPrice" label="Precio mínimo" precision={2} />
  <NumberField name="maxPrice" label="Precio máximo" precision={2} />
</LiveForm>
El componente ahora es totalmente compatible con tu framework W3F, manteniendo la misma arquitectura que Input y Checkbox. 🎯