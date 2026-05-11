import type { AppBarColor, AppBarPosition, AppBarSize } from './AppBar.types';

export const APP_BAR_DEFAULTS = {
    color: 'primary' as AppBarColor,
    position: 'static' as AppBarPosition,
    size: 'md' as AppBarSize,
    elevated: true,
    unstyled: false,
    className: '',
} as const;

export const APP_BAR_CLASSES = {
    root: 'w3f-app-bar',
    toolbar: 'w3f-app-bar__toolbar',
    leading: 'w3f-app-bar__leading',
    title: 'w3f-app-bar__title',
    trailing: 'w3f-app-bar__trailing',
    // colors
    primary: 'w3f-app-bar--primary',
    secondary: 'w3f-app-bar--secondary',
    surface: 'w3f-app-bar--surface',
    transparent: 'w3f-app-bar--transparent',
    dark: 'w3f-app-bar--dark',
    // positions
    fixed: 'w3f-app-bar--fixed',
    sticky: 'w3f-app-bar--sticky',
    // sizes
    sm: 'w3f-app-bar--sm',
    lg: 'w3f-app-bar--lg',
    // elevated
    elevated: 'w3f-app-bar--elevated',
} as const;
