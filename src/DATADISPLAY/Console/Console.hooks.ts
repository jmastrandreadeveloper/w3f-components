import { useState, useCallback, useRef, useEffect, useContext } from 'react';
import type { ConsoleLevel, ConsoleMessage, ConsoleContextValue } from './Console.types';
import { ConsoleContext } from './Console.context';
import { createMessage } from './Console.utils';

// ─── Estado central de mensajes ────────────────────────────────────────────────

export function useConsoleState(maxMessages: number): ConsoleContextValue {
    const [messages, setMessages] = useState<ConsoleMessage[]>([]);

    const logMessage = useCallback(
        (content: unknown, level: ConsoleLevel = 'info', label?: string) => {
            const msg = createMessage(content, level, label);
            setMessages((prev) => {
                const next = [...prev, msg];
                return next.length > maxMessages
                    ? next.slice(next.length - maxMessages)
                    : next;
            });
        },
        [maxMessages],
    );

    const log = useCallback(
        (content: unknown, label?: string) => logMessage(content, 'info', label),
        [logMessage],
    );
    const warn = useCallback(
        (content: unknown, label?: string) => logMessage(content, 'warn', label),
        [logMessage],
    );
    const error = useCallback(
        (content: unknown, label?: string) => logMessage(content, 'error', label),
        [logMessage],
    );
    const success = useCallback(
        (content: unknown, label?: string) => logMessage(content, 'success', label),
        [logMessage],
    );
    const debug = useCallback(
        (content: unknown, label?: string) => logMessage(content, 'debug', label),
        [logMessage],
    );
    const clear = useCallback(() => setMessages([]), []);

    return { messages, logMessage, log, warn, error, success, debug, clear };
}

// ─── Filtros de visualización ──────────────────────────────────────────────────

export function useConsoleFilter(defaultLevel: string) {
    const [levelFilter, setLevelFilter] = useState<string>(defaultLevel);
    const [searchQuery, setSearchQuery] = useState('');
    return { levelFilter, setLevelFilter, searchQuery, setSearchQuery };
}

// ─── Auto-scroll ───────────────────────────────────────────────────────────────

export function useAutoScroll(messages: ConsoleMessage[]) {
    const bodyRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [messages]);
    return bodyRef;
}

// ─── Consumidor del contexto ───────────────────────────────────────────────────

/**
 * Hook para usar el Console desde cualquier componente hijo dentro de <Console>.
 *
 * @example
 * const { log, error, success } = useConsole();
 * log({ user: 'admin' }, 'Auth');
 */
export function useConsole(): ConsoleContextValue {
    const ctx = useContext(ConsoleContext);
    if (!ctx) {
        throw new Error('useConsole debe usarse dentro de un componente <Console>');
    }
    return ctx;
}
