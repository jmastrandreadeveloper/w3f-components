import type React from 'react';
import type { FormValues, FormErrors, FormTouched, FormContextValue } from '../Form/Form.types';

// Re-export de tipos base
export type { FormValues, FormErrors, FormTouched, FormContextValue };

// ─── LiveForm callback ─────────────────────────────────────────────
export type ValuesChangeHandler = (values: FormValues) => void;

// ─── Props del componente ──────────────────────────────────────────
export interface LiveFormProps {
    children: React.ReactNode;
    initialValues?: FormValues;
    onValuesChange?: ValuesChangeHandler;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    id?: string;
}
