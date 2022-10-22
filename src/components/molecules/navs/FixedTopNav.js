import React from 'react'
import {Link} from 'react-router-dom'
import lemon from '../../../assets/images/lemon.svg'
export function FixedTopNav(){
    const tamanoImagen = '25';
    return (
        <div className="limon_lemonade_enlace">
            <Link to="/" className="linea-flex-start">
                <img src={lemon} style={{width: tamanoImagen + 'px'}}/>
                <h1 className="tituloTopNav">Ir a inicio</h1>
            </Link>
        </div>

    )
}