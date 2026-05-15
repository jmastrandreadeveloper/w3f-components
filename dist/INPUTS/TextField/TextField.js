"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId, useRef } from "react";
import { X } from "lucide-react";
import { TEXTFIELD_CLASSES, TEXTFIELD_DEFAULTS } from "./TextField.constants";
import { buildContainerClasses, buildWrapperClasses, buildInputClasses, buildLabelClasses, stripDigits, isDigitKey } from "./TextField.utils";
import { useTextFieldFormContext, useTextFieldFocus } from "./TextField.hooks";
const TextField = forwardRef(
  ({
    label,
    name,
    value: externalValue,
    onChange: externalOnChange,
    type = TEXTFIELD_DEFAULTS.type,
    error: propError,
    helperText,
    disabled = TEXTFIELD_DEFAULTS.disabled,
    required = TEXTFIELD_DEFAULTS.required,
    size = TEXTFIELD_DEFAULTS.size,
    leadingIcon,
    trailingIcon,
    onIconClick,
    placeholder,
    unstyled = TEXTFIELD_DEFAULTS.unstyled,
    className = "",
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    maxLength,
    showCount = TEXTFIELD_DEFAULTS.showCount,
    clearable = TEXTFIELD_DEFAULTS.clearable,
    onClear,
    autoFocus = TEXTFIELD_DEFAULTS.autoFocus,
    onKeyDown: onKeyDownProp,
    ...props
  }, ref) => {
    const formContext = useTextFieldFormContext();
    const isFormControlled = !!(formContext && name);
    const { isFocused, onFocus: onFocusHook, onBlur: onBlurHook } = useTextFieldFocus();
    const inputId = useId();
    const internalRef = useRef(null);
    const inputRef = ref ?? internalRef;
    const currentValue = isFormControlled ? formContext.values[name] ?? "" : externalValue !== void 0 ? externalValue : void 0;
    const fieldError = isFormControlled ? formContext.errors[name] : propError;
    const hasError = Boolean(fieldError);
    const handleChange = (e) => {
      const filtered = stripDigits(e.target.value);
      if (filtered === e.target.value) {
        if (isFormControlled && formContext) {
          formContext.handleChange(e);
        } else if (externalOnChange) {
          externalOnChange(e);
        }
      } else {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: filtered, name: e.target.name }
        };
        if (isFormControlled && formContext) {
          formContext.handleChange(syntheticEvent);
        } else if (externalOnChange) {
          externalOnChange(syntheticEvent);
        }
      }
    };
    const handleKeyDown = (e) => {
      if (isDigitKey(e.key)) {
        e.preventDefault();
      }
      if (onKeyDownProp) onKeyDownProp(e);
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
    const handleClear = () => {
      if (isFormControlled && formContext && name) {
        formContext.setFieldValue(name, "");
      } else if (externalOnChange) {
        const syntheticEvent = {
          target: { name: name ?? "", value: "", type: "text" }
        };
        externalOnChange(syntheticEvent);
      }
      if (onClear) onClear();
      inputRef.current?.focus();
    };
    const currentLength = String(currentValue ?? "").length;
    const hasValue = currentLength > 0;
    const isFloating = isFocused || hasValue || Boolean(placeholder);
    const showClearButton = clearable && hasValue && !disabled;
    const hasTrailingContent = Boolean(trailingIcon) || showClearButton;
    return /* @__PURE__ */ jsxs("div", { className: buildContainerClasses(className, unstyled), children: [
      /* @__PURE__ */ jsxs("div", { className: buildWrapperClasses(size), children: [
        leadingIcon && /* @__PURE__ */ jsx("div", { className: TEXTFIELD_CLASSES.iconLeading, children: leadingIcon }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            id: inputId,
            type,
            name,
            value: currentValue,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            required,
            placeholder,
            maxLength,
            autoFocus,
            "aria-invalid": hasError,
            "aria-describedby": fieldError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildInputClasses(Boolean(leadingIcon), hasTrailingContent),
            ...props
          }
        ),
        (trailingIcon || showClearButton) && /* @__PURE__ */ jsx(
          "div",
          {
            className: TEXTFIELD_CLASSES.iconTrailing,
            onClick: showClearButton ? handleClear : onIconClick,
            style: { cursor: showClearButton || onIconClick ? "pointer" : "default" },
            children: showClearButton ? /* @__PURE__ */ jsx(X, { size: 16 }) : trailingIcon
          }
        ),
        /* @__PURE__ */ jsxs(
          "label",
          {
            htmlFor: inputId,
            className: buildLabelClasses(isFloating, !isFloating && Boolean(leadingIcon)),
            children: [
              label,
              required && /* @__PURE__ */ jsx("span", { className: TEXTFIELD_CLASSES.required, children: " *" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: TEXTFIELD_CLASSES.paddingX, children: [
        showCount && maxLength && /* @__PURE__ */ jsxs("span", { className: TEXTFIELD_CLASSES.count, children: [
          currentLength,
          "/",
          maxLength
        ] }),
        fieldError ? /* @__PURE__ */ jsx(
          "p",
          {
            id: `${inputId}-error`,
            className: `${TEXTFIELD_CLASSES.message} ${TEXTFIELD_CLASSES.messageError}`,
            role: "alert",
            children: fieldError
          }
        ) : helperText ? /* @__PURE__ */ jsx(
          "p",
          {
            id: `${inputId}-helper`,
            className: `${TEXTFIELD_CLASSES.message} ${TEXTFIELD_CLASSES.messageHelper}`,
            children: helperText
          }
        ) : null
      ] })
    ] });
  }
);
TextField.displayName = "TextField";
var TextField_default = TextField;
export {
  TextField,
  TextField_default as default
};
//# sourceMappingURL=TextField.js.map
