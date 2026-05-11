import React from 'react';
import type { ImageCardProps } from './ImageList.types';

/**
 * ImageCard - Tarjeta de imagen interna para ImageList.
 */
const ImageCard: React.FC<ImageCardProps> = ({ item, height }) => (
    <>
        <img
            src={item.src}
            alt={item.title}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                minHeight: typeof height === 'number' ? '100%' : 'auto',
            }}
        />
        {item.title && (
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '8px 12px',
                fontSize: '0.9rem',
            }}>
                {item.title}
            </div>
        )}
    </>
);

ImageCard.displayName = 'ImageCard';

export { ImageCard };
export default ImageCard;
