import type { SectionTitleAlign } from './SectionTitle.types';

export const SECTION_TITLE_DEFAULTS = {
    align: 'left' as SectionTitleAlign,
    borderColor: '',
    unstyled: false,
    className: '',
} as const;

export const SECTION_TITLE_CLASSES = {
    container: 'w3f-section-title',
    title: 'w3f-section-title__h',
    subtitle: 'w3f-section-title__sub',
    alignLeft: 'w3f-section-title--left',
    alignCenter: 'w3f-section-title--center',
    alignRight: 'w3f-section-title--right',
    alignJustify: 'w3f-section-title--justify',
} as const;
