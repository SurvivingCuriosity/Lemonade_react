import React from 'react'
import icon_song from '../../assets/images/tarjeta/icon_song.svg'
import icon_artist from '../../assets/images/tarjeta/icon_artist.svg'
import icon_time from '../../assets/images/tarjeta/icon_time.svg'
import icon_fuego from '../../assets/images/tarjeta/icon_fuego.svg'
import { getStringFromEscala, getStringFromNota, getCadenaArtistas, truncaNombreLargo, milisegundosAString } from "../../helpers/FormatingData";
import { Image } from "../atoms/Image";
import { IconAndText } from "../containers/IconAndText";
import { useTranslation } from "react-i18next";
export const ContainerResultadoIndividual = ({ children, ...props }) => {
    const [t, i18n] = useTranslation('global')
    const { item, reducirInformacion } = props;

    const songKey = getStringFromNota(item?.key) || 'Sin definir';
    const songMode = getStringFromEscala(item?.mode) || '';

    const songBPM = Math.round(item?.bpm) > 1 ? Math.round(item?.bpm) : '0';
    const duracionCancion = milisegundosAString(item?.duration_ms) || 'Sin definir';
    const link = item?.external_urls?.spotify || 'Sin definir'
    const popularity = item?.popularity || 'Sin definir';

    const imgCancion = (item?.album?.images[0]) ? (item?.album?.images[0]?.url) : icon_artist;

    let nombreArtista = getCadenaArtistas(item?.artists) || 'Sin definir';
    nombreArtista = truncaNombreLargo(nombreArtista, reducirInformacion);

    let nombreCancion = item?.name || 'Sin definir';
    nombreCancion = truncaNombreLargo(nombreCancion, reducirInformacion)


    return (
        <div>
            <li className={`tarjeta-artista-grande`}>
                {children}
                {popularity >= 85 && <Image src={icon_fuego} alt='icono fuego' size='S' className={'--tarjeta-img-fuego'} />}
                <img src={imgCancion} alt='Carátula del album'></img>
                <p>{nombreArtista} - {nombreCancion}</p>

                <div className="--tarjeta-info-bpm-scale">
                    <p>{songBPM} BPM</p>
                    <p>{`${songKey}${songMode}`}</p>
                </div>
            </li>
        </div>
    )
}
