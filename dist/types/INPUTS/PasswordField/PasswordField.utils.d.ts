import type { PasswordFieldSize, PasswordStrength } from './PasswordField.types';
export declare function getPasswordStrength(password: string): PasswordStrength | null;
export declare function buildContainerClasses(className?: string, unstyled?: boolean): string;
export declare function buildWrapperClasses(size: PasswordFieldSize): string;
export declare function buildInputClasses(): string;
export declare function buildLabelClasses(isFloating: boolean): string;
export declare function buildStrengthSegmentClasses(segmentIndex: number, activeSegments: number, strength: PasswordStrength): string;
//# sourceMappingURL=PasswordField.utils.d.ts.map