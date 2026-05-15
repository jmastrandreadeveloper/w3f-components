import { ICON_REGISTRY } from "./Icon.registry";
import { resolveIconName, resolveIconSize, resolveIconColor } from "./Icon.utils";
import { IconDefaults } from "./Icon.constants";
const useIcon = ({
  name,
  size = IconDefaults.size,
  color = IconDefaults.color,
  className = IconDefaults.className
}) => {
  const resolvedName = resolveIconName(name);
  const resolvedSize = resolveIconSize(size);
  const resolvedColor = resolveIconColor(color);
  const LucideIcon = resolvedName ? ICON_REGISTRY[resolvedName] || null : null;
  return {
    LucideIcon,
    size: resolvedSize,
    color: resolvedColor,
    className,
    name: resolvedName
  };
};
var Icon_hooks_default = useIcon;
export {
  Icon_hooks_default as default
};
//# sourceMappingURL=Icon.hooks.js.map
