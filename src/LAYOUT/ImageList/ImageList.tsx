import React from 'react';
import type { ImageListProps } from './ImageList.types';
import { IMAGE_LIST_DEFAULTS } from './ImageList.constants';
import { getTemplateColumns } from './ImageList.utils';
import { ImageCard } from './ImageCard';
import { Grid } from '../Grid/Grid';
import { GridAreaItem } from '../Grid/Grid';

export type { ImageListProps, ImageListItem, ImageListVariant, ImageCardProps } from './ImageList.types';

/**
 * ImageList Component - W3F Framework
 *
 * Muestra una colección de imágenes en una cuadrícula organizada.
 *
 * @example
 * <ImageList
 *   items={[{ id: 1, src: 'img.jpg', title: 'Foto' }]}
 *   variant="standard"
 *   cols={3}
 * />
 */
const ImageList: React.FC<ImageListProps> = ({
    items,
    variant = IMAGE_LIST_DEFAULTS.variant,
    cols,
    gap = IMAGE_LIST_DEFAULTS.gap,
    rowHeight = IMAGE_LIST_DEFAULTS.rowHeight,
    className,
    style,
}) => {
    const templateColumns = getTemplateColumns(variant, cols);

    return (
        <Grid
            templateColumns={templateColumns}
            gap={gap}
            autoRows={typeof rowHeight === 'number' ? `${rowHeight}px` : rowHeight}
            autoFlow="row dense"
            className={className}
            style={style}
            alignItems="stretch"
            justifyItems="stretch"
        >
            {items.map((item) => {
                if (variant === 'quilted' && (item.cols || item.rows)) {
                    return (
                        <GridAreaItem
                            key={item.id}
                            gridColumn={item.cols ? `span ${item.cols}` : undefined}
                            gridRow={item.rows ? `span ${item.rows}` : undefined}
                            style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}
                        >
                            <ImageCard item={item} height={rowHeight} />
                        </GridAreaItem>
                    );
                }

                return (
                    <div
                        key={item.id}
                        style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', minHeight: '200px' }}
                    >
                        <ImageCard item={item} height={rowHeight} />
                    </div>
                );
            })}
        </Grid>
    );
};

ImageList.displayName = 'ImageList';

export { ImageList, ImageCard };
export default ImageList;
