"use client";
import { jsx } from "react/jsx-runtime";
import { CONTAINER_DEFAULTS } from "./Container.constants";
import { useContainerProps } from "./Container.hooks";
const Container = ({
  children,
  as: Element = CONTAINER_DEFAULTS.as,
  ...props
}) => {
  const processedProps = useContainerProps(props);
  return /* @__PURE__ */ jsx(Element, { ...processedProps, children });
};
Container.displayName = "Container";
var Container_default = Container;
export {
  Container,
  Container_default as default
};
//# sourceMappingURL=Container.js.map
