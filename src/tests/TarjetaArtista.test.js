import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import TarjetaArtista from '../components/organisms/busqueda/TarjetaArtista';
import { numberWithCommas, truncaNombreLargo } from "../helpers/FormatingData";
import {globals_en} from '../translations/en/global.json'
import {globals_es} from '../translations/es/global.json'
describe('TarjetaArtista',()=>{
    test('Should render right content', () => {
        const tr_en = JSON.parse(globals_en)
        const tr_es = JSON.parse(globals_es)
        console.log('======================================================================');
        debugger
        console.warn(tr_en.tools['spotify-text'], tr_es.tools['spotify-text']);
        const artistTestData = {
            "external_urls": { "spotify": "https://open.spotify.com/artist/5TYxZTjIPqKM8K8NuP9woO" },
            "followers": { "href": null, "total": 2207887 },
            "genres": [ "urbano espanol" ],
            "href": "https://api.spotify.com/v1/artists/5TYxZTjIPqKM8K8NuP9woO",
            "id": "5TYxZTjIPqKM8K8NuP9woO",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab6761610000e5ebdfb9d2cb6a43021d9002a10e",
                    "width": 640
                },
                {
                    "height": 320,
                    "url": "https://i.scdn.co/image/ab67616100005174dfb9d2cb6a43021d9002a10e",
                    "width": 320
                },
                {
                    "height": 160,
                    "url": "https://i.scdn.co/image/ab6761610000f178dfb9d2cb6a43021d9002a10e",
                    "width": 160
                }
            ],
            "name": "C. Tangana",
            "popularity": 76,
            "type": "artist",
            "uri": "spotify:artist:5TYxZTjIPqKM8K8NuP9woO"
        }
        
        const component = render( <TarjetaArtista isClickable jsonData={artistTestData} />)
    
        //Shows name of the artistv (formatted)
        component.getByText(truncaNombreLargo(artistTestData.name));
        //Shows followers (formatted)
        component.getByText(numberWithCommas(artistTestData.followers.total));
        //Shows a Link with the correct href
        console.warn(tr_en.tools['spotify-text'], tr_es.tools['spotify-text']);
        const linkText = tr_en.tools['spotify-text'] || tr_es.tools['spotify-text']
        expect(component.getByText(linkText)).toHaveAttribute('href', artistTestData.external_urls.spotify)
    
    })
})
