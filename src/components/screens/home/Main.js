import React from 'react'
import {SobreElProyecto} from './static-sections/SobreElProyecto'
import {Contacto} from './static-sections/Contacto'
import { Tutorial } from './static-sections/Tutorial'


export function Main(){
    return (
        <main>
            <Tutorial />
            <SobreElProyecto />
            <Contacto />
        </main>
    )
}