"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import { PROGRESS_SPINNER_DEFAULTS } from "./ProgressSpinner.constants";
import {
  resolveSpinnerDiameter,
  resolveSpinnerColor,
  calcDashOffset,
  buildProgressSpinnerClasses
} from "./ProgressSpinner.utils";
const ProgressSpinner = forwardRef(({
  mode = PROGRESS_SPINNER_DEFAULTS.mode,
  value = PROGRESS_SPINNER_DEFAULTS.value,
  strokeWidth = PROGRESS_SPINNER_DEFAULTS.strokeWidth,
  size = PROGRESS_SPINNER_DEFAULTS.size,
  diameter,
  color = PROGRESS_SPINNER_DEFAULTS.color,
  ariaLabel,
  className = PROGRESS_SPINNER_DEFAULTS.className,
  unstyled = PROGRESS_SPINNER_DEFAULTS.unstyled
}, ref) => {
  const finalDiameter = useMemo(
    () => resolveSpinnerDiameter(size, diameter),
    [size, diameter]
  );
  const radius = (finalDiameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = finalDiameter / 2;
  const strokeColor = useMemo(() => resolveSpinnerColor(color), [color]);
  const strokeDashoffset = useMemo(
    () => calcDashOffset(mode, value, circumference),
    [mode, value, circumference]
  );
  const svgClass = mode === "indeterminate" ? "w3f-spinner-rotate" : "";
  const backgroundCircleColor = "var(--w3f-outline-variant)";
  const accessibilityLabel = ariaLabel || (mode === "determinate" ? `Progreso: ${Math.round(value)}%` : "Cargando");
  const wrapperClasses = buildProgressSpinnerClasses(unstyled, className);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: wrapperClasses,
      style: { width: finalDiameter, height: finalDiameter },
      role: "status",
      "aria-live": "polite",
      "aria-label": accessibilityLabel,
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: finalDiameter,
          height: finalDiameter,
          viewBox: `0 0 ${finalDiameter} ${finalDiameter}`,
          className: svgClass,
          "aria-hidden": "true",
          children: [
            mode === "determinate" && /* @__PURE__ */ jsx(
              "circle",
              {
                cx: center,
                cy: center,
                r: radius,
                fill: "none",
                stroke: backgroundCircleColor,
                strokeWidth
              }
            ),
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: center,
                cy: center,
                r: radius,
                fill: "none",
                stroke: strokeColor,
                strokeWidth,
                strokeLinecap: "round",
                strokeDasharray: circumference,
                strokeDashoffset,
                className: mode === "indeterminate" ? "w3f-spinner-path" : "",
                style: {
                  transformOrigin: "center",
                  transition: mode === "determinate" ? "stroke-dashoffset var(--w3f-transition-normal) cubic-bezier(0.4, 0, 0.2, 1)" : "none"
                }
              }
            )
          ]
        }
      )
    }
  );
});
ProgressSpinner.displayName = "ProgressSpinner";
var ProgressSpinner_default = ProgressSpinner;
export {
  ProgressSpinner,
  ProgressSpinner_default as default
};
//# sourceMappingURL=ProgressSpinner.js.map
