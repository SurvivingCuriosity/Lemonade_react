import React from "react";
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_followers from '../../../images/tarjeta/icon_followers.svg'
import icon_song from '../../../images/tarjeta/icon_song.svg'
import icon_time from '../../../images/tarjeta/icon_time.svg'

export default function (props){
    let tamanoImagen = '50'
    let tamanoIcono = '15'
    function milisegundosATiempo(ms) {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return(
        <div className={`tarjeta ${props.clickable ? "clickable" : ""}`}>
            <div className="--tarjeta-left">
                {(props.imgCancion) && <img src={props.imgCancion} style={{width: tamanoImagen + 'px'}} />}
                {(props.imgArtista) && <img src={props.imgArtista} style={{width: tamanoImagen + 'px'}} />}
                <div className="--tarjeta-datos">
                    {(props.nombreCancion) && <p className="--tarjeta-dato1"><img src={icon_song} style={{width: tamanoIcono + 'px'}}/>{props.nombreCancion}</p>}
                    {(props.nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} style={{width: tamanoIcono + 'px'}}/>{props.nombreArtista}</p>}
                    {(props.duracionCancion) && <p className="--tarjeta-dato1"><img src={icon_time} style={{width: tamanoIcono + 'px'}}/>{milisegundosATiempo(props.duracionCancion)}</p>}
                    {(props.seguidoresArtista) && <p className="--tarjeta-dato1"><img src={icon_followers} style={{width: tamanoIcono + 'px'}}/>{props.seguidoresArtista} seguidores</p>}
                </div>
                <div>
                    <p>{props.songBPM}</p>
                    <p>{props.songKey}</p>
                    <p>{props.songMode}</p>
                </div>
            </div>
            <div className="--tarjeta-right">
                <a href={props.link}>Ver en Spotify</a>
            </div>
        </div>
    )
}