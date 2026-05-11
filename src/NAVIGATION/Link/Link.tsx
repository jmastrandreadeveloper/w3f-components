import React, { forwardRef, useMemo } from 'react';
import type { LinkProps } from './Link.types';
import { LINK_DEFAULTS, LINK_CLASSES } from './Link.constants';
import { buildLinkClasses, buildExternalProps } from './Link.utils';
import { useLinkClick } from './Link.hooks';
import { sanitizeUrl } from '../../utils/sanitizeUrl';

/**
 * Link Component - W3F Framework
 *
 * Enlace semántico que renderiza como `<a>` o `<button>` según el contexto.
 * Soporta iconos, variantes de subrayado, colores y estado deshabilitado.
 *
 * @example
 * <Link href="/inicio">Ir al inicio</Link>
 *
 * @example
 * <Link href="https://example.com" external icon={<ExternalLink size={14} />} iconPosition="right">
 *   Sitio externo
 * </Link>
 *
 * @example
 * <Link onClick={() => doSomething()} color="danger">Eliminar</Link>
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
    href,
    children,
    color = LINK_DEFAULTS.color,
    underline = LINK_DEFAULTS.underline,
    variant = LINK_DEFAULTS.variant,
    component,
    disabled = LINK_DEFAULTS.disabled,
    external = LINK_DEFAULTS.external,
    icon,
    iconPosition = LINK_DEFAULTS.iconPosition,
    unstyled = LINK_DEFAULTS.unstyled,
    className = LINK_DEFAULTS.className,
    onClick,
    ...props
}, ref) => {
    const Tag = component || (href ? 'a' : 'button');
    const isButton = Tag === 'button';

    const cls = useMemo(
        () => buildLinkClasses(color, underline, variant, disabled, isButton, className, unstyled),
        [color, underline, variant, disabled, isButton, className, unstyled],
    );

    const externalProps = buildExternalProps(external, isButton);
    const handleClick = useLinkClick(disabled, onClick);

    const content = (
        <>
            {icon && iconPosition === 'left' && (
                <span className={LINK_CLASSES.icon}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className={LINK_CLASSES.icon}>{icon}</span>
            )}
        </>
    );

    if (isButton) {
        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={cls}
                onClick={handleClick}
                disabled={disabled}
                type="button"
                {...props}
            >
                {content}
            </button>
        );
    }

    return (
        <a
            ref={ref}
            className={cls}
            href={disabled ? undefined : sanitizeUrl(href)}
            onClick={handleClick}
            aria-disabled={disabled || undefined}
            {...externalProps}
            {...props}
        >
            {content}
        </a>
    );
});

Link.displayName = 'Link';

export default Link;
export { Link };
