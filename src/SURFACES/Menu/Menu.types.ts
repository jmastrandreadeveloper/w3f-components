export type MenuPosition = 'left' | 'right' | 'center' | 'top';

export interface MenuItemData {
    id?: string | number;
    label: string;
    subItems?: MenuItemData[];
    onClick?: (label: string) => void;
}

export interface MenuBarCategoryProps {
    label: string;
    items: MenuItemData[];
    onSelect?: (label: string) => void;
    position?: MenuPosition;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}

export interface MenuItemProps {
    item: MenuItemData;
    onClose: () => void;
    onSelect?: (label: string) => void;
}
