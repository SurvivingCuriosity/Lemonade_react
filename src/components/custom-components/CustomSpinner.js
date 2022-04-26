import React from "react";
import lemon from '../../images/lemon.svg'
export function CustomSpinner(props){

    let tamanoSpinner=40

    return(
        <div className="loading-spinner">
            <img src={lemon} style={{width: tamanoSpinner + 'px'}}/>
            <p>Cargando</p>
        </div>
    )

}