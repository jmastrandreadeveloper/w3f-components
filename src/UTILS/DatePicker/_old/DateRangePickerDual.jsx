import React, { useState } from 'react';
import './DatePicker.css';

const DateRangePickerDual = () => {
  const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });
  const [currentMonthLeft, setCurrentMonthLeft] = useState(new Date());
  const [currentMonthRight, setCurrentMonthRight] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));

  const handleDateClick = (date) => {
    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // Si no hay nada o ya hay un rango completo, iniciar uno nuevo
      setSelectedRange({ startDate: date, endDate: null });
    } else {
      // Si ya hay un inicio, establecer el final y emitir el JSON
      const start = selectedRange.startDate;
      const end = date;
      const finalRange = start <= end ? { startDate: start, endDate: end } : { startDate: end, endDate: start };
      setSelectedRange(finalRange);

      const rangeObject = {
        startDate: finalRange.startDate.toISOString(),
        endDate: finalRange.endDate.toISOString(),
        formattedRange: `${finalRange.startDate.toLocaleDateString()} - ${finalRange.endDate.toLocaleDateString()}`
      };
      const jsonString = JSON.stringify(rangeObject, null, 2);
      alert(`Rango seleccionado (JSON):\n\n${jsonString}`);
    }
  };

  const nextMonth = () => {
    setCurrentMonthLeft(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setCurrentMonthRight(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonthLeft(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setCurrentMonthRight(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const isWithinRange = (date, startDate, endDate) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const renderCalendar = (month) => {
    const startDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const totalDays = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const days = [];

    // Celdas vacías
    for (let i = 0; i < startDay; i++) {
      days.push(<td key={`empty-${month.getMonth()}-${i}`} style={{ border: 'none', padding: '2px', textAlign: 'center', width: '14.28%' }}></td>);
    }

    // Días del mes
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = (selectedRange.startDate && date.toDateString() === selectedRange.startDate.toDateString()) ||
                         (selectedRange.endDate && date.toDateString() === selectedRange.endDate.toDateString());
      const isInRange = isWithinRange(date, selectedRange.startDate, selectedRange.endDate);
      const isSunday = date.getDay() === 0;

      let buttonClasses = [];
      if (isToday) buttonClasses.push('today');
      if (isSelected) buttonClasses.push('selected');
      if (isSunday) buttonClasses.push('sunday');
      if (isInRange) {
        buttonClasses.push('in-range');
        if (date.toDateString() === selectedRange.startDate.toDateString()) {
            buttonClasses.push('start-range');
        }
        if (selectedRange.endDate && date.toDateString() === selectedRange.endDate.toDateString()) {
            buttonClasses.push('end-range');
        }
        if (selectedRange.startDate && selectedRange.endDate && selectedRange.startDate.toDateString() === selectedRange.endDate.toDateString()) {
            buttonClasses.push('single-day-range');
        }
      }

      days.push(
        <td key={`day-${month.getMonth()}-${i}`} style={{ border: 'none', padding: '2px', textAlign: 'center', width: '14.28%' }}>
          <button
            className={buttonClasses.join(' ')}
            onClick={() => handleDateClick(date)}
          >
            {i}
          </button>
        </td>
      );
    }

    // Completar la última fila
    const totalCells = Math.ceil((startDay + totalDays) / 7) * 7;
    const remainingCells = totalCells - (startDay + totalDays);
    for (let i = 0; i < remainingCells; i++) {
      days.push(<td key={`empty-end-${month.getMonth()}-${i}`} style={{ border: 'none', padding: '2px', textAlign: 'center', width: '14.28%' }}></td>);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={`week-${month.getMonth()}-${i/7}`}>{days.slice(i, i + 7)}</tr>);
    }

    const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' });

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
    <div className="dual-calendar-container">
      {renderCalendar(currentMonthLeft)}
      {renderCalendar(currentMonthRight)}
    </div>
  );
};

export default DateRangePickerDual;