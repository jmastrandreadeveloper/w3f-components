"use client";
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import useIcon from "./Icon.hooks";
import { IconDefaults } from "./Icon.constants";
import { buildIconClasses } from "./Icon.utils";
import { useBridgeBind } from "@w3f/bridge";
const Icon = forwardRef(({ name, size, color, className, unstyled = IconDefaults.unstyled, bindId }, ref) => {
  useBridgeBind({ bindId });
  const { LucideIcon, size: finalSize, color: finalColor, className: finalClassName, name: resolvedName } = useIcon({ name, size, color, className });
  if (!LucideIcon) {
    console.warn(`Icono no encontrado: ${resolvedName || name}`);
    return /* @__PURE__ */ jsx("span", { ref, className: "w3f-text-sm w3f-text-gray", children: resolvedName || name });
  }
  const wrapperClasses = buildIconClasses(unstyled, finalClassName);
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: wrapperClasses,
      style: { lineHeight: 0 },
      "aria-hidden": "true",
      role: "img",
      children: /* @__PURE__ */ jsx(
        LucideIcon,
        {
          size: finalSize,
          color: finalColor,
          strokeWidth: 2
        }
      )
    }
  );
});
Icon.displayName = "Icon";
var Icon_default = Icon;
export {
  Icon,
  Icon_default as default
};
//# sourceMappingURL=Icon.js.map
