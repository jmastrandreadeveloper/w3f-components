// App.js
import React from 'react';
import CustomSelect from './CustomSelect';
import { useState } from 'react';


const CustomSelectDemo_3 = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  // Nuevo formato de datos con grupos de opciones
  const locationOptions = [
    {
      label: 'Continentes',
      options: [
        { value: 'america', label: 'América' },
        { value: 'europa', label: 'Europa' },
      ],
    },
    {
      label: 'Países',
      disabled: true, // Este grupo entero estará deshabilitado
      options: [
        { value: 'usa', label: 'Estados Unidos' },
        { value: 'argentina', label: 'Argentina' },
      ],
    },
    { value: 'otro', label: 'Otro' }, // Una opción individual fuera de un grupo
  ];

  const handleLocationChange = (event) => {
    const value = event.target.value === '' ? null : event.target.value;
    setSelectedLocation(value);
  };

  return (
    <div className="w3-container w3-padding w3-light-grey">
      <h2>Ejemplo con Grupos de Opciones</h2>
      <CustomSelect
        label="Selecciona una ubicación"
        options={locationOptions}
        value={selectedLocation}
        onChange={handleLocationChange}
      />

      <p className="w3-text-grey w3-margin-top">
        Ubicación seleccionada: <span className="w3-tag w3-teal w3-round">{String(selectedLocation)}</span>
      </p>
    </div>
  );
};

export default CustomSelectDemo_3;