import React from "react";

export default function (props){
    let tamanoImagen = '50'
    return(
        <div className="tarjeta">
            <div className="--tarjeta-left">
                {(props.imgCancion) && <img src={props.imgCancion} style={{width: tamanoImagen + 'px'}}></img>}
                {(props.imgArtista) && <img src={props.imgArtista} style={{width: tamanoImagen + 'px'}}></img>}
                <div className="--tarjeta-datos">
                    {(props.nombreCancion) && <p className="--tarjeta-dato1"><img src={props.iconoCancion}></img>{props.nombreCancion}</p>}
                    {(props.nombreArtista) && <p className="--tarjeta-dato1"><img src={props.iconoArtista}></img>{props.nombreArtista}</p>}
                    {(props.duracionCancion) && <p className="--tarjeta-dato1"><img src={props.iconoDuracion}></img>{props.duracionCancion}</p>}
                    {(props.seguidoresArtista) && <p className="--tarjeta-dato1"><img src={props.iconoSeguidores}></img>{props.seguidoresArtista} seguidores</p>}
                </div>
                <div>
                    <p>{props.songBPM}</p>
                    <p>{props.songKey}</p>
                    <p>{props.songMode}</p>
                </div>
            </div>
            <div className="--tarjeta-right">
                <a href={props.link}>Ver en Spotify</a>
            </div>
        </div>
    )
}