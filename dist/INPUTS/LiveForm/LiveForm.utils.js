import { LIVE_FORM_CLASSES } from "./LiveForm.constants";
function buildLiveFormClasses(className, hasValues, unstyled) {
  const base = LIVE_FORM_CLASSES.base;
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [
    base,
    hasValues && LIVE_FORM_CLASSES.active,
    className
  ].filter(Boolean).join(" ");
}
export {
  buildLiveFormClasses
};
//# sourceMappingURL=LiveForm.utils.js.map
