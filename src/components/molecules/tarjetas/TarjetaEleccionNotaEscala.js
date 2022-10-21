import React from "react";


export function TarjetaEleccionNotaEscala ({data}){
    return(
        <div className={`tarjeta borde`}>
            <p>{`${data.notaLabel} ${data.escalaLabel}`}</p>
        </div>
    )

       
}