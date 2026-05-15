import { TABS_CLASSES } from "./Tabs.constants";
function buildTabsLayoutClass(vertical) {
  return [
    TABS_CLASSES.layout,
    vertical ? TABS_CLASSES.vertical : TABS_CLASSES.horizontal
  ].filter(Boolean).join(" ");
}
function buildTabsContainerClass(className, unstyled) {
  return [
    TABS_CLASSES.container,
    unstyled && "w3f-tabs--unstyled",
    className
  ].filter(Boolean).join(" ");
}
function buildTabsListClass(variant, colorScheme, unstyled) {
  if (unstyled) {
    return TABS_CLASSES.list;
  }
  return [
    TABS_CLASSES.list,
    `w3f-tabs-${variant}`,
    `w3f-tabs-color-${colorScheme}`
  ].filter(Boolean).join(" ");
}
function buildTabsItemClass(isActive, highlightActiveTab) {
  return [
    TABS_CLASSES.item,
    isActive && TABS_CLASSES.itemActive,
    isActive && highlightActiveTab && TABS_CLASSES.itemHighlight
  ].filter(Boolean).join(" ");
}
export {
  buildTabsContainerClass,
  buildTabsItemClass,
  buildTabsLayoutClass,
  buildTabsListClass
};
//# sourceMappingURL=Tabs.utils.js.map
