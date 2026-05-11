import React from 'react';

// Componente de Tarjeta Opcional (para demostración)
const MasonryCard = ({ 
  title, 
  children, 
  gradient, 
  height = '8rem', 
  className = '',
  headerClassName = '',
  bodyClassName = '',
  hover = true 
}) => {
  const hoverStyle = hover ? `
    .masonry-card:hover {
      transform: translateY(-0.5rem);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  ` : '';

  return (
    <>
      <style>{`
        .masonry-card {
          transition: all 0.3s ease;
        }
        ${hoverStyle}
        
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
      
      <div className={`masonry-card w3-card-4 w3-white w3-round-large w3-border ${className}`}>
        {gradient && (
          <div 
            className={`gradient-header w3-round-large-top ${headerClassName}`}
            style={{ 
              height: height, 
              background: gradient 
            }}
          ></div>
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
    </>
  );
};

export default MasonryCard;