"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { Star, Heart, Smile, Frown, Meh, X } from "lucide-react";
import { RATING_CLASSES, RATING_ICON_SIZES, RATING_DEFAULTS } from "./Rating.constants";
import { buildContainerClasses, getIconColor, getFillPercentage } from "./Rating.utils";
import { useRatingFormContext, useRatingHover } from "./Rating.hooks";
import { useBridgeBind } from "@w3f/bridge";
function renderRatingIcon(index, ratingVal, iconType, size, precision, disabled, hasError) {
  const iconSize = RATING_ICON_SIZES[size];
  const color = getIconColor(index, ratingVal, iconType, precision, disabled, hasError);
  const fillPercent = getFillPercentage(index, ratingVal);
  const isFilled = fillPercent === 100;
  const isPartial = fillPercent > 0 && fillPercent < 100;
  if (iconType === "smiley") {
    if (index < ratingVal) {
      if (index <= 1) return /* @__PURE__ */ jsx(Frown, { size: iconSize, style: { color } });
      if (index === 2) return /* @__PURE__ */ jsx(Meh, { size: iconSize, style: { color } });
      return /* @__PURE__ */ jsx(Smile, { size: iconSize, style: { color } });
    }
    return /* @__PURE__ */ jsx(Smile, { size: iconSize, style: { color } });
  }
  const IconComponent = iconType === "heart" ? Heart : Star;
  if (isPartial && precision === 0.5) {
    const gradientId = `w3f-rating-grad-${index}-${fillPercent}`;
    return /* @__PURE__ */ jsxs("span", { style: { position: "relative", display: "inline-block" }, children: [
      /* @__PURE__ */ jsx("svg", { width: iconSize, height: iconSize, style: { display: "block" }, children: /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: gradientId, children: [
        /* @__PURE__ */ jsx("stop", { offset: `${fillPercent}%`, stopColor: color }),
        /* @__PURE__ */ jsx("stop", { offset: `${fillPercent}%`, stopColor: "var(--w3f-gray-400)" })
      ] }) }) }),
      /* @__PURE__ */ jsx(
        IconComponent,
        {
          size: iconSize,
          fill: `url(#${gradientId})`,
          style: { color, position: "absolute", top: 0, left: 0 }
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx(
    IconComponent,
    {
      size: iconSize,
      fill: isFilled ? color : "none",
      style: { color }
    }
  );
}
const Rating = forwardRef(({
  name,
  defaultValue = RATING_DEFAULTS.defaultValue,
  value: controlledValue,
  max = RATING_DEFAULTS.max,
  readOnly = RATING_DEFAULTS.readOnly,
  disabled = RATING_DEFAULTS.disabled,
  onChange,
  onHoverChange,
  iconType = RATING_DEFAULTS.iconType,
  precision = RATING_DEFAULTS.precision,
  size = RATING_DEFAULTS.size,
  showValue = RATING_DEFAULTS.showValue,
  allowClear = RATING_DEFAULTS.allowClear,
  labels = [],
  error,
  helperText,
  required = RATING_DEFAULTS.required,
  label,
  className = RATING_DEFAULTS.className,
  variant,
  unstyled = RATING_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const formContext = useRatingFormContext();
  const isFormControlled = !!(formContext && name);
  const { dispatch } = useBridgeBind({ bindId });
  const ratingValue = isFormControlled ? formContext.values[name] ?? 0 : controlledValue !== void 0 ? controlledValue : null;
  const ratingError = isFormControlled ? formContext.errors[name] : error;
  const isControlled = controlledValue !== void 0 || isFormControlled;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? ratingValue : internalValue;
  const { hover, setHover, focusedIndex, setFocusedIndex } = useRatingHover();
  const isInteractive = !readOnly && !disabled;
  const handleChange = (newValue) => {
    if (!isInteractive) return;
    const next = allowClear && newValue === value ? 0 : newValue;
    if (isFormControlled && formContext && name) {
      formContext.setFieldValue(name, next);
    } else if (!isControlled) {
      setInternalValue(next);
    }
    dispatch("change", { value: next });
    if (onChange) onChange(next);
  };
  const handleMouseMove = (event, index) => {
    if (!isInteractive || precision === 1) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - left) / width;
    const hoverValue = index + (percent > 0.5 ? 1 : 0.5);
    setHover(hoverValue);
    onHoverChange?.(hoverValue);
  };
  const handleMouseEnter = (ratingIndex) => {
    if (!isInteractive) return;
    if (precision === 1) {
      setHover(ratingIndex);
      onHoverChange?.(ratingIndex);
    }
  };
  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setHover(-1);
    onHoverChange?.(-1);
  };
  const handleKeyDown = (e, index) => {
    if (!isInteractive) return;
    const currentValue = value || 0;
    let newValue = currentValue;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        newValue = Math.min(currentValue + precision, max);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        newValue = Math.max(currentValue - precision, 0);
        break;
      case "Home":
        e.preventDefault();
        newValue = precision;
        break;
      case "End":
        e.preventDefault();
        newValue = max;
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        handleChange(index);
        return;
      case "Delete":
      case "Backspace":
        if (allowClear) {
          e.preventDefault();
          handleChange(0);
        }
        return;
      default:
        return;
    }
    handleChange(newValue);
  };
  const getLabel = (index) => labels[index - 1] || `${index} de ${max}`;
  const currentRatingValue = hover !== -1 ? hover : value;
  const hasError = Boolean(ratingError);
  const ratingIcons = Array.from({ length: max });
  return /* @__PURE__ */ jsxs("div", { ref, className: RATING_CLASSES.wrapper, children: [
    label && /* @__PURE__ */ jsxs("label", { className: RATING_CLASSES.label, children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: RATING_CLASSES.required, children: " *" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: buildContainerClasses(size, hasError, disabled, className, unstyled, variant),
        role: "radiogroup",
        "aria-label": label || "Rating",
        "aria-required": required,
        "aria-invalid": hasError,
        onMouseLeave: handleMouseLeave,
        children: [
          ratingIcons.map((_, index) => {
            const ratingIndex = index + 1;
            const isActive = value >= ratingIndex;
            const isFocused = focusedIndex === index;
            return /* @__PURE__ */ jsx(
              "span",
              {
                className: [
                  RATING_CLASSES.item,
                  isInteractive && RATING_CLASSES.itemInteractive,
                  isActive && RATING_CLASSES.itemActive,
                  isFocused && RATING_CLASSES.itemFocused,
                  disabled && RATING_CLASSES.itemDisabled,
                  readOnly && !disabled && RATING_CLASSES.itemReadonly
                ].filter(Boolean).join(" "),
                onMouseEnter: () => handleMouseEnter(ratingIndex),
                onMouseMove: (e) => handleMouseMove(e, index),
                onClick: () => handleChange(ratingIndex),
                onFocus: () => setFocusedIndex(index),
                onBlur: () => setFocusedIndex(-1),
                "aria-label": getLabel(ratingIndex),
                role: "radio",
                "aria-checked": value === ratingIndex,
                tabIndex: disabled ? -1 : value === ratingIndex || value === 0 && index === 0 ? 0 : -1,
                onKeyDown: (e) => handleKeyDown(e, ratingIndex),
                title: getLabel(ratingIndex),
                children: renderRatingIcon(
                  index,
                  currentRatingValue,
                  iconType,
                  size,
                  precision,
                  disabled,
                  hasError
                )
              },
              ratingIndex
            );
          }),
          allowClear && value > 0 && isInteractive && /* @__PURE__ */ jsx(
            "button",
            {
              className: RATING_CLASSES.clearBtn,
              onClick: () => handleChange(0),
              "aria-label": "Limpiar calificaci\xF3n",
              title: "Limpiar",
              type: "button",
              children: /* @__PURE__ */ jsx(X, { size: 16 })
            }
          )
        ]
      }
    ),
    showValue && /* @__PURE__ */ jsx("span", { className: RATING_CLASSES.value, "aria-live": "polite", children: value > 0 ? `${value}/${max}` : "Sin calificar" }),
    /* @__PURE__ */ jsx("div", { className: RATING_CLASSES.paddingX, children: ratingError ? /* @__PURE__ */ jsx(
      "p",
      {
        className: `${RATING_CLASSES.message} ${RATING_CLASSES.messageError}`,
        role: "alert",
        children: ratingError
      }
    ) : helperText ? /* @__PURE__ */ jsx("p", { className: `${RATING_CLASSES.message} ${RATING_CLASSES.messageHelper}`, children: helperText }) : null }),
    name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value })
  ] });
});
Rating.displayName = "Rating";
var Rating_default = Rating;
export {
  Rating,
  Rating_default as default
};
//# sourceMappingURL=Rating.js.map
