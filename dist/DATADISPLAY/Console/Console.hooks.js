import { useState, useCallback, useRef, useEffect, useContext } from "react";
import { ConsoleContext } from "./Console.context";
import { createMessage } from "./Console.utils";
function useConsoleState(maxMessages) {
  const [messages, setMessages] = useState([]);
  const logMessage = useCallback(
    (content, level = "info", label) => {
      const msg = createMessage(content, level, label);
      setMessages((prev) => {
        const next = [...prev, msg];
        return next.length > maxMessages ? next.slice(next.length - maxMessages) : next;
      });
    },
    [maxMessages]
  );
  const log = useCallback(
    (content, label) => logMessage(content, "info", label),
    [logMessage]
  );
  const warn = useCallback(
    (content, label) => logMessage(content, "warn", label),
    [logMessage]
  );
  const error = useCallback(
    (content, label) => logMessage(content, "error", label),
    [logMessage]
  );
  const success = useCallback(
    (content, label) => logMessage(content, "success", label),
    [logMessage]
  );
  const debug = useCallback(
    (content, label) => logMessage(content, "debug", label),
    [logMessage]
  );
  const clear = useCallback(() => setMessages([]), []);
  return { messages, logMessage, log, warn, error, success, debug, clear };
}
function useConsoleFilter(defaultLevel) {
  const [levelFilter, setLevelFilter] = useState(defaultLevel);
  const [searchQuery, setSearchQuery] = useState("");
  return { levelFilter, setLevelFilter, searchQuery, setSearchQuery };
}
function useAutoScroll(messages) {
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);
  return bodyRef;
}
function useConsole() {
  const ctx = useContext(ConsoleContext);
  if (!ctx) {
    throw new Error("useConsole debe usarse dentro de un componente <Console>");
  }
  return ctx;
}
export {
  useAutoScroll,
  useConsole,
  useConsoleFilter,
  useConsoleState
};
//# sourceMappingURL=Console.hooks.js.map
