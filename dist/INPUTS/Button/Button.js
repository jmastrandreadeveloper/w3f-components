"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { BUTTON_DEFAULTS, BUTTON_CLASSES } from "./Button.constants";
import { buildButtonClasses } from "./Button.utils";
import { useButtonFormContext } from "./Button.hooks";
import { useBridgeBind } from "@w3f/bridge";
const Button = forwardRef(
  ({
    children,
    text,
    onClick,
    type = BUTTON_DEFAULTS.type,
    variant = BUTTON_DEFAULTS.variant,
    color = BUTTON_DEFAULTS.color,
    size = BUTTON_DEFAULTS.size,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    icon = null,
    iconPosition = BUTTON_DEFAULTS.iconPosition,
    className = BUTTON_DEFAULTS.className,
    disabled = BUTTON_DEFAULTS.disabled,
    unstyled = BUTTON_DEFAULTS.unstyled,
    bindId,
    ...props
  }, ref) => {
    const formContext = useButtonFormContext();
    const isFormControlled = !!formContext;
    const { dispatch } = useBridgeBind({ bindId });
    const handleClick = (e) => {
      dispatch("click");
      if (onClick) onClick(e);
    };
    const effectiveType = isFormControlled && type === "button" ? "button" : type;
    const classes = buildButtonClasses(variant, color, size, fullWidth, className, unstyled);
    const content = children ?? text;
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: effectiveType,
        className: classes,
        onClick: handleClick,
        disabled,
        ...props,
        children: /* @__PURE__ */ jsxs("span", { className: BUTTON_CLASSES.content, children: [
          icon && iconPosition === "left" && /* @__PURE__ */ jsx("span", { className: BUTTON_CLASSES.icon, children: icon }),
          /* @__PURE__ */ jsx("span", { className: BUTTON_CLASSES.text, children: content }),
          icon && iconPosition === "right" && /* @__PURE__ */ jsx("span", { className: BUTTON_CLASSES.icon, children: icon })
        ] })
      }
    );
  }
);
Button.displayName = "Button";
var Button_default = Button;
export {
  Button,
  Button_default as default
};
//# sourceMappingURL=Button.js.map
