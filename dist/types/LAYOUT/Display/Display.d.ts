import React from 'react';
import type { DisplayContainerProps, DisplayItemProps } from './Display.types';
export type { DisplayContainerProps, DisplayItemProps, DisplayPosition } from './Display.types';
export declare const TOPLEFT: "w3f-position-topleft", TOPRIGHT: "w3f-position-topright", BOTTOMLEFT: "w3f-position-bottomleft", BOTTOMRIGHT: "w3f-position-bottomright", MIDDLE: "w3f-position-middle", TOP: "w3f-position-top", BOTTOM: "w3f-position-bottom", LEFT: "w3f-position-left", RIGHT: "w3f-position-right";
export declare const DisplayPositions: {
    readonly TOPLEFT: "w3f-position-topleft";
    readonly TOPRIGHT: "w3f-position-topright";
    readonly BOTTOMLEFT: "w3f-position-bottomleft";
    readonly BOTTOMRIGHT: "w3f-position-bottomright";
    readonly MIDDLE: "w3f-position-middle";
    readonly TOP: "w3f-position-top";
    readonly BOTTOM: "w3f-position-bottom";
    readonly LEFT: "w3f-position-left";
    readonly RIGHT: "w3f-position-right";
    readonly CONTAINER: "w3f-position-container";
};
/**
 * DisplayContainer Component - W3F Framework
 *
 * Contenedor de visualización con posicionamiento absoluto de hijos.
 *
 * @example
 * <DisplayContainer>
 *   <DisplayItem position={MIDDLE}>Centro</DisplayItem>
 *   <DisplayItem position={TOPLEFT}>Esquina</DisplayItem>
 * </DisplayContainer>
 */
declare const DisplayContainer: React.FC<DisplayContainerProps>;
/**
 * DisplayItem - Elemento posicionado dentro de un DisplayContainer.
 */
declare const DisplayItem: React.FC<DisplayItemProps>;
export { DisplayContainer, DisplayItem };
export default DisplayContainer;
//# sourceMappingURL=Display.d.ts.map