import React from "react";

import TarjetaCancion from "./Busqueda/TarjetaCancion";
import TarjetaArtista from "./Busqueda/TarjetaArtista";

import { buscarArtista } from "../../API_calls/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../API_calls/apiCalls";
import { buscarCancion } from "../../API_calls/apiCalls";
import { getAudioFeatures } from "../../API_calls/apiCalls";
import { CustomSpinner } from "../custom-components/CustomSpinner";

export function Busqueda(props){
    const MSG_INIT=""
    const MSG_NO_TEXTO="No has introducido texto."
    const MSG_SELECCION="Has elegido: "
    const MSG_NO_RESULTADOS="No hay resultados para tu búsqueda."
    const MSG_RESULTADOS_OBTENIDOS="Resultados obtenidos: "
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
    const [listaResultados, setListaResultados] = React.useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = React.useState({});

    const [linkNext, setLinkNext] = React.useState("");
    const [linkPrev, setLinkPrev] = React.useState("");

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
            setListaResultados(lista);
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
            if(listaResultados.length==0){
                setMsgClass("success");
                setMsg("");
            }
            if(listaResultados.length>0){
                switch (props.tipo) {
                    case "cancion":
                        setLinkNext(resultadoBusqueda.tracks.next)
                        setLinkPrev(resultadoBusqueda.tracks.previous)
                        break;
                    case "artista":
                        setLinkNext(resultadoBusqueda.artists.next)
                        setLinkPrev(resultadoBusqueda.artists.previous)
                        break;
                }
            }
            
        }else{
            if(listaResultados.length>1){
                setIsClickable(true);
                setIsLoading(false);
                setMsg(MSG_RESULTADOS_OBTENIDOS);
                setMsgClass("success");
            }
            if(listaResultados.length==1){
                //Ha elegido
                setMsgClass("success");
                setMsg(MSG_SELECCION);
                setIsClickable(false);
            }
            if(listaResultados.length==0){
                setMsg("");
                setIsClickable(false);
            }
        }

    },[resultadoBusqueda])

    const renderListaResultados = (
        <ul className="busqueda-lista">

            {/* hay mas resultados */}

            {listaResultados.map((item) => {
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
                {(!(haySeleccion!=undefined && haySeleccion.id && listaResultados.length==1))
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
            {!isLoading && listaResultados.length>0 ? renderButtonsPrevNext : ""}
            {listaResultados.length>0 ? renderListaResultados : ""}
            
            {((haySeleccion!=undefined && haySeleccion.id && listaResultados.length==1)||(isSongKeyFinder && listaResultados.length>0))
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
        setListaResultados([userSelection]);
        callbackEleccion(userSelection);
    }
    function borrarSeleccion(){
        setListaResultados([]);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function miCallback(params) {
        setResultadoBusqueda(params);
        if(!(params.tracks || params.artists)){
            setMsgClass("error");
            setMsg(MSG_ERROR_PETICION);
            setIsLoading(false);
            return;
        }
        //no hay resultados parala busqueda
        if((params.tracks && params.tracks.total==0) || (params.artists && params.artists.total==0)){
            setIsLoading(false);
            setMsgClass("error");
            setMsg(MSG_NO_RESULTADOS);
            return;
        }else{
            //hay resultados
            setMsgClass("success");
            setMsg(MSG_PREPARANDO_RESULTADOS);
            switch (tipo) {
                case "artista":
                    setLinkNext(params.artists.next);
                    setLinkPrev(params.artists.previous);
    
                    setResultadoBusqueda(params);
                    setListaResultados(params.artists.items)
                    break;
                case "cancion":
                    setLinkNext(params.tracks.next);
                    setLinkPrev(params.tracks.previous);
    
                    if(isSongKeyFinder){
                        agregaDatos(params.tracks.items);
                    }else{
                        setResultadoBusqueda(params);
                        setListaResultados(params.tracks.items);
                    }
                    break;
                    
            }
            
        }
        
        
        console.log(linkNext);
        console.log(linkPrev);
        
        // parentCallback(params);   
    }

    function getPaginaSiguiente(){
        setIsLoading(true);
        let url="";
        if(props.tipo=="artista"){
            url=resultadoBusqueda.artists.next;
        }else if(props.tipo=="cancion"){
            url=resultadoBusqueda.tracks.next;
        }

        getPaginaSiguienteOAnterior(url, miCallback)
    }
    function getPaginaAnterior(){
        setIsLoading(true);
        let url="";
        if(props.tipo=="artista"){
            url=resultadoBusqueda.artists.previous;
        }else if(props.tipo=="cancion"){
            url=resultadoBusqueda.tracks.previous;
        }

        getPaginaSiguienteOAnterior(url, miCallback)
    }

}