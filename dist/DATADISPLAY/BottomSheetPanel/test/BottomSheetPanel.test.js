import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BottomSheetPanel from "../BottomSheetPanel";
describe("BottomSheetPanel", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn()
  };
  it("renders when open", () => {
    render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, children: /* @__PURE__ */ jsx("p", { children: "Panel content" }) })
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
  it("does not render when closed", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { isOpen: false, onClose: vi.fn(), children: /* @__PURE__ */ jsx("p", { children: "Hidden" }) })
    );
    expect(container.firstElementChild).toBeNull();
  });
  it("has displayName set", () => {
    expect(BottomSheetPanel.displayName).toBe("BottomSheetPanel");
  });
  it("renders title", () => {
    render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, title: "My Panel", children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    expect(screen.getByText("My Panel")).toBeInTheDocument();
    expect(screen.getByText("My Panel")).toHaveClass("bottom-sheet-title");
  });
  it("renders children in content area", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, children: /* @__PURE__ */ jsx("p", { children: "Hello" }) })
    );
    const content = container.querySelector(".bottom-sheet-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Hello");
  });
  it("renders footer", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, footer: /* @__PURE__ */ jsx("button", { children: "Save" }), children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    const footer = container.querySelector(".bottom-sheet-footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("Save");
  });
  it("renders close button by default", () => {
    render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    expect(screen.getByLabelText("Cerrar panel")).toBeInTheDocument();
  });
  it("hides close button when showCloseButton=false", () => {
    render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, showCloseButton: false, title: "T", children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    expect(screen.queryByLabelText("Cerrar panel")).toBeNull();
  });
  it("applies size class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, size: "large", children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    const panel = container.querySelector(".bottom-sheet-panel");
    expect(panel).toHaveClass("bottom-sheet-panel--large");
  });
  it("applies custom className", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, className: "my-panel", children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    const panel = container.querySelector(".bottom-sheet-panel");
    expect(panel).toHaveClass("my-panel");
  });
  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { isOpen: true, onClose, children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    await userEvent.click(screen.getByLabelText("Cerrar panel"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  it("has correct ARIA attributes on the dialog", () => {
    render(
      /* @__PURE__ */ jsx(BottomSheetPanel, { ...defaultProps, title: "Test", children: /* @__PURE__ */ jsx("p", { children: "content" }) })
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "bottom-sheet-title");
  });
});
//# sourceMappingURL=BottomSheetPanel.test.js.map
