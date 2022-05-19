//0->'C', 1->'C#'
export function getStringFromNota(notaInt) {
    switch (notaInt) {
        case 0:
            return "C";
        case 1:
            return "C#";
        case 2:
            return "D";
        case 3:
            return "D#";
        case 4:
            return "E";
        case 5:
            return "F";
        case 6:
            return "F#";
        case 7:
            return "G";
        case 8:
            return "G#";
        case 9:
            return "A";
        case 10:
            return "A#";
        case 11:
            return "B";
    }
}

//0-> 'menor'
export function getStringFromEscala(escalaInt) {
    switch (escalaInt) {
        case 0:
            return "m"
        case 1:
            return ""
        default:
            break;
    }
}

//Esto es un nombre largo -> Esto es...
export function truncaNombreLargo(cadena, reducirInformacion, caracteresPermitidos=30){
    if (cadena.length > caracteresPermitidos) {
        cadena = cadena.substring(0, caracteresPermitidos) + "...";
    }
    if(reducirInformacion) cadena = cadena.substring(0, 15) + "...";
    return cadena;
}

export function formatearNombre(cadena){
    if(cadena.indexOf('(') == -1){
        return cadena;
    }
    else
        return cadena.substr(0, cadena.indexOf('('));
}

//1231159->'3:40'
export function milisegundosAString(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

//[Hola, Adios, Buenas] -> 'Hola • Adios • Buenas'
export function getCadenaArtistas(listaArtistas, mostrarSoloUno=false){
    let cadenaArtistas = "";
    listaArtistas.map((artista,index)=>{
        cadenaArtistas+=artista.name;
        if(index+1!=listaArtistas.length){
            cadenaArtistas+=" • "
        }
    })
    if(mostrarSoloUno) cadenaArtistas=listaArtistas[0].name;
    return truncaNombreLargo(cadenaArtistas);
}

export function numberWithCommas(x) {
    let parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
}