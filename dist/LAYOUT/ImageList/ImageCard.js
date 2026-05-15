"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const ImageCard = ({ item, height }) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(
    "img",
    {
      src: item.src,
      alt: item.title,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        minHeight: typeof height === "number" ? "100%" : "auto"
      }
    }
  ),
  item.title && /* @__PURE__ */ jsx("div", { style: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "8px 12px",
    fontSize: "0.9rem"
  }, children: item.title })
] });
ImageCard.displayName = "ImageCard";
var ImageCard_default = ImageCard;
export {
  ImageCard,
  ImageCard_default as default
};
//# sourceMappingURL=ImageCard.js.map
