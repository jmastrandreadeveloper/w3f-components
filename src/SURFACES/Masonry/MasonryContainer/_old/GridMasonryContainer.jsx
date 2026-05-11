import React from 'react';

// Componente Grid Masonry Container con anchos variables
const GridMasonryContainer = ({ 
  children, 
  minCardWidth = '280px',
  gap = '1rem',
  className = '',
  containerPadding = '1rem'
}) => {
  return (
    <>
      
      <style>{`
        .grid-masonry-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(${minCardWidth}, 1fr));
          gap: ${gap};
          padding: ${containerPadding};
          align-items: start;
        }
        
        /* Tamaños de tarjetas */
        .grid-item-small { 
          grid-column: span 1; 
        }
        
        .grid-item-medium { 
          grid-column: span 2; 
        }
        
        .grid-item-large { 
          grid-column: span 3; 
        }
        
        .grid-item-extra-large { 
          grid-column: span 4; 
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .grid-item-medium,
          .grid-item-large,
          .grid-item-extra-large {
            grid-column: span 1;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1200px) {
          .grid-item-large,
          .grid-item-extra-large {
            grid-column: span 2;
          }
        }
        
        .grid-masonry-item {
          transition: all 0.3s ease;
        }
        
        .grid-masonry-item:hover {
          transform: translateY(-0.5rem);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
      
      <div className={`grid-masonry-container ${className}`}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className="grid-masonry-item">
            {child}
          </div>
        ))}
      </div>
    </>
  );
};

export default GridMasonryContainer;