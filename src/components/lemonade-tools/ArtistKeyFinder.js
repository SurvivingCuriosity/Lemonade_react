import React from "react";
import { Busqueda } from "./Busqueda";
import { KeyScaleSelect } from "./KeyScaleSelect";
import { CustomButton } from "../custom-components/CustomButton";
import TarjetaArtista from "./Busqueda/TarjetaArtista";
import TarjetaCancion from "./Busqueda/TarjetaCancion";
import { getToken } from "../../API_calls/apiCalls";
import { getCancionesDeArtistaEnEscala } from "../../API_calls/apiCalls";

export function ArtistKeyFinder(){
    let titulo = "Artist Key Finder"
    let descripcion = "Encuentra canciones de un artista en una escala"
    
    const [textoInformativo, setTextoInformativo] = React.useState("Rellena los campos para activar el botón");
    
    const [seleccionArtista, setSeleccionArtista] = React.useState({});
    const [objetoNotaEscala, setObjetoNotaEscala] = React.useState({});
    
    //determina si las tarjeta es clickable (una vez q eliges deja de ser clickable y cambia textoInformativo)
    const [isClickable, setIsClickable] = React.useState(true);

    //haySeleccion es un booleano que indica si el usuario ha elegido artista y nota
    //se utiliza para habilitar o deshabilitar el boton final de buscar
    const [haySeleccion, setHaySeleccion] = React.useState(false);
    const [resultadoFinal, setResultadoFinal] = React.useState([]);

    //esta funcion se ejecuta cada vez que seleccionArtista o objetoNotaEscala cambian su valor
    React.useEffect(()=>{
        //compruebo que tienen valor preguntando por una propiedad que contienen
        if(seleccionArtista.id && objetoNotaEscala.nota>-1){
            setHaySeleccion(true);
            setTextoInformativo(`Buscando canciones de ${seleccionArtista.name} en ${objetoNotaEscala.notaLabel} ${objetoNotaEscala.escalaLabel}`)
            setIsClickable(false);
        }else{
            setHaySeleccion(false);
        }
    },[seleccionArtista,objetoNotaEscala, resultadoFinal])
    
    let handleClickFinal = (e) =>{
        e.preventDefault();
        
                try {
                    getToken().then((token)=>{
                        let _token = token.data.access_token;
                        getCancionesDeArtistaEnEscala(seleccionArtista.id,_token,objetoNotaEscala).then((res)=>{
                            window.setTimeout(()=>{
                                setResultadoFinal(res);
                            },[2000])
                        })
                    })
        
                } catch (err) {
                  console.log(err);
                }
    };
    return(
        <div className="tool-container">
            <h1 className="tool-titulo" >{titulo}</h1>
            <p className="tool-description">{descripcion}</p>
            <div className="tool-container-sinTitulos">
                <div className="containerSinResultado">
                    <Busqueda 
                        haySeleccion={seleccionArtista}
                        tipo="artista"
                        titulo="1. Elige un artista"
                        isClickable={isClickable}
                        parentCallback={userSelectsArtist}
                    />
                    <KeyScaleSelect 
                        haySeleccion={objetoNotaEscala}
                        titulo="2. Elige una nota y escala"
                        seleccion={objetoNotaEscala}
                        parentCallback = {userSelectsScale}
                    />
                </div>
                <div className="busqueda-container">
                    <h2 className="busqueda-titulo" style={resultadoFinal.length>0 ? {color: 'var(--colorTextoColor)'}: {color: 'var(--blanco3)'}}>3. Resultados</h2>
                    <CustomButton 
                        textoBoton={haySeleccion ? "Buscar" : "Rellena los campos"}
                        disabled={!haySeleccion}
                        onClickCallback={handleClickFinal}
                    />
                    {resultadoFinal.length>1 
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
        setObjetoNotaEscala(objNotaEscala);
    }
    //funcion que se ejecuta onClick del componente tarjeta (si esClickable=true)
    function userSelectsArtist(artistSelected){
        setSeleccionArtista(artistSelected);
    }



    
}