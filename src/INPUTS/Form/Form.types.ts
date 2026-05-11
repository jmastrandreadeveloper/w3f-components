import type React from 'react';

// ─── Valores del formulario ────────────────────────────────────────
export type FormValues = Record<string, any>;
export type FormErrors = Record<string, string>;
export type FormTouched = Record<string, boolean>;

// ─── Validation ────────────────────────────────────────────────────
export type ValidationRule = {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    custom?: (value: any, values: FormValues) => string | undefined;
};

export type ValidationRules = Record<string, ValidationRule>;

// ─── Submit helpers ────────────────────────────────────────────────
export interface FormHelpers {
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    setTouched: React.Dispatch<React.SetStateAction<FormTouched>>;
    resetForm: () => void;
}

export type FormSubmitHandler = (
    values: FormValues,
    helpers: FormHelpers,
) => void | Promise<void>;

// ─── Context ───────────────────────────────────────────────────────
export interface FormContextValue {
    values: FormValues;
    errors: FormErrors;
    touched: FormTouched;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setFieldValue: (name: string, value: any) => void;
    setFieldError: (name: string, error: string) => void;
    clearFieldError: (name: string) => void;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    setTouched: React.Dispatch<React.SetStateAction<FormTouched>>;
    resetForm: () => void;
    isSubmitting: boolean;
}

// ─── Split Contexts (performance optimization) ────────────────────
/** Stable dispatch functions — never changes identity */
export interface FormDispatchValue {
    handleChange: FormContextValue['handleChange'];
    handleBlur: FormContextValue['handleBlur'];
    setFieldValue: FormContextValue['setFieldValue'];
    setFieldError: FormContextValue['setFieldError'];
    clearFieldError: FormContextValue['clearFieldError'];
    setErrors: FormContextValue['setErrors'];
    setTouched: FormContextValue['setTouched'];
    resetForm: FormContextValue['resetForm'];
}

/** Meta state — changes less frequently than values */
export interface FormMetaValue {
    errors: FormErrors;
    touched: FormTouched;
    isSubmitting: boolean;
}

/** Subscriber for per-field value changes */
export type FormFieldSubscriber = (value: any) => void;

/** Store for per-field subscriptions (avoids full re-render on keystroke) */
export interface FormFieldStore {
    getFieldValue: (name: string) => any;
    getValues: () => FormValues;
    subscribe: (name: string, listener: FormFieldSubscriber) => () => void;
}

// ─── Props del componente ──────────────────────────────────────────
export interface FormProps {
    children: React.ReactNode;
    initialValues?: FormValues;
    onSubmit?: FormSubmitHandler;
    validationRules?: ValidationRules;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    id?: string;
    noValidate?: boolean;
}
