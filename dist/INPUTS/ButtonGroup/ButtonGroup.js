"use client";
import { jsx } from "react/jsx-runtime";
import React from "react";
import { BUTTON_GROUP_DEFAULTS } from "./ButtonGroup.constants";
import { buildButtonGroupClasses, getButtonPosition } from "./ButtonGroup.utils";
import { useButtonGroupFormContext } from "./ButtonGroup.hooks";
const ButtonGroup = ({
  children,
  variant = BUTTON_GROUP_DEFAULTS.variant,
  color = BUTTON_GROUP_DEFAULTS.color,
  size = BUTTON_GROUP_DEFAULTS.size,
  orientation = BUTTON_GROUP_DEFAULTS.orientation,
  fullWidth = BUTTON_GROUP_DEFAULTS.fullWidth,
  disabled = BUTTON_GROUP_DEFAULTS.disabled,
  responsive = BUTTON_GROUP_DEFAULTS.responsive,
  unstyled = BUTTON_GROUP_DEFAULTS.unstyled,
  className = BUTTON_GROUP_DEFAULTS.className,
  ...props
}) => {
  useButtonGroupFormContext();
  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement
  );
  const total = validChildren.length;
  const modifiedChildren = validChildren.map((child, index) => {
    const position = getButtonPosition(index, total);
    return React.cloneElement(child, {
      variant: child.props.variant ?? variant,
      color: child.props.color ?? color,
      size: child.props.size ?? size,
      fullWidth: orientation === "vertical" ? true : child.props.fullWidth ?? false,
      disabled: disabled || (child.props.disabled ?? false),
      // Forzar type="button" si no se especifica, para evitar submits accidentales
      type: child.props.type ?? "button",
      // Atributos de datos para el CSS de border-radius
      "data-button-group-child": true,
      "data-button-position": position
    });
  });
  const classes = buildButtonGroupClasses(orientation, fullWidth, disabled, responsive, className, unstyled);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classes,
      role: "group",
      "aria-label": props["aria-label"] ?? "button group",
      "aria-orientation": orientation,
      ...props,
      children: modifiedChildren
    }
  );
};
ButtonGroup.displayName = "ButtonGroup";
var ButtonGroup_default = ButtonGroup;
export {
  ButtonGroup,
  ButtonGroup_default as default
};
//# sourceMappingURL=ButtonGroup.js.map
