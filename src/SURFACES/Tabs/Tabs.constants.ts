import type React from 'react';
import type { TabsColorScheme, TabsVariant } from './Tabs.types';

export const TABS_DEFAULTS = {
    initialTabsContent: [] as const,
    closable: false,
    title: 'Pestañas',
    highlightActiveTab: false,
    vertical: false,
    variant: 'default' as TabsVariant,
    colorScheme: 'primary' as TabsColorScheme,
    unstyled: false,
} as const;

export const TABS_CLASSES = {
    container: 'w3f-tabs-container',
    titleEl: 'w3f-tabs-title',
    empty: 'w3f-tabs-empty',
    emptyIcon: 'w3f-tabs-empty-icon',
    emptyText: 'w3f-tabs-empty-text',
    layout: 'w3f-tabs-layout',
    horizontal: 'w3f-tabs-horizontal',
    vertical: 'w3f-tabs-vertical',
    list: 'w3f-tabs-list',
    item: 'w3f-tabs-item',
    itemActive: 'w3f-tabs-item-active',
    itemHighlight: 'w3f-tabs-item-highlight',
    itemText: 'w3f-tabs-item-text',
    closeBtn: 'w3f-tabs-close-btn',
    closeIcon: 'w3f-tabs-close-icon',
    content: 'w3f-tabs-content',
    panel: 'w3f-tabs-panel',
    panelTitle: 'w3f-tabs-panel-title',
    panelText: 'w3f-tabs-panel-text',
} as const;

// ─── Static inline styles (moved from render to module-level) ────────────────
export const TABS_CLOSE_BTN_STYLE: React.CSSProperties = {
    minWidth: 'auto',
    padding: '0.25rem',
    height: 'auto',
    marginLeft: '0.5rem',
};
