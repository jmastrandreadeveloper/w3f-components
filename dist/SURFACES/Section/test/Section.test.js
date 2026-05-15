import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../Section";
describe("Section", () => {
  it("renders with header and title", () => {
    render(/* @__PURE__ */ jsx(Section, { title: "Settings", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Settings").tagName).toBe("H3");
  });
  it("has displayName set", () => {
    expect(Section.displayName).toBe("Section");
  });
  it("renders children in content area", () => {
    render(/* @__PURE__ */ jsx(Section, { title: "Test", children: /* @__PURE__ */ jsx("span", { children: "Child content" }) }));
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
  it("renders description when provided", () => {
    render(/* @__PURE__ */ jsx(Section, { title: "Test", description: "Some description", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });
  it("does not render description when not provided", () => {
    const { container } = render(/* @__PURE__ */ jsx(Section, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    expect(container.querySelector(".w3f-text-gray-600")).not.toBeInTheDocument();
  });
  it("header has correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Section, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    expect(container.querySelector(".w3f-panel-header")).toBeInTheDocument();
  });
  it("title has correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Section, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    expect(container.querySelector(".w3f-panel-title")).toBeInTheDocument();
  });
  it("body has correct class", () => {
    const { container } = render(/* @__PURE__ */ jsx(Section, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    expect(container.querySelector(".w3f-panel-body")).toBeInTheDocument();
  });
  it("content wrapper has flex layout classes", () => {
    const { container } = render(/* @__PURE__ */ jsx(Section, { title: "Test", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    const content = container.querySelector(".w3f-flex.w3f-flex-col.w3f-gap-4");
    expect(content).toBeInTheDocument();
  });
  it("applies custom className with margin bottom", () => {
    const { container } = render(/* @__PURE__ */ jsx(Section, { title: "Test", className: "my-section", children: /* @__PURE__ */ jsx("p", { children: "Body" }) }));
    const root = container.firstChild;
    expect(root.className).toContain("w3f-mb-8");
    expect(root.className).toContain("my-section");
  });
});
//# sourceMappingURL=Section.test.js.map
