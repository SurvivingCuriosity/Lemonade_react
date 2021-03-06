import React from "react";
import { getAllAudioFeatures, getAllUniqueArtistSongs } from "../../API_calls/apiCustomMethods";
import { CustomSpinner } from "../custom-components/CustomSpinner";
import { CustomButton } from "../custom-components/CustomButton";
import { ProgressBar } from "../custom-components/ProgressBar";
import { BusquedaArtista } from "./Busqueda/BusquedaArtista";
import TarjetaCancion from "./Busqueda/TarjetaCancion";
import TarjetaCancionDoble from "./Busqueda/TarjetaCancionDoble";
import { PreviewChoices } from "./Busqueda/PreviewChoices";
import { mensajes } from "../../static_data/error_handling";

export function ArtistMatchFinder(){
//====PROPIEDADES Y CONSTANTES
    const TITULO = "Artist Match Finder"
    const DESCRIPCION = "Obten una lista de parejas de canciones compatibles a partir de dos artistas"
    
    const TEXTO_BOTON_BUSCAR="Buscar";
    const TEXTO_BOTON_RELLENA_CAMPOS="Rellena los campos";
    const TEXTO_BOTON_NUEVA_BUSQUEDA="Nueva búsqueda"

//====ESTADO
    const [seleccionArtista1, setSeleccionArtista1] = React.useState({});
    const [cancionesArtista1, setCancionesArtista1] = React.useState([]);
    const [objetosAudioFeatures1, setObjetosAudioFeatures1] = React.useState([]);
    
    const [seleccionArtista2, setSeleccionArtista2] = React.useState({});
    const [cancionesArtista2, setCancionesArtista2] = React.useState([]);
    const [objetosAudioFeatures2, setObjetosAudioFeatures2] = React.useState([]);
    
    const [msgResultado, setMsgResultado] = React.useState("");
    const [msgResultadoClass, setMsgResultadoClass] = React.useState("success");
    
    const [configProgressBar, setConfigProgressBar] = React.useState({
        progresoTotal: 0,
                steps:[
                    {
                        titulo:'Elige artista 1',
                        completa:false
                    },{
                        titulo:'Elige artista 2',
                        completa:false
                    },{
                        titulo:'Resultados',
                        completa:false
                    }
                ]
    });

    const [resultadoFinal, setResultadoFinal] = React.useState([]);

    const [focus1, setFocus1] = React.useState(true);
    const [focus2, setFocus2] = React.useState(false);

    const [textoBotonFinal , setTextoBotonFinal] = React.useState(TEXTO_BOTON_RELLENA_CAMPOS);
    const [deshabilitarBotonFinal, setDeshabilitarBotonFinal] = React.useState(true);
    
//====USE EFECT
    React.useEffect(()=>{
        if(seleccionArtista1.id){
            setConfigProgressBar({
                progresoTotal: 0,
                        steps:[
                            {
                                titulo:'Elige artista 1',
                                completa:true
                            },{
                                titulo:'Elige artista 2',
                                completa:false
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
            getAllUniqueArtistSongs(seleccionArtista1.id, lleganCancionesDeArtista1);
        }else{
            setCancionesArtista1([]);
        }
    },[seleccionArtista1])
//====USE EFECT
    React.useEffect(()=>{
        if(seleccionArtista1.id && seleccionArtista2.id){
            setTextoBotonFinal('Cargando');
        }
        if(seleccionArtista2.id){
            setConfigProgressBar({
                progresoTotal: 2,
                        steps:[
                            {
                                titulo:'Elige artista 1',
                                completa:true
                            },{
                                titulo:'Elige artista 2',
                                completa:true
                            },{
                                titulo:'Resultados',
                                completa:false
                            }
                        ]
            });
            getAllUniqueArtistSongs(seleccionArtista2.id, lleganCancionesDeArtista2);
        }else{
            setCancionesArtista2([]);
        }
    },[seleccionArtista2])

    React.useEffect(()=>{
        if(cancionesArtista1.length>0){
            getAllAudioFeatures(cancionesArtista1, lleganAudioFeatures1);
        }else{
            setObjetosAudioFeatures1([]);
        }
    },[cancionesArtista1])
    React.useEffect(()=>{
        if(cancionesArtista2.length>0){
            getAllAudioFeatures(cancionesArtista2, lleganAudioFeatures2);
        }else{
            setObjetosAudioFeatures2([]);
        }
    },[cancionesArtista2])
    
    React.useEffect(()=>{
        if(objetosAudioFeatures1.length>0 && objetosAudioFeatures2.length>0){
            setDeshabilitarBotonFinal(false);
            setTextoBotonFinal(TEXTO_BOTON_BUSCAR)
            
        }
    },[objetosAudioFeatures1, objetosAudioFeatures2])


//====FUNCIONES
    const handleClickFinal = (e) =>{
        switch (e.target.textContent) {
            case TEXTO_BOTON_NUEVA_BUSQUEDA:
                setConfigProgressBar({
                    progresoTotal: 0,
                            steps:[
                                {
                                    titulo:'Elige artista 1',
                                    completa:false
                                },{
                                    titulo:'Elige artista 2',
                                    completa:false
                                },{
                                    titulo:'Resultados',
                                    completa:false
                                }
                            ]
                });
                setSeleccionArtista1(()=>{return {}})
                setSeleccionArtista2(()=>{return {}})
                setResultadoFinal(()=>{return []})
                setTextoBotonFinal(()=>{return TEXTO_BOTON_RELLENA_CAMPOS})
                setDeshabilitarBotonFinal(()=>{return true})
                break;
            case TEXTO_BOTON_RELLENA_CAMPOS:
                
                break;
            case TEXTO_BOTON_BUSCAR:
                setConfigProgressBar({
                    progresoTotal: 4,
                            steps:[
                                {
                                    titulo:'Elige artista 1',
                                    completa:true
                                },{
                                    titulo:'Elige artista 2',
                                    completa:true
                                },{
                                    titulo:'Resultados',
                                    completa:true
                                }
                            ]
                });
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
                arrayResultadosFinales.coincidencias.canciones = coincidenciasExactas;

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

    const userSelectsArtist1 = (artistSelected) => {
        //a este metodo le puede llegar el array vacio asi que hay que controlarlo
        if(artistSelected.id){
            setSeleccionArtista1(artistSelected);
        }
    }

    const userSelectsArtist2 = (artistSelected) => {
        //a este metodo le puede llegar el array vacio asi que hay que controlarlo
        if(artistSelected.id){
            setSeleccionArtista2(artistSelected);
        }
    }

    const lleganCancionesDeArtista1 = (listaCanciones) => {
        setCancionesArtista1(listaCanciones);
        setConfigProgressBar({
            progresoTotal: 1,
                    steps:[
                        {
                            titulo:'Elige artista 1',
                            completa:true
                        },{
                            titulo:'Elige artista 2',
                            completa:false
                        },{
                            titulo:'Resultados',
                            completa:false
                        }
                    ]
        });
    }

    const lleganCancionesDeArtista2 = (listaCanciones) => {
        setCancionesArtista2(listaCanciones);
        setConfigProgressBar({
            progresoTotal: 3,
                    steps:[
                        {
                            titulo:'Elige artista 1',
                            completa:true
                        },{
                            titulo:'Elige artista 2',
                            completa:true
                        },{
                            titulo:'Resultados',
                            completa:false
                        }
                    ]
        });
    }

    const lleganAudioFeatures1 = (audio) => {
        setObjetosAudioFeatures1(audio);
        setConfigProgressBar({
            progresoTotal: 2,
                    steps:[
                        {
                            titulo:'Elige artista 1',
                            completa:true
                        },{
                            titulo:'Elige artista 2',
                            completa:false
                        },{
                            titulo:'Resultados',
                            completa:false
                        }
                    ]
        });
    }

    const lleganAudioFeatures2 = (audio) => {
        setObjetosAudioFeatures2(audio);
        setConfigProgressBar({
            progresoTotal: 4,
                    steps:[
                        {
                            titulo:'Elige artista 1',
                            completa:true
                        },{
                            titulo:'Elige artista 2',
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
        <BusquedaArtista
                haySeleccion={seleccionArtista1.id ? true : false}
                titulo="1. Elige el primer artista"
                callbackEleccion={userSelectsArtist1}
                focus={focus1}
                queArtistaEs={1}
            />
    )
    const mensajes1 = (
        <p>{`Obtenidas ${cancionesArtista1.length} canciones`}</p>
    )
    const segun = (
        <BusquedaArtista
        disabled={objetosAudioFeatures1.length>0 ? false : true}
        haySeleccion={seleccionArtista2.id ? true : false}
        titulo="2. Elige el segundo artista"
        callbackEleccion={userSelectsArtist2}
        focus={focus2}
        queArtistaEs={2}
        />
        )
        const mensajes2 = (
            <p>{`Obtenidas ${cancionesArtista2.length} canciones`}</p>
        )
        
        const resultado = (
        <div className="busqueda-container">
                <h2 className="busqueda-titulo">3. Resultados</h2>


                <CustomButton 
                    disabled={deshabilitarBotonFinal}
                    textoBoton={textoBotonFinal}
                    onClickCallback={handleClickFinal}
                />

                <p className={`${msgResultadoClass} busqueda-texto-info`}>{msgResultado}</p>

                {resultadoFinal.length>0 
                    ? 
                        <ul className="busqueda-lista">
                            <div className="">
                                <p className="texto-dif-padding text-center">Coincidencias Exactas</p>
                                    {resultadoFinal.coincidencias.canciones.map((par,index)=>{
                                        return(
                                            <TarjetaCancionDoble
                                                key={resultadoFinal.coincidencias[index]}
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
    )
//====RENDER 
    return(
        <div className="tool-container">
            <h1 className="tool-titulo">{TITULO}</h1>
            <p className="tool-description text-center">{DESCRIPCION}</p>
            <ProgressBar 
                key={Math.random()*1000}
                config={configProgressBar}
            />
            <PreviewChoices 
                json1={seleccionArtista1}
                canciones1={cancionesArtista1.length}
                json2={seleccionArtista2}
                canciones2={cancionesArtista2.length}
            />

            {!seleccionArtista1.id ? primer : ""}
            {seleccionArtista1.id && !objetosAudioFeatures1.length>0 ? <CustomSpinner /> : ""}
            {seleccionArtista1.id && objetosAudioFeatures1.length>0 && !objetosAudioFeatures2.length>0 ? segun : ""}
            {seleccionArtista2.id && !objetosAudioFeatures2.length>0 ? <CustomSpinner /> : ""}
            {objetosAudioFeatures1.length>0 && objetosAudioFeatures2.length>0  ? resultado : ""}
                

                
            
            
        </div>
    )
}