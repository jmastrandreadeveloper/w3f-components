"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { CHECKBOX_DEFAULTS, CHECKBOX_CLASSES } from "./Checkbox.constants";
import {
  buildCheckboxContainerClasses,
  buildCheckboxWrapperClasses,
  buildCheckboxInputClasses
} from "./Checkbox.utils";
import { useCheckbox } from "./Checkbox.hooks";
import { useBridgeBind } from "@w3f/bridge";
const Checkbox = forwardRef(({
  label,
  name,
  checked = CHECKBOX_DEFAULTS.checked,
  onChange,
  onBlur,
  disabled = CHECKBOX_DEFAULTS.disabled,
  children,
  className = CHECKBOX_DEFAULTS.className,
  ariaLabel,
  ariaDescribedBy,
  value,
  color = CHECKBOX_DEFAULTS.color,
  unstyled = CHECKBOX_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const { formContext, isFormControlled, checkboxValue, setIsChecked, uniqueId } = useCheckbox({ name, checked });
  const { dispatch } = useBridgeBind({ bindId });
  const handleChange = (e) => {
    if (disabled) return;
    const newChecked = e.target.checked;
    if (isFormControlled && formContext) {
      formContext.handleChange(e);
    } else {
      setIsChecked(newChecked);
    }
    dispatch("change", { value: newChecked });
    if (onChange) onChange(newChecked);
  };
  const handleBlur = (e) => {
    if (isFormControlled && formContext) {
      formContext.handleBlur(e);
    }
    if (onBlur) onBlur(e);
  };
  return /* @__PURE__ */ jsxs("div", { className: buildCheckboxContainerClasses(className, unstyled), children: [
    /* @__PURE__ */ jsxs("div", { className: buildCheckboxWrapperClasses(disabled, unstyled), children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ref,
          id: uniqueId,
          type: "checkbox",
          name,
          value,
          className: buildCheckboxInputClasses(color, unstyled),
          checked: checkboxValue,
          onChange: handleChange,
          onBlur: handleBlur,
          disabled,
          "aria-label": ariaLabel,
          "aria-describedby": ariaDescribedBy,
          "aria-checked": checkboxValue,
          ...props
        }
      ),
      /* @__PURE__ */ jsx("label", { htmlFor: uniqueId, className: CHECKBOX_CLASSES.label, children: label })
    ] }),
    checkboxValue && children && /* @__PURE__ */ jsx("div", { className: CHECKBOX_CLASSES.children, children })
  ] });
});
Checkbox.displayName = "Checkbox";
var Checkbox_default = Checkbox;
export {
  Checkbox,
  Checkbox_default as default
};
//# sourceMappingURL=Checkbox.js.map
