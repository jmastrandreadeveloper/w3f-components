import type { FormContextValue } from '../Form/Form.types';
/** @deprecated Use useFormDispatch + useFormFieldValue for better performance */
export declare const useRatingFormContext: () => FormContextValue | null;
export declare const useRatingFormDispatch: () => import("../Form/Form.types").FormDispatchValue | null;
export declare const useRatingFormMeta: () => import("../Form/Form.types").FormMetaValue | null;
export declare const useRatingFieldStore: () => import("../Form/Form.types").FormFieldStore | null;
export declare const useRatingHover: () => {
    hover: number;
    setHover: import("react").Dispatch<import("react").SetStateAction<number>>;
    focusedIndex: number;
    setFocusedIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
};
//# sourceMappingURL=Rating.hooks.d.ts.map