import React, { forwardRef, useRef, useCallback, useEffect, useState } from 'react';
import Button from '../../INPUTS/Button/Button';
import type { ContextMenuProps, ContextMenuItemProps, ContextMenuNavigationData } from './ContextMenu.types';
import { CONTEXT_MENU_CLASSES, CONTEXT_MENU_DEFAULTS, SUBMENU_CLOSE_DELAY } from './ContextMenu.constants';
import { calculateMenuPosition, calculateSubmenuPosition, buildContextMenuClasses } from './ContextMenu.utils';
import { useContextMenu } from './ContextMenu.hooks';

// ─────────────────────────────────────────────────────────────────────────────
// ContextMenuItem
// ─────────────────────────────────────────────────────────────────────────────

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
    item,
    onClose,
    onSelect,
    level = 0,
    path = [],
}) => {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [submenuPos, setSubmenuPos] = useState<{ left: string; top: number }>({
        left: '100%',
        top: 0,
    });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

    const recalcSubmenu = useCallback(() => {
        if (!itemRef.current || !hasSubItems) return;
        const rect = itemRef.current.getBoundingClientRect();
        const pos = calculateSubmenuPosition(rect, (item.subItems?.length ?? 0));
        setSubmenuPos(pos);
    }, [hasSubItems, item.subItems]);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (hasSubItems) {
            setShowSubmenu(true);
            setTimeout(recalcSubmenu, 0);
        }
    };

    const handleMouseLeave = () => {
        if (hasSubItems) {
            timeoutRef.current = setTimeout(() => setShowSubmenu(false), SUBMENU_CLOSE_DELAY);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasSubItems) {
            setShowSubmenu((prev) => !prev);
            recalcSubmenu();
        } else {
            const navData: ContextMenuNavigationData = {
                timestamp: new Date().toISOString(),
                selectedItem: {
                    label: item.label,
                    link: item.link ?? null,
                    hasSubItems: false,
                },
                navigationPath: path,
                level,
            };
            if (onSelect) onSelect(navData);
            if (item.onClick) item.onClick(navData);
            onClose();
        }
    };

    useEffect(() => {
        if (showSubmenu && hasSubItems) recalcSubmenu();
    }, [showSubmenu, hasSubItems, recalcSubmenu]);

    return (
        <div
            ref={itemRef}
            className={[
                CONTEXT_MENU_CLASSES.item,
                showSubmenu && CONTEXT_MENU_CLASSES.isActive,
            ]
                .filter(Boolean)
                .join(' ')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
        >
            <Button
                className={[
                    CONTEXT_MENU_CLASSES.button,
                    hasSubItems
                        ? CONTEXT_MENU_CLASSES.buttonParent
                        : CONTEXT_MENU_CLASSES.buttonLeaf,
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={handleClick}
                variant="text"
                style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    justifyContent: 'flex-start',
                    padding: '8px 12px',
                    height: 'auto',
                    textTransform: 'none',
                }}
            >
                <span className={CONTEXT_MENU_CLASSES.label} style={{ flex: 1 }}>
                    {item.label}
                </span>
                {hasSubItems && (
                    <span className={CONTEXT_MENU_CLASSES.arrow}>▸</span>
                )}
            </Button>

            {hasSubItems && showSubmenu && (
                <div
                    className={CONTEXT_MENU_CLASSES.submenu}
                    style={{
                        display: 'block',
                        position: 'absolute',
                        left: submenuPos.left,
                        top: submenuPos.top,
                        overflow: 'visible',
                    }}
                >
                    {item.subItems!.map((subItem, index) => (
                        <ContextMenuItem
                            key={subItem.id ?? index}
                            item={subItem}
                            onClose={onClose}
                            onSelect={onSelect}
                            level={level + 1}
                            path={[...path, index]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

ContextMenuItem.displayName = 'ContextMenuItem';

// ─────────────────────────────────────────────────────────────────────────────
// ContextMenu
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ContextMenu Component - W3F Framework
 *
 * Menú contextual que se activa con clic derecho sobre el área contenida.
 * Soporta submenús multinivel y navegación por teclado (Escape).
 *
 * @example
 * <ContextMenu
 *   items={[
 *     { label: 'Copiar', onClick: handleCopy },
 *     { label: 'Pegar', onClick: handlePaste },
 *     { label: 'Más', subItems: [{ label: 'Opción A' }] },
 *   ]}
 *   onMenuAction={console.log}
 * >
 *   <div>Haz clic derecho aquí</div>
 * </ContextMenu>
 */
export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(({
    children,
    items,
    onMenuAction,
    unstyled = CONTEXT_MENU_DEFAULTS.unstyled,
    className = CONTEXT_MENU_DEFAULTS.className,
}, ref) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { menuState, menuRef, showMenu, hideMenu } = useContextMenu(wrapperRef);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        // Use viewport coordinates directly — the dropdown uses position:fixed
        // so it ignores any overflow:hidden on ancestor containers.
        const pos = calculateMenuPosition(e.clientX, e.clientY);
        showMenu(pos.x, pos.y);
    };

    return (
        <div ref={(node) => {
            (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }} onContextMenu={handleContextMenu} className={buildContextMenuClasses(className, unstyled)} style={{ position: 'relative' }}>
            {children}
            {menuState.visible && (
                <div
                    ref={menuRef}
                    className={CONTEXT_MENU_CLASSES.dropdown}
                    style={{ position: 'fixed', left: menuState.x, top: menuState.y }}
                >
                    {items.map((item, index) => (
                        <ContextMenuItem
                            key={item.id ?? index}
                            item={item}
                            onClose={hideMenu}
                            onSelect={onMenuAction}
                            path={[index]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
