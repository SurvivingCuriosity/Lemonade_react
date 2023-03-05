import React from "react";
import { getAllAudioFeatures, getAllUniqueArtistSongs } from "../../../api/apiCustomMethods";
import { BusquedaArtista } from "../../organisms/busqueda/BusquedaArtista";
import { KeyScaleSelect } from "../busqueda/KeyScaleSelect";
import { ProgressBar } from "../../atoms/ProgressBar";
import TarjetaCancion from "../busqueda/TarjetaCancion";
import { PreviewChoices } from "../../molecules/tarjetas/PreviewChoices";
import { useTranslation } from "react-i18next";
import { eliminaElementosConNameRepetido } from "../../../helpers/FilteringArrays";
import { FinalResult } from "../../containers/FinalResult";
import { ContainerResultadoFinal } from "../../containers/ContainerResultadoFinal";

export function ArtistKeyFinder() {
    const {t} = useTranslation('global')
    //====ESTADO 
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionNotaEscala, setSeleccionNotaEscala] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [resultadoFinal, setResultadoFinal] = React.useState([]);

    const [mostrarResultadoFinal, setMostrarResultadoFinal] = React.useState(false);
    const [hayResultadoFinal, setHayResultadoFinal] = React.useState(false);

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
        if (seleccionNotaEscala.nota > -1 && seleccionNotaEscala.escala>-1) {
            if (objetosAudioFeatures.length > 0) {
                const resultado = obtenerResultadoFinal();
                setResultadoFinal(()=>{return resultado})
            }else{
                setMostrarResultadoFinal(false);
            }
        }
    }, [seleccionNotaEscala])

    React.useEffect(() => {
        cancionesArtista.length > 0 && getAllAudioFeatures(cancionesArtista, lleganAudioFeatures);
    }, [cancionesArtista])

    React.useEffect(() => {
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if (objetosAudioFeatures.length > 0 && seleccionNotaEscala.nota > -1 && seleccionNotaEscala.escala > -1) {
            const resultado = obtenerResultadoFinal();
            setResultadoFinal(resultado)
        }
    }, [objetosAudioFeatures])

    React.useEffect(()=>{
        if (resultadoFinal.length > 0) {
            setHayResultadoFinal(() => { return true });
            setMostrarResultadoFinal(() => { return true });
        } else {
            setHayResultadoFinal(() => { return false })
        }
    },[resultadoFinal])


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
        return arrayResultadosFinales;
    }

    const lleganCanciones = (canciones) => { setCancionesArtista(() => { return canciones }) }

    const lleganAudioFeatures = (audio) => { setObjetosAudioFeatures(() => { return audio }) }

    //====RENDER PARTS
    const busquedaArtista = (
        <BusquedaArtista
            haySeleccion={seleccionArtista.id ? true : false}
            titulo={t('tools.intro-artist')}
            callbackEleccion={userSelectsArtist}
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
            {seleccionArtista.id && eleccionNota}
            
            {!hayResultadoFinal && <p className={`${msgResultadoClass} busqueda-texto-info`}>{msgResultado}</p>}
            
            <FinalResult mostrarResultado={mostrarResultadoFinal}>

                {hayResultadoFinal
                    &&
                    <ContainerResultadoFinal headerText={msgResultado} className={msgResultadoClass}> 
                            {resultadoFinal?.map((item) => {
                                return (
                                    <TarjetaCancion
                                        key={item.id}
                                        jsonData={item}
                                    />
                                );
                            })}
                    </ContainerResultadoFinal>
                
                }
            </FinalResult>
        </>

    )


}