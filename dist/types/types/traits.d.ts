export type TraitColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type TraitVariant = 'filled' | 'ghost' | 'outlined' | 'soft';
export type TraitSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TraitEffect = 'hoverable' | 'pressable' | 'focusable' | 'lift' | 'disabled-fade' | 'active-press';
export type TraitRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type TraitShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type TraitTransition = 'animate' | 'animate-fast' | 'animate-slow' | 'animate-colors' | 'animate-transform' | 'no-animate';
export type TraitGlow = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export interface TraitConfig {
    variant?: `${TraitVariant}-${TraitColor}`;
    size?: TraitSize;
    effects?: TraitEffect[];
    radius?: TraitRadius;
    shadow?: TraitShadow;
    transition?: TraitTransition;
}
//# sourceMappingURL=traits.d.ts.map