"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { CHIP_DEFAULTS } from "./Chip.constants";
import { buildChipClasses } from "./Chip.utils";
import { useBridgeBind } from "@w3f/bridge";
const Chip = React.forwardRef(({
  label,
  variant,
  onClose,
  disabled = CHIP_DEFAULTS.disabled,
  onKeyDown,
  onFocus,
  onBlur,
  onClick,
  isFocused = CHIP_DEFAULTS.isFocused,
  className,
  style,
  unstyled = CHIP_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const { dispatch } = useBridgeBind({ bindId });
  const chipClasses = buildChipClasses(disabled, isFocused, className, unstyled, variant);
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === "Delete" || e.key === "Backspace") && onClose && !disabled) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
    onKeyDown?.(e);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: chipClasses,
      tabIndex: disabled ? -1 : 0,
      role: "button",
      "aria-label": `${label}${onClose ? ", presione Enter o Suprimir para eliminar" : ""}`,
      "aria-disabled": disabled,
      onKeyDown: handleKeyDown,
      onFocus,
      onBlur,
      onClick: (e) => {
        onClick?.(e);
        dispatch("click");
      },
      style,
      children: [
        /* @__PURE__ */ jsx("span", { className: "w3f-chip__label", children: label }),
        onClose && !disabled && /* @__PURE__ */ jsx(
          "span",
          {
            onClick: (e) => {
              e.stopPropagation();
              onClose();
              dispatch("change", { action: "close" });
            },
            className: "w3f-chip-close",
            title: "Eliminar",
            role: "button",
            "aria-label": "Eliminar chip",
            children: "\xD7"
          }
        )
      ]
    }
  );
});
Chip.displayName = "Chip";
var Chip_default = Chip;
export {
  Chip,
  Chip_default as default
};
//# sourceMappingURL=Chip.js.map
