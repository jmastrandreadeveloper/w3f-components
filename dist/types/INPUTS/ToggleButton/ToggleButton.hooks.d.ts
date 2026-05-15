import type { FormContextValue } from '../Form/Form.types';
import type { ToggleButtonGroupProps } from './ToggleButton.types';
/** @deprecated Use useToggleGroupFormDispatch for better performance */
export declare const useToggleGroupFormContext: () => FormContextValue | null;
export declare const useToggleGroupFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useToggleGroupFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useToggleGroupFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export declare const useToggleGroup: ({ name, value, onChange, exclusive, disabled, }: Pick<ToggleButtonGroupProps, "name" | "value" | "onChange" | "exclusive" | "disabled">) => {
    currentValue: any;
    groupError: string | undefined;
    handleToggleChange: (event: React.SyntheticEvent, buttonValue: string | number) => void;
};
//# sourceMappingURL=ToggleButton.hooks.d.ts.map