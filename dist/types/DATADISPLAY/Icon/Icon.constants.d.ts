import type { IconSizeName, IconColorName } from './Icon.types';
/**
 * Tamaños predefinidos para los iconos
 */
export declare const IconSizes: Record<IconSizeName, number>;
/**
 * Usamos las variables CSS del framework (w3f)
 * para mantener una única fuente de verdad.
 */
export declare const IconColors: Record<IconColorName, string>;
/**
 * Mapeo de nombres alternativos o aliases para iconos.
 * Permite usar nombres cortos en los componentes.
 */
export declare const IconAliases: Record<string, string>;
/**
 * Configuración por defecto del componente Icon
 */
export declare const IconDefaults: {
    readonly size: 24;
    readonly color: "currentColor";
    readonly className: "";
    readonly strokeWidth: 2;
    readonly unstyled: false;
};
/**
 * Categorías de iconos para organización
 */
export declare const IconCategories: Record<string, string[]>;
//# sourceMappingURL=Icon.constants.d.ts.map