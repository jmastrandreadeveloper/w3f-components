"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useRef, useEffect } from "react";
import { SLIDE_TOGGLE_CLASSES, SLIDE_TOGGLE_DEFAULTS } from "./SlideToggle.constants";
import { getSizeConfig, buildToggleClasses, buildTrackClasses, buildHandleClasses } from "./SlideToggle.utils";
import { useSlideToggleFormContext } from "./SlideToggle.hooks";
import { useBridgeBind } from "@w3f/bridge";
const SlideToggle = forwardRef(({
  name,
  checked = SLIDE_TOGGLE_DEFAULTS.checked,
  onChange,
  disabled = SLIDE_TOGGLE_DEFAULTS.disabled,
  size = SLIDE_TOGGLE_DEFAULTS.size,
  variant = SLIDE_TOGGLE_DEFAULTS.variant,
  loading = SLIDE_TOGGLE_DEFAULTS.loading,
  label,
  labelPosition = SLIDE_TOGGLE_DEFAULTS.labelPosition,
  showIcon = SLIDE_TOGGLE_DEFAULTS.showIcon,
  error,
  helperText,
  className = SLIDE_TOGGLE_DEFAULTS.className,
  unstyled = SLIDE_TOGGLE_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const formContext = useSlideToggleFormContext();
  const isFormControlled = !!(formContext && name);
  const { dispatch } = useBridgeBind({ bindId });
  const toggleValue = isFormControlled ? Boolean(formContext.values[name]) : checked;
  const toggleError = isFormControlled ? formContext.errors[name] : error;
  const { maxPosition } = getSizeConfig(size);
  const [isChecked, setIsChecked] = useState(toggleValue);
  const [isDragging, setIsDragging] = useState(false);
  const [handlePosition, setHandlePosition] = useState(toggleValue ? maxPosition : 0);
  const startX = useRef(0);
  const handleRef = useRef(null);
  const handleToggleChange = (newState) => {
    setIsChecked(newState);
    setHandlePosition(newState ? maxPosition : 0);
    if (isFormControlled && formContext && name) {
      formContext.setFieldValue(name, newState);
    }
    dispatch("change", { value: newState });
    if (onChange) onChange(newState);
  };
  const handleMouseDown = (e) => {
    if (disabled || loading) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    startX.current = e.clientX - handlePosition;
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const shouldBeChecked = handlePosition > maxPosition / 2;
    if (shouldBeChecked !== isChecked) {
      handleToggleChange(shouldBeChecked);
    } else {
      setHandlePosition(shouldBeChecked ? maxPosition : 0);
    }
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newPos = e.clientX - startX.current;
    setHandlePosition(Math.max(0, Math.min(newPos, maxPosition)));
  };
  const handleTouchStart = (e) => {
    if (disabled || loading) return;
    e.stopPropagation();
    setIsDragging(true);
    startX.current = e.touches[0].clientX - handlePosition;
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const newPos = e.touches[0].clientX - startX.current;
    setHandlePosition(Math.max(0, Math.min(newPos, maxPosition)));
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const shouldBeChecked = handlePosition > maxPosition / 2;
    if (shouldBeChecked !== isChecked) {
      handleToggleChange(shouldBeChecked);
    } else {
      setHandlePosition(shouldBeChecked ? maxPosition : 0);
    }
  };
  const handleClick = () => {
    if (disabled || loading || isDragging) return;
    handleToggleChange(!isChecked);
  };
  const handleKeyDown = (e) => {
    if (disabled || loading) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handlePosition, isChecked]);
  useEffect(() => {
    if (!isDragging && toggleValue !== isChecked) {
      setIsChecked(toggleValue);
      setHandlePosition(toggleValue ? maxPosition : 0);
    }
  }, [toggleValue, isDragging, maxPosition]);
  const hasError = Boolean(toggleError);
  const renderToggle = () => /* @__PURE__ */ jsx(
    "div",
    {
      className: buildToggleClasses(size, variant, disabled, loading, hasError, unstyled),
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      tabIndex: disabled || loading ? -1 : 0,
      role: "switch",
      "aria-checked": isChecked,
      "aria-disabled": disabled,
      "aria-label": label || "Toggle switch",
      "aria-invalid": hasError,
      children: /* @__PURE__ */ jsx("div", { className: buildTrackClasses(isChecked), children: /* @__PURE__ */ jsx(
        "span",
        {
          ref: handleRef,
          className: buildHandleClasses(isDragging),
          style: { transform: `translateX(${handlePosition}px)` },
          onMouseDown: handleMouseDown,
          onTouchStart: handleTouchStart
        }
      ) })
    }
  );
  const renderLabel = () => {
    if (!label) return null;
    const labelClasses = [
      SLIDE_TOGGLE_CLASSES.label,
      labelPosition === "right" ? SLIDE_TOGGLE_CLASSES.labelRight : SLIDE_TOGGLE_CLASSES.labelLeft,
      disabled || loading ? SLIDE_TOGGLE_CLASSES.labelDisabled : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxs(
      "span",
      {
        onClick: handleClick,
        className: labelClasses,
        children: [
          label,
          showIcon && /* @__PURE__ */ jsx(
            "span",
            {
              className: SLIDE_TOGGLE_CLASSES.checkIcon,
              style: { visibility: isChecked && !disabled && !loading ? "visible" : "hidden" },
              children: "\u2713"
            }
          )
        ]
      }
    );
  };
  const renderMessages = () => {
    if (!toggleError && !helperText) return null;
    return /* @__PURE__ */ jsx("div", { className: SLIDE_TOGGLE_CLASSES.messages, children: toggleError ? /* @__PURE__ */ jsx(
      "p",
      {
        className: `${SLIDE_TOGGLE_CLASSES.message} ${SLIDE_TOGGLE_CLASSES.messageError}`,
        role: "alert",
        children: toggleError
      }
    ) : helperText ? /* @__PURE__ */ jsx(
      "p",
      {
        className: `${SLIDE_TOGGLE_CLASSES.message} ${SLIDE_TOGGLE_CLASSES.messageHelper}`,
        children: helperText
      }
    ) : null });
  };
  if (!label) {
    return /* @__PURE__ */ jsxs("div", { ref, className, children: [
      renderToggle(),
      renderMessages()
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { ref, className, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `${SLIDE_TOGGLE_CLASSES.container}${labelPosition === "left" ? ` ${SLIDE_TOGGLE_CLASSES.containerLabelLeft}` : ""}`,
        children: [
          renderToggle(),
          renderLabel()
        ]
      }
    ),
    renderMessages()
  ] });
});
SlideToggle.displayName = "SlideToggle";
var SlideToggle_default = SlideToggle;
export {
  SlideToggle,
  SlideToggle_default as default
};
//# sourceMappingURL=SlideToggle.js.map
