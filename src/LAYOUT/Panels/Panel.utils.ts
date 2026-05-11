import { PANEL_CLASSES } from './Panel.constants';

/**
 * Mapea los colores a clases (retrocompatibilidad).
 */
const mapColorToW3Class = (color?: string): string => {
    return '';
};

/**
 * Construye la cadena de clases CSS para el componente Panel.
 */
export const buildPanelClassNames = ({
    color,
    padding,
    card,
    round,
    border,
    className,
}: {
    color?: string;
    padding?: boolean;
    card?: boolean;
    round?: boolean;
    border?: boolean;
    className?: string;
}): string => {
    const classes: string[] = [PANEL_CLASSES.base];

    classes.push(mapColorToW3Class(color));

    if (padding) classes.push(PANEL_CLASSES.padding);
    if (card) classes.push(PANEL_CLASSES.card);
    if (round) classes.push(PANEL_CLASSES.round);
    if (border) classes.push(PANEL_CLASSES.border);
    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
};
