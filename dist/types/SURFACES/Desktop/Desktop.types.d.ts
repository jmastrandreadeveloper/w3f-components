import type React from 'react';
export interface DesktopProps {
    children?: React.ReactNode;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** Background of the desktop container. */
    background?: string;
    /** Height of the outer container. Default: '100vh'. */
    height?: string | number;
    /** Enable mouse-wheel zoom and zoom controls. Default: false. */
    zoomable?: boolean;
    /** Initial zoom level (1 = 100%). Default: 1. */
    defaultZoom?: number;
    /** Minimum zoom level. Default: 0.25. */
    minZoom?: number;
    /** Maximum zoom level. Default: 3. */
    maxZoom?: number;
    /** Zoom increment per wheel tick or button click. Default: 0.1. */
    zoomStep?: number;
    /** Show zoom HUD (−/% /+) when zoomable=true. Default: true. */
    showZoomControls?: boolean;
    /** Enable drag-to-pan on the canvas background. Default: false. */
    pannable?: boolean;
    /** Initial pan offset in pixels. Default: { x: 0, y: 0 }. */
    defaultPan?: {
        x: number;
        y: number;
    };
    /** Width of the inner canvas (scrollable/zoomable area). Default: 3000. */
    canvasWidth?: number | string;
    /** Height of the inner canvas. Default: 2000. */
    canvasHeight?: number | string;
}
//# sourceMappingURL=Desktop.types.d.ts.map