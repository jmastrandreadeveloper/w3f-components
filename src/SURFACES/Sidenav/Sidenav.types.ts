export type SidenavVariant = 'default' | 'compact' | 'expanded' | 'light';

export interface TreeNodeData {
    id: string | number;
    name: string;
    icon?: string;
    iconId?: string;
    type?: 'folder' | 'file';
    children?: TreeNodeData[];
    [key: string]: unknown;
}

export interface SidenavProps {
    treeData: TreeNodeData[];
    loading?: boolean;
    error?: string | null;
    onNodeSelect?: (node: TreeNodeData) => void;
    variant?: SidenavVariant;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
}
