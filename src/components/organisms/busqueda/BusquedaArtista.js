import React from "react";
import TarjetaArtista from "../../molecules/tarjetas/TarjetaArtista";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { buscarArtista } from "../../../API_calls/apiCalls";
import { getPaginaSiguienteOAnterior } from "../../../API_calls/apiCalls";
import { TmpMessage } from "../../atoms/TmpMessage";

export function BusquedaArtista(props) {
    const { titulo, haySeleccion, callbackEleccion, queArtistaEs, disabled } = props;
    const [isLoading, setIsLoading] = React.useState(false);

    //texto buscado por el usuario
    const [text, setText] = React.useState("");

    const [temporalMsgConfig, setTemporalMsgConfig] = React.useState({
        msg:'',
        type:''
    });


    //array de resultados obtenidos tras la busqueda
    const [listaResultados, setListaResultados] = React.useState([]);
    const [resultadoBusqueda, setResultadoBusqueda] = React.useState({});

    const [seleccion, setSeleccion] = React.useState({});

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
            if(listaResultados.length > 0 ){
                setLinkNext(resultadoBusqueda.artists.next)
                setLinkPrev(resultadoBusqueda.artists.previous)
            }else{
                setTemporalMsgConfig(()=>{return {msg:'No hay resultados', type:'error'}})
            }
        }
    }, [resultadoBusqueda, listaResultados])

    const renderButtonsPrevNext = (
        <div>
            {linkNext != null
                ?
                <button
                    className="boton_link botonPaginaSiguiente"
                    onClick={getPaginaSiguiente}
                >Siguiente página
                </button>
                :
                ""
            }
            {linkPrev != null
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
            {listaResultados.map((item) => {
                return (
                    <TarjetaArtista
                        key={item.id}
                        isClickable={(listaResultados.length > 0 && !haySeleccion) ? true : false}
                        selectionCallback={handleEleccion}
                        jsonData={item}
                    />
                );
            })
            }
        </ul>
    )



    //funcion que se ejecuta cuando el usuario selecciona una cancion o artista
    function handleEleccion(userSelection) {
        setSeleccion(() => { return userSelection })
        setListaResultados(() => { return [] })
        callbackEleccion(userSelection, queArtistaEs);
    }

    function borrarSeleccion() {
        setListaResultados([]);
        callbackEleccion(listaResultados);
    }

    //funcion que se ejecuta cuando llegan los resultados
    function miCallback(params) {
        setIsLoading(false);
        setResultadoBusqueda(params);
        //llega una lista
        if (params.artists) {
            //no hay resultados parala busqueda
            if (params.artists && params.artists.total === 0) {
                return;
            } else {
                setLinkNext(() => { return params.artists.next });
                setLinkPrev(() => { return params.artists.previous });
            }
            setResultadoBusqueda(() => { return params });
            setListaResultados(() => { return params.artists.items })
            //llega solo uno
        } else {
            setResultadoBusqueda(() => { return [params] });
            setListaResultados(() => { return [params] })
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
                                placeholder={`Introduce artista...`}
                                onChange={(e) => setText(() => { return e.target.value })}
                            />
                            <button
                                type="submit"
                                className="busqueda-boton-buscar boton"
                                disabled={text === "" ? true : false}

                            >Buscar
                            </button>
                        </span>
            </form>

            {isLoading && <CustomSpinner />}
            {(listaResultados.length > 0 && !haySeleccion) ? renderListaResultados : <TmpMessage config={temporalMsgConfig} />}

        </div>
    )
}