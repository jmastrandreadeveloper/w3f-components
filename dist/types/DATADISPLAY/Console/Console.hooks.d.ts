import type { ConsoleMessage, ConsoleContextValue } from './Console.types';
export declare function useConsoleState(maxMessages: number): ConsoleContextValue;
export declare function useConsoleFilter(defaultLevel: string): {
    levelFilter: string;
    setLevelFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
    searchQuery: string;
    setSearchQuery: import("react").Dispatch<import("react").SetStateAction<string>>;
};
export declare function useAutoScroll(messages: ConsoleMessage[]): import("react").RefObject<HTMLDivElement | null>;
/**
 * Hook para usar el Console desde cualquier componente hijo dentro de <Console>.
 *
 * @example
 * const { log, error, success } = useConsole();
 * log({ user: 'admin' }, 'Auth');
 */
export declare function useConsole(): ConsoleContextValue;
//# sourceMappingURL=Console.hooks.d.ts.map