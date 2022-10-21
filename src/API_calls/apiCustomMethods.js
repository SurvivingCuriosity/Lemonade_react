//EN ESTE FICHERO SE ENCUENTRAN FUNCIONES QUE REALIZAN VARIAS PETICIONES A LA API Y DEVUELVEN UN RESULTADO

import { eliminaElementosConIDRepetido } from "../helpers/FilteringArrays";
import { eliminaElementosRedundantes } from "../helpers/FilteringArrays";
import { eliminaElementosConNameRepetido } from "../helpers/FilteringArrays";
import { generaListaCadenasIDs } from "../helpers/StringURLMethods";
import { get50ArtistAlbums, getMultipleAudioFeatures } from "./apiCalls";
import { getAlbumTracks } from "./apiCalls";
import { getSeveralTracks } from "./apiCalls";
import { getAudioFeatures } from "./apiCalls";
import { siguientePagina } from './apiCalls'

//devuelve todas las canciones de un artista
export const getAllUniqueArtistSongs = async (id, callback) => {
    if (id === undefined || id === null) return;
    let next = null;
    let todosLosAlbums = [];
    let todasLasCanciones = [];
    let todosLosTracks = [];
    let respuesta = [];
    
    //PRIMERO PEDIMOS LOS ALBUMS
    let obtener50AlbumesDeArtista = new Promise((resolve, reject) => {
        get50ArtistAlbums(id, resolve, reject);
    });

    respuesta = await obtener50AlbumesDeArtista; // espera hasta que la promesa se resuelva
    todosLosAlbums.push(...respuesta.data.items);
    next = respuesta.data.next;

    //si hay mas resultados obtengo todos
    while (next != null) {
        let obtenerSiguientePaginaAlbumesDeArtista = new Promise((resolve, reject) => {
            siguientePagina(next, resolve, reject);
        });
        respuesta = await obtenerSiguientePaginaAlbumesDeArtista;
        next = respuesta.data.next;
        todosLosAlbums.push(...respuesta.data.items);
    }

    todosLosAlbums = eliminaElementosConIDRepetido(todosLosAlbums);
    todosLosAlbums = eliminaElementosConNameRepetido(todosLosAlbums);
    todosLosAlbums = eliminaElementosRedundantes(todosLosAlbums);

    let obtenerCancionesDeAlbumes;
//LUEGO PEDIMOS LAS CANCIONES
    for (let i = 0; i < todosLosAlbums.length; i++) {
        const album = todosLosAlbums[i];
        obtenerCancionesDeAlbumes = new Promise((resolve, reject) => {
            getAlbumTracks(album.id, resolve, reject);
        });
        respuesta = await obtenerCancionesDeAlbumes;
        todasLasCanciones.push(...respuesta.data.items);
    }
    todasLasCanciones = eliminaElementosConIDRepetido(todasLasCanciones);
    todasLasCanciones = eliminaElementosConNameRepetido(todasLasCanciones);
    todasLasCanciones = eliminaElementosRedundantes(todasLasCanciones);

    let listaCadenasIDs = generaListaCadenasIDs(todasLasCanciones);

    for (let i = 0; i < listaCadenasIDs.length; i++) {
        const grupo = listaCadenasIDs[i];
        let obtener50Tracks = new Promise((resolve, reject) => {
            getSeveralTracks(grupo, resolve, reject);
        });

        let respuesta = await obtener50Tracks;
        todosLosTracks.push(...respuesta.data.tracks);
    }
    todosLosTracks = todosLosTracks.filter(el => el !== null) //elimina valores nulos
    callback(todosLosTracks);
}

export const getAllAudioFeatures = async (listaCanciones, callback) => {
    //cuando llega solo una, en vez de una lista
    let todosLosAudioFeatures = [];
    if (listaCanciones.id) {
        const getSingleAudioFeatures = new Promise((resolve, reject) => {
            getAudioFeatures(listaCanciones.id, resolve, reject);
        });
        let respuesta = await getSingleAudioFeatures;
        todosLosAudioFeatures.push(respuesta.data);
    } else {
        let listaCadenasIDs = generaListaCadenasIDs(listaCanciones);

        for (let i = 0; i < listaCadenasIDs.length; i++) {
            const grupo = listaCadenasIDs[i];
            const obtener50AudioFeatures = new Promise((resolve, reject) => {
                getMultipleAudioFeatures(grupo, resolve, reject);
            });

            let respuesta = await obtener50AudioFeatures;
            todosLosAudioFeatures.push(...respuesta.data.audio_features);
        }
    }
    //elimino valores nulos y lo envio al callback
    todosLosAudioFeatures = todosLosAudioFeatures.filter(el => el !== null) //elimina valores nulos
    callback(todosLosAudioFeatures);
}

