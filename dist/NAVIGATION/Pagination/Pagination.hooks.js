import { useState, useCallback } from "react";
function usePaginationPage(pageProp, defaultPage, count, disabled, onChange) {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const isControlled = pageProp !== void 0;
  const currentPage = isControlled ? pageProp : internalPage;
  const handlePageChange = useCallback(
    (e, newPage) => {
      if (disabled || newPage < 1 || newPage > count || newPage === currentPage) return;
      if (!isControlled) setInternalPage(newPage);
      if (onChange) onChange(e, newPage);
    },
    [disabled, count, currentPage, isControlled, onChange]
  );
  return { currentPage, handlePageChange };
}
export {
  usePaginationPage
};
//# sourceMappingURL=Pagination.hooks.js.map
