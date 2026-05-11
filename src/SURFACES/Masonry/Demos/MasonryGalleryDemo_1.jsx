import React from 'react';
import MasonryContainer from '../MasonryContainer/MasonryContainer' // Ajusta la ruta según tu estructura
import MasonryCard from '../MasonryContainer/MasonryCard'; // Ajusta la ruta según tu estructura

const MasonryGalleryDemo_1 = () => {
  const cards = [
    {
      id: 1,
      title: "Proyecto Azul",
      description: "Una descripción breve del proyecto que muestra el contenido elegante.",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
      height: "8rem",
      tags: [{ text: "Nuevo", color: "w3-blue" }]
    },
    {
      id: 2,
      title: "Diseño Coral",
      description: "Este es un ejemplo de tarjeta más alta para demostrar el efecto de mampostería. El contenido se adapta automáticamente con estilo.",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)",
      height: "12rem",
      tags: [
        { text: "Destacado", color: "w3-red" },
        { text: "Popular", color: "w3-pink" }
      ]
    },
    {
      id: 3,
      title: "Verde Natural",
      description: "Tarjeta compacta con diseño minimalista.",
      gradient: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
      height: "6rem",
      tags: []
    },
    {
      id: 4,
      title: "Morado Elegante",
      description: "Un diseño intermedio que demuestra la flexibilidad del layout de mampostería.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)",
      height: "10rem",
      tags: [
        { text: "CSS", color: "w3-purple" },
        { text: "Responsive", color: "w3-grey" }
      ]
    },
    {
      id: 5,
      title: "Atardecer Dorado",
      description: "Esta es una tarjeta más alta que incluye más contenido para mostrar cómo se distribuyen los elementos en el diseño de mampostería. El sistema automáticamente organiza las tarjetas.",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
      height: "14rem",
      tags: [],
      hasButton: true
    },
    {
      id: 6,
      title: "Agua Cristalina",
      description: "Ejemplo de diseño con altura media y contenido equilibrado perfecto.",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #1d4ed8 100%)",
      height: "9rem",
      tags: [{ text: "Fresco", color: "w3-cyan" }]
    },
    {
      id: 7,
      title: "Índigo Profundo",
      description: "Tarjeta simple y elegante con toques profesionales.",
      gradient: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
      height: "7rem",
      tags: []
    },
    {
      id: 8,
      title: "Rosa Vibrante",
      description: "Un diseño que combina colores vibrantes con contenido informativo para crear una experiencia visual atractiva y moderna.",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)",
      height: "11rem",
      tags: [
        { text: "Arte", color: "w3-pink" },
        { text: "Diseño", color: "w3-grey" }
      ]
    },
    {
      id: 9,
      title: "Lima Fresca",
      description: "Perfecta para mostrar la distribución automática elegante.",
      gradient: "linear-gradient(135deg, #84cc16 0%, #059669 100%)",
      height: "8rem",
      tags: [{ text: "Ecológico", color: "w3-light-green" }]
    },
    {
      id: 10,
      title: "Violeta Místico",
      description: "Esta tarjeta demuestra cómo el contenido de diferentes alturas se organiza de manera fluida en el layout de mampostería, creando un diseño visualmente equilibrado y atractivo.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)",
      height: "13rem",
      tags: [{ text: "Premium", color: "w3-deep-purple" }],
      hasExploreButton: true
    },
    {
      id: 11,
      title: "Elegancia Oscura",
      description: "Diseño sofisticado con tonos neutros que transmite profesionalismo y modernidad.",
      gradient: "linear-gradient(135deg, #475569 0%, #374151 100%)",
      height: "9.5rem",
      tags: [
        { text: "Minimalista", color: "w3-grey" },
        { text: "Moderno", color: "w3-blue-grey" }
      ]
    },
    {
      id: 12,
      title: "Energía Solar",
      description: "Una combinación vibrante que evoca la energía del sol y la calidez, perfecta para proyectos dinámicos y creativos.",
      gradient: "linear-gradient(135deg, #facc15 0%, #dc2626 100%)",
      height: "11.5rem",
      tags: [{ text: "Energético", color: "w3-yellow" }],
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
      `}</style>
      
      <div className="main-gradient">
        <div className="w3-container w3-padding-large">
          <h1 className="w3-center w3-margin-bottom title-gradient" 
              style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '4rem' }}>
            Galería Mampostería
          </h1>
          
          <MasonryContainer 
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            gap="1.5rem"
            containerPadding="1.5rem"
          >
            {cards.map((card) => (
              <MasonryCard
                key={card.id}
                title={card.title}
                gradient={card.gradient}
                height={card.height}
                hover={true}
              >
                <p className="w3-text-grey w3-small w3-margin-bottom" style={{ lineHeight: '1.6' }}>
                  {card.description}
                </p>
                
                {/* Botón principal para tarjeta 5 */}
                {card.hasButton && (
                  <button className="w3-button w3-round w3-text-white btn-gradient w3-block w3-margin-top" 
                          style={{ fontWeight: '500', padding: '12px' }}>
                    Ver más detalles
                  </button>
                )}
                
                {/* Botón explorar para tarjeta 10 */}
                {card.hasExploreButton && (
                  <div className="w3-row w3-margin-top">
                    <div className="w3-col s6">
                      {card.tags.map((tag, index) => (
                        <span key={index} className={`tag ${tag.color} w3-round-large`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <button className="explore-btn w3-button w3-round w3-small">
                        Explorar →
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Botón activar para tarjeta 12 */}
                {card.hasActivateButton && (
                  <div className="w3-row w3-margin-top">
                    <div className="w3-col s6">
                      {card.tags.map((tag, index) => (
                        <span key={index} className={`tag ${tag.color} w3-round-large`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <button className="w3-button w3-round w3-text-white btn-yellow-gradient w3-small" 
                              style={{ padding: '8px 16px' }}>
                        Activar
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Tags normales para el resto de tarjetas */}
                {!card.hasButton && !card.hasExploreButton && !card.hasActivateButton && card.tags.length > 0 && (
                  <div className="w3-margin-top">
                    {card.tags.length <= 2 ? (
                      <div className="w3-row">
                        {card.tags.map((tag, index) => (
                          <div key={index} className={card.tags.length === 2 ? "w3-col s6" : ""}>
                            <span className={`tag ${tag.color} w3-round-large ${card.tags.length === 2 ? 'w3-center w3-block' : ''}`}>
                              {tag.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {card.tags.map((tag, index) => (
                          <span key={index} className={`tag ${tag.color} w3-round-large w3-margin-right`}>
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </MasonryCard>
            ))}
          </MasonryContainer>
        </div>
      </div>
    </>
  );
};

export default MasonryGalleryDemo_1;