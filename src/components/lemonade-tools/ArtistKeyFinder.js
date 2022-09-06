import React from "react";
import { getAllAudioFeatures, getAllUniqueArtistSongs } from "../../API_calls/apiCustomMethods";
import { BusquedaArtista } from "./Busqueda/BusquedaArtista";
import { KeyScaleSelect } from "./KeyScaleSelect";
import { CustomButton } from "../custom-components/CustomButton";
import TarjetaCancion from "./Busqueda/TarjetaCancion";
import { CustomSpinner } from "../custom-components/CustomSpinner";
import { PreviewChoices } from "./Busqueda/PreviewChoices";
import { ProgressBar } from "../custom-components/ProgressBar";



export function ArtistKeyFinder(){
//====PROPIEDADES Y CONSTANTES
    let titulo = "Artist Key Finder"
    let descripcion = "Encuentra canciones de un artista en una escala"
    const TEXTO_BOTON_BUSCAR="Buscar";
    const TEXTO_BOTON_CARGANDO="Cargando";
    const TEXTO_BOTON_RELLENA_CAMPOS="Rellena los campos";
    const TEXTO_BOTON_NUEVA_BUSQUEDA="Nueva búsqueda"

//====ESTADO 
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionNotaEscala, setSeleccionNotaEscala] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);
    
    const [mostrando, setMostrando] = React.useState(true);
    
    const [resultadoFinal, setResultadoFinal] = React.useState([]);
    const [deshabilitarBotonFinal, setDeshabilitarBotonFinal] = React.useState(true);
    
    const [textoBotonFinal, setTextoBotonFinal] = React.useState(TEXTO_BOTON_RELLENA_CAMPOS);
    const [configProgressBar, setConfigProgressBar] = React.useState({});
//====USEEFFECT
    React.useEffect(()=>{
        actualizarInfoProgressBar();
    },[])
    React.useEffect(()=>{
        if(seleccionArtista.id){
            setConfigProgressBar({
                progresoTotal: 0,
                        steps:[
                            {
                                titulo:'Elige artista',
                                completa:true
                            },{
                                titulo:'Elige escala',
                                completa:false
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
            getAllUniqueArtistSongs(seleccionArtista.id, lleganCanciones);
            
        }else{
            setCancionesArtista([]);
            setObjetosAudioFeatures([]);
        }
        actualizarInfoProgressBar();
    },[seleccionArtista])
    
    React.useEffect(()=>{
        if(seleccionNotaEscala.nota>-1){
            setConfigProgressBar({
                progresoTotal: 4,
                        steps:[
                            {
                                titulo:'Elige artista',
                                completa:true
                            },{
                                titulo:'Elige escala',
                                completa:true
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
        }
        if(seleccionArtista.id && seleccionNotaEscala.nota>-1){
            setTextoBotonFinal(TEXTO_BOTON_CARGANDO);
            setDeshabilitarBotonFinal(true);
        }
        if(objetosAudioFeatures.length>0 && seleccionNotaEscala.nota>-1){
            setTextoBotonFinal(()=>{return TEXTO_BOTON_BUSCAR})
            setDeshabilitarBotonFinal(()=>{return false})
        }
        actualizarInfoProgressBar();
    },[seleccionNotaEscala])
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(cancionesArtista.length>0){
            setConfigProgressBar({
                progresoTotal: 1,
                        steps:[
                            {
                                titulo:'Elige artista',
                                completa:true
                            },{
                                titulo:'Elige escala',
                                completa:false
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
            getAllAudioFeatures(cancionesArtista, lleganAudioFeatures);
        }
        actualizarInfoProgressBar();
    },[cancionesArtista])
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(objetosAudioFeatures.length>0){
            setConfigProgressBar({
                progresoTotal: 2,
                        steps:[
                            {
                                titulo:'Elige artista',
                                completa:true
                            },{
                                titulo:'Elige escala',
                                completa:false
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
        }
        if(objetosAudioFeatures.length>0 && seleccionNotaEscala.nota>-1){
            setTextoBotonFinal(()=>{return TEXTO_BOTON_BUSCAR})
            setDeshabilitarBotonFinal(()=>{return false})
        }
        actualizarInfoProgressBar();
    },[objetosAudioFeatures])
    
    React.useEffect(()=>{
        if(resultadoFinal.length>0){
            setTextoBotonFinal(TEXTO_BOTON_NUEVA_BUSQUEDA)
            setDeshabilitarBotonFinal(()=>{return false})
        }else{
            setTextoBotonFinal(TEXTO_BOTON_RELLENA_CAMPOS)
            setDeshabilitarBotonFinal(()=>{return true})
            setMostrando(()=>{return true})
        }
        actualizarInfoProgressBar();
    },[resultadoFinal])

//====FUNCIONES
    const handleClickFinal = (e) =>{
        switch (e.target.textContent) {
            case TEXTO_BOTON_BUSCAR:
                setConfigProgressBar({
                    progresoTotal: 4,
                            steps:[
                                {
                                    titulo:'Elige artista',
                                    completa:true
                                },{
                                    titulo:'Elige escala',
                                    completa:true
                                },{
                                    titulo:'Resultados',
                                    completa:true
                                }
                            ]
                });
                let arrayResultadosFinales = [];

                objetosAudioFeatures.map((obj)=>{
                    if(obj.mode === seleccionNotaEscala.escala 
                        && obj.key === seleccionNotaEscala.nota){
                        cancionesArtista.map((cancion)=>{
                            if(cancion.id === obj.id){
                                cancion.mode = obj.mode;
                                cancion.key = obj.key;
                                cancion.bpm = obj.tempo;
                                arrayResultadosFinales.push(cancion);
                            }
                        })
                    }
                })
        
                
                arrayResultadosFinales = Array.from(new Set(arrayResultadosFinales.map(a => a.name)))
                .map(name => {
                    return arrayResultadosFinales.find(a => a.name === name)
                })
        
                if(arrayResultadosFinales.length===0){
                    setMsgResultadoClass("error")
                    setMsgResultado("No se encontraron coincidencias")
                }else{
                    setMsgResultadoClass("success")
                    setMsgResultado(`Canciones de  ${seleccionArtista.name} en ${seleccionNotaEscala.notaLabel} ${seleccionNotaEscala.escalaLabel}`)
                }
                setResultadoFinal(()=>{return arrayResultadosFinales});
                break;
            case TEXTO_BOTON_NUEVA_BUSQUEDA:
                setConfigProgressBar({
                    progresoTotal: 0,
                            steps:[
                                {
                                    titulo:'Elige artista',
                                    completa:false
                                },{
                                    titulo:'Elige escala',
                                    completa:false
                                },{
                                    titulo:'Resultados',
                                    completa:false
                                }
                            ]
                });
                setSeleccionArtista(()=>{return {}})
                setSeleccionNotaEscala(()=>{return {}})
                setResultadoFinal(()=>{return []})
                setMostrando(()=>{return false})
                setMsgResultado("");
                break;
            case TEXTO_BOTON_RELLENA_CAMPOS:
                
                break;
        }

    };

    const userSelectsScale = (objNotaEscala) => {
        setSeleccionNotaEscala(objNotaEscala);
    }

    const userSelectsArtist = (artistSelected) => {
        if(artistSelected.id){
            setSeleccionArtista(artistSelected);
        }
    }

    const lleganCanciones = (canciones) => {
        setCancionesArtista(()=>{return canciones})
    }

    const lleganAudioFeatures = (audio) => {
        setObjetosAudioFeatures(()=>{return audio})
    }

    const actualizarInfoProgressBar = () => {
        setConfigProgressBar({
            tipo1: "artista",
            tipo2: "nota",
            canciones1: objetosAudioFeatures.length || undefined,
            canciones2: undefined,
            titulo1: 'Artista',
            titulo2: 'Nota', 
            primerPaso: seleccionArtista && seleccionArtista.id ? true : false,
            primeraCondicion: (cancionesArtista.length>0 && objetosAudioFeatures.length>0) ? true : false,
            segundoPaso: seleccionNotaEscala && seleccionNotaEscala.nota>-1 ? true : false,
            segundaCondicion: (seleccionArtista.id && seleccionNotaEscala.nota>-1) ? true : false,
        });
    }
//====RENDER PARTS
const primer = (
        <BusquedaArtista
            haySeleccion={seleccionArtista.id? true : false}
            titulo="1. Elige un artista"
            callbackEleccion={userSelectsArtist}
            mostrando={mostrando}
        />
)
const segun = (
        <KeyScaleSelect 
            colorPlaceHolder={objetosAudioFeatures.length>0 ? 'var(--colorTextoColor)' : 'var(--blanco3)'}
            mensaje={seleccionArtista && seleccionArtista.id ? "" : "Primero elige un artista"}
            disabled={objetosAudioFeatures.length>0 ? false : true}
            titulo="2. Elige una nota y escala"
            seleccion={seleccionNotaEscala}
            callbackEleccion = {userSelectsScale}
        />
)
const resultado = (
    <div className="busqueda-container">
                    <h2 className="busqueda-titulo">3. Resultados</h2>

                        <CustomButton 
                            textoBoton={textoBotonFinal}
                            disabled={deshabilitarBotonFinal}
                            onClickCallback={handleClickFinal}
                        />
                    
                    <p className={`${msgResultadoClass} busqueda-texto-info`}>{msgResultado}</p>

                    {resultadoFinal.length>0 
                        ? 
                            <ul className="busqueda-lista">
                                {resultadoFinal.map((item) => {
                                    return (
                                        <TarjetaCancion 
                                            key={item.id}
                                            jsonData={item}
                                        />
                                    );
                                })}
                            </ul>
                        :
                            ""
                    }
    </div>
)
//====RENDER
    return(
        <div className="tool-container">
            <h1 className="tool-titulo" >{titulo}</h1>
            <p className="text-center">{descripcion}</p>
            <ProgressBar 
                key={Math.random()*1000}
                config={configProgressBar}
            />
            <PreviewChoices 
                json1={seleccionArtista}
                json2={undefined}
                canciones1={cancionesArtista.length}
                notaEscala={seleccionNotaEscala}
            />
            <div className="tool-container">
                {!seleccionArtista.id ? primer : ""}
                {seleccionArtista.id && !objetosAudioFeatures.length>0 ? <CustomSpinner /> : ""}
                {seleccionArtista.id && objetosAudioFeatures.length>0 && seleccionNotaEscala.nota==undefined && !seleccionNotaEscala.nota>-1 ? segun : ""}
                {objetosAudioFeatures.length>0 && seleccionNotaEscala.nota>-1  ? resultado : ""}
                
            </div>
        </div>
    )


}