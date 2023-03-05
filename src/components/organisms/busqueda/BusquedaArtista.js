import React from "react";
import TarjetaArtista from "./TarjetaArtista";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { buscarArtista } from "../../../api/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../../api/apiCalls";
import { ContainerResultadoBusqueda } from "../../containers/ContainerResultadoBusqueda";
import { useTranslation } from 'react-i18next'

export function BusquedaArtista(props) {
    const [t, i18n] = useTranslation('global');
    const { titulo, haySeleccion, callbackEleccion, queArtistaEs, disabled } = props;
    const [isLoading, setIsLoading] = React.useState(false);

    //texto buscado por el usuario
    const [text, setText] = React.useState("");

    const [temporalMsgConfig, setTemporalMsgConfig] = React.useState({
        msg: '',
        type: ''
    });


    //array de resultados obtenidos tras la busqueda
    const [listaResultados, setListaResultados] = React.useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = React.useState({});

    const [linkNext, setLinkNext] = React.useState("");
    const [linkPrev, setLinkPrev] = React.useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        setText("");
        if (text === "") {
            //text input vacio
            return;
        } else {
            setIsLoading(true);
            buscarArtista(text, miCallback);
        }
    };

    //se ejecuta cada vez que la lista de resultados cambia 
    React.useEffect(() => {
        setIsLoading(false);
        //si resultadoBusqueda.artists significa que se ha realizado una busqueda
        if (resultadoBusqueda.artists) {
            if (listaResultados.length > 0) {
                setLinkNext(() => { return resultadoBusqueda.artists.next })
                setLinkPrev(() => { return resultadoBusqueda.artists.previous })
            } else {
                setTemporalMsgConfig(() => { return { msg: 'No hay resultados', type: 'error' } })
            }
        }
    }, [resultadoBusqueda, listaResultados])




    //funcion que se ejecuta cuando el usuario selecciona una cancion o artista
    function handleEleccion(userSelection) {
        callbackEleccion(userSelection, queArtistaEs);
        setListaResultados(() => { return [] })
    }

    //funcion que se ejecuta cuando llegan los resultados
    function miCallback(resultado) {
        if (resultado.err?.message) {
            setTemporalMsgConfig(() => { return { msg: 'Error de red', type: 'error', remain: true } })
            setIsLoading(false)
            return;
        }
        setTemporalMsgConfig(() => { return {} }) //para borrar mensaje anterior
        setIsLoading(false);
        setResultadoBusqueda(resultado);
        //llega una lista
        if (resultado.artists) {
            //no hay resultados parala busqueda
            if (resultado.artists && resultado.artists.total === 0) {
                return;
            } else {
                setLinkNext(() => { return resultado.artists.next });
                setLinkPrev(() => { return resultado.artists.previous });
            }
            setResultadoBusqueda(() => { return resultado });
            setListaResultados(() => { return resultado.artists.items })
            //llega solo uno
        } else {
            setResultadoBusqueda(() => { return [resultado] });
            setListaResultados(() => { return [resultado] })
        }
    }

    function getPaginaSiguiente() {
        setIsLoading(true);
        let url = resultadoBusqueda.artists.next;
        getPaginaSiguienteOAnterior(url, miCallback)
    }

    function getPaginaAnterior() {
        setIsLoading(true);
        let url = resultadoBusqueda.artists.previous;
        getPaginaSiguienteOAnterior(url, miCallback)
    }

    return (
        <div className="fade-in enter-zoom-in busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>

            <form onSubmit={handleSubmit} className="linea-flex-start">
                <span className="input_and_button">
                    <input
                        className={`input_artista_${queArtistaEs}`}
                        autoFocus
                        type="search"
                        disabled={disabled}
                        value={text}
                        placeholder={t('tools.artist-placeholder')}
                        onChange={(e) => setText(() => { return e.target.value })}
                    />
                    <button
                        type="submit"
                        className="busqueda-boton-buscar boton"
                        disabled={text === "" ? true : false}

                    >{t('tools.button-text')}
                    </button>
                </span>
            </form>

            {listaResultados.length > 0 && !haySeleccion &&
                <ContainerResultadoBusqueda
                    cantidad={listaResultados?.length}
                    linkNext={linkNext}
                    linkPrev={linkPrev}
                    isLoading={isLoading}
                    callbackGetSiguiente={getPaginaSiguiente}
                    callbackGetAnterior={getPaginaAnterior}
                >{
                        listaResultados?.map((item) => {
                            return (
                                <TarjetaArtista
                                    key={item.id}
                                    isClickable={listaResultados?.length > 0 && !haySeleccion ? true : false}
                                    selectionCallback={handleEleccion}
                                    jsonData={item}
                                />
                            );
                        })}
                </ContainerResultadoBusqueda>}

        </div>
    )
}