import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  AccordionHorizontal,
  AccordionItemH,
  AccordionSummaryH,
  AccordionDetailsH,
  AccordionActionsH
} from "../AccordionHorizontal";
import { createRef } from "react";
describe("AccordionHorizontal", () => {
  it("renders with base class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionHorizontal, { children: /* @__PURE__ */ jsxs(AccordionItemH, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetailsH, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-horizontal");
  });
  it("has displayName set", () => {
    expect(AccordionHorizontal.displayName).toBe("AccordionHorizontal");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(
      /* @__PURE__ */ jsx(AccordionHorizontal, { ref, children: /* @__PURE__ */ jsxs(AccordionItemH, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetailsH, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("applies variant outlined class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionHorizontal, { variant: "outlined", children: /* @__PURE__ */ jsxs(AccordionItemH, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetailsH, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-h-outlined");
  });
  it("applies size sm class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionHorizontal, { size: "sm", children: /* @__PURE__ */ jsxs(AccordionItemH, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetailsH, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-h-sm");
  });
  it("applies custom className", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionHorizontal, { className: "custom-h", children: /* @__PURE__ */ jsxs(AccordionItemH, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetailsH, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("custom-h");
  });
  it("applies height as inline style", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionHorizontal, { height: "500px", children: /* @__PURE__ */ jsxs(AccordionItemH, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetailsH, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveStyle({ minHeight: "500px" });
  });
  it("renders AccordionDetailsH with correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionDetailsH, { children: /* @__PURE__ */ jsx("p", { children: "Horizontal detail" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-details-horizontal");
  });
  it("renders AccordionActionsH with correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionActionsH, { children: /* @__PURE__ */ jsx("button", { children: "Action" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-actions-horizontal");
  });
  it("AccordionSummaryH renders with summary class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Summary text" })
    );
    expect(container.querySelector("button")).toHaveClass("w3f-accordion-summary-horizontal");
  });
  it("AccordionSummaryH applies counter-clockwise orientation by default", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionSummaryH, { children: "Text" })
    );
    expect(container.querySelector("button")).toHaveClass("w3f-accordion-summary-h-ccw");
  });
  it("sub-components have displayName set", () => {
    expect(AccordionItemH.displayName).toBe("AccordionItemH");
    expect(AccordionSummaryH.displayName).toBe("AccordionSummaryH");
    expect(AccordionDetailsH.displayName).toBe("AccordionDetailsH");
    expect(AccordionActionsH.displayName).toBe("AccordionActionsH");
  });
});
//# sourceMappingURL=AccordionHorizontal.test.js.map
