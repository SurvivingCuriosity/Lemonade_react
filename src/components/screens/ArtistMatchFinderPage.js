import React from "react";
import { CustomModal } from "../atoms/CustomModal";
import {ArtistMatchFinder} from '../organisms/tools/ArtistMatchFinder'
import { FixedTopNav } from "../molecules/navs/FixedTopNav";

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