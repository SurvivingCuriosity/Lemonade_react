import React from 'react'
import {Link} from 'react-router-dom'
export function Tutorial(){
    return (
        <section id="tutorial" className="section-comunidad container_start">
            <h2>Tutorial</h2>
                <div className="subSection">
                    <h3>Artist Match Finder</h3>
                       <p>Introduce dos artistas y obtén una lista de parejas de canciones compuestas en la misma escala y al mismo tempo.</p>
                       <p>Prueba <Link to="/ArtistMatchFInder">Artist Match Finder</Link></p>
                </div>
                <div className="subSection">
                    <h3>Song Match Finder</h3>
                       <p>Introduce una canción y un artista para encontrar canciones de ese artista compuestas en la misma escala que la canción introducida.</p>
                       <p>Prueba <Link to="/SongMatchFInder">Song Match Finder</Link></p>
                </div>
                <div className="subSection">
                    <h3>Artist Key Finder</h3>
                       <p>Obtén las canciones de un artista compuestas en la escala que elijas.</p>
                       <p>Prueba <Link to="/ArtistKeyFInder">Artist Key Finder</Link></p>
                </div>
                <div className="subSection">
                    <h3>Song Key Finder</h3>
                       <p>Busca una canción para obtener su escala y tempo.</p>
                       <p>Prueba <Link to="/SongKeyFInder">Song Key Finder</Link></p>
                </div>

        </section>
    )
}