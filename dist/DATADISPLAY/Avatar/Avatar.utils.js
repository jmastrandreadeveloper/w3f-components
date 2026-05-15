import { AVATAR_SIZE_CLASSES } from "./Avatar.constants";
function buildAvatarClasses(size, hoverable, src, color, className, unstyled) {
  if (unstyled) {
    return [
      "w3f-avatar",
      "w3f-avatar--unstyled",
      AVATAR_SIZE_CLASSES[size] || AVATAR_SIZE_CLASSES.medium,
      className
    ].filter(Boolean).join(" ");
  }
  return [
    "w3f-avatar",
    "w3f-avatar-circle",
    AVATAR_SIZE_CLASSES[size] || AVATAR_SIZE_CLASSES.medium,
    hoverable && "w3f-avatar-hoverable",
    !src && `w3f-avatar-${color}`,
    className
  ].filter(Boolean).join(" ");
}
export {
  buildAvatarClasses
};
//# sourceMappingURL=Avatar.utils.js.map
