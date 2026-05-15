import type React from 'react';
import type { FontSize, FontFamily, FontWeight, FontOption, FontWritingMode, FontTransform } from './Fonts.types';
/**
 * Builds the inline style object for writingMode + transform props.
 * Returns undefined when both are at their default (no style needed).
 */
export declare const buildFontsStyle: (writingMode: FontWritingMode, transform: FontTransform) => React.CSSProperties | undefined;
/**
 * Mapas de tamaños de fuente usando las clases W3F
 */
export declare const FONT_SIZES_MAP: Record<FontSize, string>;
/**
 * Mapas de estilos de fuente (familias tipográficas)
 */
export declare const FONT_STYLES_MAP: Record<FontFamily, string>;
/**
 * Mapas de pesos de fuente
 */
export declare const FONT_WEIGHTS_MAP: Record<FontWeight, string>;
/**
 * Genera las opciones para selectores a partir de un mapa
 */
export declare const generateOptions: (map: Record<string, string>, labelTransform?: (key: string) => string) => FontOption[];
export declare const FONT_SIZE_OPTIONS: FontOption[];
export declare const FONT_FAMILY_OPTIONS: FontOption[];
export declare const FONT_WEIGHT_OPTIONS: FontOption[];
/**
 * Función que formatea una cadena de texto a mayúsculas con espacios.
 */
export declare const formatLabel: (text: string) => string;
/**
 * Build CSS classes for the Fonts component.
 */
export declare const buildFontsClasses: (size: FontSize, family: FontFamily, weight: FontWeight, italic: boolean, underline: boolean, unstyled?: boolean, customClasses?: string) => string;
//# sourceMappingURL=Fonts.utils.d.ts.map