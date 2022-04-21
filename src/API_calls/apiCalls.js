import axios from "axios";
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'


const ClientId= 'ad9e75087eea487ab445f1ad9b610cab';
const ClientSecret= 'f54517f6c44548a2873e07b23b100a35';
let cadenaCredentials = Utf8.parse(ClientId + ':' + ClientSecret)
let cadenaB64 = Base64.stringify(cadenaCredentials);

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

export const getArtistTopTracks = async (token) => {

    const response = axios(`https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X/albums/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    })
    console.log(response);
    return response;
};
