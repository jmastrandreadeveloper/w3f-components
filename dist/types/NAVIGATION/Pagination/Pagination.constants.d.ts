import type { PaginationColor, PaginationShape, PaginationSize, PaginationVariant } from './Pagination.types';
export declare const PAGINATION_DEFAULTS: {
    readonly count: 1;
    readonly defaultPage: 1;
    readonly variant: PaginationVariant;
    readonly shape: PaginationShape;
    readonly size: PaginationSize;
    readonly color: PaginationColor;
    readonly disabled: false;
    readonly siblingCount: 1;
    readonly boundaryCount: 1;
    readonly showFirstButton: false;
    readonly showLastButton: false;
    readonly hideNextButton: false;
    readonly hidePrevButton: false;
    readonly unstyled: false;
    readonly className: "";
};
export declare const PAGINATION_CLASSES: {
    readonly nav: "w3f-pagination";
    readonly list: "w3f-pagination__list";
    readonly item: "w3f-pagination__item";
    readonly nav_btn: "w3f-pagination__nav";
    readonly page: "w3f-pagination__page";
    readonly pageActive: "w3f-pagination__page--active";
    readonly ellipsis: "w3f-pagination__ellipsis";
};
export declare const PAGINATION_ICON_SIZES: Record<PaginationSize, number>;
//# sourceMappingURL=Pagination.constants.d.ts.map