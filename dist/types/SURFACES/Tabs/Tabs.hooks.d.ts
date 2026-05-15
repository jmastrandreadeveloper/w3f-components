import type { TabItem } from './Tabs.types';
export interface UseTabsStateReturn {
    tabs: TabItem[];
    activeTabId: string | null;
    handleTabClick: (tabId: string) => void;
    handleCloseTab: (tabId: string, e: React.MouseEvent) => void;
}
export declare function useTabsState(initialTabsContent: TabItem[], currentTabId: string | undefined, onTabChange: ((id: string | null) => void) | undefined): UseTabsStateReturn;
//# sourceMappingURL=Tabs.hooks.d.ts.map