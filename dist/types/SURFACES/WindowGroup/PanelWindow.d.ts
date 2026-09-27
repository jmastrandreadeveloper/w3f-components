import type { WindowProps } from '../Window/Window.types';
interface PanelWindowProps extends Omit<WindowProps, 'open' | 'onClose'> {
    /** Must match the panel name passed to PanelButton. */
    panel: string;
}
/**
 * A Window that shows/hides based on the nearest WindowGroup's panel state.
 * Also registers its DOM ref so WindowGroup can draw connector lines to it.
 */
export declare function PanelWindow({ panel, ...windowProps }: PanelWindowProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=PanelWindow.d.ts.map