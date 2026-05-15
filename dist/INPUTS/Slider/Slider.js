"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useEffect, useId } from "react";
import { SLIDER_CLASSES, SLIDER_DEFAULTS } from "./Slider.constants";
import { calcPercentage, buildSliderBackground, buildSliderClasses } from "./Slider.utils";
import { useSliderFormContext } from "./Slider.hooks";
import { useBridgeBind } from "@w3f/bridge";
const Slider = forwardRef(({
  name,
  min = SLIDER_DEFAULTS.min,
  max = SLIDER_DEFAULTS.max,
  step = SLIDER_DEFAULTS.step,
  value,
  defaultValue = SLIDER_DEFAULTS.defaultValue,
  label = "",
  showValue = SLIDER_DEFAULTS.showValue,
  onChange,
  onBlur,
  disabled = SLIDER_DEFAULTS.disabled,
  className = "",
  variant,
  unstyled = SLIDER_DEFAULTS.unstyled,
  bindId,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);
  const formContext = useSliderFormContext();
  const sliderId = useId();
  const { dispatch } = useBridgeBind({ bindId });
  const isFormControlled = !!(formContext && name);
  const sliderValue = isFormControlled ? formContext.values[name] ?? defaultValue : value ?? internalValue;
  useEffect(() => {
    if (!isFormControlled && value !== void 0) {
      setInternalValue(value);
    }
  }, [value, isFormControlled]);
  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    if (isFormControlled) {
      formContext.handleChange(e);
    } else {
      setInternalValue(newValue);
    }
    dispatch("change", { value: newValue });
    if (onChange) onChange(newValue);
  };
  const handleBlur = (e) => {
    if (isFormControlled) formContext.handleBlur(e);
    if (onBlur) onBlur(e);
  };
  const percentage = calcPercentage(sliderValue, min, max);
  return /* @__PURE__ */ jsxs("div", { className: buildSliderClasses(className, unstyled, variant), children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: sliderId, className: SLIDER_CLASSES.label, children: label }),
    /* @__PURE__ */ jsx("div", { className: `${SLIDER_CLASSES.wrapper}${className ? ` ${className}` : ""}`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: SLIDER_CLASSES.container,
        style: { background: buildSliderBackground(percentage) },
        children: /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id: sliderId,
            className: SLIDER_CLASSES.input,
            type: "range",
            name,
            min,
            max,
            step,
            value: sliderValue,
            onChange: handleSliderChange,
            onBlur: handleBlur,
            disabled,
            "aria-label": label,
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-valuenow": sliderValue
          }
        )
      }
    ) }),
    showValue && /* @__PURE__ */ jsxs("p", { className: SLIDER_CLASSES.valueWrapper, children: [
      "Valor seleccionado:",
      /* @__PURE__ */ jsx("span", { className: SLIDER_CLASSES.valueBadge, children: sliderValue })
    ] })
  ] });
});
Slider.displayName = "Slider";
var Slider_default = Slider;
export {
  Slider,
  Slider_default as default
};
//# sourceMappingURL=Slider.js.map
