import React from "react";

export function ArtistMatchFinder(){
    let titulo = "Artist Match Finder"
    let descripcion = "Lorem ipsum"
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
        </div>
    )
}