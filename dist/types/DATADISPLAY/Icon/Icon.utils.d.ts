/**
 * Normaliza el nombre del icono, resolviendo alias y convirtiendo
 * kebab-case a PascalCase para coincidir con los exports de lucide-react.
 */
export declare const resolveIconName: (name: string) => string;
/**
 * Normaliza el tamaño del icono (convierte alias 'sm', 'md' a números).
 */
export declare const resolveIconSize: (size: number | string) => number;
/**
 * Normaliza el color del icono (convierte alias 'primary', 'danger' a valores CSS).
 */
export declare const resolveIconColor: (color: string) => string;
/**
 * Build CSS classes for the Icon wrapper.
 */
export declare const buildIconClasses: (unstyled?: boolean, className?: string) => string;
//# sourceMappingURL=Icon.utils.d.ts.map