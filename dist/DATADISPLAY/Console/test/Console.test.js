import { jsx } from "react/jsx-runtime";
import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import Console from "../Console";
beforeAll(() => {
  Element.prototype.scrollIntoView = () => {
  };
});
describe("Console", () => {
  it("has displayName set", () => {
    expect(Console.displayName).toBe("Console");
  });
  it("renders terminal root with class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Console, {}));
    const root = container.querySelector(".w3f-console");
    expect(root).toBeInTheDocument();
  });
  it("forwards ref to the terminal root", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Console, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.className).toContain("w3f-console");
  });
  it("renders title text", () => {
    render(/* @__PURE__ */ jsx(Console, { title: "API Log" }));
    expect(screen.getByText("API Log")).toBeInTheDocument();
  });
  it("defaults to dark theme class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Console, {}));
    const root = container.querySelector(".w3f-console");
    expect(root?.className).toContain("w3f-console--dark");
  });
  it("applies light theme class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Console, { theme: "light" }));
    const root = container.querySelector(".w3f-console");
    expect(root?.className).toContain("w3f-console--light");
  });
  it("renders message count badge with 0", () => {
    const { container } = render(/* @__PURE__ */ jsx(Console, {}));
    const badge = container.querySelector(".w3f-console-badge");
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe("0");
  });
  it("renders clear button by default", () => {
    render(/* @__PURE__ */ jsx(Console, {}));
    expect(screen.getByLabelText("Limpiar")).toBeInTheDocument();
  });
  it("hides clear button when showClearButton=false", () => {
    render(/* @__PURE__ */ jsx(Console, { showClearButton: false }));
    expect(screen.queryByLabelText("Limpiar")).toBeNull();
  });
  it("renders children in children slot", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Console, { children: /* @__PURE__ */ jsx("div", { "data-testid": "child", children: "Form" }) })
    );
    const childSlot = container.querySelector(".w3f-console-children");
    expect(childSlot).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(Console, { className: "my-console" }));
    const root = container.querySelector(".w3f-console");
    expect(root?.className).toContain("my-console");
  });
  it("renders body area with log role", () => {
    render(/* @__PURE__ */ jsx(Console, {}));
    expect(screen.getByRole("log")).toBeInTheDocument();
  });
});
//# sourceMappingURL=Console.test.js.map
