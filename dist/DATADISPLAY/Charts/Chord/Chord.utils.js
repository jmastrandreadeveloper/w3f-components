import { CHORD_ROOT_CLASS } from "./Chord.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildChordClasses(className, unstyled) {
  return buildChartRootClasses(CHORD_ROOT_CLASS, className, unstyled);
}
function buildChordColors(count, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
function buildTooltipContent(source, target, value) {
  return `${source} \u2192 ${target}: ${value.toLocaleString()}`;
}
export {
  buildChordClasses,
  buildChordColors,
  buildTooltipContent
};
//# sourceMappingURL=Chord.utils.js.map
