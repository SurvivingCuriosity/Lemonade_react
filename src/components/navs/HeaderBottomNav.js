import React from 'react'
import {Link} from 'react-router-dom'

export function HeaderBottomNav(){
    return (
        <nav className="header-bottom-nav">
            <ul>
                <li><a href="#comunidad">Comunidad</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    )
}