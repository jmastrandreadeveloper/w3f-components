"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { RANGE_SLIDER_CLASSES, RANGE_SLIDER_DEFAULTS } from "./RangeSlider.constants";
import { snapToStep, getPercent, defaultFormatLabel } from "./RangeSlider.utils";
import { useRangeSliderFormContext } from "./RangeSlider.hooks";
import { useBridgeBind } from "@w3f/bridge";
const RangeSlider = forwardRef(({
  name,
  min = RANGE_SLIDER_DEFAULTS.min,
  max = RANGE_SLIDER_DEFAULTS.max,
  step = RANGE_SLIDER_DEFAULTS.step,
  value: controlledValue,
  defaultMinValue,
  defaultMaxValue,
  onChange,
  formatLabel,
  disabled = RANGE_SLIDER_DEFAULTS.disabled,
  ariaLabel = RANGE_SLIDER_DEFAULTS.ariaLabel,
  error,
  className = RANGE_SLIDER_DEFAULTS.className,
  onBlur,
  unstyled = RANGE_SLIDER_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const formContext = useRangeSliderFormContext();
  const isFormControlled = !!(formContext && name);
  const { dispatch } = useBridgeBind({ bindId });
  const [minVal, setMinVal] = useState(() => {
    const initial = defaultMinValue !== void 0 ? defaultMinValue : min;
    return snapToStep(Math.max(min, Math.min(initial, max - step)), step);
  });
  const [maxVal, setMaxVal] = useState(() => {
    const initial = defaultMaxValue !== void 0 ? defaultMaxValue : max;
    return snapToStep(Math.max(min + step, Math.min(initial, max)), step);
  });
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const rangeRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const fieldValue = isFormControlled ? formContext.values[name] ?? { min: minVal, max: maxVal } : controlledValue ?? { min: minVal, max: maxVal };
  const fieldError = isFormControlled ? formContext.errors[name] : error;
  useEffect(() => {
    if (isFormControlled || controlledValue) {
      if (fieldValue.min !== void 0) setMinVal(fieldValue.min);
      if (fieldValue.max !== void 0) setMaxVal(fieldValue.max);
    }
  }, [fieldValue, isFormControlled, controlledValue]);
  const formatValue = useCallback(
    (value) => formatLabel ? formatLabel(value) : defaultFormatLabel(value),
    [formatLabel]
  );
  const notifyChange = useCallback(
    (newMin, newMax) => {
      const newValue = { min: newMin, max: newMax };
      if (isFormControlled && formContext && name) {
        const syntheticEvent = { target: { name, value: newValue, type: "range" } };
        formContext.handleChange(syntheticEvent);
      }
      dispatch("change", { value: newValue });
      if (onChange && !disabled) onChange(newValue);
    },
    [isFormControlled, formContext, name, onChange, disabled, dispatch]
  );
  useEffect(() => {
    const minPercent2 = getPercent(minVal, min, max);
    const maxPercent2 = getPercent(maxVal, min, max);
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent2}%`;
      rangeRef.current.style.width = `${maxPercent2 - minPercent2}%`;
    }
  }, [minVal, maxVal, min, max]);
  const handleMinChange = (e) => {
    if (disabled) return;
    const value = snapToStep(Math.min(+e.target.value, maxVal - step), step);
    setMinVal(value);
    setAnnouncement(`Valor m\xEDnimo: ${formatValue(value)}`);
    notifyChange(value, maxVal);
  };
  const handleMaxChange = (e) => {
    if (disabled) return;
    const value = snapToStep(Math.max(+e.target.value, minVal + step), step);
    setMaxVal(value);
    setAnnouncement(`Valor m\xE1ximo: ${formatValue(value)}`);
    notifyChange(minVal, value);
  };
  const handleBlur = () => {
    if (isFormControlled && formContext && name) {
      const syntheticEvent = { target: { name } };
      formContext.handleBlur(syntheticEvent);
    }
    if (onBlur) onBlur();
  };
  const handleDrag = (isMinThumb) => (e) => {
    if (disabled) return;
    e.preventDefault();
    const startX = e.clientX;
    const startVal = isMinThumb ? minVal : maxVal;
    const container = e.currentTarget.parentElement;
    if (!container) return;
    const containerWidth = container.getBoundingClientRect().width;
    isMinThumb ? setIsDraggingMin(true) : setIsDraggingMax(true);
    const handleMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = deltaX / containerWidth * 100;
      const deltaValue = deltaPercent / 100 * (max - min);
      const newValue = snapToStep(startVal + deltaValue, step);
      if (isMinThumb) {
        const clamped = Math.max(min, Math.min(newValue, maxVal - step));
        setMinVal(clamped);
        notifyChange(clamped, maxVal);
      } else {
        const clamped = Math.max(minVal + step, Math.min(newValue, max));
        setMaxVal(clamped);
        notifyChange(minVal, clamped);
      }
    };
    const handleEnd = () => {
      isMinThumb ? setIsDraggingMin(false) : setIsDraggingMax(false);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      handleBlur();
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
  };
  const handleTrackClick = (e) => {
    if (disabled || isDraggingMin || isDraggingMax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width * 100;
    const clickValue = min + percent / 100 * (max - min);
    const distToMin = Math.abs(clickValue - minVal);
    const distToMax = Math.abs(clickValue - maxVal);
    e.preventDefault();
    if (distToMin <= distToMax) {
      const clamped = Math.max(min, snapToStep(Math.min(clickValue, maxVal - step), step));
      setMinVal(clamped);
      notifyChange(clamped, maxVal);
    } else {
      const clamped = Math.min(max, snapToStep(Math.max(clickValue, minVal + step), step));
      setMaxVal(clamped);
      notifyChange(minVal, clamped);
    }
  };
  const minPercent = getPercent(minVal, min, max);
  const maxPercent = getPercent(maxVal, min, max);
  const thumbsAreClose = Math.abs(maxPercent - minPercent) < 3;
  const hasError = Boolean(fieldError);
  return /* @__PURE__ */ jsxs("div", { ref, style: { padding: "2rem 0" }, className, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: [
          RANGE_SLIDER_CLASSES.wrapper,
          unstyled && "w3f-range-slider--unstyled",
          !unstyled && disabled && RANGE_SLIDER_CLASSES.isDisabled,
          !unstyled && hasError && RANGE_SLIDER_CLASSES.hasError
        ].filter(Boolean).join(" "),
        role: "group",
        "aria-label": ariaLabel,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: RANGE_SLIDER_CLASSES.srOnly,
              role: "status",
              "aria-live": "polite",
              "aria-atomic": "true",
              children: announcement
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: [
                RANGE_SLIDER_CLASSES.labelMin,
                (isDraggingMin || thumbsAreClose) && RANGE_SLIDER_CLASSES.labelVisible,
                thumbsAreClose && RANGE_SLIDER_CLASSES.labelClose
              ].filter(Boolean).join(" "),
              style: { left: `${minPercent}%` },
              "aria-hidden": "true",
              children: [
                "Min: ",
                formatValue(minVal),
                /* @__PURE__ */ jsx("div", { className: RANGE_SLIDER_CLASSES.labelArrow })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: [
                RANGE_SLIDER_CLASSES.labelMax,
                (isDraggingMax || thumbsAreClose) && RANGE_SLIDER_CLASSES.labelVisible,
                thumbsAreClose && RANGE_SLIDER_CLASSES.labelClose
              ].filter(Boolean).join(" "),
              style: { left: `${maxPercent}%` },
              "aria-hidden": "true",
              children: [
                "Max: ",
                formatValue(maxVal),
                /* @__PURE__ */ jsx("div", { className: RANGE_SLIDER_CLASSES.labelArrow })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: RANGE_SLIDER_CLASSES.track, children: /* @__PURE__ */ jsx("div", { ref: rangeRef, className: RANGE_SLIDER_CLASSES.active }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: minThumbRef,
              className: [
                RANGE_SLIDER_CLASSES.thumb,
                isDraggingMin && RANGE_SLIDER_CLASSES.thumbDragging,
                thumbsAreClose && RANGE_SLIDER_CLASSES.thumbCloseMin
              ].filter(Boolean).join(" "),
              style: { left: `${minPercent}%` },
              onMouseDown: handleDrag(true),
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: maxThumbRef,
              className: [
                RANGE_SLIDER_CLASSES.thumb,
                isDraggingMax && RANGE_SLIDER_CLASSES.thumbDragging,
                thumbsAreClose && RANGE_SLIDER_CLASSES.thumbCloseMax
              ].filter(Boolean).join(" "),
              style: { left: `${maxPercent}%` },
              onMouseDown: handleDrag(false),
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: RANGE_SLIDER_CLASSES.clickable,
              onMouseDown: handleTrackClick,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              name: name ? `${name}_min` : void 0,
              min,
              max,
              step,
              value: minVal,
              onChange: handleMinChange,
              onFocus: () => !disabled && setIsDraggingMin(true),
              onBlur: () => {
                setIsDraggingMin(false);
                handleBlur();
              },
              disabled,
              "aria-label": "Valor m\xEDnimo del rango",
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-valuenow": minVal,
              "aria-valuetext": `Valor m\xEDnimo: ${formatValue(minVal)}`,
              "aria-invalid": hasError,
              className: `${RANGE_SLIDER_CLASSES.inputA11y} ${RANGE_SLIDER_CLASSES.inputMin}`
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              name: name ? `${name}_max` : void 0,
              min,
              max,
              step,
              value: maxVal,
              onChange: handleMaxChange,
              onFocus: () => !disabled && setIsDraggingMax(true),
              onBlur: () => {
                setIsDraggingMax(false);
                handleBlur();
              },
              disabled,
              "aria-label": "Valor m\xE1ximo del rango",
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-valuenow": maxVal,
              "aria-valuetext": `Valor m\xE1ximo: ${formatValue(maxVal)}`,
              "aria-invalid": hasError,
              className: `${RANGE_SLIDER_CLASSES.inputA11y} ${RANGE_SLIDER_CLASSES.inputMax}`
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: RANGE_SLIDER_CLASSES.valueLabelWrapper, children: [
            /* @__PURE__ */ jsxs("div", { className: RANGE_SLIDER_CLASSES.valueLabelGroup, children: [
              /* @__PURE__ */ jsx("span", { className: RANGE_SLIDER_CLASSES.valueLabelText, children: "Valor m\xEDnimo" }),
              /* @__PURE__ */ jsx("div", { className: RANGE_SLIDER_CLASSES.valueLabelValue, children: formatValue(minVal) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: RANGE_SLIDER_CLASSES.valueLabelGroup, children: [
              /* @__PURE__ */ jsx("span", { className: RANGE_SLIDER_CLASSES.valueLabelText, children: "Valor m\xE1ximo" }),
              /* @__PURE__ */ jsx("div", { className: RANGE_SLIDER_CLASSES.valueLabelValue, children: formatValue(maxVal) })
            ] })
          ] })
        ]
      }
    ),
    fieldError && /* @__PURE__ */ jsx("div", { className: RANGE_SLIDER_CLASSES.error, role: "alert", children: fieldError })
  ] });
});
RangeSlider.displayName = "RangeSlider";
var RangeSlider_default = RangeSlider;
export {
  RangeSlider,
  RangeSlider_default as default
};
//# sourceMappingURL=RangeSlider.js.map
