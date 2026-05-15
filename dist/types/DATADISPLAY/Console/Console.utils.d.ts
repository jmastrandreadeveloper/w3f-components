import type { ConsoleLevel, ConsoleMessage } from './Console.types';
export declare function generateId(): string;
export declare function createMessage(content: unknown, level?: ConsoleLevel, label?: string): ConsoleMessage;
export declare function formatTimestamp(isoString: string): string;
export declare function isJsonable(value: unknown): boolean;
export declare function formatContentAsString(content: unknown): string;
export declare function buildConsoleClasses(theme: string, unstyled?: boolean, className?: string): string;
export declare function buildMessageClasses(level: ConsoleLevel): string;
export declare function buildFilterBtnClasses(level: string, activeLevel: string): string;
export declare function filterMessages(messages: ConsoleMessage[], levelFilter: string, searchQuery: string): ConsoleMessage[];
export declare function exportMessagesAsLog(messages: ConsoleMessage[]): void;
//# sourceMappingURL=Console.utils.d.ts.map