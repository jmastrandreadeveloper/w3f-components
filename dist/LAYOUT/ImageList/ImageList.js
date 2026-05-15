"use client";
import { jsx } from "react/jsx-runtime";
import { IMAGE_LIST_DEFAULTS } from "./ImageList.constants";
import { getTemplateColumns } from "./ImageList.utils";
import { ImageCard } from "./ImageCard";
import { Grid } from "../Grid/Grid";
import { GridAreaItem } from "../Grid/Grid";
const ImageList = ({
  items,
  variant = IMAGE_LIST_DEFAULTS.variant,
  cols,
  gap = IMAGE_LIST_DEFAULTS.gap,
  rowHeight = IMAGE_LIST_DEFAULTS.rowHeight,
  className,
  style
}) => {
  const templateColumns = getTemplateColumns(variant, cols);
  return /* @__PURE__ */ jsx(
    Grid,
    {
      templateColumns,
      gap,
      autoRows: typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight,
      autoFlow: "row dense",
      className,
      style,
      alignItems: "stretch",
      justifyItems: "stretch",
      children: items.map((item) => {
        if (variant === "quilted" && (item.cols || item.rows)) {
          return /* @__PURE__ */ jsx(
            GridAreaItem,
            {
              gridColumn: item.cols ? `span ${item.cols}` : void 0,
              gridRow: item.rows ? `span ${item.rows}` : void 0,
              style: { position: "relative", overflow: "hidden", borderRadius: "8px" },
              children: /* @__PURE__ */ jsx(ImageCard, { item, height: rowHeight })
            },
            item.id
          );
        }
        return /* @__PURE__ */ jsx(
          "div",
          {
            style: { position: "relative", overflow: "hidden", borderRadius: "8px", minHeight: "200px" },
            children: /* @__PURE__ */ jsx(ImageCard, { item, height: rowHeight })
          },
          item.id
        );
      })
    }
  );
};
ImageList.displayName = "ImageList";
var ImageList_default = ImageList;
export {
  ImageCard,
  ImageList,
  ImageList_default as default
};
//# sourceMappingURL=ImageList.js.map
