"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { PROGRESS_BAR_BUFFER_DEFAULTS } from "./ProgressBar.constants";
import { clampProgress, getProgressBgClass, getSizeClass } from "./ProgressBar.utils";
const ProgressBarBuffer = ({
  progress,
  buffer,
  progressColor = PROGRESS_BAR_BUFFER_DEFAULTS.progressColor,
  bufferColor = PROGRESS_BAR_BUFFER_DEFAULTS.bufferColor,
  showLabel = PROGRESS_BAR_BUFFER_DEFAULTS.showLabel,
  label,
  ariaLabel,
  size = PROGRESS_BAR_BUFFER_DEFAULTS.size
}) => {
  const validatedProgress = clampProgress(progress);
  const validatedBuffer = clampProgress(buffer);
  const finalBuffer = Math.max(validatedBuffer, validatedProgress);
  const progressBgClass = getProgressBgClass(progressColor);
  const bufferBgClass = getProgressBgClass(bufferColor);
  const sizeClass = getSizeClass(size);
  const displayText = label || `${validatedProgress}%`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${sizeClass} w3f-bg-gray-200`,
      role: "progressbar",
      "aria-valuenow": validatedProgress,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": ariaLabel || `Progreso: ${validatedProgress}% (B\xFAfer: ${finalBuffer}%)`,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w3f-progress-bar-buffer ${bufferBgClass}`,
            style: { width: `${finalBuffer}%` },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w3f-progress-bar-fill ${progressBgClass}`,
            style: { width: `${validatedProgress}%` },
            children: showLabel && validatedProgress > 0 && /* @__PURE__ */ jsx("span", { className: "w3f-progress-bar-text w3f-text-on-primary", children: displayText })
          }
        )
      ]
    }
  );
};
ProgressBarBuffer.displayName = "ProgressBarBuffer";
var ProgressBarBuffer_default = ProgressBarBuffer;
export {
  ProgressBarBuffer,
  ProgressBarBuffer_default as default
};
//# sourceMappingURL=ProgressBarBuffer.js.map
