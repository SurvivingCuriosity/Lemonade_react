import React from 'react'

export function TopNav(){
    return (
        <div className="fixed-top-nav">
            <div>
                <a id="btnLoginOut" className="boton" href="index.php?ctl=login">Iniciar Sesión</a>
                <button id="theme-switcher" className="boton">Cambiar tema</button>
            </div>
            
            <div className="botoneraRedes">
                <a href="#">

                </a>
                <a href="#">

                </a>
            </div>
        </div>

    )
}