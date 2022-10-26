import { React, useState, useEffect } from 'react'

export const Image = ({ src, alt, size, className = '', estilo }) => {

    const [tam, setTam] = useState(20);

    useEffect(() => {
        switch (size) {
            case 'icon':
                setTam(15);
                break;
            case 'S':
                setTam(25);
                break;
            case 'M':
                setTam(50);
                break;
            case 'L':
                setTam(70);
                break;
            default:
            // tam=20;
        }
    }, []);

    const style = { margin: 'auto', aspectRatio: 1, width: `${tam}px` }

    const [loaded, setLoaded] = useState(false);

    const handleImageLoaded = () => {
        setLoaded(true);
    }

    return (
        <>
            {!loaded && <div className="skeleton" style={{ ...style, borderRadius: '10px' }}></div> }
            <img
                className={className}
                src={src}
                alt={alt || 'imagen sin texto alternativo'}
                style={{ ...style, display: loaded ? 'block' : 'none' }}
                onLoad={handleImageLoaded}>
            </img>
        </>


    )
}
