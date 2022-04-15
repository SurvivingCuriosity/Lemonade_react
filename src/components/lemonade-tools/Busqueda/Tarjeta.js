import React from "react";
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_followers from '../../../images/tarjeta/icon_followers.svg'
import icon_song from '../../../images/tarjeta/icon_song.svg'
import icon_time from '../../../images/tarjeta/icon_time.svg'


export default function (props){
    let tamanoImagen = '50'
    let tamanoIcono = '15'
    
    let {
        nombreArtista,
        nombreCancion,
        duracionCancion,
        seguidoresArtista,
        songBPM,
        songKey,
        songMode,
        imgArtista,
        imgCancion,
        clickable,
        link
    }=props;
    

    if(imgCancion===null){
        imgCancion=icon_artist
    }
    if(imgArtista===null){
        imgArtista=icon_artist
    }

    return(
        <div className={`tarjeta ${clickable ? "clickable" : ""}`}>
            <div className="--tarjeta-left">
                {(imgCancion) && <img src={imgCancion} style={{width: tamanoImagen + 'px'}} />}
                {(imgArtista) && <img src={imgArtista} style={{width: tamanoImagen + 'px'}} />}
                <div className="--tarjeta-datos">
                    {(nombreCancion) && <p className="--tarjeta-dato1"><img src={icon_song} style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreCancion)}</p>}
                    {(nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista)}</p>}
                    {(duracionCancion) && <p className="--tarjeta-dato1"><img src={icon_time} style={{width: tamanoIcono + 'px'}}/>{milisegundosATiempo(duracionCancion)}</p>}
                    {(seguidoresArtista) && <p className="--tarjeta-dato1"><img src={icon_followers} style={{width: tamanoIcono + 'px'}}/>{numberWithCommas(seguidoresArtista)}</p>}
                </div>

            </div>
            
            <div className="--tarjeta-right">
                <a href={link}>Ver en Spotify</a>
                <div>
                    {(songBPM) && <p>{Math.round(songBPM)}</p>}
                    {(songKey) && <p className="linea-flex-start">{`${getStringNota(songKey)} ${getStringEscala(songMode)}`}</p>}
                </div>
            </div>
        </div>
    )

        // FUNCIONES DE FORMATEO DE INFORMACION
        function milisegundosATiempo(ms) {
            var minutes = Math.floor(ms / 60000);
            var seconds = ((ms % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
    
        function getStringNota(notaInt) {
            switch (notaInt) {
                case 0:
                    return "C";
                case 1:
                    return "C#";
                case 2:
                    return "D";
                case 3:
                    return "D#";
                case 4:
                    return "E";
                case 5:
                    return "F";
                case 6:
                    return "F#";
                case 7:
                    return "G";
                case 8:
                    return "G#";
                case 9:
                    return "A";
                case 10:
                    return "A#";
                case 11:
                    return "B";
            }
        }

        function getStringEscala(escalaInt) {
            switch (escalaInt) {
                case 0:
                    return "menor"
                case 1:
                    return "mayor"
                default:
                    break;
            }
        }

        function truncaNombreLargo(cadena){
            if (cadena.length > 15) {
                cadena = cadena.substring(0, 15) + "...";
            }
            return cadena;
        }

        function numberWithCommas(x) {
            let parts = x.toString().split(".");
            parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
            return parts.join(",");
        }
}