import { TABLE_COLORS, TABLE_SIZES, TABLE_VARIANTS } from "./Table.constants";
const buildContainerClasses = (className, unstyled) => {
  return ["w3f-table-container", unstyled && "w3f-table--unstyled", className].filter(Boolean).join(" ");
};
const buildTableClasses = (size, variant, color, enableColumnResize, unstyled) => {
  if (unstyled) {
    return "w3f-table w3f-table--unstyled";
  }
  return [
    "w3f-table",
    TABLE_SIZES[size] || "",
    TABLE_VARIANTS[variant] || "",
    TABLE_COLORS[color] || "",
    enableColumnResize ? "w3f-table-fixed" : ""
  ].filter(Boolean).join(" ");
};
export {
  buildContainerClasses,
  buildTableClasses
};
//# sourceMappingURL=Table.utils.js.map
