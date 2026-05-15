"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { CONSOLE_DEFAULTS, CONSOLE_CLASSES, CONSOLE_LEVELS, CONSOLE_LEVEL_LABELS } from "./Console.constants";
import {
  buildConsoleClasses,
  buildMessageClasses,
  buildFilterBtnClasses,
  filterMessages,
  formatTimestamp,
  formatContentAsString,
  isJsonable,
  exportMessagesAsLog
} from "./Console.utils";
import { useConsoleState, useConsoleFilter, useAutoScroll } from "./Console.hooks";
import { ConsoleContext } from "./Console.context";
import { useConsole } from "./Console.hooks";
const ConsoleMessageLine = ({ message, showTimestamp }) => {
  const { id, timestamp, content, level, label } = message;
  const cls = buildMessageClasses(level);
  const jsonContent = isJsonable(content);
  return /* @__PURE__ */ jsxs("div", { className: cls, children: [
    showTimestamp && /* @__PURE__ */ jsx("span", { className: CONSOLE_CLASSES.messageTimestamp, children: formatTimestamp(timestamp) }),
    /* @__PURE__ */ jsxs("span", { className: CONSOLE_CLASSES.messageLevel, children: [
      "[",
      level.toUpperCase(),
      "]"
    ] }),
    label && /* @__PURE__ */ jsx("span", { className: CONSOLE_CLASSES.messageLabel, children: label }),
    /* @__PURE__ */ jsx("span", { className: CONSOLE_CLASSES.messageContent, children: jsonContent ? /* @__PURE__ */ jsx("pre", { className: CONSOLE_CLASSES.messageJson, children: JSON.stringify(content, null, 2) }) : formatContentAsString(content) })
  ] }, id);
};
const Console = React.forwardRef(({
  children,
  title = CONSOLE_DEFAULTS.title,
  maxMessages = CONSOLE_DEFAULTS.maxMessages,
  showTimestamps = CONSOLE_DEFAULTS.showTimestamps,
  showLevelFilter = CONSOLE_DEFAULTS.showLevelFilter,
  showSearch = CONSOLE_DEFAULTS.showSearch,
  showClearButton = CONSOLE_DEFAULTS.showClearButton,
  showExportButton = CONSOLE_DEFAULTS.showExportButton,
  defaultLevel = CONSOLE_DEFAULTS.defaultLevel,
  onExport,
  height = CONSOLE_DEFAULTS.height,
  theme = CONSOLE_DEFAULTS.theme,
  className = CONSOLE_DEFAULTS.className,
  unstyled = CONSOLE_DEFAULTS.unstyled
}, ref) => {
  const consoleState = useConsoleState(maxMessages);
  const { messages, clear } = consoleState;
  const { levelFilter, setLevelFilter, searchQuery, setSearchQuery } = useConsoleFilter(defaultLevel);
  const bodyRef = useAutoScroll(messages);
  const visibleMessages = filterMessages(messages, levelFilter, searchQuery);
  const counts = messages.reduce(
    (acc, m) => ({ ...acc, [m.level]: (acc[m.level] ?? 0) + 1 }),
    {}
  );
  const handleExport = () => {
    if (onExport) {
      onExport(messages);
    } else {
      exportMessagesAsLog(messages);
    }
  };
  const rootCls = buildConsoleClasses(theme, unstyled, className);
  return /* @__PURE__ */ jsxs(ConsoleContext.Provider, { value: consoleState, children: [
    children && /* @__PURE__ */ jsx("div", { className: CONSOLE_CLASSES.children, children }),
    /* @__PURE__ */ jsxs("div", { ref, className: rootCls, children: [
      /* @__PURE__ */ jsxs("div", { className: CONSOLE_CLASSES.header, children: [
        /* @__PURE__ */ jsxs("div", { className: CONSOLE_CLASSES.headerLeft, children: [
          /* @__PURE__ */ jsx("span", { className: CONSOLE_CLASSES.title, children: title }),
          /* @__PURE__ */ jsx("span", { className: CONSOLE_CLASSES.badge, children: messages.length })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: CONSOLE_CLASSES.headerRight, children: [
          showLevelFilter && /* @__PURE__ */ jsx("div", { className: CONSOLE_CLASSES.filter, children: CONSOLE_LEVELS.map((lvl) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: buildFilterBtnClasses(lvl, levelFilter),
              onClick: () => setLevelFilter(lvl),
              title: `${lvl === "all" ? "Todos" : lvl}${counts[lvl] ? ` (${counts[lvl]})` : ""}`,
              children: [
                CONSOLE_LEVEL_LABELS[lvl],
                lvl !== "all" && counts[lvl] ? /* @__PURE__ */ jsx("span", { className: CONSOLE_CLASSES.badge, children: counts[lvl] }) : null
              ]
            },
            lvl
          )) }),
          showSearch && /* @__PURE__ */ jsx("div", { className: CONSOLE_CLASSES.search, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: CONSOLE_CLASSES.searchInput,
              placeholder: "Buscar...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              "aria-label": "Buscar en consola"
            }
          ) }),
          showExportButton && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: CONSOLE_CLASSES.actionBtn,
              onClick: handleExport,
              title: "Exportar log",
              "aria-label": "Exportar",
              children: "\u2193"
            }
          ),
          showClearButton && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: CONSOLE_CLASSES.actionBtn,
              onClick: clear,
              title: "Limpiar consola",
              "aria-label": "Limpiar",
              children: "\u2715"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: bodyRef,
          className: CONSOLE_CLASSES.body,
          style: { height },
          role: "log",
          "aria-live": "polite",
          "aria-label": title,
          children: visibleMessages.length === 0 ? /* @__PURE__ */ jsx("div", { className: CONSOLE_CLASSES.empty, children: messages.length === 0 ? "\u25B6 Esperando mensajes\u2026" : "Sin resultados para el filtro activo." }) : visibleMessages.map((msg) => /* @__PURE__ */ jsx(
            ConsoleMessageLine,
            {
              message: msg,
              showTimestamp: showTimestamps
            },
            msg.id
          ))
        }
      )
    ] })
  ] });
});
Console.displayName = "Console";
var Console_default = Console;
export {
  Console,
  Console_default as default,
  useConsole
};
//# sourceMappingURL=Console.js.map
