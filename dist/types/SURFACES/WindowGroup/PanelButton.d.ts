import type { ButtonProps } from '../../INPUTS/Button/Button.types';
interface PanelButtonProps extends Omit<ButtonProps, 'onClick'> {
    /** Panel name to open when clicked — must match the panel prop on PanelWindow. */
    panel: string;
}
/**
 * A Button that opens a named panel inside the nearest WindowGroup.
 * No Python on_click handler needed — state is managed client-side via WindowGroupContext.
 */
export declare function PanelButton({ panel, children, ...buttonProps }: PanelButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PanelButton.d.ts.map