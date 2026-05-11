import type {
    SpeedDialColor,
    SpeedDialDirection,
    SpeedDialPosition,
    SpeedDialSize,
} from './SpeedDial.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const SPEED_DIAL_DEFAULTS = {
    direction: 'up' as SpeedDialDirection,
    defaultOpen: false,
    hidden: false,
    color: 'primary' as SpeedDialColor,
    size: 'default' as SpeedDialSize,
    position: 'bottom-right' as SpeedDialPosition,
    openOnHover: false,
    backdrop: false,
    unstyled: false,
    className: '',
} as const;

export const SPEED_DIAL_ACTION_DEFAULTS = {
    tooltipOpen: false,
    disabled: false,
    className: '',
    _direction: 'up' as SpeedDialDirection,
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const SPEED_DIAL_CLASSES = {
    container: 'w3f-speed-dial',
    open: 'w3f-speed-dial--open',
    hidden: 'w3f-speed-dial--hidden',
    fab: 'w3f-speed-dial__fab',
    icon: 'w3f-speed-dial__icon',
    iconRotate: 'w3f-speed-dial__icon--rotate',
    iconDefault: 'w3f-speed-dial__icon-default',
    iconOpen: 'w3f-speed-dial__icon-open',
    actions: 'w3f-speed-dial__actions',
    backdrop: 'w3f-speed-dial__backdrop',
    action: 'w3f-speed-dial-action',
    actionFab: 'w3f-speed-dial-action__fab',
    actionTooltip: 'w3f-speed-dial-action__tooltip',
    actionTooltipOpen: 'w3f-speed-dial-action__tooltip--open',
} as const;

// ─── Duración del hover timer en ms ───────────────────────────────────────
export const HOVER_CLOSE_DELAY = 100;
