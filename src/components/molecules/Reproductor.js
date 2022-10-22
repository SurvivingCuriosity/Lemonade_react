import React from "react";
import play from '../../assets/images/reproductor/play.svg'
import pause from '../../assets/images/reproductor/pause.svg'
import volume from '../../assets/images/reproductor/volume.svg'
import adelante from '../../assets/images/reproductor/adelante.svg'
import atras from '../../assets/images/reproductor/atras.svg'
import volumeoff from '../../assets/images/reproductor/volumeoff.svg'

export function Reproductor(props){

    const {jsonData} = props;
    let rutaimgAqui = jsonData.album.images[0].url;

    const [isPlaying, setIsPlaying]  = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [audio, setAudio] = React.useState(new Audio (jsonData.preview_url));
    const [segundoActual, setSegundoActual] = React.useState(0);

    
    let tamanoImagen = 30;
    let tamanoIconoMute = 25;
    let tamanoImagenCancion = 40;


    React.useEffect(()=>{
        setIsPlaying(true);
        audio.play();
        audio.addEventListener('timeupdate', handle_reproduciendo);
        audio.addEventListener('ended', handle_audioTermina);

        return () => {
            audio.removeEventListener("timeupdate", handle_reproduciendo);
            audio.removeEventListener("ended", handle_audioTermina);
            audio.pause();
        }
    },[])
    
    // React.useEffect(()=>{
    //     console.log('segundo actual usEffect: '+segundoActual);
        
    // },[segundoActual])
    
    let handle_reproduciendo = () => {
        setSegundoActual(()=>{return Math.round(audio.currentTime)})
    }

    let handle_audioTermina = () => {
        setSegundoActual(0)
        setIsPlaying(false);
    }

    let handle_playPause = () => {
        !isPlaying ? audio.play() : audio.pause();
        setIsPlaying(!isPlaying);
    }
    let handle_muteUnmute = () => {
        audio.muted=!audio.muted;
        setIsMuted(!isMuted);
    }

    let handle_avanzarAudio = () => {
        audio.currentTime+=2;
        
    }
    let handle_retrasarAudio = () => {
        audio.currentTime-=2;
    }

    
    return(
        <div className="reproductor" style={{backgroundImage: `url(${rutaimgAqui})`}}>
            <div className="reproductor-textoEncima">
                <p>{`${jsonData.artists[0].name} - ${jsonData.name}`}</p>
            </div>
            <div className="reproductor-textoAbajo">
                <p>00:{segundoActual<10 ? `0${segundoActual}` : segundoActual}/00:30</p>
            </div>
            <img className="imagenPpal" src={rutaimgAqui} style={{width: tamanoImagenCancion + 'px'}}/>
            <div className="reproductor-boton">
                <img className="zoom-on-click" onClick={handle_playPause} src={isPlaying ? pause : play} style={{width: tamanoImagen + 'px'}}/>
            </div>

            <div className="reproductor-iconoYBarra-container">
                <img className="zoom-on-click" onClick={handle_retrasarAudio} src={atras} style={{width: tamanoImagen + 'px'}}/>
                <div className="reproductor-barraTiempo">
                    <div className="range-container">
                        <div className="range-wrapper"></div>
                        <div className="range-track" style={{width: segundoActual*3.33333+"%"}}></div>
                    </div>
                </div>
                <img className="zoom-on-click" onClick={handle_avanzarAudio} src={adelante} style={{width: tamanoImagen + 'px'}}/>
            </div>
            

            <div className="reproductor-boton">
                <img className="zoom-on-click" onClick={handle_muteUnmute} src={isMuted ? volumeoff : volume} style={{width: tamanoIconoMute + 'px'}}/>
            </div>
        </div>
    )

}