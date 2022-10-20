import React from "react";
import icon_song from '../../../images/tarjeta/icon_song.svg'
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_time from '../../../images/tarjeta/icon_time.svg'
import icon_fuego from '../../../images/tarjeta/icon_fuego.svg'

import { getStringFromEscala, getStringFromNota, getCadenaArtistas, truncaNombreLargo, milisegundosAString } from "../../../helpers/FormatingData";
import { Image } from "../../atoms/Image";
export default function (props){
    const tamanoImagen = '55'
    const tamanoIcono = '15'
    const tamanoIconoFuego = '25'
    
    const {
        isClickable,
        selectionCallback,
        jsonData,
        reducirInformacion
    } = props;
    //extraigo los datos que quiero mostrar del json
    const songKey=getStringFromNota(jsonData.key);
    const songMode=getStringFromEscala(jsonData.mode);
    const songBPM=jsonData.bpm
    let imgCancion=(jsonData.album.images[0]) ? (jsonData.album.images[0].url) : jsonData.images[0].url
    let nombreArtista=getCadenaArtistas(jsonData.artists);
    const nombreCancion=jsonData.name
    const duracionCancion=milisegundosAString(jsonData.duration_ms);
    const link=jsonData.external_urls.spotify
    const popularity=jsonData.popularity;

    //si no llega imagen, usamos la de por defecto
    if(imgCancion===null){
        imgCancion=icon_artist
    }

    if(reducirInformacion){
        nombreArtista=getCadenaArtistas(jsonData.artists,true);
    }

    function handleEleccionTarjeta(){
        selectionCallback(jsonData);
    }

    return(
        //si es clickable, le anado la clase clickable (efectos para el hover)
        <div className={`tarjeta ${isClickable ? "clickable" : ""}`} onClick={isClickable ? handleEleccionTarjeta : undefined }>
            <div className="--tarjeta-left">
                {/* {(imgCancion) && <img src={imgCancion} className="--tarjeta-img-ppal" style={{width: tamanoImagen + 'px'}} />} */}
                <Image 
                    className="--tarjeta-img-ppal"
                    src={imgCancion} 
                    alt='alt' 
                    style={{width: tamanoImagen + 'px', aspectRatio:'1'}}/>
                <div className="--tarjeta-datos">
                    {(nombreCancion) && <p className="--tarjeta-dato-nombre"><img src={icon_song} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreCancion, reducirInformacion)}</p>}
                    {(nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista, reducirInformacion)}</p>}
                    {(duracionCancion) && <p className="--tarjeta-dato1"><img src={icon_time} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{duracionCancion}</p>}
                </div>
                {popularity>=80 ? <img src={icon_fuego} className="--tarjeta-img-fuego" style={{width: tamanoIconoFuego + 'px'}} /> : ""}

            </div>
            
            <div className="--tarjeta-right">
                <a href={link}>Ver en Spotify</a>
                <div className="--tarjeta-info-bpm-scale">
                    {(songBPM) && <p>{Math.round(songBPM)} BPM</p>}
                    {(songKey) && <p className="linea-flex-start">{`${songKey}${songMode}`}</p>}
                </div>
            </div>
        </div>
    )
}