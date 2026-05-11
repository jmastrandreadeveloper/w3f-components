import type { NoteType, NoteRound, NoteShadow, NoteBorderSide, NoteVariant } from './Note.types';
import { NOTE_VARIANT_CLASSES } from './Note.constants';

/**
 * Construye las clases CSS para el componente Note.
 */
export const buildNoteClasses = (
    type: NoteType,
    round: NoteRound,
    shadow: NoteShadow,
    border: NoteBorderSide | NoteBorderSide[],
    fullBorder: boolean,
    className?: string,
    unstyled?: boolean,
    variant?: NoteVariant,
): string => {
    if (unstyled) {
        return [
            'w3f-note',
            'w3f-note--unstyled',
            className,
        ].filter(Boolean).join(' ');
    }

    const classes: string[] = [
        'w3f-note',
        `w3f-note-${type}`,
    ];

    // Redondeo
    if (round === true) classes.push('w3f-round-md');
    else if (typeof round === 'string') classes.push(`w3f-round-${round}`);

    // Sombra
    if (shadow === true) classes.push('w3f-shadow-md');
    else if (typeof shadow === 'string') classes.push(`w3f-shadow-${shadow}`);

    // Borde completo vs bordes individuales
    // border === true se trata como fullBorder (borde completo en los 4 lados)
    if (fullBorder || border === true) {
        classes.push('w3f-border-full');
    } else {
        const borders = Array.isArray(border) ? border : [border];

        for (const side of borders) {
            switch (side) {
                case 'left':
                    classes.push('w3f-border-l-4');
                    break;
                case 'right':
                    classes.push('w3f-border-r-4');
                    break;
                case 'top':
                    classes.push('w3f-border-t-4');
                    break;
                case 'bottom':
                    classes.push('w3f-border-b-4');
                    break;
                default:
                    break;
            }
        }
    }

    // Variante
    if (variant && NOTE_VARIANT_CLASSES[variant]) {
        classes.push(NOTE_VARIANT_CLASSES[variant]);
    }

    // Clases adicionales del usuario
    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
};
