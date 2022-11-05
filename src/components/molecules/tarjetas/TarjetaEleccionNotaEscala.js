import React from "react";


export function TarjetaEleccionNotaEscala ({data}){
    return(
        <div className={`tarjeta tarjeta-preview-scale`}>
            {`${data.notaLabel} ${data.escalaLabel}`}
        </div>
    )

       
}