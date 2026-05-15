const TABLE_DEFAULTS = {
  enableSorting: true,
  enableFiltering: true,
  enablePagination: true,
  enableColumnResize: false,
  enableColumnReorder: false,
  pageSize: 10,
  variant: "default",
  size: "md",
  color: "default",
  className: "",
  unstyled: false
};
const TABLE_COLORS = {
  default: "",
  primary: "w3f-table-color-primary",
  secondary: "w3f-table-color-secondary",
  success: "w3f-table-color-success",
  warning: "w3f-table-color-warning",
  danger: "w3f-table-color-danger",
  info: "w3f-table-color-info",
  gray: "w3f-table-color-gray"
};
const TABLE_SIZES = {
  sm: "w3f-table-sm",
  md: "",
  lg: "w3f-table-lg"
};
const TABLE_VARIANTS = {
  default: "",
  striped: "w3f-table-striped",
  bordered: "w3f-table-bordered"
};
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const MIN_COLUMN_WIDTH = 50;
const DRAG_DEAD_ZONE = 5;
export {
  DRAG_DEAD_ZONE,
  MIN_COLUMN_WIDTH,
  PAGE_SIZE_OPTIONS,
  TABLE_COLORS,
  TABLE_DEFAULTS,
  TABLE_SIZES,
  TABLE_VARIANTS
};
//# sourceMappingURL=Table.constants.js.map
