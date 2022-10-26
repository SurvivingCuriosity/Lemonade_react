import React from "react";
import {ArtistKeyFinder} from '../../organisms/tools/ArtistKeyFinder'
import { ToolPage } from "../../containers/ToolPage";

export function ArtistKeyFinderPage(){
    return(
        <ToolPage titulo='ArtistKeyFinder' descripcion=''>            
            <ArtistKeyFinder />
        </ToolPage>
    )
}