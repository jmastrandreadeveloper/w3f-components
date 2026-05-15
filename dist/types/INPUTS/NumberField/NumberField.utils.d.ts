import type { NumberFieldSize } from './NumberField.types';
export declare function roundToPrecision(num: number, precision?: number): number;
export declare function clampValue(num: number, min: number, max: number, precision?: number): number;
export declare function isValidNumber(str: string): boolean;
export declare function formatValue(val: number | string, precision?: number): string;
export declare function buildWrapperClasses(size: NumberFieldSize, unstyled?: boolean, variant?: string): string;
export declare function buildInputClasses(hasLeading: boolean, className?: string): string;
export declare function buildLabelClasses(isFloating: boolean, showShifted: boolean): string;
//# sourceMappingURL=NumberField.utils.d.ts.map