import { useState } from 'react';
import type { FontSize, FontFamily, FontWeight, UseFontsReturn } from './Fonts.types';
import {
    FONT_SIZES_MAP,
    FONT_STYLES_MAP,
    FONT_WEIGHTS_MAP,
    FONT_SIZE_OPTIONS,
    FONT_FAMILY_OPTIONS,
    FONT_WEIGHT_OPTIONS,
} from './Fonts.utils';

/**
 * Hook de utilidad para gestionar tipografías en demos/ejemplos.
 * Proporciona estado para selectores y métodos para combinar clases.
 */
export const useFonts = (): UseFontsReturn => {
    const [selectedSize, setSelectedSize] = useState<FontSize>('base');
    const [selectedFamily, setSelectedFamily] = useState<FontFamily>('sans');
    const [selectedWeight, setSelectedWeight] = useState<FontWeight>('normal');
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    /**
     * Genera las clases de fuente combinadas según las selecciones actuales
     */
    const getFontClasses = (baseClasses: string = ''): string => {
        const classes: (string | false)[] = [
            baseClasses,
            FONT_SIZES_MAP[selectedSize],
            FONT_STYLES_MAP[selectedFamily],
            FONT_WEIGHTS_MAP[selectedWeight],
        ];

        if (isItalic) classes.push('w3f-italic');
        if (isUnderline) classes.push('w3f-underline');

        return classes.filter(Boolean).join(' ');
    };

    /**
     * Resetea todas las selecciones a valores por defecto
     */
    const resetToDefaults = (): void => {
        setSelectedSize('base');
        setSelectedFamily('sans');
        setSelectedWeight('normal');
        setIsItalic(false);
        setIsUnderline(false);
    };

    return {
        selectedSize,
        setSelectedSize,
        selectedFamily,
        setSelectedFamily,
        selectedWeight,
        setSelectedWeight,
        isItalic,
        setIsItalic,
        isUnderline,
        setIsUnderline,
        getFontClasses,
        resetToDefaults,
        FONT_SIZES: FONT_SIZE_OPTIONS,
        FONT_FAMILIES: FONT_FAMILY_OPTIONS,
        FONT_WEIGHTS: FONT_WEIGHT_OPTIONS,
    };
};
