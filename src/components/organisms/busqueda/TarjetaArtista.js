import React from "react";
import icon_artist from '../../../assets/images/tarjeta/icon_artist.svg'
import icon_followers from '../../../assets/images/tarjeta/icon_followers.svg'
import { Image } from "../../atoms/Image";
import { truncaNombreLargo, numberWithCommas } from "../../../helpers/FormatingData";
import { IconAndText } from "../../containers/IconAndText";

export default function (props) {
    const { isClickable, selectionCallback, jsonData } = props;

    const imgArtista = (jsonData.images[0]) ? (jsonData.images[0].url) : icon_artist
    const nombreArtista = jsonData.name
    const seguidoresArtista = jsonData.followers.total
    const link = jsonData.external_urls.spotify

    //cuando usuario hace click sobre una tarjeta se llama al callback del padre pasandole el json
    function handleEleccionTarjeta() {
        if(jsonData.id){
            selectionCallback(jsonData);
        }else{
            selectionCallback({ error : "Unable to obtain data from TarjetaArtista" });
        }
    }

    return (
        <div className={`tarjeta ${isClickable ? "clickable" : ""}`} onClick={isClickable ? handleEleccionTarjeta : undefined}>
            <div className="--tarjeta-left">

                <Image
                    src={imgArtista}
                    alt='Imagen del artista'
                    size='M'
                />

                <div className="--tarjeta-datos">
                    {nombreArtista &&
                        <IconAndText>
                            <Image
                                src={icon_artist}
                                alt='icono artista'
                                size='icon'
                            />
                            <p>{truncaNombreLargo(nombreArtista)}</p>
                        </IconAndText>
                    }
                    {seguidoresArtista > -1 &&
                        <IconAndText>
                            <Image
                                src={icon_followers}
                                alt='icono seguidores artista'
                                size='icon'
                            />
                            <p>{numberWithCommas(seguidoresArtista)}</p>
                        </IconAndText>
                    }
                </div>

            </div>

            <div className="--tarjeta-right">
                <a href={link} target='_blank'>Ver en Spotify</a>
            </div>
        </div>
    )
}