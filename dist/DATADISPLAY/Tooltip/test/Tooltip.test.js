import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from "../Tooltip";
describe("Tooltip", () => {
  it("renders children and tooltip wrapper", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Tooltip, { config: { message: "Hint" }, children: /* @__PURE__ */ jsx("button", { children: "Hover me" }) })
    );
    expect(container.querySelector(".w3f-tooltip-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(Tooltip.displayName).toBe("Tooltip");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(
      /* @__PURE__ */ jsx(Tooltip, { ref, config: { message: "Tip" }, children: /* @__PURE__ */ jsx("span", { children: "Target" }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("w3f-tooltip-wrapper");
  });
  it("renders tooltip content with correct classes", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Tooltip, { config: { message: "Info", position: "bottom", variant: "primary" }, children: /* @__PURE__ */ jsx("span", { children: "T" }) })
    );
    const tooltipContent = container.querySelector(".w3f-tooltip-content");
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveClass("w3f-tooltip-bottom");
    expect(tooltipContent).toHaveClass("w3f-tooltip-primary");
  });
  it("defaults to top position and dark variant", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Tooltip, { children: /* @__PURE__ */ jsx("span", { children: "Default" }) })
    );
    const tooltipContent = container.querySelector(".w3f-tooltip-content");
    expect(tooltipContent).toHaveClass("w3f-tooltip-top");
    expect(tooltipContent).toHaveClass("w3f-tooltip-dark");
  });
  it("renders arrow by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Tooltip, { config: { message: "Arrow", position: "left" }, children: /* @__PURE__ */ jsx("span", { children: "A" }) })
    );
    const arrow = container.querySelector(".w3f-tooltip-arrow");
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveClass("w3f-tooltip-arrow-left");
  });
  it("hides arrow when arrow=false", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Tooltip, { config: { message: "No arrow", arrow: false }, children: /* @__PURE__ */ jsx("span", { children: "A" }) })
    );
    expect(container.querySelector(".w3f-tooltip-arrow")).toBeNull();
  });
  it("shows tooltip on mouse enter", async () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Tooltip, { config: { message: "Visible" }, children: /* @__PURE__ */ jsx("span", { children: "Hover" }) })
    );
    const wrapper = container.querySelector(".w3f-tooltip-wrapper");
    await userEvent.hover(wrapper);
    const tooltipContent = container.querySelector(".w3f-tooltip-content");
    expect(tooltipContent).toHaveClass("w3f-tooltip-visible");
  });
  it("hides tooltip on mouse leave", async () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Tooltip, { config: { message: "Hidden" }, children: /* @__PURE__ */ jsx("span", { children: "Hover" }) })
    );
    const wrapper = container.querySelector(".w3f-tooltip-wrapper");
    await userEvent.hover(wrapper);
    await userEvent.unhover(wrapper);
    const tooltipContent = container.querySelector(".w3f-tooltip-content");
    expect(tooltipContent).not.toHaveClass("w3f-tooltip-visible");
  });
  it("renders tooltip message text", () => {
    render(
      /* @__PURE__ */ jsx(Tooltip, { config: { message: "Custom message" }, children: /* @__PURE__ */ jsx("span", { children: "Target" }) })
    );
    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });
});
//# sourceMappingURL=Tooltip.test.js.map
