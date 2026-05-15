/**
 * Funciones auxiliares para GridWithDividers.
 */
declare const gridDividerUtils: {
    /**
     * Reemplaza el tamaño de una fracción específica en el template CSS.
     */
    replaceTemplateSize: (template: string, index: number, newSize: number) => string;
    /**
     * Identifica la posición de un área específica en un gridTemplateAreas.
     */
    findAreaPosition: (templateAreas: string, areaName: string) => {
        row: number;
        col: number;
    } | null;
};
export default gridDividerUtils;
//# sourceMappingURL=GridWithDividers.utils.d.ts.map