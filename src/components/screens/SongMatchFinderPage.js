import React from "react";
import {SongMatchFinder} from '../organisms/tools/SongMatchFinder'
import { ToolPage } from "../containers/ToolPage";
export function SongMatchFinderPage(){
    return(
        <ToolPage titulo='SongMatchFinder' descripcion=''>
            <SongMatchFinder />
        </ToolPage>
    )
}