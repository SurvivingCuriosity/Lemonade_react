import React from "react";
import icon_song from '../../../images/tarjeta/icon_song.svg'
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_time from '../../../images/tarjeta/icon_time.svg'
import { truncaNombreLargo } from "../../../helpers/FormatingData";
import { getStringFromEscala } from "../../../helpers/FormatingData";
import { getStringFromNota } from "../../../helpers/FormatingData";
import { getCadenaArtistas } from "../../../helpers/FormatingData";
import { milisegundosAString } from "../../../helpers/FormatingData";

export function TarjetaEleccionCancion (props){
    let tamanoImagen = 50;
    let tamanoIcono = 20;
    let {
        reducirInformacion,
        callbackCambiarEleccion,
        isClickable,
        json
    }=props;
    let songKey="", songMode="", songBPM="", imgCancion="", nombreArtista="", nombreCancion="";
    if(json){
        songKey=getStringFromNota(json.key);
        songMode=getStringFromEscala(json.mode);
        songBPM=json.bpm
        imgCancion=(json.album.images[0]) ? (json.album.images[0].url) : json.images[0].url
        nombreArtista=getCadenaArtistas(json.artists);
        nombreCancion=json.name
    }
    function handleEleccionTarjeta(){}
    return(
        //si es clickable, le anado la clase clickable (efectos para el hover)
        <div className={`tarjeta ${isClickable ? "clickable" : ""} borde`} onClick={isClickable ? handleEleccionTarjeta : undefined }>
            <div className="--tarjeta-left">
                {(imgCancion) && <img src={imgCancion} className="--tarjeta-img-ppal" style={{width: tamanoImagen + 'px'}} />}
                <div className="--tarjeta-datos">
                    {(nombreCancion) && <p className="--tarjeta-dato-nombre"><img src={icon_song} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreCancion, reducirInformacion)}</p>}
                    {(nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista, reducirInformacion)}</p>}
                </div>

            </div>
            <button className='botonCambiarPreview boton2' onClick={callbackCambiarEleccion}>Cambiar cancion</button>
        </div>
    )

       
}