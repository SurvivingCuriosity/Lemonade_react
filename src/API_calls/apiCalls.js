import { LOGICAL_OPERATORS } from "@babel/types";
import axios from "axios";
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'


const ClientId= 'ad9e75087eea487ab445f1ad9b610cab';
const ClientSecret= 'f54517f6c44548a2873e07b23b100a35';
let cadenaCredentials = Utf8.parse(ClientId + ':' + ClientSecret)
let cadenaB64 = Base64.stringify(cadenaCredentials);
//funcion para obtener el token necesario en todas las demas llamadas
export const getToken = async () => {
    const response = axios('https://accounts.spotify.com/api/token',{
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + cadenaB64
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
    })
    return response;
};

//funcion que devuelve resultados de buscar cancion
export const buscarCancion = async (text, callback, offset=0) => {
    let limite=5;
    getToken().then((e)=>{
        axios(`https://api.spotify.com/v1/search?type=track&limit=${limite}&q=${text}&offset=${offset}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+e.data.access_token
            },
            method: 'GET'
        }).then((res)=>{
            callback(res.data);
        }).catch((err)=>{
            callback("error" +err);
        })
    })
};
//funcion que devuelve resultados de buscar cancion
export const buscarCancionID = async (id, callback) => {
    getToken().then((res)=>{
        axios(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        }).then((res)=>{
            callback(res.data);
        }).catch((err)=>{
            callback("error");
        })
    })

};
//funcion que devuelve resultados de buscar cancion
export const buscarArtistaID = async (id, callback) => {
    getToken().then((res)=>{
        axios(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        }).then((res)=>{
            callback(res.data);
        }).catch((err)=>{
            callback("error");
        })
    })

};

//funcion que devuelve resultados de buscar artista
export const buscarArtista = async (text, callback, offset=0) => {
    let limite=5;
    getToken().then((e)=>{
        axios(`https://api.spotify.com/v1/search?type=artist&limit=${limite}&q=${text}&offset=${offset}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+e.data.access_token
            },
            method: 'GET'
        }).then((res)=>{
            callback(res.data);
        }).catch((err)=>{
            callback("error" +err);
        })
    })
};

export const getPaginaSiguienteOAnterior = async (url, callback)=>{
    getToken().then((e)=>{
        axios(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+e.data.access_token
            },
            method: 'GET'
        }).then((res)=>{
            callback(res.data);
        }).catch((err)=>{
            console.log(err.data);
        })
    })
}

//funcion que dado el id de una cancion, obtiene sus caracteristicas
export const getAudioFeatures = async (id) => {
    return getToken().then((res)=>{
        const response = axios(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        })
        return response;
    })

};

//funcion que dado el id de una cancion, obtiene sus caracteristicas
export const getMultipleAudioFeatures = async (ids) => {
    return getToken().then((res)=>{
        const response = axios(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        })
        return response;
    })

};

//devuelve todos los albumes de un artista
export const getAllUniqueArtistSongs = async (id, finalCallback) => {
    console.log('getAllUniqueArtistSongs');
    getToken().then((resToken)=>{
        let token = resToken.data.access_token;
        axios(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            method: 'GET'
        }).then((res)=>{
            let albumesYSingles = res.data.items;
            //formateo el nombre de todos para poder comparalos despues y quedarme con los valores unicos
            albumesYSingles.map((album)=>{album.name=formatearNombre(album.name)})
    
            //este codigo elimina los valores con nombre repetido
            albumesYSingles = Array.from(new Set(albumesYSingles.map(a => a.name.toLowerCase())))
            .map(name => {
                return albumesYSingles.find(a => a.name.toLowerCase() === name.toLowerCase())
            })
            //este codigo elimina los valores con id repetido
            albumesYSingles = Array.from(new Set(albumesYSingles.map(a => a.id)))
            .map(id => {
                return albumesYSingles.find(a => a.id === id)
            })
            getTracksFromAlbums(albumesYSingles, finalCallback);
        })
    })

}

function getTracksFromAlbums(albumesYSingles, finalCallback){
    const func = albumesYSingles.map((album)=>{
        return getAlbumTracks(album.id);
    })
    llamadasGetAlbums(func,finalCallback);
}

function llamadasGetAlbums(func,finalCallback){
    getToken().then((e)=>{
        let token=e.data.access_token;
        let cancionesTotales = [];
        func.map((promesa, index)=>{
            promesa.then((e)=>{
                let itemsDelAlbum = e.data.items;
                cancionesTotales=[...cancionesTotales, ...itemsDelAlbum];

                if(index==func.length-1){
                    llamadasGetTracks(cancionesTotales,finalCallback,token);
                }
            })
        })
    })

}

function llamadasGetTracks(canciones,finalCallback,token){
    const func = canciones.map((album)=>{
        return getTrack(album.id,token);
    })

    getAllTracks(func,finalCallback);
}

function getAllTracks(func, finalCallback){
    let cancionesTotales = [];
    func.map((promesa)=>{
        promesa.then((e)=>{
            cancionesTotales.push(e.data);
        })
    })
    cancionesTotales = Array.from(new Set(cancionesTotales.map(a => a.name)))
    .map(name => {
        return cancionesTotales.find(a => a.name === name)
    })
    finalCallback(cancionesTotales);
}

export const getTrack = async (id,token) => {
        const response = axios(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            method: 'GET'
        })
        return response;
};

export const getAlbumTracks = async (id) => {
    return getToken().then((res)=>{
        const response = axios(` 	https://api.spotify.com/v1/albums/${id}/tracks`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        })
        return response;
    })

};

export const getObjetosAudioFeatures = async (tracks) => {
    let numeroDeTracks = tracks.length;
    let cadenaIDs;
    if(numeroDeTracks<100){
        console.log('menos de 100');
        cadenaIDs="";
        tracks.map((track,index)=>{
            cadenaIDs+=track.id;
            if(index!=tracks.length-1){
                cadenaIDs+=","
            }
        })
        return getMultipleAudioFeatures(cadenaIDs);
    }else{
        let beginIndex=0;
        let numeroDeRepeticiones = Math.ceil(numeroDeTracks/100);
        let arrayCadenasFinal=[];
        for (let i = 0; i < numeroDeRepeticiones; i++) {
            cadenaIDs="";
            for (let j = beginIndex; j < 100; j++) {
                cadenaIDs+=tracks[j].id;
                if(j!=99){
                    cadenaIDs+=","
                }
                if(!tracks[j+1]) return; //si no existe el siguiente elemento se sale
            }
            beginIndex++;
            arrayCadenasFinal.push(cadenaIDs)
        }
        
        const func = arrayCadenasFinal.map((ids)=>{
            return getMultipleAudioFeatures(ids);
        })
        return func;
    }    
};


//Hola(Live from las vegas) -> Hola [elimina los parentesis]
function formatearNombre(cadena){
    if(cadena.indexOf('(') == -1){
        return cadena;
    }
    else
        return cadena.substr(0, cadena.indexOf('('));
}