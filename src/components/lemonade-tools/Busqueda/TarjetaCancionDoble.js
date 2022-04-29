import React from "react";
import icon_song from '../../../images/tarjeta/icon_song.svg'
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_time from '../../../images/tarjeta/icon_time.svg'


export default function (props){
    const tamanoImagen = '65'
    const tamanoIcono = '15'
    const {
        jsonData1,
        jsonData2,
        reducirInformacion
    }=props;
    //extraigo los datos que quiero mostrar del json

    let songKey=jsonData1.key
    let songMode=jsonData1.mode
    let songBPM=jsonData1.bpm

    let imgCancion1=(jsonData1.album.images[0]) ? (jsonData1.album.images[0].url) : jsonData1.images[0].url
    let imgCancion2=(jsonData2.album.images[0]) ? (jsonData2.album.images[0].url) : jsonData2.images[0].url
    
    let nombreArtista1=jsonData1.artists[0].name;
    let nombreArtista2=jsonData2.artists[0].name;

    let nombreCancion1=formatearNombre(jsonData1.name);
    let nombreCancion2=formatearNombre(jsonData2.name);

    let duracionCancion1=jsonData1.duration_ms;
    let duracionCancion2=jsonData2.duration_ms;

    //si no llega imagen, usamos la de por defecto
    if(imgCancion1===null){
        imgCancion1=icon_artist
    }
    if(imgCancion2===null){
        imgCancion2=icon_artist
    }
    //formateo de informacion
    songKey = getStringFromNota(songKey);
    songMode = getStringFromEscala(songMode);

    duracionCancion1 = milisegundosAString(duracionCancion1);
    duracionCancion2 = milisegundosAString(duracionCancion2);


    return(
        //si es clickable, le anado la clase clickable (efectos para el hover)
        <div className={`tarjeta --tarjetaDoble`}>
            {(imgCancion1) && <img src={imgCancion1} className="--tarjetaDoble-img1" style={{width: tamanoImagen + 'px', zIndex:1}} />}
            <div className="--tarjeta-left" style={{ backgroundImage: `url:(${imgCancion1})`}}>
                <div className="--tarjeta-datos --datos1">
                    {(nombreCancion1) && <p className="--tarjeta-dato-nombre"><img src={icon_song} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreCancion1, reducirInformacion)}</p>}
                    {(nombreArtista1) && <p className="--tarjeta-dato1"><img src={icon_artist} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista1, reducirInformacion)}</p>}
                    {(duracionCancion1) && <p className="--tarjeta-dato1"><img src={icon_time} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{duracionCancion1}</p>}
                </div>

            </div>
            
            <div className="--tarjeta-center">
                <div className="--bpm-scale-doble">
                    {(songBPM) && <p>{Math.round(songBPM)} BPM</p>}
                    {(songKey) && <p>{`${songKey}${songMode}`}</p>}
                </div>
            </div>

            {(imgCancion2) && <img src={imgCancion2} className="--tarjetaDoble-img2" style={{width: tamanoImagen + 'px', zIndex:1}} />}
            <div className="--tarjeta-right" style={{ backgroundImage: `url:(${imgCancion2})` }}>
            <div className="--tarjeta-datos --datos2">
                    {(nombreCancion2) && <p className="--tarjeta-dato-nombre"><img src={icon_song} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreCancion2, reducirInformacion)}</p>}
                    {(nombreArtista2) && <p className="--tarjeta-dato1"><img src={icon_artist} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista2, reducirInformacion)}</p>}
                    {(duracionCancion2) && <p className="--tarjeta-dato1"><img src={icon_time} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{duracionCancion2}</p>}
                </div>
            </div>
        </div>
    )

//==========FUNCIONES DE FORMATEO DE INFORMACION
        //1231159->'3:40'
        function milisegundosAString(ms) {
            let minutes = Math.floor(ms / 60000);
            let seconds = ((ms % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        //0->'C', 1->'C#'
        function getStringFromNota(notaInt) {
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

        //0-> 'menor'
        function getStringFromEscala(escalaInt) {
            switch (escalaInt) {
                case 0:
                    return "m"
                case 1:
                    return ""
                default:
                    break;
            }
        }

        //Esto es un nombre largo -> Esto es...
        function truncaNombreLargo(cadena, reducirInformacion){
            if (cadena.length > 30) {
                cadena = cadena.substring(0, 30) + "...";
            }
            if(reducirInformacion) cadena = cadena.substring(0, 15) + "...";
            return cadena;
        }
        function formatearNombre(cadena){
            if(cadena.indexOf('(') == -1){
                return cadena;
            }
            else
                return cadena.substr(0, cadena.indexOf('('));
        }
}