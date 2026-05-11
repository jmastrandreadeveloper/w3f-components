import type React from 'react';
import type { FontSize, FontFamily, FontWeight, FontOption, FontWritingMode, FontTransform } from './Fonts.types';

// ─── Transform map ────────────────────────────────────────────────────────────

const TRANSFORM_MAP: Partial<Record<FontTransform, string>> = {
    'rotate-45':        'rotate(45deg)',
    'rotate-neg45':     'rotate(-45deg)',
    'rotate-90':        'rotate(90deg)',
    'rotate-neg90':     'rotate(-90deg)',
    'rotate-180':       'rotate(180deg)',
    'skew-left':        'skewX(-20deg)',
    'skew-right':       'skewX(20deg)',
    'skew-up':          'skewY(-10deg)',
    'skew-down':        'skewY(10deg)',
    'mirror-h':         'scaleX(-1)',
    'mirror-v':         'scaleY(-1)',
    'scale-wide':       'scaleX(2)',
    'scale-narrow':     'scaleX(0.5)',
    'scale-tall':       'scaleY(2)',
    'scale-flat':       'scaleY(0.4)',
    'perspective-up':   'perspective(300px) rotateX(35deg)',
    'perspective-down': 'perspective(300px) rotateX(-35deg)',
    'perspective-right':'perspective(300px) rotateY(45deg)',
    'perspective-left': 'perspective(300px) rotateY(-45deg)',
    'perspective-3d':   'perspective(400px) rotateX(20deg) rotateY(25deg)',
};

/**
 * Builds the inline style object for writingMode + transform props.
 * Returns undefined when both are at their default (no style needed).
 */
export const buildFontsStyle = (
    writingMode: FontWritingMode,
    transform: FontTransform,
): React.CSSProperties | undefined => {
    const style: React.CSSProperties = {};
    let hasStyle = false;

    // stacked modes are handled entirely in Fonts.tsx via flex — skip CSS writing-mode
    const isStacked = writingMode === 'vertical-stacked' || writingMode === 'vertical-stacked-up';

    if (writingMode !== 'horizontal' && !isStacked) {
        hasStyle = true;
        style.display = 'inline-block';
        (style as Record<string, unknown>).writingMode = 'vertical-lr';
        const upright = writingMode === 'vertical-down-upright' || writingMode === 'vertical-up-upright';
        (style as Record<string, unknown>).textOrientation = upright ? 'upright' : 'sideways';
        if (writingMode === 'vertical-up-rotated' || writingMode === 'vertical-up-upright') {
            style.transform = 'rotate(180deg)';
        }
    }

    if (transform !== 'none') {
        const t = TRANSFORM_MAP[transform];
        if (t) {
            hasStyle = true;
            style.display = 'inline-block';
            style.transform = style.transform ? `${style.transform} ${t}` : t;
        }
    }

    return hasStyle ? style : undefined;
};

/**
 * Mapas de tamaños de fuente usando las clases W3F
 */
export const FONT_SIZES_MAP: Record<FontSize, string> = {
    '2xs': 'w3f-text-2xs',
    'xs': 'w3f-text-xs',
    'sm': 'w3f-text-sm',
    'base': 'w3f-text-base',
    'lg': 'w3f-text-lg',
    'xl': 'w3f-text-xl',
    '2xl': 'w3f-text-2xl',
    '3xl': 'w3f-text-3xl',
    '4xl': 'w3f-text-4xl',
    '5xl': 'w3f-text-5xl',
    '6xl': 'w3f-text-6xl',
};

/**
 * Mapas de estilos de fuente (familias tipográficas)
 */
export const FONT_STYLES_MAP: Record<FontFamily, string> = {
    'sans': 'w3f-font-sans',
    'display': 'w3f-font-display',
    'mono': 'w3f-font-mono',
    'roboto': 'w3f-font-roboto',
    'playfair': 'w3f-font-playfair',
    'spacemono': 'w3f-font-space-mono',
};

/**
 * Mapas de pesos de fuente
 */
export const FONT_WEIGHTS_MAP: Record<FontWeight, string> = {
    'thin': 'w3f-font-thin',
    'extralight': 'w3f-font-extralight',
    'light': 'w3f-font-light',
    'normal': 'w3f-font-normal',
    'medium': 'w3f-font-medium',
    'semibold': 'w3f-font-semibold',
    'bold': 'w3f-font-bold',
    'extrabold': 'w3f-font-extrabold',
    'black': 'w3f-font-black',
};

/**
 * Genera las opciones para selectores a partir de un mapa
 */
export const generateOptions = (
    map: Record<string, string>,
    labelTransform: (key: string) => string = (key) => key.toUpperCase()
): FontOption[] => {
    return Object.keys(map).map(key => ({
        value: key,
        label: labelTransform(key),
        className: map[key]
    }));
};

// Pre-generamos las opciones fuera del hook para evitar re-cálculos
export const FONT_SIZE_OPTIONS: FontOption[] = generateOptions(FONT_SIZES_MAP, (key) => key.toUpperCase());
export const FONT_FAMILY_OPTIONS: FontOption[] = generateOptions(FONT_STYLES_MAP, (key) => key.charAt(0).toUpperCase() + key.slice(1));
export const FONT_WEIGHT_OPTIONS: FontOption[] = generateOptions(FONT_WEIGHTS_MAP, (key) => key.charAt(0).toUpperCase() + key.slice(1));

/**
 * Función que formatea una cadena de texto a mayúsculas con espacios.
 */
export const formatLabel = (text: string): string => {
    return text.toUpperCase().replace(/[()]/g, '');
};

/**
 * Build CSS classes for the Fonts component.
 */
export const buildFontsClasses = (
    size: FontSize,
    family: FontFamily,
    weight: FontWeight,
    italic: boolean,
    underline: boolean,
    unstyled?: boolean,
    customClasses?: string,
): string => {
    const base = 'w3f-fonts';
    if (unstyled) return [base, `${base}--unstyled`, customClasses].filter(Boolean).join(' ');

    const classes: string[] = [
        base,
        FONT_SIZES_MAP[size] || FONT_SIZES_MAP.base,
        FONT_STYLES_MAP[family] || FONT_STYLES_MAP.sans,
        FONT_WEIGHTS_MAP[weight] || FONT_WEIGHTS_MAP.normal,
    ];

    if (italic) classes.push('w3f-italic');
    if (underline) classes.push('w3f-underline');
    if (customClasses) classes.push(customClasses);

    return classes.filter(Boolean).join(' ');
};
