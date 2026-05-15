import { jsx } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Rating from "../Rating";
describe("Rating", () => {
  it("renders a radiogroup", () => {
    render(/* @__PURE__ */ jsx(Rating, {}));
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });
  it("renders 5 radio items by default", () => {
    render(/* @__PURE__ */ jsx(Rating, {}));
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });
  it("renders custom max items", () => {
    render(/* @__PURE__ */ jsx(Rating, { max: 10 }));
    expect(screen.getAllByRole("radio")).toHaveLength(10);
  });
  it("applies wrapper class w3f-rating-wrapper", () => {
    const { container } = render(/* @__PURE__ */ jsx(Rating, {}));
    expect(container.querySelector(".w3f-rating-wrapper")).toBeInTheDocument();
  });
  it("renders label text", () => {
    render(/* @__PURE__ */ jsx(Rating, { label: "Rate this" }));
    expect(screen.getByText("Rate this")).toBeInTheDocument();
  });
  it("renders required indicator", () => {
    render(/* @__PURE__ */ jsx(Rating, { label: "Rate", required: true }));
    expect(screen.getByText("*")).toBeInTheDocument();
  });
  it("shows value display when showValue=true", () => {
    render(/* @__PURE__ */ jsx(Rating, { showValue: true, value: 3 }));
    expect(screen.getByText("3/5")).toBeInTheDocument();
  });
  it("applies disabled class to items", () => {
    const { container } = render(/* @__PURE__ */ jsx(Rating, { disabled: true }));
    expect(container.querySelector(".w3f-rating-item--disabled")).toBeInTheDocument();
  });
  it("fires onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(Rating, { onChange }));
    await user.click(screen.getAllByRole("radio")[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });
  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(/* @__PURE__ */ jsx(Rating, { disabled: true, onChange }));
    await user.click(screen.getAllByRole("radio")[0]);
    expect(onChange).not.toHaveBeenCalled();
  });
  it("shows error message with role alert", () => {
    render(/* @__PURE__ */ jsx(Rating, { error: "Required" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
  it("shows helper text", () => {
    render(/* @__PURE__ */ jsx(Rating, { helperText: "Select a rating" }));
    expect(screen.getByText("Select a rating")).toBeInTheDocument();
  });
  it("forwards ref to wrapper div", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(Rating, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("has displayName set", () => {
    expect(Rating.displayName).toBe("Rating");
  });
});
//# sourceMappingURL=Rating.test.js.map
