"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import { BOTTOM_NAV_DEFAULTS, BOTTOM_NAV_ACTION_DEFAULTS, BOTTOM_NAV_CLASSES } from "./BottomNavigation.constants";
import { buildBottomNavClasses, buildActionClasses, formatBadge } from "./BottomNavigation.utils";
import {
  BottomNavContext,
  useBottomNav,
  useBottomNavAction,
  useBottomNavContext
} from "./BottomNavigation.hooks";
const BottomNavigationAction = ({
  icon,
  label,
  value,
  showLabel: showLabelProp,
  disabled = BOTTOM_NAV_ACTION_DEFAULTS.disabled,
  badge,
  className = BOTTOM_NAV_ACTION_DEFAULTS.className,
  onClick,
  ...props
}) => {
  const ctx = useBottomNavAction();
  const isActive = ctx.value === value;
  const showLabel = showLabelProp !== void 0 ? showLabelProp : ctx.showLabels;
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    if (ctx.onChange && value !== void 0) ctx.onChange(e, value);
  };
  const cls = useMemo(
    () => buildActionClasses(isActive, disabled, showLabel, className),
    [isActive, disabled, showLabel, className]
  );
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: cls,
      onClick: handleClick,
      disabled,
      role: "tab",
      "aria-selected": isActive,
      "aria-label": label,
      ...props,
      children: [
        /* @__PURE__ */ jsxs("span", { className: BOTTOM_NAV_CLASSES.icon, children: [
          icon,
          badge !== void 0 && badge !== null && /* @__PURE__ */ jsx("span", { className: BOTTOM_NAV_CLASSES.badge, children: formatBadge(badge) })
        ] }),
        label && (showLabel || isActive) && /* @__PURE__ */ jsx("span", { className: BOTTOM_NAV_CLASSES.label, children: label })
      ]
    }
  );
};
BottomNavigationAction.displayName = "BottomNavigationAction";
const BottomNavigation = forwardRef(({
  value: valueProp,
  defaultValue,
  onChange,
  showLabels = BOTTOM_NAV_DEFAULTS.showLabels,
  color = BOTTOM_NAV_DEFAULTS.color,
  variant = BOTTOM_NAV_DEFAULTS.variant,
  fixed = BOTTOM_NAV_DEFAULTS.fixed,
  disabled = BOTTOM_NAV_DEFAULTS.disabled,
  unstyled = BOTTOM_NAV_DEFAULTS.unstyled,
  className = BOTTOM_NAV_DEFAULTS.className,
  children,
  ...props
}, ref) => {
  const { currentValue, handleChange } = useBottomNav(valueProp, defaultValue, onChange, disabled);
  const ctxValue = useBottomNavContext(currentValue, handleChange, showLabels, color);
  const cls = useMemo(
    () => buildBottomNavClasses(variant, color, fixed, disabled, className, unstyled),
    [variant, color, fixed, disabled, className, unstyled]
  );
  return /* @__PURE__ */ jsx(BottomNavContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx("nav", { ref, className: cls, role: "tablist", ...props, children }) });
});
BottomNavigation.displayName = "BottomNavigation";
var BottomNavigation_default = BottomNavigation;
export {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigation_default as default
};
//# sourceMappingURL=BottomNavigation.js.map
