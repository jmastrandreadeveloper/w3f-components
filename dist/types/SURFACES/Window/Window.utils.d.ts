import type React from 'react';
import type { WindowDimensions, WindowFooterAlign, WindowOsStyle, WindowPosition, WindowSize } from './Window.types';
export declare function buildWindowClasses(osStyle: WindowOsStyle, size: WindowSize, modal: boolean, isMaximized: boolean, isMinimized: boolean, isFocused: boolean, isDragging: boolean, isResizing: boolean, className: string, unstyled?: boolean): string;
export declare function buildWindowBodyClasses(noPadding: boolean, bodyClassName: string): string;
export declare function buildWindowFooterClasses(align: WindowFooterAlign, footerClassName: string): string;
export declare function buildWindowStyle(style: React.CSSProperties | undefined, position: WindowPosition, dimensions: WindowDimensions | null, isMaximized: boolean, zIndex: number): React.CSSProperties;
//# sourceMappingURL=Window.utils.d.ts.map