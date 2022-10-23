import React from "react";
import icon_song from '../../../assets/images/tarjeta/icon_song.svg'
import icon_artist from '../../../assets/images/tarjeta/icon_artist.svg'
import icon_time from '../../../assets/images/tarjeta/icon_time.svg'
import play from '../../../assets/images/reproductor/play.svg'
import stop from '../../../assets/images/reproductor/stop.svg'
import { Reproductor } from "../../molecules/Reproductor";
import { formatearNombre, getStringFromEscala, getStringFromNota, truncaNombreLargo, milisegundosAString } from "../../../helpers/FormatingData";
import { Image } from "../../atoms/Image";
import { IconAndText } from "../../containers/IconAndText";

export default function (props) {
    const tamanoImagen = '65'
    const tamanoIcono = '15'
    const {
        jsonData1,
        jsonData2,
        reducirInformacion
    } = props;
    //extraigo los datos que quiero mostrar del json
    const [mostrarReproductor1, setMostrarReproductor1] = React.useState(false);
    const [mostrarReproductor2, setMostrarReproductor2] = React.useState(false);

    let songKey = jsonData1.key
    let songMode = jsonData1.mode
    let songBPM = jsonData1.bpm

    let imgCancion1 = (jsonData1.album.images[0]) ? (jsonData1.album.images[0].url) : jsonData1.images[0].url
    let imgCancion2 = (jsonData2.album.images[0]) ? (jsonData2.album.images[0].url) : jsonData2.images[0].url

    let nombreArtista1 = jsonData1.artists[0].name;
    let nombreArtista2 = jsonData2.artists[0].name;

    let nombreCancion1 = formatearNombre(jsonData1.name);
    let nombreCancion2 = formatearNombre(jsonData2.name);

    let duracionCancion1 = jsonData1.duration_ms;
    let duracionCancion2 = jsonData2.duration_ms;

    //si no llega imagen, usamos la de por defecto
    if (imgCancion1 === null) {
        imgCancion1 = icon_artist
    }
    if (imgCancion2 === null) {
        imgCancion2 = icon_artist
    }
    //formateo de informacion
    songKey = getStringFromNota(songKey);
    songMode = getStringFromEscala(songMode);

    duracionCancion1 = milisegundosAString(duracionCancion1);
    duracionCancion2 = milisegundosAString(duracionCancion2);


    return (
        //si es clickable, le anado la clase clickable (efectos para el hover)
        <div className={`--tarjetaDoble`} >
            <div className="--tarjetaDoble-canciones">
                <div className="--tarjeta-left2" >
                    <div className="--tarjeta-datos --datos1">
                        {nombreCancion1 &&
                            <IconAndText reverse>
                                <Image src={icon_song} size='icon' alt='icono cancion' />
                                {truncaNombreLargo(nombreCancion1, reducirInformacion)}
                            </IconAndText>
                        }
                        {nombreArtista1 &&
                            <IconAndText reverse>
                                <img src={icon_artist} className="--tarjeta-icono" style={{ width: tamanoIcono + 'px' }} />
                                {truncaNombreLargo(nombreArtista1, reducirInformacion)}
                            </IconAndText>
                        }
                        <button
                            className="--tarjeta-play-preview-button zoom-on-click"
                            onClick={reproduce1}
                        >
                            <img src={mostrarReproductor1 ? stop : play} style={{ width: tamanoImagen + 'px' }} />
                        </button>
                    </div>


                </div>

                <div className="--tarjeta-center">
                    {imgCancion2 && 
                        <img src={imgCancion2} className="--tarjetaDoble-img1" style={{ width: tamanoImagen + 'px', zIndex: 1 }} />
                    }
                    <div className="--bpm-scale-doble">
                        {songBPM && <p>{Math.round(songBPM)} BPM</p>}
                        {songKey && <p>{`${songKey}${songMode}`}</p>}
                    </div>
                    {imgCancion1 && <img src={imgCancion1} className="--tarjetaDoble-img2" style={{ width: tamanoImagen + 'px', zIndex: 1 }} />}
                </div>

                <div className="--tarjeta-right" style={{ backgroundImage: `url:(${imgCancion2})` }}>
                    <div className="--tarjeta-datos --datos2">
                        {nombreCancion2 &&
                            <IconAndText>
                                <Image src={icon_song} size='icon' alt='icono canción' />
                                {truncaNombreLargo(nombreCancion2, reducirInformacion)}
                            </IconAndText>
                        }
                        {nombreArtista2 &&
                            <IconAndText>
                                <Image src={icon_artist} size='icon' alt='icono artista' />
                                {truncaNombreLargo(nombreArtista2, reducirInformacion)}
                            </IconAndText>
                        }
                        <button
                            className="--tarjeta-play-preview-button zoom-on-click"
                            onClick={reproduce2}
                        ><img src={mostrarReproductor2 ? stop : play} style={{ width: tamanoImagen + 'px' }} />
                        </button>
                    </div>
                </div>
            </div>
            {mostrarReproductor1 == true ?
                <Reproductor
                    jsonData={jsonData1}
                />
                :
                ""
            }
            {mostrarReproductor2 == true ?
                <Reproductor
                    jsonData={jsonData2}
                />
                :
                ""
            }
        </div>
    )

    //==========FUNCIONES DE FORMATEO DE INFORMACION







    function reproduce1() {
        if (mostrarReproductor1) {
            setMostrarReproductor1(false);
        } else {
            setMostrarReproductor2(false);
            setMostrarReproductor1(true);
        }
    }
    function reproduce2() {
        if (mostrarReproductor2) {
            setMostrarReproductor2(false);
        } else {
            setMostrarReproductor1(false);
            setMostrarReproductor2(true);
        }
    }
}