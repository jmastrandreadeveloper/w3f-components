"use client";
import { jsx } from "react/jsx-runtime";
import { BUTTON_TOGGLE_DEFAULTS } from "./ButtonToggle.constants";
import {
  buildButtonToggleClasses,
  isOptionActive,
  computeNewSelection
} from "./ButtonToggle.utils";
import { useButtonToggle } from "./ButtonToggle.hooks";
import Button from "../Button/Button";
const ButtonToggle = ({
  options = BUTTON_TOGGLE_DEFAULTS.options,
  onSelect,
  value,
  defaultValue,
  multiple = BUTTON_TOGGLE_DEFAULTS.multiple,
  allowDeselect = BUTTON_TOGGLE_DEFAULTS.allowDeselect,
  color = BUTTON_TOGGLE_DEFAULTS.color,
  size = BUTTON_TOGGLE_DEFAULTS.size,
  disabled = BUTTON_TOGGLE_DEFAULTS.disabled,
  unstyled = BUTTON_TOGGLE_DEFAULTS.unstyled,
  ariaLabel,
  className = BUTTON_TOGGLE_DEFAULTS.className,
  name,
  onChange,
  ...props
}) => {
  const { formContext, isFormControlled, currentValue, setInternalValue } = useButtonToggle({ name, multiple, defaultValue, value });
  const handleSelect = (optionValue) => {
    const newSelection = computeNewSelection(
      optionValue,
      currentValue,
      multiple,
      allowDeselect
    );
    if (isFormControlled && formContext) {
      formContext.handleChange({
        target: {
          name,
          value: newSelection,
          type: multiple ? "select-multiple" : "select"
        }
      });
      formContext.handleBlur({
        target: { name, value: newSelection }
      });
    } else if (onChange) {
      onChange({ target: { name, value: newSelection } });
    } else if (value === void 0) {
      setInternalValue(newSelection);
    }
    if (onSelect) onSelect(newSelection);
  };
  if (!options.length) return null;
  const classes = buildButtonToggleClasses(className, unstyled);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classes,
      role: "group",
      "aria-label": ariaLabel ?? (name ? `${name} toggle` : "button toggle"),
      ...props,
      children: options.map((option) => {
        const active = isOptionActive(option.value, currentValue, multiple);
        return /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: active ? "raised" : "outline",
            color,
            size,
            disabled: disabled || option.disabled,
            onClick: () => handleSelect(option.value),
            "aria-pressed": active,
            children: option.label
          },
          option.value
        );
      })
    }
  );
};
ButtonToggle.displayName = "ButtonToggle";
var ButtonToggle_default = ButtonToggle;
export {
  ButtonToggle,
  ButtonToggle_default as default
};
//# sourceMappingURL=ButtonToggle.js.map
