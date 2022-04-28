import React from "react";

import TarjetaArtista from "./TarjetaArtista";
import { CustomSpinner } from "../../custom-components/CustomSpinner";

import { buscarArtista } from "../../../API_calls/apiCalls";
import { buscarArtistaID } from "../../../API_calls/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../../API_calls/apiCalls";


export function BusquedaArtista(props){
    const MSG_INIT=""
    const MSG_NO_TEXTO="No has introducido texto."
    const MSG_SELECCION="Has elegido: "
    const MSG_NO_RESULTADOS="No hay resultados para tu búsqueda."
    const MSG_RESULTADOS_OBTENIDOS="Resultados obtenidos: "
    const MSG_PREPARANDO_RESULTADOS="Preparando resultados: "
    const MSG_ERROR_PETICION="Error en la búsqueda. Contacta con el programador."

    const {titulo, isSongKeyFinder, haySeleccion, callbackEleccion, queArtistaEs} = props;
    
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
                    buscarArtistaID(text, miCallbackID);
                } catch (err) {
                    console.log(err);
                }
            }else{
                try {
                    buscarArtista(text, miCallback);
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
                    if(resultadoBusqueda.artists){
                        setLinkNext(resultadoBusqueda.artists.next)
                        setLinkPrev(resultadoBusqueda.artists.previous)
                    }
                }
        }
        if(haySeleccion) setMsg(MSG_SELECCION);




    },[resultadoBusqueda, listaResultados])

    const renderListaResultados = (
        <ul className="busqueda-lista">

            {/* hay mas resultados */}

            {listaResultados.map((item) => {
                return (
                    <TarjetaArtista
                        key={item.id}
                        isClickable={(listaResultados.length>0 && !isSongKeyFinder && !haySeleccion) ? true : false}
                        selectionCallback={handleEleccion}
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
                            placeholder={`Introduce artista...`}
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
            
            {listaResultados.length>0
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
        console.log(queArtistaEs);
        setListaResultados([userSelection]);
        callbackEleccion(userSelection, queArtistaEs);
    }

    function borrarSeleccion(){
        setListaResultados([]);
        callbackEleccion(listaResultados);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function miCallback(params) {
        setResultadoBusqueda(params);
        if(!params.artists){
            setMsgClass("error");
            setMsg(MSG_ERROR_PETICION);
            setIsLoading(false);
            return;
        }
        //no hay resultados parala busqueda
        if(params.artists && params.artists.total==0){
            setIsLoading(false);
            setMsgClass("error");
            setMsg(MSG_NO_RESULTADOS);
            return;
        }else{
            //hay resultados
            setMsgClass("success");
            setMsg(MSG_PREPARANDO_RESULTADOS);
            setLinkNext(params.artists.next);
            setLinkPrev(params.artists.previous);

            setResultadoBusqueda(params);
            setListaResultados(params.artists.items)
            
        }
    }

    function miCallbackID(params){
        if(params=='error'){
            setMsgClass("error");
            setMsg(MSG_ERROR_PETICION)
        }else{
            console.log(params);
            setListaResultados([params]);
            setIsLoading(false);
        }
    }

    function getPaginaSiguiente(){
        setIsLoading(true);
        let url="";
        url=resultadoBusqueda.artists.next;

        getPaginaSiguienteOAnterior(url, miCallback)
    }

    function getPaginaAnterior(){
        setIsLoading(true);
        let url="";
        url=resultadoBusqueda.artists.previous;
        getPaginaSiguienteOAnterior(url, miCallback)
    }

    function esSpotifyID(text){
        if(text.length==22) return true; else return false;
    }
}