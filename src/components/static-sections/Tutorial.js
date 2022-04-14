import React from 'react'

export function Tutorial(){
    return (
        <section className="container_start" id="tutorial">      
            <h2>Tutorial Lemonade</h2>
            <p>Lemonade es un conjunto de herramientas para DJs y productores.</p>
            <div>
                <h4>Cómo usar 'Match Finder'</h4>
                <p>¿Quieres hacer un remix de Yonaguni con una canción de Travis Scott? Lemonade te pedirá una canción, un artista y obtendrá una lista de canciones compatibles con la canción y el artista elegidos.</p>
            </div>
            <div>
                <h4>Cómo usar 'Song Key Finder'</h4>
                <p>Simplemente introduce una canción y Lemonade obtendrá la nota, escala, bpm y otros datos.</p>
            </div>
            <div>
                <h4>Cómo usar 'Artist Key Finder'</h4>
                <p>A partir de un artista y una escala, Lemonade obtendrá una lista de canciones de ese artista en esa escala.</p>
            </div>
            <div>
                <h4>Cómo usar 'Artist match Finder'</h4>
                <p>¿Quieres hacer un remix de Don Omar y Bad Gyal? Introduce los artistas que quieras y Lemonade obtendrá una lista de canciones compatibles.</p>
            </div>
            <hr />
            <div>
                <p className="color">Los usuarios con cuenta Lemonade, podrán guardar matches, listas de canciones etc. Inicia sesión o registrate <a  href="index.php?ctl=login">aquí.</a></p>
            </div>
        </section>
    )
}