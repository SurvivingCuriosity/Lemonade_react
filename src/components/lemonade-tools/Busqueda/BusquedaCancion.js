import React from "react";

import TarjetaCancion from "./TarjetaCancion";
import { CustomSpinner } from "../../custom-components/CustomSpinner";

import { buscarCancion } from "../../../API_calls/apiCalls";
import { buscarCancionID } from "../../../API_calls/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../../API_calls/apiCalls";
import { getAudioFeatures } from "../../../API_calls/apiCalls";

export function BusquedaCancion(props){
    const MSG_INIT=""
    const MSG_NO_TEXTO="No has introducido texto."
    const MSG_SELECCION="Has elegido: "
    const MSG_NO_RESULTADOS="No hay resultados para tu búsqueda."
    const MSG_RESULTADOS_OBTENIDOS="Resultados obtenidos: "
    const MSG_PREPARANDO_RESULTADOS="Preparando resultados: "
    const MSG_ERROR_PETICION="Error en la búsqueda. Contacta con el programador."

    const {titulo, isSongKeyFinder, haySeleccion, callbackEleccion} = props;
    
    const [isLoading, setIsLoading] = React.useState(false);

//texto buscado por el usuario y el ultimo texto valido
    const [text, setText] = React.useState("");

//mensajes de error y la clase (mostrar errores en rojo, warnings etc)
    const [msg, setMsg] = React.useState(MSG_INIT);
    const [msgClass, setMsgClass] = React.useState("");

//array de resultados obtenidos tras la busqueda
    const [listaResultados, setListaResultados] = React.useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = React.useState({});

    const [linkNext, setLinkNext] = React.useState("");
    const [linkPrev, setLinkPrev] = React.useState("");

    let agregaDatos = async (lista) => {
        setIsLoading(true);
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
            setListaResultados(lista);
        },1000);
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
            if(esSpotifyID(text)){
                try {
                    buscarCancionID(text, miCallbackID);
                } catch (err) {
                    console.log(err);
                }
            }else{
                try {
                    buscarCancion(text, miCallback);
                } catch (err) {
                    console.log(err);
                }
            }
            
        }
    };

//se ejecuta cada vez que la lista de resultados cambia 
    React.useEffect(()=>{
        setIsLoading(false);
        switch (listaResultados.length) {
            case 0:
                setMsg(MSG_INIT);
                break;
            case 1:
                setMsg(MSG_RESULTADOS_OBTENIDOS);
            default:
                if(listaResultados.length>0){
                    if(resultadoBusqueda.tracks){
                        setLinkNext(resultadoBusqueda.tracks.next)
                        setLinkPrev(resultadoBusqueda.tracks.previous)
                    }
                }
        }
        if(haySeleccion) setMsg(MSG_SELECCION);



    },[listaResultados])

    const renderListaResultados = (
        <ul className="busqueda-lista">

            {/* hay mas resultados */}

            {listaResultados.map((item) => {
                return (
                    <TarjetaCancion 
                        key={item.id}
                        isClickable={(listaResultados.length>0 && !isSongKeyFinder && !haySeleccion) ? true : false}
                        selectionCallback={mandarEleccionAlPadre}
                        jsonData={item}
                    />
                );
            })
            }
        </ul>
    )
    const renderButtonsPrevNext=(
        <div>
        {linkNext!=null
        ?
            <button 
                className="boton_link botonPaginaSiguiente"
                onClick={getPaginaSiguiente}
                >Siguiente página
            </button>
        :
            ""
        }
        {linkPrev!=null
        ?
            <button 
                className="boton_link botonPaginaAnterior"
                onClick={getPaginaAnterior}
                >Página anterior
            </button>
        :
            ""
        }
    </div>
    )

    return(
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>

            <form onSubmit={handleSubmit} className="linea-flex-start">
                {(!(listaResultados.length==1))
                ? 
                    <span className="input_and_button">
                        <input
                            type="search"
                            value={text}
                            placeholder={`Introduce canción...`}
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
            {isLoading? <CustomSpinner /> : ""}
            {!isLoading && listaResultados.length>1 ? renderButtonsPrevNext : ""}
            {listaResultados.length>0 ? renderListaResultados : ""}
            
            {(isSongKeyFinder && listaResultados.length>0) || (!isSongKeyFinder && listaResultados.length==1)
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
    function mandarEleccionAlPadre(userSelection){
        console.log('en mandarEleccionAlPadre de busqueda');
        setListaResultados([userSelection]);
        callbackEleccion(userSelection);
    }

    function borrarSeleccion(){
        setListaResultados([]);
        callbackEleccion(listaResultados);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function miCallback(params) {
        setResultadoBusqueda(params);
        if(!(params.tracks)){
            setMsgClass("error");
            setMsg(MSG_ERROR_PETICION);
            setIsLoading(false);
            return;
        }else{
            //no hay resultados parala busqueda
            if((params.tracks && params.tracks.total==0)){
                setIsLoading(false);
                setMsgClass("error");
                setMsg(MSG_NO_RESULTADOS);
                return;
            }else{
                setLinkNext(params.tracks.next);
                setLinkPrev(params.tracks.previous);
                agregaDatos(params.tracks.items);
            }
        }
        
        
        
        
        
        // parentCallback(params);   
    }

    function miCallbackID(params){
        setIsLoading(false);
        if(params=='error'){
            setMsgClass("error");
            setMsg(MSG_ERROR_PETICION)
        }else{
            console.log(params);
            setListaResultados([params]);
            agregaDatos([params]);
        }
    }

    function getPaginaSiguiente(){
        setIsLoading(true);
        let url="";
        url=resultadoBusqueda.tracks.next;
        getPaginaSiguienteOAnterior(url, miCallback)
    }

    function getPaginaAnterior(){
        setIsLoading(true);
        let url="";
        url=resultadoBusqueda.tracks.previous;
        getPaginaSiguienteOAnterior(url, miCallback)
    }

    function esSpotifyID(text){
        if(text.length==22 && !text.includes(' ')) return true; else return false;
    }
}