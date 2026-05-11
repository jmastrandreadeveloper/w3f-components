export const CONTEXT_MENU_CLASSES = {
    wrapper: 'w3f-context-menu-wrapper',
    dropdown: 'w3f-nested-menu-dropdown',
    item: 'w3f-nested-menu-item',
    button: 'w3f-nested-menu-button',
    buttonParent: 'w3f-nested-menu-button-parent',
    buttonLeaf: 'w3f-nested-menu-button-leaf',
    label: 'w3f-nested-menu-label',
    arrow: 'w3f-nested-menu-arrow',
    submenu: 'w3f-nested-menu-submenu',
    isActive: 'is-active',
} as const;

export const CONTEXT_MENU_DEFAULTS = {
    unstyled: false,
    className: '',
} as const;

export const CONTEXT_MENU_ITEM_DEFAULTS = {
    level: 0,
    path: [] as number[],
} as const;

export const SUBMENU_CLOSE_DELAY = 200;
export const MENU_WIDTH = 200;
