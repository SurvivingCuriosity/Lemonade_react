import React from "react";
import {ArtistMatchFinder} from '../../lemonade-tools/ArtistMatchFinder'
import { FixedTopNav } from "../../navs/FixedTopNav";

export function ArtistMatchFinderPage(){
    return(
        <div className="toolPage">
            <FixedTopNav />
            <ArtistMatchFinder />
        </div>
    )
}