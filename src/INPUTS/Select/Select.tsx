import React, { forwardRef, useId, useState } from 'react';
import type { SelectProps, SelectOptionOrGroup } from './Select.types';
import { SELECT_CLASSES, SELECT_DEFAULTS } from './Select.constants';
import { isOptionGroup, buildSelectClasses, buildLabelClasses, hasSelectValue } from './Select.utils';
import { useSelectFormContext, useSelectFocus } from './Select.hooks';
import { useBridgeBind } from '@w3f/bridge';

// ─── JSX helpers (deben estar en .tsx) ──────────────────────────────

function renderOptions(items: SelectOptionOrGroup[]): React.ReactNode {
    return items.map((item, index) => {
        if (isOptionGroup(item)) {
            return (
                <optgroup key={`group-${index}`} label={item.label} disabled={item.disabled}>
                    {item.options.map((opt, i) => (
                        <option
                            key={`opt-${index}-${i}`}
                            value={
                                opt.value === null || opt.value === undefined
                                    ? ''
                                    : String(opt.value)
                            }
                            disabled={opt.disabled}
                        >
                            {opt.label}
                        </option>
                    ))}
                </optgroup>
            );
        }
        return (
            <option
                key={`opt-${index}`}
                value={
                    item.value === null || item.value === undefined ? '' : String(item.value)
                }
                disabled={item.disabled}
            >
                {item.label}
            </option>
        );
    });
}

const DefaultChevron = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

// ─── Componente ──────────────────────────────────────────────────────

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            name,
            options = [],
            value: externalValue,
            onChange: externalOnChange,
            error: propError,
            helperText,
            disabled = SELECT_DEFAULTS.disabled,
            required = SELECT_DEFAULTS.required,
            multiple = SELECT_DEFAULTS.multiple,
            autoFocus = SELECT_DEFAULTS.autoFocus,
            leadingIcon,
            trailingIcon,
            className = SELECT_DEFAULTS.className,
            onBlur: externalOnBlur,
            unstyled = SELECT_DEFAULTS.unstyled,
            bindId,
            variant,
            ...props
        },
        ref,
    ) => {
        const formContext = useSelectFormContext();
        const isFormControlled = !!(formContext && name);
        const { dispatch } = useBridgeBind({ bindId });
        const [internalValue, setInternalValue] = useState<string | string[]>(
            multiple ? [] : '',
        );
        const { isFocused, onFocus, onBlur: onBlurFocus } = useSelectFocus();
        const inputId = useId();

        const currentValue = isFormControlled
            ? (formContext.values[name!] !== undefined
                  ? formContext.values[name!]
                  : multiple
                    ? []
                    : '')
            : externalValue !== undefined
              ? externalValue
              : internalValue;

        const inputError = isFormControlled ? formContext.errors[name!] : propError;
        const hasError = Boolean(inputError);

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const val = multiple
                ? Array.from(e.target.options)
                      .filter((o) => o.selected)
                      .map((o) => o.value)
                : e.target.value;

            if (isFormControlled && formContext) {
                formContext.handleChange(e);
            } else if (externalOnChange) {
                externalOnChange(e);
            } else {
                setInternalValue(val);
            }
            dispatch('change', { value: val });
        };

        const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
            onBlurFocus();
            if (isFormControlled && formContext) formContext.handleBlur(e);
            dispatch('blur', { value: e.target.value });
            if (externalOnBlur) externalOnBlur(e);
        };

        const isFloating = isFocused || hasSelectValue(currentValue as string | string[]);
        const finalTrailingIcon = trailingIcon ?? (!multiple ? <DefaultChevron /> : null);

        return (
            <div className={[SELECT_CLASSES.container, unstyled && 'w3f-select-container--unstyled', className].filter(Boolean).join(' ')}>
                <div className={SELECT_CLASSES.wrapper}>
                    {leadingIcon && (
                        <div className={SELECT_CLASSES.iconLeading}>{leadingIcon}</div>
                    )}

                    <select
                        ref={ref}
                        id={inputId}
                        name={name}
                        value={currentValue as string | string[]}
                        onChange={handleChange}
                        onFocus={onFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                        required={required}
                        multiple={multiple}
                        autoFocus={autoFocus}
                        aria-invalid={hasError}
                        aria-describedby={
                            inputError
                                ? `${inputId}-error`
                                : helperText
                                  ? `${inputId}-helper`
                                  : undefined
                        }
                        className={buildSelectClasses(
                            Boolean(leadingIcon),
                            Boolean(finalTrailingIcon),
                            unstyled,
                            variant,
                        )}
                        {...props}
                    >
                        {!multiple && <option value="" disabled hidden />}
                        {renderOptions(options)}
                    </select>

                    {finalTrailingIcon && (
                        <div className={SELECT_CLASSES.iconTrailing}>{finalTrailingIcon}</div>
                    )}

                    <label
                        htmlFor={inputId}
                        className={buildLabelClasses(
                            isFloating,
                            !isFloating && Boolean(leadingIcon),
                        )}
                    >
                        {label}
                        {required && <span className={SELECT_CLASSES.required}> *</span>}
                    </label>
                </div>

                <div className={SELECT_CLASSES.paddingX}>
                    {inputError ? (
                        <p
                            id={`${inputId}-error`}
                            className={`${SELECT_CLASSES.message} ${SELECT_CLASSES.messageError}`}
                            role="alert"
                        >
                            {inputError}
                        </p>
                    ) : helperText ? (
                        <p
                            id={`${inputId}-helper`}
                            className={`${SELECT_CLASSES.message} ${SELECT_CLASSES.messageHelper}`}
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>
            </div>
        );
    },
);

Select.displayName = 'Select';
export { Select };
export default Select;
