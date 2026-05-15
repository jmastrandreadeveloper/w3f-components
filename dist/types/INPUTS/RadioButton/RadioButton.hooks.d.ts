import type { FormContextValue } from '../Form/Form.types';
import type { RadioGroupContextValue } from './RadioButton.types';
export declare const RadioGroupContext: import("react").Context<RadioGroupContextValue | null>;
export declare const useRadioGroup: () => RadioGroupContextValue;
/** @deprecated Use useRadioFormDispatch + useFormFieldValue for better performance */
export declare const useRadioFormContext: () => FormContextValue | null;
export declare const useRadioFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useRadioFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useRadioFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
//# sourceMappingURL=RadioButton.hooks.d.ts.map