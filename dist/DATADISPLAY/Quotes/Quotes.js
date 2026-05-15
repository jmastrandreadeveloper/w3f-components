"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { QUOTES_DEFAULTS } from "./Quotes.constants";
import { buildQuoteClasses, getQuoteBgClass } from "./Quotes.utils";
const Quotes = ({
  children,
  text,
  author,
  color = QUOTES_DEFAULTS.color,
  size = QUOTES_DEFAULTS.size,
  showQuoteMark = QUOTES_DEFAULTS.showQuoteMark,
  icon,
  className,
  unstyled = QUOTES_DEFAULTS.unstyled
}) => {
  const quoteClasses = buildQuoteClasses(color, size, unstyled, className);
  const bgClass = unstyled ? "" : getQuoteBgClass(color);
  return /* @__PURE__ */ jsxs("blockquote", { className: `${quoteClasses} ${bgClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "w3f-quote-content", children: [
      showQuoteMark && !icon && /* @__PURE__ */ jsx("span", { className: `w3f-quote-mark w3f-text-${color}`, "aria-hidden": "true", children: "\u275D" }),
      icon && /* @__PURE__ */ jsx("span", { className: "w3f-quote-icon", "aria-hidden": "true", children: icon }),
      /* @__PURE__ */ jsx("div", { className: "w3f-quote-text", children: /* @__PURE__ */ jsx("p", { children: children || text }) })
    ] }),
    author && /* @__PURE__ */ jsx("footer", { className: "w3f-quote-author", children: /* @__PURE__ */ jsxs("cite", { children: [
      "\u2014 ",
      author
    ] }) })
  ] });
};
Quotes.displayName = "Quotes";
var Quotes_default = Quotes;
export {
  Quotes,
  Quotes_default as default
};
//# sourceMappingURL=Quotes.js.map
