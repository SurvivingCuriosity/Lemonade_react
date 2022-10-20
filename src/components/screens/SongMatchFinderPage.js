import React from "react";
import {SongMatchFinder} from '../organisms/tools/SongMatchFinder'
import { FixedTopNav } from "../molecules/navs/FixedTopNav";

export function SongMatchFinderPage(){
    return(
        <div className="toolPage">
            <FixedTopNav />
            <SongMatchFinder />
        </div>
    )
}