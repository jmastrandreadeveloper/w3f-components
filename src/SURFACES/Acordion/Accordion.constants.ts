import type React from 'react';
import type { AccordionColor, AccordionSize, AccordionVariant } from './Accordion.types';

// ─── Valores por defecto ────────────────────────────────────────────────────
export const ACCORDION_DEFAULTS = {
    multiple: false,
    variant: 'default' as AccordionVariant,
    size: 'md' as AccordionSize,
    unstyled: false,
    className: '',
} as const;

export const ACCORDION_ITEM_DEFAULTS = {
    disabled: false,
    color: null as AccordionColor | null,
    className: '',
} as const;

export const ACCORDION_SUMMARY_DEFAULTS = {
    disabled: false,
    className: '',
} as const;

// ─── Tokens de clases CSS (BEM + W3Fussion) ────────────────────────────────
export const ACCORDION_CLASSES = {
    container: 'w3f-accordion',
    outlined: 'w3f-accordion-outlined',
    borderless: 'w3f-accordion-borderless',
    elevated: 'w3f-accordion-elevated',
    sm: 'w3f-accordion-sm',
    lg: 'w3f-accordion-lg',
    item: 'w3f-accordion-item',
    itemDisabled: 'w3f-accordion-item-disabled',
    summary: 'w3f-accordion-summary',
    icon: 'w3f-accordion-icon',
    flexGrow: 'w3f-flex-grow',
    contentContainer: 'w3f-accordion-content-container',
    contentShow: 'w3f-accordion-show',
    contentWrapper: 'w3f-accordion-content-wrapper',
    details: 'w3f-accordion-details',
    actions: 'w3f-accordion-actions',
} as const;

// ─── Static inline styles (moved from render to module-level) ────────────────
export const ACCORDION_SUMMARY_STYLE: React.CSSProperties = {
    justifyContent: 'flex-start',
    textAlign: 'left',
    padding: 'var(--w3f-space-4) var(--w3f-space-6)',
    height: 'auto',
    borderRadius: 0,
};
