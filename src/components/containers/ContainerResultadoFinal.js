import React from 'react'
import { useTranslation } from 'react-i18next';

export const ContainerResultadoFinal = ({ children, ...props }) => {
    const {msgResultado, msgResultadoClass, cantidad} = props;

    const [t, i18n] = useTranslation('global');

    return (
        <div className='container-tarjetas'>
            <p className={`${msgResultadoClass} busqueda-texto-info`}>{msgResultado}</p>
            <p>ContainerResultadoFinal</p>
            {cantidad > 5 && ''}
            <ul className='busqueda-lista'>
                {children}
            </ul>
        </div>
    )
}
