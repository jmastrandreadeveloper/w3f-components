¡Perfecto! He integrado el Context API en el componente ToggleButtonGroup, que es quien gestiona la lógica de selección. El ToggleButton permanece sin cambios ya que funciona como un componente "tonto" que solo recibe props.
🎯 Características agregadas al ToggleButtonGroup:

Integración con useFormContext: Detecta automáticamente si está dentro de un Form o LiveForm
Prop name: Requerida para la integración con formularios
Gestión automática de valores:

Modo exclusivo: maneja un valor único (string/number)
Modo múltiple: maneja un array de valores
Se adapta automáticamente al contexto del formulario


Manejo de errores y validación:

Soporta formContext.errors[name]
Muestra mensajes de error con estilos W3F
Estados visuales para errores


Props de formulario estándar:

label para etiqueta del grupo
required con indicador visual
disabled que se propaga a todos los botones
helperText para mensajes de ayuda


Hidden input: Para compatibilidad con envío de formularios tradicionales

💡 Ejemplos de uso:
jsx// 1. Uso independiente - modo exclusivo (radio)
<ToggleButtonGroup 
  value="center" 
  onChange={(e, val) => setAlignment(val)}
  exclusive
>
  <ToggleButton value="left">
    <AlignLeft />
  </ToggleButton>
  <ToggleButton value="center">
    <AlignCenter />
  </ToggleButton>
  <ToggleButton value="right">
    <AlignRight />
  </ToggleButton>
</ToggleButtonGroup>

// 2. Uso independiente - modo múltiple (checkbox)
<ToggleButtonGroup 
  value={['bold', 'italic']} 
  onChange={(e, val) => setFormat(val)}
>
  <ToggleButton value="bold">B</ToggleButton>
  <ToggleButton value="italic">I</ToggleButton>
  <ToggleButton value="underline">U</ToggleButton>
</ToggleButtonGroup>

// 3. Dentro de un Form - modo exclusivo
<Form 
  initialValues={{ alignment: 'left' }}
  onSubmit={(values) => console.log(values)}
>
  <ToggleButtonGroup 
    name="alignment" 
    label="Alineación del texto"
    exclusive
    required
    helperText="Selecciona la alineación deseada"
  >
    <ToggleButton value="left">Izquierda</ToggleButton>
    <ToggleButton value="center">Centro</ToggleButton>
    <ToggleButton value="right">Derecha</ToggleButton>
    <ToggleButton value="justify">Justificado</ToggleButton>
  </ToggleButtonGroup>
</Form>

// 4. Dentro de un LiveForm - modo múltiple con actualización en tiempo real
<LiveForm 
  initialValues={{ textFormat: [] }}
  onValuesChange={(values) => {
    // Aplicar formato en tiempo real
    applyTextFormat(values.textFormat);
  }}
>
  <ToggleButtonGroup 
    name="textFormat" 
    label="Formato de texto"
    color="primary"
    size="md"
  >
    <ToggleButton value="bold">
      <Bold /> Negrita
    </ToggleButton>
    <ToggleButton value="italic">
      <Italic /> Cursiva
    </ToggleButton>
    <ToggleButton value="underline">
      <Underline /> Subrayado
    </ToggleButton>
  </ToggleButtonGroup>
</LiveForm>

// 5. Con validación de errores
<Form 
  initialValues={{ view: null }}
  onSubmit={(values, { setErrors }) => {
    if (!values.view) {
      setErrors({ view: 'Debes seleccionar una vista' });
    }
  }}
>
  <ToggleButtonGroup 
    name="view" 
    label="Selecciona la vista"
    exclusive
    required
  >
    <ToggleButton value="grid">
      <Grid /> Cuadrícula
    </ToggleButton>
    <ToggleButton value="list">
      <List /> Lista
    </ToggleButton>
    <ToggleButton value="kanban">
      <Columns /> Kanban
    </ToggleButton>
  </ToggleButtonGroup>
  
  <button type="submit">Guardar</button>
</Form>

// 6. Orientación vertical con colores personalizados
<LiveForm initialValues={{ priority: 'medium' }}>
  <ToggleButtonGroup 
    name="priority"
    label="Prioridad"
    exclusive
    orientation="vertical"
    fullWidth
  >
    <ToggleButton value="high" color="danger">
      Alta
    </ToggleButton>
    <ToggleButton value="medium" color="warning">
      Media
    </ToggleButton>
    <ToggleButton value="low" color="success">
      Baja
    </ToggleButton>
  </ToggleButtonGroup>
</LiveForm>
Los componentes mantienen toda su funcionalidad original (modos exclusivo/múltiple, orientación, tamaños, colores) y ahora están completamente integrados con tu sistema de formularios W3F! 🎨