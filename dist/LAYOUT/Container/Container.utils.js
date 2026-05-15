import { CONTAINER_CLASSES } from "./Container.constants";
const buildContainerClass = (additionalClasses = "") => {
  return `${CONTAINER_CLASSES.base} ${additionalClasses}`.trim();
};
export {
  buildContainerClass
};
//# sourceMappingURL=Container.utils.js.map
