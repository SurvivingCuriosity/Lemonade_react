import React from 'react'
import {Link} from 'react-router-dom'
import { HeaderMainNav } from '../navs/HeaderMainNav'
import { HeaderBottomNav } from '../navs/HeaderBottomNav'

export function Header(){
    return (
        <header id="header">
            <div className="container_centro">
                <div className="linea-flex-start">
                    <h1 className="titulo">Lemonade</h1>
                </div>
                <p>Por productores, para productores...</p>

                <HeaderMainNav />
                <HeaderBottomNav />
            </div>
        </header>
    )
}