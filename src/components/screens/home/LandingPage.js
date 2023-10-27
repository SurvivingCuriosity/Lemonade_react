import React from 'react'
import lemon from '../../../assets/images/lemon.svg'
import { HeaderBottomNav } from '../../molecules/navs/HeaderBottomNav'

import { useTranslation } from 'react-i18next'
import { SongKeyFinder } from '../../organisms/tools/SongKeyFinder'

export function LandingPage() {
    const [t, i18n] = useTranslation('global');

    return (
            <div className="landing-page-container">
                <header>
                    <div>
                        <img src={lemon} alt="icono limon" className="logo-limon-header" />
                        <h1 className="titulo-main">Lemonade</h1>
                    </div>
                    <p>{t('header.welcome-message')}</p>
                </header>

                <section className='landing-page-bottom-container'>
                    <SongKeyFinder />

                    <div>
                        <a href="#tutorial" className='btn btn-herramientas-landing'>{t('header.tools-btn')}</a>
                        <HeaderBottomNav />
                    </div>
                </section>
            </div>
    )
}