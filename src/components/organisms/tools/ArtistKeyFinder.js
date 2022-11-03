import React from "react";
import { getAllAudioFeatures, getAllUniqueArtistSongs } from "../../../api/apiCustomMethods";
import { BusquedaArtista } from "../../organisms/busqueda/BusquedaArtista";
import { KeyScaleSelect } from "../busqueda/KeyScaleSelect";
import { ProgressBar } from "../../atoms/ProgressBar";
import TarjetaCancion from "../busqueda/TarjetaCancion";
import { PreviewChoices } from "../../molecules/tarjetas/PreviewChoices";
import { useTranslation } from "react-i18next";
import { eliminaElementosConNameRepetido } from "../../../helpers/FilteringArrays";

export function ArtistKeyFinder() {
    const [t, i18n] = useTranslation('global');
    //====ESTADO 
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionNotaEscala, setSeleccionNotaEscala] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [mostrando, setMostrando] = React.useState(true);


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

        eliminaElementosConNameRepetido(arrayResultadosFinales)

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
            titulo={t('tools.intro-artist')}
            callbackEleccion={userSelectsArtist}
            mostrando={mostrando}
        />
    )

    const eleccionNota = (
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">{t('tools.intro-scale')}</h2>
            <div className="linea-flex-center">
                <KeyScaleSelect
                    callbackEleccion={userSelectsScale}
                />
            </div>
        </div>
    )

    const resultado = (
        <div className="busqueda-container">
            <KeyScaleSelect
                callbackEleccion={userSelectsScale}
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
        <>
            <ProgressBar
                tipo="ArtistKeyFinder"
                canciones1={undefined}
                canciones2={objetosAudioFeatures.length || undefined}
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
            {!seleccionArtista.id && busquedaArtista}
            {seleccionArtista.id && !seleccionNotaEscala.nota > -1 && !mostrarResultadoFinal && eleccionNota}
            {mostrarResultadoFinal && resultado}
        </>

    )


}