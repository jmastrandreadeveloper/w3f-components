// App.js
import React from 'react';
import CustomSelect from './CustomSelect';
import { useState } from 'react';


const CustomSelectDemo_1 = () => {
  const [selectedFruit, setSelectedFruit] = useState('banana');
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  const fruitOptions = [
    { value: 'apple', label: 'Manzana' },
    { value: 'banana', label: 'Banana', disabled: true }, // Esta opción estará deshabilitada
    { value: 'orange', label: 'Naranja' },
    { value: 'grape', label: 'Uva' },
  ];

  const handleFruitChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  const toggleSelectDisabled = () => {
    setIsSelectDisabled(!isSelectDisabled);
  };

  return (
    <div className="w3-container w3-padding w3-light-grey">
      <h2>Ejemplo con opciones y select deshabilitados</h2>

      <CustomSelect
        label="Elige tu fruta favorita"
        options={fruitOptions}
        value={selectedFruit}
        onChange={handleFruitChange}
        disabled={isSelectDisabled} // Controla si el select completo está deshabilitado
      />

      <p className="w3-text-grey w3-margin-top">
        Fruta seleccionada: <span className="w3-tag w3-green w3-round">{selectedFruit}</span>
      </p>

      <button
        className="w3-button w3-blue w3-round w3-margin-right"
        onClick={toggleSelectDisabled}
      >
        {isSelectDisabled ? 'Habilitar Select' : 'Deshabilitar Select'}
      </button>

      <p className="w3-small w3-text-dark-grey w3-margin-top">
        *La opción de 'Banana' está permanentemente deshabilitada.
      </p>
    </div>
  );
};

export default CustomSelectDemo_1;