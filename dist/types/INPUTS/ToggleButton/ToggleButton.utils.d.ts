import type { ToggleButtonColor, ToggleButtonSize, ToggleButtonOrientation } from './ToggleButton.types';
export declare function buildToggleButtonClasses(selected: boolean, color: ToggleButtonColor, size: ToggleButtonSize, fullWidth: boolean, disabled: boolean, className: string, unstyled?: boolean): string;
export declare function buildToggleGroupClasses(orientation: ToggleButtonOrientation, fullWidth: boolean, hasError: boolean, disabled: boolean, className: string): string;
export declare function isSelected(buttonValue: string | number, currentValue: string | number | (string | number)[] | null | undefined, exclusive: boolean): boolean;
export declare function computeNewValue(buttonValue: string | number, currentValue: string | number | (string | number)[] | null | undefined, exclusive: boolean): string | number | (string | number)[] | null;
//# sourceMappingURL=ToggleButton.utils.d.ts.map