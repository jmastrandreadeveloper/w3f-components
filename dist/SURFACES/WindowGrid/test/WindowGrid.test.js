import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { WindowGrid } from "../WindowGrid";
import { createRef } from "react";
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
    }
    unobserve() {
    }
    disconnect() {
    }
  };
});
describe("WindowGrid", () => {
  it("renders with base window class and grid class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(WindowGrid, { title: "Grid Window", children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-window")).toBeInTheDocument();
    expect(container.querySelector(".w3f-window-grid")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(WindowGrid.displayName).toBe("WindowGrid");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(/* @__PURE__ */ jsx(WindowGrid, { ref, title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders title", () => {
    render(/* @__PURE__ */ jsx(WindowGrid, { title: "Dashboard", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
  it("renders children", () => {
    render(
      /* @__PURE__ */ jsxs(WindowGrid, { title: "Test", children: [
        /* @__PURE__ */ jsx("div", { children: "Card 1" }),
        /* @__PURE__ */ jsx("div", { children: "Card 2" })
      ] })
    );
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });
  it("renders body with grid body class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(WindowGrid, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-window-grid-body")).toBeInTheDocument();
  });
  it("renders titlebar", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(WindowGrid, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-window-titlebar")).toBeInTheDocument();
  });
  it("renders nothing when open=false", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(WindowGrid, { title: "Test", open: false, children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-window")).not.toBeInTheDocument();
  });
  it("renders overlay when modal", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(WindowGrid, { title: "Test", modal: true, children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-window-overlay")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(WindowGrid, { title: "Test", className: "my-grid-win", children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-window")).toHaveClass("my-grid-win");
  });
  it("renders control buttons", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(WindowGrid, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-window-control-btn--close")).toBeInTheDocument();
    expect(container.querySelector(".w3f-window-control-btn--minimize")).toBeInTheDocument();
    expect(container.querySelector(".w3f-window-control-btn--maximize")).toBeInTheDocument();
  });
});
//# sourceMappingURL=WindowGrid.test.js.map
