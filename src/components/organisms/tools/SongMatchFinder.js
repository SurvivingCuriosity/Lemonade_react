import React from "react";
import { getAllUniqueArtistSongs, getAllAudioFeatures } from "../../../api/apiCustomMethods";
import { CustomButton } from "../../atoms/CustomButton";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { ProgressBar } from "../../atoms/ProgressBar";
import TarjetaCancion from "../busqueda/TarjetaCancion";
import { PreviewChoices } from "../../molecules/tarjetas/PreviewChoices";
import { BusquedaArtista } from '../../organisms/busqueda/BusquedaArtista'
import { BusquedaCancion } from '../../organisms/busqueda/BusquedaCancion'
import { useTranslation } from "react-i18next";
export function SongMatchFinder() {
    const [t, i18n] = useTranslation('global')
    //====ESTADO
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionCancion, setSeleccionCancion] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [resultadoFinal, setResultadoFinal] = React.useState([]);
    const [mostrarResultadoFinal, setMostrarResultadoFinal] = React.useState(false);

    //====USE EFFECT

    React.useEffect(() => {
        if (!seleccionCancion.id) {
            setMostrarResultadoFinal(false);
        } else {
            if (objetosAudioFeatures.length > 0) {
                formarResultadoFinal();
                setMostrarResultadoFinal(true);
            }
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
            formarResultadoFinal();
            setMostrarResultadoFinal(true);
        }
    }, [objetosAudioFeatures])


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
        setResultadoFinal(arrayResultadosFinales);
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

    const resultado = (
        <div className="busqueda-container">
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
        </div>
    )

    //====RENDER
    return (
        <>
            <ProgressBar
                tipo1="cancion"
                tipo2="artista"
                canciones1={undefined}
                canciones2={objetosAudioFeatures.length || undefined}
                titulo1='Canción 1'
                titulo2='Artista 2'
                primerPaso={seleccionCancion.id ? true : false}
                primeraCondicion={seleccionCancion.id ? true : false}
                segundoPaso={seleccionArtista.id ? true : false}
                segundaCondicion={objetosAudioFeatures.length > 0 ? true : false}
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
            {seleccionCancion.id && seleccionArtista.id && !mostrarResultadoFinal && <CustomSpinner />}
            {mostrarResultadoFinal && resultado}
        </>
    )



}