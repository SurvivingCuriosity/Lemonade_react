import React from "react";
import {BusquedaCancion} from '../busqueda/BusquedaCancion'

export function SongKeyFinder({getRandomOnInit}){

    return(
        <BusquedaCancion
            titulo="Elige una cancion"
            isSongKeyFinder={true}
            getRandomOnInit
        />
    )
}