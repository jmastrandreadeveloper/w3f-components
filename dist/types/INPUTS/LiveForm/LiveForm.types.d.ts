import type React from 'react';
import type { FormValues, FormErrors, FormTouched, FormContextValue } from '../Form/Form.types';
export type { FormValues, FormErrors, FormTouched, FormContextValue };
export type ValuesChangeHandler = (values: FormValues) => void;
export interface LiveFormProps {
    children: React.ReactNode;
    initialValues?: FormValues;
    onValuesChange?: ValuesChangeHandler;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    id?: string;
}
//# sourceMappingURL=LiveForm.types.d.ts.map