import React from 'react'
import {Link} from 'react-router-dom'
import lemon from '../../../assets/images/lemon.svg'
import { useTranslation } from 'react-i18next';
export function FixedTopNav(){
    const [t, i18n] = useTranslation('global');
    const tamanoImagen = '25';
    return (
        <div className="limon_lemonade_enlace">
            <Link to="/" className="linea-flex-start">
                <img src={lemon} style={{width: tamanoImagen + 'px'}}/>
                <h1 className="tituloTopNav">{t('header.home-btn')}</h1>
            </Link>
        </div>

    )
}