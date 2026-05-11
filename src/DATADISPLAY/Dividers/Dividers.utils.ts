import type { DividerType, DividerVariant, DividerGradient } from './Dividers.types';

const SEMANTIC_COLORS = /^(primary|secondary|success|warning|danger|info|gray)$/;

/**
 * Resuelve un nombre de color semántico a su variable CSS correspondiente,
 * o devuelve el valor tal cual si es un color CSS directo.
 */
export const resolveColor = (color: string): string => {
    if (SEMANTIC_COLORS.test(color)) {
        return `var(--w3f-${color})`;
    }
    return color;
};

/**
 * Construye los estilos dinámicos para el divider según las props.
 * Uses CSS custom properties where possible, inline styles only for gradient backgrounds.
 */
export const buildDynamicStyles = (
    type: DividerType,
    variant: DividerVariant,
    thickness: string,
    spacing: string,
    height: string,
    color: string | null | undefined,
    gradient: DividerGradient | null | undefined,
    animated: boolean,
    hasChildren: boolean,
    baseStyle: React.CSSProperties
): React.CSSProperties => {
    const styles: Record<string, string | number | undefined> = {};

    // Set CSS vars for thickness and spacing (only if non-default)
    if (thickness !== '1px') {
        styles['--w3f-divider-thickness'] = thickness;
    }
    if (spacing !== '16px') {
        styles['--w3f-divider-spacing'] = spacing;
    }

    // Color via CSS var
    if (color && variant !== 'gradient') {
        styles['--w3f-divider-color'] = resolveColor(color);
    }

    // Vertical height via CSS var
    if (type === 'vertical') {
        styles['--w3f-divider-height'] = height;
    }

    // Gradient requires inline background (truly dynamic, computed from props)
    if (variant === 'gradient' && gradient) {
        const fromColor = gradient.from.startsWith('#') || gradient.from.startsWith('rgb')
            ? gradient.from
            : `var(--w3f-${gradient.from})`;
        const toColor = gradient.to.startsWith('#') || gradient.to.startsWith('rgb')
            ? gradient.to
            : `var(--w3f-${gradient.to})`;
        const direction = gradient.direction || 'to right';

        if (type === 'horizontal') {
            styles.background = `linear-gradient(${direction}, ${fromColor}, ${toColor})`;
        } else {
            styles.background = `linear-gradient(to bottom, ${fromColor}, ${toColor})`;
        }
    }

    return { ...styles, ...baseStyle } as React.CSSProperties;
};

/**
 * Resuelve el color de fondo para las líneas del divider con contenido.
 */
export const buildLineBackgroundColor = (color: string | null | undefined): string => {
    if (color) {
        return resolveColor(color);
    }
    return 'var(--w3f-gray-300)';
};
