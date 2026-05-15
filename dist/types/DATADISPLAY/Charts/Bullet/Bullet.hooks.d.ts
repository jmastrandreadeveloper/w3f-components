import type { BulletDatum } from './Bullet.types';
export declare function useBulletInteraction(onHover?: (datum: BulletDatum | null, index: number | null) => void, onSelect?: (datum: BulletDatum, index: number) => void): {
    hoveredIndex: number | null;
    handleEnter: (datum: BulletDatum, index: number) => void;
    handleLeave: () => void;
    handleClick: (datum: BulletDatum, index: number) => void;
};
export { useChartDimensions } from '../_base/hooks';
//# sourceMappingURL=Bullet.hooks.d.ts.map