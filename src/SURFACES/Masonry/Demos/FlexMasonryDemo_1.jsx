
import React from 'react';
import FlexMasonryContainer from '../MasonryContainer/FlexMasonryContainer';
import FlexMasonryCard from '../MasonryContainer/FlexMasonryCard';


// Demo con diferentes tamaños de tarjetas usando Flexbox
const FlexMasonryDemo_1 = () => {
  const cards = [
    {
      id: 1,
      title: "Tarjeta Pequeña",
      description: "Esta es una tarjeta de tamaño normal usando Flexbox para distribución automática.",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
      height: "6rem",
      width: "small",
      tags: [{ text: "Flexbox", color: "w3-blue" }]
    },
    {
      id: 2,
      title: "Tarjeta Mediana - Flexbox",
      description: "Esta tarjeta usa flex-grow para ocupar más espacio horizontal de forma inteligente, adaptándose al contenido disponible.",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)",
      height: "8rem",
      width: "medium",
      tags: [
        { text: "Mediana", color: "w3-red" },
        { text: "Flexible", color: "w3-pink" }
      ]
    },
    {
      id: 3,
      title: "Verde Compacta",
      description: "Tarjeta estándar que demuestra la fluidez del layout flexbox.",
      gradient: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
      height: "7rem",
      width: "small",
      tags: [{ text: "Fluido", color: "w3-green" }]
    },
    {
      id: 4,
      title: "Tarjeta Grande - Flex Power",
      description: "Esta tarjeta grande aprovecha las propiedades de flexbox para ocupar más espacio de manera elegante y responsive, adaptándose perfectamente al diseño.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)",
      height: "10rem",
      width: "large",
      tags: [],
      hasButton: true
    },
    {
      id: 5,
      title: "Naranja Estándar",
      description: "Tarjeta normal que mantiene proporciones consistentes.",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
      height: "9rem",
      width: "small",
      tags: [{ text: "Consistente", color: "w3-orange" }]
    },
    {
      id: 6,
      title: "Tarjeta Mediana Adaptable",
      description: "Flexbox permite que esta tarjeta se adapte dinámicamente al espacio disponible, ofreciendo una experiencia más fluida.",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #1d4ed8 100%)",
      height: "8rem",
      width: "medium",
      tags: [
        { text: "Adaptable", color: "w3-cyan" },
        { text: "Dinámico", color: "w3-blue" }
      ]
    },
    {
      id: 7,
      title: "Tarjeta Compacta",
      description: "Diseño minimalista optimizado para flexbox.",
      gradient: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
      height: "6rem",
      width: "small",
      tags: []
    },
    {
      id: 8,
      title: "Súper Tarjeta Flexbox - Ancho Completo",
      description: "Esta es la tarjeta más impresionante, usando flex: 1 1 100% para ocupar toda la fila disponible. Perfecta para contenido principal, headers importantes o elementos que necesitan máximo impacto visual.",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)",
      height: "12rem",
      width: "extra-large",
      tags: [],
      hasSpecialContent: true
    },
    {
      id: 9,
      title: "Lima Fresca",
      description: "Tarjeta estándar con propiedades flexbox optimizadas.",
      gradient: "linear-gradient(135deg, #84cc16 0%, #059669 100%)",
      height: "7rem",
      width: "small",
      tags: [{ text: "Optimizado", color: "w3-light-green" }]
    },
    {
      id: 10,
      title: "Tarjeta Mediana Inteligente",
      description: "Esta tarjeta demuestra cómo flexbox distribuye el espacio de manera inteligente, creando layouts más naturales y adaptables.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)",
      height: "9rem",
      width: "medium",
      tags: [],
      hasExploreButton: true
    },
    {
      id: 11,
      title: "Elegancia Oscura",
      description: "Diseño sofisticado que aprovecha las ventajas del flexbox.",
      gradient: "linear-gradient(135deg, #475569 0%, #374151 100%)",
      height: "8rem",
      width: "small",
      tags: [{ text: "Sofisticado", color: "w3-grey" }]
    },
    {
      id: 12,
      title: "Tarjeta Grande Energética",
      description: "Una tarjeta grande que combina la potencia de flexbox con diseño energético, ofreciendo flexibilidad y impacto visual.",
      gradient: "linear-gradient(135deg, #facc15 0%, #dc2626 100%)",
      height: "10rem",
      width: "large",
      tags: [],
      hasActivateButton: true
    },
    {
      id: 13,
      title: "Extra - Flex Bonus",
      description: "Tarjeta adicional para mostrar mejor la distribución flexbox.",
      gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
      height: "7rem",
      width: "small",
      tags: [{ text: "Bonus", color: "w3-pink" }]
    },
    {
      id: 14,
      title: "Mediana Final",
      description: "Última tarjeta mediana para completar la demostración del comportamiento flexbox.",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
      height: "8rem",
      width: "medium",
      tags: [{ text: "Final", color: "w3-teal" }]
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
          z-index: 2;
        }
        
        .flex-badge {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          display: inline-block;
          margin: 0.5rem 0;
        }
      `}</style>
      
      <div className="main-gradient">
        <div className="w3-container w3-padding-large">
          <h1 className="w3-center w3-margin-bottom title-gradient" 
              style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Flexbox Mampostería - Layout Inteligente
          </h1>
          
          <div className="w3-panel w3-leftbar w3-light-blue w3-padding w3-margin-bottom">
            <h4>🔧 Ventajas de Flexbox:</h4>
            <div className="w3-row">
              <div className="w3-col l3 m6 s12">
                <p><strong>✨ Distribución inteligente</strong><br/>Ajuste automático del espacio</p>
              </div>
              <div className="w3-col l3 m6 s12">
                <p><strong>📱 Súper responsive</strong><br/>Adaptación fluida a pantallas</p>
              </div>
              <div className="w3-col l3 m6 s12">
                <p><strong>⚡ Alto rendimiento</strong><br/>Renderizado optimizado</p>
              </div>
              <div className="w3-col l3 m6 s12">
                <p><strong>🎯 Control preciso</strong><br/>Flex-grow, flex-shrink, flex-basis</p>
              </div>
            </div>
          </div>
          
          <div className="flex-badge w3-center w3-block">
            🚀 Powered by CSS Flexbox - Distribución Automática Inteligente
          </div>
          
          <FlexMasonryContainer 
            baseColumnWidth="300px"
            gap="1.5rem"
            containerPadding="0"
          >
            {cards.map((card) => (
              <FlexMasonryCard
                key={card.id}
                title={card.title}
                gradient={card.gradient}
                height={card.height}
                width={card.width}
                hover={true}
              >
                {/* Indicador visual del ancho */}
                <div className="width-indicator">
                  {card.width === 'small' && '🔹 Small'}
                  {card.width === 'medium' && '🔷 Medium'}
                  {card.width === 'large' && '🔶 Large'}
                  {card.width === 'extra-large' && '💎 XL'}
                </div>
                
                <p className="w3-text-grey w3-small w3-margin-bottom" style={{ lineHeight: '1.6' }}>
                  {card.description}
                </p>
                
                {/* Contenido especial para tarjeta extra grande */}
                {card.hasSpecialContent && (
                  <div className="special-content">
                    <h4>🎯 Flexbox Power</h4>
                    <p>Esta tarjeta usa <code>flex: 1 1 100%</code> para ocupar toda la fila</p>
                    <button className="w3-button w3-white w3-text-black w3-round">
                      💪 Flex Action
                    </button>
                  </div>
                )}
                
                {/* Botón principal */}
                {card.hasButton && (
                  <button className="w3-button w3-round w3-text-white btn-gradient w3-block w3-margin-top" 
                          style={{ fontWeight: '500', padding: '12px' }}>
                    🔧 Ver Flexbox Details
                  </button>
                )}
                
                {/* Botón explorar */}
                {card.hasExploreButton && (
                  <div className="w3-row w3-margin-top">
                    <div className="w3-col s8">
                      <span className="tag w3-deep-purple w3-round-large">Flex Premium</span>
                    </div>
                    <div className="w3-col s4 w3-right-align">
                      <button className="explore-btn w3-button w3-round w3-small">
                        Explorar 🚀
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Botón activar */}
                {card.hasActivateButton && (
                  <div className="w3-row w3-margin-top">
                    <div className="w3-col s6">
                      <span className="tag w3-yellow w3-round-large">Flex Energy</span>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <button className="w3-button w3-round w3-text-white btn-yellow-gradient w3-small" 
                              style={{ padding: '8px 16px' }}>
                        ⚡ Activar
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Tags normales */}
                {!card.hasButton && !card.hasExploreButton && !card.hasActivateButton && card.tags && card.tags.length > 0 && (
                  <div className="w3-margin-top">
                    {card.tags.map((tag, index) => (
                      <span key={index} className={`tag ${tag.color} w3-round-large w3-margin-right`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                )}
              </FlexMasonryCard>
            ))}
          </FlexMasonryContainer>
          
          {/* Documentación */}
          <div className="w3-card-4 w3-white w3-round w3-padding w3-margin-top">
            <h3 className="w3-text-dark-grey">📖 Flexbox Masonry - Guía de Uso</h3>
            
            <div className="w3-row w3-margin">
              <div className="w3-col l6 m12">
                <h4 className="w3-text-blue">🏗️ Contenedor Flexbox</h4>
                <div className="w3-code w3-light-grey w3-round">
{`<FlexMasonryContainer 
  baseColumnWidth="300px"
  gap="1.5rem"
>
  {/* Contenido */}
</FlexMasonryContainer>`}
                </div>
              </div>
              
              <div className="w3-col l6 m12">
                <h4 className="w3-text-purple">🎯 Tarjetas Flexibles</h4>
                <div className="w3-code w3-light-grey w3-round">
{`<FlexMasonryCard 
  width="medium"  // small|medium|large|extra-large
  title="Mi título"
  gradient="linear-gradient(...)"
>
  Contenido
</FlexMasonryCard>`}
                </div>
              </div>
            </div>
            
            <div className="w3-panel w3-pale-blue w3-leftbar w3-border-blue">
              <h4>💡 Propiedades Flex Utilizadas:</h4>
              <ul className="w3-ul">
                <li><strong>Small:</strong> <code>flex: 0 0 300px</code> - Ancho fijo</li>
                <li><strong>Medium:</strong> <code>flex: 0 0 calc(300px * 1.6)</code> - 1.6x más ancho</li>
                <li><strong>Large:</strong> <code>flex: 0 0 calc(300px * 2.3)</code> - 2.3x más ancho</li>
                <li><strong>Extra-Large:</strong> <code>flex: 1 1 100%</code> - Ancho completo</li>
              </ul>
            </div>
            
            <div className="w3-row">
              <div className="w3-col l4 m12">
                <h5 className="w3-text-green">✅ Ventajas</h5>
                <ul className="w3-ul w3-small">
                  <li>Distribución inteligente</li>
                  <li>Responsive natural</li>
                  <li>Control fino del espacio</li>
                  <li>Rendimiento excelente</li>
                </ul>
              </div>
              
              <div className="w3-col l4 m12">
                <h5 className="w3-text-orange">⚠️ Consideraciones</h5>
                <ul className="w3-ul w3-small">
                  <li>Layout horizontal primario</li>
                  <li>Wrapping automático</li>
                  <li>Altura automática</li>
                  <li>Alineación flex-start</li>
                </ul>
              </div>
              
              <div className="w3-col l4 m12">
                <h5 className="w3-text-purple">🎯 Casos de Uso</h5>
                <ul className="w3-ul w3-small">
                  <li>Galerías dinámicas</li>
                  <li>Dashboards</li>
                  <li>Portfolios</li>
                  <li>Catálogos de productos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlexMasonryDemo_1;