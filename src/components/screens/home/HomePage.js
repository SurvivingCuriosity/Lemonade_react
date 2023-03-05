import React from 'react'
import {LandingPage} from './LandingPage'
import {Main} from './Main'
import { ScrollToTop } from '../../atoms/ScrollToTop'

export function HomePage(){
    return (
        <>
            <LandingPage />
            <Main />
            <ScrollToTop />
        </>
    )
}