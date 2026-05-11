// ─── LiveForm Defaults ─────────────────────────────────────────────
export const LIVE_FORM_DEFAULTS = {
    initialValues: {} as Record<string, any>,
    unstyled: false,
    className: '',
} as const;

// ─── CSS Class tokens ──────────────────────────────────────────────
export const LIVE_FORM_CLASSES = {
    base: 'w3f-live-form',
    active: 'w3f-live-form--active',
} as const;
