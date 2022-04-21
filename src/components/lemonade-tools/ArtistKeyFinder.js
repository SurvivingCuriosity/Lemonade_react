import React from "react";
import { Busqueda } from "./Busqueda";
import { KeyScaleSelect } from "./KeyScaleSelect";

export function ArtistKeyFinder(){
    let titulo = "Artist Key Finder"
    let descripcion = "Encuentra canciones de un artista en una escala"
    
    const [textoInformativo, setTextoInformativo] = React.useState("");
    
    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [objetoNotaEscala, setObjetoNotaEscala] = React.useState({});

    //haySeleccion es un booleano que indica si el usuario ha elegido artista y nota
    //se utiliza para habilitar o deshabilitar el boton final de buscar
    const [haySeleccion, setHaySeleccion] = React.useState(false);

    //esta funcion se ejecuta cada vez que seleccionArtista o objetoNotaEscala cambian su valor
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(seleccionArtista.id && objetoNotaEscala.nota>-1){
            console.log(seleccionArtista.id);
            console.log(objetoNotaEscala.nota);
            setHaySeleccion(true);
            console.log('esta');
            setTextoInformativo(`Buscando canciones de ${seleccionArtista.name} en ${objetoNotaEscala.notaLabel} ${objetoNotaEscala.escalaLabel}`)
        }else{
            setHaySeleccion(false);
        }
        
    },[seleccionArtista,objetoNotaEscala])

    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            
            <Busqueda 
                tipo="artista"
                titulo="1. Elige un artista"
                isClickable={true}
                parentCallback={userSelectsArtist}
            />
            <KeyScaleSelect 
                titulo="2. Elige una nota y escala"
                seleccion={objetoNotaEscala}
                parentCallback = {userSelectsScale}
            />
            <p>{textoInformativo}</p>
        </div>
    )

    //funcion que se ejecuta cuando el usuario rellena los <ReactSelect /> del componente <KeyScaleSelect />
    function userSelectsScale(objNotaEscala){
        console.log(objNotaEscala);
        setObjetoNotaEscala(objNotaEscala);
    }
    //funcion que se ejecuta onClick del componente tarjeta (si esClickable=true)
    function userSelectsArtist(artistSelected){
        console.log(artistSelected);
        setSeleccionArtista(artistSelected);
    }
}