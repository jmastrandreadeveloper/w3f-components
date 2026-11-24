import type React from 'react';
import type { WindowDimensions, WindowFooterAlign, WindowOsStyle, WindowPosition, WindowSize } from './Window.types';
export declare function buildWindowClasses(osStyle: WindowOsStyle, size: WindowSize, modal: boolean, isMaximized: boolean, isMinimized: boolean, isFocused: boolean, isDragging: boolean, isResizing: boolean, className: string, unstyled?: boolean): string;
export declare function buildWindowBodyClasses(noPadding: boolean, bodyClassName: string): string;
export declare function buildWindowFooterClasses(align: WindowFooterAlign, footerClassName: string): string;
export declare function buildWindowStyle(style: React.CSSProperties | undefined, position: WindowPosition, dimensions: WindowDimensions | null, isMaximized: boolean, zIndex: number, autoContent?: boolean, maxContentHeight?: number | null): React.CSSProperties;
/**
 * B61: espacio libre debajo del contenido de una ventana maximizada, en px de la pantalla (null si `el` no está en una
 * ventana maximizada). Es lo que va desde lo más bajo que se ve (textos, tablas, controles, dibujos) hasta el borde de
 * abajo del cuerpo de la ventana. `scale` = px de la pantalla por px de layout dentro del cuerpo (la ventana
 * maximizada puede tener CSS zoom): para pasar a px de layout, dividir por `scale`.
 */
export declare function maximizedFreeSpace(el: Element | null): {
    free: number;
    scale: number;
} | null;
//# sourceMappingURL=Window.utils.d.ts.map