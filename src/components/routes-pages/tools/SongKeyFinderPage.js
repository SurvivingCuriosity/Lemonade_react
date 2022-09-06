import React from "react";
import {SongKeyFinder} from '../../lemonade-tools/SongKeyFinder'
import { FixedTopNav } from "../../navs/FixedTopNav";

export function SongKeyFinderPage(){
    return(
        <div className="toolPage">
            <FixedTopNav />
            <SongKeyFinder />
        </div>
    )
}