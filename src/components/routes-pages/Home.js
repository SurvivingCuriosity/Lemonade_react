import React from 'react'
import {Header} from '../big-containers/Header'
import {Main} from '../big-containers/Main'


import { BottomNav } from '../navs/BottomNav'

export function Home(){
    return (
        <main>
            <Header />
            <Main />
            <BottomNav />
        </main>
    )
}