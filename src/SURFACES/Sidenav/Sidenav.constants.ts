import type { SidenavVariant } from './Sidenav.types';

export const SIDENAV_DEFAULTS = {
    loading: false,
    error: null,
    variant: 'default' as SidenavVariant,
    unstyled: false,
    className: '',
} as const;

export const SIDENAV_CLASSES = {
    container: 'w3f-sidenav-container',
    compact: 'w3f-sidenav-compact',
    expanded: 'w3f-sidenav-expanded',
    light: 'w3f-sidenav-light',
    alert: 'w3f-sidenav-alert',
    alertLoading: 'w3f-sidenav-alert-loading',
    alertError: 'w3f-sidenav-alert-error',
    alertIcon: 'w3f-sidenav-alert-icon',
} as const;
