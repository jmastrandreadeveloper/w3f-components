import type React from 'react';

export type TabsVariant = 'default' | 'pills' | 'underline';
export type TabsColorScheme =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

export interface TabItem {
    id: string;
    title: string;
    content: React.ReactNode | string;
}

export interface TabsProps {
    initialTabsContent?: TabItem[];
    /** Permite cerrar pestañas */
    closable?: boolean;
    title?: string;
    /** ID de la pestaña activa (modo controlado) */
    currentTabId?: string;
    /** Callback cuando cambia la pestaña activa */
    onTabChange?: (tabId: string | null) => void;
    highlightActiveTab?: boolean;
    /** Layout vertical (pestañas a la izquierda) */
    vertical?: boolean;
    variant?: TabsVariant;
    colorScheme?: TabsColorScheme;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
