import React, { forwardRef, useMemo } from 'react';
import Button from '../../INPUTS/Button/Button';
import type { NoteProps } from './Note.types';
import { NOTE_DEFAULTS } from './Note.constants';
import { buildNoteClasses } from './Note.utils';
import { useNoteDismiss } from './Note.hooks';
import { useBridgeBind } from '@w3f/bridge';

const Note = forwardRef<HTMLDivElement, NoteProps>(({
    children,
    type = NOTE_DEFAULTS.type,
    round = NOTE_DEFAULTS.round,
    shadow = NOTE_DEFAULTS.shadow,
    border = NOTE_DEFAULTS.border,
    fullBorder = NOTE_DEFAULTS.fullBorder,
    className,
    dismissible,
    onDismiss,
    icon,
    unstyled = NOTE_DEFAULTS.unstyled,
    variant,
    bindId,
    ...rest
}, ref) => {
    const { dispatch } = useBridgeBind({ bindId });
    const { isVisible, handleDismiss } = useNoteDismiss(onDismiss);

    const classNames = useMemo(
        () => buildNoteClasses(type, round, shadow, border, fullBorder, className, unstyled, variant),
        [type, round, shadow, border, fullBorder, className, unstyled, variant]
    );

    if (!isVisible) {
        return null;
    }

    return (
        <div ref={ref} className={classNames} role="alert" {...rest}>
            <div className="w3f-note-content-container">
                {icon && <div className="w3f-note-icon">{icon}</div>}
                <div className="w3f-note-text-content">{children}</div>

                {dismissible && (
                    <Button
                        onClick={() => { handleDismiss(); dispatch('change', { action: 'dismiss' }); }}
                        variant="icon"
                        size="sm"
                        className="w3f-note-dismiss"
                        aria-label="Cerrar"
                    >
                        ✕
                    </Button>
                )}
            </div>
        </div>
    );
});

Note.displayName = 'Note';

export { Note };
export default Note;
