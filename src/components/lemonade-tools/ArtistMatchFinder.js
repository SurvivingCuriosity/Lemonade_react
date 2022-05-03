import React from "react";

import { getObjetosAudioFeatures } from "../../API_calls/apiCalls";
import { BusquedaArtista } from "./Busqueda/BusquedaArtista";
import { CustomButton } from "../custom-components/CustomButton";
import TarjetaCancion from "./Busqueda/TarjetaCancion";
import TarjetaCancionDoble from "./Busqueda/TarjetaCancionDoble";
import { getAllUniqueArtistSongs } from "../../API_calls/apiCalls";
import { CustomSpinner } from "../custom-components/CustomSpinner";

export function ArtistMatchFinder(){
    let titulo = "Artist Match Finder"
    let descripcion = "Obten una lista de parejas de canciones compatibles a partir de dos artistas"
    
    const TEXTO_BOTON_BUSCAR="Buscar";
    const TEXTO_BOTON_RELLENA_CAMPOS="Rellena los campos";
    const TEXTO_BOTON_NUEVA_BUSQUEDA="Nueva búsqueda"

    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");

    const [seleccionArtista1, setSeleccionArtista1] = React.useState({});
    const [seleccionArtista2, setSeleccionArtista2] = React.useState({});

    const [cancionesArtista1, setCancionesArtista1] = React.useState([]);
    const [cancionesArtista2, setCancionesArtista2] = React.useState([]);

    const [objetosAudioFeatures1, setObjetosAudioFeatures1] = React.useState([]);
    const [objetosAudioFeatures2, setObjetosAudioFeatures2] = React.useState([]);

    // const [isLoading, setIsLoading] = React.useState(false);

    const [resultadoFinal, setResultadoFinal] = React.useState([]);
    const [haySeleccion, setHaySeleccion] = React.useState(false);
    
    const [finPrimero, setFinPrimero] = React.useState(false);
    const [finSegundo, setFinSegundo] = React.useState(false);

    const [textoBotonFinal , setTextoBotonFinal] = React.useState(TEXTO_BOTON_RELLENA_CAMPOS);
    const [deshabilitarBotonFinal, setDeshabilitarBotonFinal] = React.useState(true);
    
    React.useEffect(()=>{
        console.log('useEfe seleccion');
        if(seleccionArtista1.id && seleccionArtista2.id){
            setHaySeleccion(true);
            setTextoBotonFinal(()=>{return "Cargando"})
        }else{
            setTextoBotonFinal(()=>{return TEXTO_BOTON_RELLENA_CAMPOS})
            setDeshabilitarBotonFinal(()=>{return true})
            setHaySeleccion(false);
        }
        //si vacia alguna busqueda, ponemos a 0 los audio features
        if(!seleccionArtista1.id) setObjetosAudioFeatures1(()=>{return []})
        if(!seleccionArtista2.id) setObjetosAudioFeatures2(()=>{return []})

    },[seleccionArtista1, seleccionArtista2])
    
    React.useEffect(()=>{
       console.log('useEfe audioFeatures');
 
        console.log('Tenemos '+objetosAudioFeatures1.length+' audio Features 1');
        console.log('Tenemos '+objetosAudioFeatures2.length+' audio Features 2');
        
        if(objetosAudioFeatures1.length>0 && objetosAudioFeatures2.length>0){
            setDeshabilitarBotonFinal(()=>{return false})
            setTextoBotonFinal(()=>{return TEXTO_BOTON_BUSCAR})
        }
        if(objetosAudioFeatures1.length>0){
            setFinPrimero(true);
        }else{
            setFinPrimero(false);
        }
        if(objetosAudioFeatures2.length>0){
            setFinSegundo(true);
        }else{
            setFinSegundo(false);
        }
    },[objetosAudioFeatures1,objetosAudioFeatures2])


    let handleClickFinal = (e) =>{
        
        switch (e.target.textContent) {
            case TEXTO_BOTON_NUEVA_BUSQUEDA:
                setSeleccionArtista1(()=>{return {}})
                setSeleccionArtista2(()=>{return {}})
                setSeleccionArtista1(()=>{return {}})
                setSeleccionArtista2(()=>{return {}})
                setResultadoFinal(()=>{return []})
                setTextoBotonFinal(()=>{return TEXTO_BOTON_RELLENA_CAMPOS})
                setDeshabilitarBotonFinal(()=>{return true})
                break;
            case TEXTO_BOTON_RELLENA_CAMPOS:
                
                break;
            case TEXTO_BOTON_BUSCAR:
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
                    if((audioFeatures1_conKey).get(cancion.id)){
                        let nota = (audioFeatures1_conKey).get(cancion.id).key;
                        let escala = (audioFeatures1_conKey).get(cancion.id).mode;
                        let bpm = (audioFeatures1_conKey).get(cancion.id).tempo;
            
                        cancion.key=nota
                        cancion.bpm=bpm
                        cancion.mode=escala
            
                        switch (cancion.key+"-"+cancion.mode) {
                            case ('0-1'):
                            case('9-0'):
                                cancionesEn_C_Am.cancionesDe1.push(cancion);
                                break;
                            case ('1-1'):
                            case('10-0'):
                                cancionesEn_Csus_Asusm.cancionesDe1.push(cancion);
                                break;
                            case ('2-1'):
                            case('11-0'):
                                cancionesEn_D_Bm.cancionesDe1.push(cancion);
                                break;
                            case ('3-1'):
                            case('0-0'):
                                cancionesEn_Dsus_Cm.cancionesDe1.push(cancion);
                                break;
                            case ('4-1'):
                            case('1-0'):
                                cancionesEn_E_Csusm.cancionesDe1.push(cancion);
                                break;
                            case ('5-1'):
                            case('2-0'):
                                cancionesEn_F_Dm.cancionesDe1.push(cancion);
                                break;
                            case ('6-1'):
                            case('3-0'):
                                cancionesEn_Fsus_Dsusm.cancionesDe1.push(cancion);
                                break;
                            case ('7-1'):
                            case('4-0'):
                                cancionesEn_G_Em.cancionesDe1.push(cancion);
                                break;
                            case ('8-1'):
                            case('5-0'):
                                cancionesEn_Gsus_Fm.cancionesDe1.push(cancion);
                                break;
                            case ('9-1'):
                            case('6-0'):
                                cancionesEn_A_Fsusm.cancionesDe1.push(cancion);
                                break;
                            case ('10-1'):
                            case('7-0'):
                                cancionesEn_Asus_Gm.cancionesDe1.push(cancion);
                                break;
                            case ('11-1'):
                            case('8-0'):
                                cancionesEn_B_Gsusm.cancionesDe1.push(cancion);
                                break;
                            default:
                            break;
                        }
                    }
                })

                cancionesArtista2.map((cancion)=>{
                    if((audioFeatures2_conKey).get(cancion.id)){
                        let nota = (audioFeatures2_conKey).get(cancion.id).key;
                        let escala = (audioFeatures2_conKey).get(cancion.id).mode;
                        let bpm = (audioFeatures2_conKey).get(cancion.id).tempo;
                        cancion.key=nota
                        cancion.bpm=bpm
                        cancion.mode=escala
                        switch (cancion.key+"-"+cancion.mode) {
                            case ('0-1'):
                            case('9-0'):
                                cancionesEn_C_Am.cancionesDe2.push(cancion);
                                break;
                            case ('1-1'):
                            case('10-0'):
                                cancionesEn_Csus_Asusm.cancionesDe2.push(cancion);
                                break;
                            case ('2-1'):
                            case('11-0'):
                                cancionesEn_D_Bm.cancionesDe2.push(cancion);
                                break;
                            case ('3-1'):
                            case('0-0'):
                                cancionesEn_Dsus_Cm.cancionesDe2.push(cancion);
                                break;
                            case ('4-1'):
                            case('1-0'):
                                cancionesEn_E_Csusm.cancionesDe2.push(cancion);
                                break;
                            case ('5-1'):
                            case('2-0'):
                                cancionesEn_F_Dm.cancionesDe2.push(cancion);
                                break;
                            case ('6-1'):
                            case('3-0'):
                                cancionesEn_Fsus_Dsusm.cancionesDe2.push(cancion);
                                break;
                            case ('7-1'):
                            case('4-0'):
                                cancionesEn_G_Em.cancionesDe2.push(cancion);
                                break;
                            case ('8-1'):
                            case('5-0'):
                                cancionesEn_Gsus_Fm.cancionesDe2.push(cancion);
                                break;
                            case ('9-1'):
                            case('6-0'):
                                cancionesEn_A_Fsusm.cancionesDe2.push(cancion);
                                break;
                            case ('10-1'):
                            case('7-0'):
                                cancionesEn_Asus_Gm.cancionesDe2.push(cancion);
                                break;
                            case ('11-1'):
                            case('8-0'):
                                cancionesEn_B_Gsusm.cancionesDe2.push(cancion);
                                break;
                            default:
                                break;
                        }
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
                
                let coincidenciasExactas = [];
                arrayResultadosFinales.map((conjunto)=>{
                    conjunto.canciones.cancionesDe1.map((cancion1)=>{
                        let bpm1 = (Math.round(cancion1.bpm))
                        conjunto.canciones.cancionesDe2.map((cancion2)=>{
                            let bpm2 = (Math.round(cancion2.bpm))
                            if(bpm2===bpm1){
                                coincidenciasExactas.push({cancion1, cancion2})
                            }
                        })
                    })
                })
                arrayResultadosFinales.coincidencias = coincidenciasExactas;

                if(arrayResultadosFinales.length===0){
                    setMsgResultadoClass("error")
                    setMsgResultado("No se encontraron coincidencias")

                    setDeshabilitarBotonFinal(()=>{return false});
                    setTextoBotonFinal(()=>{return TEXTO_BOTON_NUEVA_BUSQUEDA});
                }else{
                    setMsgResultadoClass("success")
                    // setMsgResultado(`Canciones de  '${seleccionArtista1.name}'' en la misma escala que '${seleccionCancion.name}'`)
                    setDeshabilitarBotonFinal(()=>{return false});
                    setTextoBotonFinal(()=>{return TEXTO_BOTON_NUEVA_BUSQUEDA});
                }
                setResultadoFinal(()=>{return arrayResultadosFinales})
            break;
        }
    };
    
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{titulo}</h1>
            <p className="tool-description text-center">{descripcion}</p>

            <BusquedaArtista
                haySeleccion={seleccionArtista1.id ? true : false}
                titulo="1. Elige el primer artista"
                callbackEleccion={userSelectsArtist1}
            />

                {cancionesArtista1.length>0 && seleccionArtista1.id ? 
                <p className="text-center small-text">{`Obtenidas ${cancionesArtista1.length} canciones de ${seleccionArtista1.name}`}</p>
                :
                ""
            }
            {!finPrimero && cancionesArtista1.length>0 && seleccionArtista1.id ? <CustomSpinner size="s" />  : ""}
            
            
            {objetosAudioFeatures1.length>0 && seleccionArtista1.id ? 
                <p className="text-center small-text">{`Analizadas ${objetosAudioFeatures1.length} canciones de ${seleccionArtista1.name}`}</p>
                :
                ""
                }
            
            <BusquedaArtista
                disabled={objetosAudioFeatures1.length>0 ? false : true}
                haySeleccion={seleccionArtista2.id ? true : false}
                titulo="2. Elige el segundo artista"
                callbackEleccion={userSelectsArtist2}
            />
                
            <div>
                {cancionesArtista2.length>0 && seleccionArtista2.id ? 
                <p className="text-center small-text">{`Obtenidas ${cancionesArtista2.length} canciones de ${seleccionArtista2.name}`}</p>
                :
                ""
                }
            </div>
            {!finSegundo && cancionesArtista2.length>0 && seleccionArtista2.id ? <CustomSpinner size="s" />  : ""}
            <div>
            {objetosAudioFeatures2.length>0 && seleccionArtista2.id ? 
                <p className="text-center small-text">{`Analizadas ${objetosAudioFeatures2.length} canciones de ${seleccionArtista2.name}`}</p>
                :
                ""
                }
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
                            <div className="">
                                <p className="texto-dif-padding text-center">Coincidencias Exactas</p>
                                    {resultadoFinal.coincidencias.map((par)=>{
                                        return(
                                            <TarjetaCancionDoble
                                                key={par.cancion1.id+par.cancion2.id}
                                                jsonData1={par.cancion1}
                                                jsonData2={par.cancion2}
                                            />
                                        )
                                    })}
                                </div>
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
        console.log('Llegan las canciones de 1, las seteamos y  llamamos a dameObjetosAudioFeatures. Le pasamos: ');
        setCancionesArtista1(()=>{return listaCanciones;});
        window.setTimeout(()=>{
            dameObjetosAudioFeatures(listaCanciones, 1);
        },3000)
    }
    function lleganCancionesDeArtista2(listaCanciones){
        console.log('Llegan las canciones de 2, las seteamos y  llamamos a dameObjetosAudioFeatures. Le pasamos: ');
        setCancionesArtista2(()=>{return listaCanciones;});
        window.setTimeout(()=>{
            dameObjetosAudioFeatures(listaCanciones, 2);
        },3000)
    }


    function dameObjetosAudioFeatures(lista, queArtistaEs){
        console.log('Estamos en dameObjetosAudioFeatures, vamos a llamar a getAudiofeatures y le pasamos:');
        try {
            //getObjetosAudioFeatures devuelve un array o no, en funcion de si hay mas de 100 canciones
            switch (queArtistaEs) {
                case 1:
                    console.log('Es el artista 1');
                    getObjetosAudioFeatures(lista).then((res1)=>{
                        console.log('getObjetosAudioFeatures');
                        let listaObjetosFeatures = [];
                        if(res1.length>1){
                            console.log('res>1');
                            res1.map((promesa, index)=>{
                                console.log('mapeando promesas');
                                promesa.then((res)=>{
                                    listaObjetosFeatures.push(...res.data.audio_features)
                                })
                                if(index === res1.length-1){
                                    console.log('Ultima iteracion y vamos a pasar');
                                    setObjetosAudioFeatures1(listaObjetosFeatures)
                                }
                            })
                        }else{
                            setObjetosAudioFeatures1(res1.data.audio_features)
                        }
                    })
                    break;
                case 2:
                    console.log('Es el artista 2');
                    let listaObjetosFeatures = [];
                    getObjetosAudioFeatures(lista).then((res1)=>{
                        if(res1.length>1){
                            res1.map((promesa, index)=>{
                                console.log('mapeando promesas');
                                promesa.then((res)=>{
                                    listaObjetosFeatures.push(...res.data.audio_features)
                                })
                                if(index === res1.length-1){
                                    console.log('Ultima iteracion y vamos a pasar');
                                    setObjetosAudioFeatures2(()=>{return listaObjetosFeatures})
                                }
                            })
                        }else{
                            setObjetosAudioFeatures2(()=>{return res1.data.audio_features})
                        }
                    })
                    break;
                default:
                    break;
            }
        } catch (err) {
          console.log(err);
        }
    }

    function userSelectsArtist1(artistSelected){
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