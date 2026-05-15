const gridDividerUtils = {
  /**
   * Reemplaza el tamaño de una fracción específica en el template CSS.
   */
  replaceTemplateSize: (template, index, newSize) => {
    const parts = template.trim().split(/\s+/);
    if (index >= 0 && index < parts.length) {
      parts[index] = `${newSize}px`;
    }
    return parts.join(" ");
  },
  /**
   * Identifica la posición de un área específica en un gridTemplateAreas.
   */
  findAreaPosition: (templateAreas, areaName) => {
    const rows = templateAreas.trim().split("\n").map((row) => row.trim().split(/\s+/));
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const colIndex = rows[rowIndex].indexOf(areaName);
      if (colIndex !== -1) {
        return { row: rowIndex, col: colIndex };
      }
    }
    return null;
  }
};
var GridWithDividers_utils_default = gridDividerUtils;
export {
  GridWithDividers_utils_default as default
};
//# sourceMappingURL=GridWithDividers.utils.js.map
