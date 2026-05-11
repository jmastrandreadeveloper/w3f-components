import React from 'react';

// Componente Flex Masonry Card con soporte para anchos variables
const FlexMasonryCard = ({ 
  title, 
  children, 
  gradient, 
  height = '8rem', 
  width = 'small', // 'small', 'medium', 'large', 'extra-large'
  className = '',
  headerClassName = '',
  bodyClassName = '',
  hover = true 
}) => {
  const widthClass = `flex-item-${width}`;
  
  return (
    <div className={`${widthClass} w3-card-4 w3-white w3-round-large w3-border ${className}`} 
         style={{ height: 'fit-content' }}>
      {gradient && (
        <>
          <style>{`
            .gradient-header {
              position: relative;
              overflow: hidden;
            }
            
            .gradient-header::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.1);
            }
          `}</style>
          <div 
            className={`gradient-header w3-round-large-top ${headerClassName}`}
            style={{ 
              height: height, 
              background: gradient 
            }}
          ></div>
        </>
      )}
      
      <div className={`w3-container w3-padding ${bodyClassName}`}>
        {title && (
          <h3 className="w3-text-dark-grey w3-margin-bottom" 
              style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default FlexMasonryCard;