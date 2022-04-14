import React from 'react'

export function BottomNav(){
    return (
        <nav id="fixedBottomNav">
            <ul>
                <li><a href="/songMatchFinder">Song Match</a></li>
                <li><a href="/artistMatchFinder">Artist Match</a></li>
                <li><a href="/songKeyFinder">Song Key</a></li>
                <li><a href="/artistKeyFinder">Artist Key</a></li>
            </ul>
            <a className="backToTop" href="#top" aria-label="Icono moverse arriba"></a>
        </nav>
    )
}