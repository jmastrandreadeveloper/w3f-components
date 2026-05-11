import React, { forwardRef } from 'react';
import Button from '../../INPUTS/Button/Button';
import type {
    AccordionProps,
    AccordionItemProps,
    AccordionSummaryProps,
    AccordionDetailsProps,
    AccordionActionsProps,
} from './Accordion.types';
import {
    ACCORDION_DEFAULTS,
    ACCORDION_ITEM_DEFAULTS,
    ACCORDION_SUMMARY_DEFAULTS,
    ACCORDION_CLASSES,
    ACCORDION_SUMMARY_STYLE,
} from './Accordion.constants';
import {
    buildAccordionClasses,
    buildAccordionItemClasses,
    buildContentContainerClasses,
} from './Accordion.utils';
import { useAccordionState } from './Accordion.hooks';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionDetails
// ─────────────────────────────────────────────────────────────────────────────

export const AccordionDetails: React.FC<AccordionDetailsProps> = ({
    children,
    className = '',
}) => (
    <div className={[ACCORDION_CLASSES.details, className].filter(Boolean).join(' ')}>
        {children}
    </div>
);

AccordionDetails.displayName = 'AccordionDetails';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionActions
// ─────────────────────────────────────────────────────────────────────────────

export const AccordionActions: React.FC<AccordionActionsProps> = ({
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
        <div className={[ACCORDION_CLASSES.actions, className].filter(Boolean).join(' ')}>
            {childrenWithProps}
        </div>
    );
};

AccordionActions.displayName = 'AccordionActions';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionSummary
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

export const AccordionSummary: React.FC<AccordionSummaryProps> = ({
    children,
    isExpanded = false,
    togglePanel,
    disabled = ACCORDION_SUMMARY_DEFAULTS.disabled,
    icon,
    className = ACCORDION_SUMMARY_DEFAULTS.className,
}) => (
    <Button
        variant="text"
        fullWidth
        className={[ACCORDION_CLASSES.summary, className].filter(Boolean).join(' ')}
        onClick={togglePanel}
        aria-expanded={isExpanded}
        disabled={disabled}
        type="button"
        style={ACCORDION_SUMMARY_STYLE}
    >
        <span className={ACCORDION_CLASSES.icon}>{icon || defaultChevronIcon}</span>
        <span className={ACCORDION_CLASSES.flexGrow}>{children}</span>
    </Button>
);

AccordionSummary.displayName = 'AccordionSummary';

// ─────────────────────────────────────────────────────────────────────────────
// AccordionItem
// ─────────────────────────────────────────────────────────────────────────────

export const AccordionItem: React.FC<AccordionItemProps> = ({
    id,
    children,
    isExpanded = false,
    togglePanel,
    closePanel,
    disabled = ACCORDION_ITEM_DEFAULTS.disabled,
    color = ACCORDION_ITEM_DEFAULTS.color,
    className = ACCORDION_ITEM_DEFAULTS.className,
}) => {
    const childArray = React.Children.toArray(children);

    const summary = childArray.find(
        (child) => React.isValidElement(child) && child.type === AccordionSummary,
    );
    const details = childArray.find(
        (child) => React.isValidElement(child) && child.type === AccordionDetails,
    );
    const actions = childArray.find(
        (child) => React.isValidElement(child) && child.type === AccordionActions,
    );

    const itemCls = buildAccordionItemClasses(disabled, color, className);
    const contentCls = buildContentContainerClasses(isExpanded);

    const summaryWithProps = summary
        ? React.cloneElement(
              summary as React.ReactElement<AccordionSummaryProps>,
              { isExpanded, togglePanel, id, disabled },
          )
        : null;

    const actionsWithProps = actions
        ? React.cloneElement(
              actions as React.ReactElement<AccordionActionsProps>,
              { closePanel },
          )
        : null;

    return (
        <div className={itemCls}>
            {summaryWithProps}
            <div className={contentCls}>
                <div className={ACCORDION_CLASSES.contentWrapper}>
                    {details}
                    {actionsWithProps}
                </div>
            </div>
        </div>
    );
};

AccordionItem.displayName = 'AccordionItem';

// ─────────────────────────────────────────────────────────────────────────────
// Accordion (contenedor principal)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Accordion Component - W3F Framework
 *
 * Sistema de acordeón con soporte para expansión única o múltiple.
 * Compatible con Form y LiveForm en AccordionDetails.
 *
 * @example
 * <Accordion>
 *   <AccordionItem id="panel1">
 *     <AccordionSummary>¿Qué es el framework?</AccordionSummary>
 *     <AccordionDetails><p>Contenido aquí</p></AccordionDetails>
 *   </AccordionItem>
 * </Accordion>
 *
 * @example
 * // Con formulario integrado
 * <Accordion variant="elevated">
 *   <AccordionItem id="form-panel" color="primary">
 *     <AccordionSummary>Agregar usuario</AccordionSummary>
 *     <AccordionDetails>
 *       <Form initialValues={{ name: '' }} onSubmit={handleSubmit}>
 *         <Input name="name" label="Nombre" />
 *         <Button type="submit">Guardar</Button>
 *       </Form>
 *     </AccordionDetails>
 *     <AccordionActions>
 *       <Button variant="outlined">Cerrar</Button>
 *     </AccordionActions>
 *   </AccordionItem>
 * </Accordion>
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
    children,
    multiple = ACCORDION_DEFAULTS.multiple,
    variant = ACCORDION_DEFAULTS.variant,
    size = ACCORDION_DEFAULTS.size,
    unstyled = ACCORDION_DEFAULTS.unstyled,
    className = ACCORDION_DEFAULTS.className,
}, ref) => {
    const { togglePanel, closePanel, isExpanded } = useAccordionState(multiple);

    const cls = buildAccordionClasses(variant, size, className, unstyled);

    const accordionItems = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
            const childProps = child.props as AccordionItemProps;
            const id = childProps.id;
            return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
                isExpanded: isExpanded(id),
                togglePanel: () => togglePanel(id),
                closePanel: () => closePanel(id),
            });
        }
        return child;
    });

    return <div ref={ref} className={cls}>{accordionItems}</div>;
});

Accordion.displayName = 'Accordion';

export default Accordion;
