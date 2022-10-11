import React from 'react'
import {Header} from '../big-containers/Header'
import {Main} from '../big-containers/Main'


import { ScrollToTop } from '../navs/ScrollToTop'

export function Home(){
    return (
        <>
            <Header />
            <Main />
            <ScrollToTop />
        </>
    )
}