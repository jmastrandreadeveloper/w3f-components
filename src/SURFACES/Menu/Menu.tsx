import React, { forwardRef, useState, useEffect } from 'react';
import Button from '../../INPUTS/Button/Button';
import type { MenuBarCategoryProps, MenuItemProps } from './Menu.types';
import { MENU_CLASSES, MENU_BAR_CATEGORY_DEFAULTS } from './Menu.constants';
import { buildDropdownClasses, buildMenuClasses } from './Menu.utils';
import { useMenuOpen, useMenuItemSubmenu } from './Menu.hooks';

// ─────────────────────────────────────────────────────────────────────────────
// MenuItem
// ─────────────────────────────────────────────────────────────────────────────

export const MenuItem: React.FC<MenuItemProps> = ({ item, onClose, onSelect }) => {
    const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
    const { showSubmenu, setShowSubmenu, handleMouseEnter, handleMouseLeave } =
        useMenuItemSubmenu();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasSubItems) {
            setShowSubmenu((prev) => !prev);
        } else {
            if (onSelect) onSelect(item.label);
            if (item.onClick) item.onClick(item.label);
            onClose();
        }
    };

    return (
        <div
            className={[MENU_CLASSES.item, showSubmenu && MENU_CLASSES.isActive]
                .filter(Boolean)
                .join(' ')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
        >
            <Button
                className={[
                    MENU_CLASSES.button,
                    hasSubItems ? MENU_CLASSES.buttonParent : MENU_CLASSES.buttonLeaf,
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={handleClick}
                variant="none"
            >
                <span className={MENU_CLASSES.label}>{item.label}</span>
                {hasSubItems && <span className={MENU_CLASSES.arrow}>▸</span>}
            </Button>

            {hasSubItems && showSubmenu && (
                <div
                    className={MENU_CLASSES.submenu}
                    style={{
                        display: 'block',
                        position: 'absolute',
                        left: '100%',
                        top: 0,
                        overflow: 'visible',
                    }}
                >
                    {item.subItems!.map((subItem, index) => (
                        <MenuItem
                            key={subItem.id ?? index}
                            item={subItem}
                            onClose={onClose}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

MenuItem.displayName = 'MenuItem';

// ─────────────────────────────────────────────────────────────────────────────
// MenuBarCategory
// ─────────────────────────────────────────────────────────────────────────────

/**
 * MenuBarCategory Component - W3F Framework
 *
 * Categoría de barra de menú con desplegable y soporte para submenús multinivel.
 *
 * @example
 * <MenuBarCategory
 *   label="Archivo"
 *   items={[
 *     { label: 'Nuevo', onClick: handleNew },
 *     { label: 'Abrir', onClick: handleOpen },
 *     { label: 'Exportar', subItems: [{ label: 'PDF' }, { label: 'PNG' }] },
 *   ]}
 *   onSelect={console.log}
 * />
 */
export const MenuBarCategory = forwardRef<HTMLDivElement, MenuBarCategoryProps>(({
    label,
    items,
    onSelect,
    position = MENU_BAR_CATEGORY_DEFAULTS.position,
    unstyled = MENU_BAR_CATEGORY_DEFAULTS.unstyled,
}, ref) => {
    const { isOpen, toggle, close, containerRef } = useMenuOpen();
    const dropdownCls = buildDropdownClasses(position);
    const containerCls = buildMenuClasses(position, undefined, unstyled);

    // Compute anchor rect when menu opens so the dropdown can use position:fixed,
    // which escapes any overflow:hidden ancestor (panels, cards, etc.)
    const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        if (isOpen && containerRef.current) {
            setAnchorRect(containerRef.current.getBoundingClientRect());
        }
    }, [isOpen, containerRef]);

    // Min-width matches --w3f-menu-dropdown-min-width default (200px)
    const DROPDOWN_MIN_WIDTH = 200;

    const dropdownStyle: React.CSSProperties = isOpen && anchorRect ? {
        display: 'block',
        overflow: 'visible',
        position: 'fixed',
        top: position === 'top'
            ? anchorRect.top - 4
            : anchorRect.bottom + 4,
        left: position === 'right'
            ? Math.max(0, anchorRect.right - DROPDOWN_MIN_WIDTH)
            : position === 'center'
                ? anchorRect.left + anchorRect.width / 2
                : anchorRect.left,
        transform: position === 'center' ? 'translateX(-50%)' : undefined,
    } : { display: 'block', overflow: 'visible' };

    return (
        <div className={containerCls} ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}>
            <Button
                className={[MENU_CLASSES.trigger, isOpen && MENU_CLASSES.isActive]
                    .filter(Boolean)
                    .join(' ')}
                onClick={toggle}
                variant="none"
            >
                {label}
            </Button>

            {isOpen && (
                <div className={dropdownCls} style={dropdownStyle}>
                    {items.map((item, index) => (
                        <MenuItem
                            key={item.id ?? index}
                            item={item}
                            onClose={close}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

MenuBarCategory.displayName = 'MenuBarCategory';

export default MenuBarCategory;
