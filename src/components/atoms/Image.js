import {React, useState} from 'react'
import { SkeletonImage } from './SkeletonImage';

export const Image = ({ src, alt, style, className }) => {
    const [loaded, setLoaded] = useState(false);
    
    const handleImageLoaded = () => {
        setLoaded(true);
    }

    return (
        <>
            {!loaded && 
                <SkeletonImage 
                    style={style}
                />
            }        
            <img
                src={src}
                className={className}
                alt={alt || 'imagen sin texto alternativo'}
                style={{...style, display: loaded ? 'block' : 'none'}}
                onLoad={handleImageLoaded}>
            </img>
        </>
    
        
    )
}
