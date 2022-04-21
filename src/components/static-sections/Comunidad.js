import React from 'react'
import logoTwitter from '../../images/logoTwitter.svg'
import logoInstagram from '../../images/logoInstagram.svg'
import logoGitHub from '../../images/logoGitHub.svg'

export function Comunidad(){
    let tamanoIconosRedes=25;
    return (
        <section id="comunidad" className="section-comunidad container_start">
            <h2>Comunidad</h2>
                <div className="subSection">
                <h3>Redes sociales</h3>
                    <div className="linea-flex-center">
                        <a href="" className="boton_redes twitter">
                            <img src={logoTwitter} style={{width: tamanoIconosRedes + 'px'}}/>
                            Twitter
                        </a>
                        <a href="" className="boton_redes instagram">
                            <img src={logoInstagram} style={{width: tamanoIconosRedes + 'px'}}/>
                            Instagram
                        </a>
                    </div>
                </div>
                <div className="subSection">
                <h3>Contribuye en GitHub</h3>
                    <a href="" className="boton_redes github">
                        <img src={logoGitHub} style={{width: tamanoIconosRedes + 'px'}}/>
                        Github
                    </a>
                </div>
                <div className="subSection">
                <h3>Remixes hechos con Lemonade</h3>
                    <iframe style={{borderRadius: ' 15px', maxWidth:'400px'}} src="https://open.spotify.com/embed/playlist/5wrK6rFJ5E8CaGiuziWyrZ?utm_source=generator&theme=0" width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                </div>
        </section>
    )
}