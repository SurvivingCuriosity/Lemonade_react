import React from 'react'

export function HeaderBottomNav(){

    const links = [
        {label:'Tutorial', path:'#tutorial'},
        {label:'Proyecto', path:'#proyecto'},
        {label:'Contacto', path:'#contacto'}
    ]

    return (
        <nav className="header-bottom-nav">
            <ul>
                {links.map((link, index)=>{return(
                    <li key={index}><a href={link.path}>{link.label}</a></li>
                )})}
            </ul>
        </nav>
    )
}