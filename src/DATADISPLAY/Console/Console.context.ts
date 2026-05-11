import { createContext } from 'react';
import type { ConsoleContextValue } from './Console.types';

/**
 * Contexto de Console — provee logMessage, log, warn, error, success, debug y clear
 * a cualquier descendiente.
 *
 * Consumir con useConsole() en lugar de useContext directamente.
 */
export const ConsoleContext = createContext<ConsoleContextValue | null>(null);
