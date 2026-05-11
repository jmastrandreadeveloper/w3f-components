import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton'; // Asegúrate de ajustar la ruta

const ProfileCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simula una llamada a la API que dura 3 segundos
    setTimeout(() => {
      setData({
        name: "Elon Musk",
        bio: "Ingeniero, diseñador industrial, inversor y magnate empresarial.",
        image: "https://www.w3schools.com/w3images/avatar2.png" // URL de ejemplo
      });
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="w3-card-4 w3-margin card-example" style={{ maxWidth: '300px' }}>
      
      {/* Si está cargando, muestra el Skeleton. 
        Si no, muestra el contenido real.
      */}
      {isLoading ? (
  // Vista del Skeleton (Placeholder)
  <div className="w3-padding">
    {/* ... (Avatar y Título Skeletons aquí) ... */}

    {/* 🔥 SOLUCIÓN APLICADA: Usamos <div> en lugar de <p> */}
    <div className="w3-small"> 
      {/* Líneas de Texto Skeleton */}
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="95%" />
      <Skeleton variant="text" width="80%" />
    </div>
    
    {/* ... (Botón/Banner Skeleton aquí) ... */}
  </div>
) : (
  // ... (Contenido real aquí) ...
  <div className="w3-padding w3-animate-opacity">
    {/* ... (Contenido real del perfil aquí) ... */}
    
    {/* Por consistencia, también usamos <div> para el texto real */}
    <div className="w3-small"> 
      {data.bio}
    </div>
    
    {/* ... (Botón real aquí) ... */}
  </div>
)}

    </div>
  );
};

export default ProfileCard;

// Ejemplo de cómo usarías la tarjeta en tu App.
// function App() { return <ProfileCard />; }