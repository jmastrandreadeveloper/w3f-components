import React from 'react';
import type { ImageListProps } from './ImageList.types';
import { ImageCard } from './ImageCard';
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
declare const ImageList: React.FC<ImageListProps>;
export { ImageList, ImageCard };
export default ImageList;
//# sourceMappingURL=ImageList.d.ts.map