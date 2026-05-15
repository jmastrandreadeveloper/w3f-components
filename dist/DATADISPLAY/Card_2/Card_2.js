"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import { CARD2_DEFAULTS } from "./Card_2.constants";
import { buildCard2Classes, buildCard2ActionsClasses } from "./Card_2.utils";
import Badge from "../Badge/Badge";
import Button from "../../INPUTS/Button/Button";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
const Card_2 = forwardRef(({
  layoutName,
  layoutStyle,
  variant = CARD2_DEFAULTS.variant,
  size = CARD2_DEFAULTS.size,
  hoverable = CARD2_DEFAULTS.hoverable,
  clickable = CARD2_DEFAULTS.clickable,
  onClick,
  unstyled = CARD2_DEFAULTS.unstyled,
  className = CARD2_DEFAULTS.className,
  style,
  fullWidth = CARD2_DEFAULTS.fullWidth,
  badge,
  title,
  subtitle,
  headerExtra,
  imageSrc,
  imageAlt = CARD2_DEFAULTS.imageAlt,
  content,
  actions,
  buttons = [],
  actionsAlign = CARD2_DEFAULTS.actionsAlign,
  actionAreaContent,
  customContent
}, ref) => {
  const cardClasses = buildCard2Classes(
    variant,
    size,
    hoverable,
    clickable,
    !!onClick,
    fullWidth,
    layoutName,
    unstyled,
    className
  );
  const mergedStyle = layoutStyle ? { ...layoutStyle, ...style } : style;
  const handleClick = (e) => {
    const target = e.target;
    if (onClick && !target.closest("button, a, input, textarea, select")) {
      onClick(e);
    }
  };
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };
  const interactiveProps = clickable || onClick ? { role: "button", tabIndex: 0, onClick: handleClick, onKeyDown: handleKeyDown, "aria-pressed": false } : {};
  const renderBadge = () => {
    if (!badge) return null;
    if (typeof badge === "object" && !React.isValidElement(badge)) {
      const {
        children: badgeChildren,
        content: badgeContent,
        ...badgeRestProps
      } = badge;
      const finalContent = badgeChildren !== void 0 ? badgeChildren : badgeContent;
      return /* @__PURE__ */ jsx("div", { className: "w3f-card-badge", children: /* @__PURE__ */ jsx(Badge, { ...badgeRestProps, children: finalContent }) });
    }
    if (React.isValidElement(badge)) {
      return /* @__PURE__ */ jsx("div", { className: "w3f-card-badge", children: badge });
    }
    return /* @__PURE__ */ jsx("div", { className: "w3f-card-badge", children: /* @__PURE__ */ jsx(Badge, { color: "primary", size: "md", children: badge }) });
  };
  const renderHeader = () => {
    if (!title && !subtitle && !headerExtra) return null;
    return /* @__PURE__ */ jsxs("header", { className: "w3f-slot-header", children: [
      title && /* @__PURE__ */ jsx("h3", { className: "w3f-card-title", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "w3f-card-subtitle", children: subtitle }),
      headerExtra && /* @__PURE__ */ jsx("div", { className: "w3f-card-header-extra", children: headerExtra })
    ] });
  };
  const renderMedia = () => {
    if (!imageSrc) return null;
    return /* @__PURE__ */ jsx("div", { className: "w3f-slot-media", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: sanitizeUrl(imageSrc),
        alt: imageAlt,
        className: "w3f-card-image",
        loading: "lazy"
      }
    ) });
  };
  const renderContent = () => {
    if (!content) return null;
    return /* @__PURE__ */ jsx("div", { className: "w3f-slot-content", children: content });
  };
  const renderActions = () => {
    if (!actions && (!buttons || buttons.length === 0)) return null;
    const actionsClasses = buildCard2ActionsClasses(actionsAlign);
    return /* @__PURE__ */ jsxs("div", { className: actionsClasses, children: [
      actions,
      !actions && buttons.map((buttonProps, index) => {
        const { key, ...rest } = buttonProps;
        return /* @__PURE__ */ jsx(Button, { ...rest }, key || `c2-btn-${index}`);
      })
    ] });
  };
  const renderActionArea = () => {
    if (!actionAreaContent) return null;
    return /* @__PURE__ */ jsx("div", { className: "w3f-slot-action-area", children: actionAreaContent });
  };
  const renderCustom = () => {
    if (!customContent) return null;
    return /* @__PURE__ */ jsx("div", { className: "w3f-slot-custom", children: customContent });
  };
  return /* @__PURE__ */ jsxs("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
    renderBadge(),
    renderHeader(),
    renderMedia(),
    renderContent(),
    renderActions(),
    renderActionArea(),
    renderCustom()
  ] });
});
Card_2.displayName = "Card_2";
var Card_2_default = Card_2;
export {
  Card_2,
  Card_2_default as default
};
//# sourceMappingURL=Card_2.js.map
