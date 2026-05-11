import type React from 'react';

// ─── Tipos de variantes ────────────────────────────────────────────
export type FabColor =
    | 'primary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'secondary'
    | 'surface'
    | 'surface-secondary';

export type FabSize = 'mini' | 'sm' | 'default' | 'lg';

export type FabPosition =
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'top-right'
    | 'top-left'
    | 'top-center';

// ─── Props del FAB principal ───────────────────────────────────────
export interface FloatingActionButtonProps {
    /** Nombre del campo para integración con Form/LiveForm */
    name?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /** Ícono del FAB */
    children?: React.ReactNode;
    /** Texto visible (convierte el FAB en extended) */
    text?: string;
    /** Etiqueta flotante para Speed Dial */
    label?: string;
    /** Texto del tooltip y accesibilidad */
    title?: string;
    /** Distancia en px desde el borde de la pantalla */
    offset?: number;
    color?: FabColor;
    size?: FabSize;
    /** Si muestra texto junto al ícono (FAB extended) */
    extended?: boolean;
    position?: FabPosition;
    /** En móvil, oculta el texto del FAB extended */
    mobileIconOnly?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    /** Mensaje de error externo (cuando no está en Form) */
    error?: string;
    helperText?: string;
    className?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}

// ─── Props del grupo (Speed Dial) ─────────────────────────────────
export interface FloatingActionButtonGroupProps {
    children: React.ReactNode;
    isOpen?: boolean;
    offset?: number;
    position?: FabPosition;
    className?: string;
}
