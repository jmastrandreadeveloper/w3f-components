const buildQuoteClasses = (color, size, unstyled, className) => {
  const base = "w3f-quote";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const classes = [
    base,
    `w3f-quote-${size}`,
    `w3f-border-l-4`,
    `w3f-border-${color}`
  ];
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
const getQuoteBgClass = (color) => {
  return `w3f-bg-${color}-subtle`;
};
export {
  buildQuoteClasses,
  getQuoteBgClass
};
//# sourceMappingURL=Quotes.utils.js.map
