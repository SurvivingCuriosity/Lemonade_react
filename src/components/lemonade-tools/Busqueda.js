import React from "react";
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import axios from "axios";
import Tarjeta from "./Busqueda/Tarjeta";
export function Busqueda(props){

    const [text, setText] = React.useState("");
    const [resultado, setResultado] = React.useState([]);

    const [token, setToken] = React.useState("");
    const ClientId= 'ad9e75087eea487ab445f1ad9b610cab';
    const ClientSecret= 'f54517f6c44548a2873e07b23b100a35';
    let cadenaCredentials = Utf8.parse(ClientId + ':' + ClientSecret)
    let cadenaB64 = Base64.stringify(cadenaCredentials);

    let handleSubmit = async (e) => {
        e.preventDefault();
        let resultado;
        try {
            let limite = 5;
            axios('https://accounts.spotify.com/api/token',{
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + cadenaB64
                },
                data: 'grant_type=client_credentials',
                method: 'POST'
            }).then((token)=>{
                setToken(token.data.access_token);
                switch(props.tipo){
                    case "cancion":
                        axios(`https://api.spotify.com/v1/search?type=track&limit=${limite}&q=${text}`, {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+token.data.access_token
                            },
                            method: 'GET'
                        }).then((res)=>{
                            res.data.tracks.items.map((item, index) => {
                                axios(`https://api.spotify.com/v1/audio-analysis/${item.id}`, {
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+token.data.access_token
                                    },
                                    method: 'GET'
                                }).then((res2)=>{
                                    item.bpm=res2.data.track.tempo
                                    item.key=res2.data.track.key
                                    item.mode=res2.data.track.mode
                                    console.log(item);
                                    
                                })
                                setResultado(res.data.tracks.items);
                            })
                        })
                        break;
                    case "artista":
                        axios(`https://api.spotify.com/v1/search?type=artist&limit=${limite}&q=${text}`, {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+token.data.access_token
                            },
                            method: 'GET'
                        }).then((res)=>{
                            
                            setResultado(res.data.artists.items);
                        })
                        break;
                }
                        
            })
        } catch (err) {
          console.log(err);
        }
      };
    return(
        <div className="busqueda-container">

            <form onSubmit={handleSubmit} className="linea-flex-start">
                <input
                type="search"
                value={text}
                placeholder={`Introduce ${props.tipo} ...`}
                onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="busqueda-boton-buscar boton">Buscar</button>
            </form>




            <ul className="busqueda-lista">
                {
                    resultado.map((item, index) => {
                        switch(props.tipo){
                            case "cancion":
                                return (
                                    <Tarjeta 
                                        key={item.id}
                                        songKey={item.key}
                                        songMode={item.mode}
                                        songBPM={item.bpm}
                                        imgCancion={item.album.images[0].url}
                                        nombreCancion={item.name}
                                        duracionCancion={item.duration_ms}
                                        link={item.external_urls.spotify}
                                    />
                                );
                                break;
                            case "artista":
                                return (
                                    <Tarjeta 
                                        key={item.id}
                                        imgArtista={item.images[0].url}
                                        nombreArtista={item.name}
                                        seguidoresArtista={item.followers.total}
                                        link={item.external_urls.spotify}
                                    />
                                );
                                break;
                        }

                    })
                }
            </ul>
        </div>
    )
}