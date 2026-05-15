import React from 'react';
import type { TableProps } from './Table.types';
/**
 * Componente Table - Tabla de datos avanzada.
 * Soporta sorting, filtering, paginación, resize y reordenamiento de columnas.
 */
declare const Table: <T extends Record<string, unknown>>(props: TableProps<T> & React.RefAttributes<HTMLDivElement>) => React.ReactElement | null;
export { Table };
export default Table;
//# sourceMappingURL=Table.d.ts.map