import React from "react";
import lemon from '../../assets/images/lemon.svg'
import {useTranslation} from 'react-i18next'

export function CustomSpinner({ size }) {
    const {t} = useTranslation('global');
    let tamanoSpinner = 40

    if (size == "s") {
        tamanoSpinner = 20
    }

    return (
        <div className="loading-spinner">
            <img src={lemon} style={{ width: tamanoSpinner + 'px', margin: '0' }} />
            <p>{t('tools.loading')}</p>
        </div>
    )

}