import React from 'react';

// Componente Contenedor de Mampostería Modular
const MasonryContainer = ({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = '1.5rem',
  className = '',
  containerPadding = '1.5rem',
  itemClassName = 'masonry-item'
}) => {
  return (
    <>
      <style>{`
        .masonry-container {
          column-count: ${columns.xs};
          column-gap: ${gap};
          padding: 0 ${containerPadding};
        }
        
        @media (min-width: 640px) {
          .masonry-container {
            column-count: ${columns.sm};
          }
        }
        
        @media (min-width: 768px) {
          .masonry-container {
            column-count: ${columns.md};
          }
        }
        
        @media (min-width: 1024px) {
          .masonry-container {
            column-count: ${columns.lg};
          }
        }
        
        .${itemClassName} {
          break-inside: avoid;
          margin-bottom: ${gap};
          transition: all 0.3s ease;
        }
      `}</style>
      
      <div className={`masonry-container ${className}`}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    </>
  );
};

export default MasonryContainer;