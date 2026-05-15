"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId, useState } from "react";
import { NUMBERFIELD_CLASSES, NUMBERFIELD_DEFAULTS } from "./NumberField.constants";
import {
  buildWrapperClasses,
  buildInputClasses,
  buildLabelClasses
} from "./NumberField.utils";
import { useNumberField } from "./NumberField.hooks";
import { useBridgeBind } from "@w3f/bridge";
const NumberField = forwardRef(
  ({
    label,
    name,
    value = "",
    onChange,
    min = NUMBERFIELD_DEFAULTS.min,
    max = NUMBERFIELD_DEFAULTS.max,
    step = NUMBERFIELD_DEFAULTS.step,
    precision,
    error,
    helperText,
    disabled = NUMBERFIELD_DEFAULTS.disabled,
    required = NUMBERFIELD_DEFAULTS.required,
    autoComplete,
    autoFocus = NUMBERFIELD_DEFAULTS.autoFocus,
    size = NUMBERFIELD_DEFAULTS.size,
    leadingIcon,
    placeholder,
    className = "",
    unstyled = NUMBERFIELD_DEFAULTS.unstyled,
    bindId,
    variant,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = useId();
    const { dispatch } = useBridgeBind({ bindId });
    const bridgeOnChange = (v) => {
      if (v !== "") dispatch("change", { value: v });
      if (onChange) onChange(v);
    };
    const {
      formContext,
      isFormControlled,
      fieldError: contextError,
      internalValue,
      handleInputChange,
      handleSpin,
      handleBlur: handleBlurHook,
      isAtMax,
      isAtMin
    } = useNumberField({
      name,
      value,
      min,
      max,
      step,
      precision,
      disabled,
      onChange: bridgeOnChange
    });
    const fieldError = isFormControlled ? contextError : error;
    const handleFocus = (e) => {
      if (!disabled) setIsFocused(true);
      if (onFocusProp) onFocusProp(e);
    };
    const handleBlur = (e) => {
      setIsFocused(false);
      handleBlurHook(e, onBlurProp);
    };
    const handleKeyDown = (e) => {
      if (disabled) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleSpin("increment");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleSpin("decrement");
      }
      if (props.onKeyDown) props.onKeyDown(e);
    };
    const hasValue = String(internalValue) !== "";
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    const hasError = Boolean(fieldError);
    return /* @__PURE__ */ jsxs("div", { className: `${NUMBERFIELD_CLASSES.container} ${className}`, children: [
      /* @__PURE__ */ jsxs("div", { className: buildWrapperClasses(size, unstyled, variant), children: [
        leadingIcon && /* @__PURE__ */ jsx("div", { className: NUMBERFIELD_CLASSES.iconLeading, children: leadingIcon }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id: inputId,
            type: "text",
            inputMode: "decimal",
            name,
            value: internalValue,
            onChange: handleInputChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            disabled,
            required,
            autoComplete,
            autoFocus,
            placeholder,
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-valuenow": !isNaN(Number(internalValue)) ? Number(internalValue) : void 0,
            className: buildInputClasses(Boolean(leadingIcon), className),
            ...props
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: NUMBERFIELD_CLASSES.spinButtons, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": "Incrementar valor",
              className: `${NUMBERFIELD_CLASSES.spinButton} ${NUMBERFIELD_CLASSES.spinUp}`,
              onClick: () => handleSpin("increment"),
              disabled: disabled || isAtMax,
              children: "\u25B2"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": "Decrementar valor",
              className: `${NUMBERFIELD_CLASSES.spinButton} ${NUMBERFIELD_CLASSES.spinDown}`,
              onClick: () => handleSpin("decrement"),
              disabled: disabled || isAtMin,
              children: "\u25BC"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: inputId,
            className: buildLabelClasses(
              isFloating,
              !isFloating && Boolean(leadingIcon)
            ),
            children: [
              label,
              required && /* @__PURE__ */ jsx("span", { className: NUMBERFIELD_CLASSES.required, children: " *" })
            ]
          }
        )
      ] }),
      (fieldError || helperText) && /* @__PURE__ */ jsx("div", { className: NUMBERFIELD_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-error`,
          className: `${NUMBERFIELD_CLASSES.message} ${NUMBERFIELD_CLASSES.messageError}`,
          role: "alert",
          children: fieldError
        }
      ) : /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${NUMBERFIELD_CLASSES.message} ${NUMBERFIELD_CLASSES.messageHelper}`,
          children: helperText
        }
      ) })
    ] });
  }
);
NumberField.displayName = "NumberField";
var NumberField_default = NumberField;
export {
  NumberField,
  NumberField_default as default
};
//# sourceMappingURL=NumberField.js.map
