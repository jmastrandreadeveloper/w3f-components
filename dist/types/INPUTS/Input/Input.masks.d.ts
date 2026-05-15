export interface MaskDefinition {
    name: string;
    mask?: string;
    placeholder: string;
    cleanValue: (v: string) => string;
    format: (v: string) => string;
    validate?: RegExp;
    maxLength?: number;
}
export declare const PREDEFINED_MASKS: Record<string, MaskDefinition>;
/**
 * Resolve a mask prop to a MaskDefinition.
 * Accepts either a predefined mask name (string) or a custom MaskDefinition.
 */
export declare function resolveMask(mask: string | MaskDefinition): MaskDefinition | null;
//# sourceMappingURL=Input.masks.d.ts.map