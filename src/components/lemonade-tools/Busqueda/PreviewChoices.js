import React from "react";
import { TarjetaEleccionCancion } from "./TarjetaEleccionCancion";
import { TarjetaEleccionArtista } from "./TarjetaEleccionArtista";
import { TarjetaEleccionNotaEscala } from "./TarjetaEleccionNotaEscala";

export function PreviewChoices(props){
    const {json1, json2, canciones1, canciones2, notaEscala} = props;
    const tarjeta1 = (
        json1!=undefined && json1.type=='artist' ? <TarjetaEleccionArtista json={json1} canciones={canciones1}/> : <TarjetaEleccionCancion json={json1}/>
    )
    const tarjeta2 = (
        json2!=undefined && json2.type=='artist' ? <TarjetaEleccionArtista json={json2} canciones={canciones2}/> : <TarjetaEleccionCancion json={json2}/>
    )
    return(
        <div className="preview-choices-div">
            {json1!=undefined && json1.id ? tarjeta1 : ""}
            {json2!=undefined && json2.id ? tarjeta2 : ""}
            {notaEscala!=undefined && notaEscala.nota>-1 ? <TarjetaEleccionNotaEscala data={notaEscala}/> : ""}
        </div>
    )

}