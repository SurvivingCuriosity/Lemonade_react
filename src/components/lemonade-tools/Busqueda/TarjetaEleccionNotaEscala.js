import React from "react";


export function TarjetaEleccionNotaEscala (props){
    let {
        data
    }=props;

    return(
        <div className={`tarjeta borde`}>
            <p>{`${data.notaLabel} ${data.escalaLabel}`}</p>
        </div>
    )

       
}