import React from 'react'
import {Link} from 'react-router-dom'

export function HeaderMainNav(){
    return (
        <nav className="header-main-nav">
            <ul>
                <li><Link to="/ArtistMatchFinder">ArtistMatch</Link></li>
                <li><Link to="/SongMatchFinder">SongMatch</Link></li>
                <li><Link to="/ArtistKeyFinder">ArtistKey</Link></li>
                <li> <Link to="/SongKeyFinder">SongKey</Link></li>
            </ul>
        </nav>
    )
}