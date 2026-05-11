import React from 'react';
import type { ConsoleProps, ConsoleMessage, ConsoleLevel } from './Console.types';
import { CONSOLE_DEFAULTS, CONSOLE_CLASSES, CONSOLE_LEVELS, CONSOLE_LEVEL_LABELS } from './Console.constants';
import {
    buildConsoleClasses,
    buildMessageClasses,
    buildFilterBtnClasses,
    filterMessages,
    formatTimestamp,
    formatContentAsString,
    isJsonable,
    exportMessagesAsLog,
} from './Console.utils';
import { useConsoleState, useConsoleFilter, useAutoScroll } from './Console.hooks';
import { ConsoleContext } from './Console.context';

// ─── Re-exports públicos ───────────────────────────────────────────────────────

export { useConsole } from './Console.hooks';
export type {
    ConsoleProps,
    ConsoleMessage,
    ConsoleLevel,
    ConsoleLevelFilter,
    ConsoleContextValue,
} from './Console.types';

// ─── Sub-componente: una línea de mensaje ─────────────────────────────────────

interface ConsoleMessageLineProps {
    message: ConsoleMessage;
    showTimestamp: boolean;
}

const ConsoleMessageLine: React.FC<ConsoleMessageLineProps> = ({ message, showTimestamp }) => {
    const { id, timestamp, content, level, label } = message;
    const cls = buildMessageClasses(level);
    const jsonContent = isJsonable(content);

    return (
        <div key={id} className={cls}>
            {showTimestamp && (
                <span className={CONSOLE_CLASSES.messageTimestamp}>
                    {formatTimestamp(timestamp)}
                </span>
            )}
            <span className={CONSOLE_CLASSES.messageLevel}>
                [{level.toUpperCase()}]
            </span>
            {label && (
                <span className={CONSOLE_CLASSES.messageLabel}>{label}</span>
            )}
            <span className={CONSOLE_CLASSES.messageContent}>
                {jsonContent ? (
                    <pre className={CONSOLE_CLASSES.messageJson}>
                        {JSON.stringify(content, null, 2)}
                    </pre>
                ) : (
                    formatContentAsString(content)
                )}
            </span>
        </div>
    );
};

// ─── Componente principal ──────────────────────────────────────────────────────

/**
 * Console — Terminal de log estilo OS con soporte para niveles, filtros,
 * búsqueda y children que usan useConsole().
 *
 * Actúa como Provider: cualquier componente dentro (Form, LiveForm, etc.)
 * puede usar `useConsole()` para enviar mensajes.
 *
 * @example
 * <Console title="API Log" height="300px">
 *   <MyFormWithConsole />
 * </Console>
 *
 * // Dentro de MyFormWithConsole:
 * const { success, error } = useConsole();
 * <Form onSubmit={async (values) => {
 *   const result = await api.post(values);
 *   result.ok ? success(result.data, 'POST /api') : error(result.error);
 * }}>
 */
const Console = React.forwardRef<HTMLDivElement, ConsoleProps>(({
    children,
    title = CONSOLE_DEFAULTS.title,
    maxMessages = CONSOLE_DEFAULTS.maxMessages,
    showTimestamps = CONSOLE_DEFAULTS.showTimestamps,
    showLevelFilter = CONSOLE_DEFAULTS.showLevelFilter,
    showSearch = CONSOLE_DEFAULTS.showSearch,
    showClearButton = CONSOLE_DEFAULTS.showClearButton,
    showExportButton = CONSOLE_DEFAULTS.showExportButton,
    defaultLevel = CONSOLE_DEFAULTS.defaultLevel,
    onExport,
    height = CONSOLE_DEFAULTS.height,
    theme = CONSOLE_DEFAULTS.theme,
    className = CONSOLE_DEFAULTS.className,
    unstyled = CONSOLE_DEFAULTS.unstyled,
}, ref) => {
    // Estado del contexto (compartido con children)
    const consoleState = useConsoleState(maxMessages);
    const { messages, clear } = consoleState;

    // Filtros de visualización (solo UI, no afectan el contexto)
    const { levelFilter, setLevelFilter, searchQuery, setSearchQuery } =
        useConsoleFilter(defaultLevel);

    // Auto-scroll al último mensaje
    const bodyRef = useAutoScroll(messages);

    // Mensajes visibles según filtros
    const visibleMessages = filterMessages(messages, levelFilter, searchQuery);

    // Conteo por nivel para badges
    const counts = messages.reduce<Record<string, number>>(
        (acc, m) => ({ ...acc, [m.level]: (acc[m.level] ?? 0) + 1 }),
        {},
    );

    const handleExport = () => {
        if (onExport) {
            onExport(messages);
        } else {
            exportMessagesAsLog(messages);
        }
    };

    const rootCls = buildConsoleClasses(theme, unstyled, className);

    return (
        <ConsoleContext.Provider value={consoleState}>
            {/* Children slot — aquí van formularios y otros componentes */}
            {children && (
                <div className={CONSOLE_CLASSES.children}>
                    {children}
                </div>
            )}

            {/* Terminal */}
            <div ref={ref} className={rootCls}>
                {/* Header */}
                <div className={CONSOLE_CLASSES.header}>
                    <div className={CONSOLE_CLASSES.headerLeft}>
                        <span className={CONSOLE_CLASSES.title}>{title}</span>
                        <span className={CONSOLE_CLASSES.badge}>{messages.length}</span>
                    </div>

                    <div className={CONSOLE_CLASSES.headerRight}>
                        {/* Filtros por nivel */}
                        {showLevelFilter && (
                            <div className={CONSOLE_CLASSES.filter}>
                                {CONSOLE_LEVELS.map((lvl) => (
                                    <button
                                        key={lvl}
                                        type="button"
                                        className={buildFilterBtnClasses(lvl, levelFilter)}
                                        onClick={() => setLevelFilter(lvl)}
                                        title={`${lvl === 'all' ? 'Todos' : lvl}${counts[lvl] ? ` (${counts[lvl]})` : ''}`}
                                    >
                                        {CONSOLE_LEVEL_LABELS[lvl]}
                                        {lvl !== 'all' && counts[lvl] ? (
                                            <span className={CONSOLE_CLASSES.badge}>
                                                {counts[lvl]}
                                            </span>
                                        ) : null}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Búsqueda */}
                        {showSearch && (
                            <div className={CONSOLE_CLASSES.search}>
                                <input
                                    type="text"
                                    className={CONSOLE_CLASSES.searchInput}
                                    placeholder="Buscar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Buscar en consola"
                                />
                            </div>
                        )}

                        {/* Exportar */}
                        {showExportButton && (
                            <button
                                type="button"
                                className={CONSOLE_CLASSES.actionBtn}
                                onClick={handleExport}
                                title="Exportar log"
                                aria-label="Exportar"
                            >
                                ↓
                            </button>
                        )}

                        {/* Limpiar */}
                        {showClearButton && (
                            <button
                                type="button"
                                className={CONSOLE_CLASSES.actionBtn}
                                onClick={clear}
                                title="Limpiar consola"
                                aria-label="Limpiar"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Área de mensajes */}
                <div
                    ref={bodyRef}
                    className={CONSOLE_CLASSES.body}
                    style={{ height }}
                    role="log"
                    aria-live="polite"
                    aria-label={title}
                >
                    {visibleMessages.length === 0 ? (
                        <div className={CONSOLE_CLASSES.empty}>
                            {messages.length === 0
                                ? '▶ Esperando mensajes…'
                                : 'Sin resultados para el filtro activo.'}
                        </div>
                    ) : (
                        visibleMessages.map((msg) => (
                            <ConsoleMessageLine
                                key={msg.id}
                                message={msg}
                                showTimestamp={showTimestamps}
                            />
                        ))
                    )}
                </div>
            </div>
        </ConsoleContext.Provider>
    );
});

Console.displayName = 'Console';

export { Console };
export default Console;
