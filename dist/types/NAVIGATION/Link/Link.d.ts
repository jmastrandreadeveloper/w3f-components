import React from 'react';
import type { LinkProps } from './Link.types';
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
declare const Link: React.ForwardRefExoticComponent<Omit<LinkProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
export default Link;
export { Link };
//# sourceMappingURL=Link.d.ts.map