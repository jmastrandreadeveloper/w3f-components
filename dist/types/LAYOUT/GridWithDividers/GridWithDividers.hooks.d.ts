import type { DividerConfig, GridDividerState } from './GridWithDividers.types';
/**
 * Manages all divider states for a GridWithDividers instance in a single hook call.
 * Avoids React Rules-of-Hooks violations that arise from calling hooks inside a loop.
 */
declare const useGridDividers: (configs: DividerConfig[]) => GridDividerState[];
export { useGridDividers };
export default useGridDividers;
//# sourceMappingURL=GridWithDividers.hooks.d.ts.map