import React from 'react'
import lemon from '../../../assets/images/lemon.svg'
import { HeaderToolsNav } from '../../molecules/navs/HeaderToolsNav'
import { HeaderBottomNav } from '../../molecules/navs/HeaderBottomNav'

export function Header() {

    return (

        <header id="header">
            <img src={lemon} alt="icono limon" className="logo-limon-header" />
            <div className="container_centro">
                <span>
                    <h1 className="titulo-main">Lemonade</h1>
                    <br></br>
                    <p>Por productores, para productores...</p>
                </span>
                <HeaderToolsNav />
                <HeaderBottomNav />
            </div>
        </header>
    )
}