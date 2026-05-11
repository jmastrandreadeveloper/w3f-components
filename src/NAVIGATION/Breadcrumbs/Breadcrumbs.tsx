import React, { forwardRef, useMemo, useCallback } from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import type { BreadcrumbsProps, BreadcrumbItemProps } from './Breadcrumbs.types';
import {
    BREADCRUMBS_DEFAULTS,
    BREADCRUMB_ITEM_DEFAULTS,
    BREADCRUMBS_CLASSES,
    ELLIPSIS_KEY,
} from './Breadcrumbs.constants';
import {
    buildBreadcrumbsClasses,
    buildBreadcrumbItemClasses,
    computeVisibleItems,
} from './Breadcrumbs.utils';
import { useBreadcrumbsExpand } from './Breadcrumbs.hooks';
import { sanitizeUrl } from '../../utils/sanitizeUrl';

// ─────────────────────────────────────────────────────────────────────────────
// BreadcrumbItem
// ─────────────────────────────────────────────────────────────────────────────

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
    href,
    icon,
    children,
    active = BREADCRUMB_ITEM_DEFAULTS.active,
    disabled = BREADCRUMB_ITEM_DEFAULTS.disabled,
    onClick,
    className = BREADCRUMB_ITEM_DEFAULTS.className,
    ...props
}) => {
    const cls = useMemo(
        () => buildBreadcrumbItemClasses(active, disabled, className),
        [active, disabled, className],
    );

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            if (disabled) {
                e.preventDefault();
                return;
            }
            if (onClick) onClick(e);
        },
        [disabled, onClick],
    );

    const content = (
        <>
            {icon && <span className={BREADCRUMBS_CLASSES.crumbIcon}>{icon}</span>}
            {children && <span className={BREADCRUMBS_CLASSES.crumbText}>{children}</span>}
        </>
    );

    if (active || (!href && !onClick)) {
        return (
            <span className={cls} aria-current={active ? 'page' : undefined} {...props}>
                {content}
            </span>
        );
    }

    return (
        <a className={cls} href={sanitizeUrl(href) || '#'} onClick={handleClick} {...props}>
            {content}
        </a>
    );
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumbs
// ─────────────────────────────────────────────────────────────────────────────

const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(({
    children,
    separator,
    maxItems = BREADCRUMBS_DEFAULTS.maxItems,
    itemsBeforeCollapse = BREADCRUMBS_DEFAULTS.itemsBeforeCollapse,
    itemsAfterCollapse = BREADCRUMBS_DEFAULTS.itemsAfterCollapse,
    expandText = BREADCRUMBS_DEFAULTS.expandText,
    color = BREADCRUMBS_DEFAULTS.color,
    size = BREADCRUMBS_DEFAULTS.size,
    variant,
    unstyled = BREADCRUMBS_DEFAULTS.unstyled,
    className = BREADCRUMBS_DEFAULTS.className,
    ...props
}, ref) => {
    const { expanded, expand } = useBreadcrumbsExpand();

    const items = useMemo(
        () => React.Children.toArray(children).filter(Boolean),
        [children],
    );

    const visibleItems = useMemo(
        () => computeVisibleItems(items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse),
        [items, expanded, maxItems, itemsBeforeCollapse, itemsAfterCollapse],
    );

    const separatorNode = separator || <ChevronRight size={14} />;

    const cls = useMemo(
        () => buildBreadcrumbsClasses(size, color, className, unstyled, variant),
        [size, color, className, unstyled, variant],
    );

    return (
        <nav ref={ref} className={cls} aria-label="breadcrumb" {...props}>
            <ol className={BREADCRUMBS_CLASSES.list}>
                {visibleItems.map((item, index) => {
                    const isLast = index === visibleItems.length - 1;

                    if (item === ELLIPSIS_KEY) {
                        return (
                            <li key="__ellipsis" className={BREADCRUMBS_CLASSES.item}>
                                <button
                                    className={BREADCRUMBS_CLASSES.expandBtn}
                                    onClick={expand}
                                    aria-label={expandText}
                                    title={expandText}
                                >
                                    <MoreHorizontal size={16} />
                                </button>
                                {!isLast && (
                                    <span className={BREADCRUMBS_CLASSES.separator} aria-hidden="true">
                                        {separatorNode}
                                    </span>
                                )}
                            </li>
                        );
                    }

                    const reactItem = item as React.ReactElement;
                    return (
                        <li
                            key={reactItem.key ?? index}
                            className={BREADCRUMBS_CLASSES.item}
                        >
                            {item}
                            {!isLast && (
                                <span
                                    className={BREADCRUMBS_CLASSES.separator}
                                    aria-hidden="true"
                                >
                                    {separatorNode}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
});

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs, BreadcrumbItem };
export default Breadcrumbs;
