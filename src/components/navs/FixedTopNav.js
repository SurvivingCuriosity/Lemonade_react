import React from 'react'
import {Link} from 'react-router-dom'
import lemon from '../../images/lemon.svg'
export function FixedTopNav(){
    const tamanoImagen = '50';
    return (
        <div className="fixed-top-nav">
            <div>
                <Link to="/">
                    <img src={lemon} style={{width: tamanoImagen + 'px'}}/>
                </Link>
            </div>
        </div>

    )
}