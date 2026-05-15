import { CHIP_VARIANT_CLASSES } from "./Chip.constants";
const buildChipClasses = (disabled, isFocused, className, unstyled, variant) => {
  if (unstyled) {
    return ["w3f-chip", "w3f-chip--unstyled", className].filter(Boolean).join(" ");
  }
  const classes = ["w3f-chip"];
  if (disabled) classes.push("w3f-chip--disabled");
  if (isFocused) classes.push("w3f-chip--focused");
  if (variant) classes.push(CHIP_VARIANT_CLASSES[variant]);
  if (className) classes.push(className);
  return classes.join(" ");
};
export {
  buildChipClasses
};
//# sourceMappingURL=Chip.utils.js.map
