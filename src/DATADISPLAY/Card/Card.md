Resumen de Mejoras Implementadas
He mejorado significativamente el componente Card y su hoja de estilos. Aquí están las mejoras principales:
Componente Card.jsx:

Nuevas Props:

variant: 4 variantes visuales (default, elevated, outlined, filled)
size: 3 tamaños predefinidos (sm, md, lg)
imagePosition: Posiciona la imagen (top, bottom, left, right)
hoverable: Efecto hover elevado
clickable y onClick: Tarjetas interactivas
badge: Etiquetas/badges en la esquina
actionsAlign: Alineación flexible de botones
fullWidth: Ancho completo


Accesibilidad:

Soporte para teclado (Enter/Space)
Roles ARIA apropiados
TabIndex para navegación
Lazy loading en imágenes


Flexibilidad:

Layout horizontal/vertical
Classes CSS adicionales para personalización
Estilos inline opcionales
PropTypes para validación



Hoja de Estilos _card.css:

Variantes Visuales:

4 estilos diferentes para diferentes contextos
Estados interactivos (hover, active, focus)


Responsive:

Breakpoints para tablet y mobile
Layout horizontal se convierte en vertical en móviles


Características Adicionales:

Estado de loading con shimmer effect
Estado deshabilitado
Variante con imagen de fondo (overlay)
Animaciones suaves
Versión compacta


Layout Horizontal:

Soporte completo para imágenes laterales
Ajustes automáticos de proporciones



Ventajas del Nuevo Diseño:
✅ Más versátil - Múltiples variantes y tamaños
✅ Mejor UX - Interacciones y animaciones fluidas
✅ Accesible - Cumple con estándares WCAG
✅ Responsive - Se adapta a todos los dispositivos
✅ Mantenible - Código limpio y bien documentado
✅ Extensible - Fácil de personalizar y extender
El componente ahora es mucho más potente y flexible, manteniendo la simplicidad de uso para casos básicos mientras permite personalización avanzada cuando se necesita.

📋 Guía Completa: Card + Badge + Button
🎯 Visión General
El componente Card está totalmente integrado con los componentes Badge y Button existentes, proporcionando una API consistente y flexible.

🏷️ Usando Badges en Cards
Opción 1: Badge con Objeto de Props (⭐ Recomendado)
La forma más flexible y potente:
jsx<Card
  title="Producto en Oferta"
  badge={{
    children: '-50%',
    color: 'danger',
    size: 'md',
    variant: 'solid',
    pulse: true,
    animate: true
  }}
/>
Props disponibles:

children o content: Contenido del badge
color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray'
size: 'sm' | 'md' | 'lg'
variant: 'solid' | 'outline' | 'soft' | 'dot'
pulse: boolean - Animación de pulso
animate: boolean - Animación de entrada
max: number - Número máximo (para contadores)
invisible: boolean - Ocultar badge

Opción 2: Badge Numérico
Para contadores y notificaciones:
jsx<Card
  title="Notificaciones"
  badge={{
    children: 15,
    color: 'danger',
    pulse: true,
    max: 99  // Mostrará "99+" si children > 99
  }}
/>
Opción 3: Badge Tipo Dot (Indicador)
Para indicadores de estado:
jsx<Card
  title="Usuario Activo"
  badge={{
    variant: 'dot',
    color: 'success',
    pulse: true
  }}
/>
Opción 4: Badge como Componente React
Para control total:
jsx<Card
  title="Premium Content"
  badge={
    <Badge color="warning" size="lg" variant="soft">
      ⭐ Premium
    </Badge>
  }
/>
Opción 5: Badge Simple (String/Number)
Para casos muy simples:
jsx<Card
  title="Nuevo"
  badge="NEW"  // Se convierte en <Badge>NEW</Badge>
/>

<Card
  title="Contador"
  badge={42}  // Se convierte en <Badge>42</Badge>
/>

🔘 Usando Botones en Cards
Opción 1: Array de Botones (⭐ Recomendado)
Genera botones automáticamente usando el componente Button:
jsx<Card
  title="Confirmar Acción"
  buttons={[
    {
      text: 'Confirmar',
      variant: 'raised',
      color: 'primary',
      onClick: () => console.log('Confirmado')
    },
    {
      text: 'Cancelar',
      variant: 'outlined',
      color: 'secondary',
      onClick: () => console.log('Cancelado')
    }
  ]}
/>
Props disponibles para cada botón:
jsx{
  // Contenido
  text: 'Texto del botón',  // o usar 'children'
  children: 'Alternativo',
  
  // Estilo
  variant: 'raised' | 'outlined' | 'flat' | 'text',
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info',
  size: 'sm' | 'md' | 'lg',
  
  // Iconos
  icon: '💾',  // Emoji, SVG, o componente
  iconPosition: 'left' | 'right',
  
  // Comportamiento
  onClick: (e) => {},
  type: 'button' | 'submit' | 'reset',
  disabled: false,
  
  // Layout
  fullWidth: false,
  
  // Identificación
  key: 'unique-key',  // Opcional, para React keys
  
  // Otros
  className: 'custom-class',
  style: { /* estilos inline */ }
}
Opción 2: Botones con Iconos
jsx<Card
  title="Acciones"
  buttons={[
    {
      text: 'Guardar',
      icon: '💾',
      iconPosition: 'left',
      variant: 'raised',
      color: 'primary'
    },
    {
      text: 'Compartir',
      icon: '🔗',
      iconPosition: 'right',
      variant: 'outlined',
      color: 'info'
    }
  ]}
/>
Opción 3: Botón Full Width
jsx<Card
  title="Producto"
  buttons={[
    {
      text: 'Agregar al Carrito',
      variant: 'raised',
      color: 'primary',
      fullWidth: true,
      icon: '🛒',
      iconPosition: 'left'
    }
  ]}
/>
Opción 4: Acciones Personalizadas (Componentes Directos)
Para mayor control, usa el prop actions con componentes Button:
jsx<Card
  title="Panel Avanzado"
  actions={
    <>
      <Button variant="raised" color="primary" icon="💾">
        Guardar
      </Button>
      <Button variant="outlined" color="secondary">
        Restaurar
      </Button>
      <Button variant="text" color="danger">
        Eliminar
      </Button>
    </>
  }
/>
⚠️ Nota: Si usas actions, el prop buttons será ignorado.

🎨 Alineación de Acciones
Controla cómo se alinean los botones:
jsx{/* Inicio (default) */}
<Card actionsAlign="start" buttons={[...]} />

{/* Centro */}
<Card actionsAlign="center" buttons={[...]} />

{/* Final */}
<Card actionsAlign="end" buttons={[...]} />

{/* Espaciado entre botones */}
<Card actionsAlign="space-between" buttons={[...]} />

📝 Ejemplos Completos
Ejemplo 1: Card de Producto
jsx<Card
  variant="elevated"
  hoverable
  imageSrc="/product.jpg"
  imageAlt="Laptop Gaming"
  badge={{
    children: '-30%',
    color: 'danger',
    size: 'md',
    pulse: true
  }}
  content={
    <div>
      <h4>Laptop Gaming Pro</h4>
      <p>Intel i7, RTX 4060, 16GB RAM</p>
      <div>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          $1,299
        </span>
        <span style={{ textDecoration: 'line-through' }}>
          $1,599
        </span>
      </div>
    </div>
  }
  buttons={[
    {
      text: 'Agregar al Carrito',
      variant: 'raised',
      color: 'primary',
      fullWidth: true,
      icon: '🛒',
      iconPosition: 'left',
      onClick: () => console.log('Added to cart')
    }
  ]}
/>
Ejemplo 2: Card de Perfil con Estado
jsx<Card
  variant="outlined"
  badge={{
    variant: 'dot',
    color: 'success',
    pulse: true
  }}
  content={
    <div style={{ textAlign: 'center' }}>
      <img src="/avatar.jpg" alt="User" style={{ borderRadius: '50%' }} />
      <h3>María González</h3>
      <p>Diseñadora UX/UI</p>
      <div>
        <Badge color="primary" variant="soft" size="sm">Pro</Badge>
        <Badge color="warning" variant="soft" size="sm">Verificado</Badge>
      </div>
    </div>
  }
  buttons={[
    {
      text: 'Seguir',
      variant: 'raised',
      color: 'primary',
      style: { flex: 1 }
    },
    {
      text: 'Mensaje',
      variant: 'outlined',
      color: 'secondary',
      style: { flex: 1 }
    }
  ]}
  actionsAlign="space-between"
/>
Ejemplo 3: Card de Notificaciones
jsx<Card
  variant="outlined"
  title="Mensajes Pendientes"
  badge={{
    children: 12,
    color: 'danger',
    pulse: true,
    max: 99
  }}
  content={
    <div>
      <p>Tienes 12 mensajes sin leer.</p>
      <ul>
        <li>3 mensajes de María</li>
        <li>5 mensajes de Juan</li>
        <li>4 mensajes de Soporte</li>
      </ul>
    </div>
  }
  buttons={[
    {
      text: 'Ver Todos',
      variant: 'raised',
      color: 'primary',
      fullWidth: true
    },
    {
      text: 'Marcar como Leído',
      variant: 'text',
      color: 'secondary',
      fullWidth: true
    }
  ]}
/>
Ejemplo 4: Card Horizontal con Todo
jsx<Card
  imageSrc="/article.jpg"
  imagePosition="left"
  title="Nuevo Artículo"
  subtitle="Hace 2 horas"
  badge={{
    children: 'Trending',
    color: 'warning',
    size: 'sm',
    variant: 'soft'
  }}
  content={
    <p>Descubre las últimas tendencias en desarrollo web.</p>
  }
  buttons={[
    {
      text: 'Leer Artículo',
      variant: 'raised',
      color: 'primary',
      icon: '📖',
      iconPosition: 'left'
    },
    {
      text: '❤️',
      variant: 'text',
      color: 'danger'
    }
  ]}
/>

✅ Mejores Prácticas
DO (Hacer) ✓

Usa badge con objeto para mayor control:

jsx   badge={{ children: '-50%', color: 'danger', pulse: true }}

Usa buttons array para casos comunes:

jsx   buttons={[{ text: 'OK', variant: 'raised', color: 'primary' }]}

Usa actions solo cuando necesites control total:

jsx   actions={<Button {...customProps}>Custom</Button>}

Proporciona onClick a los botones:

jsx   buttons={[{ text: 'Click', onClick: () => console.log('Clicked') }]}

Usa max para contadores grandes:

jsx   badge={{ children: 150, max: 99 }}  // Muestra "99+"
DON'T (Evitar) ✗

No mezcles actions y buttons:

jsx   {/* ✗ Solo uno será usado */}
   <Card actions={...} buttons={[...]} />

No uses demasiados botones:

jsx   {/* ✗ Máximo 2-3 botones */}
   buttons={[btn1, btn2, btn3, btn4, btn5]}

No olvides key en listas dinámicas:

jsx   {/* ✗ Sin key único */}
   buttons={items.map(item => ({ text: item.name }))}
   
   {/* ✓ Con key único */}
   buttons={items.map(item => ({ text: item.name, key: item.id }))}

No uses badge sin contenido (excepto variant='dot'):

jsx   {/* ✗ Badge vacío */}
   badge={{ color: 'primary' }}
   
   {/* ✓ Con contenido o dot */}
   badge={{ children: 'NEW', color: 'primary' }}
   badge={{ variant: 'dot', color: 'success' }}

🔧 Comparación: buttons vs actions
Característicabuttons (Array)actions (JSX)Simplicidad⭐⭐⭐⭐⭐ Muy simple⭐⭐⭐ ModeradoConsistencia⭐⭐⭐⭐⭐ Automática⭐⭐⭐ ManualFlexibilidad⭐⭐⭐ Limitado a Button⭐⭐⭐⭐⭐ Cualquier JSXControl⭐⭐⭐ Props de Button⭐⭐⭐⭐⭐ TotalUso RecomendadoCasos comunes (90%)Casos especiales (10%)

🎯 Resumen Rápido
Badge en Card:
jsx// Simple
badge="NEW"

// Con props
badge={{ children: '-50%', color: 'danger', pulse: true }}

// Componente
badge={<Badge color="success">Online</Badge>}
Botones en Card:
jsx// Array (recomendado)
buttons={[
  { text: 'OK', variant: 'raised', color: 'primary', onClick: handleOk }
]}

// JSX directo (control total)
actions={
  <>
    <Button variant="raised" color="primary">OK</Button>
    <Button variant="outlined">Cancel</Button>
  </>
}

📚 Referencias

Componente Badge
Componente Button
Componente Card Base
Variables CSS W3Fusion

🎉 Refactorización Completa
He refactorizado exitosamente el componente Card para integrar completamente los componentes Badge y Button existentes. Aquí está el resumen:
✨ Características Principales
1. Integración con Badge 🏷️
El Card ahora soporta 5 formas de usar badges:

Objeto de props (⭐ Recomendado):

jsx   badge={{ children: '-50%', color: 'danger', pulse: true }}

Numérico con contador automático:

jsx   badge={{ children: 150, max: 99 }}  // Muestra "99+"

Tipo dot para indicadores:

jsx   badge={{ variant: 'dot', color: 'success', pulse: true }}

Componente React para control total:

jsx   badge={<Badge color="warning" size="lg">⭐ Premium</Badge>}

Simple (string/número):

jsx   badge="NEW"  o  badge={42}
2. Integración con Button 🔘
El Card ahora soporta 2 formas de usar botones:

Array de botones (⭐ Recomendado) - Genera botones automáticamente:

jsx   buttons={[
     { text: 'OK', variant: 'raised', color: 'primary', onClick: handleOk },
     { text: 'Cancel', variant: 'outlined', color: 'secondary' }
   ]}

JSX directo - Para control total:

jsx   actions={
     <>
       <Button variant="raised" color="primary">OK</Button>
       <Button variant="text" color="danger">Delete</Button>
     </>
   }
🎯 Ventajas del Nuevo Diseño
✅ Reutilización Total: No duplica código, usa Badge y Button existentes
✅ Consistencia Visual: Todos los badges y botones se ven igual en toda la app
✅ API Flexible: Simple para casos comunes, potente para casos avanzados
✅ Mantenibilidad: Cambios en Badge/Button se reflejan automáticamente
✅ TypeScript Ready: PropTypes completos para validación
✅ Accesibilidad: Maneja correctamente clicks en elementos interactivos
🔧 Mejoras Técnicas

Click handling inteligente: No interfiere con clicks en botones dentro del card
Props completos: Todas las props de Badge y Button disponibles
Validación robusta: PropTypes detallados para desarrollo seguro
Ejemplos extensos: Más de 20 ejemplos prácticos incluidos
Documentación completa: Guía detallada con mejores prácticas

¡El componente Card ahora es completamente modular y mantiene la coherencia con todo el sistema de diseño W3Fusion! 🚀