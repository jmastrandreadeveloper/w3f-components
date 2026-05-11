import type { IconSizeName, IconColorName } from './Icon.types';

/**
 * Tamaños predefinidos para los iconos
 */
export const IconSizes: Record<IconSizeName, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
};

/**
 * Usamos las variables CSS del framework (w3f)
 * para mantener una única fuente de verdad.
 */
export const IconColors: Record<IconColorName, string> = {
    default: 'currentColor',
    primary: 'var(--w3f-primary)',
    secondary: 'var(--w3f-secondary)',
    success: 'var(--w3f-success)',
    danger: 'var(--w3f-danger)',
    warning: 'var(--w3f-warning)',
    info: 'var(--w3f-info)',
    light: 'var(--w3f-on-primary)',
    dark: 'var(--w3f-gray-800)',
    white: '#ffffff',
    black: '#000000',
    gray: 'var(--w3f-gray-500)',
};

/**
 * Mapeo de nombres alternativos o aliases para iconos.
 * Permite usar nombres cortos en los componentes.
 */
export const IconAliases: Record<string, string> = {
    // Navegación
    'house': 'Home',
    'inicio': 'Home',
    'home-icon': 'Home',

    // Acciones
    'love': 'Heart',
    'like': 'Heart',
    'favorite': 'Heart',
    'corazon': 'Heart',
    'settings': 'Settings',
    'config': 'Settings',
    'configuracion': 'Settings',

    // Campos de usuario
    'user': 'User',
    'profile': 'User',
    'perfil': 'User',
    'account': 'User',
    'username': 'User',

    // Comunicación y campos
    'search': 'Search',
    'buscar': 'Search',
    'lupa': 'Search',
    'mail': 'Mail',
    'email': 'Mail',
    'phone': 'Phone',
    'tel': 'Phone',

    // Seguridad
    'password': 'Lock',
    'lock-icon': 'Lock',
    'key': 'Key',
    'show-pass': 'Eye',
    'hide-pass': 'EyeOff',

    // Contenido/Texto
    'document': 'File',
    'archivo': 'File',
    'folder': 'Folder',
    'carpeta': 'Folder',
    'bio': 'FileText',
    'edit-text': 'Pencil',

    // Locación
    'location': 'MapPin',
    'city': 'MapPin',
    'address': 'MapPin',

    // Estados
    'check': 'Check',
    'checkmark': 'Check',
    'tick': 'Check',
    'close': 'X',
    'cancel': 'X',
    'cerrar': 'X',
    'alert': 'AlertCircle',
    'warning': 'AlertTriangle',
    'advertencia': 'AlertTriangle',

    // Redes sociales
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'instagram': 'Instagram',
    'linkedin': 'Linkedin',
};

/**
 * Configuración por defecto del componente Icon
 */
export const IconDefaults = {
    size: 24,
    color: 'currentColor',
    className: '',
    strokeWidth: 2,
    unstyled: false,
} as const;

/**
 * Categorías de iconos para organización
 */
export const IconCategories: Record<string, string[]> = {
    navigation: ['Home', 'Menu', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ArrowLeft', 'ArrowRight'],
    actions: ['Heart', 'Star', 'Bookmark', 'Share', 'Download', 'Upload', 'Copy', 'Edit', 'Trash'],
    communication: ['Mail', 'MessageSquare', 'Phone', 'Video', 'Send', 'Bell'],
    media: ['Play', 'Pause', 'Volume', 'VolumeX', 'Music', 'Image', 'Film', 'Camera'],
    files: ['File', 'FileText', 'Folder', 'FolderOpen', 'Save', 'Download', 'Upload'],
    status: ['Check', 'X', 'AlertCircle', 'AlertTriangle', 'Info', 'CheckCircle', 'XCircle'],
    social: ['Facebook', 'Twitter', 'Instagram', 'Linkedin', 'Github', 'Youtube'],
    ui: ['Settings', 'Search', 'Filter', 'Grid', 'List', 'MoreVertical', 'MoreHorizontal'],
    user: ['User', 'Users', 'UserPlus', 'UserMinus', 'UserCheck'],
};
