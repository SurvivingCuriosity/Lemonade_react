import React from "react";

export function CustomButton(props){
    const {textoBoton, onClickCallback, disabled} = props;

    return(
        <>
            <button
                className="boton botonFinal"
                disabled={disabled}
                onClick={onClickCallback}
                value={textoBoton}
            >
            {textoBoton}
            </button>
        </>
    )

}