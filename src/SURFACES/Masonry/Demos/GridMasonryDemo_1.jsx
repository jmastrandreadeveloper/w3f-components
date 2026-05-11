import React from 'react';

import GridMasonryContainer from '../MasonryContainer/GridMasonryContainer'; // Ajusta la ruta según tu estructura
import GridMasonryCard from '../MasonryContainer/GridMasonryCard'; // Ajusta la ruta según tu estructura

// Demo con diferentes tamaños de tarjetas
const GridMasonryDemo_1 = () => {
  const cards = [
    {
      id: 1,
      title: "Tarjeta Pequeña",
      description: "Esta es una tarjeta de tamaño normal (1 columna).",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
      height: "6rem",
      width: "small",
      tags: [{ text: "Normal", color: "w3-blue" }]
    },
    {
      id: 2,
      title: "Tarjeta Mediana - Doble Ancho",
      description: "Esta tarjeta ocupa 2 columnas de ancho, perfecta para contenido más extenso como descripciones largas o múltiples elementos.",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)",
      height: "8rem",
      width: "medium",
      tags: [
        { text: "Mediana", color: "w3-red" },
        { text: "Doble", color: "w3-pink" }
      ]
    },
    {
      id: 3,
      title: "Verde Compacta",
      description: "Otra tarjeta normal para mostrar el flujo.",
      gradient: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
      height: "7rem",
      width: "small",
      tags: [{ text: "Compacta", color: "w3-green" }]
    },
    {
      id: 4,
      title: "Tarjeta Grande - Triple Ancho",
      description: "Esta es una tarjeta extra ancha que ocupa 3 columnas. Ideal para contenido destacado, galerías de imágenes, o información muy importante que necesita más espacio visual.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)",
      height: "10rem",
      width: "large",
      hasButton: true
    },
    {
      id: 5,
      title: "Naranja Estándar",
      description: "Tarjeta de tamaño estándar con contenido normal.",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
      height: "9rem",
      width: "small",
      tags: [{ text: "Estándar", color: "w3-orange" }]
    },
    {
      id: 6,
      title: "Tarjeta Mediana Azul",
      description: "Otra tarjeta de tamaño mediano para demostrar la flexibilidad del layout de grid.",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #1d4ed8 100%)",
      height: "8rem",
      width: "medium",
      tags: [
        { text: "Mediana", color: "w3-cyan" },
        { text: "Flexible", color: "w3-blue" }
      ]
    },
    {
      id: 7,
      title: "Tarjeta Compacta",
      description: "Diseño minimalista en tamaño estándar.",
      gradient: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
      height: "6rem",
      width: "small",
      tags: []
    },
    {
      id: 8,
      title: "Súper Tarjeta - Ancho Completo",
      description: "Esta es la tarjeta más grande disponible, ocupando 4 columnas de ancho. Perfecta para contenido principal, banners importantes, formularios extensos o cualquier elemento que necesite máximo impacto visual y espacio.",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)",
      height: "12rem",
      width: "extra-large",
      tags: [],
      hasSpecialContent: true
    },
    {
      id: 9,
      title: "Lima Fresca",
      description: "Tarjeta estándar con diseño fresco.",
      gradient: "linear-gradient(135deg, #84cc16 0%, #059669 100%)",
      height: "7rem",
      width: "small",
      tags: [{ text: "Fresco", color: "w3-light-green" }]
    },
    {
      id: 10,
      title: "Tarjeta Mediana Violeta",
      description: "Diseño elegante en formato mediano que demuestra la versatilidad del sistema de grid.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)",
      height: "9rem",
      width: "medium",
      hasExploreButton: true
    },
    {
      id: 11,
      title: "Elegancia Oscura",
      description: "Diseño sofisticado compacto.",
      gradient: "linear-gradient(135deg, #475569 0%, #374151 100%)",
      height: "8rem",
      width: "small",
      tags: [{ text: "Elegante", color: "w3-grey" }]
    },
    {
      id: 12,
      title: "Tarjeta Grande Energética",
      description: "Una tarjeta grande que combina energía y creatividad, ocupando tres columnas para máximo impacto visual.",
      gradient: "linear-gradient(135deg, #facc15 0%, #dc2626 100%)",
      height: "10rem",
      width: "large",
      hasActivateButton: true
    }
  ];

  return (
    <>
      <style>{`
        .main-gradient {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }
        
        .title-gradient {
          background: linear-gradient(to right, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-weight: 500;
        }
        
        .btn-gradient {
          background: linear-gradient(to right, #f97316, #dc2626);
          transition: all 0.2s ease;
        }
        
        .btn-gradient:hover {
          background: linear-gradient(to right, #ea580c, #b91c1c);
        }
        
        .btn-yellow-gradient {
          background: linear-gradient(to right, #eab308, #f97316);
          transition: all 0.2s ease;
        }
        
        .btn-yellow-gradient:hover {
          background: linear-gradient(to right, #ca8a04, #ea580c);
        }
        
        .explore-btn {
          color: #8b5cf6;
          transition: all 0.2s ease;
        }
        
        .explore-btn:hover {
          color: #7c3aed;
          background-color: #f3f4f6;
        }
        
        .special-content {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
          text-align: center;
        }
        
        .width-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: bold;
        }
      `}</style>
      
      <div className="main-gradient">
        <div className="w3-container w3-padding-large">
          <h1 className="w3-center w3-margin-bottom title-gradient" 
              style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Grid Mampostería - Anchos Variables
          </h1>
          
          <div className="w3-panel w3-leftbar w3-light-blue w3-padding w3-margin-bottom">
            <h4>📐 Anchos Disponibles:</h4>
            <p><strong>Small (1 col):</strong> Tarjetas normales | <strong>Medium (2 cols):</strong> Tarjetas dobles | <strong>Large (3 cols):</strong> Tarjetas triples | <strong>Extra-Large (4 cols):</strong> Ancho completo</p>
          </div>
          
          <GridMasonryContainer 
            minCardWidth="280px"
            gap="1.5rem"
            containerPadding="0"
          >
            {cards.map((card) => (
              <GridMasonryCard
                key={card.id}
                title={card.title}
                gradient={card.gradient}
                height={card.height}
                width={card.width}
                hover={true}
              >
                {/* Indicador visual del ancho */}
                <div className="width-indicator">
                  {card.width === 'small' && '1 col'}
                  {card.width === 'medium' && '2 cols'}
                  {card.width === 'large' && '3 cols'}
                  {card.width === 'extra-large' && '4 cols'}
                </div>
                
                <p className="w3-text-grey w3-small w3-margin-bottom" style={{ lineHeight: '1.6' }}>
                  {card.description}
                </p>
                
                {/* Contenido especial para tarjeta extra grande */}
                {card.hasSpecialContent && (
                  <div className="special-content">
                    <h4>🎯 Contenido Destacado</h4>
                    <p>Esta tarjeta ocupa el máximo ancho disponible</p>
                    <button className="w3-button w3-white w3-text-black w3-round">Acción Principal</button>
                  </div>
                )}
                
                {/* Botón principal */}
                {card.hasButton && (
                  <button className="w3-button w3-round w3-text-white btn-gradient w3-block w3-margin-top" 
                          style={{ fontWeight: '500', padding: '12px' }}>
                    Ver más detalles
                  </button>
                )}
                
                {/* Botón explorar */}
                {card.hasExploreButton && (
                  <div className="w3-row w3-margin-top">
                    <div className="w3-col s8">
                      <span className="tag w3-deep-purple w3-round-large">Premium</span>
                    </div>
                    <div className="w3-col s4 w3-right-align">
                      <button className="explore-btn w3-button w3-round w3-small">
                        Explorar →
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Botón activar */}
                {card.hasActivateButton && (
                  <div className="w3-row w3-margin-top">
                    <div className="w3-col s6">
                      <span className="tag w3-yellow w3-round-large">Energético</span>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <button className="w3-button w3-round w3-text-white btn-yellow-gradient w3-small" 
                              style={{ padding: '8px 16px' }}>
                        Activar
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Tags normales */}
                {!card.hasButton && !card.hasExploreButton && !card.hasActivateButton && card.tags.length > 0 && (
                  <div className="w3-margin-top">
                    {card.tags.map((tag, index) => (
                      <span key={index} className={`tag ${tag.color} w3-round-large w3-margin-right`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                )}
              </GridMasonryCard>
            ))}
          </GridMasonryContainer>
          
          {/* Documentación */}
          <div className="w3-card-4 w3-white w3-round w3-padding w3-margin-top">
            <h3 className="w3-text-dark-grey">📖 Uso del Grid Masonry</h3>
            <div className="w3-code w3-light-grey w3-round w3-margin">
{`// Contenedor Grid
<GridMasonryContainer minCardWidth="280px" gap="1.5rem">
  
  // Tarjetas con diferentes anchos
  <GridMasonryCard width="small">Normal</GridMasonryCard>
  <GridMasonryCard width="medium">Doble ancho</GridMasonryCard>
  <GridMasonryCard width="large">Triple ancho</GridMasonryCard>
  <GridMasonryCard width="extra-large">Ancho completo</GridMasonryCard>
  
</GridMasonryContainer>`}
            </div>
            <p><strong>Ventajas del CSS Grid:</strong> Responsive automático, mejor control del layout, nativo del navegador, alta performance.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridMasonryDemo_1;