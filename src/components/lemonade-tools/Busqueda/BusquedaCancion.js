import React from "react";

import TarjetaCancion from "./TarjetaCancion";
import {mensajes} from '../../../static_data/error_handling.js'
import { buscarCancion } from "../../../API_calls/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../../API_calls/apiCalls";
import { getAllAudioFeatures } from "../../../API_calls/apiCustomMethods";

export function BusquedaCancion(props){
    const {titulo, isSongKeyFinder, haySeleccion, callbackEleccion} = props;

//texto buscado por el usuario
    const [text, setText] = React.useState("");

//mensajes de error y la clase (mostrar errores en rojo, warnings etc)
    const [msg, setMsg] = React.useState(mensajes.init.texto);
    const [msgClass, setMsgClass] = React.useState(mensajes.init.clase);

//array de resultados obtenidos tras la busqueda
    const [listaResultados, setListaResultados] = React.useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = React.useState([]);

    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);
    
    const [seleccion, setSeleccion] = React.useState({});

    const [linkNext, setLinkNext] = React.useState("");
    const [linkPrev, setLinkPrev] = React.useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        setText("");
        if(text===""){
            return;
        }else{
            buscarCancion(text, lleganResultadosDeBusqueda);
        }
    };

//se ejecuta cada vez que resultadoBusqueda cambia
    React.useEffect(()=>{
        //llegan varios
        if(resultadoBusqueda.tracks){
            if(resultadoBusqueda.tracks.items.length>0){
                getAllAudioFeatures(resultadoBusqueda.tracks.items, lleganAudioFeatures);
            }
        }else
        if(resultadoBusqueda.id){
            getAllAudioFeatures(resultadoBusqueda, lleganAudioFeatures);
        }
    },[resultadoBusqueda])

    //se ejecuta cada vez que audioFeatures cambia
    React.useEffect(()=>{
        if(objetosAudioFeatures.length>0 && !resultadoBusqueda.id){
            let audioFeatures_conKey = new Map();
            objetosAudioFeatures.map((audioF)=>{
                audioFeatures_conKey.set(`${audioF.id}`, audioF);
            })
            //anado a las canciones la informacion que necesito de las audioFeatures y las anado a su categoria
            resultadoBusqueda.tracks.items.map((cancion)=>{
                if((audioFeatures_conKey).get(cancion.id)){
                    let nota = (audioFeatures_conKey).get(cancion.id).key;
                    let escala = (audioFeatures_conKey).get(cancion.id).mode;
                    let bpm = (audioFeatures_conKey).get(cancion.id).tempo;
        
                    cancion.key=nota
                    cancion.bpm=bpm
                    cancion.mode=escala
                }
            })
            setListaResultados(resultadoBusqueda.tracks.items);
        }else{
            if(resultadoBusqueda.id){
                resultadoBusqueda.key = objetosAudioFeatures[0].key;
                resultadoBusqueda.mode = objetosAudioFeatures[0].mode;
                resultadoBusqueda.bpm = objetosAudioFeatures[0].tempo;
                setListaResultados(resultadoBusqueda);
            }
        }
    },[objetosAudioFeatures])

    const renderListaResultados = (
        <ul className="busqueda-lista">
        <p className={`${msgClass} busqueda-texto-info`}>{msg}</p>
            {/* hay mas resultados */}
            {listaResultados.id ?
                < TarjetaCancion 
                    key={listaResultados.id}
                    isClickable={(!isSongKeyFinder && !haySeleccion) ? true : false}
                    selectionCallback={mandarEleccionAlPadre}
                    jsonData={listaResultados}
                /> 
            : 
            listaResultados.map((item) => {
                return (
                    <TarjetaCancion 
                        key={item.id}
                        isClickable={(!isSongKeyFinder && !haySeleccion) ? true : false}
                        selectionCallback={mandarEleccionAlPadre}
                        jsonData={item}
                    />
                );
            })}
        </ul>
    )

    const renderEleccion = (
        <ul className="busqueda-lista">
            <p className={`${msgClass} busqueda-texto-info`}>{msg}</p>
            <TarjetaCancion 
                key={seleccion.id}
                isClickable={(listaResultados.length>0 && !isSongKeyFinder && !haySeleccion) ? true : false}
                selectionCallback={mandarEleccionAlPadre}
                jsonData={seleccion}
            />

        </ul>
    )
    
    const renderButtonsPrevNext=(
        <div>
        {linkNext!=null
        ?
            <button 
                className="boton_link botonPaginaSiguiente zoom-on-click"
                onClick={getPaginaSiguiente}
                >Siguiente página
            </button>
        :
            ""
        }
        {linkPrev!=null
        ?
            <button 
                className="boton_link botonPaginaAnterior zoom-on-click"
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
                {!haySeleccion
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
                            className="busqueda-boton-buscar boton zoom-on-click"
                            disabled={text==="" ? true : false}
                            
                            >Buscar
                        </button>
                    </span>
                : 
                ""
                }
            </form>

            
            
            {listaResultados.length>1 && !haySeleccion ? renderButtonsPrevNext : ""}
            {listaResultados.length>0 || listaResultados.id && !haySeleccion ? renderListaResultados : ""}
            {haySeleccion ? renderEleccion : ""}
            {haySeleccion
                ? 
                    <button 
                        className="busqueda-boton-borrar boton zoom-on-click"
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
        setSeleccion(()=>{return userSelection})
        setListaResultados(()=>{return []})
        callbackEleccion(userSelection);
    }

    function borrarSeleccion(){
        setListaResultados(()=>{return []});
        callbackEleccion([]);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function lleganResultadosDeBusqueda(resultados) {
        console.log('Llegan resultados de búsqueda');
        setResultadoBusqueda(resultados);
    }

    function lleganAudioFeatures(audio){
        console.log('Llegan audio features');
        setObjetosAudioFeatures(audio)
    }

    function getPaginaSiguiente(){
        setResultadoBusqueda([]);
        let url="";
        url=resultadoBusqueda.tracks.next;
        getPaginaSiguienteOAnterior(url, lleganResultadosDeBusqueda)
    }

    function getPaginaAnterior(){
        setResultadoBusqueda([]);
        let url="";
        url=resultadoBusqueda.tracks.previous;
        getPaginaSiguienteOAnterior(url, lleganResultadosDeBusqueda)
    }
}