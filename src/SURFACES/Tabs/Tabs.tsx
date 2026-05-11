import React, { forwardRef } from 'react';
import Button from '../../INPUTS/Button/Button';
import type { TabsProps } from './Tabs.types';
import { TABS_DEFAULTS, TABS_CLASSES, TABS_CLOSE_BTN_STYLE } from './Tabs.constants';
import { useTabsState } from './Tabs.hooks';
import {
    buildTabsContainerClass,
    buildTabsLayoutClass,
    buildTabsListClass,
    buildTabsItemClass,
} from './Tabs.utils';

// ─── Close icon ───────────────────────────────────────────────────────────────

const CloseIcon = () => (
    <svg
        className={TABS_CLASSES.closeIcon}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ width: '16px', height: '16px' }}
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const EmptyIcon = () => (
    <svg
        className={TABS_CLASSES.emptyIcon}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
    </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Tabs — Componente de pestañas con soporte para múltiples variantes,
 * disposición vertical, pestañas cerrables y modo controlado/no controlado.
 *
 * @example
 * <Tabs
 *   initialTabsContent={[
 *     { id: 'tab1', title: 'Inicio', content: <p>Hola</p> },
 *     { id: 'tab2', title: 'Perfil', content: 'Texto plano' },
 *   ]}
 *   variant="pills"
 *   colorScheme="primary"
 * />
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
    initialTabsContent = TABS_DEFAULTS.initialTabsContent as never[],
    closable = TABS_DEFAULTS.closable,
    title = TABS_DEFAULTS.title,
    currentTabId,
    onTabChange,
    highlightActiveTab = TABS_DEFAULTS.highlightActiveTab,
    vertical = TABS_DEFAULTS.vertical,
    variant = TABS_DEFAULTS.variant,
    colorScheme = TABS_DEFAULTS.colorScheme,
    unstyled = TABS_DEFAULTS.unstyled,
}, ref) => {
    const { tabs, activeTabId, handleTabClick, handleCloseTab } = useTabsState(
        initialTabsContent,
        currentTabId,
        onTabChange,
    );

    const containerCls = buildTabsContainerClass(undefined, unstyled);

    if (tabs.length === 0) {
        return (
            <div ref={ref} className={containerCls}>
                {title && <h3 className={TABS_CLASSES.titleEl}>{title}</h3>}
                <div className={TABS_CLASSES.empty}>
                    <EmptyIcon />
                    <p className={TABS_CLASSES.emptyText}>No hay pestañas abiertas</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={ref} className={containerCls} aria-label={title}>
            {title && <h3 className={TABS_CLASSES.titleEl}>{title}</h3>}

            <div className={buildTabsLayoutClass(vertical)}>
                <div className={buildTabsListClass(variant, colorScheme, unstyled)} role="tablist">
                    {tabs.map((tab) => {
                        const isActive = activeTabId === tab.id;

                        return (
                            <div
                                key={tab.id}
                                role="tab"
                                aria-controls={`panel-${tab.id}`}
                                aria-selected={isActive}
                                tabIndex={0}
                                className={buildTabsItemClass(isActive, highlightActiveTab)}
                                onClick={() => handleTabClick(tab.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleTabClick(tab.id);
                                    }
                                }}
                            >
                                <span className={TABS_CLASSES.itemText}>{tab.title}</span>
                                {closable && (
                                    <Button
                                        className={TABS_CLASSES.closeBtn}
                                        onClick={(e: React.MouseEvent) => handleCloseTab(tab.id, e)}
                                        aria-label={`Cerrar ${tab.title}`}
                                        type="button"
                                        variant="text"
                                        size="sm"
                                        style={TABS_CLOSE_BTN_STYLE}
                                        icon={<CloseIcon />}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={TABS_CLASSES.content}>
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            id={`panel-${tab.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${tab.id}`}
                            hidden={activeTabId !== tab.id}
                            className={TABS_CLASSES.panel}
                        >
                            {typeof tab.content === 'string' ? (
                                <>
                                    <h4 className={TABS_CLASSES.panelTitle}>{tab.title}</h4>
                                    <p className={TABS_CLASSES.panelText}>{tab.content}</p>
                                </>
                            ) : (
                                tab.content
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

Tabs.displayName = 'Tabs';

export default Tabs;
