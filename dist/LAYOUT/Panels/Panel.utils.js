import { PANEL_CLASSES } from "./Panel.constants";
const mapColorToW3Class = (color) => {
  return "";
};
const buildPanelClassNames = ({
  color,
  padding,
  card,
  round,
  border,
  className
}) => {
  const classes = [PANEL_CLASSES.base];
  classes.push(mapColorToW3Class(color));
  if (padding) classes.push(PANEL_CLASSES.padding);
  if (card) classes.push(PANEL_CLASSES.card);
  if (round) classes.push(PANEL_CLASSES.round);
  if (border) classes.push(PANEL_CLASSES.border);
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
export {
  buildPanelClassNames
};
//# sourceMappingURL=Panel.utils.js.map
