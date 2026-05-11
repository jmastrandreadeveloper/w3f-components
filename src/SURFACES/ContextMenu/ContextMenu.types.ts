import type React from 'react';

export interface ContextMenuItemData {
    id?: string | number;
    label: string;
    link?: string;
    onClick?: (data: ContextMenuNavigationData) => void;
    subItems?: ContextMenuItemData[];
    disabled?: boolean;
}

export interface ContextMenuNavigationData {
    timestamp: string;
    selectedItem: {
        label: string;
        link: string | null;
        hasSubItems: boolean;
    };
    navigationPath: number[];
    level: number;
}

export interface ContextMenuProps {
    children: React.ReactNode;
    items: ContextMenuItemData[];
    onMenuAction?: (data: ContextMenuNavigationData) => void;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
}

export interface ContextMenuItemProps {
    item: ContextMenuItemData;
    onClose: () => void;
    onSelect?: (data: ContextMenuNavigationData) => void;
    level?: number;
    path?: number[];
}
