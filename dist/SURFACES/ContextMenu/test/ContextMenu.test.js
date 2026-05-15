import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContextMenu, ContextMenuItem } from "../ContextMenu";
import { createRef } from "react";
const sampleItems = [
  { label: "Copy", id: "copy" },
  { label: "Paste", id: "paste" },
  { label: "More", id: "more", subItems: [{ label: "Option A", id: "a" }] }
];
describe("ContextMenu", () => {
  it("renders children in wrapper", () => {
    render(
      /* @__PURE__ */ jsx(ContextMenu, { items: sampleItems, children: /* @__PURE__ */ jsx("div", { children: "Right click here" }) })
    );
    expect(screen.getByText("Right click here")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(ContextMenu.displayName).toBe("ContextMenu");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(
      /* @__PURE__ */ jsx(ContextMenu, { ref, items: sampleItems, children: /* @__PURE__ */ jsx("div", { children: "Content" }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("wrapper has correct CSS class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(ContextMenu, { items: sampleItems, children: /* @__PURE__ */ jsx("div", { children: "Content" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-context-menu-wrapper");
  });
  it("does not show dropdown by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(ContextMenu, { items: sampleItems, children: /* @__PURE__ */ jsx("div", { children: "Content" }) })
    );
    expect(container.querySelector(".w3f-nested-menu-dropdown")).not.toBeInTheDocument();
  });
  it("shows dropdown on context menu event", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(ContextMenu, { items: sampleItems, children: /* @__PURE__ */ jsx("div", { children: "Content" }) })
    );
    fireEvent.contextMenu(container.firstChild);
    expect(container.querySelector(".w3f-nested-menu-dropdown")).toBeInTheDocument();
  });
  it("renders menu items inside dropdown", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(ContextMenu, { items: sampleItems, children: /* @__PURE__ */ jsx("div", { children: "Content" }) })
    );
    fireEvent.contextMenu(container.firstChild);
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Paste")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });
  it("ContextMenuItem has displayName", () => {
    expect(ContextMenuItem.displayName).toBe("ContextMenuItem");
  });
  it("shows arrow indicator for items with subItems", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(ContextMenu, { items: sampleItems, children: /* @__PURE__ */ jsx("div", { children: "Content" }) })
    );
    fireEvent.contextMenu(container.firstChild);
    const arrows = container.querySelectorAll(".w3f-nested-menu-arrow");
    expect(arrows.length).toBeGreaterThanOrEqual(1);
  });
});
//# sourceMappingURL=ContextMenu.test.js.map
