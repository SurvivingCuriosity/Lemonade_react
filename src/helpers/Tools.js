//ARTIST MATCH FINDER
export const getResultadoFinalArtistMatchFinder = (can1, can2, obj1, obj2) => {
    //para evitar recorrer arrays dentro de arrays, creo un mapa con los audioFeatures con clave=id valor=elobjeto
    let obj1_map = getMapWithIdAsKey(obj1);
    let obj2_map = getMapWithIdAsKey(obj2);

    //anado a las canciones la informacion que necesito de las audioFeatures y las anado a su categoria
    can1 = mergeAudioFeaturesWithSongObject(can1, obj1_map);
    can2 = mergeAudioFeaturesWithSongObject(can2, obj2_map);

    let cancionesEn_C_Am = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_Csus_Asusm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_D_Bm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_Dsus_Cm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_E_Csusm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_F_Dm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_Fsus_Dsusm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_G_Em = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_Gsus_Fm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_A_Fsusm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_Asus_Gm = { cancionesDe1: [], cancionesDe2: [] };
    let cancionesEn_B_Gsusm = { cancionesDe1: [], cancionesDe2: [] };

//anado cada cancion al array correspondiente en funcion de su nota y escala
    can1.map((cancion) => {
        switch (cancion.key + "-" + cancion.mode) {
            case ('0-1'):
            case ('9-0'):
                cancionesEn_C_Am.cancionesDe1.push(cancion);
                break;
            case ('1-1'):
            case ('10-0'):
                cancionesEn_Csus_Asusm.cancionesDe1.push(cancion);
                break;
            case ('2-1'):
            case ('11-0'):
                cancionesEn_D_Bm.cancionesDe1.push(cancion);
                break;
            case ('3-1'):
            case ('0-0'):
                cancionesEn_Dsus_Cm.cancionesDe1.push(cancion);
                break;
            case ('4-1'):
            case ('1-0'):
                cancionesEn_E_Csusm.cancionesDe1.push(cancion);
                break;
            case ('5-1'):
            case ('2-0'):
                cancionesEn_F_Dm.cancionesDe1.push(cancion);
                break;
            case ('6-1'):
            case ('3-0'):
                cancionesEn_Fsus_Dsusm.cancionesDe1.push(cancion);
                break;
            case ('7-1'):
            case ('4-0'):
                cancionesEn_G_Em.cancionesDe1.push(cancion);
                break;
            case ('8-1'):
            case ('5-0'):
                cancionesEn_Gsus_Fm.cancionesDe1.push(cancion);
                break;
            case ('9-1'):
            case ('6-0'):
                cancionesEn_A_Fsusm.cancionesDe1.push(cancion);
                break;
            case ('10-1'):
            case ('7-0'):
                cancionesEn_Asus_Gm.cancionesDe1.push(cancion);
                break;
            case ('11-1'):
            case ('8-0'):
                cancionesEn_B_Gsusm.cancionesDe1.push(cancion);
                break;
            default:
                break;
        }
    })

    can2.map((cancion) => {
        switch (cancion.key + "-" + cancion.mode) {
            case ('0-1'):
            case ('9-0'):
                cancionesEn_C_Am.cancionesDe2.push(cancion);
                break;
            case ('1-1'):
            case ('10-0'):
                cancionesEn_Csus_Asusm.cancionesDe2.push(cancion);
                break;
            case ('2-1'):
            case ('11-0'):
                cancionesEn_D_Bm.cancionesDe2.push(cancion);
                break;
            case ('3-1'):
            case ('0-0'):
                cancionesEn_Dsus_Cm.cancionesDe2.push(cancion);
                break;
            case ('4-1'):
            case ('1-0'):
                cancionesEn_E_Csusm.cancionesDe2.push(cancion);
                break;
            case ('5-1'):
            case ('2-0'):
                cancionesEn_F_Dm.cancionesDe2.push(cancion);
                break;
            case ('6-1'):
            case ('3-0'):
                cancionesEn_Fsus_Dsusm.cancionesDe2.push(cancion);
                break;
            case ('7-1'):
            case ('4-0'):
                cancionesEn_G_Em.cancionesDe2.push(cancion);
                break;
            case ('8-1'):
            case ('5-0'):
                cancionesEn_Gsus_Fm.cancionesDe2.push(cancion);
                break;
            case ('9-1'):
            case ('6-0'):
                cancionesEn_A_Fsusm.cancionesDe2.push(cancion);
                break;
            case ('10-1'):
            case ('7-0'):
                cancionesEn_Asus_Gm.cancionesDe2.push(cancion);
                break;
            case ('11-1'):
            case ('8-0'):
                cancionesEn_B_Gsusm.cancionesDe2.push(cancion);
                break;
            default:
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

    //elimino los conjuntos sin minimo una pareja de canciones
    arrayResultadosFinales.map((conjunto, index) => {
        if ((conjunto.canciones.cancionesDe1 && conjunto.canciones.cancionesDe1.length < 1) 
        || (conjunto.canciones.cancionesDe2 && conjunto.canciones.cancionesDe2.length < 1)) {
            arrayResultadosFinales.splice(index, 1);
        }
    })

    let coincidenciasExactas = [];
    arrayResultadosFinales.map((conjunto) => {
        conjunto.canciones.cancionesDe1.map((cancion1) => {
            let bpm1 = cancion1.bpm
            conjunto.canciones.cancionesDe2.map((cancion2) => {
                let bpm2 = cancion2.bpm
                if (bpm2 === bpm1) {
                    coincidenciasExactas.push({ cancion1, cancion2 })
                }
            })
        })
    })

    arrayResultadosFinales.coincidencias = coincidenciasExactas;
    return arrayResultadosFinales;
}

//SONG MATCH FINDER




export const getMapWithIdAsKey = (array) => {
    let map = new Map();
    array.map((element) => {
        map.set(`${element.id}`, element);
    })
    return map;
}

export const mergeAudioFeaturesWithSongObject = (listaCanciones, listaAudioFeatures) => {
    let mergedArray = [];
    listaCanciones.map((cancion) => {
        if (listaAudioFeatures.get(cancion.id)) {
            let nota = listaAudioFeatures.get(cancion.id).key;
            let escala = listaAudioFeatures.get(cancion.id).mode;
            let bpm = listaAudioFeatures.get(cancion.id).tempo;

            cancion.key = nota
            cancion.bpm = Math.round(bpm)
            cancion.mode = escala
            mergedArray.push(cancion);
        }
    })
    return mergedArray;
}
