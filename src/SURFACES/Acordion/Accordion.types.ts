import type React from 'react';

// ─── Tipos de variante, tamaño y color ─────────────────────────────────────
export type AccordionVariant = 'default' | 'outlined' | 'borderless' | 'elevated';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

// ─── Accordion (contenedor) ─────────────────────────────────────────────────
export interface AccordionProps {
    children: React.ReactNode;
    multiple?: boolean;
    variant?: AccordionVariant;
    size?: AccordionSize;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    className?: string;
}

// ─── AccordionItem ──────────────────────────────────────────────────────────
export interface AccordionItemProps {
    id: string;
    children: React.ReactNode;
    /** @internal inyectado por Accordion */
    isExpanded?: boolean;
    /** @internal inyectado por Accordion */
    togglePanel?: () => void;
    /** @internal inyectado por Accordion */
    closePanel?: () => void;
    disabled?: boolean;
    color?: AccordionColor | null;
    className?: string;
}

// ─── AccordionSummary ───────────────────────────────────────────────────────
export interface AccordionSummaryProps {
    children: React.ReactNode;
    /** @internal inyectado por AccordionItem */
    isExpanded?: boolean;
    /** @internal inyectado por AccordionItem */
    togglePanel?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
    /** @internal inyectado por AccordionItem */
    id?: string;
    className?: string;
}

// ─── AccordionDetails ──────────────────────────────────────────────────────
export interface AccordionDetailsProps {
    children: React.ReactNode;
    className?: string;
}

// ─── AccordionActions ──────────────────────────────────────────────────────
export interface AccordionActionsProps {
    children: React.ReactNode;
    /** @internal inyectado por AccordionItem */
    closePanel?: () => void;
    className?: string;
}
