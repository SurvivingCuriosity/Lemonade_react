import React from 'react'
import { Contacto } from './static-sections/Contacto'
import { Tutorial } from './static-sections/Tutorial'



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