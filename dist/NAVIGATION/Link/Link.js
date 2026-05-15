"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import { LINK_DEFAULTS, LINK_CLASSES } from "./Link.constants";
import { buildLinkClasses, buildExternalProps } from "./Link.utils";
import { useLinkClick } from "./Link.hooks";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
const Link = forwardRef(({
  href,
  children,
  color = LINK_DEFAULTS.color,
  underline = LINK_DEFAULTS.underline,
  variant = LINK_DEFAULTS.variant,
  component,
  disabled = LINK_DEFAULTS.disabled,
  external = LINK_DEFAULTS.external,
  icon,
  iconPosition = LINK_DEFAULTS.iconPosition,
  unstyled = LINK_DEFAULTS.unstyled,
  className = LINK_DEFAULTS.className,
  onClick,
  ...props
}, ref) => {
  const Tag = component || (href ? "a" : "button");
  const isButton = Tag === "button";
  const cls = useMemo(
    () => buildLinkClasses(color, underline, variant, disabled, isButton, className, unstyled),
    [color, underline, variant, disabled, isButton, className, unstyled]
  );
  const externalProps = buildExternalProps(external, isButton);
  const handleClick = useLinkClick(disabled, onClick);
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    icon && iconPosition === "left" && /* @__PURE__ */ jsx("span", { className: LINK_CLASSES.icon, children: icon }),
    children,
    icon && iconPosition === "right" && /* @__PURE__ */ jsx("span", { className: LINK_CLASSES.icon, children: icon })
  ] });
  if (isButton) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: cls,
        onClick: handleClick,
        disabled,
        type: "button",
        ...props,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      ref,
      className: cls,
      href: disabled ? void 0 : sanitizeUrl(href),
      onClick: handleClick,
      "aria-disabled": disabled || void 0,
      ...externalProps,
      ...props,
      children: content
    }
  );
});
Link.displayName = "Link";
var Link_default = Link;
export {
  Link,
  Link_default as default
};
//# sourceMappingURL=Link.js.map
