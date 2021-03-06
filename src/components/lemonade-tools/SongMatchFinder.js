import React from "react";
import { getAllUniqueArtistSongs } from "../../API_calls/apiCustomMethods";
import { getAllAudioFeatures } from "../../API_calls/apiCustomMethods";
import { CustomButton } from "../custom-components/CustomButton";
import { CustomSpinner } from "../custom-components/CustomSpinner";
import {BusquedaArtista} from './Busqueda/BusquedaArtista'
import {BusquedaCancion} from './Busqueda/BusquedaCancion'
import TarjetaCancion from "./Busqueda/TarjetaCancion";
import { PreviewChoices } from "./Busqueda/PreviewChoices";
import { ProgressBar } from "../custom-components/ProgressBar";

export function SongMatchFinder(){
//====PROPIEDADES Y CONSTANTES
    const MSG_INIT=""
    const MSG_NO_TEXTO="No has introducido texto."
    const MSG_SELECCION="Has elegido: "
    const MSG_NO_RESULTADOS="No hay resultados para tu búsqueda."
    const MSG_RESULTADOS_OBTENIDOS="Resultados obtenidos: "
    const MSG_PREPARANDO_RESULTADOS="Preparando resultados: "
    const MSG_ERROR_PETICION="Error en la búsqueda. Contacta con el programador."

    let titulo = "Song Match Finder"
    let descripcion = "Obten una lista de canciones de un artista elegido, compatibles con la cancion introducida"

    const TEXTO_BOTON_BUSCAR="Buscar";
    const TEXTO_BOTON_RELLENA_CAMPOS="Rellena los campos";
    const TEXTO_BOTON_NUEVA_BUSQUEDA="Nueva búsqueda"
    const TEXTO_BOTON_CARGANDO="Cargando"

//====ESTADO
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionCancion, setSeleccionCancion] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [notaEscalaDeCancion, setNotaEscalaDeCancion] = React.useState({});
    
    const [resultadoFinal, setResultadoFinal] = React.useState([]);
    const [deshabilitarBotonFinal, setDeshabilitarBotonFinal] = React.useState(true);
    const [textoBotonFinal, setTextoBotonFinal] = React.useState(TEXTO_BOTON_RELLENA_CAMPOS);
    const [configProgressBar, setConfigProgressBar] = React.useState({
        progresoTotal: 0,
                steps:[
                    {
                        titulo:'Elige canción',
                        completa:false
                    },{
                        titulo:'Elige artista',
                        completa:false
                    },{
                        titulo:'Resultados',
                        completa:false
                    }
                ]
    });
//====USE EFFECT
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(seleccionArtista.id && seleccionCancion.id){
            setTextoBotonFinal('Cargando');
        }
    },[seleccionArtista, seleccionCancion])
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(seleccionCancion.id){
            setConfigProgressBar({
                progresoTotal: 2,
                        steps:[
                            {
                                titulo:'Elige cancion',
                                completa:true
                            },{
                                titulo:'Elige artista',
                                completa:false
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
        }
    },[seleccionCancion])
    
    React.useEffect(()=>{
        if(seleccionArtista.id){
            setConfigProgressBar({
                progresoTotal: 2,
                        steps:[
                            {
                                titulo:'Elige cancion',
                                completa:true
                            },{
                                titulo:'Elige artista',
                                completa:true
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
            getAllUniqueArtistSongs(seleccionArtista.id, lleganCanciones)
        }else{
            setCancionesArtista([]);
        }
    },[seleccionArtista])
    
    React.useEffect(()=>{
        if(cancionesArtista.length>0){
            getAllAudioFeatures(cancionesArtista, lleganAudioFeatures);
        }else{
            setObjetosAudioFeatures([]);
        }
    },[cancionesArtista])

    React.useEffect(()=>{
        if(objetosAudioFeatures.length>0 && seleccionCancion.id){
            setDeshabilitarBotonFinal(()=>{return false})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_BUSCAR})
        }else{
            setDeshabilitarBotonFinal(()=>{return true})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_RELLENA_CAMPOS})
        }
    },[objetosAudioFeatures])

    React.useEffect(()=>{
        if(resultadoFinal.length>0){
            setDeshabilitarBotonFinal(()=>{return false})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_NUEVA_BUSQUEDA})
        }else{
            setDeshabilitarBotonFinal(()=>{return false})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_NUEVA_BUSQUEDA})
        }
    },[resultadoFinal])

//====FUNCIONES
    const handleClickFinal = (e) =>{
        switch (e.target.textContent) {
            case TEXTO_BOTON_NUEVA_BUSQUEDA:
                setSeleccionArtista(()=>{return {}})
                setSeleccionCancion(()=>{return []})
                setResultadoFinal(()=>{return []})
                setTextoBotonFinal(()=>{return TEXTO_BOTON_RELLENA_CAMPOS})
                setConfigProgressBar({
                    progresoTotal: 0,
                            steps:[
                                {
                                    titulo:'Elige cancion',
                                    completa:false
                                },{
                                    titulo:'Elige artista',
                                    completa:false
                                },{
                                    titulo:'Resultados',
                                    completa:false
                                }
                            ]
                });
                setDeshabilitarBotonFinal(()=>{return true})
                break;
            case TEXTO_BOTON_RELLENA_CAMPOS:
                break;
            case TEXTO_BOTON_BUSCAR:
                let arrayResultadosFinales = [];

                objetosAudioFeatures.map((obj)=>{   
                    if(obj.mode === notaEscalaDeCancion.escala 
                        && obj.key === notaEscalaDeCancion.nota){
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
        
                if(arrayResultadosFinales.length===0){
                    setMsgResultadoClass("error")
                    setMsgResultado(`No hay canciones de ${seleccionArtista.name} en la misma escala que ${seleccionCancion.name}`)
                    setTextoBotonFinal(()=>{return TEXTO_BOTON_NUEVA_BUSQUEDA})
                    setDeshabilitarBotonFinal(()=>{return false})
                }else{
                    setMsgResultadoClass("success")
                    setMsgResultado(`Canciones de  '${seleccionArtista.name}' en la misma escala que '${seleccionCancion.name}'`)
                    setTextoBotonFinal(()=>{return TEXTO_BOTON_NUEVA_BUSQUEDA})
                    setDeshabilitarBotonFinal(()=>{return false})
                }
                setResultadoFinal(arrayResultadosFinales);
        }
    };

    const userSelectsSong = (songSelected)=> {
        setSeleccionCancion(songSelected);
        setNotaEscalaDeCancion({
            nota: songSelected.key,
            escala: songSelected.mode
        })
    }
    
    const userSelectsArtist = (artistSelected)=> {
        setSeleccionArtista(()=>{return artistSelected});
    }
    
    const lleganCanciones = (listaCancionesArtista)=> {
        setCancionesArtista(()=>{return listaCancionesArtista});
        setConfigProgressBar({
            progresoTotal: 3,
                    steps:[
                        {
                            titulo:'Elige cancion',
                            completa:true
                        },{
                            titulo:'Elige artista',
                            completa:true
                        },{
                            titulo:'Resultados',
                            completa:false
                        }
                    ]
        });
        
    }

    const lleganAudioFeatures = (audio)=> {
        setObjetosAudioFeatures(audio);
        setConfigProgressBar({
            progresoTotal: 4,
                    steps:[
                        {
                            titulo:'Elige cancion',
                            completa:true
                        },{
                            titulo:'Elige artista',
                            completa:true
                        },{
                            titulo:'Resultados',
                            completa:false
                        }
                    ]
        });
    }
//====RENDER PARTS
const primer = (
    <BusquedaCancion 
        haySeleccion={seleccionCancion.id? true : false}
        titulo="1. Elige una canción"
        callbackEleccion={userSelectsSong}
    />
)
const segun = (
    <BusquedaArtista 
        haySeleccion={seleccionArtista.id? true : false}
        titulo="2. Elige un artista"
        callbackEleccion={userSelectsArtist}
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
    
    

    {resultadoFinal.length===0 && seleccionArtista.id && seleccionCancion.id ? <p className={`text-center small-text ${msgResultadoClass}`}>{msgResultado}</p> : ""}
    {resultadoFinal.length>0 
        ? 
        <ul className="busqueda-lista">
            <p className={`text-center small-text ${msgResultadoClass}`}>{msgResultado}</p>
                {resultadoFinal.map((item) => {
                    return (
                        <TarjetaCancion 
                            isClickable={false}
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
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            <ProgressBar 
                key={Math.random()*1000}
                config={configProgressBar}
            />
            <PreviewChoices 
                json1={seleccionCancion}
                json2={seleccionArtista}
                canciones2={cancionesArtista.length}
            />

                {!seleccionCancion.id ? primer : ""}
                {seleccionCancion.id && !objetosAudioFeatures.length>0 ? segun : ""}
                {seleccionArtista.id && !objetosAudioFeatures.length>0 ? <CustomSpinner /> : ""}
                {objetosAudioFeatures.length>0 && notaEscalaDeCancion  ? resultado : ""}


        </div>
    )



}