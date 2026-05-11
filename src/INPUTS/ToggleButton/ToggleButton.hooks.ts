import { useContext, useCallback } from 'react';
import { FormContext, FormDispatchContext, FormMetaContext, FormFieldStoreContext } from '../Form/Form';
import type { FormContextValue } from '../Form/Form.types';
import type { ToggleButtonGroupProps } from './ToggleButton.types';
import { computeNewValue } from './ToggleButton.utils';

/** @deprecated Use useToggleGroupFormDispatch for better performance */
export const useToggleGroupFormContext = (): FormContextValue | null => {
    return useContext(FormContext);
};

export const useToggleGroupFormDispatch = () => useContext(FormDispatchContext);
export const useToggleGroupFormMeta = () => useContext(FormMetaContext);
export const useToggleGroupFieldStore = () => useContext(FormFieldStoreContext);

export const useToggleGroup = ({
    name,
    value,
    onChange,
    exclusive = false,
    disabled = false,
}: Pick<ToggleButtonGroupProps, 'name' | 'value' | 'onChange' | 'exclusive' | 'disabled'>) => {
    const formContext = useToggleGroupFormContext();
    const isFormControlled = !!(formContext && name);

    const groupValue = isFormControlled
        ? (formContext.values[name!] ?? (exclusive ? null : []))
        : value;

    const groupError = isFormControlled ? formContext.errors[name!] : undefined;

    const currentValue = exclusive
        ? groupValue
        : Array.isArray(groupValue)
          ? groupValue
          : [];

    const handleToggleChange = useCallback(
        (event: React.SyntheticEvent, buttonValue: string | number) => {
            if (disabled) return;
            const newValue = computeNewValue(buttonValue, currentValue as string | number | (string | number)[] | null, exclusive ?? false);
            if (isFormControlled && formContext && name) {
                formContext.setFieldValue(name, newValue);
            }
            if (onChange) onChange(event, newValue);
        },
        [exclusive, currentValue, onChange, isFormControlled, disabled, name, formContext],
    );

    return {
        currentValue,
        groupError,
        handleToggleChange,
    };
};
