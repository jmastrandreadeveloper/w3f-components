import type { ConsoleLevelFilter } from './Console.types';

// ─── Defaults ──────────────────────────────────────────────────────────────────

export const CONSOLE_DEFAULTS = {
    title: 'Console',
    maxMessages: 500,
    showTimestamps: true,
    showLevelFilter: true,
    showSearch: false,
    showClearButton: true,
    showExportButton: false,
    defaultLevel: 'all' as ConsoleLevelFilter,
    height: '280px',
    theme: 'dark' as const,
    className: '',
    unstyled: false,
} as const;

// ─── Clases BEM ────────────────────────────────────────────────────────────────

export const CONSOLE_CLASSES = {
    root: 'w3f-console',
    themeDark: 'w3f-console--dark',
    themeLight: 'w3f-console--light',
    // Header
    header: 'w3f-console-header',
    headerLeft: 'w3f-console-header-left',
    headerRight: 'w3f-console-header-right',
    title: 'w3f-console-title',
    badge: 'w3f-console-badge',
    // Controles
    controls: 'w3f-console-controls',
    search: 'w3f-console-search',
    searchInput: 'w3f-console-search-input',
    actionBtn: 'w3f-console-action-btn',
    // Filtro de nivel
    filter: 'w3f-console-filter',
    filterBtn: 'w3f-console-filter-btn',
    filterBtnActive: 'w3f-console-filter-btn--active',
    filterInfo: 'w3f-console-filter-btn--info',
    filterWarn: 'w3f-console-filter-btn--warn',
    filterError: 'w3f-console-filter-btn--error',
    filterSuccess: 'w3f-console-filter-btn--success',
    filterDebug: 'w3f-console-filter-btn--debug',
    // Área de mensajes
    body: 'w3f-console-body',
    empty: 'w3f-console-empty',
    // Mensaje individual
    message: 'w3f-console-message',
    messageInfo: 'w3f-console-message--info',
    messageWarn: 'w3f-console-message--warn',
    messageError: 'w3f-console-message--error',
    messageSuccess: 'w3f-console-message--success',
    messageDebug: 'w3f-console-message--debug',
    messageTimestamp: 'w3f-console-message-timestamp',
    messageLevel: 'w3f-console-message-level',
    messageLabel: 'w3f-console-message-label',
    messageContent: 'w3f-console-message-content',
    messageJson: 'w3f-console-message-json',
    // Children slot
    children: 'w3f-console-children',
} as const;

// ─── Niveles disponibles para el filtro ───────────────────────────────────────

export const CONSOLE_LEVELS: ConsoleLevelFilter[] = [
    'all', 'info', 'success', 'warn', 'error', 'debug',
];

export const CONSOLE_LEVEL_LABELS: Record<ConsoleLevelFilter, string> = {
    all: 'All',
    info: 'Info',
    success: 'OK',
    warn: 'Warn',
    error: 'Error',
    debug: 'Debug',
};
