import React from 'react'
import {Link} from 'react-router-dom'

export function ToolsNav(){
    return (
        <nav id="toolsNav">
            <ul>
                <li><Link to="/ArtistMatchFinder">ArtistMatchFinder</Link></li>
                <li><Link to="/SongMatchFinder">SongMatchFinder</Link></li>
                <li><Link to="/ArtistKeyFinder">ArtistKeyFinder</Link></li>
                <li> <Link to="/SongKeyFinder">SongKeyFinder</Link></li>
            </ul>
        </nav>
    )
}