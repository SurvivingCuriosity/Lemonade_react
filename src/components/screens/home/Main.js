import React from 'react'
import { SobreElProyecto } from './static-sections/SobreElProyecto'
import { Contacto } from './static-sections/Contacto'
import { Tutorial } from './static-sections/Tutorial'



export function Main() {
    return (
        <main>
            <section id="tutorial" className="section-comunidad container_start">
                <Tutorial />
            </section>
            
            <section id="proyecto" className="container_start">
                <SobreElProyecto />
            </section>

            
            <Contacto />
        </main>
    )
}