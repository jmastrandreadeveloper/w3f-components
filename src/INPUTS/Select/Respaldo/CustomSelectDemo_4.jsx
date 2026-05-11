// App.js
import React from 'react';
import CustomSelect from './CustomSelect';
import { useState } from 'react';


const CustomSelectDemo_4 = () => {
  const [selectedCities, setSelectedCities] = useState(['london']);

  const cityOptions = [
    { value: 'new-york', label: 'Nueva York' },
    { value: 'london', label: 'Londres' },
    { value: 'paris', label: 'París' },
    { value: 'tokyo', label: 'Tokio' },
    { value: 'barcelona', label: 'Barcelona' },
  ];

  const handleCityChange = (newValues) => {
    setSelectedCities(newValues);
  };

  return (
    <div className="w3-container w3-padding w3-light-grey">
      <h2>Ejemplo con Selección Múltiple</h2>
      <p className="w3-small w3-text-dark-grey">
        *Mantén presionada la tecla Ctrl (o Cmd) para seleccionar múltiples opciones.
      </p>
      
      <CustomSelect
        label="Elige tus ciudades favoritas"
        options={cityOptions}
        value={selectedCities}
        onChange={handleCityChange}
        multiple={true} // 2. Habilita la selección múltiple
      />

      <p className="w3-text-grey w3-margin-top">
        Ciudades seleccionadas: <span className="w3-tag w3-teal w3-round">{selectedCities.join(', ')}</span>
      </p>
    </div>
  );
};

export default CustomSelectDemo_4;