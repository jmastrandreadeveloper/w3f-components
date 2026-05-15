import { useMemo } from "react";
import { processContent, getAriaLabel } from "./Badge.utils";
function useBadgeContent(children, max, variant, ariaLabel) {
  const processed = useMemo(
    () => processContent(children, max, variant),
    [children, max, variant]
  );
  const effectiveAriaLabel = useMemo(
    () => getAriaLabel(ariaLabel, variant, children, processed),
    [ariaLabel, variant, children, processed]
  );
  return { processed, effectiveAriaLabel };
}
export {
  useBadgeContent
};
//# sourceMappingURL=Badge.hooks.js.map
