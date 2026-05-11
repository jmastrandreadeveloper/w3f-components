import React from 'react';
import DatePicker from './DatePicker';
import StaticDatePicker from './StaticDatePicker';
import DateRangePicker from './DateRangePicker';
import DateRangePickerDual from './DateRangePickerDual';
import DateRangePickerDualDiscontinuo from './DateRangePickerDualDiscontinuo';
import MultipleDatePicker from './MultipleDatePicker'; // Nuevo componente

const DatePickerDemo = () => {
  return (
    <div className="w3-container w3-padding-64 w3-center">
      <h1>Demo de Datepickers</h1>
      
      <div className="w3-row">
        
        {/* Primera columna */}
        <div className="w3-half w3-container">
          
          <div className="w3-padding-large">
            <h2>DatePicker (Un solo día)</h2>
            <DatePicker />
          </div>

          <hr style={{ margin: '40px auto', width: '80%' }} />

          <div className="w3-padding-large">
            <h2>Calendario Fijo (Un solo día)</h2>
            <StaticDatePicker />
          </div>

        </div>

        {/* Segunda columna */}
        <div className="w3-half w3-container">
          
          <div className="w3-padding-large">
            <h2>Selector de Rango de Fechas (Un solo mes)</h2>
            <DateRangePicker />
          </div>

          <hr style={{ margin: '40px auto', width: '80%' }} />

          <div className="w3-padding-large">
            <h2>Selector de Rango de Fechas (Dos meses)</h2>
            <DateRangePickerDual />
          </div>

        </div>
      </div>
      
      <hr style={{ margin: '40px 0' }} />

      <div style={{ margin: '40px auto' }}>
        <h2>Selector de Rango de Fechas (Dos meses discontinuos)</h2>
        <DateRangePickerDualDiscontinuo />
      </div>
      
      <hr style={{ margin: '40px 0' }} />
      
      <div style={{ margin: '40px auto' }}>
        <h2>Selector de Múltiples Fechas</h2>
        <MultipleDatePicker />
      </div>

    </div>
  );
}

export default DatePickerDemo;