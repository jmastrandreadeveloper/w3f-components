import { ICON_REGISTRY } from "./Icon.registry";
import { IconSizes, IconColors, IconAliases } from "./Icon.constants";
const kebabToPascal = (name) => name.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
const resolveIconName = (name) => {
  const aliased = IconAliases[name] || name;
  if (ICON_REGISTRY[aliased]) {
    return aliased;
  }
  const pascal = kebabToPascal(aliased);
  if (ICON_REGISTRY[pascal]) {
    return pascal;
  }
  return name;
};
const resolveIconSize = (size) => {
  if (typeof size === "string") {
    return IconSizes[size.toLowerCase()] || IconSizes.md;
  }
  return size;
};
const resolveIconColor = (color) => {
  return IconColors[color.toLowerCase()] || color;
};
const buildIconClasses = (unstyled, className) => {
  const base = "w3f-icon";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [`w3f-inline-flex w3f-items-center w3f-justify-center`, className].filter(Boolean).join(" ");
};
export {
  buildIconClasses,
  resolveIconColor,
  resolveIconName,
  resolveIconSize
};
//# sourceMappingURL=Icon.utils.js.map
