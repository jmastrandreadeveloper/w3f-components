import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";
describe("Button", () => {
  it("renders with children text", () => {
    render(/* @__PURE__ */ jsx(Button, { children: "Click me" }));
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
  it("renders with text prop", () => {
    render(/* @__PURE__ */ jsx(Button, { text: "Save" }));
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });
  it("prefers children over text prop", () => {
    render(/* @__PURE__ */ jsx(Button, { text: "Fallback", children: "Primary" }));
    expect(screen.getByRole("button")).toHaveTextContent("Primary");
  });
  it("applies variant class", () => {
    render(/* @__PURE__ */ jsx(Button, { variant: "outline", children: "Test" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-button--outline");
  });
  it("applies color class", () => {
    render(/* @__PURE__ */ jsx(Button, { color: "danger", children: "Delete" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-button--danger");
  });
  it("applies size class", () => {
    render(/* @__PURE__ */ jsx(Button, { size: "lg", children: "Large" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-button--lg");
  });
  it("applies fullWidth class", () => {
    render(/* @__PURE__ */ jsx(Button, { fullWidth: true, children: "Full" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-button--full");
  });
  it("applies custom className", () => {
    render(/* @__PURE__ */ jsx(Button, { className: "custom-class", children: "Test" }));
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
  it('defaults to type="button"', () => {
    render(/* @__PURE__ */ jsx(Button, { children: "Test" }));
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
  it('accepts type="submit"', () => {
    render(/* @__PURE__ */ jsx(Button, { type: "submit", children: "Submit" }));
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
  it("disables the button", () => {
    render(/* @__PURE__ */ jsx(Button, { disabled: true, children: "Disabled" }));
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(/* @__PURE__ */ jsx(Button, { disabled: true, onClick, children: "Disabled" }));
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(/* @__PURE__ */ jsx(Button, { onClick, children: "Click" }));
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("renders icon on the left by default", () => {
    render(/* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx("span", { "data-testid": "icon", children: "\u2605" }), children: "Star" }));
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    const content = screen.getByRole("button").querySelector(".w3f-button__content");
    expect(content).toBeInTheDocument();
  });
  it("renders icon on the right", () => {
    render(
      /* @__PURE__ */ jsx(Button, { icon: /* @__PURE__ */ jsx("span", { "data-testid": "icon", children: "\u2192" }), iconPosition: "right", children: "Next" })
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
  it("applies unstyled class when unstyled=true", () => {
    render(/* @__PURE__ */ jsx(Button, { unstyled: true, children: "Raw" }));
    expect(screen.getByRole("button")).toHaveClass("w3f-button--unstyled");
  });
  it("forwards ref to the button element", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Button, { ref, children: "Ref" }));
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
  it("passes additional HTML attributes", () => {
    render(/* @__PURE__ */ jsx(Button, { "aria-label": "custom", "data-testid": "btn", children: "Test" }));
    expect(screen.getByTestId("btn")).toHaveAttribute("aria-label", "custom");
  });
  it("has displayName set", () => {
    expect(Button.displayName).toBe("Button");
  });
});
//# sourceMappingURL=Button.test.js.map
