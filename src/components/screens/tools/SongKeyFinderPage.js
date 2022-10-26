import React from "react";
import { SongKeyFinder } from '../../organisms/tools/SongKeyFinder'
import { ToolPage } from "../../containers/ToolPage";
export function SongKeyFinderPage() {
    return (
        <ToolPage titulo='SongKeyFinder' descripcion=''>
            <SongKeyFinder getRandomOnInit />
        </ToolPage>
    )
}