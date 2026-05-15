import type React from 'react';
import type { BottomNavContextValue, BottomNavColor } from './BottomNavigation.types';
export declare const BottomNavContext: React.Context<BottomNavContextValue>;
export declare function useBottomNav(valueProp: string | number | undefined, defaultValue: string | number | undefined, onChange: ((e: React.MouseEvent<HTMLButtonElement>, value: string | number) => void) | undefined, disabled: boolean): {
    currentValue: string | number | null;
    handleChange: (e: React.MouseEvent<HTMLButtonElement>, newValue: string | number) => void;
};
export declare function useBottomNavAction(): BottomNavContextValue;
export declare function useBottomNavContext(currentValue: string | number | null, handleChange: (e: React.MouseEvent<HTMLButtonElement>, value: string | number) => void, showLabels: boolean, color: BottomNavColor): BottomNavContextValue;
//# sourceMappingURL=BottomNavigation.hooks.d.ts.map