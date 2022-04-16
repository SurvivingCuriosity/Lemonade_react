import React from "react";

import {Busqueda} from '../lemonade-tools/Busqueda'

export function SongKeyFinder(){

    let titulo = "Song Key Finder"
    let descripcion = "Busca una canción para ver su escala y bpm"

    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>

            <Busqueda 
                tipo="cancion"
                clickable={false}
                titulo="Elige una cancion"
            />


        </div>
    )
}