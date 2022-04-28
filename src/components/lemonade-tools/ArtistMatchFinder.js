import React from "react";

import { getObjetosAudioFeatures } from "../../API_calls/apiCalls";
import { BusquedaArtista } from "./Busqueda/BusquedaArtista";
import { CustomButton } from "../custom-components/CustomButton";
import TarjetaCancion from "./Busqueda/TarjetaCancion";
import { getAllUniqueArtistSongs } from "../../API_calls/apiCalls";

export function ArtistMatchFinder(){
    let titulo = "Artist Match Finder"
    let descripcion = "Obten una lista de parejas de canciones compatibles a partir de dos artistas"

    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista1, setSeleccionArtista1] = React.useState({});
    const [seleccionArtista2, setSeleccionArtista2] = React.useState({});

    const [cancionesArtista1, setCancionesArtista1] = React.useState([]);
    const [cancionesArtista2, setCancionesArtista2] = React.useState([]);

    const [objetosAudioFeatures1, setObjetosAudioFeatures1] = React.useState([]);
    const [objetosAudioFeatures2, setObjetosAudioFeatures2] = React.useState([]);

    const [haySeleccion, setHaySeleccion] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const [resultadoFinal, setResultadoFinal] = React.useState([]);
    const [mostrarBotonFinal, setMostrarBotonFinal] = React.useState(true);
    
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        console.log('useEfe');
        if(seleccionArtista1.id && seleccionArtista2.id){
            console.log('haysele');
            setHaySeleccion(true);
        }else{
            setHaySeleccion(false);
        }
        console.log('==========SELECCION ARTISTA 1');
        console.log(seleccionArtista1);
        console.log('==========CANCIONES ARTISTA 1');
        console.log(cancionesArtista1);
        console.log('==========AUDIO FEATURES 1');
        console.log(objetosAudioFeatures1);
        
        console.log('==========SELECCION ARTISTA 2');
        console.log(seleccionArtista2);
        console.log('==========CANCIONES ARTISTA 2');
        console.log(cancionesArtista2);
        console.log('==========AUDIO FEATURES 2');
        console.log(objetosAudioFeatures2);
    },[seleccionArtista1, seleccionArtista2])

    let handleClickFinal = () =>{
        // console.log('=====BOTON FINAL=====SELECCION ARTISTA 1');
        // console.log(seleccionArtista1);
        // console.log('=====BOTON FINAL=====CANCIONES ARTISTA 1');
        // console.log(cancionesArtista1);
        // console.log('=====BOTON FINAL=====AUDIO FEATURES 1');
        // console.log(objetosAudioFeatures1);
        
        // console.log('=====BOTON FINAL=====SELECCION ARTISTA 2');
        // console.log(seleccionArtista2);
        // console.log('=====BOTON FINAL=====CANCIONES ARTISTA 2');
        // console.log(cancionesArtista2);
        // console.log('=====BOTON FINAL=====AUDIO FEATURES 2');
        // console.log(objetosAudioFeatures2);
        
        // console.log('Usuario hace click final');
        // let arrayResultadosFinales = [];
        // objetosAudioFeatures.map((obj)=>{   
        //     if(obj.mode == notaEscalaDeCancion.escala 
        //         && obj.key == notaEscalaDeCancion.nota){
        //         cancionesArtista.map((cancion)=>{
        //             if(cancion.id == obj.id){
        //                 cancion.mode = obj.mode;
        //                 cancion.key = obj.key;
        //                 cancion.bpm = obj.tempo;
        //                 arrayResultadosFinales.push(cancion);
        //             }
        //         })
        //     }
        // })

        // arrayResultadosFinales = Array.from(new Set(arrayResultadosFinales.map(a => a.id)))
        // .map(id => {
        //     return arrayResultadosFinales.find(a => (a.id === id))
        // })
        
        // arrayResultadosFinales = Array.from(new Set(arrayResultadosFinales.map(a => a.name)))
        // .map(name => {
        //     return arrayResultadosFinales.find(a => a.name === name)
        // })

        // if(arrayResultadosFinales.length==0){
        //     setMsgResultadoClass("error")
        //     setMsgResultado("No se encontraron coincidencias")
        // }else{
        //     setMsgResultadoClass("success")
        //     setMsgResultado(`Canciones de  '${seleccionArtista1.name}'' en la misma escala que '${seleccionCancion.name}'`)
        // }
        // setResultadoFinal(arrayResultadosFinales);
        // setMostrarBotonFinal(false);
    };
    
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>

            <BusquedaArtista
                haySeleccion={seleccionArtista1.id? true : false}
                titulo="1. Elige el primer artista"
                callbackEleccion={userSelectsArtist1}
            />
            <BusquedaArtista
                haySeleccion={seleccionArtista2.id? true : false}
                titulo="1. Elige el segundo artista"
                callbackEleccion={userSelectsArtist2}
            />
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
    )

    function lleganCancionesDeArtista1(listaCanciones){
        setCancionesArtista1(listaCanciones);
        console.log('llegnaCanciones2 las seteamos y  llamamos a dameObjetosAudioFeatures');
        setIsLoading(true);
        window.setTimeout(()=>{
            dameObjetosAudioFeatures(listaCanciones, 1);
        },3000)
        setIsLoading(false);
    }
    function lleganCancionesDeArtista2(listaCanciones){
        setCancionesArtista2(listaCanciones);
        console.log('llegnaCanciones2 las seteamos y  llamamos a dameObjetosAudioFeatures');
        window.setTimeout(()=>{
            dameObjetosAudioFeatures(listaCanciones, 2);
        },3000)
        setIsLoading(false);
    }


    function dameObjetosAudioFeatures(lista, queArtistaEs){
        console.log(queArtistaEs);
        console.log('vamos a llamar a getAudiofeatures y le pasamos:');
        console.log(lista);
        setIsLoading(true);
        try {
            //getObjetosAudioFeatures devuelve un array o no, en funcion de si hay mas de 100 canciones
            switch (queArtistaEs) {
                case 1:
                    console.log('es uno');
                    getObjetosAudioFeatures(lista).then((res1)=>{
                        console.log('getObjetosAudioFeatures');
                        if(res1.length>1){
                            console.log('res>1');
                            res1.map((promesa)=>{
                                console.log('mapeando promesas');
                                console.log(promesa);
                                promesa.then((res)=>{
                                    console.log(res);
                                    setObjetosAudioFeatures1([...objetosAudioFeatures1, ...res.data.audio_features])
                                })
                            })
                            setIsLoading(false);
                        }else{
                            console.log('mostrando <100 audiofeatures');
                            console.log(res1);
                            setObjetosAudioFeatures1(res1.data.audio_features)
                            setIsLoading(false);
                        }
                    })
                    break;
                case 2:
                    console.log('es dos');
                    getObjetosAudioFeatures(lista).then((res1)=>{
                        if(res1.length>1){
                            res1.map((promesa)=>{
                                promesa.then((res)=>{
                                    setObjetosAudioFeatures2([...objetosAudioFeatures2, ...res.data.audio_features])
                                })
                            })
                            setIsLoading(false);
                        }else{
                            setObjetosAudioFeatures2(res1.data.audio_features)
                            setIsLoading(false);
                        }
                    })
            }
            

        } catch (err) {
          console.log(err);
        }
    }

    function userSelectsArtist1(artistSelected){
        console.log(artistSelected);
        setMostrarBotonFinal(true);
        //a este metodo le puede llegar el array vacio asi que hay que controlarlo
        if(artistSelected.id){
            console.log('Usuario elige primer artista');
            setSeleccionArtista1(artistSelected);
            try {
                getAllUniqueArtistSongs(artistSelected.id, lleganCancionesDeArtista1);
            } catch (err) {
              console.log(err);
            }
        }else{
            setSeleccionArtista1(artistSelected);
        }


    }

    function userSelectsArtist2(artistSelected){
        console.log(artistSelected);
        setMostrarBotonFinal(true);
        //a este metodo le puede llegar el array vacio asi que hay que controlarlo
        if(artistSelected.id){
            console.log('Usuario elige segundo artista');
            setSeleccionArtista2(artistSelected);
            try {
                getAllUniqueArtistSongs(artistSelected.id, lleganCancionesDeArtista2);
            } catch (err) {
              console.log(err);
            }
        }else{
            setSeleccionArtista2(artistSelected);
        }


    }

}