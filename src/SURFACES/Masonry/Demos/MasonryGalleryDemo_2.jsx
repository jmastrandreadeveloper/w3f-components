import React from 'react';
import MasonryContainer from '../MasonryContainer/MasonryContainer' // Ajusta la ruta según tu estructura
import MasonryCard from '../MasonryContainer/MasonryCard'; // Ajusta la ruta según tu estructura

// Demo de Uso del Componente Modular
const MasonryGalleryDemo_2 = () => {
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
        
        .custom-content {
          padding: 20px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          border-radius: 12px;
          text-align: center;
        }
        
        .info-box {
          background: #f0f9ff;
          border-left: 4px solid #0ea5e9;
          padding: 16px;
          border-radius: 8px;
        }
      `}</style>
      
      <div className="main-gradient">
        <div className="w3-container w3-padding-large">
          <h1 className="w3-center w3-margin-bottom title-gradient" 
              style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '4rem' }}>
            Contenedor Mampostería Modular
          </h1>
          
          {/* Ejemplo 1: Usando el contenedor con diferentes tipos de contenido */}
          <h2 className="w3-text-dark-grey w3-margin-bottom">Ejemplo 1: Contenido Mixto</h2>
          <MasonryContainer gap="1rem" containerPadding="0">
            
            {/* Tarjeta con componente MasonryCard */}
            <MasonryCard 
              title="Tarjeta Modular"
              gradient="linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)"
              height="6rem"
            >
              <p className="w3-text-grey w3-small">Esta es una tarjeta creada con el componente MasonryCard.</p>
              <span className="w3-tag w3-blue w3-round">Modular</span>
            </MasonryCard>

            {/* Contenido personalizado directo */}
            <div className="custom-content">
              <h3>Contenido Personalizado</h3>
              <p>¡Cualquier elemento puede ir aquí!</p>
              <button className="w3-button w3-white w3-text-black w3-round">Click me</button>
            </div>

            {/* Una imagen simple */}
            <div className="w3-card-4 w3-white w3-round">
              <div style={{
                height: '200px',
                background: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
                borderRadius: '8px 8px 0 0'
              }}></div>
              <div className="w3-container w3-padding">
                <h4>Imagen Placeholder</h4>
                <p className="w3-text-grey">Contenido de imagen simulado</p>
              </div>
            </div>

            {/* Caja de información */}
            <div className="info-box">
              <h4 className="w3-text-blue">💡 Consejo</h4>
              <p>Este contenedor puede aceptar cualquier tipo de elemento React como children.</p>
            </div>

            {/* Lista de elementos */}
            <div className="w3-card-4 w3-white w3-round w3-padding">
              <h4 className="w3-text-dark-grey">Lista de Características</h4>
              <ul className="w3-ul">
                <li>✅ Completamente modular</li>
                <li>✅ Responsive automático</li>
                <li>✅ Acepta cualquier contenido</li>
                <li>✅ Configurable</li>
              </ul>
            </div>

            {/* Formulario pequeño */}
            <div className="w3-card-4 w3-white w3-round w3-padding">
              <h4 className="w3-text-dark-grey">Mini Formulario</h4>
              <input className="w3-input w3-border w3-round w3-margin-bottom" placeholder="Tu nombre" />
              <input className="w3-input w3-border w3-round w3-margin-bottom" placeholder="Tu email" />
              <button className="w3-button w3-blue w3-round w3-block">Enviar</button>
            </div>

            {/* Elemento con altura variable */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3>Elemento Alto</h3>
              <p>Este elemento tiene más contenido para demostrar cómo se acomoda automáticamente en el layout de mampostería.</p>
              <p>El contenido se distribuye de forma equilibrada sin necesidad de configuración adicional.</p>
              <div style={{ marginTop: '1rem' }}>
                <span className="w3-tag w3-white w3-text-purple w3-round w3-margin-right">Tag 1</span>
                <span className="w3-tag w3-white w3-text-purple w3-round">Tag 2</span>
              </div>
            </div>

            {/* Tarjeta con botones */}
            <MasonryCard 
              title="Acciones Rápidas"
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              height="5rem"
            >
              <div className="w3-row w3-margin-top">
                <div className="w3-col s6">
                  <button className="w3-button w3-pink w3-round w3-small w3-block">Acción 1</button>
                </div>
                <div className="w3-col s6">
                  <button className="w3-button w3-red w3-round w3-small w3-block">Acción 2</button>
                </div>
              </div>
            </MasonryCard>

          </MasonryContainer>

          {/* Ejemplo 2: Configuración personalizada */}
          <h2 className="w3-text-dark-grey w3-margin-top w3-margin-bottom">Ejemplo 2: Configuración Personalizada</h2>
          <MasonryContainer 
            columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
            gap="0.5rem"
            containerPadding="0"
            className="w3-margin-bottom"
          >
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="w3-card-2 w3-white w3-round w3-padding w3-center">
                <h5 className="w3-text-grey">Item {i + 1}</h5>
                <p className="w3-tiny">Contenido breve</p>
              </div>
            ))}
          </MasonryContainer>

          {/* Documentación de uso */}
          <div className="w3-card-4 w3-white w3-round w3-padding w3-margin-top">
            <h3 className="w3-text-dark-grey">📖 Cómo usar el componente</h3>
            <div className="w3-code w3-light-grey w3-round w3-margin">
{`// Uso básico
<MasonryContainer>
  <div>Contenido 1</div>
  <div>Contenido 2</div>
  <div>Contenido 3</div>
</MasonryContainer>

// Con configuración personalizada
<MasonryContainer 
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gap="2rem"
  containerPadding="1rem"
>
  {/* Tu contenido aquí */}
</MasonryContainer>`}
            </div>
            
            <h4 className="w3-text-dark-grey">Propiedades disponibles:</h4>
            <ul className="w3-ul w3-border">
              <li><strong>children:</strong> Cualquier contenido React</li>
              <li><strong>columns:</strong> Objeto con breakpoints {`{xs, sm, md, lg}`}</li>
              <li><strong>gap:</strong> Espaciado entre elementos (ej: '1rem')</li>
              <li><strong>containerPadding:</strong> Padding del contenedor</li>
              <li><strong>className:</strong> Clases CSS adicionales</li>
              <li><strong>itemClassName:</strong> Clase para cada item</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasonryGalleryDemo_2;