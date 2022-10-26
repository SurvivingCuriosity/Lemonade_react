import React from 'react'
import {Link} from 'react-router-dom'

export function HeaderToolsNav(){

    const links = [
        {label:'ArtistMatch', path:'/ArtistMatchFinder'},
        {label:'SongMatch', path:'/SongMatchFinder'},
        {label:'ArtistKey', path:'/ArtistKeyFinder'},
        {label:'SongKey', path:'/SongKeyFinder'}
    ]

    return (
        <nav className="header-main-nav">
            <ul>
                {links.map((link, index)=>{return(
                    <li key={index}><Link to={link.path}>{link.label}</Link></li>
                )})}
            </ul>
        </nav>
    )
}