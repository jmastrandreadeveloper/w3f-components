function buildMarqueeClasses(direction, pauseOnHover, unstyled, className) {
  const base = "w3f-marquee";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  const classes = [base];
  const isVertical = direction === "up" || direction === "down";
  classes.push(isVertical ? "w3f-marquee--vertical" : "w3f-marquee--horizontal");
  if (pauseOnHover) classes.push("w3f-marquee--pause-hover");
  if (className) classes.push(className);
  return classes.join(" ");
}
function buildTrackClasses(direction) {
  const classes = ["w3f-marquee__track"];
  switch (direction) {
    case "left":
      classes.push("w3f-marquee__track--left");
      break;
    case "right":
      classes.push("w3f-marquee__track--right");
      break;
    case "up":
      classes.push("w3f-marquee__track--up");
      break;
    case "down":
      classes.push("w3f-marquee__track--down");
      break;
  }
  return classes.join(" ");
}
function buildFadeMask(direction, fadeEdge) {
  if (fadeEdge <= 0) return void 0;
  const isVertical = direction === "up" || direction === "down";
  const axis = isVertical ? "to bottom" : "to right";
  return `linear-gradient(${axis}, transparent, black ${fadeEdge}px, black calc(100% - ${fadeEdge}px), transparent)`;
}
export {
  buildFadeMask,
  buildMarqueeClasses,
  buildTrackClasses
};
//# sourceMappingURL=Marquee.utils.js.map
