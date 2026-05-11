export const TRANSFER_CLASSES = {
    root: 'w3f-transfer',
    disabled: 'w3f-transfer-disabled',
    panel: 'w3f-transfer-panel',
    panelHeader: 'w3f-transfer-panel-header',
    panelTitle: 'w3f-transfer-panel-title',
    panelCount: 'w3f-transfer-panel-count',
    panelDropTarget: 'w3f-transfer-panel-drop-target',
    search: 'w3f-transfer-search',
    searchIcon: 'w3f-transfer-search-icon',
    searchInput: 'w3f-transfer-search-input',
    list: 'w3f-transfer-list',
    empty: 'w3f-transfer-empty',
    item: 'w3f-transfer-item',
    itemSelected: 'w3f-transfer-item-selected',
    itemDisabled: 'w3f-transfer-item-disabled',
    itemDragging: 'w3f-transfer-item-dragging',
    itemContent: 'w3f-transfer-item-content',
    itemLabel: 'w3f-transfer-item-label',
    itemDescription: 'w3f-transfer-item-description',
    actions: 'w3f-transfer-actions',
    btn: 'w3f-transfer-btn',
    dragGhost: 'w3f-transfer-drag-ghost',
    dropIndicator: 'w3f-transfer-drop-indicator',
    draggingBody: 'w3f-transfer-dragging',
} as const;

export const DRAG_DEAD_ZONE = 5;

export const TRANSFER_LIST_DEFAULTS = {
    sourceTitle: 'Disponibles',
    targetTitle: 'Seleccionados',
    enableSearch: true,
    height: '360px',
    disabled: false,
    className: '',
    unstyled: false as const,
} as const;
