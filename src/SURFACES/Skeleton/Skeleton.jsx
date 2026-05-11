import React from 'react';

/**
 * Componente Skeleton para placeholders.
 * Sigue la filosofía de MUI y usa clases W3.CSS para la forma base.
 * Requiere el CSS personalizado para la animación de 'shimmer'.
 * * @param {string} variant - La forma del placeholder ('text', 'circular', 'rectangular').
 * @param {string} width - Ancho del placeholder (ej. '80%', '150px').
 * @param {string} height - Alto del placeholder (ej. '1.2em', '50px').
 */
const Skeleton = ({ variant = 'text', width, height }) => {
  // 1. Clases base de W3.CSS y clase de animación.
  let baseClasses = 'skeleton-shimmer w3-light-grey w3-border-0';
  let style = { 
    width: width || '100%', 
    height: height || '1.2em', // Altura por defecto para texto
    lineHeight: 'inherit',
    borderRadius: '4px', // Por defecto un borde pequeño para líneas de texto
    display: 'block' // Asegura que el div ocupa su espacio
  };

  // 2. Ajustar clases y estilos según la variante
  switch (variant) {
    case 'circular':
      baseClasses += ' w3-circle';
      const size = width || height || '40px';
      style = { ...style, width: size, height: size, borderRadius: '50%' };
      break;
    case 'rectangular':
      baseClasses += ' w3-round-large';
      style = { ...style, height: height || '100px' };
      break;
    case 'text':
    default:
      // w3-round-small o similar para líneas de texto
      baseClasses += ' w3-round-small';
      style = { 
        ...style, 
        height: height || '1.2em',
        // Esto imita la variación de ancho de las líneas de texto
        width: width || (Math.random() > 0.5 ? '90%' : '100%'), 
      };
      break;
  }
  
  // Estilos esenciales para la animación del 'shimmer'
  style.overflow = 'hidden';
  style.position = 'relative';

  return (
    <div className={baseClasses} style={style}>
    </div>
  );
};

export default Skeleton;