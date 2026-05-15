import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "../Note";
describe("Note", () => {
  it("renders with default classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Note, { children: "Message" }));
    const note = container.firstElementChild;
    expect(note).toHaveClass("w3f-note");
    expect(note).toHaveClass("w3f-note-info");
    expect(note).toHaveClass("w3f-round-md");
    expect(note).toHaveClass("w3f-border-l-4");
  });
  it("has displayName set", () => {
    expect(Note.displayName).toBe("Note");
  });
  it("forwards ref", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Note, { ref, children: "Text" }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("renders children content", () => {
    render(/* @__PURE__ */ jsx(Note, { children: "Alert message" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Alert message");
  });
  it("has role=alert", () => {
    render(/* @__PURE__ */ jsx(Note, { children: "Text" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
  it("applies type classes", () => {
    const { container: success } = render(/* @__PURE__ */ jsx(Note, { type: "success", children: "OK" }));
    expect(success.firstElementChild).toHaveClass("w3f-note-success");
    const { container: warning } = render(/* @__PURE__ */ jsx(Note, { type: "warning", children: "Warn" }));
    expect(warning.firstElementChild).toHaveClass("w3f-note-warning");
    const { container: danger } = render(/* @__PURE__ */ jsx(Note, { type: "danger", children: "Error" }));
    expect(danger.firstElementChild).toHaveClass("w3f-note-danger");
  });
  it("applies shadow class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Note, { shadow: "lg", children: "S" }));
    expect(container.firstElementChild).toHaveClass("w3f-shadow-lg");
  });
  it("applies fullBorder class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Note, { fullBorder: true, children: "B" }));
    expect(container.firstElementChild).toHaveClass("w3f-border-full");
    expect(container.firstElementChild).not.toHaveClass("w3f-border-l-4");
  });
  it("applies border side classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Note, { border: "top", children: "T" }));
    expect(container.firstElementChild).toHaveClass("w3f-border-t-4");
  });
  it("renders icon", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Note, { icon: /* @__PURE__ */ jsx("span", { "data-testid": "icon", children: "!" }), children: "With icon" })
    );
    expect(container.querySelector(".w3f-note-icon")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
  it("renders dismiss button and calls onDismiss", async () => {
    const onDismiss = vi.fn();
    render(/* @__PURE__ */ jsx(Note, { dismissible: true, onDismiss, children: "Dismissible" }));
    const dismissBtn = screen.getByLabelText("Cerrar");
    expect(dismissBtn).toBeInTheDocument();
    await userEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Note, { className: "my-note", children: "N" }));
    expect(container.firstElementChild).toHaveClass("my-note");
  });
});
//# sourceMappingURL=Note.test.js.map
