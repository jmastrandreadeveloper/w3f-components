"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import { buildToggleButtonClasses, buildToggleGroupClasses, isSelected } from "./ToggleButton.utils";
import { useToggleGroup } from "./ToggleButton.hooks";
import { TOGGLE_GROUP_CLASSES, TOGGLE_BUTTON_DEFAULTS, TOGGLE_GROUP_DEFAULTS } from "./ToggleButton.constants";
const ToggleButton = forwardRef(({
  children,
  value,
  selected = TOGGLE_BUTTON_DEFAULTS.selected,
  onChange,
  color = TOGGLE_BUTTON_DEFAULTS.color,
  size = TOGGLE_BUTTON_DEFAULTS.size,
  fullWidth = TOGGLE_BUTTON_DEFAULTS.fullWidth,
  className = TOGGLE_BUTTON_DEFAULTS.className,
  disabled = TOGGLE_BUTTON_DEFAULTS.disabled,
  "aria-label": ariaLabel,
  role,
  "aria-checked": ariaChecked,
  unstyled = TOGGLE_BUTTON_DEFAULTS.unstyled,
  ...props
}, ref) => {
  const handleClick = (event) => {
    if (!disabled && onChange) {
      onChange(event, value);
    }
  };
  const handleKeyDown = (event) => {
    if ((event.key === " " || event.key === "Enter") && !disabled) {
      event.preventDefault();
      if (onChange) onChange(event, value);
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      role: role ?? "button",
      className: buildToggleButtonClasses(selected, color, size, fullWidth, disabled, className, unstyled),
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      "aria-pressed": role ? void 0 : selected,
      "aria-checked": ariaChecked,
      "aria-label": ariaLabel,
      "aria-disabled": disabled,
      disabled,
      tabIndex: disabled ? -1 : 0,
      ...props,
      children
    }
  );
});
ToggleButton.displayName = "ToggleButton";
const ToggleButtonGroup = forwardRef(({
  name,
  value,
  onChange,
  exclusive = TOGGLE_GROUP_DEFAULTS.exclusive,
  color = TOGGLE_GROUP_DEFAULTS.color,
  size = TOGGLE_GROUP_DEFAULTS.size,
  fullWidth = TOGGLE_GROUP_DEFAULTS.fullWidth,
  orientation = TOGGLE_GROUP_DEFAULTS.orientation,
  className = TOGGLE_GROUP_DEFAULTS.className,
  children,
  label,
  error: propError,
  helperText,
  required = TOGGLE_GROUP_DEFAULTS.required,
  disabled = TOGGLE_GROUP_DEFAULTS.disabled,
  "aria-label": ariaLabel,
  ...props
}, ref) => {
  const { currentValue, groupError, handleToggleChange } = useToggleGroup({
    name,
    value,
    onChange,
    exclusive,
    disabled
  });
  const fieldError = name ? groupError : propError;
  const hasError = Boolean(fieldError);
  const validChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child)
  );
  return /* @__PURE__ */ jsxs("div", { ref, className: TOGGLE_GROUP_CLASSES.wrapper, children: [
    label && /* @__PURE__ */ jsxs("label", { className: TOGGLE_GROUP_CLASSES.label, children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: TOGGLE_GROUP_CLASSES.required, children: " *" })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: buildToggleGroupClasses(orientation, fullWidth, hasError, disabled, className),
        role: exclusive ? "radiogroup" : "group",
        "aria-label": ariaLabel || label,
        "aria-required": required,
        "aria-invalid": hasError,
        "aria-describedby": fieldError ? `${name ?? "tg"}-error` : helperText ? `${name ?? "tg"}-helper` : void 0,
        ...props,
        children: validChildren.map((child) => {
          const buttonValue = child.props.value;
          const selected = isSelected(buttonValue, currentValue, exclusive);
          return React.cloneElement(child, {
            key: String(buttonValue),
            selected,
            onChange: handleToggleChange,
            color: child.props.color ?? color,
            size: child.props.size ?? size,
            fullWidth,
            disabled: child.props.disabled || disabled,
            role: exclusive ? "radio" : "checkbox",
            "aria-checked": selected
          });
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: TOGGLE_GROUP_CLASSES.paddingX, children: fieldError ? /* @__PURE__ */ jsx(
      "p",
      {
        id: `${name ?? "tg"}-error`,
        className: `${TOGGLE_GROUP_CLASSES.message} ${TOGGLE_GROUP_CLASSES.messageError}`,
        role: "alert",
        children: fieldError
      }
    ) : helperText ? /* @__PURE__ */ jsx(
      "p",
      {
        id: `${name ?? "tg"}-helper`,
        className: `${TOGGLE_GROUP_CLASSES.message} ${TOGGLE_GROUP_CLASSES.messageHelper}`,
        children: helperText
      }
    ) : null }),
    name && /* @__PURE__ */ jsx(
      "input",
      {
        type: "hidden",
        name,
        value: exclusive ? String(currentValue ?? "") : JSON.stringify(currentValue)
      }
    )
  ] });
});
ToggleButtonGroup.displayName = "ToggleButtonGroup";
var ToggleButton_default = ToggleButtonGroup;
export {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButton_default as default
};
//# sourceMappingURL=ToggleButton.js.map
