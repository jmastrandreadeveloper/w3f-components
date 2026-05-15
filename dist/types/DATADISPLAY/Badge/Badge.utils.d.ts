import type { BadgeColor, BadgePosition, BadgeSize, BadgeVariant } from './Badge.types';
export declare function buildBadgeClasses(color: BadgeColor, size: BadgeSize, variant: BadgeVariant, position: BadgePosition | null, pulse: boolean, animate: boolean, className: string, unstyled?: boolean): string;
export declare function processContent(children: React.ReactNode, max: number, variant: BadgeVariant): React.ReactNode;
export declare function getAriaLabel(ariaLabel: string, variant: BadgeVariant, children: React.ReactNode, processedContent: React.ReactNode): string | undefined;
//# sourceMappingURL=Badge.utils.d.ts.map