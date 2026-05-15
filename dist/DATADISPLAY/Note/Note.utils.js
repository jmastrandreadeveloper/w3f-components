import { NOTE_VARIANT_CLASSES } from "./Note.constants";
const buildNoteClasses = (type, round, shadow, border, fullBorder, className, unstyled, variant) => {
  if (unstyled) {
    return [
      "w3f-note",
      "w3f-note--unstyled",
      className
    ].filter(Boolean).join(" ");
  }
  const classes = [
    "w3f-note",
    `w3f-note-${type}`
  ];
  if (round === true) classes.push("w3f-round-md");
  else if (typeof round === "string") classes.push(`w3f-round-${round}`);
  if (shadow === true) classes.push("w3f-shadow-md");
  else if (typeof shadow === "string") classes.push(`w3f-shadow-${shadow}`);
  if (fullBorder || border === true) {
    classes.push("w3f-border-full");
  } else {
    const borders = Array.isArray(border) ? border : [border];
    for (const side of borders) {
      switch (side) {
        case "left":
          classes.push("w3f-border-l-4");
          break;
        case "right":
          classes.push("w3f-border-r-4");
          break;
        case "top":
          classes.push("w3f-border-t-4");
          break;
        case "bottom":
          classes.push("w3f-border-b-4");
          break;
        default:
          break;
      }
    }
  }
  if (variant && NOTE_VARIANT_CLASSES[variant]) {
    classes.push(NOTE_VARIANT_CLASSES[variant]);
  }
  if (className) classes.push(className);
  return classes.filter(Boolean).join(" ");
};
export {
  buildNoteClasses
};
//# sourceMappingURL=Note.utils.js.map
