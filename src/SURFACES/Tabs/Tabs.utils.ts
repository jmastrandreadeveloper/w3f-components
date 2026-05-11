import type { TabsColorScheme, TabsVariant } from './Tabs.types';
import { TABS_CLASSES } from './Tabs.constants';

export function buildTabsLayoutClass(vertical: boolean): string {
    return [
        TABS_CLASSES.layout,
        vertical ? TABS_CLASSES.vertical : TABS_CLASSES.horizontal,
    ].filter(Boolean).join(' ');
}

export function buildTabsContainerClass(
    className?: string,
    unstyled?: boolean,
): string {
    return [
        TABS_CLASSES.container,
        unstyled && 'w3f-tabs--unstyled',
        className,
    ].filter(Boolean).join(' ');
}

export function buildTabsListClass(
    variant: TabsVariant,
    colorScheme: TabsColorScheme,
    unstyled?: boolean,
): string {
    if (unstyled) {
        return TABS_CLASSES.list;
    }
    return [
        TABS_CLASSES.list,
        `w3f-tabs-${variant}`,
        `w3f-tabs-color-${colorScheme}`,
    ].filter(Boolean).join(' ');
}

export function buildTabsItemClass(
    isActive: boolean,
    highlightActiveTab: boolean,
): string {
    return [
        TABS_CLASSES.item,
        isActive && TABS_CLASSES.itemActive,
        isActive && highlightActiveTab && TABS_CLASSES.itemHighlight,
    ]
        .filter(Boolean)
        .join(' ');
}
