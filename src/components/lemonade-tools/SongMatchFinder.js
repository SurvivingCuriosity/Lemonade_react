import React from "react";
import {BusquedaArtista} from './Busqueda/BusquedaArtista'
import {BusquedaCancion} from './Busqueda/BusquedaCancion'
import TarjetaCancion from "./Busqueda/TarjetaCancion";
import { CustomButton } from "../custom-components/CustomButton";
import { getAllUniqueArtistSongs } from "../../API_calls/apiCalls";
import { getObjetosAudioFeatures } from "../../API_calls/apiCalls";

export function SongMatchFinder(){
    // const MSG_INIT=""
    // const MSG_NO_TEXTO="No has introducido texto."
    // const MSG_SELECCION="Has elegido: "
    // const MSG_NO_RESULTADOS="No hay resultados para tu búsqueda."
    // const MSG_RESULTADOS_OBTENIDOS="Resultados obtenidos: "
    // const MSG_PREPARANDO_RESULTADOS="Preparando resultados: "
    // const MSG_ERROR_PETICION="Error en la búsqueda. Contacta con el programador."

    let titulo = "Song Match Finder"
    let descripcion = "Obten una lista de canciones de un artista elegido, compatibles con la cancion introducida"

    const TEXTO_BOTON_BUSCAR="Buscar";
    const TEXTO_BOTON_RELLENA_CAMPOS="Rellena los campos";
    const TEXTO_BOTON_NUEVA_BUSQUEDA="Nueva búsqueda"

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
    
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(seleccionArtista.id && seleccionCancion.id){
            console.log('haysele');
            setDeshabilitarBotonFinal(()=>{return false})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_BUSCAR})

        }else{
            setDeshabilitarBotonFinal(()=>{return true})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_RELLENA_CAMPOS})
        }

        
    },[seleccionArtista, seleccionCancion])
    
    React.useEffect(()=>{
        if(cancionesArtista.length>0){
            window.setTimeout(()=>{
                dameObjetosAudioFeatures(cancionesArtista);
            },1000)
        }
    },[cancionesArtista])

    React.useEffect(()=>{
        if(objetosAudioFeatures.length>0){
            setDeshabilitarBotonFinal(()=>{return false})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_BUSCAR})
        }
    },[objetosAudioFeatures])

    React.useEffect(()=>{
        if(resultadoFinal.length>0){
            setDeshabilitarBotonFinal(()=>{return false})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_NUEVA_BUSQUEDA})
        }
    },[resultadoFinal])


    let handleClickFinal = (e) =>{
        console.log('Usuario hace click final');
        switch (e.target.textContent) {
            case TEXTO_BOTON_NUEVA_BUSQUEDA:
                setSeleccionArtista({});
                setSeleccionCancion({});
                setResultadoFinal([]);
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
        
                arrayResultadosFinales = Array.from(new Set(arrayResultadosFinales.map(a => a.id)))
                .map(id => {
                    return arrayResultadosFinales.find(a => (a.id === id))
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
                    setMsgResultado(`Canciones de  '${seleccionArtista.name}'' en la misma escala que '${seleccionCancion.name}'`)
                }
                setResultadoFinal(arrayResultadosFinales);
        }
    };


    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            <div className="tool-wrapper">
                <BusquedaCancion 
                    haySeleccion={seleccionCancion.id? true : false}
                    titulo="1. Elige una canción"
                    callbackEleccion={userSelectsSong}
                />
                <BusquedaArtista
                    haySeleccion={seleccionArtista.id? true : false}
                    titulo="2. Elige un artista"
                    callbackEleccion={userSelectsArtist}
                />
                <div className="busqueda-container">
                    <h2 className="busqueda-titulo">3. Resultados</h2>

                    <CustomButton 
                        textoBoton={textoBotonFinal}
                        disabled={deshabilitarBotonFinal}
                        onClickCallback={handleClickFinal}
                    />
                    
                    

                    <p className={`${msgResultadoClass} busqueda-texto-info text-center small-text`}>{msgResultado}</p>

                    {resultadoFinal.length>0 
                        ? 
                            <ul className="busqueda-lista">
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
            </div>
        </div>
    )
    function userSelectsSong(songSelected){
        setDeshabilitarBotonFinal(true);
        //a este metodo le puede llegar el array vacio asi que hay que controlarlo
        setSeleccionCancion(songSelected);
        setNotaEscalaDeCancion({
            nota: songSelected.key,
            escala: songSelected.mode
        })
    }

    function userSelectsArtist(artistSelected){
        setDeshabilitarBotonFinal(true);
        //a este metodo le puede llegar el array vacio asi que hay que controlarlo
        if(artistSelected.id){
            console.log('Usuario elige artista');
            setSeleccionArtista(artistSelected);
            try {
                getAllUniqueArtistSongs(artistSelected.id, finalCallback);
            } catch (err) {
              console.log(err);
            }
        }else{
            setSeleccionArtista(()=>{return artistSelected});
        }

    }
    
    function finalCallback(listaCancionesArtista){
        setCancionesArtista(()=>{return listaCancionesArtista});
        dameObjetosAudioFeatures(listaCancionesArtista);
    }

    function dameObjetosAudioFeatures(lista){
        try {
            //getObjetosAudioFeatures devuelve un array o no, en funcion de si hay mas de 100 canciones
            getObjetosAudioFeatures(lista).then((res1)=>{
                if(res1.length>1){
                    res1.map((promesa)=>{
                        promesa.then((res)=>{
                            setObjetosAudioFeatures([...res.data.audio_features]);
                        })
                    })
                }else{
                    setObjetosAudioFeatures(()=>{return res1.data.audio_features})
                }
            })
        } catch (err) {
          console.log(err);
        }
    }

}