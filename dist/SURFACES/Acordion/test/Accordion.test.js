import { jsx, jsxs } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionItem, AccordionSummary, AccordionDetails, AccordionActions } from "../Accordion";
import { createRef } from "react";
describe("Accordion", () => {
  it("renders with base class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Accordion, { children: /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion");
  });
  it("has displayName set", () => {
    expect(Accordion.displayName).toBe("Accordion");
  });
  it("forwards ref", () => {
    const ref = createRef();
    render(
      /* @__PURE__ */ jsx(Accordion, { ref, children: /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("applies variant outlined class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Accordion, { variant: "outlined", children: /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-outlined");
  });
  it("applies variant elevated class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Accordion, { variant: "elevated", children: /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-elevated");
  });
  it("applies size sm class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Accordion, { size: "sm", children: /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-sm");
  });
  it("applies custom className", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(Accordion, { className: "my-custom", children: /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] }) })
    );
    expect(container.firstChild).toHaveClass("my-custom");
  });
  it("expands an item when summary is clicked", async () => {
    const user = userEvent.setup();
    render(
      /* @__PURE__ */ jsx(Accordion, { children: /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Click me" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Expanded content" }) })
      ] }) })
    );
    const summary = screen.getByText("Click me");
    await user.click(summary);
    const contentContainer = summary.closest(".w3f-accordion-item")?.querySelector(".w3f-accordion-content-container");
    expect(contentContainer).toHaveClass("w3f-accordion-show");
  });
  it("renders AccordionDetails with correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Detail content" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-details");
  });
  it("renders AccordionActions with correct class", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(AccordionActions, { children: /* @__PURE__ */ jsx("button", { children: "Action" }) })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-actions");
  });
  it("AccordionItem applies color class", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", color: "primary", children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-item-primary");
  });
  it("AccordionItem applies disabled class", () => {
    const { container } = render(
      /* @__PURE__ */ jsxs(AccordionItem, { id: "p1", disabled: true, children: [
        /* @__PURE__ */ jsx(AccordionSummary, { children: "Title" }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx("p", { children: "Content" }) })
      ] })
    );
    expect(container.firstChild).toHaveClass("w3f-accordion-item-disabled");
  });
});
//# sourceMappingURL=Accordion.test.js.map
