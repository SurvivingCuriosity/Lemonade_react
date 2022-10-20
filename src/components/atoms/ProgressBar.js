import React from "react";

export function ProgressBar(props){
    const {primerPaso, primeraCondicion, segundoPaso, segundaCondicion, titulo1, titulo2, canciones1, canciones2, tipo1, tipo2} = props.config;

    let mensajesCondicion1 = "";
    let mensajesCondicion2 = "";
    let claseProgress = "";
    let anchoProgress;
    
    if(tipo1 !== "cancion"){
        if(primerPaso===true){
            if(primeraCondicion === true){
                mensajesCondicion1=`Analizadas ${canciones1} canciones`;
                anchoProgress=50;
                claseProgress = "progress-2"
            }else{
                mensajesCondicion1=`Analizando canciones`;
                claseProgress = "progress-1"
                anchoProgress=25;
            }
        }
    }else{
        if(primeraCondicion === true){
                anchoProgress=50;
                claseProgress = "progress-2"
            }else{
                anchoProgress=0;
            }
    }

    if(tipo2!== 'cancion'){
        if(segundoPaso === true){
            if(segundaCondicion === true){
                mensajesCondicion2=`Analizadas ${canciones2} canciones`;
                anchoProgress=95;
                claseProgress = "progress-4"
            }else{
                mensajesCondicion2=`Analizando canciones`;
                anchoProgress=70;
                claseProgress = "progress-3"
            }
        }
    }else{
        if(segundaCondicion === true){
                anchoProgress=50;
                claseProgress = "progress-2"
            }else{
                anchoProgress=0;
            }
    }

    if(tipo2==='nota'){
        mensajesCondicion2=``
    }
    




    return(
        <div className='progress-bar'>


            <div key={Math.random()*1000}className={`progress-bar-bola ${primerPaso===true ? "progress-bar-bola-completa" : ""}`}>
                <div key={Math.random()*1000}className={`progress-bar-titulo-step ${primerPaso===true ? "color" : ""}`}><p key={Math.random()*1000}>{titulo1}</p></div>
                {primerPaso === true ? <p className='progress-msg-condicion'>{mensajesCondicion1}</p> : ""}
            </div>


            <div key={Math.random()*1000}className={`progress-bar-bola ${primerPaso===true && segundoPaso===true ? "progress-bar-bola-completa" : ""}`}>
                <div key={Math.random()*1000}className={`progress-bar-titulo-step ${segundoPaso===true ? "color" : ""}`}><p key={Math.random()*1000}>{titulo2}</p></div>
                {segundoPaso === true ? <p className='progress-msg-condicion'>{mensajesCondicion2}</p> : ""}
            </div>


            <div key={Math.random()*1000}className={`progress-bar-bola ${primeraCondicion===true && segundaCondicion===true ? "progress-bar-bola-completa" : ""}`}>
                <div key={Math.random()*1000}className={`progress-bar-titulo-step ${primeraCondicion===true && segundaCondicion===true ? "color" : ""}`}><p key={Math.random()*1000}>Resultados</p></div>
            </div>




            <div key={Math.random()*1000} className='progress-bar-barra'></div>
            <div key={Math.random()*1000} className={`progress-bar-progress ${claseProgress}`} style={{width: anchoProgress + '%'}}></div>
        </div>
    )

}