import React from "react";
import icon_song from '../../../images/tarjeta/icon_song.svg'
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_time from '../../../images/tarjeta/icon_time.svg'


export default function (props){
    const tamanoImagen = '65'
    const tamanoIcono = '15'
    
    const {
        isClickable,
        selectionCallback,
        jsonData,
        reducirInformacion
    }=props;
    console.log(jsonData);
    //extraigo los datos que quiero mostrar del json
    let songKey=jsonData.key
    let songMode=jsonData.mode
    let songBPM=jsonData.bpm
    let imgCancion=(jsonData.album.images[0]) ? (jsonData.album.images[0].url) : jsonData.images[0].url
    let nombreArtista=getCadenaArtistas(jsonData.artists);
    let nombreCancion=jsonData.name
    let duracionCancion=jsonData.duration_ms
    let link=jsonData.external_urls.spotify

    //si no llega imagen, usamos la de por defecto
    if(imgCancion===null){
        imgCancion=icon_artist
    }
    //formateo de informacion
    songKey = getStringFromNota(songKey);
    songMode = getStringFromEscala(songMode);
    duracionCancion = milisegundosAString(duracionCancion);

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
                {(imgCancion) && <img src={imgCancion} className="--tarjeta-img-ppal" style={{width: tamanoImagen + 'px'}} />}
                <div className="--tarjeta-datos">
                    {(nombreCancion) && <p className="--tarjeta-dato-nombre"><img src={icon_song} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreCancion, reducirInformacion)}</p>}
                    {(nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista, reducirInformacion)}</p>}
                    {(duracionCancion) && <p className="--tarjeta-dato1"><img src={icon_time} className="--tarjeta-icono" style={{width: tamanoIcono + 'px'}}/>{duracionCancion}</p>}
                </div>

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
        //[Hola, Adios, Buenas] -> 'Hola • Adios • Buenas'
        function getCadenaArtistas(listaArtistas, mostrarSoloUno=false){
            let cadenaArtistas = "";
            listaArtistas.map((artista,index)=>{
                cadenaArtistas+=artista.name;
                if(index+1!=listaArtistas.length){
                    cadenaArtistas+=" • "
                }
            })
            if(mostrarSoloUno) cadenaArtistas=listaArtistas[0].name;
            return truncaNombreLargo(cadenaArtistas);
        }
}