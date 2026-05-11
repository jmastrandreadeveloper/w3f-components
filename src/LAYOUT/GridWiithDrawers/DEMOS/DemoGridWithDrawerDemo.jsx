// DemoGridWithDrawer.jsx

import React from 'react';
import { GridWithDrawer } from '../GridWithDrawer';
import { Grid } from '../../Grid/Grid';

// Componente de área para contenido visual
const Area = ({ title, color, children, style = {}, 'data-grid-area': gridArea }) => (
  <div 
    style={{ 
      backgroundColor: color, 
      padding: '20px', 
      color: '#1f2937', 
      border: '1px solid #9ca3af',
      ...style
    }}
    data-grid-area={gridArea} // Propiedad para que GridWithDrawer identifique el área
  >
    <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>
    {children}
  </div>
);


const DemoGridWithDrawerDemo = () => {
  // Configuración de la grilla
  // Columna 1: Sidebar redimensionable (250px inicial)
  // Columna 2: Contenido principal (1fr)
  const templateColumns = '250px 1fr';
  const templateRows = '1fr';
  const templateAreas = `"sidebar main"`;

  // Configuración del divisor (Debe ser el primer elemento para ser el Drawer)
  const drawerDividerConfig = {
    area: 'sidebar', // Nombre del área donde se inyectará el botón y el divisor (si está abierto)
    between: ['sidebar', 'main'], // Especifica las áreas que delimita
    orientation: 'vertical',
    columnIndex: 0, 
    initialSize: 250, 
    minSize: 80, // Mínimo de redimensionamiento
    maxSize: 400,
  };

  return (
    <div style={{ height: '600px', width: '100%', padding: '20px', boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
      <h1>Demo: GridWithDrawer</h1>
      <p>El área **Sidebar** (`drawerAreaName="sidebar"`) se puede **colapsar** (a 50px) y **redimensionar** si está abierta.</p>
      
      <GridWithDrawer
        templateColumns={templateColumns}
        templateRows={templateRows}
        templateAreas={templateAreas}
        drawerAreaName="sidebar" // ¡CRUCIAL! Define qué área es el Drawer
        gap="0px" 
        dividers={[drawerDividerConfig]}
        style={{ height: '100%', border: '1px solid #e5e7eb' }}
      >
        <Area 
          data-grid-area="sidebar" 
          title="Drawer / Sidebar" 
          color="#fef3c7"
          style={{ overflowY: 'auto', minWidth: '0' }}
        >
          <p>Área redimensionable y colapsable.</p>
          <p>Usa el botón para alternar el estado.</p>
          <p>Arrastra el divisor para redimensionar solo cuando está abierta.</p>
          {Array.from({ length: 10 }).map((_, i) => <p key={i}>Item de Navegación {i + 1}</p>)}
        </Area>
        
        <Area 
          data-grid-area="main" 
          title="Contenido Principal" 
          color="#dbeafe"
          style={{ overflowY: 'auto' }}
        >
          <p>Esta área utiliza el espacio restante (`1fr`) y se ajusta automáticamente.</p>
          {Array.from({ length: 50 }).map((_, i) => <p key={i}>Línea de contenido {i + 1}</p>)}
        </Area>
      </GridWithDrawer>
    </div>
  );
};

export default DemoGridWithDrawerDemo;