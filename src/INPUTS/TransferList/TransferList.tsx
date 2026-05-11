import React, { forwardRef, useRef, useCallback, useEffect } from 'react';
import { Search, ChevronsRight, ChevronRight, ChevronLeft, ChevronsLeft } from 'lucide-react';
import type { TransferListProps, TransferItem } from './TransferList.types';
import { TRANSFER_CLASSES, DRAG_DEAD_ZONE, TRANSFER_LIST_DEFAULTS } from './TransferList.constants';
import { getSelectAllState, buildItemClasses } from './TransferList.utils';
import { useTransferList } from './TransferList.hooks';
import { useBridgeBind } from '@w3f/bridge';

const TransferList = forwardRef<HTMLDivElement, TransferListProps>(({
    sourceItems = [],
    targetItems = [],
    onChange,
    sourceTitle = TRANSFER_LIST_DEFAULTS.sourceTitle,
    targetTitle = TRANSFER_LIST_DEFAULTS.targetTitle,
    enableSearch = TRANSFER_LIST_DEFAULTS.enableSearch,
    height = TRANSFER_LIST_DEFAULTS.height,
    disabled = TRANSFER_LIST_DEFAULTS.disabled,
    className = TRANSFER_LIST_DEFAULTS.className,
    unstyled = TRANSFER_LIST_DEFAULTS.unstyled,
    bindId,
}, ref) => {
    const dragRef = useRef<any>(null);
    const ghostRef = useRef<HTMLDivElement | null>(null);
    const dropIndicatorRef = useRef<HTMLDivElement | null>(null);
    const sourcePanelRef = useRef<HTMLDivElement>(null);
    const targetPanelRef = useRef<HTMLDivElement>(null);

    const { dispatch } = useBridgeBind({ bindId });

    const notify = useCallback(
        (src: TransferItem[], tgt: TransferItem[]) => {
            dispatch('change', { value: tgt.map((i) => i.label) as unknown as Record<string, unknown> });
            if (onChange) onChange(src, tgt);
        },
        [onChange, dispatch],
    );

    const {
        sourceList, setSourceList,
        targetList, setTargetList,
        sourceSelected, setSourceSelected,
        targetSelected, setTargetSelected,
        sourceFilter, setSourceFilter,
        targetFilter, setTargetFilter,
        filteredSource,
        filteredTarget,
        handleItemClick,
        handleCheckboxChange,
        handleSelectAll,
        moveSelectedToTarget,
        moveSelectedToSource,
        moveAllToTarget,
        moveAllToSource,
    } = useTransferList(sourceItems, targetItems, notify, disabled);

    // Sync from props
    useEffect(() => { setSourceList(sourceItems); }, [sourceItems]);
    useEffect(() => { setTargetList(targetItems); }, [targetItems]);

    const handleDragMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, item: TransferItem, side: 'source' | 'target') => {
            if (disabled || item.disabled) return;
            if (e.button !== 0) return;

            const startX = e.clientX;
            const startY = e.clientY;
            let isDragging = false;

            const selected = side === 'source' ? sourceSelected : targetSelected;
            const dragIds = selected.has(item.id) ? new Set(selected) : new Set([item.id]);
            const listFrom = side === 'source' ? sourceList : targetList;
            const dragItems = listFrom.filter((i) => dragIds.has(i.id));

            const onMouseMove = (moveEvent: MouseEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                if (!isDragging && Math.sqrt(dx * dx + dy * dy) < DRAG_DEAD_ZONE) return;

                if (!isDragging) {
                    isDragging = true;
                    dragRef.current = { item, side, dragItems, dragIds, dropTarget: null, dropIndex: -1 };
                    document.body.classList.add(TRANSFER_CLASSES.draggingBody);
                    dragIds.forEach((id) => {
                        const el = document.querySelector(`[data-transfer-id="${id}"]`);
                        if (el) el.classList.add(TRANSFER_CLASSES.itemDragging);
                    });

                    const ghost = document.createElement('div');
                    ghost.className = TRANSFER_CLASSES.dragGhost;
                    ghost.textContent =
                        dragItems.length > 1
                            ? `${dragItems[0].label} (+${dragItems.length - 1})`
                            : item.label;
                    document.body.appendChild(ghost);
                    ghostRef.current = ghost;

                    const indicator = document.createElement('div');
                    indicator.className = TRANSFER_CLASSES.dropIndicator;
                    indicator.style.display = 'none';
                    document.body.appendChild(indicator);
                    dropIndicatorRef.current = indicator;
                }

                if (ghostRef.current) {
                    ghostRef.current.style.left = `${moveEvent.clientX + 14}px`;
                    ghostRef.current.style.top = `${moveEvent.clientY - 12}px`;
                }

                const srcRect = sourcePanelRef.current?.getBoundingClientRect();
                const tgtRect = targetPanelRef.current?.getBoundingClientRect();
                let overPanel: 'source' | 'target' | null = null;

                if (srcRect && moveEvent.clientX >= srcRect.left && moveEvent.clientX <= srcRect.right &&
                    moveEvent.clientY >= srcRect.top && moveEvent.clientY <= srcRect.bottom) {
                    overPanel = 'source';
                } else if (tgtRect && moveEvent.clientX >= tgtRect.left && moveEvent.clientX <= tgtRect.right &&
                    moveEvent.clientY >= tgtRect.top && moveEvent.clientY <= tgtRect.bottom) {
                    overPanel = 'target';
                }

                sourcePanelRef.current?.classList.toggle(TRANSFER_CLASSES.panelDropTarget, overPanel === 'source');
                targetPanelRef.current?.classList.toggle(TRANSFER_CLASSES.panelDropTarget, overPanel === 'target');

                if (dragRef.current) {
                    dragRef.current.dropTarget = overPanel;
                    dragRef.current.dropIndex = -1;
                }

                if (overPanel && dropIndicatorRef.current) {
                    const panelRef = overPanel === 'source' ? sourcePanelRef : targetPanelRef;
                    const listEl = panelRef.current?.querySelector('.w3f-transfer-list');
                    if (listEl) {
                        const items = Array.from(listEl.querySelectorAll('.w3f-transfer-item'));
                        let closestEdge: { y: number; index: number } | null = null;
                        let closestDist = Infinity;

                        for (let idx = 0; idx <= items.length; idx++) {
                            let edgeY: number;
                            if (idx < items.length) {
                                edgeY = items[idx].getBoundingClientRect().top;
                            } else if (items.length > 0) {
                                edgeY = items[items.length - 1].getBoundingClientRect().bottom;
                            } else {
                                edgeY = listEl.getBoundingClientRect().top + 4;
                            }
                            const dist = Math.abs(moveEvent.clientY - edgeY);
                            if (dist < closestDist) {
                                closestDist = dist;
                                closestEdge = { y: edgeY, index: idx };
                            }
                        }

                        if (closestEdge && closestDist < 50) {
                            const listRect = listEl.getBoundingClientRect();
                            dropIndicatorRef.current.style.display = 'block';
                            dropIndicatorRef.current.style.left = `${listRect.left + 8}px`;
                            dropIndicatorRef.current.style.top = `${closestEdge.y - 1}px`;
                            dropIndicatorRef.current.style.width = `${listRect.width - 16}px`;
                            if (dragRef.current) dragRef.current.dropIndex = closestEdge.index;
                        } else {
                            dropIndicatorRef.current.style.display = 'none';
                        }
                    }
                } else if (dropIndicatorRef.current) {
                    dropIndicatorRef.current.style.display = 'none';
                }
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                if (isDragging && dragRef.current) {
                    const { side: fromSide, dragItems: movedItems, dragIds: movedIds, dropTarget, dropIndex } = dragRef.current;

                    document.body.classList.remove(TRANSFER_CLASSES.draggingBody);
                    movedIds.forEach((id: string | number) => {
                        const el = document.querySelector(`[data-transfer-id="${id}"]`);
                        if (el) el.classList.remove(TRANSFER_CLASSES.itemDragging);
                    });
                    sourcePanelRef.current?.classList.remove(TRANSFER_CLASSES.panelDropTarget);
                    targetPanelRef.current?.classList.remove(TRANSFER_CLASSES.panelDropTarget);
                    if (ghostRef.current) { ghostRef.current.remove(); ghostRef.current = null; }
                    if (dropIndicatorRef.current) { dropIndicatorRef.current.remove(); dropIndicatorRef.current = null; }

                    if (dropTarget && dropIndex >= 0) {
                        if (fromSide === dropTarget) {
                            const setList = fromSide === 'source' ? setSourceList : setTargetList;
                            setList((prev) => {
                                const remaining = prev.filter((i) => !movedIds.has(i.id));
                                const insertIdx = Math.min(dropIndex, remaining.length);
                                remaining.splice(insertIdx, 0, ...movedItems);
                                return [...remaining];
                            });
                        } else {
                            const fromList = fromSide === 'source' ? sourceList : targetList;
                            const toList = dropTarget === 'source' ? sourceList : targetList;
                            const newFrom = fromList.filter((i) => !movedIds.has(i.id));
                            const newTo = [...toList];
                            const insertIdx = Math.min(dropIndex, newTo.length);
                            newTo.splice(insertIdx, 0, ...movedItems);

                            if (fromSide === 'source') {
                                setSourceList(newFrom);
                                setTargetList(newTo);
                                setSourceSelected((prev) => {
                                    const next = new Set(prev);
                                    movedIds.forEach((id: string | number) => next.delete(id));
                                    return next;
                                });
                                notify(newFrom, newTo);
                            } else {
                                setTargetList(newFrom);
                                setSourceList(newTo);
                                setTargetSelected((prev) => {
                                    const next = new Set(prev);
                                    movedIds.forEach((id: string | number) => next.delete(id));
                                    return next;
                                });
                                notify(newTo, newFrom);
                            }
                        }
                    }
                    dragRef.current = null;
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        },
        [disabled, sourceList, targetList, sourceSelected, targetSelected, notify],
    );

    const renderPanel = (side: 'source' | 'target') => {
        const title = side === 'source' ? sourceTitle : targetTitle;
        const list = side === 'source' ? sourceList : targetList;
        const filtered = side === 'source' ? filteredSource : filteredTarget;
        const selected = side === 'source' ? sourceSelected : targetSelected;
        const filter = side === 'source' ? sourceFilter : targetFilter;
        const setFilter = side === 'source' ? setSourceFilter : setTargetFilter;
        const panelRef = side === 'source' ? sourcePanelRef : targetPanelRef;
        const selectAllState = getSelectAllState(filtered, selected);
        const heightVal = typeof height === 'number' ? `${height}px` : height;
        const heightStyle = heightVal !== '360px'
            ? { '--w3f-tl-height': heightVal } as React.CSSProperties
            : undefined;

        return (
            <div className={TRANSFER_CLASSES.panel} ref={panelRef} style={heightStyle}>
                <div className={TRANSFER_CLASSES.panelHeader}>
                    <input
                        type="checkbox"
                        checked={selectAllState.checked}
                        ref={(el) => {
                            if (el) el.indeterminate = selectAllState.indeterminate;
                        }}
                        onChange={() => handleSelectAll(side)}
                    />
                    <span className={TRANSFER_CLASSES.panelTitle}>{title}</span>
                    <span className={TRANSFER_CLASSES.panelCount}>
                        {selected.size > 0 ? `${selected.size}/` : ''}
                        {list.length}
                    </span>
                </div>

                {enableSearch && (
                    <div className={TRANSFER_CLASSES.search}>
                        <span className={TRANSFER_CLASSES.searchIcon}>
                            <Search size={14} />
                        </span>
                        <input
                            type="text"
                            className={TRANSFER_CLASSES.searchInput}
                            placeholder="Buscar..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                )}

                <div className={TRANSFER_CLASSES.list}>
                    {filtered.length === 0 ? (
                        <div className={TRANSFER_CLASSES.empty}>Sin elementos</div>
                    ) : (
                        filtered.map((item) => {
                            const isSelected = selected.has(item.id);
                            return (
                                <div
                                    key={item.id}
                                    className={buildItemClasses(isSelected, Boolean(item.disabled))}
                                    data-transfer-id={item.id}
                                    onClick={(e) =>
                                        !item.disabled && handleItemClick(e, item.id, side)
                                    }
                                    onMouseDown={(e) => handleDragMouseDown(e, item, side)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleCheckboxChange(item.id, side);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={item.disabled}
                                    />
                                    <div className={TRANSFER_CLASSES.itemContent}>
                                        <div className={TRANSFER_CLASSES.itemLabel}>
                                            {item.label}
                                        </div>
                                        {item.description && (
                                            <div className={TRANSFER_CLASSES.itemDescription}>
                                                {item.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        );
    };

    return (
        <div
            ref={ref}
            className={[TRANSFER_CLASSES.root, unstyled && 'w3f-transfer-list--unstyled', !unstyled && disabled && TRANSFER_CLASSES.disabled, className]
                .filter(Boolean)
                .join(' ')}
        >
            {renderPanel('source')}

            <div className={TRANSFER_CLASSES.actions}>
                <button
                    className={TRANSFER_CLASSES.btn}
                    onClick={moveAllToTarget}
                    disabled={disabled || sourceList.filter((i) => !i.disabled).length === 0}
                    title="Mover todos a la derecha"
                >
                    <ChevronsRight size={18} />
                </button>
                <button
                    className={TRANSFER_CLASSES.btn}
                    onClick={moveSelectedToTarget}
                    disabled={disabled || sourceSelected.size === 0}
                    title="Mover seleccionados a la derecha"
                >
                    <ChevronRight size={18} />
                </button>
                <button
                    className={TRANSFER_CLASSES.btn}
                    onClick={moveSelectedToSource}
                    disabled={disabled || targetSelected.size === 0}
                    title="Mover seleccionados a la izquierda"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    className={TRANSFER_CLASSES.btn}
                    onClick={moveAllToSource}
                    disabled={disabled || targetList.filter((i) => !i.disabled).length === 0}
                    title="Mover todos a la izquierda"
                >
                    <ChevronsLeft size={18} />
                </button>
            </div>

            {renderPanel('target')}
        </div>
    );
});

TransferList.displayName = 'TransferList';
export { TransferList };
export default TransferList;
