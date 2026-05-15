import { useState } from "react";
import {
  FONT_SIZES_MAP,
  FONT_STYLES_MAP,
  FONT_WEIGHTS_MAP,
  FONT_SIZE_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_WEIGHT_OPTIONS
} from "./Fonts.utils";
const useFonts = () => {
  const [selectedSize, setSelectedSize] = useState("base");
  const [selectedFamily, setSelectedFamily] = useState("sans");
  const [selectedWeight, setSelectedWeight] = useState("normal");
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const getFontClasses = (baseClasses = "") => {
    const classes = [
      baseClasses,
      FONT_SIZES_MAP[selectedSize],
      FONT_STYLES_MAP[selectedFamily],
      FONT_WEIGHTS_MAP[selectedWeight]
    ];
    if (isItalic) classes.push("w3f-italic");
    if (isUnderline) classes.push("w3f-underline");
    return classes.filter(Boolean).join(" ");
  };
  const resetToDefaults = () => {
    setSelectedSize("base");
    setSelectedFamily("sans");
    setSelectedWeight("normal");
    setIsItalic(false);
    setIsUnderline(false);
  };
  return {
    selectedSize,
    setSelectedSize,
    selectedFamily,
    setSelectedFamily,
    selectedWeight,
    setSelectedWeight,
    isItalic,
    setIsItalic,
    isUnderline,
    setIsUnderline,
    getFontClasses,
    resetToDefaults,
    FONT_SIZES: FONT_SIZE_OPTIONS,
    FONT_FAMILIES: FONT_FAMILY_OPTIONS,
    FONT_WEIGHTS: FONT_WEIGHT_OPTIONS
  };
};
export {
  useFonts
};
//# sourceMappingURL=Fonts.hooks.js.map
