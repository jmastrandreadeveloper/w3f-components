"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from "react";
import Icon from "../../DATADISPLAY/Icon/Icon";
import { INPUT_CLASSES, INPUT_DEFAULTS } from "./Input.constants";
import {
  buildInputClasses,
  buildLabelClasses,
  buildIconClasses,
  buildContainerClasses,
  buildWrapperClasses
} from "./Input.utils";
import { useInputFormContext, useInputFocus, useInputMask, usePatternValidation } from "./Input.hooks";
import { useBridgeBind } from "@w3f/bridge";
const renderIconContent = (iconProp) => {
  if (!iconProp) return null;
  if (typeof iconProp === "string") {
    return /* @__PURE__ */ jsx(Icon, { name: iconProp, size: "sm", className: "w3f-text-gray" });
  }
  return iconProp;
};
const Input = forwardRef(
  ({
    label,
    type = INPUT_DEFAULTS.type,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled = INPUT_DEFAULTS.disabled,
    required = INPUT_DEFAULTS.required,
    autoComplete,
    autoFocus = INPUT_DEFAULTS.autoFocus,
    leadingIcon,
    trailingIcon,
    onIconClick,
    className = INPUT_DEFAULTS.className,
    unstyled = INPUT_DEFAULTS.unstyled,
    size = INPUT_DEFAULTS.size,
    onBlur,
    bindId,
    mask,
    pattern,
    variant,
    ...props
  }, ref) => {
    const formContext = useInputFormContext();
    const inputId = useId();
    const { dispatch } = useBridgeBind({ bindId });
    const isFormControlled = !!(formContext && name);
    const isControlled = isFormControlled || value !== void 0;
    const rawInputValue = isFormControlled ? formContext.values[name] ?? "" : value;
    const inputError = isFormControlled ? formContext.errors[name] : error;
    const { maskDef, displayValue, cleanValue, formatAndUpdate, placeholder: maskPlaceholder, maxLength: maskMaxLength } = useInputMask(mask, rawInputValue);
    const inputValue = maskDef ? displayValue : rawInputValue;
    const { patternError, validateOnBlur } = usePatternValidation(pattern);
    const resolvedError = inputError || patternError;
    const { isFocused, handleFocus, handleBlurFocus } = useInputFocus(disabled);
    const handleBlur = (e) => {
      handleBlurFocus(e.target.value !== "");
      if (pattern) validateOnBlur(maskDef ? cleanValue ?? e.target.value : e.target.value);
      if (isFormControlled) formContext.handleBlur(e);
      dispatch("blur", { value: e.target.value });
      if (onBlur) onBlur(e);
    };
    const handleChange = (e) => {
      if (maskDef) {
        const formatted = formatAndUpdate(e.target.value);
        if (isFormControlled && name) {
          const clean = maskDef.cleanValue(formatted);
          const syntheticEvent = { ...e, target: { ...e.target, name, value: clean } };
          formContext.handleChange(syntheticEvent);
        }
        dispatch("change", { value: maskDef.cleanValue(formatted) });
        if (onChange) onChange(e);
        return;
      }
      if (isFormControlled) formContext.handleChange(e);
      dispatch("change", { value: e.target.value });
      if (onChange) onChange(e);
    };
    const alwaysFloatTypes = ["date", "time", "datetime-local", "month", "week", "color"];
    const hasValue = isControlled ? inputValue !== "" && inputValue !== void 0 && inputValue !== null : false;
    const isFloating = isFocused || hasValue || alwaysFloatTypes.includes(type);
    const hasError = Boolean(resolvedError);
    return /* @__PURE__ */ jsxs("div", { className: buildContainerClasses(className, unstyled), children: [
      /* @__PURE__ */ jsxs("div", { className: buildWrapperClasses(size), children: [
        leadingIcon && /* @__PURE__ */ jsx("div", { className: buildIconClasses("leading"), children: renderIconContent(leadingIcon) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id: inputId,
            type,
            name,
            ...isControlled || maskDef ? { value: inputValue ?? "" } : { defaultValue: "" },
            onChange: handleChange,
            onFocus: (e) => {
              handleFocus();
              dispatch("focus", { value: e.target.value });
            },
            onBlur: handleBlur,
            disabled,
            required,
            autoComplete,
            autoFocus,
            "aria-invalid": hasError,
            "aria-describedby": resolvedError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            placeholder: maskPlaceholder || props.placeholder,
            maxLength: maskMaxLength || props.maxLength,
            className: buildInputClasses(
              Boolean(leadingIcon),
              Boolean(trailingIcon),
              void 0,
              unstyled,
              variant
            ),
            ...props
          }
        ),
        trailingIcon && /* @__PURE__ */ jsx(
          "div",
          {
            className: buildIconClasses("trailing", Boolean(onIconClick)),
            onClick: onIconClick,
            role: onIconClick ? "button" : void 0,
            children: renderIconContent(trailingIcon)
          }
        ),
        /* @__PURE__ */ jsxs("label", { htmlFor: inputId, className: buildLabelClasses(isFloating, !isFloating && Boolean(leadingIcon)), children: [
          label,
          required && /* @__PURE__ */ jsx("span", { className: INPUT_CLASSES.required, children: " *" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: INPUT_CLASSES.paddingX, children: resolvedError ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-error`,
          className: `${INPUT_CLASSES.message} ${INPUT_CLASSES.messageError}`,
          role: "alert",
          children: resolvedError
        }
      ) : helperText ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${INPUT_CLASSES.message} ${INPUT_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
Input.displayName = "Input";
var Input_default = Input;
export {
  Input,
  Input_default as default
};
//# sourceMappingURL=Input.js.map
