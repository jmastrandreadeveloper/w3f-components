import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Window } from "../Window";
import { createRef } from "react";
describe("Window", () => {
  it("renders with base class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test Window", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window")).toBeInTheDocument();
  });
  it("has displayName set", () => {
    expect(Window.displayName).toBe("Window");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(/* @__PURE__ */ jsx(Window, { ref, title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders title", () => {
    render(/* @__PURE__ */ jsx(Window, { title: "My Window", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(screen.getByText("My Window")).toBeInTheDocument();
  });
  it("renders children in body", () => {
    render(/* @__PURE__ */ jsx(Window, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Body content" }) }));
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });
  it("renders titlebar with correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window-titlebar")).toBeInTheDocument();
  });
  it("renders body with correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window-body")).toBeInTheDocument();
  });
  it("renders control buttons by default", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window-control-btn--close")).toBeInTheDocument();
    expect(container.querySelector(".w3f-window-control-btn--minimize")).toBeInTheDocument();
    expect(container.querySelector(".w3f-window-control-btn--maximize")).toBeInTheDocument();
  });
  it("hides close button when closable=false", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", closable: false, children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window-control-btn--close")).not.toBeInTheDocument();
  });
  it("hides minimize button when minimizable=false", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", minimizable: false, children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window-control-btn--minimize")).not.toBeInTheDocument();
  });
  it("renders nothing when open=false", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", open: false, children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window")).not.toBeInTheDocument();
  });
  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(/* @__PURE__ */ jsx(Window, { title: "Test", onClose, children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    const closeBtn = screen.getByLabelText("Cerrar");
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
  it("renders overlay when modal=true", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", modal: true, children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window-overlay")).toBeInTheDocument();
    expect(container.querySelector(".w3f-window--modal")).toBeInTheDocument();
  });
  it("renders footer with buttons", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Window, { title: "Test", footer: /* @__PURE__ */ jsx("div", { children: "Footer content" }), children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
    );
    expect(screen.getByText("Footer content")).toBeInTheDocument();
    expect(container.querySelector(".w3f-window-footer")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", className: "my-win", children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    expect(container.querySelector(".w3f-window")).toHaveClass("my-win");
  });
  it("renders resize handles when resizable", () => {
    const { container } = render(/* @__PURE__ */ jsx(Window, { title: "Test", resizable: true, children: /* @__PURE__ */ jsx("p", { children: "Content" }) }));
    const handles = container.querySelectorAll('[class*="w3f-window-resize-handle"]');
    expect(handles.length).toBe(8);
  });
});
//# sourceMappingURL=Window.test.js.map
