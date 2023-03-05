import React from "react";
import TarjetaCancion from "./TarjetaCancion";
import { buscarCancion, getPaginaSiguienteOAnterior } from "../../../api/apiCalls";
import { getAllAudioFeatures } from "../../../api/apiCustomMethods";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { TmpMessage } from "../../atoms/TmpMessage";
import { useTranslation } from 'react-i18next'
import { mergeAudioFeaturesWithSongObject, getMapWithIdAsKey } from '../../../helpers/Tools'
import { ContainerResultadoBusqueda } from "../../containers/ContainerResultadoBusqueda";
export function BusquedaCancion(props) {
    const [t, i18n] = useTranslation('global');
    const { titulo, isSongKeyFinder, haySeleccion, callbackEleccion, getRandomOnInit } = props;
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
    React.useEffect(() => {
        if (getRandomOnInit) {
            buscarCancion('a', lleganResultadosDeBusqueda)
        }
    }, []);

    //se ejecuta cada vez que resultadoBusqueda cambia
    React.useEffect(() => {
        //llegan varios
        if (resultadoBusqueda.tracks) {
            if (resultadoBusqueda.tracks.items.length > 0) {
                getAllAudioFeatures(resultadoBusqueda.tracks.items, lleganAudioFeatures);
            } else {
                setTemporalMsgConfig(() => { return { msg: 'No hay resultados', type: 'error' } })
                setIsLoading(false)
            }
            //llega uno
            //control next prev
            setLinkPrev(resultadoBusqueda?.tracks.previous)

            // if (resultadoBusqueda?.tracks.previous === null) {
            //     setLinkPrev(null)
            // } else {
            //     setLinkPrev(resultadoBusqueda.tracks.previous)
            // }
        } else if (resultadoBusqueda.id) {
            getAllAudioFeatures(resultadoBusqueda, lleganAudioFeatures);
        }


    }, [resultadoBusqueda])


    //se ejecuta cada vez que audioFeatures cambia
    React.useEffect(() => {
        if (objetosAudioFeatures.length > 0 && !resultadoBusqueda.id) {
            let audioFeaturesMap = getMapWithIdAsKey(objetosAudioFeatures);
            let resultado = mergeAudioFeaturesWithSongObject(resultadoBusqueda.tracks.items, audioFeaturesMap);
            setListaResultados(resultado);
        } else {
            if (resultadoBusqueda.id) {
                resultadoBusqueda.key = objetosAudioFeatures[0].key;
                resultadoBusqueda.mode = objetosAudioFeatures[0].mode;
                resultadoBusqueda.bpm = objetosAudioFeatures[0].tempo;
                setListaResultados(resultadoBusqueda);
            }
        }

        //control enlaces next prev
        if (resultadoBusqueda.tracks?.items.length < 5) {
            setLinkNext(null)
        } else {
            setLinkNext(resultadoBusqueda.tracks?.next)
        }

        setIsLoading(false);
    }, [objetosAudioFeatures])

    const renderButtonsPrevNext = (
        <div className="tarjetas-container-header">
            {linkNext !== null
                ?
                <button
                    className="boton_link botonPaginaSiguiente"
                    onClick={getPaginaSiguiente}
                >{t('tools.next-page')}
                </button>
                :
                <div></div>
            }
            {isLoading && <CustomSpinner size='s' textCanciones />}
            {linkPrev !== null
                ?
                <button
                    className="boton_link botonPaginaAnterior"
                    onClick={getPaginaAnterior}
                >{t('tools.prev-page')}
                </button>
                :
                <div></div>
            }
        </div>
    )
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

    //funcion que se ejecuta cuando el usuario selecciona una cancion o artista
    function mandarEleccionAlPadre(userSelection) {
        setListaResultados(() => { return [] })
        callbackEleccion(userSelection);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function lleganResultadosDeBusqueda(resultados) {
        if (resultados.err?.message) {
            setTemporalMsgConfig(() => { return { msg: 'Error de red', type: 'error', remain: true } })
            setIsLoading(false)
            return;
        }
        setTemporalMsgConfig(() => { return {} }) //para borrar mensaje anterior
        setResultadoBusqueda(() => { return resultados });
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
            <h2 className="busqueda-titulo">{isSongKeyFinder ? 'Song key finder' : titulo}</h2>

            <form onSubmit={handleSubmit} className="linea-flex-start">
                        <span className="input_and_button">
                            <input
                                id="input_artista"
                                autoFocus
                                type="search"
                                value={text}
                                placeholder={t('tools.intro-song')}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button
                                id="submit_artista"
                                type="submit"
                                className="busqueda-boton-buscar boton zoom-on-click"
                                disabled={text === "" ? true : false}
                            >{t('tools.button-text')}
                            </button>
                        </span>
                    </form>

            <TmpMessage config={temporalMsgConfig} />

            {listaResultados.length > 0 && !haySeleccion &&
                <ContainerResultadoBusqueda
                    cantidad={listaResultados?.length}
                    linkNext
                    linkPrev
                    isLoading={isLoading}
                    callbackGetSiguiente={getPaginaSiguiente}
                    callbackGetAnterior={getPaginaAnterior}
                >
                    
                    {
                        listaResultados?.map((item) => {
                            return (
                                <TarjetaCancion
                                    key={item.id}
                                    isClickable={(!isSongKeyFinder && !haySeleccion) ? true : false}
                                    selectionCallback={mandarEleccionAlPadre}
                                    jsonData={item}
                                />
                            );
                        })}
                </ContainerResultadoBusqueda>}
        </div>
    )
}