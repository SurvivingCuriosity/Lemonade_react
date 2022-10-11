import React from "react";
import { CustomModal } from "../custom-components/CustomModal";
import {ArtistMatchFinder} from '../lemonade-tools/ArtistMatchFinder'
import { FixedTopNav } from "../navs/FixedTopNav";

export function ArtistMatchFinderPage(){
    return(
        <div className="toolPage">
            {/* <CustomModal 
                titulo='Error al conectar'
                tipoMensaje='error'
                descripcion='hola'
                showing
            /> */}
            <FixedTopNav />
            <ArtistMatchFinder/>
        </div>
    )
}