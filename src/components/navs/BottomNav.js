import React from 'react'
import flecha from '../../images/flecha.svg'

export function BottomNav(){
    let tamanoImagen = '40'
    return (
        <nav className="fixed-bottom-nav">

            <a className="backToTop" href="#top" aria-label="Icono moverse arriba">
                <img src={flecha} style={{width: tamanoImagen + 'px'}}/>
            </a>

        </nav>
    )
}