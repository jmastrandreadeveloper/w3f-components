"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, memo, forwardRef } from "react";
import { MSN_CLASSES, MSN_DEFAULTS } from "./Masonry.constants";
import {
  buildMasonryRootClasses,
  buildMasonryRootStyle,
  buildMasonryItemClasses,
  buildMasonryCardClasses
} from "./Masonry.utils";
const MasonryCtx = createContext({ variant: "column" });
const MasonryItem = memo(({
  size = MSN_DEFAULTS.size,
  children,
  className,
  style
}) => {
  const { variant } = useContext(MasonryCtx);
  const cls = buildMasonryItemClasses(variant, size, className);
  return /* @__PURE__ */ jsx("div", { className: cls, style, children });
});
MasonryItem.displayName = "MasonryItem";
const MasonryCard = memo(({
  title,
  gradient,
  headerHeight = MSN_DEFAULTS.headerHeight,
  hover = MSN_DEFAULTS.hover,
  size = MSN_DEFAULTS.size,
  name,
  value,
  onClick,
  children,
  className,
  style
}) => {
  const { variant } = useContext(MasonryCtx);
  const itemCls = buildMasonryItemClasses(variant, size);
  const cardCls = buildMasonryCardClasses(hover, className);
  return /* @__PURE__ */ jsx("div", { className: itemCls, style, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cardCls,
      onClick,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") onClick(e);
      } : void 0,
      children: [
        gradient && /* @__PURE__ */ jsx(
          "div",
          {
            className: MSN_CLASSES.cardHeader,
            style: { height: headerHeight, background: gradient }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: MSN_CLASSES.cardBody, children: [
          title && /* @__PURE__ */ jsx("h3", { className: MSN_CLASSES.cardTitle, children: title }),
          children,
          name !== void 0 && /* @__PURE__ */ jsx(
            "input",
            {
              type: "hidden",
              name,
              value: value !== void 0 ? String(value) : ""
            }
          )
        ] })
      ]
    }
  ) });
});
MasonryCard.displayName = "MasonryCard";
const Masonry = forwardRef(({
  variant = MSN_DEFAULTS.variant,
  columns,
  baseColumnWidth,
  minCardWidth,
  gridColumns,
  gap,
  padding,
  children,
  unstyled = MSN_DEFAULTS.unstyled,
  className,
  style
}, ref) => {
  const rootCls = buildMasonryRootClasses(variant, className, unstyled);
  const rootStyle = buildMasonryRootStyle(variant, {
    columns,
    gap,
    padding,
    baseColumnWidth,
    minCardWidth,
    gridColumns,
    style
  });
  return /* @__PURE__ */ jsx(MasonryCtx.Provider, { value: { variant }, children: /* @__PURE__ */ jsx("div", { ref, className: rootCls, style: rootStyle, children }) });
});
Masonry.displayName = "Masonry";
var Masonry_default = Masonry;
export {
  Masonry,
  MasonryCard,
  MasonryItem,
  Masonry_default as default
};
//# sourceMappingURL=Masonry.js.map
