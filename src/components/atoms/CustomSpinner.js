import React from "react";
import lemon from '../../assets/images/lemon.svg'
import {useTranslation} from 'react-i18next'

export function CustomSpinner({ size, textCanciones, textPreparando }) {
    const {t} = useTranslation('global');
    let tamanoSpinner = 40
    let text = t('tools.loading');
    if (size == "s") {
        tamanoSpinner = 20
    }
    if(textCanciones){
        text = t('tools.loading-songs');
    }
    if(textPreparando){
        text = t('tools.preparing-result');
    }

    return (
        <div className="loading-spinner">
            <img src={lemon} style={{ width: tamanoSpinner + 'px', margin: '0' }} />
            <p>{text}</p>
        </div>
    )

}