// App.js
import React from 'react';
import CustomMultiSelectWithCheckboxes from './CustomMultiSelectWithCheckboxes';
import { useState } from 'react';


const CustomSelectDemo_5 = () => {
  const [selectedCities, setSelectedCities] = useState([]);

  const cityOptions = [
    { label: 'América', options: [
      { value: 'new-york', label: 'Nueva York' },
      { value: 'sao-paulo', label: 'São Paulo' },
    ]},
    { label: 'Europa', options: [
      { value: 'london', label: 'Londres' },
      { value: 'paris', label: 'París', disabled: true },
      { value: 'berlin', label: 'Berlín' },
    ]},
    { value: 'tokyo', label: 'Tokio' },
  ];

  const handleCityChange = (newValues) => {
    setSelectedCities(newValues);
  };

  return (
    <div className="w3-container w3-padding w3-light-grey" style={{ minHeight: '100vh' }}>
      <h2 className="w3-text-dark-grey">Select con Checkboxes y Grupos</h2>
      
      <div style={{ maxWidth: '400px' }}>
        <CustomMultiSelectWithCheckboxes
          label="Elige tus ciudades favoritas"
          options={cityOptions}
          value={selectedCities}
          onChange={handleCityChange}
        />
      </div>

      <div className="w3-panel w3-border w3-pale-blue w3-round-large w3-border-blue">
        <p className="w3-text-dark-grey">
          <strong>Valores seleccionados:</strong>
          <span className={`w3-tag w3-round w3-margin-left ${
            selectedCities.length > 0 ? 'w3-teal' : 'w3-grey'
          }`}>
            {selectedCities.length > 0 ? selectedCities.join(', ') : 'Ninguno'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomSelectDemo_5;