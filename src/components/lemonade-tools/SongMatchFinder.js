import React from "react";
import { Busqueda } from "./Busqueda";

export function SongMatchFinder(){
    let titulo = "Song Match Finder"
    let descripcion = "Obten una lista de canciones de un artista elegido, compatibles con la cancion introducida"


    
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            <div className="tool-wrapper">
                <Busqueda 
                    tipo="cancion"
                    clickable={true}
                    titulo="1. Elige una canción"
                />
                <Busqueda 
                    tipo="artista"
                    clickable={true}
                    titulo="2. Elige un artista"
                />
            </div>
        </div>
    )
}