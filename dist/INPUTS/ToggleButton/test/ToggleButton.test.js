import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleButton, ToggleButtonGroup } from "../ToggleButton";
describe("ToggleButton", () => {
  it("renders a button element", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", children: "A" }));
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("renders children text", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "bold", children: "Bold" }));
    expect(screen.getByRole("button")).toHaveTextContent("Bold");
  });
  it("applies base class w3f-toggle-button", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", children: "A" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-toggle-button");
  });
  it("applies selected class when selected", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", selected: true, children: "A" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-toggle-button--selected");
  });
  it("applies size modifier class", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", size: "lg", children: "A" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-toggle-button--lg");
  });
  it("applies fullWidth class", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", fullWidth: true, children: "A" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-toggle-button--full");
  });
  it("applies disabled class", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", disabled: true, children: "A" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-toggle-button--disabled");
  });
  it("applies custom className", () => {
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", className: "custom", children: "A" }));
    expect(screen.getByRole("button")).toHaveClass("custom");
  });
  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "a", disabled: true, onChange, children: "A" }));
    await user.click(screen.getByRole("button"));
    expect(onChange).not.toHaveBeenCalled();
  });
  it("fires onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(ToggleButton, { value: "bold", onChange, children: "Bold" }));
    await user.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalled();
  });
  it("has displayName set", () => {
    expect(ToggleButton.displayName).toBe("ToggleButton");
  });
});
describe("ToggleButtonGroup", () => {
  const renderGroup = (props = {}) => render(
    /* @__PURE__ */ jsxs(ToggleButtonGroup, { ...props, children: [
      /* @__PURE__ */ jsx(ToggleButton, { value: "bold", children: "B" }),
      /* @__PURE__ */ jsx(ToggleButton, { value: "italic", children: "I" }),
      /* @__PURE__ */ jsx(ToggleButton, { value: "underline", children: "U" })
    ] })
  );
  it("renders a group element", () => {
    renderGroup();
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
  it("renders all toggle buttons", () => {
    renderGroup();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });
  it("applies wrapper class w3f-toggle-group-wrapper", () => {
    const { container } = renderGroup();
    expect(container.querySelector(".w3f-toggle-group-wrapper")).toBeInTheDocument();
  });
  it("renders label", () => {
    renderGroup({ label: "Format" });
    expect(screen.getByText("Format")).toBeInTheDocument();
  });
  it("renders required indicator", () => {
    renderGroup({ label: "Format", required: true });
    expect(screen.getByText("*")).toBeInTheDocument();
  });
  it("uses radiogroup role when exclusive", () => {
    renderGroup({ exclusive: true });
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });
  it("shows error message with role alert", () => {
    renderGroup({ error: "Select one" });
    expect(screen.getByRole("alert")).toHaveTextContent("Select one");
  });
  it("shows helper text", () => {
    renderGroup({ helperText: "Pick formatting" });
    expect(screen.getByText("Pick formatting")).toBeInTheDocument();
  });
  it("forwards ref to wrapper div", () => {
    const ref = { current: null };
    render(
      /* @__PURE__ */ jsx(ToggleButtonGroup, { ref, children: /* @__PURE__ */ jsx(ToggleButton, { value: "a", children: "A" }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("has displayName set", () => {
    expect(ToggleButtonGroup.displayName).toBe("ToggleButtonGroup");
  });
});
//# sourceMappingURL=ToggleButton.test.js.map
