import React from 'react'
import { Link } from 'react-router-dom'
import { ScrollContainer, ScrollPage, Animator, batch, Move, Sticky, Fade } from 'react-scroll-motion'
import {useTranslation} from 'react-i18next'
export function Tutorial() {

    const [t, i18n] = useTranslation('global');

    const FadeUp = batch(Fade(0, 1), Sticky(50, 50), Move(0, 500, 0, -100));


    const scrollToNextSection= () => {
        window.scrollBy(0, document.documentElement.clientHeight);
    }

    return (
        <ScrollContainer snap='none'>
            <h2 id="tutorial" style={{ position: 'sticky', top: '1em' }}>{t('header.tutorial.encabezado')}</h2>
            <ScrollPage page={0} key={0}>
                <Animator animation={FadeUp} key={0}>
                    <div className="subSection">
                        <h3 id="artist-match-finder">Artist Match Finder</h3>
                        <p>{t('header.tutorial.artistmatchfinder.descripcion')}</p>
                        <p>{t('header.tutorial.prueba')} <Link to="/ArtistMatchFInder">Artist Match Finder</Link></p>
                        <div className='scroll-down-arrow' onClick={scrollToNextSection}></div>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={1} key={1}>
                <Animator  animation={FadeUp} key={1}>
                    <div className="subSection">
                        <h3>Song Match Finder</h3>
                        <p>{t('header.tutorial.songmatchfinder.descripcion')}</p>
                        <p>{t('header.tutorial.prueba')} <Link to="/SongMatchFInder">Song Match Finder</Link></p>
                        <div className='scroll-down-arrow' onClick={scrollToNextSection}></div>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={2} key={2}>
                <Animator animation={FadeUp} key={2}>
                    <div className="subSection">
                        <h3>Artist Key Finder</h3>
                        <p>{t('header.tutorial.artistkeyfinder.descripcion')}</p>
                        <p>{t('header.tutorial.prueba')} <Link to="/ArtistKeyFInder">Artist Key Finder</Link></p>
                        <div className='scroll-down-arrow' onClick={scrollToNextSection}></div>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={3} key={3}>
                <Animator animation={FadeUp} key={3}>
                    <div className="subSection">
                        <h3>Song Key Finder</h3>
                        <p>{t('header.tutorial.songkeyfinder.descripcion')}</p>
                        <p>{t('header.tutorial.prueba')} <Link to="/SongKeyFInder">Song Key Finder</Link></p>
                        <div className='scroll-down-arrow' onClick={()=>{window.scrollBy(0, document.documentElement.clientHeight*2)}}></div>
                    </div>
                </Animator>
            </ScrollPage>

            <h2 id="proyecto" style={{ position: 'sticky', top: '1em', background: 'var(--fondo)' }}>{t('header.proyecto.encabezado')}</h2>


            <ScrollPage page={4} key={4}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={4}>
                    <div className='subSection'>
                        <h3>{t('header.proyecto.idea.titulo')}</h3>
                        <p>{t('header.proyecto.idea.texto')}</p>
                        <p>{t('header.proyecto.idea.texto2')}</p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={5} key={5}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={5}>
                    <div className='subSection'>
                        <h3>{t('header.proyecto.desarrollo.titulo')}</h3>
                        <p>{t('header.proyecto.desarrollo.texto')}</p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={6} key={6}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={6}>
                    <div className='subSection'>
                        <h3>{t('header.proyecto.futuro.titulo')}</h3>
                        <p>{t('header.proyecto.futuro.texto')}</p>
                    </div>
                </Animator>
            </ScrollPage>

            <ScrollPage page={7} key={7}>
                <Animator animation={FadeUp} style={{ width: '100%' }} key={7}>
                </Animator>
            </ScrollPage>
            
        </ScrollContainer>
    )
}