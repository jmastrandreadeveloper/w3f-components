import type { BreadcrumbColor, BreadcrumbSize } from './Breadcrumbs.types';
export declare const BREADCRUMBS_DEFAULTS: {
    readonly maxItems: 0;
    readonly itemsBeforeCollapse: 1;
    readonly itemsAfterCollapse: 1;
    readonly expandText: "Mostrar ruta";
    readonly color: BreadcrumbColor;
    readonly size: BreadcrumbSize;
    readonly unstyled: false;
    readonly className: "";
};
export declare const BREADCRUMB_ITEM_DEFAULTS: {
    readonly active: false;
    readonly disabled: false;
    readonly className: "";
};
export declare const BREADCRUMBS_CLASSES: {
    readonly nav: "w3f-breadcrumbs";
    readonly list: "w3f-breadcrumbs__list";
    readonly item: "w3f-breadcrumbs__item";
    readonly separator: "w3f-breadcrumbs__separator";
    readonly expandBtn: "w3f-breadcrumb-expand";
    readonly crumb: "w3f-breadcrumb-item";
    readonly crumbActive: "w3f-breadcrumb-item--active";
    readonly crumbDisabled: "w3f-breadcrumb-item--disabled";
    readonly crumbIcon: "w3f-breadcrumb-item__icon";
    readonly crumbText: "w3f-breadcrumb-item__text";
};
export declare const BREADCRUMBS_VARIANT_CLASSES: Record<string, string>;
export declare const ELLIPSIS_KEY = "__ellipsis";
//# sourceMappingURL=Breadcrumbs.constants.d.ts.map