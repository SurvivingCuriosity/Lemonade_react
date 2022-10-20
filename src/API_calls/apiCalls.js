//EN ESTE FICHERO ESTÁN ÚNICAMENTE LAS PETICIONES A LA API DE SPOTIFY
//TODAS RECIBEN UN CALLBACK QUE SE EJECUTARÁ CUANDO LLEGUEN RESULTADOS

import axios from "axios";
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import {esEnlaceDeSpotify, getIDFromURL} from '../helpers/StringURLMethods.js'
import { ClientId, ClientSecret } from "../api-credentials.js";

if(!ClientId || !ClientSecret){
    //VARIABLES DE ENTORNO AGREGADAS EN VERCEL
    ClientId = process.env.REACT_APP_CLIENT_ID
    SecretId = process.env.REACT_APP_SECRET_ID
}

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
    if(esEnlaceDeSpotify(text)){
        let id = getIDFromURL(text);
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
                callback(err);
            })
        })
    }else{
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
                callback(err);
            })
        })
    }
};

//funcion que devuelve resultados de buscar artista
export const buscarArtista = async (text, callback, offset=0) => {
    let limite=5;
    if(esEnlaceDeSpotify(text)){
        let id = getIDFromURL(text);
        console.log(id);
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
                callback(err);
            })
        })
    }else{
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
    }
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
            console.log(err);
        })
    })
}

//funcion que dado el id de una cancion, obtiene sus caracteristicas
export const getAudioFeatures = async (id, resolve, reject) => {
    getToken().then((res)=>{
        axios(`https://api.spotify.com/v1/audio-features/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        }).then(resolve).catch(reject);
    })

};

//funcion que dado el id de una cancion, obtiene sus caracteristicas
export const getMultipleAudioFeatures = async (ids, resolve, reject) => {
    getToken().then((res)=>{
        axios(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        }).then(resolve).catch(reject);
    })

};

export const get50ArtistAlbums = async (id, resolve, reject) => {
    //devuelve 
    getToken().then((resToken)=>{
        axios(`https://api.spotify.com/v1/artists/${id}/albums?limit=50&include_groups=album,single,compilation&locale=es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+resToken.data.access_token
            },
            method: 'GET'
        }).then(resolve).catch(reject)
    })
}

export const siguientePagina = async (url, resolve, reject) => {
    console.log('En siguiente pagina: '+url);
    getToken().then((resToken)=>{
        axios(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+resToken.data.access_token
            },
            method: 'GET'
        }).then(resolve).catch(reject);
    })
}

export const getAlbumTracks = async (id, resolve, reject) => {
    getToken().then((res)=>{
        axios(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        }).then(resolve).catch(reject);
    })
};

export const getSeveralTracks = async (cadenaIDs, resolve, reject) => {
    getToken().then((res)=>{
        axios(`https://api.spotify.com/v1/tracks?ids=${cadenaIDs}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+res.data.access_token
            },
            method: 'GET'
        }).then(resolve).catch(reject);
    })
};

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

export const getObjetosAudioFeatures = async (tracks) => {
    let numeroDeTracks = tracks.length;
    let cadenaIDs;
    if(numeroDeTracks<100){
        cadenaIDs="";
        tracks.map((track,index)=>{
            cadenaIDs+=track.id;
            if(index!==tracks.length-1){
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
                if(j!==99){
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

