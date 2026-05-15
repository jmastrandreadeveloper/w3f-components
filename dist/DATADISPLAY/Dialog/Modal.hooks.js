import { useEffect, useCallback } from "react";
function useModal(isOpen) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("w3f-modal-open");
      const focusableElements = document.querySelectorAll(
        '.w3f-modal-card button, .w3f-modal-card [href], .w3f-modal-card input, .w3f-modal-card select, .w3f-modal-card textarea, .w3f-modal-card [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else {
      document.body.classList.remove("w3f-modal-open");
    }
    return () => {
      document.body.classList.remove("w3f-modal-open");
    };
  }, [isOpen]);
}
function useEscapeKey(isOpen, onClose) {
  const handleEscape = useCallback((e) => {
    if (e.key === "Escape" && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);
}
export {
  useEscapeKey,
  useModal
};
//# sourceMappingURL=Modal.hooks.js.map
