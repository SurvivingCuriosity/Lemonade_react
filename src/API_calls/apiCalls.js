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
export const buscarCancion = async (text, token) => {
    let limite=5;
    const response = axios(`https://api.spotify.com/v1/search?type=track&limit=${limite}&q=${text}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    })
    return response;
};

//funcion que devuelve resultados de buscar artista
export const buscarArtista = async (text, token) => {
    let limite=5;
    const response = axios(`https://api.spotify.com/v1/search?type=artist&limit=${limite}&q=${text}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    })

    return response;
};

//funcion que dado el id de una cancion, obtiene sus caracteristicas
export const getAudioFeatures = async (id, token) => {

    const response = axios(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    })
    return response;
};

//devuelve todos los albumes de un artista
export const getArtistAlbums = async (id, _token) => {
    let cancionesSinRepetir=[];
    const response = axios(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+_token
        },
        method: 'GET'
    }).then((res)=>{
        let resultadoGetArtistAlbums = res.data.items;
        //formateo el nombre de todos para poder comparalos despues y quedarme con los valores unicos
        resultadoGetArtistAlbums.map((album)=>{album.name=formatearNombre(album.name)})

        //este codigo elimina los valores con nombre repetido
        resultadoGetArtistAlbums = Array.from(new Set(resultadoGetArtistAlbums.map(a => a.name.toLowerCase())))
        .map(name => {
            return resultadoGetArtistAlbums.find(a => a.name.toLowerCase() === name.toLowerCase())
        })

        resultadoGetArtistAlbums.map((album)=>{
            switch(album.album_type){
                case "album":
                    getAlbumTracks(album.id, _token).then((res2)=>{
                        let tracksDelAlbum = res2.data.items;
                        tracksDelAlbum.map((trackDeAlbum)=>{
                            let idTrack = trackDeAlbum.id;
                            getTrack(idTrack ,_token).then((res3)=>{
                                let track=res3.data;
                                cancionesSinRepetir.push(track);
                            })
                        })
                    });
                    
                    break;
                case "single":
                    console.log('single');
                    getAlbum(album.id, _token).then((res2)=>{
                        let idTrack = res2.data.tracks.items[0].id;
                        getTrack(idTrack,_token).then((res3)=>{
                            let track=res3.data;
                            cancionesSinRepetir.push(track);
                        })

                    });
                    break;
            }
        })
        return cancionesSinRepetir;
    })
    return response;
}
    

export const getAlbum = async (id, token) => {

    const response = axios(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    })
    return response;
};
export const getTrack = async (id, token) => {

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
export const getAlbumTracks = async (id, token) => {

    const response = axios(` 	https://api.spotify.com/v1/albums/${id}/tracks`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    })
    return response;
};
export const getCancionesDeArtistaEnEscala = async (tracks) => {
    return getToken().then((res)=>{
        let token=res.data.access_token;
        tracks.map((track)=>{
            console.log('mapeando');
                getAudioFeatures(track.id, token).then((res)=>{
                    let features = res.data;
                    track.tempo=features.tempo;
                    track.key=features.key;
                    track.mode=features.mode;
                })
        })
        return tracks;
    })
};


//Hola(Live from las vegas) -> Hola [elimina los parentesis]
function formatearNombre(cadena){
    if(cadena.indexOf('(') == -1){
        return cadena;
    }
    else
        return cadena.substr(0, cadena.indexOf('('));
}