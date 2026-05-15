"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef, useMemo, useCallback } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import {
  BREADCRUMBS_DEFAULTS,
  BREADCRUMB_ITEM_DEFAULTS,
  BREADCRUMBS_CLASSES,
  ELLIPSIS_KEY
} from "./Breadcrumbs.constants";
import {
  buildBreadcrumbsClasses,
  buildBreadcrumbItemClasses,
  computeVisibleItems
} from "./Breadcrumbs.utils";
import { useBreadcrumbsExpand } from "./Breadcrumbs.hooks";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
const BreadcrumbItem = ({
  href,
  icon,
  children,
  active = BREADCRUMB_ITEM_DEFAULTS.active,
  disabled = BREADCRUMB_ITEM_DEFAULTS.disabled,
  onClick,
  className = BREADCRUMB_ITEM_DEFAULTS.className,
  ...props
}) => {
  const cls = useMemo(
    () => buildBreadcrumbItemClasses(active, disabled, className),
    [active, disabled, className]
  );
  const handleClick = useCallback(
    (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
    },
    [disabled, onClick]
  );
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    icon && /* @__PURE__ */ jsx("span", { className: BREADCRUMBS_CLASSES.crumbIcon, children: icon }),
    children && /* @__PURE__ */ jsx("span", { className: BREADCRUMBS_CLASSES.crumbText, children })
  ] });
  if (active || !href && !onClick) {
    return /* @__PURE__ */ jsx("span", { className: cls, "aria-current": active ? "page" : void 0, ...props, children: content });
  }
  return /* @__PURE__ */ jsx("a", { className: cls, href: sanitizeUrl(href) || "#", onClick: handleClick, ...props, children: content });
};
BreadcrumbItem.displayName = "BreadcrumbItem";
const Breadcrumbs = forwardRef(({
  children,
  separator,
  maxItems = BREADCRUMBS_DEFAULTS.maxItems,
  itemsBeforeCollapse = BREADCRUMBS_DEFAULTS.itemsBeforeCollapse,
  itemsAfterCollapse = BREADCRUMBS_DEFAULTS.itemsAfterCollapse,
  expandText = BREADCRUMBS_DEFAULTS.expandText,
  color = BREADCRUMBS_DEFAULTS.color,
  size = BREADCRUMBS_DEFAULTS.size,
  variant,
  unstyled = BREADCRUMBS_DEFAULTS.unstyled,
  className = BREADCRUMBS_DEFAULTS.className,
  ...props
}, ref) => {
  const { expanded, expand } = useBreadcrumbsExpand();
  const items = useMemo(
    () => React.Children.toArray(children).filter(Boolean),
    [children]
  );
  const visibleItems = useMemo(
    () => computeVisibleItems(items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse),
    [items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse]
  );
  const separatorNode = separator || /* @__PURE__ */ jsx(ChevronRight, { size: 14 });
  const cls = useMemo(
    () => buildBreadcrumbsClasses(size, color, className, unstyled, variant),
    [size, color, className, unstyled, variant]
  );
  return /* @__PURE__ */ jsx("nav", { ref, className: cls, "aria-label": "breadcrumb", ...props, children: /* @__PURE__ */ jsx("ol", { className: BREADCRUMBS_CLASSES.list, children: visibleItems.map((item, index) => {
    const isLast = index === visibleItems.length - 1;
    if (item === ELLIPSIS_KEY) {
      return /* @__PURE__ */ jsxs("li", { className: BREADCRUMBS_CLASSES.item, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: BREADCRUMBS_CLASSES.expandBtn,
            onClick: expand,
            "aria-label": expandText,
            title: expandText,
            children: /* @__PURE__ */ jsx(MoreHorizontal, { size: 16 })
          }
        ),
        !isLast && /* @__PURE__ */ jsx("span", { className: BREADCRUMBS_CLASSES.separator, "aria-hidden": "true", children: separatorNode })
      ] }, "__ellipsis");
    }
    const reactItem = item;
    return /* @__PURE__ */ jsxs(
      "li",
      {
        className: BREADCRUMBS_CLASSES.item,
        children: [
          item,
          !isLast && /* @__PURE__ */ jsx(
            "span",
            {
              className: BREADCRUMBS_CLASSES.separator,
              "aria-hidden": "true",
              children: separatorNode
            }
          )
        ]
      },
      reactItem.key ?? index
    );
  }) }) });
});
Breadcrumbs.displayName = "Breadcrumbs";
var Breadcrumbs_default = Breadcrumbs;
export {
  BreadcrumbItem,
  Breadcrumbs,
  Breadcrumbs_default as default
};
//# sourceMappingURL=Breadcrumbs.js.map
