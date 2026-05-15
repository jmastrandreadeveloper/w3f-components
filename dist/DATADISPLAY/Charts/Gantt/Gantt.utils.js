import { GANTT_ROOT_CLASS } from "./Gantt.constants";
import { buildChartRootClasses, resolveColorScheme } from "../_base/utils";
function buildGanttClasses(className, unstyled) {
  return buildChartRootClasses(GANTT_ROOT_CLASS, className, unstyled);
}
function buildGanttColors(groups, colorScheme) {
  const palette = resolveColorScheme(colorScheme);
  const result = {};
  groups.forEach((g, i) => {
    result[g] = palette[i % palette.length];
  });
  return result;
}
function toDate(d) {
  if (d instanceof Date) return d;
  return new Date(d);
}
function formatDate(d) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate().toString().padStart(2, "0")}`;
}
function buildTooltipContent(task) {
  const start = formatDate(toDate(task.start));
  const end = formatDate(toDate(task.end));
  let text = `${task.label}: ${start} \u2013 ${end}`;
  if (task.progress != null) {
    text += ` (${Math.round(task.progress * 100)}%)`;
  }
  return text;
}
export {
  buildGanttClasses,
  buildGanttColors,
  buildTooltipContent,
  formatDate,
  toDate
};
//# sourceMappingURL=Gantt.utils.js.map
