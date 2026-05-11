// ─── Position classes ─────────────────────────────────────────────
export const W3F_POSITION_CLASSES = {
    TOPLEFT: 'w3f-position-topleft',
    TOPRIGHT: 'w3f-position-topright',
    BOTTOMLEFT: 'w3f-position-bottomleft',
    BOTTOMRIGHT: 'w3f-position-bottomright',
    MIDDLE: 'w3f-position-middle',
    TOP: 'w3f-position-top',
    BOTTOM: 'w3f-position-bottom',
    LEFT: 'w3f-position-left',
    RIGHT: 'w3f-position-right',
    CONTAINER: 'w3f-position-container',
} as const;

/**
 * Array de posiciones válidas.
 */
export const VALID_DISPLAY_POSITIONS: string[] = [
    W3F_POSITION_CLASSES.TOPLEFT,
    W3F_POSITION_CLASSES.TOPRIGHT,
    W3F_POSITION_CLASSES.BOTTOMLEFT,
    W3F_POSITION_CLASSES.BOTTOMRIGHT,
    W3F_POSITION_CLASSES.MIDDLE,
    W3F_POSITION_CLASSES.TOP,
    W3F_POSITION_CLASSES.BOTTOM,
    W3F_POSITION_CLASSES.LEFT,
    W3F_POSITION_CLASSES.RIGHT,
];
