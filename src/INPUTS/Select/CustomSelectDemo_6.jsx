// App.js
import React from 'react';
import CustomSelect from './CustomSelect';
import { useState } from 'react';


const CustomSelectDemo_6 = () => {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const fruitOptions = [
    { value: 'apple', label: 'Manzana' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Naranja' },
  ];

  const handleFruitChange = (event) => {
    setSelectedFruit(event.target.value);
  };
  
  const handleBlur = () => {
    setIsTouched(true);
  };

  // Lógica similar a ErrorStateMatcher: el error se muestra si el campo es inválido y "tocado"
  const isFruitInvalid = isTouched && selectedFruit === '';

  return (
    <div className="w3-container w3-padding-64 w3-light-grey">
      <h2 className="w3-text-grey w3-xxlarge">Select con validación</h2>

      <div style={{ maxWidth: '400px' }}>
        <form>
          <CustomSelect
            label="Elige tu fruta favorita"
            options={fruitOptions}
            value={selectedFruit}
            onChange={handleFruitChange}
            onBlur={handleBlur} // Nuevo evento para detectar la interacción del usuario
            isInvalid={isFruitInvalid} // Le pasamos el estado de error al componente
            errorMessage="Debes seleccionar una fruta." // Le pasamos el mensaje de error
          />
        </form>
      </div>

      <div className="w3-panel w3-blue w3-round-large w3-margin-top">
        <p className="w3-small w3-text-white">
          <strong className="w3-large">Valor seleccionado:</strong>
          <span className="w3-tag w3-teal w3-round-large w3-margin-left">
            {selectedFruit || 'Ninguno'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomSelectDemo_6;