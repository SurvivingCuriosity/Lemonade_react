import React from "react";
import { CustomModal } from "../atoms/CustomModal";
import {ArtistMatchFinder} from '../organisms/tools/ArtistMatchFinder'
import { ToolPage } from "../containers/ToolPage";
export function ArtistMatchFinderPage(){
    return(
        <ToolPage titulo='ArtistMatchFinder' descripcion=''>            
            <ArtistMatchFinder />
        </ToolPage>
    )
}