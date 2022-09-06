import React from "react";
import {SongMatchFinder} from '../../lemonade-tools/SongMatchFinder'
import { FixedTopNav } from "../../navs/FixedTopNav";

export function SongMatchFinderPage(){
    return(
        <div className="toolPage">
            <FixedTopNav />
            <SongMatchFinder />
        </div>
    )
}