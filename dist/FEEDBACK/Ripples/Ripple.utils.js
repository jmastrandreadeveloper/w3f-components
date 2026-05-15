function buildRippleClasses(flat, disabled, className) {
  return [
    "w3f-ripple-container",
    flat && "w3f-ripple-flat",
    className
  ].filter(Boolean).join(" ");
}
function calculateRippleDimensions(rect, x, y, centered, radius) {
  let diameter;
  if (radius) {
    diameter = radius * 2;
  } else {
    diameter = Math.max(rect.width, rect.height);
  }
  const half = diameter / 2;
  let left;
  let top;
  if (centered) {
    left = (rect.width - diameter) / 2;
    top = (rect.height - diameter) / 2;
  } else {
    left = x - rect.left - half;
    top = y - rect.top - half;
  }
  return {
    width: diameter,
    height: diameter,
    left,
    top
  };
}
export {
  buildRippleClasses,
  calculateRippleDimensions
};
//# sourceMappingURL=Ripple.utils.js.map
