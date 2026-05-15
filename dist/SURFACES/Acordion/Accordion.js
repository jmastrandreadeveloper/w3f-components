"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef } from "react";
import Button from "../../INPUTS/Button/Button";
import {
  ACCORDION_DEFAULTS,
  ACCORDION_ITEM_DEFAULTS,
  ACCORDION_SUMMARY_DEFAULTS,
  ACCORDION_CLASSES,
  ACCORDION_SUMMARY_STYLE
} from "./Accordion.constants";
import {
  buildAccordionClasses,
  buildAccordionItemClasses,
  buildContentContainerClasses
} from "./Accordion.utils";
import { useAccordionState } from "./Accordion.hooks";
const AccordionDetails = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx("div", { className: [ACCORDION_CLASSES.details, className].filter(Boolean).join(" "), children });
AccordionDetails.displayName = "AccordionDetails";
const AccordionActions = ({
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
  return /* @__PURE__ */ jsx("div", { className: [ACCORDION_CLASSES.actions, className].filter(Boolean).join(" "), children: childrenWithProps });
};
AccordionActions.displayName = "AccordionActions";
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
const AccordionSummary = ({
  children,
  isExpanded = false,
  togglePanel,
  disabled = ACCORDION_SUMMARY_DEFAULTS.disabled,
  icon,
  className = ACCORDION_SUMMARY_DEFAULTS.className
}) => /* @__PURE__ */ jsxs(
  Button,
  {
    variant: "text",
    fullWidth: true,
    className: [ACCORDION_CLASSES.summary, className].filter(Boolean).join(" "),
    onClick: togglePanel,
    "aria-expanded": isExpanded,
    disabled,
    type: "button",
    style: ACCORDION_SUMMARY_STYLE,
    children: [
      /* @__PURE__ */ jsx("span", { className: ACCORDION_CLASSES.icon, children: icon || defaultChevronIcon }),
      /* @__PURE__ */ jsx("span", { className: ACCORDION_CLASSES.flexGrow, children })
    ]
  }
);
AccordionSummary.displayName = "AccordionSummary";
const AccordionItem = ({
  id,
  children,
  isExpanded = false,
  togglePanel,
  closePanel,
  disabled = ACCORDION_ITEM_DEFAULTS.disabled,
  color = ACCORDION_ITEM_DEFAULTS.color,
  className = ACCORDION_ITEM_DEFAULTS.className
}) => {
  const childArray = React.Children.toArray(children);
  const summary = childArray.find(
    (child) => React.isValidElement(child) && child.type === AccordionSummary
  );
  const details = childArray.find(
    (child) => React.isValidElement(child) && child.type === AccordionDetails
  );
  const actions = childArray.find(
    (child) => React.isValidElement(child) && child.type === AccordionActions
  );
  const itemCls = buildAccordionItemClasses(disabled, color, className);
  const contentCls = buildContentContainerClasses(isExpanded);
  const summaryWithProps = summary ? React.cloneElement(
    summary,
    { isExpanded, togglePanel, id, disabled }
  ) : null;
  const actionsWithProps = actions ? React.cloneElement(
    actions,
    { closePanel }
  ) : null;
  return /* @__PURE__ */ jsxs("div", { className: itemCls, children: [
    summaryWithProps,
    /* @__PURE__ */ jsx("div", { className: contentCls, children: /* @__PURE__ */ jsxs("div", { className: ACCORDION_CLASSES.contentWrapper, children: [
      details,
      actionsWithProps
    ] }) })
  ] });
};
AccordionItem.displayName = "AccordionItem";
const Accordion = forwardRef(({
  children,
  multiple = ACCORDION_DEFAULTS.multiple,
  variant = ACCORDION_DEFAULTS.variant,
  size = ACCORDION_DEFAULTS.size,
  unstyled = ACCORDION_DEFAULTS.unstyled,
  className = ACCORDION_DEFAULTS.className
}, ref) => {
  const { togglePanel, closePanel, isExpanded } = useAccordionState(multiple);
  const cls = buildAccordionClasses(variant, size, className, unstyled);
  const accordionItems = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === AccordionItem) {
      const childProps = child.props;
      const id = childProps.id;
      return React.cloneElement(child, {
        isExpanded: isExpanded(id),
        togglePanel: () => togglePanel(id),
        closePanel: () => closePanel(id)
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsx("div", { ref, className: cls, children: accordionItems });
});
Accordion.displayName = "Accordion";
var Accordion_default = Accordion;
export {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionItem,
  AccordionSummary,
  Accordion_default as default
};
//# sourceMappingURL=Accordion.js.map
