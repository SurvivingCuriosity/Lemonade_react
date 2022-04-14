import React from 'react'
import {Comenzar} from '../static-sections/Comenzar'
import {Tutorial} from '../static-sections/Tutorial'
import {Contacto} from '../static-sections/Contacto'

import { BottomNav } from '../navs/BottomNav'

export function Main(){
    return (
        <main>
            <Comenzar />
            <Tutorial />
            <Contacto />
            <BottomNav />
        </main>
    )
}