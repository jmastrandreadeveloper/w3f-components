"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId, useState } from "react";
import { Mail } from "lucide-react";
import { EMAILFIELD_CLASSES, EMAILFIELD_DEFAULTS } from "./EmailField.constants";
import { buildContainerClasses, buildWrapperClasses, buildInputClasses, buildLabelClasses, isValidEmail } from "./EmailField.utils";
import { useEmailFieldFormContext, useEmailFieldFocus } from "./EmailField.hooks";
const EmailField = forwardRef(
  ({
    label,
    name,
    value: externalValue,
    onChange: externalOnChange,
    error: propError,
    helperText,
    disabled = EMAILFIELD_DEFAULTS.disabled,
    required = EMAILFIELD_DEFAULTS.required,
    size = EMAILFIELD_DEFAULTS.size,
    unstyled = EMAILFIELD_DEFAULTS.unstyled,
    className = "",
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    validateOnChange = EMAILFIELD_DEFAULTS.validateOnChange,
    placeholder,
    autoFocus,
    ...props
  }, ref) => {
    const formContext = useEmailFieldFormContext();
    const isFormControlled = !!(formContext && name);
    const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = useEmailFieldFocus();
    const [internalError, setInternalError] = useState(void 0);
    const [internalValue, setInternalValue] = useState("");
    const inputId = useId();
    const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : internalValue;
    const contextError = isFormControlled ? formContext.errors[name] : propError;
    const fieldError = contextError || internalError;
    const hasError = Boolean(fieldError);
    const validateFormat = (value) => {
      if (value && !isValidEmail(value)) {
        setInternalError("Formato de email inv\xE1lido");
      } else {
        setInternalError(void 0);
      }
    };
    const handleChange = (e) => {
      const val = e.target.value;
      if (validateOnChange) validateFormat(val);
      if (isFormControlled && formContext) {
        formContext.handleChange(e);
      } else if (externalOnChange) {
        externalOnChange(e);
      } else {
        setInternalValue(val);
      }
    };
    const handleFocus = (e) => {
      if (!disabled) onFocusHook();
      if (onFocusProp) onFocusProp(e);
    };
    const handleBlur = (e) => {
      onBlurHook();
      validateFormat(e.target.value);
      if (isFormControlled && formContext) formContext.handleBlur(e);
      if (onBlurProp) onBlurProp(e);
    };
    const hasValue = String(currentValue ?? "").length > 0;
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    return /* @__PURE__ */ jsxs("div", { className: buildContainerClasses(className, unstyled), children: [
      /* @__PURE__ */ jsxs("div", { className: buildWrapperClasses(size), children: [
        /* @__PURE__ */ jsx("div", { className: EMAILFIELD_CLASSES.iconLeading, children: /* @__PURE__ */ jsx(Mail, { size: 16 }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id: inputId,
            type: "text",
            inputMode: "email",
            name,
            value: currentValue,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            required,
            placeholder,
            autoFocus,
            autoComplete: "email",
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildInputClasses(),
            ...props
          }
        ),
        /* @__PURE__ */ jsxs("label", { htmlFor: inputId, className: buildLabelClasses(isFloating), children: [
          label ?? "Email",
          required && /* @__PURE__ */ jsx("span", { className: EMAILFIELD_CLASSES.required, children: " *" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: EMAILFIELD_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-error`,
          className: `${EMAILFIELD_CLASSES.message} ${EMAILFIELD_CLASSES.messageError}`,
          role: "alert",
          children: fieldError
        }
      ) : helperText ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${EMAILFIELD_CLASSES.message} ${EMAILFIELD_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
EmailField.displayName = "EmailField";
var EmailField_default = EmailField;
export {
  EmailField,
  EmailField_default as default
};
//# sourceMappingURL=EmailField.js.map
