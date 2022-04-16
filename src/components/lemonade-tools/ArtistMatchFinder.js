import React from "react";
import {Busqueda} from './Busqueda'

export function ArtistMatchFinder(){
    let titulo = "Artist Match Finder"
    let descripcion = "Lorem ipsum"
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>

            <Busqueda 
                tipo="artista"
                clickable={true}
                titulo="1. Elige un artista"
            />
            <Busqueda 
                tipo="artista"
                clickable={true}
                titulo="2. Elige otro artista"
            />
        </div>

        
    )
}