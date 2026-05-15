import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../Input";
describe("Input", () => {
  it("renders an input element", () => {
    render(/* @__PURE__ */ jsx(Input, { label: "Name" }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("renders the label text", () => {
    render(/* @__PURE__ */ jsx(Input, { label: "Email" }));
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
  it("applies the container class w3f-input-container", () => {
    const { container } = render(/* @__PURE__ */ jsx(Input, { label: "Test" }));
    expect(container.querySelector(".w3f-input-container")).toBeInTheDocument();
  });
  it("applies the wrapper class w3f-input-wrapper", () => {
    const { container } = render(/* @__PURE__ */ jsx(Input, { label: "Test" }));
    expect(container.querySelector(".w3f-input-wrapper")).toBeInTheDocument();
  });
  it("applies custom className to container", () => {
    const { container } = render(/* @__PURE__ */ jsx(Input, { label: "Test", className: "my-custom" }));
    expect(container.firstElementChild).toHaveClass("my-custom");
  });
  it("renders required indicator when required", () => {
    render(/* @__PURE__ */ jsx(Input, { label: "Name", required: true }));
    expect(screen.getByText("*")).toBeInTheDocument();
  });
  it("sets input type", () => {
    render(/* @__PURE__ */ jsx(Input, { label: "Pass", type: "password" }));
    expect(screen.getByLabelText("Pass")).toHaveAttribute("type", "password");
  });
  it("disables the input", () => {
    render(/* @__PURE__ */ jsx(Input, { label: "Disabled", disabled: true }));
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
  it("fires onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(Input, { label: "Name", value: "", onChange }));
    await user.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });
  it("shows error message with role alert", () => {
    render(/* @__PURE__ */ jsx(Input, { label: "Email", error: "Required", value: "" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
  it("shows helper text when no error", () => {
    render(/* @__PURE__ */ jsx(Input, { label: "Email", helperText: "Enter email" }));
    expect(screen.getByText("Enter email")).toBeInTheDocument();
  });
  it("renders leading icon", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Input, { label: "Search", leadingIcon: /* @__PURE__ */ jsx("span", { "data-testid": "lead", children: "L" }) })
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(container.querySelector(".w3f-input-icon--leading")).toBeInTheDocument();
  });
  it("forwards ref to the input element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Input, { label: "Ref", ref }));
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
  it("has displayName set", () => {
    expect(Input.displayName).toBe("Input");
  });
});
//# sourceMappingURL=Input.test.js.map
