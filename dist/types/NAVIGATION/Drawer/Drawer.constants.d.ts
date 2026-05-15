import type { DrawerAnchor, DrawerColor, DrawerVariant } from './Drawer.types';
export declare const DRAWER_DEFAULTS: {
    readonly open: false;
    readonly anchor: DrawerAnchor;
    readonly variant: DrawerVariant;
    readonly width: 280;
    readonly height: 300;
    readonly showBackdrop: true;
    readonly showCloseButton: false;
    readonly closeOnBackdropClick: true;
    readonly closeOnEsc: true;
    readonly color: DrawerColor;
    readonly unstyled: false;
    readonly className: "";
    readonly animationDuration: 300;
};
export declare const DRAWER_CLASSES: {
    readonly root: "w3f-drawer-root";
    readonly rootOpen: "w3f-drawer-root--open";
    readonly drawer: "w3f-drawer";
    readonly open: "w3f-drawer--open";
    readonly backdrop: "w3f-drawer__backdrop";
    readonly close: "w3f-drawer__close";
    readonly content: "w3f-drawer__content";
};
//# sourceMappingURL=Drawer.constants.d.ts.map