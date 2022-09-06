export function esEnlaceDeSpotify(text){
    return text.includes('https://');
}

export function getIDFromURL(text){
    //text = https://api.spotify/v1/11111111111111111?si=blablabla
    //queremos extraer 11111111111111111 de la url que llega
    const partesDeLaURL = text.split('/');
    const cadena = partesDeLaURL.at(-1); //cadena = 1111111111111111?si=blablabla
    return cadena.substr(0, cadena.indexOf('?')); //cadena = 1111111111111111
}

export function generaListaCadenasIDs(listaCanciones=[]){
    // if(listaCanciones.id){
    //     return listaCanciones.id;
    // }
    //debe devolver un array de cadenas de IDs(cada cadena son 50 IDs separados por comas)
    let arrayFinal=[];
    let cuantosGruposDe50 = Math.ceil(listaCanciones.length/50);
    let cadenaIDS="";

    for (let i = 0; i < cuantosGruposDe50; i++) {
        let primerIndice = i*50;
        let contador = 0;
        cadenaIDS="";
        for (let j = primerIndice; j < primerIndice+50; j++) {
            cadenaIDS+=listaCanciones[j].id;
            contador++;
            if(contador!=50 && listaCanciones[j+1]){
                cadenaIDS+=","
            }
            if(!listaCanciones[j+1]) break;
        }
        arrayFinal[i]=(cadenaIDS);
    }
    return arrayFinal;
}