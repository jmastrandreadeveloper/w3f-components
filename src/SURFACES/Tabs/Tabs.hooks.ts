import { useState, useEffect } from 'react';
import type { TabItem } from './Tabs.types';

export interface UseTabsStateReturn {
    tabs: TabItem[];
    activeTabId: string | null;
    handleTabClick: (tabId: string) => void;
    handleCloseTab: (tabId: string, e: React.MouseEvent) => void;
}

export function useTabsState(
    initialTabsContent: TabItem[],
    currentTabId: string | undefined,
    onTabChange: ((id: string | null) => void) | undefined,
): UseTabsStateReturn {
    const [tabs, setTabs] = useState<TabItem[]>(initialTabsContent);
    const [internalActiveTab, setInternalActiveTab] = useState<string | null>(
        initialTabsContent[0]?.id ?? null,
    );

    const activeTabId = currentTabId !== undefined ? currentTabId : internalActiveTab;

    useEffect(() => {
        setTabs(initialTabsContent);
        if (currentTabId === undefined && initialTabsContent.length > 0) {
            setInternalActiveTab(initialTabsContent[0]?.id ?? null);
        }
    }, [initialTabsContent, currentTabId]);

    const handleTabClick = (tabId: string) => {
        if (onTabChange) {
            onTabChange(tabId);
        } else {
            setInternalActiveTab(tabId);
        }
    };

    const handleCloseTab = (tabIdToClose: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newTabs = tabs.filter((tab) => tab.id !== tabIdToClose);
        setTabs(newTabs);

        if (activeTabId === tabIdToClose) {
            const nextActiveTab = newTabs[0]?.id ?? null;
            if (onTabChange) {
                onTabChange(nextActiveTab);
            } else {
                setInternalActiveTab(nextActiveTab);
            }
        }
    };

    return { tabs, activeTabId: activeTabId ?? null, handleTabClick, handleCloseTab };
}
