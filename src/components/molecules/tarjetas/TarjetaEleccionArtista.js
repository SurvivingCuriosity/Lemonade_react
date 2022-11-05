import React from "react";
import icon_artist from '../../../assets/images/tarjeta/icon_artist.svg'
import icon_followers from '../../../assets/images/tarjeta/icon_followers.svg'
import { truncaNombreLargo } from "../../../helpers/FormatingData";
import { numberWithCommas } from "../../../helpers/FormatingData";
import { Image } from "../../atoms/Image";
import { IconAndText } from "../../containers/IconAndText";
import { CustomSpinner } from '../../atoms/CustomSpinner'
export function TarjetaEleccionArtista(props) {

    const { json, callbackCambiarEleccion, canciones } = props;
    let imgArtista = "", nombreArtista = "", seguidoresArtista = "", link = ""
    if (json) {
        imgArtista = (json.images[0]) ? (json.images[0].url) : icon_artist
        nombreArtista = json.name
        seguidoresArtista = json.followers.total
        link = json.external_urls.spotify
    }
    return (
        <div className={`tarjeta borde fade-in-appear`}>
            <div className="--tarjeta-left">

                <Image src={imgArtista} alt='Imagen del artista' size='M' />

                <div className="--tarjeta-datos">
                    {nombreArtista &&
                        <IconAndText>
                            <Image src={icon_artist} alt='Imagen del artista' size='icon' />
                            <p>{truncaNombreLargo(nombreArtista)}</p>
                        </IconAndText>
                    }
                    {seguidoresArtista != 1 &&
                        <IconAndText>
                            <Image src={icon_followers} alt='Imagen del artista' size='icon' />
                            <p>{numberWithCommas(seguidoresArtista)}</p>
                        </IconAndText>
                    }
                    {canciones > 0
                        ?
                        <p>{`Obtenidas ${canciones} canciones`}</p>
                        :
                        <CustomSpinner size='s' textCanciones/>
                    }
                </div>

            </div>
            <button className='botonCambiarPreview boton_link' onClick={callbackCambiarEleccion}>Cambiar artista</button>
        </div>
    )


}