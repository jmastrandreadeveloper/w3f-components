import { useState } from "react";
function useBreadcrumbsExpand() {
  const [expanded, setExpanded] = useState(false);
  const expand = () => setExpanded(true);
  return { expanded, expand };
}
export {
  useBreadcrumbsExpand
};
//# sourceMappingURL=Breadcrumbs.hooks.js.map
