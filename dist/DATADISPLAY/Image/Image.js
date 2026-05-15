"use client";
import { jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { IMAGE_DEFAULTS } from "./Image.constants";
import { buildImageClasses } from "./Image.utils";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
import { useBridgeBind } from "@w3f/bridge";
const Image = forwardRef(({
  src,
  alt,
  rounded,
  circle = IMAGE_DEFAULTS.circle,
  border = IMAGE_DEFAULTS.border,
  shadow,
  filter,
  hoverEffect,
  unstyled = IMAGE_DEFAULTS.unstyled,
  className = IMAGE_DEFAULTS.className,
  wrapperClassName = IMAGE_DEFAULTS.wrapperClassName,
  width,
  height,
  bindId,
  ...rest
}, ref) => {
  useBridgeBind({ bindId });
  const imageClasses = buildImageClasses(circle, rounded, border, shadow, filter, hoverEffect, unstyled, className);
  return /* @__PURE__ */ jsx("div", { ref, className: `w3f-image-wrapper ${wrapperClassName}`, children: /* @__PURE__ */ jsx(
    "img",
    {
      src: sanitizeUrl(src),
      alt,
      width,
      height,
      className: imageClasses,
      ...rest
    }
  ) });
});
Image.displayName = "Image";
var Image_default = Image;
export {
  Image,
  Image_default as default
};
//# sourceMappingURL=Image.js.map
