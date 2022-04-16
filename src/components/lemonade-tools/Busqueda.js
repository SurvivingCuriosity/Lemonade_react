import React from "react";

import TarjetaCancion from "./Busqueda/TarjetaCancion";
import TarjetaArtista from "./Busqueda/TarjetaArtista";

import { getToken } from "../../API_calls/apiCalls";
import { buscarArtista } from "../../API_calls/apiCalls";
import { buscarCancion } from "../../API_calls/apiCalls";
import { getAudioFeatures } from "../../API_calls/apiCalls";

export function Busqueda(props){
    const {clickable, tipo, titulo} = props;

    const [text, setText] = React.useState("");
    const [lastText, setLastText] = React.useState("");


    const [msg, setMsg] = React.useState("Aquí aparecerán los resultados");
    const [msgClass, setMsgClass] = React.useState("");
    const [resultado, setResultado] = React.useState([]);

    let agregaDatos = async (lista, token) => {
        lista.map((item)=>{
            getAudioFeatures(item.id,token).then((res2)=>{
                item.bpm = res2.data.tempo;
                item.key = res2.data.key;
                item.mode = res2.data.mode;
            })
            setResultado(lista);
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setText("");
        if(text===""){
            //text input vacio
            setMsgClass("error");
            setMsg("No has introducido texto");
            setResultado([]);
            return;
        }else{
            //text input con texto
            if(text === lastText){
                return;
            }else{
                try {
                    setLastText(text);
                    getToken().then((token)=>{
                        let _token = token.data.access_token;
                        switch(tipo){
                            case "cancion":
                                buscarCancion(text,_token)
                                    .then((res)=>{
                                        if((res.data.tracks.items).length==0){
                                            //busqueda bien pero no resultado
                                            setMsg("No hay resultados para tu búsqueda");
                                            setMsgClass("error");
                                            setResultado([]);
                                        }else{
                                            setMsg("Resultados obtenidos");
                                            setMsgClass("success");

                                            agregaDatos(res.data.tracks.items,_token);
                                        }
                                        // setResultado(res.data.tracks.items)
                                    })
                            break;
                            case "artista":
                                buscarArtista(text,_token)
                                    .then((res)=>{
                                        if((res.data.artists.items).length==0){
                                            //busqueda bien pero no resultado
                                            setMsg("No hay resultados para tu búsqueda");
                                            setMsgClass("error");
                                            setResultado([]);
                                        }else{
                                            setMsg("Resultados obtenidos");
                                            setMsgClass("success");
                                            setResultado(res.data.artists.items)
                                        }
                                    })
                            break;
                        }
                    })
        
                } catch (err) {
                  console.log(err);
                }
            }
        }
    };

    // React.useEffect(()=>{
    //     console.log('resultado cambia');
    // },[resultado])


    return(
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>
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
                <p className={`${msgClass} busqueda-texto-info`}>{msg}</p>
                {
                    resultado.map((item) => {
                        switch(props.tipo){
                            case "cancion":
                                return (
                                    <TarjetaCancion 
                                        key={item.id}
                                        clickable={clickable}
                                        songKey={item.key}
                                        songMode={item.mode}
                                        songBPM={item.bpm}
                                        imgCancion={(item.album.images[0]) ? (item.album.images[0].url) : null}
                                        nombreCancion={item.name}
                                        duracionCancion={item.duration_ms}
                                        link={item.external_urls.spotify}
                                    />
                                );
                            case "artista":
                                return (
                                    <TarjetaArtista
                                        key={item.id}
                                        clickable={clickable}
                                        imgArtista={(item.images[0]) ? (item.images[0].url) : null}
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