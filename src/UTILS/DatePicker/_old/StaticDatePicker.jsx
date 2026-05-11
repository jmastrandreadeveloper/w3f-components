import React, { useState } from 'react';
import './DatePicker.css';

const StaticCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    
    // Nuevo: Crear y mostrar el objeto JSON
    const dateObject = {
      selectedDate: date.toISOString(),
      formattedDate: date.toLocaleDateString(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
    const jsonString = JSON.stringify(dateObject, null, 2);
    alert(`Día seleccionado (JSON):\n\n${jsonString}`);
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const renderCalendar = () => {
    const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const totalDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const days = [];

    // Celdas vacías para los días de la semana anteriores
    for (let i = 0; i < startDay; i++) {
      days.push(<td key={`empty-${i}`} style={{ border: 'none', padding: '2px', textAlign: 'center', width: '14.28%' }}></td>);
    }

    // Días del mes
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isSunday = date.getDay() === 0;

      let buttonClasses = [];
      if (isToday) buttonClasses.push('today');
      if (isSelected) buttonClasses.push('selected');
      if (isSunday) buttonClasses.push('sunday');

      days.push(
        <td key={i} style={{ border: 'none', padding: '2px', textAlign: 'center', width: '14.28%' }}>
          <button
            className={buttonClasses.join(' ')}
            onClick={() => handleDateClick(date)}
          >
            {i}
          </button>
        </td>
      );
    }

    // Completar la última fila si es necesario
    const totalCells = Math.ceil((startDay + totalDays) / 7) * 7;
    const remainingCells = totalCells - (startDay + totalDays);
    for (let i = 0; i < remainingCells; i++) {
      days.push(<td key={`empty-end-${i}`} style={{ border: 'none', padding: '2px', textAlign: 'center', width: '14.28%' }}></td>);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={`week-${i/7}`}>{days.slice(i, i + 7)}</tr>);
    }

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
      <div className="w3-card w3-round-large" style={{ width: '250px', margin: '20px auto', backgroundColor: 'white' }}>
        <table className="w3-table" style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          tableLayout: 'fixed'
        }}>
          <thead>
            <tr style={{ background: '#2196f3' }}>
              <td colSpan="1" style={{ textAlign: 'left', padding: '8px 0', border: 'none' }}>
                <button 
                  onClick={prevMonth}
                  style={{ 
                    minWidth: '40px', 
                    padding: '0 8px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  &#10094;
                </button>
              </td>
              <td colSpan="5" style={{ textAlign: 'center', border: 'none' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '16px' }}>{monthName}</h3>
              </td>
              <td colSpan="1" style={{ textAlign: 'right', padding: '8px 0', border: 'none' }}>
                <button 
                  onClick={nextMonth}
                  style={{ 
                    minWidth: '40px', 
                    padding: '0 8px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  &#10095;
                </button>
              </td>
            </tr>
            <tr style={{ background: '#f1f1f1' }}>
              <th className="w3-table th">Dom</th>
              <th className="w3-table th">Lun</th>
              <th className="w3-table th">Mar</th>
              <th className="w3-table th">Mie</th>
              <th className="w3-table th">Jue</th>
              <th className="w3-table th">Vie</th>
              <th className="w3-table th">Sab</th>
            </tr>
          </thead>
          <tbody>
            {weeks}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {renderCalendar()}
    </div>
  );
};

export default StaticCalendar;