const TRANSFORM_MAP = {
  "rotate-45": "rotate(45deg)",
  "rotate-neg45": "rotate(-45deg)",
  "rotate-90": "rotate(90deg)",
  "rotate-neg90": "rotate(-90deg)",
  "rotate-180": "rotate(180deg)",
  "skew-left": "skewX(-20deg)",
  "skew-right": "skewX(20deg)",
  "skew-up": "skewY(-10deg)",
  "skew-down": "skewY(10deg)",
  "mirror-h": "scaleX(-1)",
  "mirror-v": "scaleY(-1)",
  "scale-wide": "scaleX(2)",
  "scale-narrow": "scaleX(0.5)",
  "scale-tall": "scaleY(2)",
  "scale-flat": "scaleY(0.4)",
  "perspective-up": "perspective(300px) rotateX(35deg)",
  "perspective-down": "perspective(300px) rotateX(-35deg)",
  "perspective-right": "perspective(300px) rotateY(45deg)",
  "perspective-left": "perspective(300px) rotateY(-45deg)",
  "perspective-3d": "perspective(400px) rotateX(20deg) rotateY(25deg)"
};
const buildFontsStyle = (writingMode, transform) => {
  const style = {};
  let hasStyle = false;
  const isStacked = writingMode === "vertical-stacked" || writingMode === "vertical-stacked-up";
  if (writingMode !== "horizontal" && !isStacked) {
    hasStyle = true;
    style.display = "inline-block";
    style.writingMode = "vertical-lr";
    const upright = writingMode === "vertical-down-upright" || writingMode === "vertical-up-upright";
    style.textOrientation = upright ? "upright" : "sideways";
    if (writingMode === "vertical-up-rotated" || writingMode === "vertical-up-upright") {
      style.transform = "rotate(180deg)";
    }
  }
  if (transform !== "none") {
    const t = TRANSFORM_MAP[transform];
    if (t) {
      hasStyle = true;
      style.display = "inline-block";
      style.transform = style.transform ? `${style.transform} ${t}` : t;
    }
  }
  return hasStyle ? style : void 0;
};
const FONT_SIZES_MAP = {
  "2xs": "w3f-text-2xs",
  "xs": "w3f-text-xs",
  "sm": "w3f-text-sm",
  "base": "w3f-text-base",
  "lg": "w3f-text-lg",
  "xl": "w3f-text-xl",
  "2xl": "w3f-text-2xl",
  "3xl": "w3f-text-3xl",
  "4xl": "w3f-text-4xl",
  "5xl": "w3f-text-5xl",
  "6xl": "w3f-text-6xl"
};
const FONT_STYLES_MAP = {
  "sans": "w3f-font-sans",
  "display": "w3f-font-display",
  "mono": "w3f-font-mono",
  "roboto": "w3f-font-roboto",
  "playfair": "w3f-font-playfair",
  "spacemono": "w3f-font-space-mono"
};
const FONT_WEIGHTS_MAP = {
  "thin": "w3f-font-thin",
  "extralight": "w3f-font-extralight",
  "light": "w3f-font-light",
  "normal": "w3f-font-normal",
  "medium": "w3f-font-medium",
  "semibold": "w3f-font-semibold",
  "bold": "w3f-font-bold",
  "extrabold": "w3f-font-extrabold",
  "black": "w3f-font-black"
};
const generateOptions = (map, labelTransform = (key) => key.toUpperCase()) => {
  return Object.keys(map).map((key) => ({
    value: key,
    label: labelTransform(key),
    className: map[key]
  }));
};
const FONT_SIZE_OPTIONS = generateOptions(FONT_SIZES_MAP, (key) => key.toUpperCase());
const FONT_FAMILY_OPTIONS = generateOptions(FONT_STYLES_MAP, (key) => key.charAt(0).toUpperCase() + key.slice(1));
const FONT_WEIGHT_OPTIONS = generateOptions(FONT_WEIGHTS_MAP, (key) => key.charAt(0).toUpperCase() + key.slice(1));
const formatLabel = (text) => {
  return text.toUpperCase().replace(/[()]/g, "");
};
const buildFontsClasses = (size, family, weight, italic, underline, unstyled, customClasses) => {
  const base = "w3f-fonts";
  if (unstyled) return [base, `${base}--unstyled`, customClasses].filter(Boolean).join(" ");
  const classes = [
    base,
    FONT_SIZES_MAP[size] || FONT_SIZES_MAP.base,
    FONT_STYLES_MAP[family] || FONT_STYLES_MAP.sans,
    FONT_WEIGHTS_MAP[weight] || FONT_WEIGHTS_MAP.normal
  ];
  if (italic) classes.push("w3f-italic");
  if (underline) classes.push("w3f-underline");
  if (customClasses) classes.push(customClasses);
  return classes.filter(Boolean).join(" ");
};
export {
  FONT_FAMILY_OPTIONS,
  FONT_SIZES_MAP,
  FONT_SIZE_OPTIONS,
  FONT_STYLES_MAP,
  FONT_WEIGHTS_MAP,
  FONT_WEIGHT_OPTIONS,
  buildFontsClasses,
  buildFontsStyle,
  formatLabel,
  generateOptions
};
//# sourceMappingURL=Fonts.utils.js.map
