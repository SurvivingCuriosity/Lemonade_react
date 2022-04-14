import React from 'react'
import {Link} from 'react-router-dom'
export function Comenzar(){
    return (
        <section id="empezar" className="container_start">
            <h2>¿Por dónde empezar?</h2>
                <p>Estas son las herramientas de Lemonade</p>
                <div>
                    <h3>Artist Match Finder</h3>
                    <p>Obtendrás una lista de canciones compatibles a partir de dos artistas que introduzcas.</p>
                    <Link to="/artistMatchFinder" className="enlace">Comenzar Artist Match Finder...</Link>
                </div>
                <div>
                    <h3>Song Match Finder</h3>
                    <p>Introduce una canción y un artista y obtendrás una lista de canciones de ese artista compatibles con la canción elegida.</p>
                    <Link to="/songMatchFinder" className="enlace">Comenzar Song Match Finder...</Link>
                </div>
                <div>
                    <h3>Song Key Finder</h3>
                    <p>Obtendrás una lista de canciones del artista que elijas en la escala que elijas.</p>
                    <Link to="/songKeyFinder" className="enlace">Comenzar Song Key Finder...</Link>
                </div>
                <div>
                    <h3>Artist Key Finder</h3>
                    <p>Introduce una canción para obtener la escala y BPM</p>
                    <Link to="/artistKeyFinder" className="enlace">Comenzar Artist Key Finder...</Link>
                </div>
                    
        </section>
    )
}