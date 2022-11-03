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
            setMostrarResultadoFinal(false)
        }
    }, [seleccionArtista1])

    React.useEffect(() => {
        if (seleccionArtista2.id) {
            getAllUniqueArtistSongs(seleccionArtista2.id, lleganCancionesDeArtista2)
        } else {
            setCancionesArtista2([])
            setObjetosAudioFeatures2([])
            setMostrarResultadoFinal(false)
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
            console.log(cancionesArtista1);
            const resultado = getResultadoFinalArtistMatchFinder(cancionesArtista1, cancionesArtista2, objetosAudioFeatures1, objetosAudioFeatures2)
            setResultadoFinal(resultado);
            window.setTimeout(()=>{
                resultado.length > 0 && setMostrarResultadoFinal(true);
            },2000)
        }
    }, [objetosAudioFeatures1, objetosAudioFeatures2])



    //====FUNCIONES
    const userSelectsArtist1 = (artistSelected) => { setSeleccionArtista1(artistSelected); }

    const userSelectsArtist2 = (artistSelected) => { setSeleccionArtista2(artistSelected); }

    const lleganCancionesDeArtista1 = (listaCanciones) => { setCancionesArtista1(listaCanciones); }

    const lleganCancionesDeArtista2 = (listaCanciones) => { setCancionesArtista2(listaCanciones); }

    const lleganAudioFeatures1 = (audio) => { console.log(audio); setObjetosAudioFeatures1(audio); }

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

    const resultado = (
        <div className="busqueda-container">
            <p className={`${msgResultadoClass} busqueda-texto-info`}>{msgResultado}</p>

            {resultadoFinal.length > 0
                ?
                <ul className="busqueda-lista">
                    <div className="">
                        <p className="texto-dif-padding text-center">Coincidencias Exactas</p>
                        {resultadoFinal.coincidencias.length === 0 && <p className={`error busqueda-texto-info`}>Sin coincidencias exactas</p>}
                        {resultadoFinal.coincidencias.map((par, index) => {
                            return (
                                <TarjetaCancionDoble
                                    key={index + '-' + par.cancion1.name + '-' + par.cancion2.name}
                                    jsonData1={par.cancion1}
                                    jsonData2={par.cancion2}
                                />
                            )
                        })}
                    </div>
                    {resultadoFinal.map((conjunto, index) => {
                        return (
                            <div key={index}>
                                <p className="text-center texto-dif-padding">{conjunto.titulo}</p>
                                <div className="resultado-left">
                                    {conjunto.canciones.cancionesDe1.map((cancion, index) => {
                                        return (
                                            <TarjetaCancion
                                                key={index + Math.random() * 1000 + cancion.id}
                                                jsonData={cancion}
                                                reducirInformacion={true}
                                            />

                                        )
                                    })}
                                </div>
                                <div className="resultado-right">
                                    {conjunto.canciones.cancionesDe2.map((cancion, index) => {
                                        return (
                                            <TarjetaCancion
                                                key={index + Math.random() * 1000 + conjunto.titulo + '' + cancion.id}
                                                jsonData={cancion}
                                                reducirInformacion={true}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )
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
                tipo="ArtistMatchFinder"
                canciones1={objetosAudioFeatures1.length || undefined}
                canciones2={objetosAudioFeatures2.length || undefined}
                primerPaso={seleccionArtista1.id ? true : false}
                primeraCondicion={objetosAudioFeatures1.length > 0 ? true : false}
                segundoPaso={seleccionArtista2.id ? true : false}
                segundaCondicion={objetosAudioFeatures2.length > 0 ? true : false}
            />
            <PreviewChoices
                json1={seleccionArtista1}
                canciones1={cancionesArtista1.length}
                json2={seleccionArtista2}
                canciones2={cancionesArtista2.length}
                callbackCambiarEleccion1={eliminarEleccion1}
                callbackCambiarEleccion2={eliminarEleccion2}
            />
            {!seleccionArtista1.id && busquedaArtista1}
            {seleccionArtista1.id && !seleccionArtista2.id && busquedaArtista2}
            {seleccionArtista1.id && seleccionArtista2.id && !mostrarResultadoFinal && <CustomSpinner />}
            {mostrarResultadoFinal && resultado}
        </>

    )
}