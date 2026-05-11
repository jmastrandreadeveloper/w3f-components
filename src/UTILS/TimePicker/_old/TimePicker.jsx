import React, { useState } from 'react';

// Componente TimePicker simple en React con W3.CSS
const W3CSSTimePicker = ({ label, initialTime = '' }) => {
  // Estado para el valor de la hora
  const [time, setTime] = useState(initialTime);

  // Manejador de cambio para actualizar el estado
  const handleChange = (event) => {
    setTime(event.target.value);
    // Aquí puedes añadir lógica adicional si necesitas notificar a un componente padre
    // por ejemplo: if (onChange) onChange(event.target.value);
  };

  // El estilo se simula con las clases de W3.CSS, como w3-input y w3-border.
  // El 'input type="time"' proporciona la funcionalidad de selección de hora del navegador.
  return (
    <div className="w3-container w3-padding-small">
      {/* Etiqueta flotante o simple usando w3-label */}
      <label className="w3-label w3-text-teal">
        <b>{label || 'Selecciona una hora'}</b>
      </label>

      {/* Input de tipo time con estilos de W3.CSS */}
      <input
        className="w3-input w3-border w3-round-large w3-light-grey"
        type="time"
        value={time}
        onChange={handleChange}
        style={{ width: '100%' }} // Asegura que ocupe todo el ancho del contenedor
      />

      {/* Pequeño texto de ayuda o validación (opcional) */}
      <p className="w3-text-grey w3-small">Formato HH:MM (24 horas).</p>
    </div>
  );
};

// Ejemplo de uso
const TimePicker = () => {
  // Asegúrate de enlazar la hoja de estilos de W3.CSS en tu index.html o componente raíz:
  // <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  
  return (
    <div className="w3-card-4 w3-margin" style={{ maxWidth: '400px' }}>
      <header className="w3-container w3-teal">
        <h2>Time Picker Estilo Material (W3.CSS)</h2>
      </header>
      
      <W3CSSTimePicker 
        label="Hora de la Cita" 
        initialTime="14:30" 
      />
      
      <W3CSSTimePicker 
        label="Hora de Inicio" 
        initialTime="" 
      />
      
      {/* Se pueden añadir más elementos de W3.CSS para simular la tarjeta de Material */}
      <footer className="w3-container w3-light-grey w3-padding">
        <button className="w3-btn w3-teal w3-round-large">Confirmar</button>
      </footer>
    </div>
  );
};

export default TimePicker;