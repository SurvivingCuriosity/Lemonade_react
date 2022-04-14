import React from 'react'
import {Comunidad} from '../static-sections/Comunidad'
import {Contacto} from '../static-sections/Contacto'

import { BottomNav } from '../navs/BottomNav'

export function Main(){
    return (
        <main>
            <Comunidad />
            <Contacto />
        </main>
    )
}