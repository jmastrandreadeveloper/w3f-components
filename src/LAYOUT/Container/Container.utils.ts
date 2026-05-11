import { CONTAINER_CLASSES } from './Container.constants';

/**
 * Concatena y normaliza las clases de W3F para el componente Container.
 */
export const buildContainerClass = (additionalClasses: string = ''): string => {
    return `${CONTAINER_CLASSES.base} ${additionalClasses}`.trim();
};
