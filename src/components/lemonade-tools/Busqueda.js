import React from "react";

import TarjetaCancion from "./Busqueda/TarjetaCancion";
import TarjetaArtista from "./Busqueda/TarjetaArtista";

import { getToken } from "../../API_calls/apiCalls";
import { buscarArtista } from "../../API_calls/apiCalls";
import { buscarCancion } from "../../API_calls/apiCalls";
import { getAudioFeatures } from "../../API_calls/apiCalls";

export function Busqueda(props){
    const MENSAJE_INIT="Aquí aparecerán los resultados "
    const MENSAJE_NO_TEXTO="No has introducido texto."
    const MENSAJE_SELECCION="Has elegido: "
    const MENSAJE_NO_RESULTADOS="No hay resultados para tu búsqueda."
    const MENSAJE_RESULTADOS="Resultados obtenidos: "

    const {tipo, titulo, parentCallback, parentClickable, haySeleccion} = props;
//texto buscado por el usuario y el ultimo texto valido
    const [text, setText] = React.useState("");
    const [lastText, setLastText] = React.useState("");

//mensajes de error y la clase (mostrar errores en rojo, warnings etc)
    const [msg, setMsg] = React.useState(MENSAJE_INIT);
    const [msgClass, setMsgClass] = React.useState("");
    
    const [isClickable, setIsClickable] = React.useState(true);

//array de resultados obtenidos tras la busqueda
    const [resultado, setResultado] = React.useState([]);

//un json que representa la eleccion del usuario
    const [seleccion, setSeleccion] = React.useState({});

    let agregaDatos = async (lista, token) => {
        lista.map((item)=>{
            getAudioFeatures(item.id,token).then((res2)=>{
                item.bpm = res2.data.tempo;
                item.key = res2.data.key;
                item.mode = res2.data.mode;
            })
            //anado tiempo de espera para que se muestre el bpm y la escala
            window.setTimeout(()=>{
                setResultado(lista);
            },1000)
        })
        return lista;
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setText("");
        if(text===""){
            //text input vacio
            setMsgClass("error");
            setMsg(MENSAJE_NO_TEXTO);
            return;
        }else{
            //text input con texto
            if(text === lastText){
                setLastText("");
                return;
            }else{
                try {
                    getToken().then((token)=>{
                        let _token = token.data.access_token;
                        setLastText(text);
                        switch(tipo){
                            case "cancion":
                                buscarCancion(text,_token)
                                    .then((res)=>{
                                        if((res.data.tracks.items).length==0){
                                            //busqueda bien pero no resultado
                                            setMsg(MENSAJE_NO_RESULTADOS);
                                            setMsgClass("error");
                                        }else{
                                            setMsg(MENSAJE_RESULTADOS);
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

//se ejecuta cada vez que la lista de resultados cambia 
    React.useEffect(()=>{
        //parentClickable es solo para songKeyFinder (es una excepcion: nunca son clickables aunque haya muchos)
        if(parentClickable==false){
            setIsClickable(false);
        }else{
            if(resultado.length==1){
                //Ha elegido
                setMsgClass("success");
                setMsg(MENSAJE_SELECCION);
                setIsClickable(false);
            }else{
                setMsg("");
                //No ha elegido
                setIsClickable(true);
            }
        }
        
    },[resultado])

    return(
        <div className="busqueda-container">
            <h2 className="busqueda-titulo" style={(haySeleccion!=undefined && haySeleccion.id && resultado.length==1) ? {color: 'var(--colorTextoColor)'}: {color: 'var(--blanco3)'}}>{titulo}</h2>

            <form onSubmit={handleSubmit} className="linea-flex-start">
                {(resultado.length==0)
                ? 
                    <span className="input_and_button">
                        <input
                            type="search"
                            value={text}
                            placeholder={`Introduce ${props.tipo}...`}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="busqueda-boton-buscar boton"
                            disabled={text=="" ? true : false}
                            
                            >Buscar
                        </button>
                    </span>
                : 
                ""
                }
                

            </form>

            <p className={`${msgClass} busqueda-texto-info`}>{msg}</p>
            {/* Si ha resultados renderiza la lista */}
            {!resultado.length==0 
                ? 
                    <ul className="busqueda-lista">
                        {
                            resultado.map((item) => {
                                
                                switch(props.tipo){
                                    case "cancion":
                                        return (
                                            <TarjetaCancion 
                                                key={item.id}
                                                isClickable={isClickable}
                                                selectionCallback={handleEleccion}
                                                jsonData={item}
                                            />
                                        );
                                    case "artista":
                                        return (
                                            <TarjetaArtista
                                                key={item.id}
                                                isClickable={isClickable}
                                                selectionCallback={handleEleccion}
                                                jsonData={item}
                                            />
                                        );
                                }
                            })
                        }
                    </ul>
                : 
                    ""
            }
            {(!resultado.length==0)
                ? 
                    <button 
                        className="busqueda-boton-borrar"
                        onClick={borrarSeleccion}
                        >Nueva búsqueda
                    </button>
                : 
                    ""
            }
            
        </div>
    )
    //funcion que se ejecuta cuando el usuario selecciona una cancion o artista
    function handleEleccion(userSelection){
        setResultado([userSelection]);
        parentCallback(userSelection);
    }
    function borrarSeleccion(){
        setResultado([]);
    }
}