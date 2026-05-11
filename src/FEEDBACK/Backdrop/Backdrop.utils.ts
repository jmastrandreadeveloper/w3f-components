export function buildBackdropClasses(
  open: boolean,
  invisible: boolean,
  className?: string
): string {
  return [
    'w3f-backdrop',
    open ? 'w3f-backdrop--open' : 'w3f-backdrop--closed',
    invisible && 'w3f-backdrop--invisible',
    className,
  ].filter(Boolean).join(' ');
}
