"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useId, useState } from "react";
import { SELECT_CLASSES, SELECT_DEFAULTS } from "./Select.constants";
import { isOptionGroup, buildSelectClasses, buildLabelClasses, hasSelectValue } from "./Select.utils";
import { useSelectFormContext, useSelectFocus } from "./Select.hooks";
import { useBridgeBind } from "@w3f/bridge";
function renderOptions(items) {
  return items.map((item, index) => {
    if (isOptionGroup(item)) {
      return /* @__PURE__ */ jsx("optgroup", { label: item.label, disabled: item.disabled, children: item.options.map((opt, i) => /* @__PURE__ */ jsx(
        "option",
        {
          value: opt.value === null || opt.value === void 0 ? "" : String(opt.value),
          disabled: opt.disabled,
          children: opt.label
        },
        `opt-${index}-${i}`
      )) }, `group-${index}`);
    }
    return /* @__PURE__ */ jsx(
      "option",
      {
        value: item.value === null || item.value === void 0 ? "" : String(item.value),
        disabled: item.disabled,
        children: item.label
      },
      `opt-${index}`
    );
  });
}
const DefaultChevron = () => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
  }
);
const Select = forwardRef(
  ({
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
  }, ref) => {
    const formContext = useSelectFormContext();
    const isFormControlled = !!(formContext && name);
    const { dispatch } = useBridgeBind({ bindId });
    const [internalValue, setInternalValue] = useState(
      multiple ? [] : ""
    );
    const { isFocused, onFocus, onBlur: onBlurFocus } = useSelectFocus();
    const inputId = useId();
    const currentValue = isFormControlled ? formContext.values[name] !== void 0 ? formContext.values[name] : multiple ? [] : "" : externalValue !== void 0 ? externalValue : internalValue;
    const inputError = isFormControlled ? formContext.errors[name] : propError;
    const hasError = Boolean(inputError);
    const handleChange = (e) => {
      const val = multiple ? Array.from(e.target.options).filter((o) => o.selected).map((o) => o.value) : e.target.value;
      if (isFormControlled && formContext) {
        formContext.handleChange(e);
      } else if (externalOnChange) {
        externalOnChange(e);
      } else {
        setInternalValue(val);
      }
      dispatch("change", { value: val });
    };
    const handleBlur = (e) => {
      onBlurFocus();
      if (isFormControlled && formContext) formContext.handleBlur(e);
      dispatch("blur", { value: e.target.value });
      if (externalOnBlur) externalOnBlur(e);
    };
    const isFloating = isFocused || hasSelectValue(currentValue);
    const finalTrailingIcon = trailingIcon ?? (!multiple ? /* @__PURE__ */ jsx(DefaultChevron, {}) : null);
    return /* @__PURE__ */ jsxs("div", { className: [SELECT_CLASSES.container, unstyled && "w3f-select-container--unstyled", className].filter(Boolean).join(" "), children: [
      /* @__PURE__ */ jsxs("div", { className: SELECT_CLASSES.wrapper, children: [
        leadingIcon && /* @__PURE__ */ jsx("div", { className: SELECT_CLASSES.iconLeading, children: leadingIcon }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            ref,
            id: inputId,
            name,
            value: currentValue,
            onChange: handleChange,
            onFocus,
            onBlur: handleBlur,
            disabled,
            required,
            multiple,
            autoFocus,
            "aria-invalid": hasError,
            "aria-describedby": inputError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
            className: buildSelectClasses(
              Boolean(leadingIcon),
              Boolean(finalTrailingIcon),
              unstyled,
              variant
            ),
            ...props,
            children: [
              !multiple && /* @__PURE__ */ jsx("option", { value: "", disabled: true, hidden: true }),
              renderOptions(options)
            ]
          }
        ),
        finalTrailingIcon && /* @__PURE__ */ jsx("div", { className: SELECT_CLASSES.iconTrailing, children: finalTrailingIcon }),
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
              required && /* @__PURE__ */ jsx("span", { className: SELECT_CLASSES.required, children: " *" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: SELECT_CLASSES.paddingX, children: inputError ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-error`,
          className: `${SELECT_CLASSES.message} ${SELECT_CLASSES.messageError}`,
          role: "alert",
          children: inputError
        }
      ) : helperText ? /* @__PURE__ */ jsx(
        "p",
        {
          id: `${inputId}-helper`,
          className: `${SELECT_CLASSES.message} ${SELECT_CLASSES.messageHelper}`,
          children: helperText
        }
      ) : null })
    ] });
  }
);
Select.displayName = "Select";
var Select_default = Select;
export {
  Select,
  Select_default as default
};
//# sourceMappingURL=Select.js.map
