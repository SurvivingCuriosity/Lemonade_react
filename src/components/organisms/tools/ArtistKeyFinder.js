import React from "react";
import { getAllAudioFeatures, getAllUniqueArtistSongs } from "../../../API_calls/apiCustomMethods";
import { BusquedaArtista } from "../../organisms/busqueda/BusquedaArtista";
import { KeyScaleSelect } from "../busqueda/KeyScaleSelect";
import { CustomButton } from "../../atoms/CustomButton";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { ProgressBar } from "../../atoms/ProgressBar";
import TarjetaCancion from "../busqueda/TarjetaCancion";
import { PreviewChoices } from "../../molecules/tarjetas/PreviewChoices";

export function ArtistKeyFinder() {
    //====PROPIEDADES Y CONSTANTES
    let titulo = "Artist Key Finder"
    let descripcion = "Encuentra canciones de un artista en una escala"
    const TEXTO_BOTON_BUSCAR = "Buscar";
    const TEXTO_BOTON_CARGANDO = "Cargando";
    const TEXTO_BOTON_RELLENA_CAMPOS = "Rellena los campos";
    const TEXTO_BOTON_NUEVA_BUSQUEDA = "Nueva búsqueda"

    //====ESTADO 
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionNotaEscala, setSeleccionNotaEscala] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [mostrando, setMostrando] = React.useState(true);


    const [textoBotonFinal, setTextoBotonFinal] = React.useState(TEXTO_BOTON_RELLENA_CAMPOS);
    const [deshabilitarBotonFinal, setDeshabilitarBotonFinal] = React.useState(true);

    const [mostrarResultadoFinal, setMostrarResultadoFinal] = React.useState(false);
    const [resultadoFinal, setResultadoFinal] = React.useState([]);

    //====USEEFFECT

    React.useEffect(() => {
        if (seleccionArtista.id) {
            getAllUniqueArtistSongs(seleccionArtista.id, lleganCanciones);
        } else {
            setCancionesArtista([]);
            setObjetosAudioFeatures([]);
            setMostrarResultadoFinal(false);
        }
    }, [seleccionArtista])

    React.useEffect(() => {
        if (seleccionNotaEscala.nota > -1) {
            if (objetosAudioFeatures.length > 0) {
                obtenerResultadoFinal();
            }
        } else {
            setMostrarResultadoFinal(false);
        }
    }, [seleccionNotaEscala])

    React.useEffect(() => {
        cancionesArtista.length > 0 && getAllAudioFeatures(cancionesArtista, lleganAudioFeatures);
    }, [cancionesArtista])

    React.useEffect(() => {
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if (objetosAudioFeatures.length > 0 && seleccionNotaEscala.nota > -1) {
            obtenerResultadoFinal();
        }
    }, [objetosAudioFeatures])


    //====FUNCIONES
    const userSelectsArtist = (artistSelected) => { setSeleccionArtista(artistSelected); }

    const userSelectsScale = (objNotaEscala) => { setSeleccionNotaEscala(objNotaEscala); }

    const handleClickFinal = (e) => {
        switch (e.target.textContent) {
            case TEXTO_BOTON_BUSCAR:
                obtenerResultadoFinal();
                break;
            case TEXTO_BOTON_NUEVA_BUSQUEDA:
                setSeleccionArtista(() => { return {} })
                setSeleccionNotaEscala(() => { return {} })
                setResultadoFinal(() => { return [] })
                setMostrando(() => { return false })
                setMsgResultado("");
                break;
            case TEXTO_BOTON_RELLENA_CAMPOS:
            default:
                break;
        }

    };

    const obtenerResultadoFinal = () => {
        let arrayResultadosFinales = [];

        objetosAudioFeatures.map((obj) => {
            if (obj.mode === seleccionNotaEscala.escala
                && obj.key === seleccionNotaEscala.nota) {
                cancionesArtista.map((cancion) => {
                    if (cancion.id === obj.id) {
                        cancion.mode = obj.mode;
                        cancion.key = obj.key;
                        cancion.bpm = obj.tempo;
                        arrayResultadosFinales.push(cancion);
                    }
                })
            }
        })

        arrayResultadosFinales = Array.from(new Set(arrayResultadosFinales.map(a => a.name)))
            .map(name => {
                return arrayResultadosFinales.find(a => a.name === name)
            })

        if (arrayResultadosFinales.length === 0 && seleccionNotaEscala.nota > -1) {
            setMsgResultadoClass("error")
            setMsgResultado("No se encontraron coincidencias")
        }
        if (arrayResultadosFinales.length > 0 && !seleccionNotaEscala.nota > -1) {
            setMsgResultadoClass("success")
            setMsgResultado(``)
        }
        if (arrayResultadosFinales.length > 0 && seleccionNotaEscala.nota > -1) {
            setMsgResultadoClass("success")
            setMsgResultado(`Canciones de  ${seleccionArtista.name} en ${seleccionNotaEscala.notaLabel} ${seleccionNotaEscala.escalaLabel}`)
        }
        setResultadoFinal(() => { return arrayResultadosFinales });
        setMostrarResultadoFinal(true);
    }

    const lleganCanciones = (canciones) => { setCancionesArtista(() => { return canciones }) }

    const lleganAudioFeatures = (audio) => { setObjetosAudioFeatures(() => { return audio }) }

    //====RENDER PARTS
    const busquedaArtista = (
        <BusquedaArtista
            haySeleccion={seleccionArtista.id ? true : false}
            titulo="1. Elige un artista"
            callbackEleccion={userSelectsArtist}
            mostrando={mostrando}
        />
    )

    const eleccionNota = (
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">2. Elige una nota y escala</h2>
            <div className="linea-flex-center">
                <KeyScaleSelect
                    callbackEleccion={userSelectsScale}
                />
            </div>
        </div>
    )

    const resultado = (
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">3. Resultados</h2>
            <KeyScaleSelect
                callbackEleccion={userSelectsScale}
            />
            <CustomButton
                textoBoton={textoBotonFinal}
                disabled={deshabilitarBotonFinal}
                onClickCallback={handleClickFinal}
            />

            <p className={`${msgResultadoClass} busqueda-texto-info`}>{msgResultado}</p>

            {resultadoFinal.length > 0
                ?
                <ul className="busqueda-lista">
                    {resultadoFinal.map((item) => {
                        return (
                            <TarjetaCancion
                                key={item.id}
                                jsonData={item}
                            />
                        );
                    })}
                </ul>
                :
                ""
            }
        </div>
    )
    //====RENDER
    return (
        <div className="tool-container">
            <h1 className="tool-titulo" >{titulo}</h1>
            <p className="text-center">{descripcion}</p>
            <ProgressBar
                tipo1="artista"
                tipo2="nota"
                canciones1={undefined}
                canciones2={objetosAudioFeatures.length || undefined}
                titulo1='Artista'
                titulo2='Escala'
                primerPaso={seleccionArtista.id ? true : false}
                primeraCondicion={objetosAudioFeatures.length > 0 ? true : false}
                segundoPaso={seleccionNotaEscala.nota > -1 ? true : false}
                segundaCondicion={seleccionNotaEscala.nota > -1 && seleccionArtista.id ? true : false}
            />
            <PreviewChoices
                json1={seleccionArtista}
                json2={undefined}
                canciones1={cancionesArtista.length}
                notaEscala={seleccionNotaEscala}
                callbackCambiarEleccion1={() => { setSeleccionArtista([]) }}
                callbackCambiarEscala={() => { setSeleccionNotaEscala('') }}
            />
            <div className="tool-container">
                {!seleccionArtista.id && busquedaArtista}
                {seleccionArtista.id && !seleccionNotaEscala.nota > -1 && !mostrarResultadoFinal && eleccionNota}
                {mostrarResultadoFinal && resultado}
            </div>
        </div>
    )


}