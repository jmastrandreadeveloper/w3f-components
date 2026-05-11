// ─── Form Defaults ─────────────────────────────────────────────────
export const FORM_DEFAULTS = {
    initialValues: {} as Record<string, any>,
    noValidate: true,
    unstyled: false,
    className: '',
} as const;

// ─── CSS Class tokens ──────────────────────────────────────────────
export const FORM_CLASSES = {
    base: 'w3f-form',
    inline: 'w3f-form--inline',
    stacked: 'w3f-form--stacked',
    submitting: 'w3f-form--submitting',
} as const;
