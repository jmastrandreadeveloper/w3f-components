import type { RatingSize } from './Rating.types';
export declare const RATING_CLASSES: {
    readonly wrapper: "w3f-rating-wrapper";
    readonly container: "w3f-rating-container";
    readonly sizes: Record<RatingSize, string>;
    readonly error: "w3f-rating-error";
    readonly disabled: "w3f-rating-disabled";
    readonly label: "w3f-rating-label";
    readonly required: "w3f-input-required";
    readonly item: "w3f-rating-item";
    readonly itemInteractive: "w3f-rating-interactive";
    readonly itemActive: "w3f-rating-active";
    readonly itemFocused: "w3f-rating-focused";
    readonly itemDisabled: "w3f-rating-item--disabled";
    readonly itemReadonly: "w3f-rating-item--readonly";
    readonly clearBtn: "w3f-rating-clear";
    readonly value: "w3f-rating-value";
    readonly message: "w3f-input-message";
    readonly messageError: "w3f-input-message--error";
    readonly messageHelper: "w3f-input-message--helper";
    readonly paddingX: "w3f-px-1";
};
export declare const RATING_DEFAULTS: {
    readonly defaultValue: 0;
    readonly max: 5;
    readonly readOnly: false;
    readonly disabled: false;
    readonly iconType: "star";
    readonly precision: 1;
    readonly size: RatingSize;
    readonly showValue: false;
    readonly allowClear: true;
    readonly required: false;
    readonly className: "";
    readonly unstyled: false;
};
export declare const RATING_VARIANT_CLASSES: Record<string, string>;
export declare const RATING_ICON_SIZES: Record<RatingSize, number>;
//# sourceMappingURL=Rating.constants.d.ts.map