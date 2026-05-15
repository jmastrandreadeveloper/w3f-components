import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton, RadioGroup } from "../RadioButton";
describe("RadioButton", () => {
  it("has displayName set", () => {
    expect(RadioButton.displayName).toBe("RadioButton");
  });
  it("RadioGroup has displayName set", () => {
    expect(RadioGroup.displayName).toBe("RadioGroup");
  });
});
describe("RadioGroup", () => {
  const renderGroup = (props = {}) => render(
    /* @__PURE__ */ jsxs(RadioGroup, { label: "Fruit", ...props, children: [
      /* @__PURE__ */ jsx(RadioButton, { label: "Apple", value: "apple" }),
      /* @__PURE__ */ jsx(RadioButton, { label: "Banana", value: "banana" }),
      /* @__PURE__ */ jsx(RadioButton, { label: "Cherry", value: "cherry" })
    ] })
  );
  it("renders a radiogroup", () => {
    renderGroup();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });
  it("renders all radio buttons", () => {
    renderGroup();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });
  it("renders legend label", () => {
    renderGroup();
    expect(screen.getByText("Fruit")).toBeInTheDocument();
  });
  it("renders required indicator", () => {
    renderGroup({ required: true });
    expect(screen.getByText("*")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = renderGroup({ className: "custom-group" });
    expect(container.firstElementChild).toHaveClass("custom-group");
  });
  it("fires onChange when a radio is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderGroup({ onChange });
    await user.click(screen.getByLabelText("Apple"));
    expect(onChange).toHaveBeenCalledWith("apple");
  });
  it("selects the correct radio", async () => {
    const user = userEvent.setup();
    renderGroup();
    await user.click(screen.getByLabelText("Banana"));
    expect(screen.getByLabelText("Banana")).toBeChecked();
  });
  it("shows error message with role alert", () => {
    renderGroup({ error: "Select one" });
    expect(screen.getByRole("alert")).toHaveTextContent("Select one");
  });
  it("shows selection panel when showSelection is true and value selected", async () => {
    const user = userEvent.setup();
    renderGroup({ showSelection: true });
    await user.click(screen.getByLabelText("Apple"));
    expect(screen.getByRole("status")).toHaveTextContent("apple");
  });
  it("disables individual radio button", () => {
    render(
      /* @__PURE__ */ jsxs(RadioGroup, { label: "Test", children: [
        /* @__PURE__ */ jsx(RadioButton, { label: "A", value: "a", disabled: true }),
        /* @__PURE__ */ jsx(RadioButton, { label: "B", value: "b" })
      ] })
    );
    expect(screen.getByLabelText("A")).toBeDisabled();
    expect(screen.getByLabelText("B")).not.toBeDisabled();
  });
  it("forwards ref to the wrapper div", () => {
    const ref = { current: null };
    render(
      /* @__PURE__ */ jsx(RadioGroup, { label: "Test", ref, children: /* @__PURE__ */ jsx(RadioButton, { label: "A", value: "a" }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
//# sourceMappingURL=RadioButton.test.js.map
