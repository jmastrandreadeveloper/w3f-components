import { SIZE_TO_PADDING_CLASS } from './VerticalPadding.constants';

/**
 * Mapea los tamaños a clases de padding vertical w3f-py-*.
 */
const mapSizeToPaddingClass = (size: string): string => {
    if (SIZE_TO_PADDING_CLASS[size]) {
        return SIZE_TO_PADDING_CLASS[size];
    }
    // Si se pasa un número directamente ('2', '4', '8'), intenta usarlo.
    if (!isNaN(parseInt(size)) && size !== '') {
        return `w3f-py-${size}`;
    }
    return 'w3f-py-4'; // Valor por defecto seguro.
};

/**
 * Construye la cadena de clases CSS para VerticalPadding.
 */
export const buildVerticalPaddingClassNames = ({
    size,
    utilityClass,
    className,
}: {
    size?: string;
    utilityClass?: string;
    className?: string;
}): string => {
    const classes: string[] = [];

    if (utilityClass) {
        classes.push(utilityClass);
    } else if (size) {
        classes.push(mapSizeToPaddingClass(size));
    }

    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
};
