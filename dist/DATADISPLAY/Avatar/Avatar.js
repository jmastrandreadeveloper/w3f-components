"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef, useRef } from "react";
import { buildAvatarClasses } from "./Avatar.utils";
import { useAvatarForm } from "./Avatar.hooks";
import { AVATAR_DEFAULTS } from "./Avatar.constants";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
import { useBridgeBind } from "@w3f/bridge";
const Avatar = forwardRef(({
  src,
  alt = AVATAR_DEFAULTS.alt,
  size = AVATAR_DEFAULTS.size,
  color = AVATAR_DEFAULTS.color,
  status,
  badge,
  hoverable = AVATAR_DEFAULTS.hoverable,
  uploadable = AVATAR_DEFAULTS.uploadable,
  accept = "image/*",
  unstyled = AVATAR_DEFAULTS.unstyled,
  className = AVATAR_DEFAULTS.className,
  children,
  onClick,
  name,
  onChange,
  bindId,
  ...rest
}, ref) => {
  const fileInputRef = useRef(null);
  const { isFormControlled, formValue, setFormValue } = useAvatarForm(name);
  const { dispatch } = useBridgeBind({ bindId });
  const effectiveSrc = src ?? (isFormControlled ? formValue : void 0);
  const safeSrc = sanitizeUrl(effectiveSrc);
  const avatarClasses = buildAvatarClasses(
    size,
    hoverable || uploadable,
    safeSrc,
    color,
    className,
    unstyled
  );
  const handleClick = (e) => {
    dispatch("click");
    if (uploadable && fileInputRef.current) {
      fileInputRef.current.click();
    }
    onClick?.(e);
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFormValue(dataUrl);
      onChange?.(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const avatarContent = safeSrc ? /* @__PURE__ */ jsx("img", { src: safeSrc, alt, className: "w3f-avatar-img" }) : /* @__PURE__ */ jsx("span", { className: "w3f-avatar-text", children: children || "?" });
  const avatarElement = /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: avatarClasses,
      onClick: handleClick,
      role: onClick || uploadable ? "button" : void 0,
      tabIndex: onClick || uploadable ? 0 : void 0,
      "aria-label": uploadable ? `${alt} \u2013 clic para cambiar imagen` : void 0,
      ...rest,
      children: [
        avatarContent,
        uploadable && /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept,
            style: { display: "none" },
            onChange: handleFileChange,
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
  if (status || badge !== void 0) {
    return /* @__PURE__ */ jsxs("div", { className: "w3f-avatar-wrapper", children: [
      avatarElement,
      status && /* @__PURE__ */ jsx(
        "span",
        {
          className: `w3f-avatar-status w3f-avatar-status-${status}`,
          "aria-label": `Estado: ${status}`
        }
      ),
      badge !== void 0 && /* @__PURE__ */ jsx("span", { className: "w3f-avatar-badge", children: badge > 99 ? "99+" : badge })
    ] });
  }
  return avatarElement;
});
Avatar.displayName = "Avatar";
const AvatarGroup = forwardRef(({ children, max = 5, className = "" }, ref) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const extraCount = max && childrenArray.length > max ? childrenArray.length - max : 0;
  return /* @__PURE__ */ jsxs("div", { ref, className: `w3f-avatar-group ${className}`, children: [
    visibleChildren,
    extraCount > 0 && /* @__PURE__ */ jsxs(Avatar, { color: "gray", size: "medium", children: [
      "+",
      extraCount
    ] })
  ] });
});
AvatarGroup.displayName = "AvatarGroup";
var Avatar_default = Avatar;
export {
  Avatar,
  AvatarGroup,
  Avatar_default as default
};
//# sourceMappingURL=Avatar.js.map
