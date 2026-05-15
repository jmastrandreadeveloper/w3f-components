import type React from 'react';
export type AccordionHVariant = 'default' | 'outlined' | 'elevated' | 'borderless';
export type AccordionHSize = 'sm' | 'md' | 'lg';
export type AccordionHColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';
/** Orientación del texto en el tab vertical */
export type AccordionHTextOrientation = 'upright' | 'clockwise' | 'counter-clockwise';
/** Velocidad de la animación de apertura/cierre */
export type AccordionHSpeed = 'fast' | 'normal' | 'slow' | 'very-slow';
export interface AccordionHProps {
    children: React.ReactNode;
    multiple?: boolean;
    variant?: AccordionHVariant;
    size?: AccordionHSize;
    /** Altura del contenedor. Default: '400px' */
    height?: string | number;
    /** Orientación de las letras en el tab vertical. Default: 'counter-clockwise' */
    textOrientation?: AccordionHTextOrientation;
    /**
     * Velocidad de la animación de apertura/cierre.
     * Puede ser un preset ('fast' | 'normal' | 'slow' | 'very-slow') o un número en ms.
     * Default: 'normal' (400ms)
     */
    speed?: AccordionHSpeed | number;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
}
export interface AccordionItemHProps {
    id: string;
    children: React.ReactNode;
    /** @internal inyectado por AccordionHorizontal */
    isExpanded?: boolean;
    /** @internal inyectado por AccordionHorizontal */
    togglePanel?: () => void;
    /** @internal inyectado por AccordionHorizontal */
    textOrientation?: AccordionHTextOrientation;
    color?: AccordionHColor | null;
    disabled?: boolean;
    className?: string;
}
export interface AccordionSummaryHProps {
    children: React.ReactNode;
    /** @internal inyectado por AccordionItemH */
    isExpanded?: boolean;
    /** @internal inyectado por AccordionItemH */
    togglePanel?: () => void;
    /** @internal inyectado por AccordionItemH */
    textOrientation?: AccordionHTextOrientation;
    disabled?: boolean;
    icon?: React.ReactNode;
    /** @internal inyectado por AccordionItemH */
    id?: string;
    className?: string;
}
export interface AccordionDetailsHProps {
    children: React.ReactNode;
    className?: string;
}
export interface AccordionActionsHProps {
    children: React.ReactNode;
    /** @internal inyectado por AccordionItemH */
    closePanel?: () => void;
    className?: string;
}
//# sourceMappingURL=AccordionHorizontal.types.d.ts.map