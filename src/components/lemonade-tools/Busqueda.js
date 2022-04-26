import React from "react";

import TarjetaCancion from "./Busqueda/TarjetaCancion";
import TarjetaArtista from "./Busqueda/TarjetaArtista";

import { buscarArtista } from "../../API_calls/apiCalls";
import { buscarCancion } from "../../API_calls/apiCalls";
import { getAudioFeatures } from "../../API_calls/apiCalls";
import { CustomSpinner } from "../custom-components/CustomSpinner";

export function Busqueda(props){
    const MSG_INIT=""
    const MSG_NO_TEXTO="No has introducido texto."
    const MSG_SELECCION="Has elegido: "
    const MSG_NO_RESULTADOS="No hay resultados para tu búsqueda."
    const MSG_RESULTADOS_OBTENIDOS="Resultados obtenidos: "
    const MSG_TEXTO_REPETIDO="Acabas de buscar: "
    const MSG_PREPARANDO_RESULTADOS="Preparando resultados: "
    const MSG_ERROR_PETICION="Error en la búsqueda. Contacta con el programador."

    const {tipo, titulo, isSongKeyFinder, haySeleccion, callbackEleccion} = props;
    
    const [isLoading, setIsLoading] = React.useState(false);

//texto buscado por el usuario y el ultimo texto valido
    const [text, setText] = React.useState("");

//mensajes de error y la clase (mostrar errores en rojo, warnings etc)
    const [msg, setMsg] = React.useState(MSG_INIT);
    const [msgClass, setMsgClass] = React.useState("");
    
    const [isClickable, setIsClickable] = React.useState(true);

//array de resultados obtenidos tras la busqueda
    const [resultado, setResultado] = React.useState([]);

    let agregaDatos = async (lista) => {
        console.log('en agrega datos');
        lista.map((item)=>{
            getAudioFeatures(item.id).then((res2)=>{
                item.bpm = res2.data.tempo;
                item.key = res2.data.key;
                item.mode = res2.data.mode;
            })
        })
        window.setTimeout(()=>{
            setMsg(MSG_RESULTADOS_OBTENIDOS);
            setIsLoading(false);
            setResultado(lista);
        },2000);
    }


    let handleSubmit = async (e) => {
        e.preventDefault();
        setText("");
        if(text===""){
            //text input vacio
            setMsgClass("error");
            setMsg(MSG_NO_TEXTO);
            return;
        }else{
            setIsLoading(true);
            setMsg("Buscando");
            setMsgClass("success");
            try {
                switch(tipo){
                    case "cancion":
                        buscarCancion(text, miCallback);
                    break;
                    case "artista":
                        buscarArtista(text, miCallback);
                    break;
                }
            } catch (err) {
                console.log(err);
            }
            
        }
    };

//se ejecuta cada vez que la lista de resultados cambia 
    React.useEffect(()=>{
        //isSongKeyFinder es solo para songKeyFinder (es una excepcion: nunca son clickables aunque haya muchos)
        if(isSongKeyFinder){
            setIsClickable(false);
            if(resultado.length==0){
                setMsgClass("success");
                setMsg("");
            }
        }else{
            if(resultado.length>1){
                setIsClickable(true);
                setIsLoading(false);
                setMsg(MSG_RESULTADOS_OBTENIDOS);
                setMsgClass("success");
            }
            if(resultado.length==1){
                //Ha elegido
                setMsgClass("success");
                setMsg(MSG_SELECCION);
                setIsClickable(false);
            }
            if(resultado.length==0){
                setMsg("");
                setIsClickable(false);
            }
        }
    },[resultado])

    const listaResultados = (
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
    )

    return(
        <div className="busqueda-container">
            <h2 className="busqueda-titulo" style={(haySeleccion!=undefined && haySeleccion.id && resultado.length==1) ? {color: 'var(--colorTextoColor)'}: {color: 'var(--blanco3)'}}>{titulo}</h2>

            <form onSubmit={handleSubmit} className="linea-flex-start">
                {(!(haySeleccion!=undefined && haySeleccion.id && resultado.length==1))
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
            {isLoading ? <CustomSpinner /> : ""}
            {resultado.length>0 ? listaResultados : ""}
            
            {((haySeleccion!=undefined && haySeleccion.id && resultado.length==1)||(isSongKeyFinder && resultado.length>0))
                ? 
                    <button 
                        className="busqueda-boton-borrar boton"
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
        callbackEleccion(userSelection);
    }
    function borrarSeleccion(){
        setResultado([]);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function miCallback(params) {
        if((params.tracks && params.tracks.total==0) || (params.artists && params.artists.total==0)){
            //busqueda bien pero no resultado
            setIsLoading(false);
            setMsgClass("error");
            setMsg(MSG_NO_RESULTADOS);
        }else{
            setMsgClass("success");
            setMsg(MSG_PREPARANDO_RESULTADOS);
        }


        switch (tipo) {
            case "artista":
                setResultado(params.artists.items)
                break;
            case "cancion":
                if(isSongKeyFinder){
                    agregaDatos(params.tracks.items);
                }else{
                    setResultado(params.tracks.items);
                }
                break;
        }
        // parentCallback(params);   
    }

}