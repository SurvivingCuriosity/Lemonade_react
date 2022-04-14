import React from 'react'
import {TopNav} from '../navs/TopNav';

export function Header(){
    return (
        <header id="header">
            <TopNav />
            <div className="container_centro">
                <div className="linea-flex-start">
                    <h1>Lemonade</h1>
                </div>
                <p>Por productores, para productores...</p>
                <nav>
                    <a href="#empezar">Empezar</a>
                    <a href="#tutorial">Tutorial</a>
                    <a href="#contacto">Contacto</a>
                </nav>

            </div>
        </header>
    )
}