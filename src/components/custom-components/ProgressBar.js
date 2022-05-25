import React from "react";

export function ProgressBar(props){
    const {steps, progresoTotal} = props.config;
    let anchoProgress = 0;
    switch (progresoTotal) {
        case 0:
            anchoProgress=3;
            break;
        case 1:
            anchoProgress=25;
            break;
        case 2:
            anchoProgress=50;
            break;
        case 3:
            anchoProgress=75;
            break;
        case 4:
            anchoProgress=90;
            break;
    }
    const render = (
        steps.map((s,i)=>{
            if(steps[i+1]){
                return(

                        <div key={Math.random()*1000}className={`progress-bar-bola ${s.completa ? "progress-bar-bola-completa" : ""}`}>
                            <div key={Math.random()*1000}className={`progress-bar-titulo-step ${s.completa ? "color" : ""}`}><p key={Math.random()*1000}>{s.titulo}</p></div>
                        </div>
                )
            }else{
                return(
                    <div key={Math.random()*1000} className={`progress-bar-bola ${s.completa ? "progress-bar-bola-completa" : ""}`}>
                        <div key={Math.random()*1000} className={`progress-bar-titulo-step ${s.completa ? "color" : ""}`}><p key={Math.random()*1000}>{s.titulo}</p></div>
                    </div>
                )
            }

        })
    )
    return(
            <div className='progress-bar'>
            
            {render}
            <div key={Math.random()*1000} className='progress-bar-barra'></div>
            <div key={Math.random()*1000} className='progress-bar-progress' style={{width: anchoProgress + '%'}}></div>
        </div>
    )

}