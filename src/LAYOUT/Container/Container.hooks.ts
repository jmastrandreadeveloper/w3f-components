import { buildContainerClass } from './Container.utils';

/**
 * Hook para procesar las propiedades del componente Container.
 */
export const useContainerProps = ({ className = '', ...restProps }: { className?: string;[key: string]: any }) => {
    const finalClassName = buildContainerClass(className);

    return {
        className: finalClassName,
        ...restProps,
    };
};
