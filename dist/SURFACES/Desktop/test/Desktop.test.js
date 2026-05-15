import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Desktop from "../Desktop";
describe("Desktop", () => {
  it("renders with base class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Desktop, { children: /* @__PURE__ */ jsx("div", { children: "Win1" }) }));
    const root = container.querySelector(".w3f-desktop");
    expect(root).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(Desktop.displayName).toBe("Desktop");
  });
  it("renders children", () => {
    render(
      /* @__PURE__ */ jsxs(Desktop, { children: [
        /* @__PURE__ */ jsx("div", { children: "Window A" }),
        /* @__PURE__ */ jsx("div", { children: "Window B" })
      ] })
    );
    expect(screen.getByText("Window A")).toBeInTheDocument();
    expect(screen.getByText("Window B")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Desktop, { className: "my-desktop", children: /* @__PURE__ */ jsx("div", { children: "Win" }) }));
    const root = container.querySelector(".w3f-desktop");
    expect(root).toHaveClass("my-desktop");
  });
  it("applies background style", () => {
    const { container } = render(/* @__PURE__ */ jsx(Desktop, { background: "#ff0000", children: /* @__PURE__ */ jsx("div", { children: "Win" }) }));
    const root = container.querySelector(".w3f-desktop");
    expect(root).toHaveStyle({ background: "#ff0000" });
  });
  it("applies default background", () => {
    const { container } = render(/* @__PURE__ */ jsx(Desktop, { children: /* @__PURE__ */ jsx("div", { children: "Win" }) }));
    const root = container.querySelector(".w3f-desktop");
    expect(root).toHaveStyle({ background: "#f0f2f5" });
  });
  it("applies full viewport height", () => {
    const { container } = render(/* @__PURE__ */ jsx(Desktop, { children: /* @__PURE__ */ jsx("div", { children: "Win" }) }));
    const root = container.querySelector(".w3f-desktop");
    expect(root).toHaveStyle({ height: "100vh" });
  });
  it("passes additional style prop to root element", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Desktop, { style: { border: "1px solid red" }, children: /* @__PURE__ */ jsx("div", { children: "Win" }) })
    );
    const root = container.querySelector(".w3f-desktop");
    expect(root).toBeInTheDocument();
  });
});
//# sourceMappingURL=Desktop.test.js.map
