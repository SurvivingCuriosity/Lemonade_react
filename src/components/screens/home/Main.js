import React from 'react'
import { SobreElProyecto } from './static-sections/SobreElProyecto'
import { Contacto } from './static-sections/Contacto'
import { Tutorial } from './static-sections/Tutorial'
import { ScrollContainer } from 'react-scroll-motion'



export function Main() {
    return (
        <main>
                <section className="section-comunidad container_start">
                    <Tutorial />
                </section>
                <Contacto />
        </main>
    )
}