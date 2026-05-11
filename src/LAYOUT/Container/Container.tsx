import React from 'react';
import type { ContainerProps } from './Container.types';
import { CONTAINER_DEFAULTS } from './Container.constants';
import { useContainerProps } from './Container.hooks';

export type { ContainerProps } from './Container.types';

/**
 * Container Component - W3F Framework
 *
 * Contenedor basado en la filosofía w3-container.
 * Aplica la clase base 'w3f-container' y permite polimorfismo con la prop `as`.
 *
 * @example
 * <Container as="section" className="w3f-card">
 *   <Form>...</Form>
 * </Container>
 */
const Container: React.FC<ContainerProps> = ({
    children,
    as: Element = CONTAINER_DEFAULTS.as,
    ...props
}) => {
    const processedProps = useContainerProps(props);

    return (
        <Element {...processedProps}>
            {children}
        </Element>
    );
};

Container.displayName = 'Container';

export { Container };
export default Container;
