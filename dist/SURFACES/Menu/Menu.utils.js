import { MENU_CLASSES } from "./Menu.constants";
function buildDropdownClasses(position) {
  const positionClass = {
    right: MENU_CLASSES.dropdownRight,
    center: MENU_CLASSES.dropdownCenter,
    top: MENU_CLASSES.dropdownTop,
    left: ""
  }[position] || "";
  return [MENU_CLASSES.dropdown, positionClass].filter(Boolean).join(" ");
}
function buildMenuClasses(position, className, unstyled) {
  if (unstyled) {
    return [MENU_CLASSES.container, "w3f-menu--unstyled", className].filter(Boolean).join(" ");
  }
  return [MENU_CLASSES.container, className].filter(Boolean).join(" ");
}
export {
  buildDropdownClasses,
  buildMenuClasses
};
//# sourceMappingURL=Menu.utils.js.map
