import React from "react";
import {ArtistKeyFinder} from '../../lemonade-tools/ArtistKeyFinder'
import { FixedTopNav } from "../../navs/FixedTopNav";

export function ArtistKeyFinderPage(){
    return(
        <div className="toolPage">
            <FixedTopNav />
            <ArtistKeyFinder />
        </div>
    )
}