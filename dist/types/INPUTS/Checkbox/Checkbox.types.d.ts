import type React from 'react';
export type CheckboxColor = 'primary' | 'success' | 'warning' | 'danger';
export interface CheckboxProps {
    label?: string;
    /** Nombre del campo para integración con Form/LiveForm */
    name?: string;
    /** Estado inicial (modo no controlado) */
    checked?: boolean;
    /** Callback cuando cambia el estado. Recibe el nuevo valor booleano. */
    onChange?: (checked: boolean) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    /** Contenido que se muestra cuando el checkbox está marcado */
    children?: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    /** Valor del campo para formularios (diferente de checked) */
    value?: string;
    color?: CheckboxColor;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
    /** Bridge binding ID — connects this component to business logic via the Bridge. */
    bindId?: string;
}
//# sourceMappingURL=Checkbox.types.d.ts.map