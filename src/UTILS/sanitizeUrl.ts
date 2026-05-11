/**
 * sanitizeUrl — blocks dangerous URL protocols (javascript:, data:, vbscript:)
 * to prevent XSS via href/src attributes.
 *
 * @security Phase 2 hardening
 */
const BLOCKED_PROTOCOLS = /^(javascript|data|vbscript):/i;

export function sanitizeUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  const trimmed = url.trim();
  if (BLOCKED_PROTOCOLS.test(trimmed)) return undefined;
  return trimmed;
}
