import React from 'react'

export function ScrollToTop(){
    return (
        <nav className="fixed-bottom-nav">

            <a className="backToTop" href="#top" aria-label="Icono moverse arriba">
                <div className='scroll-up-arrow' onClick={()=>{window.scrollTo(0,0)}}></div>
            </a>

        </nav>
    )
}