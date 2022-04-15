import React from "react";

import Tarjeta from "./Busqueda/Tarjeta";

import { getToken } from "../../API_calls/apiCalls";
import { buscarArtista } from "../../API_calls/apiCalls";
import { buscarCancion } from "../../API_calls/apiCalls";

export function Busqueda(props){
    const {clickable, tipo} = props;

    const [text, setText] = React.useState("");
    const [resultado, setResultado] = React.useState([]);

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handlesubmit');
        try {
            getToken().then((token)=>{
                switch(tipo){
                    case "cancion":
                        buscarCancion(text,token.data.access_token).then((res)=>{
                            setResultado(res.data.tracks.items)
                        })
                    break;
                    case "artista":
                        buscarArtista(text,token.data.access_token).then((res)=>{
                            setResultado(res.data.artists.items);
                        })
                    break;
                }
            })
        } catch (err) {
          console.log(err);
        }
    };

    React.useEffect(()=>{
        console.log('resultado cambia');
    },[resultado])


    return(
        <div className="busqueda-container">

            <form onSubmit={handleSubmit} className="linea-flex-start">
                <input
                    type="search"
                    value={text}
                    placeholder={`Introduce ${props.tipo}...`}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="busqueda-boton-buscar boton">Buscar</button>
            </form>

            <ul className="busqueda-lista">
                {
                    resultado.map((item) => {
                        // console.log(resultado);
                        switch(props.tipo){
                            case "cancion":
                                return (
                                    <Tarjeta 
                                        key={item.id}
                                        clickable={clickable}
                                        songKey={item.key}
                                        songMode={item.mode}
                                        songBPM={item.bpm}
                                        imgCancion={item.album.images[0].url}
                                        nombreCancion={item.name}
                                        duracionCancion={item.duration_ms}
                                        link={item.external_urls.spotify}
                                    />
                                );
                            case "artista":
                                return (
                                    <Tarjeta 
                                        key={item.id}
                                        clickable={clickable}
                                        imgArtista={item.images[0].url}
                                        nombreArtista={item.name}
                                        seguidoresArtista={item.followers.total}
                                        link={item.external_urls.spotify}
                                    />
                                );
                        }

                    })
                }
            </ul>
        </div>
    )
}