import React from 'react'

export function SobreElProyecto() {

    return (
        <>
            <h2 style={{position:'sticky', top:'1em'}}>Sobre el proyecto</h2>
                <div className='subSection'>
                    <h3>Idea original</h3>
                    <p>La idea de este proyecto surge tras descubrir las posibilidades que ofrece el API de Spotify y como un reto personal para mi.</p>
                    <p>Empecé el desarrollo de Lemonade con Javascript puro, pero rápidamente me di cuenta de que una aplicación de estas características requería de alguna librería o framework para que fuera viable y más sostenible. Por eso aprendí React y me puse manos a la obra.</p>
                </div>
                <div className='subSection'>
                    <h3>Desarrollo</h3>
                    <p>Esta aplicación ha sido desarrollada durante los meses de abril y mayo del 2022 durante mi estancia en Polonia, primero como proyecto personal y segundo como anexo a mi proyecto final del grado superior de Desarrollo de Aplicaciones Web</p>
                </div>

                <div className='subSection'>
                    <h3>Líneas de trabajo futuras</h3>
                    <p>Se pretende implementar un backend que permita a los usuarios registrarse y poder guardar ciertas búsquedas.</p>
                </div>
        </>
    )
}