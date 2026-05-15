"use client";
import { jsx } from "react/jsx-runtime";
import { PROGRESS_BAR_INDETERMINATE_DEFAULTS } from "./ProgressBar.constants";
import { getProgressBgClass, getSizeClass } from "./ProgressBar.utils";
const ProgressBarIndeterminate = ({
  color = PROGRESS_BAR_INDETERMINATE_DEFAULTS.color,
  ariaLabel = PROGRESS_BAR_INDETERMINATE_DEFAULTS.ariaLabel,
  size = PROGRESS_BAR_INDETERMINATE_DEFAULTS.size,
  variant = PROGRESS_BAR_INDETERMINATE_DEFAULTS.variant
}) => {
  const barBgClass = getProgressBgClass(color);
  const sizeClass = getSizeClass(size);
  const animationClass = variant === "pulse" ? "w3f-indeterminate-animation-pulse" : "w3f-indeterminate-animation";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${sizeClass} w3f-indeterminate-bar w3f-bg-gray-200`,
      role: "progressbar",
      "aria-label": ariaLabel,
      "aria-valuenow": void 0,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-busy": "true",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `${animationClass} ${barBgClass}`,
          "aria-hidden": "true"
        }
      )
    }
  );
};
ProgressBarIndeterminate.displayName = "ProgressBarIndeterminate";
var ProgressBarIndeterminate_default = ProgressBarIndeterminate;
export {
  ProgressBarIndeterminate,
  ProgressBarIndeterminate_default as default
};
//# sourceMappingURL=ProgressBarIndeterminate.js.map
