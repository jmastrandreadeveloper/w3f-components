Características agregadas:

Integración con useFormContext: Detecta automáticamente si está dentro de un Form o LiveForm
Prop name: Requerida para la integración con formularios (igual que en Input)
Gestión automática de valores:

Si está en un formulario, usa formContext.values[name]
Si está independiente, usa el prop checked


Manejo de errores:

Soporta formContext.errors[name] desde el formulario
O el prop error cuando está independiente


Mensajes de ayuda: Añadí soporte para helperText y mensajes de error visuales
Handler unificado: handleToggleChange que actualiza tanto el contexto del formulario como el callback onChange

💡 Ejemplos de uso:
jsx// Uso independiente (como antes)
<SlideToggle 
  checked={isActive}
  onChange={setIsActive}
  label="Activar notificaciones"
/>

// Dentro de un Form
<Form initialValues={{ notifications: false }}>
  <SlideToggle name="notifications" label="Notificaciones" />
</Form>

// Dentro de un LiveForm (cambios en tiempo real)
<LiveForm 
  initialValues={{ darkMode: true }}
  onValuesChange={(values) => applyTheme(values.darkMode)}
>
  <SlideToggle name="darkMode" label="Modo oscuro" />
</LiveForm>
El componente mantiene toda su funcionalidad original (arrastre, touch, teclado) y ahora es completamente compatible con tu sistema de formularios W3F! 🚀