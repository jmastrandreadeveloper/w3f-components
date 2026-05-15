import type { TextAlign, TextLeading, TextDirection, TextWritingMode } from './Text.types';
/** Mapa de clases de alineación */
export declare const ALIGNMENT_MAP: Record<TextAlign, string>;
/** Mapa de clases de espaciado de línea */
export declare const LEADING_MAP: Record<TextLeading, string>;
/**
 * Construye las clases CSS para el componente Text.
 */
export declare const buildTextClasses: (customClasses?: string, align?: TextAlign, leading?: TextLeading, unstyled?: boolean) => string;
/**
 * Construye estilos inline para dirección y modo de escritura.
 */
export declare const buildTextDirectionStyle: (direction?: TextDirection, writingMode?: TextWritingMode, existingStyle?: React.CSSProperties) => React.CSSProperties | undefined;
//# sourceMappingURL=Text.utils.d.ts.map