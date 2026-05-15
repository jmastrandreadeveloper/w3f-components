import type { RadioGroupDirection } from './RadioButton.types';
export declare const RADIO_GROUP_DEFAULTS: {
    readonly defaultValue: "";
    readonly direction: "vertical";
    readonly showSelection: true;
    readonly required: false;
    readonly className: "";
    readonly unstyled: false;
};
export declare const RADIO_CLASSES: {
    readonly button: "radio-material";
    readonly buttonDisabled: "radio-disabled";
    readonly checkmark: "radio-checkmark";
    readonly spacingH: "w3f-mr-6";
    readonly spacingV: "w3f-mb-2";
    readonly group: "w3f-radio-group";
    readonly fieldset: "w3f-border w3f-border-gray-300 w3f-rounded-lg w3f-p-4";
    readonly legend: "w3f-text-base w3f-font-semibold w3f-text-gray-800 w3f-px-2";
    readonly legendRequired: "w3f-text-error w3f-ml-1";
    readonly radioContainer: Record<RadioGroupDirection, string>;
    readonly error: "w3f-mt-2 w3f-text-sm w3f-text-error w3f-px-4";
    readonly selectionPanel: "w3f-bg-primary w3f-text-white w3f-p-3 w3f-rounded-lg w3f-mt-3 w3f-mx-4 w3f-shadow-sm";
    readonly selectionText: "w3f-text-sm";
};
//# sourceMappingURL=RadioButton.constants.d.ts.map