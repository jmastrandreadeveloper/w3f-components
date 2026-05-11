import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton'; // Asumiendo que Skeleton.jsx está en el mismo directorio

const SkeletonDemo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simula la obtención de datos de una API
    setTimeout(() => {
      setData({
        name: "React Skeleton",
        title: "Usando W3.CSS y filosofía MUI",
        bio: "Componente de carga progresiva que mejora la experiencia del usuario (UX) al evitar spinners y mostrar el diseño de la interfaz antes de que los datos estén listos.",
        image: "https://www.w3schools.com/w3images/avatar2.png" 
      });
      setIsLoading(false); // Cambia el estado a contenido cargado
    }, 3000); // 3 segundos de "carga"
  }, []);

  return (
    <div className="w3-card-4 card-example">
      <div className="w3-container">
        
        {/*
          --- IMPLEMENTACIÓN DE LA FILOSOFÍA MUI ---
          Si está cargando, muestra el Skeleton. Si no, el contenido real.
        */}
        
        {isLoading ? (
          // Vista del Skeleton (Placeholder)
          <div className="w3-padding">
            <div className="w3-center w3-margin-bottom">
              {/* Skeleton Circular (Avatar) */}
              <Skeleton variant="circular" width="80px" height="80px" />
            </div>
            {/* Skeleton para Título */}
            <h4 className="w3-border-bottom w3-padding-small">
              <Skeleton variant="text" width="75%" height="1.5em" />
            </h4>
            {/* Skeleton para Párrafo (usando varias líneas de texto) */}
            <p className="w3-small">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="95%" />
              <Skeleton variant="text" width="80%" />
            </p>
            {/* Skeleton Rectangular (Botón o Banner) */}
            <div className="w3-center w3-margin-top w3-padding">
              <Skeleton variant="rectangular" width="120px" height="35px" />
            </div>
          </div>

        ) : (
          // Vista del Contenido Real
          <div className="w3-padding w3-animate-opacity"> 
            <div className="w3-center w3-margin-bottom">
              <img src={data.image} alt="Avatar" className="w3-circle" style={{ width: '80px', height: '80px' }} />
            </div>
            <h4 className="w3-border-bottom w3-padding-small">
              <b>{data.name}</b>
              <br/>
              <span className="w3-opacity w3-small">{data.title}</span>
            </h4>
            <p className="w3-small">
              {data.bio}
            </p>
            <div className="w3-center w3-margin-top w3-padding">
              <button className="w3-button w3-blue w3-round">Ver Perfil</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SkeletonDemo;