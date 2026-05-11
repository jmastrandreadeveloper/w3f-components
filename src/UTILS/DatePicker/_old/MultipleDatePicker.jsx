import React, { useState } from 'react';
import DatePicker from './DatePicker';

const MultipleDatePicker = () => {
  const [datePickers, setDatePickers] = useState([{
    id: 1,
    selectedDate: null,
    currentMonth: new Date()
  }]);

  const handleAddDatePicker = () => {
    const newId = datePickers.length > 0 ? datePickers[datePickers.length - 1].id + 1 : 1;
    const lastPicker = datePickers[datePickers.length - 1];
    const newMonth = lastPicker ? new Date(lastPicker.currentMonth) : new Date();

    setDatePickers(prev => [
      ...prev,
      {
        id: newId,
        selectedDate: null,
        currentMonth: newMonth
      }
    ]);
  };

  const handleRemoveDatePicker = (id) => {
    setDatePickers(prev => prev.filter(picker => picker.id !== id));
  };

  const handleDateChange = (id, newDate) => {
    setDatePickers(prev => prev.map(picker =>
      picker.id === id ? { ...picker, selectedDate: newDate } : picker
    ));
  };

  const handleAccept = () => {
    const selectedDates = datePickers.filter(picker => picker.selectedDate !== null);
    
    if (selectedDates.length === 0) {
      alert("No se ha seleccionado ninguna fecha.");
      return;
    }
    
    const datesAsJson = selectedDates.map(picker => ({
      selectedDate: picker.selectedDate.toISOString(),
      formattedDate: picker.selectedDate.toLocaleDateString(),
      day: picker.selectedDate.getDate(),
      month: picker.selectedDate.getMonth() + 1,
      year: picker.selectedDate.getFullYear()
    }));
    
    const jsonString = JSON.stringify(datesAsJson, null, 2);
    alert(`Fechas seleccionadas (JSON):\n\n${jsonString}`);
  };

  return (
    <div className="w3-container w3-padding-large">
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {datePickers.map((picker, index) => (
          <DatePicker
            key={picker.id}
            initialMonth={picker.currentMonth}
            onDateChange={(newDate) => handleDateChange(picker.id, newDate)}
            // Pasa la función de eliminación al DatePicker
            onRemove={datePickers.length > 1 ? () => handleRemoveDatePicker(picker.id) : null}
          />
        ))}
      </div>
      <div className="w3-row w3-center w3-margin-top">
        <button
          className="w3-button w3-blue w3-round-large w3-margin"
          onClick={handleAddDatePicker}
        >
          Agregar fecha
        </button>
        <button
          className="w3-button w3-green w3-round-large w3-margin"
          onClick={handleAccept}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default MultipleDatePicker;