import React from 'react'
import { useTranslation } from 'react-i18next';
import { CustomSpinner } from '../atoms/CustomSpinner';

export const ContainerResultadoBusqueda = ({ children, ...props }) => {

    const [t, i18n] = useTranslation('global');

    const renderButtonsPrevNext = (
        <div className="tarjetas-container-header">

            {props.linkNext !== null &&
                <button
                    className="boton_link botonPaginaSiguiente"
                    onClick={props.callbackGetSiguiente}
                >{t('tools.next-page')}
                </button>
            }
            {props.isLoading && <CustomSpinner size='s' />}
            {props.linkPrev !== null &&
                <button
                    className="boton_link botonPaginaAnterior"
                    onClick={props.callbackGetAnterior}
                >{t('tools.prev-page')}
                </button>
            }
        </div>
    )

    return (
        <div className='container-tarjetas'>
            {renderButtonsPrevNext}
            <ul className='busqueda-lista'>
                {children}
            </ul>
        </div>
    )
}
