const SEMANTIC_COLORS = /^(primary|secondary|success|warning|danger|info|gray)$/;
const resolveColor = (color) => {
  if (SEMANTIC_COLORS.test(color)) {
    return `var(--w3f-${color})`;
  }
  return color;
};
const buildDynamicStyles = (type, variant, thickness, spacing, height, color, gradient, animated, hasChildren, baseStyle) => {
  const styles = {};
  if (thickness !== "1px") {
    styles["--w3f-divider-thickness"] = thickness;
  }
  if (spacing !== "16px") {
    styles["--w3f-divider-spacing"] = spacing;
  }
  if (color && variant !== "gradient") {
    styles["--w3f-divider-color"] = resolveColor(color);
  }
  if (type === "vertical") {
    styles["--w3f-divider-height"] = height;
  }
  if (variant === "gradient" && gradient) {
    const fromColor = gradient.from.startsWith("#") || gradient.from.startsWith("rgb") ? gradient.from : `var(--w3f-${gradient.from})`;
    const toColor = gradient.to.startsWith("#") || gradient.to.startsWith("rgb") ? gradient.to : `var(--w3f-${gradient.to})`;
    const direction = gradient.direction || "to right";
    if (type === "horizontal") {
      styles.background = `linear-gradient(${direction}, ${fromColor}, ${toColor})`;
    } else {
      styles.background = `linear-gradient(to bottom, ${fromColor}, ${toColor})`;
    }
  }
  return { ...styles, ...baseStyle };
};
const buildLineBackgroundColor = (color) => {
  if (color) {
    return resolveColor(color);
  }
  return "var(--w3f-gray-300)";
};
export {
  buildDynamicStyles,
  buildLineBackgroundColor,
  resolveColor
};
//# sourceMappingURL=Dividers.utils.js.map
