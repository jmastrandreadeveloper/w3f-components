import { useState, useEffect } from "react";
function useTabsState(initialTabsContent, currentTabId, onTabChange) {
  const [tabs, setTabs] = useState(initialTabsContent);
  const [internalActiveTab, setInternalActiveTab] = useState(
    initialTabsContent[0]?.id ?? null
  );
  const activeTabId = currentTabId !== void 0 ? currentTabId : internalActiveTab;
  useEffect(() => {
    setTabs(initialTabsContent);
    if (currentTabId === void 0 && initialTabsContent.length > 0) {
      setInternalActiveTab(initialTabsContent[0]?.id ?? null);
    }
  }, [initialTabsContent, currentTabId]);
  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };
  const handleCloseTab = (tabIdToClose, e) => {
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
export {
  useTabsState
};
//# sourceMappingURL=Tabs.hooks.js.map
