import React from "react";

import TarjetaCancion from "../../molecules/tarjetas/TarjetaCancion";
import { buscarCancion } from "../../../API_calls/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../../API_calls/apiCalls";
import { getAllAudioFeatures } from "../../../API_calls/apiCustomMethods";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { TmpMessage } from "../../atoms/TmpMessage";

export function BusquedaCancion(props) {
    const { titulo, isSongKeyFinder, haySeleccion, callbackEleccion } = props;
    const [isLoading, setIsLoading] = React.useState(false);
    //texto buscado por el usuario
    const [text, setText] = React.useState("");

    const [temporalMsgConfig, setTemporalMsgConfig] = React.useState({
        msg: '',
        type: ''
    });

    //array de resultados obtenidos tras la busqueda
    const [listaResultados, setListaResultados] = React.useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = React.useState([]);

    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [linkNext, setLinkNext] = React.useState("");
    const [linkPrev, setLinkPrev] = React.useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        setText("");
        if (text === "") {
            return;
        } else {
            setIsLoading(true);
            buscarCancion(text, lleganResultadosDeBusqueda);
        }
    };

    //se ejecuta cada vez que resultadoBusqueda cambia
    React.useEffect(() => {
        //llegan varios
        if (resultadoBusqueda.tracks) {
            if (resultadoBusqueda.tracks.items.length > 0) {
                getAllAudioFeatures(resultadoBusqueda.tracks.items, lleganAudioFeatures);
            } else {
                setTemporalMsgConfig(()=>{return {msg:'No hay resultados', type:'error'}})
                setIsLoading(false)
            }
        //llega uno
        } else if (resultadoBusqueda.id) {
            getAllAudioFeatures(resultadoBusqueda, lleganAudioFeatures);
        }
    }, [resultadoBusqueda])


    //se ejecuta cada vez que audioFeatures cambia
    React.useEffect(() => {
        if (objetosAudioFeatures.length > 0 && !resultadoBusqueda.id) {
            let audioFeatures_conKey = new Map();
            objetosAudioFeatures.map((audioF) => {
                audioFeatures_conKey.set(`${audioF.id}`, audioF);
            })
            //anado a las canciones la informacion que necesito de las audioFeatures y las anado a su categoria
            resultadoBusqueda.tracks.items.map((cancion) => {
                if ((audioFeatures_conKey).get(cancion.id)) {
                    cancion.key =  (audioFeatures_conKey).get(cancion.id).key;
                    cancion.bpm = (audioFeatures_conKey).get(cancion.id).tempo;
                    cancion.mode = (audioFeatures_conKey).get(cancion.id).mode;
                }
            })
            if (resultadoBusqueda.tracks) {
                setLinkNext(resultadoBusqueda.tracks.next)
                setLinkPrev(resultadoBusqueda.tracks.previous)
            }
            setListaResultados(resultadoBusqueda.tracks.items);
        } else {
            if (resultadoBusqueda.id) {
                resultadoBusqueda.key = objetosAudioFeatures[0].key;
                resultadoBusqueda.mode = objetosAudioFeatures[0].mode;
                resultadoBusqueda.bpm = objetosAudioFeatures[0].tempo;
                setListaResultados(resultadoBusqueda);
            }
        }
        setIsLoading(false);
    }, [objetosAudioFeatures])

    const renderButtonsPrevNext = (
        <div>
            {linkNext !== null
                ?
                <button
                    className="boton_link botonPaginaSiguiente"
                    onClick={getPaginaSiguiente}
                >Siguiente página
                </button>
                :
                ""
            }
            {linkPrev !== null
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
            {listaResultados.length > 1 && !haySeleccion ? renderButtonsPrevNext : ""}
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


    //funcion que se ejecuta cuando el usuario selecciona una cancion o artista
    function mandarEleccionAlPadre(userSelection) {
        setListaResultados(() => { return [] })
        callbackEleccion(userSelection);
    }

    function borrarSeleccion() {
        setListaResultados(() => { return [] });
        callbackEleccion([]);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function lleganResultadosDeBusqueda(resultados) {
        setResultadoBusqueda(resultados);
    }

    function lleganAudioFeatures(audio) {
        setObjetosAudioFeatures(audio)
    }

    function getPaginaSiguiente() {
        setIsLoading(true);
        let url = resultadoBusqueda.tracks.next;
        getPaginaSiguienteOAnterior(url, lleganResultadosDeBusqueda)
    }

    function getPaginaAnterior() {
        setIsLoading(true);
        let url = resultadoBusqueda.tracks.previous;
        getPaginaSiguienteOAnterior(url, lleganResultadosDeBusqueda)
    }

    return (
        <div className="fade-in enter-zoom-in busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>

            <form onSubmit={handleSubmit} className="linea-flex-start">
                <span className="input_and_button">
                    <input
                        autoFocus
                        type="search"
                        value={text}
                        placeholder={`Introduce canción...`}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="busqueda-boton-buscar boton zoom-on-click"
                        disabled={text === "" ? true : false}

                    >Buscar
                    </button>
                </span>
            </form>

            {isLoading && <CustomSpinner />}

            {resultadoBusqueda.tracks && <TmpMessage config={temporalMsgConfig} />}
            
            {listaResultados.length > 0 && !haySeleccion ? renderListaResultados : ''}
        </div>
    )
}