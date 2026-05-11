import { useContext, useState, useCallback, useRef } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';
import { resolveMask } from './Input.masks';
import type { MaskDefinition } from './Input.masks';

/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export const useInputFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useInputFormDispatch = () => useContext(FormDispatchContext);
export const useInputFormMeta = () => useContext(FormMetaContext);
export const useInputFieldStore = () => useContext(FormFieldStoreContext);

export const useInputFocus = (disabled: boolean) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        if (!disabled) setIsFocused(true);
    };

    const handleBlurFocus = (hasValue: boolean) => {
        if (!hasValue) setIsFocused(false);
    };

    return { isFocused, handleFocus, handleBlurFocus };
};

/**
 * Hook for input masking — formats display value and exposes clean value.
 */
export const useInputMask = (
    maskProp: string | MaskDefinition | undefined,
    externalValue: string | undefined,
) => {
    const maskDef = maskProp ? resolveMask(maskProp) : null;
    const [internalDisplay, setInternalDisplay] = useState('');
    const cleanRef = useRef('');

    const formatAndUpdate = useCallback((raw: string) => {
        if (!maskDef) return raw;
        const formatted = maskDef.format(raw);
        setInternalDisplay(formatted);
        cleanRef.current = maskDef.cleanValue(formatted);
        return formatted;
    }, [maskDef]);

    // If externally controlled, format the external value
    const displayValue = maskDef
        ? (externalValue !== undefined ? maskDef.format(externalValue) : internalDisplay)
        : undefined;

    const cleanValue = maskDef
        ? (externalValue !== undefined ? maskDef.cleanValue(externalValue) : cleanRef.current)
        : undefined;

    return {
        maskDef,
        displayValue,
        cleanValue,
        formatAndUpdate,
        placeholder: maskDef?.placeholder,
        maxLength: maskDef?.maxLength,
    };
};

/**
 * Hook for pattern validation on blur.
 */
export const usePatternValidation = (
    patternProp: string | RegExp | undefined,
) => {
    const [patternError, setPatternError] = useState<string | undefined>();

    const validateOnBlur = useCallback((value: string) => {
        if (!patternProp || !value) {
            setPatternError(undefined);
            return;
        }
        const regex = typeof patternProp === 'string' ? new RegExp(patternProp) : patternProp;
        if (!regex.test(value)) {
            setPatternError('Formato inválido');
        } else {
            setPatternError(undefined);
        }
    }, [patternProp]);

    return { patternError, validateOnBlur };
};
