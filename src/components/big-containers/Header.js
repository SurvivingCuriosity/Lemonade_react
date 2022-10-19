import React from 'react'
import lemon from '../../images/lemon.svg'
import { HeaderToolsNav } from '../navs/HeaderToolsNav'
import { HeaderBottomNav } from '../navs/HeaderBottomNav'

export function Header(){
    return (
        <header id="header">
            <img src={lemon} alt="icono limon" className="logo-limon-header"/>
            <div className="container_centro">

                <h1 className="titulo-main">Lemonade</h1>

                <p>Por productores, para productores...</p>

                <HeaderToolsNav />
                <HeaderBottomNav />
            </div>
        </header>
    )
}