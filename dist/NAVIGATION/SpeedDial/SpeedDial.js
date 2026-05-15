"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef, useRef, useCallback } from "react";
import { Plus } from "lucide-react";
import {
  SPEED_DIAL_DEFAULTS,
  SPEED_DIAL_ACTION_DEFAULTS,
  SPEED_DIAL_CLASSES
} from "./SpeedDial.constants";
import {
  buildSpeedDialClasses,
  buildFabClasses,
  buildActionsClasses,
  buildActionFabClasses,
  buildActionTooltipClasses,
  buildOffsetStyle,
  defaultTooltipPlacement
} from "./SpeedDial.utils";
import {
  useSpeedDialOpen,
  useSpeedDialHover,
  useSpeedDialEscKey
} from "./SpeedDial.hooks";
const SpeedDialAction = ({
  icon,
  tooltipTitle,
  tooltipOpen = SPEED_DIAL_ACTION_DEFAULTS.tooltipOpen,
  tooltipPlacement,
  onClick,
  color,
  disabled = SPEED_DIAL_ACTION_DEFAULTS.disabled,
  className = SPEED_DIAL_ACTION_DEFAULTS.className,
  _direction = SPEED_DIAL_ACTION_DEFAULTS._direction,
  _onActionClick,
  ...rest
}) => {
  const placement = tooltipPlacement || defaultTooltipPlacement(_direction);
  const fabClasses = buildActionFabClasses(color, className);
  const tooltipClasses = buildActionTooltipClasses(placement, tooltipOpen);
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (_onActionClick) _onActionClick(e);
  };
  return /* @__PURE__ */ jsxs("div", { className: SPEED_DIAL_CLASSES.action, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: fabClasses,
        onClick: handleClick,
        disabled,
        "aria-label": tooltipTitle,
        ...rest,
        children: icon
      }
    ),
    tooltipTitle && /* @__PURE__ */ jsx("span", { className: tooltipClasses, children: tooltipTitle })
  ] });
};
SpeedDialAction.displayName = "SpeedDialAction";
const SpeedDial = forwardRef(
  ({
    ariaLabel,
    children,
    icon,
    openIcon,
    direction = SPEED_DIAL_DEFAULTS.direction,
    open: openProp,
    defaultOpen = SPEED_DIAL_DEFAULTS.defaultOpen,
    onOpen,
    onClose,
    hidden = SPEED_DIAL_DEFAULTS.hidden,
    color = SPEED_DIAL_DEFAULTS.color,
    size = SPEED_DIAL_DEFAULTS.size,
    position = SPEED_DIAL_DEFAULTS.position,
    offset,
    openOnHover = SPEED_DIAL_DEFAULTS.openOnHover,
    backdrop = SPEED_DIAL_DEFAULTS.backdrop,
    unstyled = SPEED_DIAL_DEFAULTS.unstyled,
    className = SPEED_DIAL_DEFAULTS.className,
    ...rest
  }, ref) => {
    const containerRef = useRef(null);
    const mergedRef = useCallback(
      (node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          ref.current = node;
      },
      [ref]
    );
    const { isOpen, handleOpen, handleClose, handleToggle, handleActionClick } = useSpeedDialOpen(openProp, defaultOpen, onOpen, onClose);
    const { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur } = useSpeedDialHover(
      openOnHover,
      handleOpen,
      handleClose,
      containerRef
    );
    useSpeedDialEscKey(
      isOpen,
      handleClose
    );
    const handleBackdropClick = useCallback(
      (event) => {
        handleClose(
          event,
          "backdropClick"
        );
      },
      [handleClose]
    );
    const containerClasses = buildSpeedDialClasses(position, isOpen, hidden, className, unstyled);
    const fabClasses = buildFabClasses(color, size);
    const actionsClasses = buildActionsClasses(direction);
    const offsetStyle = buildOffsetStyle(position, offset);
    const hasOpenIcon = !!openIcon;
    const defaultIcon = icon || /* @__PURE__ */ jsx(Plus, { size: 24 });
    const actions = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(
        child,
        {
          _direction: direction,
          _onActionClick: handleActionClick
        }
      );
    });
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      backdrop && isOpen && /* @__PURE__ */ jsx(
        "div",
        {
          className: SPEED_DIAL_CLASSES.backdrop,
          onClick: handleBackdropClick
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: mergedRef,
          className: containerClasses,
          style: offsetStyle,
          role: "presentation",
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onFocus: handleFocus,
          onBlur: handleBlur,
          ...rest,
          children: [
            /* @__PURE__ */ jsx("div", { className: actionsClasses, role: "menu", children: actions }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: fabClasses,
                onClick: handleToggle,
                "aria-label": ariaLabel,
                "aria-expanded": isOpen,
                "aria-haspopup": "menu",
                children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: [
                      SPEED_DIAL_CLASSES.icon,
                      !hasOpenIcon && SPEED_DIAL_CLASSES.iconRotate
                    ].filter(Boolean).join(" "),
                    children: hasOpenIcon ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("span", { className: SPEED_DIAL_CLASSES.iconDefault, children: defaultIcon }),
                      /* @__PURE__ */ jsx("span", { className: SPEED_DIAL_CLASSES.iconOpen, children: openIcon })
                    ] }) : /* @__PURE__ */ jsx("span", { className: SPEED_DIAL_CLASSES.iconDefault, children: defaultIcon })
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
);
SpeedDial.displayName = "SpeedDial";
var SpeedDial_default = SpeedDial;
export {
  SpeedDial,
  SpeedDialAction,
  SpeedDial_default as default
};
//# sourceMappingURL=SpeedDial.js.map
