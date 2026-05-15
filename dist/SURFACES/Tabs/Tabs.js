"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import Button from "../../INPUTS/Button/Button";
import { TABS_DEFAULTS, TABS_CLASSES, TABS_CLOSE_BTN_STYLE } from "./Tabs.constants";
import { useTabsState } from "./Tabs.hooks";
import {
  buildTabsContainerClass,
  buildTabsLayoutClass,
  buildTabsListClass,
  buildTabsItemClass
} from "./Tabs.utils";
const CloseIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    className: TABS_CLASSES.closeIcon,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    style: { width: "16px", height: "16px" },
    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })
  }
);
const EmptyIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    className: TABS_CLASSES.emptyIcon,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      }
    )
  }
);
const Tabs = forwardRef(({
  initialTabsContent = TABS_DEFAULTS.initialTabsContent,
  closable = TABS_DEFAULTS.closable,
  title = TABS_DEFAULTS.title,
  currentTabId,
  onTabChange,
  highlightActiveTab = TABS_DEFAULTS.highlightActiveTab,
  vertical = TABS_DEFAULTS.vertical,
  variant = TABS_DEFAULTS.variant,
  colorScheme = TABS_DEFAULTS.colorScheme,
  unstyled = TABS_DEFAULTS.unstyled
}, ref) => {
  const { tabs, activeTabId, handleTabClick, handleCloseTab } = useTabsState(
    initialTabsContent,
    currentTabId,
    onTabChange
  );
  const containerCls = buildTabsContainerClass(void 0, unstyled);
  if (tabs.length === 0) {
    return /* @__PURE__ */ jsxs("div", { ref, className: containerCls, children: [
      title && /* @__PURE__ */ jsx("h3", { className: TABS_CLASSES.titleEl, children: title }),
      /* @__PURE__ */ jsxs("div", { className: TABS_CLASSES.empty, children: [
        /* @__PURE__ */ jsx(EmptyIcon, {}),
        /* @__PURE__ */ jsx("p", { className: TABS_CLASSES.emptyText, children: "No hay pesta\xF1as abiertas" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { ref, className: containerCls, "aria-label": title, children: [
    title && /* @__PURE__ */ jsx("h3", { className: TABS_CLASSES.titleEl, children: title }),
    /* @__PURE__ */ jsxs("div", { className: buildTabsLayoutClass(vertical), children: [
      /* @__PURE__ */ jsx("div", { className: buildTabsListClass(variant, colorScheme, unstyled), role: "tablist", children: tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            role: "tab",
            "aria-controls": `panel-${tab.id}`,
            "aria-selected": isActive,
            tabIndex: 0,
            className: buildTabsItemClass(isActive, highlightActiveTab),
            onClick: () => handleTabClick(tab.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleTabClick(tab.id);
              }
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: TABS_CLASSES.itemText, children: tab.title }),
              closable && /* @__PURE__ */ jsx(
                Button,
                {
                  className: TABS_CLASSES.closeBtn,
                  onClick: (e) => handleCloseTab(tab.id, e),
                  "aria-label": `Cerrar ${tab.title}`,
                  type: "button",
                  variant: "text",
                  size: "sm",
                  style: TABS_CLOSE_BTN_STYLE,
                  icon: /* @__PURE__ */ jsx(CloseIcon, {})
                }
              )
            ]
          },
          tab.id
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: TABS_CLASSES.content, children: tabs.map((tab) => /* @__PURE__ */ jsx(
        "div",
        {
          id: `panel-${tab.id}`,
          role: "tabpanel",
          "aria-labelledby": `tab-${tab.id}`,
          hidden: activeTabId !== tab.id,
          className: TABS_CLASSES.panel,
          children: typeof tab.content === "string" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("h4", { className: TABS_CLASSES.panelTitle, children: tab.title }),
            /* @__PURE__ */ jsx("p", { className: TABS_CLASSES.panelText, children: tab.content })
          ] }) : tab.content
        },
        tab.id
      )) })
    ] })
  ] });
});
Tabs.displayName = "Tabs";
var Tabs_default = Tabs;
export {
  Tabs,
  Tabs_default as default
};
//# sourceMappingURL=Tabs.js.map
