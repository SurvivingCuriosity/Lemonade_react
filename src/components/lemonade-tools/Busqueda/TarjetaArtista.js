import React from "react";
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_followers from '../../../images/tarjeta/icon_followers.svg'

import { truncaNombreLargo, numberWithCommas } from "../../../helpers/FormatingData";

export default function (props){
    const tamanoImagen = '45'
    const tamanoIcono = '15'
    
    let {
        isClickable,
        selectionCallback,
        jsonData
    }=props;


    const imgArtista=(jsonData.images[0]) ? (jsonData.images[0].url) : icon_artist
    const nombreArtista=jsonData.name
    const seguidoresArtista=jsonData.followers.total
    const link=jsonData.external_urls.spotify
    
//cuando usuario hace click sobre una tarjeta se llama al callback del padre pasandole el json
    function handleEleccionTarjeta(){
        selectionCallback(jsonData);
    }


    return(
        <div className={`tarjeta ${isClickable ? "clickable" : ""}`} onClick={isClickable ? handleEleccionTarjeta : undefined }>
            <div className="--tarjeta-left">
                {(imgArtista) && <img className="--tarjeta-img-ppal" src={imgArtista} style={{width: tamanoImagen + 'px'}}/>}
                <div className="--tarjeta-datos">
                    {(nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista)}</p>}
                    {(seguidoresArtista!=1) && <p className="--tarjeta-dato1"><img src={icon_followers} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{numberWithCommas(seguidoresArtista)}</p>}
                </div>

            </div>
            
            <div className="--tarjeta-right">
                <a href={link}>Ver en Spotify</a>
            </div>
        </div>
    )

       
}