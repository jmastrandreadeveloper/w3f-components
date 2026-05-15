"use client";
import { jsx } from "react/jsx-runtime";
import React from "react";
import { buildBadgeClasses } from "./Badge.utils";
import { useBadgeContent } from "./Badge.hooks";
import { BADGE_DEFAULTS } from "./Badge.constants";
import { useBridgeBind } from "@w3f/bridge";
const Badge = React.forwardRef(
  ({
    children,
    color = BADGE_DEFAULTS.color,
    position = BADGE_DEFAULTS.position,
    size = BADGE_DEFAULTS.size,
    variant = BADGE_DEFAULTS.variant,
    className = BADGE_DEFAULTS.className,
    invisible = BADGE_DEFAULTS.invisible,
    ariaLabel = BADGE_DEFAULTS.ariaLabel,
    max = BADGE_DEFAULTS.max,
    pulse = BADGE_DEFAULTS.pulse,
    animate = BADGE_DEFAULTS.animate,
    unstyled = BADGE_DEFAULTS.unstyled,
    bindId,
    ...rest
  }, ref) => {
    useBridgeBind({ bindId });
    if (invisible) return null;
    const { processed, effectiveAriaLabel } = useBadgeContent(children, max, variant, ariaLabel);
    const badgeClasses = React.useMemo(
      () => buildBadgeClasses(color, size, variant, position, pulse, animate, className, unstyled),
      [color, size, variant, position, pulse, animate, className, unstyled]
    );
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className: badgeClasses,
        role: "status",
        "aria-label": effectiveAriaLabel,
        ...rest,
        children: processed
      }
    );
  }
);
Badge.displayName = "Badge";
var Badge_default = Badge;
export {
  Badge,
  Badge_default as default
};
//# sourceMappingURL=Badge.js.map
