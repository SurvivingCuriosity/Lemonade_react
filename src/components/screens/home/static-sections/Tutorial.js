import React from 'react'
import { Link } from 'react-router-dom'
import { ScrollContainer, ScrollPage, Animator, batch, Move, Zoom, StickyIn, Sticky, Fade } from 'react-scroll-motion'
export function Tutorial() {
    const FadeUp = batch(Fade(), Move(0, 200, 0, -500), Sticky(50, 50));

    return (

        <ScrollContainer>
            <h2 style={{ position: 'sticky', top: '1em' }}>Tutorial</h2>
            <ScrollPage page={0} key={0}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={0}>
                    <div key={0} className="subSection">
                        <h3>Artist Match Finder</h3>
                        <p>Introduce dos artistas y obtén una lista de parejas de canciones compuestas en la misma escala y al mismo tempo.</p>
                        <p>Prueba <Link to="/ArtistMatchFInder">Artist Match Finder</Link></p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={1} key={1}>
                <Animator animation={FadeUp} key={1}>
                    <div key={1} className="subSection">
                        <h3>Song Match Finder</h3>
                        <p>Introduce una canción y un artista para encontrar canciones de ese artista compuestas en la misma escala que la canción introducida.</p>
                        <p>Prueba <Link to="/SongMatchFInder">Song Match Finder</Link></p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={2} key={2}>
                <Animator animation={FadeUp} key={2}>
                    <div key={2} className="subSection">
                        <h3>Artist Key Finder</h3>
                        <p>Obtén las canciones de un artista compuestas en la escala que elijas.</p>
                        <p>Prueba <Link to="/ArtistKeyFInder">Artist Key Finder</Link></p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={3} key={3}>
                <Animator animation={FadeUp} key={3}>
                    <div key={4} className="subSection">
                        <h3>Song Key Finder</h3>
                        <p>Busca una canción para obtener su escala y tempo.</p>
                        <p>Prueba <Link to="/SongKeyFInder">Song Key Finder</Link></p>
                    </div>
                </Animator>
            </ScrollPage>

        </ScrollContainer>

    )
}