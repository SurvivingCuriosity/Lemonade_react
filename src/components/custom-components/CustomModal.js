import React from "react";

export function CustomModal(props){

    const {titulo, descripcion, hayBotones, showing, tipoMensaje} = props;
    
    let [isShowing, setIsShowing] = React.useState(showing);

    let handleCerrarModal = () => {
        setIsShowing(false);
    }
    let handleClickModal = (e) => {
        if(e.target.className==='modal'){
            setIsShowing(false);
        }
    }
    
    React.useEffect(()=>{
        window.addEventListener('click', handleClickModal);


        //le quito los eventos cuando se desmonta
        return (()=>{window.removeEventListener('click',handleClickModal)});
    },[])

    if (!isShowing) return null;
    return(
        <div className="modal">
            <div className="modal-container">
                <div onClick={handleCerrarModal} className={`modal-boton-cerrar ${tipoMensaje}`}>Cerrar</div>
                <p className={`modal-titulo ${tipoMensaje}`}>{titulo}</p>
                <div className="modal-descripcion">
                    <p>{descripcion}</p>
                </div>
                {hayBotones 
                    ?
                        <div className="modal-botonera-abajo">
                            <button className="modal-boton-si">Sí</button>
                            <button className="modal-boton-no">No</button>
                        </div>
                    :
                        ""
                }
            </div>
        </div>
    )

}