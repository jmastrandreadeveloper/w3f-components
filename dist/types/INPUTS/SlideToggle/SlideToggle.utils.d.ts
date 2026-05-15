import type { SlideToggleSize, SlideToggleVariant } from './SlideToggle.types';
export declare function getSizeConfig(size: SlideToggleSize): import("./SlideToggle.types").SlideToggleSizeConfig;
export declare function buildToggleClasses(size: SlideToggleSize, variant: SlideToggleVariant, disabled: boolean, loading: boolean, hasError: boolean, unstyled?: boolean): string;
export declare function buildTrackClasses(isChecked: boolean): string;
export declare function buildHandleClasses(isDragging: boolean): string;
//# sourceMappingURL=SlideToggle.utils.d.ts.map