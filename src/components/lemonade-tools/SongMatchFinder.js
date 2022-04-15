import React from "react";
import { Busqueda } from "./Busqueda";

export function SongMatchFinder(){
    let titulo = "Song Match Finder"
    let descripcion = "Lorem ipsum"
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            <div className="tool-wrapper">
                <Busqueda 
                    tipo="cancion"
                    clickable={true}
                />
                <Busqueda 
                    tipo="artista"
                    clickable={true}
                />
            </div>
        </div>
    )
}