import type React from 'react';
import type { AccordionColor, AccordionSize, AccordionVariant } from './Accordion.types';
export declare const ACCORDION_DEFAULTS: {
    readonly multiple: false;
    readonly variant: AccordionVariant;
    readonly size: AccordionSize;
    readonly unstyled: false;
    readonly className: "";
};
export declare const ACCORDION_ITEM_DEFAULTS: {
    readonly disabled: false;
    readonly color: AccordionColor | null;
    readonly className: "";
};
export declare const ACCORDION_SUMMARY_DEFAULTS: {
    readonly disabled: false;
    readonly className: "";
};
export declare const ACCORDION_CLASSES: {
    readonly container: "w3f-accordion";
    readonly outlined: "w3f-accordion-outlined";
    readonly borderless: "w3f-accordion-borderless";
    readonly elevated: "w3f-accordion-elevated";
    readonly sm: "w3f-accordion-sm";
    readonly lg: "w3f-accordion-lg";
    readonly item: "w3f-accordion-item";
    readonly itemDisabled: "w3f-accordion-item-disabled";
    readonly summary: "w3f-accordion-summary";
    readonly icon: "w3f-accordion-icon";
    readonly flexGrow: "w3f-flex-grow";
    readonly contentContainer: "w3f-accordion-content-container";
    readonly contentShow: "w3f-accordion-show";
    readonly contentWrapper: "w3f-accordion-content-wrapper";
    readonly details: "w3f-accordion-details";
    readonly actions: "w3f-accordion-actions";
};
export declare const ACCORDION_SUMMARY_STYLE: React.CSSProperties;
//# sourceMappingURL=Accordion.constants.d.ts.map