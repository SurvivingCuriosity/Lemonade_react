import React from "react";

export function CustomButton(props){
    const {textoBoton, onClickCallback, disabled} = props;

    return(
        <>
            <button
                className="boton botonFinal zoom-on-click"
                disabled={disabled}
                onClick={onClickCallback}
                value={textoBoton}
            >
            {textoBoton}
            </button>
        </>
    )

}