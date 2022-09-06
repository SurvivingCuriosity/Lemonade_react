import React from "react";

import TarjetaArtista from "./TarjetaArtista";
import { CustomSpinner } from "../../custom-components/CustomSpinner";
import {mensajes} from '../../../static_data/error_handling.js'
import { buscarArtista } from "../../../API_calls/apiCalls";
import { buscarArtistaID } from "../../../API_calls/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../../API_calls/apiCalls";


export function BusquedaArtista(props){
    const {titulo, haySeleccion, callbackEleccion, queArtistaEs, disabled} = props;
    
    const [isLoading, setIsLoading] = React.useState(false);

//texto buscado por el usuario y el ultimo texto valido
    const [text, setText] = React.useState("");

//mensajes de error y la clase (mostrar errores en rojo, warnings etc)
    const [msg, setMsg] = React.useState(mensajes.init.texto);
    const [msgClass, setMsgClass] = React.useState(mensajes.init.clase);

//array de resultados obtenidos tras la busqueda
    const [listaResultados, setListaResultados] = React.useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = React.useState({});
    
    const [seleccion, setSeleccion] = React.useState({});

    const [linkNext, setLinkNext] = React.useState("");
    const [linkPrev, setLinkPrev] = React.useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        setText("");
        if(text===""){
            //text input vacio
            return;
        }else{
            setIsLoading(true);
            buscarArtista(text, miCallback);
        }
    };

//se ejecuta cada vez que la lista de resultados cambia 
    React.useEffect(()=>{
        setIsLoading(false);
        switch (listaResultados.length) {
            case 0:
                if(haySeleccion){
                    setMsg(mensajes.seleccion.texto);
                    setMsgClass(mensajes.seleccion.clase);
                }else{
                    setMsg(mensajes.error_no_resultados.texto);
                    setMsgClass(mensajes.error_no_resultados.clase);
                }
                break;
            case 1:
            default:
                if(listaResultados.length>0){
                    setMsg(mensajes.eligeArtista.texto);
                    setMsgClass(mensajes.eligeArtista.clase);
                    if(resultadoBusqueda.artists){
                        setLinkNext(resultadoBusqueda.artists.next)
                        setLinkPrev(resultadoBusqueda.artists.previous)
                    }
                }
        }
    },[resultadoBusqueda, listaResultados])

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
    const renderListaResultados = (
        <ul className="grow-in busqueda-lista">
            <p className={`${msgClass} busqueda-texto-info`}>{msg}</p>
            {listaResultados.length>1 && !haySeleccion ? renderButtonsPrevNext : ""}
            {/* hay mas resultados */}
            {listaResultados.map((item) => {
                return (
                    <TarjetaArtista
                        key={item.id}
                        isClickable={(listaResultados.length>0 && !haySeleccion) ? true : false}
                        selectionCallback={handleEleccion}
                        jsonData={item}
                    />
                );
            })
            }
        </ul>
    )
    const renderTarjetaFinal = (
        <ul className="busqueda-lista">
            <p className={`${msgClass} busqueda-texto-info`}>{msg}</p>
            <TarjetaArtista
                key={seleccion.id}
                isClickable={false}
                selectionCallback={handleEleccion}
                jsonData={seleccion}
            />
        </ul>
    )


    return(
        <div className="fade-in enter-zoom-in busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>
            {isLoading && <CustomSpinner />}
            <form onSubmit={handleSubmit} className="linea-flex-start">
                {(!listaResultados.length>0 && !haySeleccion)
                ? 
                    <span className="input_and_button">
                        <input
                            className={`input_artista_${queArtistaEs}`}
                            autoFocus
                            type="search"
                            disabled={disabled}
                            value={text}
                            placeholder={`Introduce artista...`}
                            onChange={(e) => setText(()=>{return e.target.value})}
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
                
            

            {/* Si ha resultados renderiza la lista */}
           

            {listaResultados.length>0 && !haySeleccion ? renderListaResultados : ""}
            {haySeleccion && renderTarjetaFinal}
            {/* {(listaResultados.length>0 && !haySeleccion)
                ? 
                    <button 
                        className="busqueda-boton-borrar boton"
                        onClick={borrarSeleccion}
                        >Nueva búsqueda
                    </button>
                : 
                    ""
            } */}
            
        </div>
    )
    //funcion que se ejecuta cuando el usuario selecciona una cancion o artista
    function handleEleccion(userSelection){
        setSeleccion(()=>{return userSelection})
        setListaResultados(()=>{return []})
        callbackEleccion(userSelection, queArtistaEs);
    }

    function borrarSeleccion(){
        setListaResultados([]);
        callbackEleccion(listaResultados);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function miCallback(params) {
        setIsLoading(false);
        setResultadoBusqueda(params);
//llega una lista
        if(params.artists){
            //no hay resultados parala busqueda
            if(params.artists && params.artists.total===0){
                return;
            }else{
                setLinkNext(()=>{return params.artists.next});
                setLinkPrev(()=>{return params.artists.previous});
            }
            setResultadoBusqueda(()=>{return params});
            setListaResultados(()=>{return params.artists.items})
//llega solo uno
        }else{
            setResultadoBusqueda(()=>{return [params]});
            setListaResultados(()=>{return [params]})
        }
    }

    function getPaginaSiguiente(){
        let url="";
        url=resultadoBusqueda.artists.next;
        getPaginaSiguienteOAnterior(url, miCallback)
    }

    function getPaginaAnterior(){
        let url="";
        url=resultadoBusqueda.artists.previous;
        getPaginaSiguienteOAnterior(url, miCallback)
    }
}