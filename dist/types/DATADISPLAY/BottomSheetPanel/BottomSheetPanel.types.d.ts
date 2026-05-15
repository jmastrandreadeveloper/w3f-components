import type React from 'react';
export type BottomSheetSize = 'auto' | 'small' | 'medium' | 'large' | 'full';
export interface BottomSheetPanelProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    size?: BottomSheetSize;
    maxHeight?: string;
    className?: string;
    /**
     * Contenido fijo en la parte inferior del panel, fuera del área desplazable.
     * Ideal para botones de acción (Cancelar / Guardar).
     * Si el panel envuelve un <Form> o <LiveForm>, colocar el <Form> como padre
     * del panel permite que el footer acceda al contexto de formulario.
     */
    footer?: React.ReactNode;
    /** When true, strips visual styles — compose appearance via trait classes. */
    unstyled?: boolean;
}
//# sourceMappingURL=BottomSheetPanel.types.d.ts.map