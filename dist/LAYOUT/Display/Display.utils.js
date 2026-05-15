import { W3F_POSITION_CLASSES } from "./Display.constants";
function buildDisplayContainerClasses(className) {
  return [W3F_POSITION_CLASSES.CONTAINER, className].filter(Boolean).join(" ");
}
export {
  buildDisplayContainerClasses
};
//# sourceMappingURL=Display.utils.js.map
