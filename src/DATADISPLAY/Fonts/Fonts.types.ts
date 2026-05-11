import type React from 'react';

export type FontSize = '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type FontFamily = 'sans' | 'display' | 'mono' | 'roboto' | 'playfair' | 'spacemono';
export type FontWeight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

/** Modo de escritura. Las variantes vertical-* controlan dirección y orientación de las letras. */
export type FontWritingMode =
    | 'horizontal'             // normal (default)
    | 'vertical-down-rotated'  // ↓ letras rotadas 90° (sideways)
    | 'vertical-down-upright'  // ↓ letras en pie (upright CSS)
    | 'vertical-up-rotated'    // ↑ letras rotadas (ascendente)
    | 'vertical-up-upright'    // ↑ letras en pie (ascendente upright CSS)
    | 'vertical-stacked'       // ↓ cada letra apilada en columna flex, sin rotar
    | 'vertical-stacked-up';   // ↑ cada letra apilada en columna flex invertida, sin rotar

/** Transformaciones 2D/3D predefinidas aplicables al texto. */
export type FontTransform =
    | 'none'
    | 'rotate-45'       | 'rotate-neg45'
    | 'rotate-90'       | 'rotate-neg90'
    | 'rotate-180'
    | 'skew-left'       | 'skew-right'
    | 'skew-up'         | 'skew-down'
    | 'mirror-h'        | 'mirror-v'
    | 'scale-wide'      | 'scale-narrow'
    | 'scale-tall'      | 'scale-flat'
    | 'perspective-up'  | 'perspective-down'
    | 'perspective-right' | 'perspective-left'
    | 'perspective-3d';

export interface FontsProps {
    text?: string;
    customClasses?: string;
    size?: FontSize;
    family?: FontFamily;
    weight?: FontWeight;
    italic?: boolean;
    underline?: boolean;
    element?: React.ElementType;
    /** Modo de escritura: horizontal (default) o vertical en 4 variantes. */
    writingMode?: FontWritingMode;
    /** Transformación CSS 2D/3D predefinida. */
    transform?: FontTransform;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
}

export interface FontOption {
    value: string;
    label: string;
    className: string;
}

export interface UseFontsReturn {
    selectedSize: FontSize;
    setSelectedSize: React.Dispatch<React.SetStateAction<FontSize>>;
    selectedFamily: FontFamily;
    setSelectedFamily: React.Dispatch<React.SetStateAction<FontFamily>>;
    selectedWeight: FontWeight;
    setSelectedWeight: React.Dispatch<React.SetStateAction<FontWeight>>;
    isItalic: boolean;
    setIsItalic: React.Dispatch<React.SetStateAction<boolean>>;
    isUnderline: boolean;
    setIsUnderline: React.Dispatch<React.SetStateAction<boolean>>;
    getFontClasses: (baseClasses?: string) => string;
    resetToDefaults: () => void;
    FONT_SIZES: FontOption[];
    FONT_FAMILIES: FontOption[];
    FONT_WEIGHTS: FontOption[];
}
