import React from "react";
import icon_song from '../../../assets/images/tarjeta/icon_song.svg'
import icon_artist from '../../../assets/images/tarjeta/icon_artist.svg'
import { truncaNombreLargo } from "../../../helpers/FormatingData";
import { getStringFromEscala } from "../../../helpers/FormatingData";
import { getStringFromNota } from "../../../helpers/FormatingData";
import { getCadenaArtistas } from "../../../helpers/FormatingData";
import { Image } from "../../atoms/Image";
import { IconAndText } from "../../containers/IconAndText";

export function TarjetaEleccionCancion(props) {

    const { reducirInformacion, callbackCambiarEleccion, isClickable, json } = props;

    let songKey = "", songMode = "", songBPM = "", imgCancion = "", nombreArtista = "", nombreCancion = "";
    if (json) {
        songKey = getStringFromNota(json.key);
        songMode = getStringFromEscala(json.mode);
        songBPM = json.bpm
        imgCancion = (json.album.images[0]) ? (json.album.images[0].url) : json.images[0].url
        nombreArtista = getCadenaArtistas(json.artists);
        nombreCancion = json.name
    }
    function handleEleccionTarjeta() { }
    return (
        //si es clickable, le anado la clase clickable (efectos para el hover)
        <div className={`tarjeta ${isClickable ? "clickable" : ""} borde`} onClick={isClickable ? handleEleccionTarjeta : undefined}>
            <div className="--tarjeta-left">
                <Image src={imgCancion} alt='Carátula del album' size='M' />
                <div className="--tarjeta-datos">
                    {nombreCancion &&
                        <IconAndText>
                            <Image src={icon_song} alt='Icono canción' size='icon' />
                            <p>{truncaNombreLargo(nombreCancion, reducirInformacion)}</p>
                        </IconAndText>
                    }
                    {nombreArtista &&
                        <IconAndText>
                            <Image src={icon_artist} alt='Icono artista' size='icon' />
                            <p>{truncaNombreLargo(nombreArtista, reducirInformacion)}</p>
                        </IconAndText>
                    }
                    {
                        <p>{`${songKey}${songMode}`}</p>
                    }
                </div>

            </div>
            <button className='botonCambiarPreview boton_link' onClick={callbackCambiarEleccion}>Cambiar canción</button>
        </div>
    )


}