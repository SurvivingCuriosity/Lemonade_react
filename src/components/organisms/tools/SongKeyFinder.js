import React from "react";
import {BusquedaCancion} from '../busqueda/BusquedaCancion'
import { useTranslation } from "react-i18next";
export function SongKeyFinder({getRandomOnInit}){
    const [t, i18n] = useTranslation('global')
    return(
        <BusquedaCancion
            titulo={t('tools.intro-song')}
            isSongKeyFinder={true}
            getRandomOnInit
        />
    )
}