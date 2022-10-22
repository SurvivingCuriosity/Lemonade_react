import React from "react";
import icon_song from '../../../assets/images/tarjeta/icon_song.svg'
import icon_artist from '../../../assets/images/tarjeta/icon_artist.svg'
import icon_time from '../../../assets/images/tarjeta/icon_time.svg'
import icon_fuego from '../../../assets/images/tarjeta/icon_fuego.svg'
import { getStringFromEscala, getStringFromNota, getCadenaArtistas, truncaNombreLargo, milisegundosAString } from "../../../helpers/FormatingData";
import { Image } from "../../atoms/Image";
import { IconAndText } from "../../containers/IconAndText";

export default function (props) {
    const { isClickable, selectionCallback, jsonData, reducirInformacion } = props;

    //extraigo los datos que quiero mostrar del json
    const songKey = getStringFromNota(jsonData.key);
    const songMode = getStringFromEscala(jsonData.mode);
    const songBPM = jsonData.bpm
    let imgCancion = (jsonData.album.images[0]) ? (jsonData.album.images[0].url) : jsonData.images[0].url
    let nombreArtista = getCadenaArtistas(jsonData.artists);
    const nombreCancion = jsonData.name
    const duracionCancion = milisegundosAString(jsonData.duration_ms);
    const link = jsonData.external_urls.spotify
    const popularity = jsonData.popularity;

    //si no llega imagen, usamos la de por defecto
    if (imgCancion === null) {
        imgCancion = icon_artist
    }

    if (reducirInformacion) {
        nombreArtista = getCadenaArtistas(jsonData.artists, true);
    }

    function handleEleccionTarjeta() {
        if (jsonData.id) {
            selectionCallback(jsonData);
        } else {
            selectionCallback({ error: "Unable to obtain data from TarjetaArtista" });
        }
    }

    return (
        //si es clickable, le anado la clase clickable (efectos para el hover)
        <div className={`tarjeta ${isClickable ? "clickable" : ""}`} onClick={isClickable ? handleEleccionTarjeta : undefined}>
            <div className="--tarjeta-left">
                <Image src={imgCancion} alt='Carátula del album' size='M' />

                <div className="--tarjeta-datos">
                    {nombreCancion &&
                        <IconAndText>
                            <Image src={icon_song} alt='Carátula del album' size='icon' />
                            <p>{truncaNombreLargo(nombreCancion, reducirInformacion)}</p>
                        </IconAndText>
                    }
                    {nombreArtista &&
                        <IconAndText>
                            <Image src={icon_artist} alt='Carátula del album' size='icon' />
                            <p>{truncaNombreLargo(nombreArtista, reducirInformacion)}</p>
                        </IconAndText>
                    }
                    {duracionCancion &&
                        <IconAndText>
                            <Image src={icon_time} alt='Carátula del album' size='icon' />
                            <p>{duracionCancion}</p>
                        </IconAndText>
                    }
                </div>
            </div>

            <div className="--tarjeta-right">
                <a href={link} target='_blank'>Ver en Spotify</a>
                <div className="--tarjeta-info-bpm-scale">
                    {songBPM && <p>{Math.round(songBPM)} BPM</p>}
                    {songKey && <p className="linea-flex-start">{`${songKey}${songMode}`}</p>}
                    {popularity >= 85 && <Image src={icon_fuego} alt='icono fuego' size='S' className={'--tarjeta-img-fuego'} />}
                </div>
            </div>
        </div>
    )
}