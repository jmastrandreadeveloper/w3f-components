/**
 * Hook del contexto LiveForm.
 * Alias de useFormContext para backward compatibility.
 */
export declare const useLiveFormContext: () => import("./LiveForm.types").FormContextValue;
/**
 * Hook para un campo individual dentro de un LiveForm.
 * Alias de useFormField para backward compatibility.
 */
export declare const useLiveFormField: (name: string) => {
    value: any;
    error: string;
    touched: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    setValue: (value: any) => void;
};
//# sourceMappingURL=LiveForm.hooks.d.ts.map