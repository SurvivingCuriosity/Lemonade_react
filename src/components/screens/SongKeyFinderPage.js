import React from "react";
import {SongKeyFinder} from '../organisms/tools/SongKeyFinder'
import { FixedTopNav } from "../molecules/navs/FixedTopNav";

export function SongKeyFinderPage(){
    return(
        <div className="toolPage">
            <FixedTopNav />
            <SongKeyFinder />
        </div>
    )
}