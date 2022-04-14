import React from 'react'
import { ToolsNav } from '../navs/ToolsNav'

export function Header(){
    return (
        <header id="header">
            <div className="container_centro">
                <div className="linea-flex-start">
                    <h1 className="titulo">Lemonade</h1>
                </div>
                <p>Por productores, para productores...</p>
                <nav>
                    <a href="#empezar">Empezar</a>
                    <a href="#tutorial">Tutorial</a>
                    <a href="#contacto">Contacto</a>
                </nav>

                <ToolsNav />
            </div>
        </header>
    )
}