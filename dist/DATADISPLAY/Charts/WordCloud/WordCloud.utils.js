import { WORDCLOUD_ROOT_CLASS } from "./WordCloud.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildWordCloudClasses(className, unstyled) {
  return buildChartRootClasses(WORDCLOUD_ROOT_CLASS, className, unstyled);
}
function buildWordCloudColors(count, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
function buildTooltipContent(datum) {
  return `${datum.text}: ${datum.value.toLocaleString()}`;
}
export {
  buildTooltipContent,
  buildWordCloudClasses,
  buildWordCloudColors
};
//# sourceMappingURL=WordCloud.utils.js.map
