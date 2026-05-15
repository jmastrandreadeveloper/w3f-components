function useLinkClick(disabled, onClick) {
  return (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };
}
export {
  useLinkClick
};
//# sourceMappingURL=Link.hooks.js.map
