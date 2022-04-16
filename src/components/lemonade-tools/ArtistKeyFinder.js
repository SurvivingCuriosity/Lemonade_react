import React from "react";
import { Busqueda } from "./Busqueda";
import { KeyScaleSelect } from "./KeyScaleSelect";

export function ArtistKeyFinder(){
    let titulo = "Artist Key Finder"
    let descripcion = "Encuentra canciones de un artista en una escala"

    const [seleccionArtista, setSeleccionArtista] = React.useState([]);
    const [seleccionNota, setSeleccionNota] = React.useState([]);

    

    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            
            <Busqueda 
                tipo="artista"
                titulo="1. Elige un artista"
                clickable={true}
            />
            <KeyScaleSelect 
                clickable={false}
                titulo="2. Elige una nota y escala"
            />
        </div>
    )
}