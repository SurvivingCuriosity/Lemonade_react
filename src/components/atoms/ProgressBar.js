import React from "react";
import {useTranslation} from 'react-i18next'
export function ProgressBar(props){
    const [t, i18n] = useTranslation('global');
    const {
        primerPaso, //se pinta la primera bola
        primeraCondicion, //se pinta la mitad de la barra
        segundoPaso,  //se pinta la bola del medio
        segundaCondicion, //se pinta toda la barra
        titulo1, titulo2, 
        canciones1, canciones2, 
        tipo1, tipo2} = props;
    let mensajesCondicion1 = "";
    let mensajesCondicion2 = "";
    
    const [porcentaje, setPorcentaje] = React.useState(0);

    if(tipo2==='nota'){ mensajesCondicion2=`` }

    React.useEffect(() => {
        if(primerPaso){
            setPorcentaje(25)
            mensajesCondicion1=`Analizando canciones`;
            if(primeraCondicion){
                setPorcentaje(50)
                mensajesCondicion1=`Analizadas ${canciones1} canciones`;
                if(segundoPaso){
                    mensajesCondicion2=`Analizando canciones`;
                    setPorcentaje(75)
                    if(segundaCondicion){
                        setPorcentaje(100);
                        mensajesCondicion2=`Analizadas ${canciones2} canciones`;
                    }
                }
            }
        }else{
            setPorcentaje(0)
        }
    }, [primerPaso, primeraCondicion, segundoPaso, segundaCondicion]);


    return(
        <div className='progress-bar'>

            {/* Bola 1 */}
            <div className={`progress-bar-bola ${primerPaso && "progress-bar-bola-completa"}`}>
                <div className={`progress-bar-titulo-step ${primerPaso && "color"}`}><p >{titulo1}</p></div>
                {primerPaso && <p className='progress-msg-condicion'>{mensajesCondicion1}</p>}
            </div>


            {/* Bola 2 */}
            <div className={`progress-bar-bola ${segundoPaso && "progress-bar-bola-completa"}`}>
                <div className={`progress-bar-titulo-step ${segundoPaso && "color"}`}><p >{titulo2}</p></div>
                {segundoPaso && <p className='progress-msg-condicion'>{mensajesCondicion2}</p>}
            </div>


            {/* Bola 3 */}
            <div className={`progress-bar-bola ${primeraCondicion && segundaCondicion && segundoPaso && "progress-bar-bola-completa"}`}>
                <div className={`progress-bar-titulo-step ${primeraCondicion && segundoPaso && segundaCondicion && "color"}`}><p >{t('tools.results')}</p></div>
            </div>



            {/* Barra coloreada */}
            <div  className={`progress-bar-progress`} style={{width: porcentaje + '%'}}></div>

            {/* Container */}
            <div  className='progress-bar-barra'></div>
        </div>
    )

}