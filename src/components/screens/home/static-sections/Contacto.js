import React from 'react'
import logoInstagram from '../../../../images/logoInstagram.svg'
import logoGitHub from '../../../../images/logoGitHub.svg'

export function Contacto(){
    let tamanoIconosRedes=25;
    return (
        <section id="contacto" className="section-comunidad container_start">
            <h2>Contacto</h2>
                <div className="subSection">
                <h3>¡Siguenos en instagram!</h3>
                    <div className="linea-flex-center">
                        <a href="https://www.instagram.com/lemonade.tools/" target='blank' className="boton_redes instagram">
                            <img alt='icono instagram' src={logoInstagram} style={{width: tamanoIconosRedes + 'px'}}/>
                            Instagram
                        </a>
                    </div>
                </div>
                <div className="subSection">
                <h3>Mira el código en Github</h3>
                    <a href="https://github.com/SurvivingCuriosity/Lemonade_react" target='blank' className="boton_redes github">
                        <img alt='icono twitter' src={logoGitHub} style={{width: tamanoIconosRedes + 'px'}}/>
                        Github
                    </a>
                </div>
        </section>
    )
}