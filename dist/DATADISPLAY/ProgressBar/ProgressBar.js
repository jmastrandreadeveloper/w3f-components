"use client";
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { PROGRESS_BAR_DEFAULTS } from "./ProgressBar.constants";
import { clampProgress, getProgressBgClass, buildProgressBarClasses } from "./ProgressBar.utils";
import { useBridgeBind } from "@w3f/bridge";
const ProgressBar = forwardRef(({
  progress,
  color = PROGRESS_BAR_DEFAULTS.color,
  showLabel = PROGRESS_BAR_DEFAULTS.showLabel,
  label,
  ariaLabel,
  size = PROGRESS_BAR_DEFAULTS.size,
  unstyled = PROGRESS_BAR_DEFAULTS.unstyled,
  bindId
}, ref) => {
  useBridgeBind({ bindId, value: progress });
  const validatedProgress = clampProgress(progress);
  const progressBgClass = getProgressBgClass(color);
  const displayText = label || `${validatedProgress}%`;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: buildProgressBarClasses(size, unstyled),
      role: "progressbar",
      "aria-valuenow": validatedProgress,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": ariaLabel || `Progreso: ${validatedProgress}%`,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `w3f-progress-bar-fill ${progressBgClass}`,
          style: { width: `${validatedProgress}%` },
          children: showLabel && validatedProgress > 0 && /* @__PURE__ */ jsx("span", { className: "w3f-progress-bar-text w3f-text-on-primary", children: displayText })
        }
      )
    }
  );
});
ProgressBar.displayName = "ProgressBar";
var ProgressBar_default = ProgressBar;
export {
  ProgressBar,
  ProgressBar_default as default
};
//# sourceMappingURL=ProgressBar.js.map
