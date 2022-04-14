import React from 'react'
import {Comenzar} from './Main/Comenzar'
import {Tutorial} from './Main/Tutorial'
import {Contacto} from './Main/Contacto'
import Busqueda from './Busqueda/Busqueda'
import { BottomNav } from './BottomNav'

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