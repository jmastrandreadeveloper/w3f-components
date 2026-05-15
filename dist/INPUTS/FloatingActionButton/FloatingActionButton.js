"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FAB_DEFAULTS, FAB_CLASSES } from "./FloatingActionButton.constants";
import {
  buildFabClasses,
  buildFabStyle,
  buildFabMessageStyle,
  buildFabGroupClasses
} from "./FloatingActionButton.utils";
import { useFabFormContext } from "./FloatingActionButton.hooks";
const FloatingActionButton = ({
  name,
  onClick,
  children,
  text,
  label,
  title = FAB_DEFAULTS.title,
  offset = FAB_DEFAULTS.offset,
  color = FAB_DEFAULTS.color,
  size = FAB_DEFAULTS.size,
  extended = FAB_DEFAULTS.extended,
  position = FAB_DEFAULTS.position,
  mobileIconOnly = FAB_DEFAULTS.mobileIconOnly,
  disabled = FAB_DEFAULTS.disabled,
  type = FAB_DEFAULTS.type,
  error,
  helperText,
  className = FAB_DEFAULTS.className,
  unstyled = FAB_DEFAULTS.unstyled,
  ...props
}) => {
  const formContext = useFabFormContext();
  const isFormControlled = !!(formContext && name);
  const fabError = isFormControlled ? formContext.errors[name] : error;
  const hasError = Boolean(fabError);
  const handleClick = (e) => {
    if (disabled) return;
    if (isFormControlled && formContext && name) {
      const currentValue = formContext.values[name] ?? 0;
      if (typeof currentValue === "number") {
        formContext.setFieldValue(name, currentValue + 1);
      } else {
        formContext.setFieldValue(name, true);
      }
    }
    if (onClick) onClick(e);
  };
  const finalTitle = text || title;
  const classes = buildFabClasses(
    size,
    color,
    position,
    extended,
    Boolean(text),
    mobileIconOnly,
    disabled,
    hasError,
    className,
    unstyled
  );
  const fabStyle = buildFabStyle(position, offset);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: classes,
        onClick: handleClick,
        style: fabStyle,
        title: finalTitle,
        "aria-label": finalTitle,
        "aria-invalid": hasError,
        "aria-describedby": fabError ? `${name}-error` : helperText ? `${name}-helper` : void 0,
        disabled,
        type,
        ...props,
        children: [
          children && /* @__PURE__ */ jsx("span", { className: FAB_CLASSES.icon, children }),
          text && /* @__PURE__ */ jsx("span", { className: FAB_CLASSES.text, children: text }),
          label && /* @__PURE__ */ jsx("span", { className: FAB_CLASSES.label, children: label })
        ]
      }
    ),
    (fabError || helperText) && /* @__PURE__ */ jsx(
      "div",
      {
        className: FAB_CLASSES.message,
        style: buildFabMessageStyle(position, offset),
        children: fabError ? /* @__PURE__ */ jsx(
          "p",
          {
            id: `${name}-error`,
            className: "w3f-input-message w3f-input-message--error w3f-fab-message__bubble",
            role: "alert",
            children: fabError
          }
        ) : helperText ? /* @__PURE__ */ jsx(
          "p",
          {
            id: `${name}-helper`,
            className: "w3f-input-message w3f-input-message--helper w3f-fab-message__bubble w3f-fab-message__bubble--helper",
            children: helperText
          }
        ) : null
      }
    )
  ] });
};
FloatingActionButton.displayName = "FloatingActionButton";
const FloatingActionButtonGroup = ({
  children,
  isOpen = false,
  offset = FAB_DEFAULTS.offset,
  position = FAB_DEFAULTS.position,
  className = ""
}) => {
  const classes = buildFabGroupClasses(isOpen, className);
  const groupStyle = {
    bottom: `${offset}px`,
    ...position.includes("left") && {
      left: "var(--w3f-space-6)",
      right: "auto"
    },
    ...position.includes("top") && {
      top: `${offset}px`,
      bottom: "auto"
    }
  };
  return /* @__PURE__ */ jsx("div", { className: classes, style: groupStyle, children });
};
FloatingActionButtonGroup.displayName = "FloatingActionButtonGroup";
var FloatingActionButton_default = FloatingActionButton;
export {
  FloatingActionButton,
  FloatingActionButtonGroup,
  FloatingActionButton_default as default
};
//# sourceMappingURL=FloatingActionButton.js.map
