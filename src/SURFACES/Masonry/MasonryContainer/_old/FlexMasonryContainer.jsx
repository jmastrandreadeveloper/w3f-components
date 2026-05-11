import React from 'react';

// Componente Flexbox Masonry Container con anchos variables
const FlexMasonryContainer = ({ 
  children, 
  baseColumnWidth = '300px',
  gap = '1rem',
  className = '',
  containerPadding = '1rem'
}) => {
  return (
    <>
      <style>{`
        .flex-masonry-container {
          display: flex;
          flex-wrap: wrap;
          gap: ${gap};
          padding: ${containerPadding};
          align-items: flex-start;
          justify-content: flex-start;
        }
        
        /* Tamaños de tarjetas basados en el ancho base */
        .flex-item-small { 
          flex: 0 0 ${baseColumnWidth};
          min-width: 0;
        }
        
        .flex-item-medium { 
          flex: 0 0 calc(${baseColumnWidth} * 1.6 + ${gap});
          min-width: 0;
        }
        
        .flex-item-large { 
          flex: 0 0 calc(${baseColumnWidth} * 2.3 + ${gap} * 2);
          min-width: 0;
        }
        
        .flex-item-extra-large { 
          flex: 1 1 100%;
          min-width: 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .flex-item-small,
          .flex-item-medium,
          .flex-item-large,
          .flex-item-extra-large {
            flex: 1 1 100%;
            min-width: 0;
          }
          
          .flex-masonry-container {
            padding: 0.5rem;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1200px) {
          .flex-item-large {
            flex: 0 0 calc(${baseColumnWidth} * 1.8 + ${gap});
          }
          
          .flex-item-medium {
            flex: 0 0 calc(${baseColumnWidth} * 1.4 + ${gap});
          }
        }
        
        @media (min-width: 1201px) and (max-width: 1600px) {
          .flex-item-extra-large { 
            flex: 0 0 calc(${baseColumnWidth} * 3.5 + ${gap} * 3);
          }
        }
        
        .flex-masonry-item {
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .flex-masonry-item:hover {
          transform: translateY(-0.5rem);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        /* Distribución automática mejorada */
        .flex-masonry-container::after {
          content: '';
          flex: 1 0 ${baseColumnWidth};
        }
      `}</style>
      
      <div className={`flex-masonry-container ${className}`}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className="flex-masonry-item">
            {child}
          </div>
        ))}
      </div>
    </>
  );
};

export default FlexMasonryContainer;