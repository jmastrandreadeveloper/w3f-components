import { buildContainerClass } from "./Container.utils";
const useContainerProps = ({ className = "", ...restProps }) => {
  const finalClassName = buildContainerClass(className);
  return {
    className: finalClassName,
    ...restProps
  };
};
export {
  useContainerProps
};
//# sourceMappingURL=Container.hooks.js.map
