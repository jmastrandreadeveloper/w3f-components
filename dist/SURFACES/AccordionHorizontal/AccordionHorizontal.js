"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import {
  ACCORDION_H_DEFAULTS,
  ACCORDION_H_ITEM_DEFAULTS,
  ACCORDION_H_SUMMARY_DEFAULTS,
  ACCORDION_H_CLASSES,
  ACCORDION_H_SPEED_MS,
  ACCORDION_H_EASING
} from "./AccordionHorizontal.constants";
import {
  buildAccordionHClasses,
  buildAccordionItemHClasses,
  buildAccordionHContentClasses
} from "./AccordionHorizontal.utils";
import { useAccordionState } from "./AccordionHorizontal.hooks";
const defaultChevronIcon = /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" })
  }
);
const AccordionDetailsH = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx("div", { className: [ACCORDION_H_CLASSES.details, className].filter(Boolean).join(" "), children });
AccordionDetailsH.displayName = "AccordionDetailsH";
const AccordionActionsH = ({
  children,
  closePanel,
  className = ""
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childProps = child.props;
    const childText = childProps.children?.toString().toLowerCase() || "";
    const childClass = childProps.className || "";
    if (childText.includes("cerrar") || childText.includes("close") || childClass.includes("close")) {
      return React.cloneElement(child, {
        onClick: (e) => {
          if (typeof childProps.onClick === "function") childProps.onClick(e);
          if (closePanel) closePanel();
        }
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx("div", { className: [ACCORDION_H_CLASSES.actions, className].filter(Boolean).join(" "), children: childrenWithProps });
};
AccordionActionsH.displayName = "AccordionActionsH";
const ORIENTATION_CLASS = {
  upright: ACCORDION_H_CLASSES.summaryUpright,
  clockwise: ACCORDION_H_CLASSES.summaryCw,
  "counter-clockwise": ACCORDION_H_CLASSES.summaryCcw
};
const AccordionSummaryH = ({
  children,
  isExpanded = false,
  togglePanel,
  textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
  disabled = ACCORDION_H_SUMMARY_DEFAULTS.disabled,
  icon,
  className = ACCORDION_H_SUMMARY_DEFAULTS.className
}) => /* @__PURE__ */ jsxs(
  "button",
  {
    className: [
      ACCORDION_H_CLASSES.summary,
      ORIENTATION_CLASS[textOrientation],
      className
    ].filter(Boolean).join(" "),
    onClick: togglePanel,
    "aria-expanded": isExpanded,
    disabled,
    type: "button",
    children: [
      /* @__PURE__ */ jsx("span", { children }),
      /* @__PURE__ */ jsx("span", { className: ACCORDION_H_CLASSES.icon, children: icon ?? defaultChevronIcon })
    ]
  }
);
AccordionSummaryH.displayName = "AccordionSummaryH";
const AccordionItemH = ({
  id,
  children,
  isExpanded = false,
  togglePanel,
  textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
  color = ACCORDION_H_ITEM_DEFAULTS.color,
  disabled = ACCORDION_H_ITEM_DEFAULTS.disabled,
  className = ACCORDION_H_ITEM_DEFAULTS.className
}) => {
  const childArray = React.Children.toArray(children);
  const summary = childArray.find(
    (child) => React.isValidElement(child) && child.type === AccordionSummaryH
  );
  const details = childArray.find(
    (child) => React.isValidElement(child) && child.type === AccordionDetailsH
  );
  const actions = childArray.find(
    (child) => React.isValidElement(child) && child.type === AccordionActionsH
  );
  const itemCls = buildAccordionItemHClasses(isExpanded, disabled, color, className);
  const contentCls = buildAccordionHContentClasses(isExpanded);
  const summaryWithProps = summary ? React.cloneElement(
    summary,
    { isExpanded, togglePanel, id, disabled, textOrientation }
  ) : null;
  return /* @__PURE__ */ jsxs("div", { className: itemCls, children: [
    summaryWithProps,
    /* @__PURE__ */ jsx("div", { className: contentCls, children: /* @__PURE__ */ jsxs("div", { className: ACCORDION_H_CLASSES.contentWrapper, children: [
      details,
      actions
    ] }) })
  ] });
};
AccordionItemH.displayName = "AccordionItemH";
const AccordionHorizontal = forwardRef(({
  children,
  multiple = ACCORDION_H_DEFAULTS.multiple,
  variant = ACCORDION_H_DEFAULTS.variant,
  size = ACCORDION_H_DEFAULTS.size,
  height = ACCORDION_H_DEFAULTS.height,
  textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
  speed = ACCORDION_H_DEFAULTS.speed,
  unstyled = ACCORDION_H_DEFAULTS.unstyled,
  className = ACCORDION_H_DEFAULTS.className
}, ref) => {
  const { togglePanel, closePanel, isExpanded } = useAccordionState(multiple);
  const cls = buildAccordionHClasses(variant, size, className, unstyled);
  const accordionItems = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === AccordionItemH) {
      const childProps = child.props;
      const id = childProps.id;
      return React.cloneElement(child, {
        isExpanded: isExpanded(id),
        togglePanel: () => togglePanel(id),
        textOrientation
      });
    }
    return child;
  });
  const heightValue = typeof height === "number" ? `${height}px` : height;
  const durationMs = typeof speed === "number" ? speed : ACCORDION_H_SPEED_MS[speed];
  const transitionValue = `${durationMs}ms ${ACCORDION_H_EASING}`;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cls,
      style: {
        minHeight: heightValue,
        "--w3f-acch-transition": transitionValue,
        "--w3f-acch-transition-normal": transitionValue
      },
      children: accordionItems
    }
  );
});
AccordionHorizontal.displayName = "AccordionHorizontal";
var AccordionHorizontal_default = AccordionHorizontal;
export {
  AccordionActionsH,
  AccordionDetailsH,
  AccordionHorizontal,
  AccordionItemH,
  AccordionSummaryH,
  AccordionHorizontal_default as default
};
//# sourceMappingURL=AccordionHorizontal.js.map
