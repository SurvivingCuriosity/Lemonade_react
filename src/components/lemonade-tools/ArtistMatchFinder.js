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
        
        //para evitar recorrer arrays dentro de arrays, creo un mapa con los audioFeatures con clave=id valor=elobjeto
        let audioFeatures1_conKey = new Map();
        let audioFeatures2_conKey = new Map();

        objetosAudioFeatures1.map((audioF)=>{
            audioFeatures1_conKey.set(`${audioF.id}`, audioF);
        })

        objetosAudioFeatures2.map((audioF)=>{
            audioFeatures2_conKey.set(`${audioF.id}`, audioF);
        })

        let cancionesEn_C_Am = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_Csus_Asusm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_D_Bm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_Dsus_Cm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_E_Csusm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_F_Dm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_Fsus_Dsusm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_G_Em = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_Gsus_Fm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_A_Fsusm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_Asus_Gm = {cancionesDe1:[],cancionesDe2:[]};
        let cancionesEn_B_Gsusm = {cancionesDe1:[],cancionesDe2:[]};

        //anado a las canciones la informacion que necesito de las audioFeatures y las anado a su categoria
        cancionesArtista1.map((cancion)=>{
            let nota = (audioFeatures1_conKey).get(cancion.id).key;
            let escala = (audioFeatures1_conKey).get(cancion.id).mode;
            let bpm = (audioFeatures1_conKey).get(cancion.id).tempo;

            cancion.key=nota
            cancion.bpm=bpm
            cancion.mode=escala

            console.log(cancion);
            switch (cancion.key+"-"+cancion.mode) {
                case ('0-1'):
                case('9-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_C_Am.cancionesDe1.push(cancion);
                    break;
                case ('1-1'):
                case('10-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_Csus_Asusm.cancionesDe1.push(cancion);
                    break;
                case ('2-1'):
                case('11-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_D_Bm.cancionesDe1.push(cancion);
                    break;
                case ('3-1'):
                case('0-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_Dsus_Cm.cancionesDe1.push(cancion);
                    break;
                case ('4-1'):
                case('1-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_E_Csusm.cancionesDe1.push(cancion);
                    break;
                case ('5-1'):
                case('2-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_F_Dm.cancionesDe1.push(cancion);
                    break;
                case ('6-1'):
                case('3-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_Fsus_Dsusm.cancionesDe1.push(cancion);
                    break;
                case ('7-1'):
                case('4-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_G_Em.cancionesDe1.push(cancion);
                    break;
                case ('8-1'):
                case('5-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_Gsus_Fm.cancionesDe1.push(cancion);
                    break;
                case ('9-1'):
                case('6-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_A_Fsusm.cancionesDe1.push(cancion);
                    break;
                case ('10-1'):
                case('7-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_Asus_Gm.cancionesDe1.push(cancion);
                    break;
                case ('11-1'):
                case('8-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra '+cancion.name);
                    cancionesEn_B_Gsusm.cancionesDe1.push(cancion);
                    break;
            }
        })

        cancionesArtista2.map((cancion)=>{
            let nota = (audioFeatures2_conKey).get(cancion.id).key;
            let escala = (audioFeatures2_conKey).get(cancion.id).mode;
            let bpm = (audioFeatures2_conKey).get(cancion.id).tempo;

            cancion.key=nota
            cancion.bpm=bpm
            cancion.mode=escala
            console.log(cancion.name);
            console.log(cancion.key+"-"+cancion.mode);
            switch (cancion.key+"-"+cancion.mode) {
                
                case ('0-1'):
                case('9-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_C_Am.cancionesDe2.push(cancion);
                    break;
                case ('1-1'):
                case('10-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_Csus_Asusm.cancionesDe2.push(cancion);
                    break;
                case ('2-1'):
                case('11-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_D_Bm.cancionesDe2.push(cancion);
                    break;
                case ('3-1'):
                case('0-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_Dsus_Cm.cancionesDe2.push(cancion);
                    break;
                case ('4-1'):
                case('1-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_E_Csusm.cancionesDe2.push(cancion);
                    break;
                case ('5-1'):
                case('2-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_F_Dm.cancionesDe2.push(cancion);
                    break;
                case ('6-1'):
                case('3-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_Fsus_Dsusm.cancionesDe2.push(cancion);
                    break;
                case ('7-1'):
                case('4-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_G_Em.cancionesDe2.push(cancion);
                    break;
                case ('8-1'):
                case('5-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_Gsus_Fm.cancionesDe2.push(cancion);
                    break;
                case ('9-1'):
                case('6-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_A_Fsusm.cancionesDe2.push(cancion);
                    break;
                case ('10-1'):
                case('7-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_Asus_Gm.cancionesDe2.push(cancion);
                    break;
                case ('11-1'):
                case('8-0'):
                    console.log(cancion.key+'-'+cancion.mode);
                    console.log('aqui entra' + cancion.name);
                    cancionesEn_B_Gsusm.cancionesDe2.push(cancion);
                    break;
            }
        })

        let arrayResultadosFinales = [
            {
                titulo: 'Canciones en C / Am',
                canciones: cancionesEn_C_Am
            },
            {
                titulo: 'Canciones en C# / A#m',
                canciones: cancionesEn_Csus_Asusm
            },
            {
                titulo: 'Canciones en D / Bm',
                canciones: cancionesEn_D_Bm
            },
            {
                titulo: 'Canciones en D# / Cm',
                canciones: cancionesEn_Dsus_Cm
            },
            {
                titulo: 'Canciones en E / C#m',
                canciones: cancionesEn_E_Csusm
            },
            {
                titulo: 'Canciones en F# / D#m',
                canciones: cancionesEn_Fsus_Dsusm
            },
            {
                titulo: 'Canciones en G / Dm',
                canciones: cancionesEn_G_Em
            },
            {
                titulo: 'Canciones en G# / Fm',
                canciones: cancionesEn_Gsus_Fm
            },
            {
                titulo: 'Canciones en A / F#m',
                canciones: cancionesEn_A_Fsusm
            },
            {
                titulo: 'Canciones en A# / Gm',
                canciones: cancionesEn_Asus_Gm
            },
            {
                titulo: 'Canciones en B / Gsusm',
                canciones: cancionesEn_B_Gsusm
            }
        ]
        // arrayResultadosFinales = arrayResultadosFinales.filter(obj => obj.canciones.length>1);
        
        //elimino los conjuntos sin minimo una pareja de canciones
        arrayResultadosFinales.map((conjunto,index)=>{
            if((conjunto.canciones.cancionesDe1 && conjunto.canciones.cancionesDe1.length<1) || (conjunto.canciones.cancionesDe2 && conjunto.canciones.cancionesDe2.length<1)){
                arrayResultadosFinales.splice(index,1);
            }
        })
        console.log(arrayResultadosFinales);
        if(arrayResultadosFinales.length==0){
            setMsgResultadoClass("error")
            setMsgResultado("No se encontraron coincidencias")
        }else{
            setMsgResultadoClass("success")
            // setMsgResultado(`Canciones de  '${seleccionArtista1.name}'' en la misma escala que '${seleccionCancion.name}'`)
        }
        setResultadoFinal(arrayResultadosFinales);
        setMostrarBotonFinal(false);
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
                            {resultadoFinal.map((conjunto) => {
                                return(
                                    <div>
                                        <p className="text-center texto-dif-padding">{conjunto.titulo}</p>
                                        <div className="resultado-left">
                                            {conjunto.canciones.cancionesDe1.map((cancion)=>{
                                                return(
                                                    <TarjetaCancion
                                                        key={cancion.id}
                                                        jsonData={cancion}
                                                        reducirInformacion={true}
                                                    />

                                                )
                                            })}
                                        </div>
                                        <div className="resultado-right">
                                            {conjunto.canciones.cancionesDe2.map((cancion)=>{
                                                    return(
                                                        <TarjetaCancion
                                                            key={conjunto.titulo+''+cancion.id}
                                                            jsonData={cancion}
                                                            reducirInformacion={true}
                                                        />
                                                    )
                                                })}
                                        </div>

                                    </div>
                                )
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