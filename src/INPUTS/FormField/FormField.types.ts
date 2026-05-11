import React from 'react';

export type FormFieldLayout = 'stacked' | 'inline';

export interface FormFieldProps {
    /** Etiqueta del campo */
    label?: string;
    /** Nombre del campo (usado para relacionar label y error con Form context) */
    name?: string;
    /** Mensaje de error (si no está controlado por Form) */
    error?: string;
    /** Texto de ayuda */
    helperText?: string;
    /** Requerido */
    required?: boolean;
    /** Deshabilitar todos los controles hijos */
    disabled?: boolean;
    /** Layout del campo */
    layout?: FormFieldLayout;
    /** Contenido del campo (inputs, selects, etc.) */
    children: React.ReactNode;
    /** Clases CSS adicionales */
    className?: string;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
