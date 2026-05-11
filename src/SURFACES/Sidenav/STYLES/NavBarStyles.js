// NavBarStyles.js
// Archivo de estilos único y centralizado para NavBar y Tree.

// Variables CSS traducidas a constantes JS para colores
const COLORS = {
    base: '#11121a',
    line: '#42434a',
    hover: '#222533', // Usado para fondo de botón y hover de nodo
    text: '#e6e6ef',
    accent: '#5e63ff',
    secondaryText: '#b0b3c1',
    warning: '#ffc107',
};

// Función helper para combinar estilos (exportada para su uso)
export const combineStyles = (...styles) => {
    return Object.assign({}, ...styles);
};

export const navBarStyles = {
    // -------------------------------------------------------------------------
    // ESTILOS DEL NAVBAR (COMPONENTES PADRE)
    // -------------------------------------------------------------------------
    container: {
        margin: '0 auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    
    // alert: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     gap: '12px',
    //     padding: '16px',
    //     borderRadius: '8px',
    //     marginBottom: '10px',
    //     fontSize: '10px',
    //     fontWeight: '500'
    // },
    
    // -------------------------------------------------------------------------
    // ESTILOS DEL ÁRBOL (w3-tree-styles)
    // -------------------------------------------------------------------------
   
    // w3-tree-container: Marco del panel principal
    w3TreeContainer: {
        // Los estilos de ancho/margen se han comentado en el original, 
        // pero se incluyen los estilos de fondo del CSS
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: COLORS.base,
        marginBottom: '0.5em',
    },

    // w3-tree-controls: Cabecera integrada en el panel
    w3TreeControls: {
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        padding: '1em',
        backgroundColor: COLORS.base,
        borderBottom: `1px solid ${COLORS.line}`,
        borderTopLeftRadius: '1em',
        borderTopRightRadius: '1em',
        flexWrap: 'wrap',
    },

    // w3-tree-simple-btn: Estilo base del botón - ¡MODIFICADO A CIRCULAR!
    w3TreeSimpleBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Centra el contenido (icono)
        width: '36px',         // Ancho fijo
        height: '36px',        // Alto fijo para formar un círculo
        padding: '0',          // Eliminar padding para que el tamaño sea preciso
        backgroundColor: COLORS.hover,
        color: COLORS.text,
        border: `1px solid ${COLORS.line}`,
        borderRadius: '50%',   // ¡Hacerlo circular!
        fontFamily: 'inherit',
        fontSize: '0.2em', 
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        flexShrink: 0, // Evita que el botón se achique
    },
    
    // Estilo de hover para el botón (debe usarse con estado en React)
    w3TreeSimpleBtnHover: {
        backgroundColor: COLORS.line, 
        transform: 'translateY(-1px)',
    },

    // Nuevo estilo para el icono dentro del botón circular
    w3TreeSimpleBtnIcon: {
        width: '20px', // Tamaño del icono
        height: '20px',
        fill: 'currentColor', // Hereda el color del texto del botón
    },

    // Estos estilos no se usarán si el botón es solo un icono, pero los mantengo por si acaso
    w3TreeSimpleBtnLabel: {
        display: 'none', // Oculta el texto si solo queremos el icono
        // O si quieres mostrarlo en el futuro, podrías hacer:
        // display: 'flex',
        // alignItems: 'baseline',
        // gap: '4px',
    },

    w3TreeSimpleBtnCount: {
        display: 'none', // Oculta el contador
    },
    
    // w3-tree-main: Cuerpo del panel (Contenido principal)
    w3TreeMain: {
        backgroundColor: '#25135cff',
        padding: '0.005em', // Coincide con el CSS
    },

    // w3-tree-list: Lista raíz
    w3TreeList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },

    w3TreeItem: {
        margin: 0,
    },

    // w3-tree-node: Fila del nodo
    w3TreeNode: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.005em',
        padding: '0.1em 0.3em',
        borderRadius: '0.5em',
        transition: 'background-color 200ms ease',
        color: COLORS.text,
        fontSize: '0.9em', // O el valor que desees (e.g., '0.9em', '16px')        
    },

    w3TreeNodeClickable: {
        cursor: 'pointer',
    },
    
    // Estilo de hover para el nodo (debe usarse con estado en React)
    w3TreeNodeHover: {
        backgroundColor: COLORS.hover, // Coincide con el CSS
    },
    
    // Estilo para el icono dentro del nodo
    w3TreeIcon: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        // Los estilos SVG internos (fill: var(--w3-text-clr)) se aplican mejor en el SVG mismo
    },
    
    // Estilo para el toggle dentro del nodo
    w3TreeToggle: {
        width: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        // Los estilos SVG internos (fill: var(--w3-secondary-text-clr)) se aplican mejor en el SVG mismo
    },

    w3TreeNameFolder: {
        fontWeight: '600',
        color: COLORS.accent,
        flexGrow: 1,
    },

    w3TreeNameFile: {
        fontWeight: '400',
        color: COLORS.text,
        flexGrow: 1,
    },

    // w3-tree-submenu: Contenedor de sub-lista
    w3TreeSubmenu: {
        display: 'grid',
        gridTemplateRows: '0fr',
        transition: 'grid-template-rows 300ms ease-in-out',
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    
    // w3-tree-submenu-show (para la animación)
    w3TreeSubmenuShow: {
        gridTemplateRows: '1.0fr',
    },
    
    // Estilos para el div dentro del w3-tree-submenu que maneja el borde y el padding
    // Estos requieren una aplicación condicional en el componente TreeNode.jsx
    w3TreeSubmenuInnerDiv: {
        overflow: 'hidden',
        borderLeft: `2px solid ${COLORS.line}`,
        marginLeft: '0.6em',
    },
    
    // Estilo para el nodo dentro de un submenu (padding-left ajustado)
    w3TreeSubmenuNode: {
        paddingLeft: '2.5em',
    },

    // w3-tree-alert: Estilo base
    w3TreeAlert: {
        display: 'flex',
        alignItems: 'center',
        gap: '1em',
        padding: '1.5em',
        borderRadius: '0.8em',
        marginBottom: '1em',
        borderLeft: '4px solid',
    },

    // w3-tree-alert-warning: Variante de advertencia
    w3TreeAlertWarning: {
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderLeftColor: COLORS.warning,
        color: COLORS.warning,
    },
};