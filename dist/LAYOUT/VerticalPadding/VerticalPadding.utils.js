import { SIZE_TO_PADDING_CLASS } from "./VerticalPadding.constants";
const mapSizeToPaddingClass = (size) => {
  if (SIZE_TO_PADDING_CLASS[size]) {
    return SIZE_TO_PADDING_CLASS[size];
  }
  if (!isNaN(parseInt(size)) && size !== "") {
    return `w3f-py-${size}`;
  }
  return "w3f-py-4";
};
const buildVerticalPaddingClassNames = ({
  size,
  utilityClass,
  className
}) => {
  const classes = [];
  if (utilityClass) {
    classes.push(utilityClass);
  } else if (size) {
    classes.push(mapSizeToPaddingClass(size));
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
export {
  buildVerticalPaddingClassNames
};
//# sourceMappingURL=VerticalPadding.utils.js.map
