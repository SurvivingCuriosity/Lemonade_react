import React from "react";
import { BusquedaArtista } from "./Busqueda/BusquedaArtista";
import { KeyScaleSelect } from "./KeyScaleSelect";
import { CustomButton } from "../custom-components/CustomButton";
import TarjetaCancion from "./Busqueda/TarjetaCancion";

import { getAllUniqueArtistSongs } from "../../API_calls/apiCalls";
import { getObjetosAudioFeatures } from "../../API_calls/apiCalls";


export function ArtistKeyFinder(){
    let titulo = "Artist Key Finder"
    let descripcion = "Encuentra canciones de un artista en una escala"
    
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [seleccionNotaEscala, setSeleccionNotaEscala] = React.useState({});

    const [cancionesArtista, setCancionesArtista] = React.useState([]);
    const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

    const [haySeleccion, setHaySeleccion] = React.useState(false);
    
    const [resultadoFinal, setResultadoFinal] = React.useState([]);
    const [mostrarBotonFinal, setMostrarBotonFinal] = React.useState(true);
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(seleccionArtista.id && seleccionNotaEscala.nota>-1){
            setHaySeleccion(true);
        }else{
            setHaySeleccion(false);
        }
        if(!seleccionArtista.id){
            console.log('no hay seleccion de artista');
        }
    },[seleccionArtista,seleccionNotaEscala])
    
    let handleClickFinal = () =>{
        console.log('Usuario hace click final');
        let arrayResultadosFinales = [];

        objetosAudioFeatures.map((obj)=>{
            if(obj.mode == seleccionNotaEscala.escala 
                && obj.key == seleccionNotaEscala.nota){
                cancionesArtista.map((cancion)=>{
                    if(cancion.id == obj.id){
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

        if(arrayResultadosFinales.length==0){
            setMsgResultadoClass("error")
            setMsgResultado("No se encontraron coincidencias")
        }else{
            setMsgResultadoClass("success")
            setMsgResultado(`Canciones de  ${seleccionArtista.name} en ${seleccionNotaEscala.notaLabel} ${seleccionNotaEscala.escalaLabel}`)
        }
        setResultadoFinal(arrayResultadosFinales);
        setMostrarBotonFinal(false);
    };

    return(
        <div className="tool-container">
            <h1 className="tool-titulo" >{titulo}</h1>
            <p className="text-center">{descripcion}</p>
            <div className="tool-container-sinTitulos">
                <div className="containerSinResultado">
                    <BusquedaArtista
                        haySeleccion={seleccionArtista.id? true : false}
                        titulo="1. Elige un artista"
                        callbackEleccion={userSelectsArtist}
                    />
                    <KeyScaleSelect 
                        colorPlaceHolder={seleccionArtista && seleccionArtista.id ? 'var(--colorTextoColor)' : 'var(--blanco3)'}
                        mensaje={seleccionArtista && seleccionArtista.id ? "" : "Primero elige un artista"}
                        disabled={seleccionArtista && seleccionArtista.id ? false : true}
                        titulo="2. Elige una nota y escala"
                        seleccion={seleccionNotaEscala}
                        callbackEleccion = {userSelectsScale}
                    />
                </div>
                <div className="busqueda-container">
                    <h2 className="busqueda-titulo">3. Resultados</h2>
                    {mostrarBotonFinal 
                        ? 
                            <CustomButton 
                                textoBoton={haySeleccion ? "Buscar" : "Rellena los campos"}
                                disabled={!haySeleccion}
                                onClickCallback={handleClickFinal}
                            />
                        :
                            ""
                    }
                    

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
            </div>
        </div>
    )

    //funcion que se ejecuta cuando el usuario rellena los <ReactSelect /> del componente <KeyScaleSelect />
    function userSelectsScale(objNotaEscala){
        console.log('Usuario elige nota y escala');
        setSeleccionNotaEscala(objNotaEscala);
        setMostrarBotonFinal(true);
        try {
            //getObjetosAudioFeatures devuelve un array o no, en funcion de si hay mas de 100 canciones
            console.log(cancionesArtista);
            getObjetosAudioFeatures(cancionesArtista).then((res)=>{
                if(res.length>1){
                    res.map((promesa)=>{
                        promesa.then((res)=>{
                            setObjetosAudioFeatures([...res.data.audio_features]);
                        })
                    })
                }else{
                    setObjetosAudioFeatures(res.data.audio_features)
                }
            })
        } catch (err) {
          console.log(err);
        }
        
    }

    //funcion que se ejecuta onClick del componente tarjeta (si esClickable=true)
    function userSelectsArtist(artistSelected){
        setMostrarBotonFinal(true);
        //a este metodo le puede llegar el array vacio asi que hay que controlarlo
        if(artistSelected.id){
            console.log('Usuario elige artista');
            setSeleccionArtista(artistSelected);
            try {
                getAllUniqueArtistSongs(artistSelected.id,finalCallback);
            } catch (err) {
              console.log(err);
            }
        }else{
            setSeleccionArtista(artistSelected);
        }

    }

    function finalCallback(res){
        console.log('final callback');
        setCancionesArtista(res)
    }
}