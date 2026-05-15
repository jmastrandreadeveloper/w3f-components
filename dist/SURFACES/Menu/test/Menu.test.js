import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuBarCategory, MenuItem } from "../Menu";
import { createRef } from "react";
const sampleItems = [
  { label: "New", id: "new" },
  { label: "Open", id: "open" },
  { label: "Export", id: "export", subItems: [{ label: "PDF", id: "pdf" }, { label: "PNG", id: "png" }] }
];
describe("MenuBarCategory", () => {
  it("renders with container class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(MenuBarCategory, { label: "File", items: sampleItems })
    );
    expect(container.querySelector(".w3f-nested-menu-container")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(MenuBarCategory.displayName).toBe("MenuBarCategory");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(/* @__PURE__ */ jsx(MenuBarCategory, { ref, label: "File", items: sampleItems }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders trigger button with label", () => {
    render(/* @__PURE__ */ jsx(MenuBarCategory, { label: "File", items: sampleItems }));
    expect(screen.getByText("File")).toBeInTheDocument();
  });
  it("trigger has correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(MenuBarCategory, { label: "File", items: sampleItems })
    );
    expect(container.querySelector(".w3f-nested-menu-trigger")).toBeInTheDocument();
  });
  it("does not show dropdown by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(MenuBarCategory, { label: "File", items: sampleItems })
    );
    expect(container.querySelector(".w3f-nested-menu-dropdown")).not.toBeInTheDocument();
  });
  it("shows dropdown when trigger is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      /* @__PURE__ */ jsx(MenuBarCategory, { label: "File", items: sampleItems })
    );
    await user.click(screen.getByText("File"));
    expect(container.querySelector(".w3f-nested-menu-dropdown")).toBeInTheDocument();
  });
  it("renders menu items inside dropdown", async () => {
    const user = userEvent.setup();
    render(/* @__PURE__ */ jsx(MenuBarCategory, { label: "File", items: sampleItems }));
    await user.click(screen.getByText("File"));
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Export")).toBeInTheDocument();
  });
  it("shows arrow for items with subItems", async () => {
    const user = userEvent.setup();
    const { container } = render(
      /* @__PURE__ */ jsx(MenuBarCategory, { label: "File", items: sampleItems })
    );
    await user.click(screen.getByText("File"));
    const arrows = container.querySelectorAll(".w3f-nested-menu-arrow");
    expect(arrows.length).toBe(1);
  });
});
describe("MenuItem", () => {
  it("has displayName set", () => {
    expect(MenuItem.displayName).toBe("MenuItem");
  });
  it("renders item with correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(MenuItem, { item: { label: "Test" }, onClose: () => {
      } })
    );
    expect(container.querySelector(".w3f-nested-menu-item")).toBeInTheDocument();
  });
  it("calls onSelect when leaf item is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onClose = vi.fn();
    render(
      /* @__PURE__ */ jsx(MenuItem, { item: { label: "Test" }, onClose, onSelect })
    );
    await user.click(screen.getByText("Test"));
    expect(onSelect).toHaveBeenCalledWith("Test");
    expect(onClose).toHaveBeenCalled();
  });
});
//# sourceMappingURL=Menu.test.js.map
