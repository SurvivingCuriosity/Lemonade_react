import React from "react";
import lemon from '../../assets/images/lemon.svg'
export function CustomSpinner({ size }) {
    let tamanoSpinner = 40
    let textoSpinner = 'Cargando'

    if (size == "s") {
        tamanoSpinner = 20
        textoSpinner = ''
    }

    return (
        <div className="loading-spinner">
            <img src={lemon} style={{ width: tamanoSpinner + 'px', margin: '0' }} />
            <p>{textoSpinner}</p>
        </div>
    )

}