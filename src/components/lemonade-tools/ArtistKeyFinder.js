import React from "react";
import { Busqueda } from "./Busqueda";

export function ArtistKeyFinder(){
    let titulo = "Artist Key Finder"
    let descripcion = "Lorem ipsum"
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            
            <Busqueda 
                tipo="artista"
                titulo=""
                clickable={false}
            />
        </div>
    )
}