import { W3F_POSITION_CLASSES, VALID_DISPLAY_POSITIONS } from "./Display.constants";
function useDisplayStyles() {
  const containerClass = W3F_POSITION_CLASSES.CONTAINER;
  const itemClass = (pos) => {
    if (pos && VALID_DISPLAY_POSITIONS.includes(pos)) {
      return pos;
    }
    if (pos && pos !== "") {
      console.warn(
        `[DisplayContainer] Posici\xF3n no v\xE1lida: "${pos}". Las posiciones v\xE1lidas son: ${VALID_DISPLAY_POSITIONS.join(", ")}`
      );
    }
    return "";
  };
  return {
    containerClass,
    itemClass
  };
}
export {
  useDisplayStyles
};
//# sourceMappingURL=Display.hooks.js.map
