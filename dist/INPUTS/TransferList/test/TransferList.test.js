import { jsx } from "react/jsx-runtime";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TransferList from "../TransferList";
const sourceItems = [
  { id: 1, label: "Item A" },
  { id: 2, label: "Item B" },
  { id: 3, label: "Item C" }
];
const targetItems = [
  { id: 4, label: "Item D" }
];
describe("TransferList", () => {
  it("renders without crashing", () => {
    const { container } = render(/* @__PURE__ */ jsx(TransferList, {}));
    expect(container.firstElementChild).toBeInTheDocument();
  });
  it("renders source and target panels", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(TransferList, { sourceItems, targetItems })
    );
    const panels = container.querySelectorAll(".w3f-transfer-panel");
    expect(panels).toHaveLength(2);
  });
  it("renders source items", () => {
    render(/* @__PURE__ */ jsx(TransferList, { sourceItems }));
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Item C")).toBeInTheDocument();
  });
  it("applies root class w3f-transfer", () => {
    const { container } = render(/* @__PURE__ */ jsx(TransferList, {}));
    expect(container.querySelector(".w3f-transfer")).toBeInTheDocument();
  });
  it("applies custom className", () => {
    const { container } = render(/* @__PURE__ */ jsx(TransferList, { className: "my-transfer" }));
    expect(container.firstElementChild).toHaveClass("my-transfer");
  });
  it("renders default panel titles", () => {
    render(/* @__PURE__ */ jsx(TransferList, { sourceItems }));
    expect(screen.getByText("Disponibles")).toBeInTheDocument();
    expect(screen.getByText("Seleccionados")).toBeInTheDocument();
  });
  it("renders custom panel titles", () => {
    render(
      /* @__PURE__ */ jsx(
        TransferList,
        {
          sourceItems,
          sourceTitle: "Available",
          targetTitle: "Selected"
        }
      )
    );
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Selected")).toBeInTheDocument();
  });
  it("renders search inputs when enableSearch is true", () => {
    render(/* @__PURE__ */ jsx(TransferList, { sourceItems, enableSearch: true }));
    const searchInputs = screen.getAllByPlaceholderText("Buscar...");
    expect(searchInputs).toHaveLength(2);
  });
  it("applies disabled class w3f-transfer-disabled", () => {
    const { container } = render(/* @__PURE__ */ jsx(TransferList, { disabled: true }));
    expect(container.querySelector(".w3f-transfer-disabled")).toBeInTheDocument();
  });
  it("disables action buttons when disabled", () => {
    const { container } = render(
      /* @__PURE__ */ jsx(TransferList, { sourceItems, disabled: true })
    );
    const buttons = container.querySelectorAll(".w3f-transfer-btn");
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
  it("renders 4 action buttons", () => {
    const { container } = render(/* @__PURE__ */ jsx(TransferList, { sourceItems }));
    const buttons = container.querySelectorAll(".w3f-transfer-btn");
    expect(buttons).toHaveLength(4);
  });
  it("forwards ref to wrapper div", () => {
    const ref = { current: null };
    render(/* @__PURE__ */ jsx(TransferList, { ref }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it("has displayName set", () => {
    expect(TransferList.displayName).toBe("TransferList");
  });
});
//# sourceMappingURL=TransferList.test.js.map
