import React from 'react'
import logoInstagram from '../../../../assets/images/logoInstagram.svg'
import logoGitHub from '../../../../assets/images/logoGitHub.svg'
import { Image } from '../../../atoms/Image';

export function Contacto(){
    return (
        <section id="contacto" className="section-comunidad container_start">
            <h2>Contacto</h2>
                <div className="subSection">
                <h3>¡Siguenos en instagram!</h3>
                    <div className="linea-flex-center">
                        <a href="https://www.instagram.com/lemonade.tools/" target='blank' className="boton_redes instagram">
                            <Image alt='icono instagram' src={logoInstagram} size='S'/>
                            Instagram
                        </a>
                    </div>
                </div>
                <div className="subSection">
                <h3>Mira el código en Github</h3>
                    <a href="https://github.com/SurvivingCuriosity/Lemonade_react" target='blank' className="boton_redes github">
                        <Image alt='icono github' src={logoGitHub} size='S'/>
                        Github
                    </a>
                </div>
        </section>
    )
}