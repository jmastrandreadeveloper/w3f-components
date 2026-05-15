import type { SelectOptionOrGroup } from './Select.types';
export declare function isOptionGroup(item: SelectOptionOrGroup): item is Extract<SelectOptionOrGroup, {
    options: unknown[];
}>;
export declare function buildSelectClasses(hasLeading: boolean, hasTrailing: boolean, unstyled?: boolean, variant?: string): string;
export declare function buildLabelClasses(isFloating: boolean, showShifted: boolean): string;
export declare function hasSelectValue(value: string | string[] | undefined): boolean;
//# sourceMappingURL=Select.utils.d.ts.map