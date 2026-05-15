"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import { CARD_DEFAULTS } from "./Card.constants";
import { buildCardClasses, buildHeaderClasses, buildContentClasses, buildActionsClasses } from "./Card.utils";
import Badge from "../../DATADISPLAY/Badge/Badge";
import Button from "../../INPUTS/Button/Button";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
import { useBridgeBind } from "@w3f/bridge";
const Card = forwardRef(({
  imageSrc,
  imageAlt = CARD_DEFAULTS.imageAlt,
  imagePosition = CARD_DEFAULTS.imagePosition,
  title,
  subtitle,
  content,
  actions,
  buttons = CARD_DEFAULTS.buttons,
  variant = CARD_DEFAULTS.variant,
  hoverable = CARD_DEFAULTS.hoverable,
  clickable = CARD_DEFAULTS.clickable,
  onClick,
  className = CARD_DEFAULTS.className,
  headerClassName = CARD_DEFAULTS.headerClassName,
  contentClassName = CARD_DEFAULTS.contentClassName,
  actionsClassName = CARD_DEFAULTS.actionsClassName,
  style,
  fullWidth = CARD_DEFAULTS.fullWidth,
  badge,
  size = CARD_DEFAULTS.size,
  actionsAlign = CARD_DEFAULTS.actionsAlign,
  layoutStyle,
  actionAreaContent,
  customContent,
  headerExtra,
  unstyled = CARD_DEFAULTS.unstyled,
  bindId
}, ref) => {
  const { dispatch } = useBridgeBind({ bindId });
  const layoutMode = !!layoutStyle;
  const cardClasses = buildCardClasses(variant, size, imagePosition, hoverable, clickable, !!onClick, fullWidth, layoutMode, className, unstyled);
  const mergedStyle = layoutStyle ? { ...layoutStyle, ...style } : style;
  const headerClasses = buildHeaderClasses(headerClassName);
  const contentClasses = buildContentClasses(contentClassName);
  const actionsClasses = buildActionsClasses(actionsAlign, actionsClassName);
  const handleClick = (e) => {
    const target = e.target;
    const isInteractiveElement = target.closest("button, a, input, textarea, select");
    if (onClick && !isInteractiveElement) {
      onClick(e);
      dispatch("click");
    }
  };
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };
  const interactiveProps = clickable || onClick ? {
    role: "button",
    tabIndex: 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    "aria-pressed": false
  } : {};
  const renderImage = () => {
    if (!imageSrc) return null;
    return /* @__PURE__ */ jsx(
      "img",
      {
        src: sanitizeUrl(imageSrc),
        alt: imageAlt,
        className: "w3f-card-image",
        loading: "lazy"
      }
    );
  };
  const renderHeader = () => {
    if (!title && !subtitle && !headerExtra) return null;
    return /* @__PURE__ */ jsxs("header", { className: headerClasses, children: [
      title && /* @__PURE__ */ jsx("h3", { className: "w3f-card-title", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "w3f-card-subtitle", children: subtitle }),
      headerExtra && /* @__PURE__ */ jsx("div", { className: "w3f-card-header-extra", children: headerExtra })
    ] });
  };
  const renderContent = () => {
    if (!content) return null;
    return /* @__PURE__ */ jsx("div", { className: contentClasses, children: content });
  };
  const renderActions = () => {
    if (!actions && (!buttons || buttons.length === 0)) return null;
    return /* @__PURE__ */ jsxs("div", { className: actionsClasses, children: [
      actions && actions,
      !actions && buttons.length > 0 && buttons.map((buttonProps, index) => {
        const { key, ...restButtonProps } = buttonProps;
        return /* @__PURE__ */ jsx(
          Button,
          {
            ...restButtonProps
          },
          key || `card-button-${index}`
        );
      })
    ] });
  };
  const renderActionArea = () => {
    if (!actionAreaContent) return null;
    return /* @__PURE__ */ jsx("div", { className: "w3f-card-action-area", children: actionAreaContent });
  };
  const renderCustom = () => {
    if (!customContent) return null;
    return /* @__PURE__ */ jsx("div", { className: "w3f-card-custom", children: customContent });
  };
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
  if (layoutMode) {
    return /* @__PURE__ */ jsxs("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
      renderBadge(),
      renderImage(),
      renderHeader(),
      renderContent(),
      renderActions(),
      renderActionArea(),
      renderCustom()
    ] });
  }
  if (imagePosition === "left" || imagePosition === "right") {
    return /* @__PURE__ */ jsxs("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
      renderBadge(),
      imagePosition === "left" && renderImage(),
      /* @__PURE__ */ jsxs("div", { className: "w3f-card-body", children: [
        renderHeader(),
        renderContent(),
        renderActions(),
        renderActionArea(),
        renderCustom()
      ] }),
      imagePosition === "right" && renderImage()
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { ref, className: cardClasses, style: mergedStyle, ...interactiveProps, children: [
    renderBadge(),
    imagePosition === "top" && renderImage(),
    renderHeader(),
    renderContent(),
    imagePosition === "bottom" && renderImage(),
    renderActions(),
    renderActionArea(),
    renderCustom()
  ] });
});
Card.displayName = "Card";
var Card_default = Card;
export {
  Card,
  Card_default as default
};
//# sourceMappingURL=Card.js.map
