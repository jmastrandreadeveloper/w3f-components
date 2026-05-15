import type React from 'react';
export type ConsoleLevel = 'info' | 'warn' | 'error' | 'success' | 'debug';
export type ConsoleLevelFilter = ConsoleLevel | 'all';
export interface ConsoleMessage {
    id: string;
    timestamp: string;
    content: unknown;
    level: ConsoleLevel;
    label?: string;
}
export interface ConsoleContextValue {
    messages: ConsoleMessage[];
    /** Log genérico con nivel explícito */
    logMessage: (content: unknown, level?: ConsoleLevel, label?: string) => void;
    /** Atajos por nivel */
    log: (content: unknown, label?: string) => void;
    warn: (content: unknown, label?: string) => void;
    error: (content: unknown, label?: string) => void;
    success: (content: unknown, label?: string) => void;
    debug: (content: unknown, label?: string) => void;
    /** Limpia todos los mensajes */
    clear: () => void;
}
export interface ConsoleProps {
    /** Componentes internos que pueden usar useConsole() para enviar logs */
    children?: React.ReactNode;
    /** Título mostrado en el header */
    title?: string;
    /** Máximo de mensajes retenidos en memoria */
    maxMessages?: number;
    /** Mostrar columna de timestamp */
    showTimestamps?: boolean;
    /** Mostrar botones de filtro por nivel */
    showLevelFilter?: boolean;
    /** Mostrar input de búsqueda */
    showSearch?: boolean;
    /** Mostrar botón de limpiar */
    showClearButton?: boolean;
    /** Mostrar botón de exportar como .log */
    showExportButton?: boolean;
    /** Nivel inicial del filtro */
    defaultLevel?: ConsoleLevelFilter;
    /** Callback al exportar mensajes */
    onExport?: (messages: ConsoleMessage[]) => void;
    /** Altura del área de mensajes */
    height?: string;
    /** Tema visual */
    theme?: 'dark' | 'light';
    /** Clase CSS adicional en el contenedor raíz */
    className?: string;
    /** If true, removes all visual/preset styles — only structural CSS remains. */
    unstyled?: boolean;
}
//# sourceMappingURL=Console.types.d.ts.map