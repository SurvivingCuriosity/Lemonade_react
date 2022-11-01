import React from "react";
import icon_artist from '../../../assets/images/tarjeta/icon_artist.svg'
import icon_followers from '../../../assets/images/tarjeta/icon_followers.svg'
import { Image } from "../../atoms/Image";
import { truncaNombreLargo, numberWithCommas } from "../../../helpers/FormatingData";
import { IconAndText } from "../../containers/IconAndText";
import { useTranslation } from "react-i18next";

export default function (props) {
    const {t} = useTranslation('global')
    const { isClickable, selectionCallback, jsonData } = props;
    let imgArtista = (jsonData.images[0]) ? (jsonData.images[0].url) : icon_artist
    let nombreArtista = truncaNombreLargo(jsonData.name) || 'Sin definir'
    let seguidoresArtista = numberWithCommas(jsonData.followers.total) || 'Sin definir'
    let link = jsonData.external_urls.spotify || 'Sin definir'

    //cuando usuario hace click sobre una tarjeta se llama al callback del padre pasandole el json
    function handleEleccionTarjeta() {
        if(jsonData.id){
            selectionCallback(jsonData);
        }else{
            selectionCallback({ error : "Unable to obtain data from TarjetaArtista" });
        }
    }


    return (
        <div className={`tarjeta ${isClickable && "clickable"}`} onClick={isClickable && handleEleccionTarjeta}>
            <div className="--tarjeta-left">

                <Image src={imgArtista} alt='Imagen del artista' size='M' />

                <div className="--tarjeta-datos">
                    <IconAndText>
                        <Image src={icon_artist} alt='icono artista' size='icon' />
                        <p>{nombreArtista}</p>
                    </IconAndText>

                    <IconAndText>
                        <Image src={icon_followers} alt='icono seguidores artista' size='icon' />
                        <p>{seguidoresArtista}</p>
                    </IconAndText>
                </div>

            </div>

            <div className="--tarjeta-right">
                <a href={link} target='_blank'>{t('tools.spotify-text')}</a>
            </div>
        </div>
    )
}