import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SlideToggle from "../SlideToggle";
describe("SlideToggle", () => {
  it("renders a switch role element", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, {}));
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });
  it("renders with label", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, { label: "Dark mode" }));
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
  });
  it("applies the base class w3f-slide-toggle", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, {}));
    expect(screen.getByRole("switch")).toHaveClass("w3f-slide-toggle");
  });
  it("applies custom className to wrapper", () => {
    const { container } = render(/* @__PURE__ */ jsx(SlideToggle, { className: "custom" }));
    expect(container.firstElementChild).toHaveClass("custom");
  });
  it("sets aria-checked to false by default", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, {}));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });
  it("sets aria-checked to true when checked", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, { checked: true }));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });
  it("applies aria-disabled when disabled", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, { disabled: true }));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-disabled", "true");
  });
  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(SlideToggle, { disabled: true, onChange }));
    await user.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });
  it("fires onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(SlideToggle, { onChange }));
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it("shows error message with role alert", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, { error: "Required" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
  it("shows helper text", () => {
    render(/* @__PURE__ */ jsx(SlideToggle, { helperText: "Toggle this" }));
    expect(screen.getByText("Toggle this")).toBeInTheDocument();
  });
  it("forwards ref to wrapper div", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(SlideToggle, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("has displayName set", () => {
    expect(SlideToggle.displayName).toBe("SlideToggle");
  });
});
//# sourceMappingURL=SlideToggle.test.js.map
