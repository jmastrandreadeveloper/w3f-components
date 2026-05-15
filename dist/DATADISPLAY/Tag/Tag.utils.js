import { TAG_VARIANT_CLASSES } from "./Tag.constants";
const buildTagClasses = (color, light, className, unstyled, variant) => {
  if (unstyled) {
    return ["w3f-tag-base", "w3f-tag--unstyled", className].filter(Boolean).join(" ");
  }
  const classes = ["w3f-tag-base", `w3f-tag--${color}`];
  if (light) classes.push("w3f-tag--light");
  if (variant) classes.push(TAG_VARIANT_CLASSES[variant]);
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
export {
  buildTagClasses
};
//# sourceMappingURL=Tag.utils.js.map
