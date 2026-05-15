import type { AccordionHColor, AccordionHSize, AccordionHSpeed, AccordionHTextOrientation, AccordionHVariant } from './AccordionHorizontal.types';
export declare const ACCORDION_H_SPEED_MS: Record<AccordionHSpeed, number>;
export declare const ACCORDION_H_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
export declare const ACCORDION_H_DEFAULTS: {
    readonly multiple: false;
    readonly variant: AccordionHVariant;
    readonly size: AccordionHSize;
    readonly height: "400px";
    readonly textOrientation: AccordionHTextOrientation;
    readonly speed: AccordionHSpeed;
    readonly unstyled: false;
    readonly className: "";
};
export declare const ACCORDION_H_ITEM_DEFAULTS: {
    readonly disabled: false;
    readonly color: AccordionHColor | null;
    readonly className: "";
};
export declare const ACCORDION_H_SUMMARY_DEFAULTS: {
    readonly disabled: false;
    readonly className: "";
};
export declare const ACCORDION_H_CLASSES: {
    readonly container: "w3f-accordion-horizontal";
    readonly outlined: "w3f-accordion-h-outlined";
    readonly elevated: "w3f-accordion-elevated";
    readonly borderless: "w3f-accordion-borderless";
    readonly sm: "w3f-accordion-h-sm";
    readonly lg: "w3f-accordion-h-lg";
    readonly item: "w3f-accordion-item-horizontal";
    readonly itemExpanded: "w3f-accordion-expanded";
    readonly itemDisabled: "w3f-accordion-item-horizontal-disabled";
    readonly summary: "w3f-accordion-summary-horizontal";
    readonly summaryUpright: "w3f-accordion-summary-h-upright";
    readonly summaryCw: "w3f-accordion-summary-h-cw";
    readonly summaryCcw: "w3f-accordion-summary-h-ccw";
    readonly icon: "w3f-accordion-icon-horizontal";
    readonly contentContainer: "w3f-accordion-content-horizontal";
    readonly contentShow: "w3f-accordion-show";
    readonly contentWrapper: "w3f-accordion-content-wrapper-horizontal";
    readonly details: "w3f-accordion-details-horizontal";
    readonly actions: "w3f-accordion-actions-horizontal";
};
//# sourceMappingURL=AccordionHorizontal.constants.d.ts.map