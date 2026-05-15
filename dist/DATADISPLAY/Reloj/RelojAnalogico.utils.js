const buildRelojClasses = (unstyled, className) => {
  const base = "w3f-clock-analog";
  if (unstyled) return [base, `${base}--unstyled`, className].filter(Boolean).join(" ");
  return [base, "w3f-position-container", className].filter(Boolean).join(" ");
};
const HAND_BASE_STYLE = {
  transformOrigin: "50% 100%"
};
const calculateAngles = (hours, minutes, seconds) => ({
  second: seconds / 60 * 360,
  minute: (minutes + seconds / 60) / 60 * 360,
  hour: hours % 12 / 12 * 360 + minutes / 60 * 30
});
const getVisibleNumbers = (showAllNumbers, numbersToShow) => {
  if (numbersToShow) return numbersToShow;
  if (showAllNumbers) return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return [12, 3, 6, 9];
};
const buildHourNumberStyle = (hourIndex, clockRadius) => {
  const angle = hourIndex * 30;
  const radians = (angle - 90) * (Math.PI / 180);
  const distance = clockRadius * 0.8;
  const x = Math.cos(radians) * distance;
  const y = Math.sin(radians) * distance;
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    color: "var(--w3f-on-surface)",
    userSelect: "none"
  };
};
const generateTics = (isHourTic, clockRadius) => {
  const totalTics = isHourTic ? 12 : 60;
  const ticColor = isHourTic ? "var(--w3f-clock-tic-hour-color)" : "var(--w3f-clock-tic-minute-color)";
  const ticLength = isHourTic ? clockRadius * 0.05 : clockRadius * 0.025;
  const ticWidth = isHourTic ? clockRadius * 0.015 : clockRadius * 5e-3;
  const marginFromEdge = clockRadius * 0.15;
  const ticDistanceFromCenter = clockRadius - marginFromEdge;
  const styles = [];
  for (let i = 0; i < totalTics; i++) {
    if (!isHourTic && i % 5 === 0) continue;
    const angle = i * (360 / totalTics);
    styles.push({
      position: "absolute",
      width: `${ticWidth}px`,
      height: `${ticLength}px`,
      backgroundColor: ticColor,
      left: "50%",
      top: "50%",
      transformOrigin: `50% ${-ticDistanceFromCenter + ticLength / 2}px`,
      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, ${-ticDistanceFromCenter + ticLength / 2}px)`
    });
  }
  return styles;
};
export {
  HAND_BASE_STYLE,
  buildHourNumberStyle,
  buildRelojClasses,
  calculateAngles,
  generateTics,
  getVisibleNumbers
};
//# sourceMappingURL=RelojAnalogico.utils.js.map
