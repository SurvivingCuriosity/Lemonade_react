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
    const TEXTO_BOTON_BUSCAR="Buscar";
    const TEXTO_BOTON_RELLENA_CAMPOS="Rellena los campos";
    const TEXTO_BOTON_NUEVA_BUSQUEDA="Nueva búsqueda"
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
    
    const [numeroCanciones, setNumeroCanciones] = React.useState(0);
    const [numeroAudioFeatures, setNumeroAudioFeatures] = React.useState(0);
    
    React.useEffect(()=>{
        //se ha elegido artista y nota ? 
        if(seleccionArtista.id && seleccionNotaEscala.nota>-1){
            setTextoBotonFinal(TEXTO_BOTON_BUSCAR);
            setDeshabilitarBotonFinal(()=>{return false});
        }
    },[seleccionArtista,seleccionNotaEscala])
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        setNumeroCanciones(()=>{return cancionesArtista.length})
    },[cancionesArtista])
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(objetosAudioFeatures.length>0){
            // setDeshabilitarBotonFinal(()=>{return true})
        }
    },[objetosAudioFeatures])
    
    React.useEffect(()=>{
        if(resultadoFinal.length>0){
            setTextoBotonFinal(TEXTO_BOTON_NUEVA_BUSQUEDA)
            // setDeshabilitarBotonFinal(()=>{return false})
        }else{
            setTextoBotonFinal(TEXTO_BOTON_RELLENA_CAMPOS)
            setDeshabilitarBotonFinal(()=>{return true})
            setMostrando(()=>{return true})
        }
    },[resultadoFinal])

    
    let handleClickFinal = (e) =>{
        console.log('Usuario hace click final');
        switch (e.target.textContent) {
            case TEXTO_BOTON_BUSCAR:
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
                    // setMsgResultado(`Canciones de  ${seleccionArtista.name} en ${seleccionNotaEscala.notaLabel} ${seleccionNotaEscala.escalaLabel}`)
                }
                setResultadoFinal(()=>{return arrayResultadosFinales});
                break;
            case TEXTO_BOTON_NUEVA_BUSQUEDA:
                setCancionesArtista(()=>{return []})
                setSeleccionArtista(()=>{return {}})
                setCancionesArtista(()=>{return []})
                setSeleccionNotaEscala(()=>{return {}})
                setResultadoFinal(()=>{return []})
                setMostrando(()=>{return false})
                break;
            case TEXTO_BOTON_RELLENA_CAMPOS:
                
                break;
        }

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
                        mostrando={mostrando}
                    />
                    <div>
                        {
                        seleccionArtista.id 
                        ? 
                            <p className="text-center small-text texto-dif-padding">{`Se han obtenido ${numeroCanciones} canciones`}</p>    
                        :
                        ""
                        }
                        
                    </div>
                    <KeyScaleSelect 
                        colorPlaceHolder={seleccionArtista && seleccionArtista.id ? 'var(--colorTextoColor)' : 'var(--blanco3)'}
                        mensaje={seleccionArtista && seleccionArtista.id ? "" : "Primero elige un artista"}
                        disabled={seleccionArtista && seleccionArtista.id ? false : true}
                        titulo="2. Elige una nota y escala"
                        seleccion={seleccionNotaEscala}
                        callbackEleccion = {userSelectsScale}
                    />
                    <div>
                    {
                        seleccionArtista.id && seleccionNotaEscala.nota>-1
                        ? 
                        <p className="text-center small-text texto-dif-padding">{`Analizados datos de ${numeroAudioFeatures} canciones`}</p>   
                        :
                        ""
                        }
                        
                    </div>
                </div>
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
            </div>
        </div>
    )

    //funcion que se ejecuta cuando el usuario rellena los <ReactSelect /> del componente <KeyScaleSelect />
    function userSelectsScale(objNotaEscala){
        console.log('Usuario elige nota y escala');
        setSeleccionNotaEscala(objNotaEscala);
        try {
            //getObjetosAudioFeatures devuelve un array o no, en funcion de si hay mas de 100 canciones
            getObjetosAudioFeatures(cancionesArtista).then((res)=>{
                let objetos = [];
                if(res.length>1){
                    res.map((promesa, index)=>{
                        promesa.then((res2)=>{
                            objetos.push(...res2.data.audio_features);
                            if(index === res.length-1){
                                console.log('es la ultima');
                                console.log('Obtenidos '+objetos.length+' audio features');
                                setObjetosAudioFeatures(()=>{return objetos;})
                                setNumeroAudioFeatures(()=>{return objetos.length})
                            }
                        })
                    })
                }else{
                    console.log('Obtenidos '+res.data.audio_features.length+' audio features');
                    setNumeroAudioFeatures(()=>{return res.data.audio_features.length})
                    setObjetosAudioFeatures(()=>{return res.data.audio_features})
                }
            })
        } catch (err) {
          console.log(err);
        }
        
    }

    //funcion que se ejecuta onClick del componente tarjeta (si esClickable=true)
    function userSelectsArtist(artistSelected){
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

    function finalCallback(canciones){
        console.log('Final callback con '+canciones.length+ ' canciones');
        setNumeroCanciones(()=>{return canciones.length})
        setCancionesArtista(()=>{return canciones})
    }
}