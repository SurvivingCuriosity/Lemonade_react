import React from "react";
import { getAllUniqueArtistSongs, getAllAudioFeatures } from "../../../api/apiCustomMethods";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { ProgressBar } from "../../atoms/ProgressBar";
import TarjetaCancion from "../busqueda/TarjetaCancion";
import { PreviewChoices } from "../../molecules/tarjetas/PreviewChoices";
import { BusquedaArtista } from '../../organisms/busqueda/BusquedaArtista'
import { BusquedaCancion } from '../../organisms/busqueda/BusquedaCancion'
import { useTranslation } from "react-i18next";
import { FinalResult } from "../../containers/FinalResult";

export function SongMatchFinder() {
    const {t} = useTranslation('global')
    //====ESTADO
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionCancion, setSeleccionCancion] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [resultadoFinal, setResultadoFinal] = React.useState([]);
    
    const [mostrarResultadoFinal, setMostrarResultadoFinal] = React.useState(false);
    const [hayResultadoFinal, setHayResultadoFinal] = React.useState(false);
    

    //====USE EFFECT

    React.useEffect(() => {
        if (seleccionCancion.id) {
            if (objetosAudioFeatures.length > 0) {
                const resultado = formarResultadoFinal();
                setResultadoFinal(resultado);
            }
        } else {
            setMostrarResultadoFinal(false);
        }
    }, [seleccionCancion])

    React.useEffect(() => {
        //si hay seleccion
        if (seleccionArtista.id) {
            getAllUniqueArtistSongs(seleccionArtista.id, lleganCanciones)
        } else {
            // si se borra la seleccion
            setCancionesArtista([]);//hay que vaciarlo
            setMostrarResultadoFinal(false);
        }
    }, [seleccionArtista])

    React.useEffect(() => {
        (cancionesArtista.length > 0) &&
            getAllAudioFeatures(cancionesArtista, lleganAudioFeatures);
    }, [cancionesArtista])

    React.useEffect(() => {
        if (objetosAudioFeatures.length > 0 && seleccionCancion.id) {
            const resultado = formarResultadoFinal();
            setResultadoFinal(resultado);
        }
    }, [objetosAudioFeatures])

    React.useEffect(() => {
        if (resultadoFinal.length > 0) {
            setHayResultadoFinal(() => { return true });
            const timeout = setTimeout(() => {
                setMostrarResultadoFinal(() => { return true });
            }, 2000);

            return (()=>{
                clearTimeout(timeout);
            })
        } else {
            setMostrarResultadoFinal(() => { return false })
            setHayResultadoFinal(() => { return false })
        }
    }, [resultadoFinal])

    //====FUNCIONES
    const formarResultadoFinal = () => {
        let arrayResultadosFinales = [];
        objetosAudioFeatures.map((obj) => {
            if (obj !== null) {
                if (obj.mode === seleccionCancion.mode
                    && obj.key === seleccionCancion.key) {
                    cancionesArtista.map((cancion) => {
                        if (cancion.id === obj.id) {
                            cancion.mode = obj.mode;
                            cancion.key = obj.key;
                            cancion.bpm = obj.tempo;
                            //TODO: Obtener coincidencias exactas (bpm coincide tb)
                            arrayResultadosFinales.push(cancion);
                        }
                    })
                }
            }
        })

        if (arrayResultadosFinales.length === 0) {
            setMsgResultadoClass("error")
            setMsgResultado(`No hay canciones de ${seleccionArtista.name} en la misma escala que ${seleccionCancion.name}`)
        } else {
            setMsgResultadoClass("success")
            setMsgResultado(`Canciones de  '${seleccionArtista.name}' en la misma escala que '${seleccionCancion.name}'`)
        }
        return arrayResultadosFinales;
    }

    const userSelectsSong = (songSelected) => { setSeleccionCancion(songSelected); }

    const userSelectsArtist = (artistSelected) => { setSeleccionArtista(() => { return artistSelected }); }

    const lleganCanciones = (listaCancionesArtista) => { setCancionesArtista(() => { return listaCancionesArtista }); }

    const lleganAudioFeatures = (audio) => { setObjetosAudioFeatures(audio); }

    //====RENDER PARTS
    const eleccionCancion = (
        <BusquedaCancion
            haySeleccion={seleccionCancion.id ? true : false}
            titulo={t('tools.intro-song')}
            callbackEleccion={userSelectsSong}
        />
    )

    const eleccionArtista = (
        <BusquedaArtista
            haySeleccion={seleccionArtista.id ? true : false}
            titulo={t('tools.intro-artist')}
            callbackEleccion={userSelectsArtist}
        />
    )

    //====RENDER
    return (
        <>
            <ProgressBar
                tipo="SongMatchFinder"
                canciones1={undefined}
                canciones2={objetosAudioFeatures.length || undefined}
                primerPaso={seleccionCancion.id ? true : false}
                primeraCondicion={seleccionCancion.id ? true : false}
                segundoPaso={seleccionArtista.id ? true : false}
                segundaCondicion={hayResultadoFinal}
            />
            <PreviewChoices
                json1={seleccionCancion}
                json2={seleccionArtista}
                canciones2={cancionesArtista.length}
                callbackCambiarEleccion1={() => { setSeleccionCancion([]) }}
                callbackCambiarEleccion2={() => { setSeleccionArtista([]) }}
            />

            {!seleccionCancion.id ? eleccionCancion : ""}
            {seleccionCancion.id && !seleccionArtista.id ? eleccionArtista : ""}
            {seleccionCancion.id && seleccionArtista.id && hayResultadoFinal && !mostrarResultadoFinal && <CustomSpinner textPreparando/>}
            
            <FinalResult mostrarResultado={mostrarResultadoFinal}>
            {resultadoFinal.length > 0
                ?
                <ul className="busqueda-lista">
                    <p className={`text-center small-text ${msgResultadoClass}`}>{msgResultado}</p>
                    {resultadoFinal.map((item) => {
                        return (
                            <TarjetaCancion
                                isClickable={false}
                                key={item.id}
                                jsonData={item}
                            />
                        );
                    })}
                </ul>
                :
                <p className={`text-center small-text ${msgResultadoClass}`}>{msgResultado}</p>
            }
        </FinalResult>
        </>
    )



}