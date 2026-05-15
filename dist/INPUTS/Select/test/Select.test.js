import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../Select";
const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" }
];
describe("Select", () => {
  it("renders a select element", () => {
    render(/* @__PURE__ */ jsx(Select, { label: "Pick", options }));
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  it("renders all options", () => {
    render(/* @__PURE__ */ jsx(Select, { label: "Pick", options }));
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });
  it("applies container class w3f-select-container", () => {
    const { container } = render(/* @__PURE__ */ jsx(Select, { label: "Pick", options }));
    expect(container.querySelector(".w3f-select-container")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Select, { label: "Pick", options, className: "custom" }));
    expect(container.firstElementChild).toHaveClass("custom");
  });
  it("renders label text", () => {
    render(/* @__PURE__ */ jsx(Select, { label: "Country", options }));
    expect(screen.getByText("Country")).toBeInTheDocument();
  });
  it("renders required indicator", () => {
    render(/* @__PURE__ */ jsx(Select, { label: "Country", options, required: true }));
    expect(screen.getByText("*")).toBeInTheDocument();
  });
  it("disables the select", () => {
    render(/* @__PURE__ */ jsx(Select, { label: "Pick", options, disabled: true }));
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
  it("fires onChange when value changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(Select, { label: "Pick", options, onChange }));
    await user.selectOptions(screen.getByRole("combobox"), "a");
    expect(onChange).toHaveBeenCalled();
  });
  it("shows error message with role alert", () => {
    render(/* @__PURE__ */ jsx(Select, { label: "Pick", options, error: "Required" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
  it("shows helper text", () => {
    render(/* @__PURE__ */ jsx(Select, { label: "Pick", options, helperText: "Choose one" }));
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });
  it("forwards ref to the select element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Select, { label: "Pick", options, ref }));
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
  it("has displayName set", () => {
    expect(Select.displayName).toBe("Select");
  });
});
//# sourceMappingURL=Select.test.js.map
