"use client";
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { MARQUEE_DEFAULTS } from "./Marquee.constants";
import { buildMarqueeClasses, buildTrackClasses, buildFadeMask } from "./Marquee.utils";
const Marquee = forwardRef(({
  children,
  direction = MARQUEE_DEFAULTS.direction,
  speed = MARQUEE_DEFAULTS.speed,
  pauseOnHover = MARQUEE_DEFAULTS.pauseOnHover,
  gap = MARQUEE_DEFAULTS.gap,
  repeat = MARQUEE_DEFAULTS.repeat,
  fadeEdge = MARQUEE_DEFAULTS.fadeEdge,
  unstyled = MARQUEE_DEFAULTS.unstyled,
  className = MARQUEE_DEFAULTS.className,
  style = {},
  "aria-label": ariaLabel,
  ...rest
}, ref) => {
  const safeSpeed = Math.max(0.1, Math.min(Number(speed) || 30, 600));
  const safeGap = Math.max(0, Math.min(Number(gap) || 24, 500));
  const safeRepeat = Math.max(1, Math.min(Math.floor(Number(repeat) || 2), 10));
  const safeFadeEdge = Math.max(0, Math.min(Number(fadeEdge) || 40, 500));
  const classes = buildMarqueeClasses(direction, pauseOnHover, unstyled, className);
  const trackClasses = buildTrackClasses(direction);
  const fadeMask = buildFadeMask(direction, safeFadeEdge);
  const wrapperStyle = {
    ...style,
    "--marquee-speed": `${safeSpeed}s`,
    "--marquee-gap": `${safeGap}px`,
    ...fadeMask ? { WebkitMaskImage: fadeMask, maskImage: fadeMask } : {}
  };
  const copies = safeRepeat;
  const tracks = Array.from({ length: copies }, (_, i) => /* @__PURE__ */ jsx("div", { className: "w3f-marquee__group", "aria-hidden": i > 0 ? true : void 0, children }, i));
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: classes,
      style: wrapperStyle,
      role: "marquee",
      "aria-label": ariaLabel || "Scrolling content",
      ...rest,
      children: /* @__PURE__ */ jsx("div", { className: trackClasses, children: tracks })
    }
  );
});
Marquee.displayName = "Marquee";
var Marquee_default = Marquee;
export {
  Marquee,
  Marquee_default as default
};
//# sourceMappingURL=Marquee.js.map
