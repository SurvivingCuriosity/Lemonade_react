import React from "react";

export function CustomButton(props){
    const {texto, onClickCallback, disabled} = props;
    return(
        <>
            <button
                className="boton botonFinal"
                disabled={disabled}
                onClick={onClickCallback}
                value={texto}
            >
            {texto}
            </button>
        </>
    )

}