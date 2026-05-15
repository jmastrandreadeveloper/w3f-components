"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { PASSWORDFIELD_CLASSES, PASSWORDFIELD_DEFAULTS, STRENGTH_LABELS, STRENGTH_SEGMENTS } from "./PasswordField.constants";
import {
  buildContainerClasses,
  buildWrapperClasses,
  buildInputClasses,
  buildLabelClasses,
  buildStrengthSegmentClasses,
  getPasswordStrength
} from "./PasswordField.utils";
import {
  usePasswordFieldFormContext,
  usePasswordFieldFocus,
  usePasswordVisibility
} from "./PasswordField.hooks";
const PasswordField = forwardRef(
  ({
    label,
    name,
    value: externalValue,
    onChange: externalOnChange,
    error: propError,
    helperText,
    disabled = PASSWORDFIELD_DEFAULTS.disabled,
    required = PASSWORDFIELD_DEFAULTS.required,
    size = PASSWORDFIELD_DEFAULTS.size,
    showStrength = PASSWORDFIELD_DEFAULTS.showStrength,
    unstyled = PASSWORDFIELD_DEFAULTS.unstyled,
    className = "",
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    placeholder,
    autoFocus,
    ...props
  }, ref) => {
    const formContext = usePasswordFieldFormContext();
    const isFormControlled = !!(formContext && name);
    const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = usePasswordFieldFocus();
    const { showPassword, toggleVisibility } = usePasswordVisibility();
    const [internalValue, setInternalValue] = useState("");
    const inputId = useId();
    const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : internalValue;
    const fieldError = isFormControlled ? formContext.errors[name] : propError;
    const hasError = Boolean(fieldError);
    const handleChange = (e) => {
      const val = e.target.value;
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
      if (isFormControlled && formContext) formContext.handleBlur(e);
      if (onBlurProp) onBlurProp(e);
    };
    const hasValue = String(currentValue ?? "").length > 0;
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    const strength = showStrength ? getPasswordStrength(String(currentValue ?? "")) : null;
    const activeSegments = strength ? STRENGTH_SEGMENTS[strength] : 0;
    return /* @__PURE__ */ jsxs("div", { className: buildContainerClasses(className, unstyled), children: [
      /* @__PURE__ */ jsxs("div", { className: buildWrapperClasses(size), children: [
        /* @__PURE__ */ jsx("div", { className: PASSWORDFIELD_CLASSES.iconLeading, children: /* @__PURE__ */ jsx(Lock, { size: 16 }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id: inputId,
            type: showPassword ? "text" : "password",
            name,
            value: currentValue,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            required,
            placeholder,
            autoFocus,
            autoComplete: showPassword ? "off" : "current-password",
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildInputClasses(),
            ...props
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            onClick: toggleVisibility,
            disabled,
            "aria-label": showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a",
            className: PASSWORDFIELD_CLASSES.iconTrailing,
            style: { background: "none", border: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer" },
            children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsxs("label", { htmlFor: inputId, className: buildLabelClasses(isFloating), children: [
          label ?? "Contrase\xF1a",
          required && /* @__PURE__ */ jsx("span", { className: PASSWORDFIELD_CLASSES.required, children: " *" })
        ] })
      ] }),
      showStrength && hasValue && strength && /* @__PURE__ */ jsxs("div", { className: `${PASSWORDFIELD_CLASSES.paddingX} ${PASSWORDFIELD_CLASSES.strength}`, children: [
        /* @__PURE__ */ jsx("div", { className: PASSWORDFIELD_CLASSES.strengthBar, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: buildStrengthSegmentClasses(i, activeSegments, strength)
          },
          i
        )) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `${PASSWORDFIELD_CLASSES.strengthLabel} ${PASSWORDFIELD_CLASSES.strengthModifiers[strength]}`,
            children: STRENGTH_LABELS[strength]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: PASSWORDFIELD_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-error`,
          className: `${PASSWORDFIELD_CLASSES.message} ${PASSWORDFIELD_CLASSES.messageError}`,
          role: "alert",
          children: fieldError
        }
      ) : helperText ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${PASSWORDFIELD_CLASSES.message} ${PASSWORDFIELD_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
PasswordField.displayName = "PasswordField";
var PasswordField_default = PasswordField;
export {
  PasswordField,
  PasswordField_default as default
};
//# sourceMappingURL=PasswordField.js.map
