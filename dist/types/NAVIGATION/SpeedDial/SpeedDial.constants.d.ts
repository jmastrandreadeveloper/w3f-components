import type { SpeedDialColor, SpeedDialDirection, SpeedDialPosition, SpeedDialSize } from './SpeedDial.types';
export declare const SPEED_DIAL_DEFAULTS: {
    readonly direction: SpeedDialDirection;
    readonly defaultOpen: false;
    readonly hidden: false;
    readonly color: SpeedDialColor;
    readonly size: SpeedDialSize;
    readonly position: SpeedDialPosition;
    readonly openOnHover: false;
    readonly backdrop: false;
    readonly unstyled: false;
    readonly className: "";
};
export declare const SPEED_DIAL_ACTION_DEFAULTS: {
    readonly tooltipOpen: false;
    readonly disabled: false;
    readonly className: "";
    readonly _direction: SpeedDialDirection;
};
export declare const SPEED_DIAL_CLASSES: {
    readonly container: "w3f-speed-dial";
    readonly open: "w3f-speed-dial--open";
    readonly hidden: "w3f-speed-dial--hidden";
    readonly fab: "w3f-speed-dial__fab";
    readonly icon: "w3f-speed-dial__icon";
    readonly iconRotate: "w3f-speed-dial__icon--rotate";
    readonly iconDefault: "w3f-speed-dial__icon-default";
    readonly iconOpen: "w3f-speed-dial__icon-open";
    readonly actions: "w3f-speed-dial__actions";
    readonly backdrop: "w3f-speed-dial__backdrop";
    readonly action: "w3f-speed-dial-action";
    readonly actionFab: "w3f-speed-dial-action__fab";
    readonly actionTooltip: "w3f-speed-dial-action__tooltip";
    readonly actionTooltipOpen: "w3f-speed-dial-action__tooltip--open";
};
export declare const HOVER_CLOSE_DELAY = 100;
//# sourceMappingURL=SpeedDial.constants.d.ts.map