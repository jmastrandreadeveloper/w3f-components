import type { AccordionHColor, AccordionHSize, AccordionHSpeed, AccordionHTextOrientation, AccordionHVariant } from './AccordionHorizontal.types';

// ─── Velocidades de animación (ms) ──────────────────────────────────────
export const ACCORDION_H_SPEED_MS: Record<AccordionHSpeed, number> = {
    fast:      150,
    normal:    400,
    slow:      700,
    'very-slow': 1200,
} as const;

export const ACCORDION_H_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

// ─── Valores por defecto ────────────────────────────────────────────────
export const ACCORDION_H_DEFAULTS = {
    multiple: false,
    variant: 'default' as AccordionHVariant,
    size: 'md' as AccordionHSize,
    height: '400px',
    textOrientation: 'counter-clockwise' as AccordionHTextOrientation,
    speed: 'normal' as AccordionHSpeed,
    unstyled: false,
    className: '',
} as const;

export const ACCORDION_H_ITEM_DEFAULTS = {
    disabled: false,
    color: null as AccordionHColor | null,
    className: '',
} as const;

export const ACCORDION_H_SUMMARY_DEFAULTS = {
    disabled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS ────────────────────────────────────────────────
export const ACCORDION_H_CLASSES = {
    // Contenedor
    container: 'w3f-accordion-horizontal',
    outlined: 'w3f-accordion-h-outlined',
    elevated: 'w3f-accordion-elevated',     // compartida con variante vertical
    borderless: 'w3f-accordion-borderless', // compartida con variante vertical
    sm: 'w3f-accordion-h-sm',
    lg: 'w3f-accordion-h-lg',
    // Item
    item: 'w3f-accordion-item-horizontal',
    itemExpanded: 'w3f-accordion-expanded',
    itemDisabled: 'w3f-accordion-item-horizontal-disabled',
    // Summary
    summary: 'w3f-accordion-summary-horizontal',
    summaryUpright: 'w3f-accordion-summary-h-upright',
    summaryCw: 'w3f-accordion-summary-h-cw',
    summaryCcw: 'w3f-accordion-summary-h-ccw',
    icon: 'w3f-accordion-icon-horizontal',
    // Content
    contentContainer: 'w3f-accordion-content-horizontal',
    contentShow: 'w3f-accordion-show',
    contentWrapper: 'w3f-accordion-content-wrapper-horizontal',
    // Details & Actions
    details: 'w3f-accordion-details-horizontal',
    actions: 'w3f-accordion-actions-horizontal',
} as const;
