import type { BulletDatum } from './Bullet.types';
export declare function buildBulletClasses(className: string | undefined, unstyled: boolean | undefined): string;
export declare function buildBulletScale(datum: BulletDatum, width: number): import("d3-scale").ScaleLinear<number, number, never>;
export declare function buildTooltipContent(datum: BulletDatum): string;
//# sourceMappingURL=Bullet.utils.d.ts.map