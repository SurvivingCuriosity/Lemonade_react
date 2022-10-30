import React from 'react'
import lemon from '../../../assets/images/lemon.svg'
import { HeaderToolsNav } from '../../molecules/navs/HeaderToolsNav'
import { HeaderBottomNav } from '../../molecules/navs/HeaderBottomNav'

import {useTranslation} from 'react-i18next'

export function Header() {
    const texto = 'Por productores, para productores...'
    const [t, i18n] = useTranslation('global');
    
    return (

        <header id="header">
            <img src={lemon} alt="icono limon" className="logo-limon-header" />
            <div className="container_centro">
                <span>
                    <h1 className="titulo-main">Lemonade</h1>
                    <br></br>
                    <p>{t('header.welcome-message')}</p>
                </span>
                <HeaderToolsNav />
                <HeaderBottomNav />
            </div>
        </header>
    )
}