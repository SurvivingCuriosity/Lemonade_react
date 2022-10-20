import React from "react";
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_followers from '../../../images/tarjeta/icon_followers.svg'
import { truncaNombreLargo } from "../../../helpers/FormatingData";
import { numberWithCommas } from "../../../helpers/FormatingData";

export function TarjetaEleccionArtista (props){
    let tamanoImagen = 50;
    let tamanoIcono = 15;
    let {
        isClickable,
        callbackCambiarEleccion,
        json,
        canciones
    }=props;

    let imgArtista="", nombreArtista="", seguidoresArtista = "", link = ""
    if(json){
        imgArtista=(json.images[0]) ? (json.images[0].url) : icon_artist
        nombreArtista=json.name
        seguidoresArtista=json.followers.total
        link=json.external_urls.spotify
    }
    function handleEleccionTarjeta(){}
    return(
        <div className={`tarjeta ${isClickable ? "clickable" : ""} borde`} onClick={isClickable ? handleEleccionTarjeta : undefined }>
            <div className="--tarjeta-left">
                {(imgArtista) && <img className="--tarjeta-img-ppal" src={imgArtista} style={{width: tamanoImagen + 'px'}}/>}
                <div className="--tarjeta-datos">
                    {(nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista)}</p>}
                    {(seguidoresArtista!=1) && <p className="--tarjeta-dato1"><img src={icon_followers} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{numberWithCommas(seguidoresArtista)}</p>}
                    <p>{`${canciones} canciones obtenidas`}</p>
                </div>

            </div>
            {canciones>0 ? <button className='botonCambiarPreview boton2' onClick={callbackCambiarEleccion}>Cambiar artista</button> : ""}
            
        </div>
    )

       
}