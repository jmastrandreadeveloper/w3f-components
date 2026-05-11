import React, { forwardRef } from 'react';
import type {
    AccordionHProps,
    AccordionHTextOrientation,
    AccordionItemHProps,
    AccordionSummaryHProps,
    AccordionDetailsHProps,
    AccordionActionsHProps,
} from './AccordionHorizontal.types';
import {
    ACCORDION_H_DEFAULTS,
    ACCORDION_H_ITEM_DEFAULTS,
    ACCORDION_H_SUMMARY_DEFAULTS,
    ACCORDION_H_CLASSES,
    ACCORDION_H_SPEED_MS,
    ACCORDION_H_EASING,
} from './AccordionHorizontal.constants';
import {
    buildAccordionHClasses,
    buildAccordionItemHClasses,
    buildAccordionHContentClasses,
} from './AccordionHorizontal.utils';
import { useAccordionState } from './AccordionHorizontal.hooks';

// ─────────────────────────────────────────────────────────────────────────────
// Icono chevron por defecto
// ─────────────────────────────────────────────────────────────────────────────

const defaultChevronIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// AccordionDetailsH
// ─────────────────────────────────────────────────────────────────────────────

export const AccordionDetailsH: React.FC<AccordionDetailsHProps> = ({
    children,
    className = '',
}) => (
    <div className={[ACCORDION_H_CLASSES.details, className].filter(Boolean).join(' ')}>
        {children}
    </div>
);

AccordionDetailsH.displayName = 'AccordionDetailsH';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionActionsH
// ─────────────────────────────────────────────────────────────────────────────

export const AccordionActionsH: React.FC<AccordionActionsHProps> = ({
    children,
    closePanel,
    className = '',
}) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const childProps = child.props as Record<string, unknown>;
        const childText = (childProps.children as string)?.toString().toLowerCase() || '';
        const childClass = (childProps.className as string) || '';

        if (
            childText.includes('cerrar') ||
            childText.includes('close') ||
            childClass.includes('close')
        ) {
            return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                onClick: (e: React.MouseEvent) => {
                    if (typeof childProps.onClick === 'function') childProps.onClick(e);
                    if (closePanel) closePanel();
                },
            });
        }
        return child;
    });

    return (
        <div className={[ACCORDION_H_CLASSES.actions, className].filter(Boolean).join(' ')}>
            {childrenWithProps}
        </div>
    );
};

AccordionActionsH.displayName = 'AccordionActionsH';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionSummaryH — tab vertical clickeable
// ─────────────────────────────────────────────────────────────────────────────

const ORIENTATION_CLASS: Record<AccordionHTextOrientation, string> = {
    upright: ACCORDION_H_CLASSES.summaryUpright,
    clockwise: ACCORDION_H_CLASSES.summaryCw,
    'counter-clockwise': ACCORDION_H_CLASSES.summaryCcw,
};

export const AccordionSummaryH: React.FC<AccordionSummaryHProps> = ({
    children,
    isExpanded = false,
    togglePanel,
    textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
    disabled = ACCORDION_H_SUMMARY_DEFAULTS.disabled,
    icon,
    className = ACCORDION_H_SUMMARY_DEFAULTS.className,
}) => (
    <button
        className={[
            ACCORDION_H_CLASSES.summary,
            ORIENTATION_CLASS[textOrientation],
            className,
        ].filter(Boolean).join(' ')}
        onClick={togglePanel}
        aria-expanded={isExpanded}
        disabled={disabled}
        type="button"
    >
        <span>{children}</span>
        <span className={ACCORDION_H_CLASSES.icon}>{icon ?? defaultChevronIcon}</span>
    </button>
);

AccordionSummaryH.displayName = 'AccordionSummaryH';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionItemH
// ─────────────────────────────────────────────────────────────────────────────

export const AccordionItemH: React.FC<AccordionItemHProps> = ({
    id,
    children,
    isExpanded = false,
    togglePanel,
    textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
    color = ACCORDION_H_ITEM_DEFAULTS.color,
    disabled = ACCORDION_H_ITEM_DEFAULTS.disabled,
    className = ACCORDION_H_ITEM_DEFAULTS.className,
}) => {
    const childArray = React.Children.toArray(children);

    const summary = childArray.find(
        (child) => React.isValidElement(child) && child.type === AccordionSummaryH,
    );
    const details = childArray.find(
        (child) => React.isValidElement(child) && child.type === AccordionDetailsH,
    );
    const actions = childArray.find(
        (child) => React.isValidElement(child) && child.type === AccordionActionsH,
    );

    const itemCls = buildAccordionItemHClasses(isExpanded, disabled, color, className);
    const contentCls = buildAccordionHContentClasses(isExpanded);

    const summaryWithProps = summary
        ? React.cloneElement(
              summary as React.ReactElement<AccordionSummaryHProps>,
              { isExpanded, togglePanel, id, disabled, textOrientation },
          )
        : null;

    return (
        <div className={itemCls}>
            {summaryWithProps}
            <div className={contentCls}>
                <div className={ACCORDION_H_CLASSES.contentWrapper}>
                    {details}
                    {actions}
                </div>
            </div>
        </div>
    );
};

AccordionItemH.displayName = 'AccordionItemH';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionHorizontal — contenedor principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * AccordionHorizontal Component - W3F Framework
 *
 * Variante horizontal del Accordion. Los paneles se expanden lateralmente
 * con el título en orientación vertical. En mobile, degrada a vertical.
 *
 * @example
 * <AccordionHorizontal variant="elevated" height="350px">
 *   <AccordionItemH id="panel1" color="primary">
 *     <AccordionSummaryH>Características</AccordionSummaryH>
 *     <AccordionDetailsH>
 *       <p>Contenido del panel</p>
 *     </AccordionDetailsH>
 *   </AccordionItemH>
 *   <AccordionItemH id="panel2" color="success">
 *     <AccordionSummaryH>Instalación</AccordionSummaryH>
 *     <AccordionDetailsH>
 *       <p>Pasos de instalación</p>
 *     </AccordionDetailsH>
 *   </AccordionItemH>
 * </AccordionHorizontal>
 */
export const AccordionHorizontal = forwardRef<HTMLDivElement, AccordionHProps>(({
    children,
    multiple = ACCORDION_H_DEFAULTS.multiple,
    variant = ACCORDION_H_DEFAULTS.variant,
    size = ACCORDION_H_DEFAULTS.size,
    height = ACCORDION_H_DEFAULTS.height,
    textOrientation = ACCORDION_H_DEFAULTS.textOrientation,
    speed = ACCORDION_H_DEFAULTS.speed,
    unstyled = ACCORDION_H_DEFAULTS.unstyled,
    className = ACCORDION_H_DEFAULTS.className,
}, ref) => {
    const { togglePanel, closePanel, isExpanded } = useAccordionState(multiple);

    const cls = buildAccordionHClasses(variant, size, className, unstyled);

    const accordionItems = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AccordionItemH) {
            const childProps = child.props as AccordionItemHProps;
            const id = childProps.id;
            return React.cloneElement(child as React.ReactElement<AccordionItemHProps>, {
                isExpanded: isExpanded(id),
                togglePanel: () => togglePanel(id),
                textOrientation,
            });
        }
        return child;
    });

    const heightValue = typeof height === 'number' ? `${height}px` : height;

    const durationMs = typeof speed === 'number'
        ? speed
        : ACCORDION_H_SPEED_MS[speed];
    const transitionValue = `${durationMs}ms ${ACCORDION_H_EASING}`;

    return (
        <div
            ref={ref}
            className={cls}
            style={{
                minHeight: heightValue,
                '--w3f-acch-transition': transitionValue,
                '--w3f-acch-transition-normal': transitionValue,
            } as React.CSSProperties}
        >
            {accordionItems}
        </div>
    );
});

AccordionHorizontal.displayName = 'AccordionHorizontal';

export default AccordionHorizontal;
