import React from "react";
import icon_artist from '../../../images/tarjeta/icon_artist.svg'
import icon_followers from '../../../images/tarjeta/icon_followers.svg'



export default function (props){
    let tamanoImagen = '50'
    let tamanoIcono = '15'
    
    let {
        nombreArtista,
        seguidoresArtista,
        imgArtista,
        clickable,
        link
    }=props;
    
    return(
        <div className={`tarjeta ${clickable ? "clickable" : ""}`}>
            <div className="--tarjeta-left">
                {(imgArtista) && <img src={imgArtista} style={{width: tamanoImagen + 'px'}} />}
                <div className="--tarjeta-datos">
                    {(nombreArtista) && <p className="--tarjeta-dato1"><img src={icon_artist} style={{width: tamanoIcono + 'px'}}/>{truncaNombreLargo(nombreArtista)}</p>}
                    {(seguidoresArtista) && <p className="--tarjeta-dato1"><img src={icon_followers} style={{width: tamanoIcono + 'px'}}/>{numberWithCommas(seguidoresArtista)}</p>}
                </div>

            </div>
            
            <div className="--tarjeta-right">
                <a href={link}>Ver en Spotify</a>
            </div>
        </div>
    )

    
        function truncaNombreLargo(cadena){
            if (cadena.length > 15) {
                cadena = cadena.substring(0, 15) + "...";
            }
            return cadena;
        }

        function numberWithCommas(x) {
            let parts = x.toString().split(".");
            parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
            return parts.join(",");
        }
}