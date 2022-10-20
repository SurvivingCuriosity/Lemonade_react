import React from "react";


export function TarjetaEleccionNotaEscala (props){
    const {
        data,
        callbackCambiarEleccion
    }=props;

    return(
        <div className={`tarjeta borde`}>
            <p>{`${data.notaLabel} ${data.escalaLabel}`}</p>
            <button className='botonCambiarPreview boton2' onClick={callbackCambiarEleccion}>Cambiar nota</button>
        </div>
    )

       
}