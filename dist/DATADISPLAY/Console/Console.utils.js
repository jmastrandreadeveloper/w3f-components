import { CONSOLE_CLASSES } from "./Console.constants";
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function createMessage(content, level = "info", label) {
  return {
    id: generateId(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    content,
    level,
    label
  };
}
function formatTimestamp(isoString) {
  return new Date(isoString).toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function isJsonable(value) {
  return typeof value === "object" && value !== null;
}
function formatContentAsString(content) {
  if (content === null) return "null";
  if (content === void 0) return "undefined";
  if (typeof content === "string") return content;
  if (typeof content === "number" || typeof content === "boolean") return String(content);
  return JSON.stringify(content, null, 2);
}
function buildConsoleClasses(theme, unstyled, className) {
  const base = CONSOLE_CLASSES.root;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    theme === "dark" ? CONSOLE_CLASSES.themeDark : CONSOLE_CLASSES.themeLight,
    className
  ].filter(Boolean).join(" ");
}
function buildMessageClasses(level) {
  const levelMap = {
    info: CONSOLE_CLASSES.messageInfo,
    warn: CONSOLE_CLASSES.messageWarn,
    error: CONSOLE_CLASSES.messageError,
    success: CONSOLE_CLASSES.messageSuccess,
    debug: CONSOLE_CLASSES.messageDebug
  };
  return [CONSOLE_CLASSES.message, levelMap[level]].filter(Boolean).join(" ");
}
function buildFilterBtnClasses(level, activeLevel) {
  const levelMap = {
    info: CONSOLE_CLASSES.filterInfo,
    warn: CONSOLE_CLASSES.filterWarn,
    error: CONSOLE_CLASSES.filterError,
    success: CONSOLE_CLASSES.filterSuccess,
    debug: CONSOLE_CLASSES.filterDebug
  };
  return [
    CONSOLE_CLASSES.filterBtn,
    levelMap[level] ?? "",
    level === activeLevel ? CONSOLE_CLASSES.filterBtnActive : ""
  ].filter(Boolean).join(" ");
}
function filterMessages(messages, levelFilter, searchQuery) {
  return messages.filter((msg) => {
    if (levelFilter !== "all" && msg.level !== levelFilter) return false;
    if (searchQuery) {
      const text = formatContentAsString(msg.content).toLowerCase();
      const label = (msg.label ?? "").toLowerCase();
      const q = searchQuery.toLowerCase();
      if (!text.includes(q) && !label.includes(q)) return false;
    }
    return true;
  });
}
function exportMessagesAsLog(messages) {
  const text = messages.map(
    (m) => `[${formatTimestamp(m.timestamp)}] [${m.level.toUpperCase()}]${m.label ? ` (${m.label})` : ""} ${formatContentAsString(m.content)}`
  ).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `console-${Date.now()}.log`;
  a.click();
  URL.revokeObjectURL(url);
}
export {
  buildConsoleClasses,
  buildFilterBtnClasses,
  buildMessageClasses,
  createMessage,
  exportMessagesAsLog,
  filterMessages,
  formatContentAsString,
  formatTimestamp,
  generateId,
  isJsonable
};
//# sourceMappingURL=Console.utils.js.map
