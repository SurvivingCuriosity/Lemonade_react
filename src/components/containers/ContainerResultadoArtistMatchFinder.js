import React from 'react'
import { useTranslation } from 'react-i18next';
import TarjetaCancionDoble from '../molecules/tarjetas/TarjetaCancionDoble';
import TarjetaCancion from '../organisms/busqueda/TarjetaCancion';

export const ContainerResultadoArtistMatchFinder = (props) => {
    const { resultado } = props;

    const coincidenciasExactas = resultado.coincidencias;
    const coincidenciasPorNotas = resultado;

    const [t, i18n] = useTranslation('global');

    return (
        <div className='container-tarjetas'>

            {/* Coincidencias exactas (bpm y nota) */}
            <h3>{`Coincidencias exactas (${coincidenciasExactas?.length})`}</h3>
            <ul className='busqueda-lista horizontal-slider-container'>
                {coincidenciasExactas?.map((par, index) => {
                    return (
                        <li key={index + '-' + par.cancion1.name + '-' + par.cancion2.name} className='slider-item'>
                            <TarjetaCancionDoble
                                jsonData1={par.cancion1}
                                jsonData2={par.cancion2}
                            />
                        </li>
                    )
                })}
            </ul>
            {/* Coincidencias por notas */}
            <ul className='horizontal-slider-container coincidencias-nota-container'>
                {resultado.map((conjunto, index) => {
                    return (
                        <div key={index} className='slider-item-center conjunto-coincidencias-nota'>
                            <p className="text-center texto-dif-padding"></p>
                            <h3>{conjunto.titulo}</h3>
                            <div className='conjunto-tarjetas'>
                                <div className="resultado-left">
                                    {conjunto.canciones.cancionesDe1.map((cancion, index) => {
                                        return (
                                            <TarjetaCancion
                                                key={index}
                                                // key={index + Math.random() * 1000 + cancion.id}
                                                jsonData={cancion}
                                                reducirInformacion={true}
                                                noFoto
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
                                                noFoto
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ul>

        </div>
    )
}
