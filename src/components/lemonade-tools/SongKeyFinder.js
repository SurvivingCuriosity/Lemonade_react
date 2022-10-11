import React from "react";
import {BusquedaCancion} from '../lemonade-tools/Busqueda/BusquedaCancion'

export function SongKeyFinder(){

    let titulo = "Song Key Finder"
    let descripcion = "Busca una canción para ver su escala y bpm"
    
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="text-center">{descripcion}</p>

            <BusquedaCancion
                titulo="Elige una cancion"
                isSongKeyFinder={true}
                callbackEleccion = {miCallback}
            />
        </div>
    )
    function miCallback(params) {
        
    }
}