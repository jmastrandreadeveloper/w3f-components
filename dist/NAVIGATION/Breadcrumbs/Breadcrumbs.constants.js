const BREADCRUMBS_DEFAULTS = {
  maxItems: 0,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  expandText: "Mostrar ruta",
  color: "default",
  size: "md",
  unstyled: false,
  className: ""
};
const BREADCRUMB_ITEM_DEFAULTS = {
  active: false,
  disabled: false,
  className: ""
};
const BREADCRUMBS_CLASSES = {
  nav: "w3f-breadcrumbs",
  list: "w3f-breadcrumbs__list",
  item: "w3f-breadcrumbs__item",
  separator: "w3f-breadcrumbs__separator",
  expandBtn: "w3f-breadcrumb-expand",
  crumb: "w3f-breadcrumb-item",
  crumbActive: "w3f-breadcrumb-item--active",
  crumbDisabled: "w3f-breadcrumb-item--disabled",
  crumbIcon: "w3f-breadcrumb-item__icon",
  crumbText: "w3f-breadcrumb-item__text"
};
const BREADCRUMBS_VARIANT_CLASSES = {
  solid: "w3f-breadcrumbs--solid",
  outlined: "w3f-breadcrumbs--outlined",
  ghost: "w3f-breadcrumbs--ghost",
  soft: "w3f-breadcrumbs--soft"
};
const ELLIPSIS_KEY = "__ellipsis";
export {
  BREADCRUMBS_CLASSES,
  BREADCRUMBS_DEFAULTS,
  BREADCRUMBS_VARIANT_CLASSES,
  BREADCRUMB_ITEM_DEFAULTS,
  ELLIPSIS_KEY
};
//# sourceMappingURL=Breadcrumbs.constants.js.map
