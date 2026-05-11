// App.js
import React from 'react';
import CustomSelect from './CustomSelect';
import { useState } from 'react';


const CustomSelectDemo_2 = () => {
  const [selectedCity, setSelectedCity] = useState(''); // Estado para la ciudad seleccionada

  const cityOptions = [
    { value: 'new-york', label: 'Nueva York' },
    { value: 'london', label: 'Londres' },
    { value: null, label: 'No aplica' }, // Opción con valor null
    { value: undefined, label: 'Sin especificar' }, // Opción con valor undefined
  ];

  const handleCityChange = (event) => {
    // Aquí puedes manejar la conversión de '' a null si es necesario
    const value = event.target.value === '' ? null : event.target.value;
    setSelectedCity(value);
  };

  return (
    <div className="w3-container w3-padding w3-light-grey">
      <h2>Ejemplo con Opciones Nullables</h2>

      <CustomSelect
        label="Elige una ciudad"
        options={cityOptions}
        value={selectedCity}
        onChange={handleCityChange}
      />

      <p className="w3-text-grey w3-margin-top">
        Valor seleccionado: <span className="w3-tag w3-teal w3-round">{String(selectedCity)}</span>
      </p>
    </div>
  );
};

export default CustomSelectDemo_2;