import React from 'react'
import { Contacto } from './Contacto';
import { Link } from 'react-router-dom'
import logoInstagram from '../../../../assets/images/logoInstagram.svg'
import logoGitHub from '../../../../assets/images/logoGitHub.svg'
import { Image } from '../../../atoms/Image';
import { ScrollContainer, ScrollPage, Animator, batch, MoveIn, Move, Zoom, StickyIn, Sticky, Fade } from 'react-scroll-motion'
export function Tutorial() {
    const FadeUp = batch(Fade(0, 1), Sticky(50, 50), Move(0, 1000, 0, -100));

    return (
        <ScrollContainer snap='none'>

            <h2 id="tutorial" style={{ position: 'sticky', top: '1em' }}>Tutorial</h2>
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

            <h2 id="tutorial" style={{ position: 'sticky', top: '1em', background: 'var(--fondo)' }}>Sobre el proyecto</h2>
            <ScrollPage page={4} key={4}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={0}>
                    <div className='subSection'>
                        <h3>Idea original</h3>
                        <p>La idea de este proyecto surge tras descubrir las posibilidades que ofrece el API de Spotify y como un reto personal para mi.</p>
                        <p>Empecé el desarrollo de Lemonade con Javascript puro, pero rápidamente me di cuenta de que una aplicación de estas características requería de alguna librería o framework para que fuera viable y más sostenible. Por eso aprendí React y me puse manos a la obra.</p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={5} key={5}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={0}>
                    <div className='subSection'>
                        <h3>Desarrollo</h3>
                        <p>Esta aplicación ha sido desarrollada durante los meses de abril y mayo del 2022 durante mi estancia en Polonia, primero como proyecto personal y segundo como anexo a mi proyecto final del grado superior de Desarrollo de Aplicaciones Web</p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={6} key={6}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={0}>
                    <div className='subSection'>
                        <h3>Líneas de trabajo futuras</h3>
                        <p>Se pretende implementar un backend que permita a los usuarios registrarse y poder guardar ciertas búsquedas.</p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={7} key={7}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={0}>
                    
                </Animator>
            </ScrollPage>

            {/* <h2 style={{ position: 'sticky', top: '1em', background: 'var(--fondo)' }}>Contacto</h2>
            <ScrollPage page={7} key={7}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={0}>
                    <div className="subSection">
                        <h3>¡Siguenos en instagram!</h3>
                        <div className="linea-flex-center">
                            <a href="https://www.instagram.com/lemonade.tools/" target='blank' className="boton_redes instagram">
                                <Image alt='icono instagram' src={logoInstagram} size='S' />
                                Instagram
                            </a>
                        </div>
                        <h3>Mira el código en Github</h3>
                        <a href="https://github.com/SurvivingCuriosity/Lemonade_react" target='blank' className="boton_redes github">
                            <Image alt='icono github' src={logoGitHub} size='S' />
                            Github
                        </a>
                    </div>
                </Animator>
            </ScrollPage> */}

        </ScrollContainer>
    )
}