import type { DividerType, DividerVariant, DividerGradient } from './Dividers.types';
/**
 * Resuelve un nombre de color semántico a su variable CSS correspondiente,
 * o devuelve el valor tal cual si es un color CSS directo.
 */
export declare const resolveColor: (color: string) => string;
/**
 * Construye los estilos dinámicos para el divider según las props.
 * Uses CSS custom properties where possible, inline styles only for gradient backgrounds.
 */
export declare const buildDynamicStyles: (type: DividerType, variant: DividerVariant, thickness: string, spacing: string, height: string, color: string | null | undefined, gradient: DividerGradient | null | undefined, animated: boolean, hasChildren: boolean, baseStyle: React.CSSProperties) => React.CSSProperties;
/**
 * Resuelve el color de fondo para las líneas del divider con contenido.
 */
export declare const buildLineBackgroundColor: (color: string | null | undefined) => string;
//# sourceMappingURL=Dividers.utils.d.ts.map