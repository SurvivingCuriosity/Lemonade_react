import React from "react";
import icon_song from '../../../assets/images/tarjeta/icon_song.svg'
import icon_artist from '../../../assets/images/tarjeta/icon_artist.svg'
import icon_time from '../../../assets/images/tarjeta/icon_time.svg'
import icon_fuego from '../../../assets/images/tarjeta/icon_fuego.svg'
import { getStringFromEscala, getStringFromNota, getCadenaArtistas, truncaNombreLargo, milisegundosAString } from "../../../helpers/FormatingData";
import { Image } from "../../atoms/Image";
import { IconAndText } from "../../containers/IconAndText";
import { useTranslation } from "react-i18next";

export default function (props) {
    const { isClickable, selectionCallback, jsonData, reducirInformacion, noFoto } = props;
    const [t, i18n] = useTranslation('global')
    //extraigo los datos que quiero mostrar del json
    const songKey = getStringFromNota(jsonData.key) || 'Sin definir';
    const songMode = getStringFromEscala(jsonData.mode) || '';

    const songBPM = Math.round(jsonData.bpm)>1 ? Math.round(jsonData.bpm) : '0';
    const duracionCancion = milisegundosAString(jsonData.duration_ms) || 'Sin definir';
    const link = jsonData.external_urls.spotify || 'Sin definir'
    const popularity = jsonData.popularity || 'Sin definir';

    const imgCancion = (jsonData.album.images[0]) ? (jsonData.album.images[0].url) : icon_artist;

    let nombreArtista = getCadenaArtistas(jsonData.artists) || 'Sin definir';
    nombreArtista = truncaNombreLargo(nombreArtista, reducirInformacion);

    let nombreCancion = jsonData.name || 'Sin definir';
    nombreCancion = truncaNombreLargo(nombreCancion, reducirInformacion)



    function handleEleccionTarjeta() {
        if (jsonData.id) {
            selectionCallback(jsonData);
        } else {
            selectionCallback({ error: "Unable to obtain data from TarjetaArtista" });
        }
    }

    return (
        //si es clickable, le anado la clase clickable (efectos para el hover)
        <li className={`tarjeta_res tarjeta ${isClickable ? "clickable" : ""}`} onClick={isClickable && handleEleccionTarjeta}>
            <div className="--tarjeta-left">
                {!noFoto && <Image src={imgCancion} alt='Carátula del album' size='M' />}

                <div className="--tarjeta-datos">
                    <IconAndText>
                        <Image src={icon_song} alt='Carátula del album' size='icon' />
                        <p>{nombreCancion}</p>
                    </IconAndText>

                    <IconAndText>
                        <Image src={icon_artist} alt='Carátula del album' size='icon' />
                        <p>{nombreArtista}</p>
                    </IconAndText>

                    <IconAndText>
                        <Image src={icon_time} alt='Carátula del album' size='icon' />
                        <p>{duracionCancion}</p>
                    </IconAndText>

                </div>
            </div>

            <div className="--tarjeta-right">
                <a href={link} target='_blank'>{t('tools.spotify-text')}</a>
                <div className="--tarjeta-info-bpm-scale">
                    <p>{songBPM} BPM</p>
                    <p className="linea-flex-start">{`${songKey}${songMode}`}</p>
                    {popularity >= 85 && <Image src={icon_fuego} alt='icono fuego' size='S' className={'--tarjeta-img-fuego'} />}
                </div>
            </div>
        </li>
    )
}