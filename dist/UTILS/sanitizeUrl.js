const BLOCKED_PROTOCOLS = /^(javascript|data|vbscript):/i;
function sanitizeUrl(url) {
  if (!url) return url;
  const trimmed = url.trim();
  if (BLOCKED_PROTOCOLS.test(trimmed)) return void 0;
  return trimmed;
}
export {
  sanitizeUrl
};
//# sourceMappingURL=sanitizeUrl.js.map
