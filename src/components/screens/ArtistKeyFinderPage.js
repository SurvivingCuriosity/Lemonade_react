import React from "react";
import {ArtistKeyFinder} from '../organisms/tools/ArtistKeyFinder'
import { FixedTopNav } from "../molecules/navs/FixedTopNav";

export function ArtistKeyFinderPage(){
    return(
        <div className="toolPage">
            <FixedTopNav />
            <ArtistKeyFinder />
        </div>
    )
}