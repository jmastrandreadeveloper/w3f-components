"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal
} from "lucide-react";
import { PAGINATION_DEFAULTS, PAGINATION_CLASSES, PAGINATION_ICON_SIZES } from "./Pagination.constants";
import { buildPages, buildPaginationClasses, buildPageItemClasses } from "./Pagination.utils";
import { usePaginationPage } from "./Pagination.hooks";
const Pagination = forwardRef(
  ({
    count = PAGINATION_DEFAULTS.count,
    page: pageProp,
    defaultPage = PAGINATION_DEFAULTS.defaultPage,
    onChange,
    variant = PAGINATION_DEFAULTS.variant,
    shape = PAGINATION_DEFAULTS.shape,
    size = PAGINATION_DEFAULTS.size,
    color = PAGINATION_DEFAULTS.color,
    disabled = PAGINATION_DEFAULTS.disabled,
    siblingCount = PAGINATION_DEFAULTS.siblingCount,
    boundaryCount = PAGINATION_DEFAULTS.boundaryCount,
    showFirstButton = PAGINATION_DEFAULTS.showFirstButton,
    showLastButton = PAGINATION_DEFAULTS.showLastButton,
    hideNextButton = PAGINATION_DEFAULTS.hideNextButton,
    hidePrevButton = PAGINATION_DEFAULTS.hidePrevButton,
    unstyled = PAGINATION_DEFAULTS.unstyled,
    className = PAGINATION_DEFAULTS.className,
    ...props
  }, ref) => {
    const { currentPage, handlePageChange } = usePaginationPage(
      pageProp,
      defaultPage,
      count,
      disabled,
      onChange
    );
    const pages = useMemo(
      () => buildPages(count, currentPage, siblingCount, boundaryCount),
      [count, currentPage, siblingCount, boundaryCount]
    );
    const containerCls = useMemo(
      () => buildPaginationClasses(variant, shape, size, color, disabled, className, unstyled),
      [variant, shape, size, color, disabled, className, unstyled]
    );
    const iconSize = PAGINATION_ICON_SIZES[size];
    return /* @__PURE__ */ jsx("nav", { ref, className: containerCls, "aria-label": "paginacion", ...props, children: /* @__PURE__ */ jsxs("ul", { className: PAGINATION_CLASSES.list, children: [
      showFirstButton && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, 1),
          disabled: disabled || currentPage === 1,
          "aria-label": "Primera pagina",
          children: /* @__PURE__ */ jsx(ChevronsLeft, { size: iconSize })
        }
      ) }),
      !hidePrevButton && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, currentPage - 1),
          disabled: disabled || currentPage === 1,
          "aria-label": "Pagina anterior",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: iconSize })
        }
      ) }),
      pages.map((item, idx) => {
        if (typeof item === "string") {
          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "span",
            {
              className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.ellipsis}`,
              children: /* @__PURE__ */ jsx(MoreHorizontal, { size: iconSize - 2 })
            }
          ) }, item);
        }
        const isActive = item === currentPage;
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: buildPageItemClasses(isActive),
            onClick: (e) => handlePageChange(e, item),
            disabled,
            "aria-current": isActive ? "page" : void 0,
            "aria-label": `Pagina ${item}`,
            children: item
          }
        ) }, item);
      }),
      !hideNextButton && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, currentPage + 1),
          disabled: disabled || currentPage === count,
          "aria-label": "Pagina siguiente",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: iconSize })
        }
      ) }),
      showLastButton && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `${PAGINATION_CLASSES.item} ${PAGINATION_CLASSES.nav_btn}`,
          onClick: (e) => handlePageChange(e, count),
          disabled: disabled || currentPage === count,
          "aria-label": "Ultima pagina",
          children: /* @__PURE__ */ jsx(ChevronsRight, { size: iconSize })
        }
      ) })
    ] }) });
  }
);
Pagination.displayName = "Pagination";
var Pagination_default = Pagination;
export {
  Pagination,
  Pagination_default as default
};
//# sourceMappingURL=Pagination.js.map
