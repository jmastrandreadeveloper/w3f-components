// IdedemoWithDrawer.jsx

import React, { useState } from 'react';
// Cambiamos la importación del wrapper Grid para usar GridWithDrawer
import { GridWithDrawer } from '../GridWithDrawer';

/**
 * Demo de un layout tipo IDE donde la barra lateral izquierda ('nav') es un Drawer (colapsable/resizable)
 * y la barra lateral derecha ('extras') es redimensionable.
 */
const IdedemoWithDrawerDemo = () => {
  // Estado para gestionar los tamaños iniciales y límites de las columnas
  const [columnConfig] = useState({
    nav: { minSize: 100, maxSize: 400, initialSize: 200 }, 
    extras: { minSize: 150, maxSize: 400, initialSize: 250 },
  });

  // Definición de divisores
  const dividerDefinition = [
    // Divisor 1 (ÍNDICE 0): Barra de Navegación (Izquierda) - ESTE SERÁ EL DRAWER
    {
      // El divisor se inyecta en 'nav' (el primer área) y separa 'nav' de 'main'.
      between: ['nav', 'main'], 
      orientation: 'vertical',
      columnIndex: 0, // La primera columna (0)
      initialSize: columnConfig.nav.initialSize,
      minSize: columnConfig.nav.minSize,
      maxSize: columnConfig.nav.maxSize,
      position: 'right' 
    },
    // Divisor 2 (ÍNDICE 1): Barra de Utilidades (Derecha / Consola) - ESTE SERÁ SÓLO RESIZABLE
    {
      // El divisor se inyecta en 'main' (el segundo área) y separa 'main' de 'extras'.
      between: ['main', 'extras'],
      orientation: 'vertical',
      columnIndex: 2, // La tercera columna (2)
      initialSize: columnConfig.extras.initialSize,
      minSize: columnConfig.extras.minSize,
      maxSize: columnConfig.extras.maxSize,
      // Aunque el divisor separa 'main' de 'extras', lo inyectamos en 'main' para usar el "position: right" del divisor.
      // Sin embargo, si lo definimos en 'main' (indice 1 del grid) y queremos redimensionar la columna 2, debemos ajustar 
      // la lógica. Por simplicidad, se inyecta en el área que tiene el divisor en el borde derecho, que es 'main'.
      // En este caso, el GridWithDrawer inyecta el divisor donde `config.between[0]` es igual a `gridArea`.
      // El divisor debe ser inyectado en 'main' para que el divisor de la derecha se mueva. 
      // No obstante, la lógica del `useGridDivider` debe redimensionar la columna 2. 
      // Mantendremos la inyección en `main` para que el divisor quede entre `main` y `extras`.
      // En el GridWithDrawer ajustado, el filtro ahora es: `config.between && config.between[0] === gridArea`.
      // Para este divisor, la columna a redimensionar es la 2.
      
      // La configuración original de `Idedemo.jsx` usa:
      // Divisor 2: between: ['extras', 'main'], columnIndex: 2. Esto es raro, ya que el divisor entre nav/main está en 0 y main/extras en 2.
      // La columna 0 es 'nav', 1 es '1fr', 2 es 'extras'.
      // Divisor 1: separa col 0 y 1. Redimensiona col 0. Correcto.
      // Divisor 2: separa col 1 y 2. Redimensiona col 2.
      // Modificamos el Divisor 2 para que redimensione la columna 2 y se inyecte en el área 'main' (entre main y extras).
      between: ['extras', 'main'], // Separación lógica: Main y Extras
      orientation: 'vertical',
      columnIndex: 2, // Columna a redimensionar: la 3ª columna (índice 2, 'extras')
      initialSize: columnConfig.extras.initialSize,
      minSize: columnConfig.extras.minSize,
      maxSize: columnConfig.extras.maxSize,
      position: 'left' // El divisor se inyecta en el borde derecho del área 'main'
    }
  ];

  const templateColumns = `${columnConfig.nav.initialSize}px 1fr ${columnConfig.extras.initialSize}px`;
  
  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <GridWithDrawer
        templateColumns={templateColumns} 
        templateRows="50px 1fr"
        gap="1px"
        style={{ height: '100vh' }}
        templateAreas={`
          header header header
          nav    main   extras
        `}
        dividers={dividerDefinition} 
        drawerAreaName="nav" // Indicamos que 'nav' es el área controlada por el Drawer
      >
        
        {/* Header (Mismo que el original) */}
        <div style={{ 
          gridArea: 'header', 
          backgroundColor: '#4f46e5', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontWeight: 'bold', 
          fontSize: '20px', 
          zIndex: 10 
        }}>
          IDE Layout Demo: Sidebar Colapsable (Drawer) y Panel Derecho Resizable
        </div>

        {/* Nav - Panel de Navegación (EL DRAWER) */}
        <div style={{ 
          gridArea: 'nav', 
          backgroundColor: '#06b6d4', 
          color: 'white', 
          padding: '16px', 
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 1,
          minHeight: 0,
          minWidth: 0,
          // Se elimina position: relative ya que lo añade GridWithDrawer
        }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Navegación / Archivos ↓
          </h3>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>
            Límites: {columnConfig.nav.minSize}px - {columnConfig.nav.maxSize}px 
          </p>
          
          {/* Lista de archivos (Truncada) */}
          <div style={{ marginTop: '16px' }}>
            {[
              'src/components/MainApp.jsx',
              'src/components/Navigation.jsx',
              'src/utils/helpers/formatters.js',
              // ... (rest of files truncated for brevity)
              'README.md',
            ].map((file, i) => (
              <div key={i} style={{ 
                marginBottom: '8px', 
                fontSize: '12px', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                padding: '4px 8px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                📁 {file}
              </div>
            ))}
          </div>
        </div>

        {/* Main - Editor Principal (El divisor 2 se inyectará aquí) */}
        <div style={{ 
          gridArea: 'main', 
          backgroundColor: '#10b981', 
          color: 'white', 
          padding: '16px', 
          overflowY: 'auto',
          overflowX: 'hidden', 
          zIndex: 5,
          minHeight: 0, 
          minWidth: 0,
          // Se elimina position: relative
        }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>
            Editor Principal (1fr)
          </h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            El panel izquierdo es colapsable. El panel derecho es redimensionable.
          </p>
          <div style={{ marginTop: '16px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6' }}>
            <div>{'function hello() {'}</div>
            <div style={{ paddingLeft: '20px' }}>{'  console.log("Hello World");'}</div>
            <div>{'}'}</div>
          </div>
          {Array.from({ length: 50 }).map((_, i) => <p key={i}>Línea de código o contenido {i + 1}</p>)}
        </div>

        {/* Extras - Consola/Debug (SOLO RESIZABLE) */}
        <div style={{ 
          gridArea: 'extras', 
          backgroundColor: '#8b5cf6', 
          color: 'white', 
          padding: '16px', 
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 1,
          minHeight: 0,
          minWidth: 0,
          // Se elimina position: relative
        }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Consola / Debug ↓
          </h3>
          <p style={{ fontSize: '12px', marginBottom: '8px' }}>
            Límites: {columnConfig.extras.minSize}px - {columnConfig.extras.maxSize}px
          </p>
          
          {/* Logs de consola (Truncados) */}
          <div style={{ marginTop: '16px', fontFamily: 'monospace', fontSize: '11px' }}>
            {[
              { time: '10:27:00', msg: 'Server listening on port 3000', color: '#60a5fa' },
              { time: '10:28:15', msg: 'POST /api/data - 201 Created', color: '#4ade80' },
              { time: '10:29:00', msg: 'Cache cleared', color: '#a0a0a0' },
            ].map((log, i) => (
              <div key={i} style={{ marginBottom: '4px', color: log.color }}>
                [{log.time}] {log.msg}
              </div>
            ))}
          </div>
        </div>
      </GridWithDrawer>
    </div>
  );
};

export default IdedemoWithDrawerDemo;