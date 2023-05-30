import React from "react";
import { getAllAudioFeatures, getAllUniqueArtistSongs } from "../../../api/apiCustomMethods";
import { CustomSpinner } from "../../atoms/CustomSpinner";
import { ProgressBar } from "../../atoms/ProgressBar";
import TarjetaCancion from "../busqueda/TarjetaCancion";
import { PreviewChoices } from "../../molecules/tarjetas/PreviewChoices";
import TarjetaCancionDoble from "../../molecules/tarjetas/TarjetaCancionDoble";
import { BusquedaArtista } from "../../organisms/busqueda/BusquedaArtista";
import { getResultadoFinalArtistMatchFinder } from "../../../helpers/Tools";
import { useTranslation } from 'react-i18next'
import { FinalResult } from "../../containers/FinalResult";
import { ContainerResultadoArtistMatchFinder } from '../../containers/ContainerResultadoArtistMatchFinder'
export function ArtistMatchFinder() {
    const { t } = useTranslation('global')
    //====ESTADO
    const [seleccionArtista1, setSeleccionArtista1] = React.useState({});
    const [cancionesArtista1, setCancionesArtista1] = React.useState([]);
    const [objetosAudioFeatures1, setObjetosAudioFeatures1] = React.useState([]);

    const [seleccionArtista2, setSeleccionArtista2] = React.useState({});
    const [cancionesArtista2, setCancionesArtista2] = React.useState([]);
    const [objetosAudioFeatures2, setObjetosAudioFeatures2] = React.useState([]);

    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [resultadoFinal, setResultadoFinal] = React.useState([]);

    const [hayResultadoFinal, setHayResultadoFinal] = React.useState(false);
    const [mostrarResultadoFinal, setMostrarResultadoFinal] = React.useState(false);

    //====USE EFECT

    React.useEffect(() => {
        //si hay artista elegido se obtienen todas sus canciones
        if (seleccionArtista1.id) {
            getAllUniqueArtistSongs(seleccionArtista1.id, lleganCancionesDeArtista1)
        } else {
            //si no hay artista elegido (se ha borrado), se deja de mostrar el resultado final
            setCancionesArtista1([])
            setObjetosAudioFeatures1([])
            setResultadoFinal(() => { return [] })
        }
    }, [seleccionArtista1])

    React.useEffect(() => {
        if (seleccionArtista2.id) {
            getAllUniqueArtistSongs(seleccionArtista2.id, lleganCancionesDeArtista2)
        } else {
            setCancionesArtista2([])
            setObjetosAudioFeatures2([])
            setResultadoFinal(() => { return [] })
        }
    }, [seleccionArtista2])

    React.useEffect(() => {
        cancionesArtista1.length > 0 && getAllAudioFeatures(cancionesArtista1, lleganAudioFeatures1);
    }, [cancionesArtista1])

    React.useEffect(() => {
        cancionesArtista2.length > 0 && getAllAudioFeatures(cancionesArtista2, lleganAudioFeatures2);
    }, [cancionesArtista2])

    React.useEffect(() => {
        if (objetosAudioFeatures1.length > 0 && objetosAudioFeatures2.length > 0) {
            const resultado = getResultadoFinalArtistMatchFinder(cancionesArtista1, cancionesArtista2, objetosAudioFeatures1, objetosAudioFeatures2)
            setResultadoFinal(resultado);
        }
    }, [objetosAudioFeatures1, objetosAudioFeatures2])

    React.useEffect(() => {
        if (resultadoFinal.length > 0) {
            setHayResultadoFinal(() => { return true });
            const timeout = setTimeout(() => {
                setMostrarResultadoFinal(() => { return true });
            }, 2000);

            return (() => {
                clearTimeout(timeout);
            })
        } else {
            setMostrarResultadoFinal(() => { return false })
            setHayResultadoFinal(() => { return false })
        }
    }, [resultadoFinal])




    //====FUNCIONES
    const userSelectsArtist1 = (artistSelected) => { setSeleccionArtista1(artistSelected); }

    const userSelectsArtist2 = (artistSelected) => { setSeleccionArtista2(artistSelected); }

    const lleganCancionesDeArtista1 = (listaCanciones) => { setCancionesArtista1(listaCanciones); }

    const lleganCancionesDeArtista2 = (listaCanciones) => { setCancionesArtista2(listaCanciones); }

    const lleganAudioFeatures1 = (audio) => { setObjetosAudioFeatures1(audio); }

    const lleganAudioFeatures2 = (audio) => { setObjetosAudioFeatures2(audio); }

    const eliminarEleccion1 = () => { setSeleccionArtista1({}) }

    const eliminarEleccion2 = () => { setSeleccionArtista2({}) }

    //====RENDER PARTS
    const busquedaArtista1 = (
        <BusquedaArtista
            haySeleccion={seleccionArtista1.id ? true : false}
            titulo={t('tools.first-artist')}
            callbackEleccion={userSelectsArtist1}
            queArtistaEs={1}
        />
    )
    const busquedaArtista2 = (
        <BusquedaArtista
            // disabled={objetosAudioFeatures1.length > 0 ? false : true}
            haySeleccion={seleccionArtista2.id ? true : false}
            titulo={t('tools.second-artist')}
            callbackEleccion={userSelectsArtist2}
            queArtistaEs={2}
        />
    )

    //====RENDER 
    return (
        <>
            <ProgressBar
                tipo="ArtistMatchFinder"
                canciones1={objetosAudioFeatures1?.length}
                canciones2={objetosAudioFeatures2?.length}
                primerPaso={seleccionArtista1?.id}
                primeraCondicion={objetosAudioFeatures1?.length > 0}
                segundoPaso={seleccionArtista2?.id}
                segundaCondicion={objetosAudioFeatures1?.length && objetosAudioFeatures2?.length}
                hayResultado={hayResultadoFinal}
            />
            <PreviewChoices
                json1={seleccionArtista1}
                canciones1={objetosAudioFeatures1.length}
                json2={seleccionArtista2}
                canciones2={objetosAudioFeatures2.length}
                callbackCambiarEleccion1={eliminarEleccion1}
                callbackCambiarEleccion2={eliminarEleccion2}
            />
            {!seleccionArtista1.id && busquedaArtista1}
            {seleccionArtista1.id && !seleccionArtista2.id && busquedaArtista2}
            {seleccionArtista1.id && seleccionArtista2.id && hayResultadoFinal && !mostrarResultadoFinal && <CustomSpinner textPreparando />}

            <FinalResult mostrarResultado={mostrarResultadoFinal}>
                <ContainerResultadoArtistMatchFinder 
                    resultado = {resultadoFinal}
                />
            </FinalResult>
        </>

    )
}