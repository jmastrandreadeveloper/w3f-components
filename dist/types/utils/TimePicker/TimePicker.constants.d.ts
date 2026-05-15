export declare const TP_CLASSES: {
    readonly root: "w3f-timepicker";
    readonly inputWrapper: "w3f-timepicker-input-wrapper";
    readonly input: "w3f-timepicker-input";
    readonly inputIcon: "w3f-timepicker-input-icon";
    readonly dropdown: "w3f-timepicker-dropdown";
    readonly panel: "w3f-timepicker-panel";
    readonly display: "w3f-timepicker-display";
    readonly displayTime: "w3f-timepicker-display-time";
    readonly displayAmpm: "w3f-timepicker-display-ampm";
    readonly wheels: "w3f-timepicker-wheels";
    readonly separator: "w3f-timepicker-separator";
    readonly column: "w3f-timepicker-column";
    readonly columnLabel: "w3f-timepicker-column-label";
    readonly scroll: "w3f-timepicker-scroll";
    readonly item: "w3f-timepicker-item";
    readonly itemSelected: "w3f-timepicker-item--selected";
    readonly ampm: "w3f-timepicker-ampm";
    readonly ampmBtn: "w3f-timepicker-ampm-btn";
    readonly ampmBtnActive: "w3f-timepicker-ampm-btn--active";
    readonly stepBtn: "w3f-timepicker-step-btn";
    readonly actions: "w3f-timepicker-actions";
    readonly inline: "w3f-timepicker-inline";
    readonly output: "w3f-timepicker-output";
};
export declare const TP_MINUTE_STEPS: readonly [1, 5, 10, 15, 30];
export declare const TP_SECOND_STEPS: readonly [1, 5, 10, 15, 30];
/** Generate array [0, step, 2*step, ... ≤ max] */
export declare function generateRange(max: number, step: number): number[];
export declare const HOURS_24: number[];
export declare const HOURS_12: number[];
export declare const ALL_MINUTES: number[];
export declare const ALL_SECONDS: number[];
//# sourceMappingURL=TimePicker.constants.d.ts.map