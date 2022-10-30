import React from 'react'
import {useTranslation} from 'react-i18next'
export function HeaderBottomNav(){
    const [t, i18n] = useTranslation('global');

    const links = [
        {label:t("header.bottom-menu.tutorial"), path:'#tutorial'},
        {label:t("header.bottom-menu.proyecto"), path:'#proyecto'},
        {label:t("header.bottom-menu.contacto"), path:'#contacto'}
    ]

    return (
        <nav className="header-bottom-nav">
            <ul>
                {links.map((link, index)=>{return(
                    <li key={index}><a href={link.path}>{link.label}</a></li>
                )})}
            </ul>
        </nav>
    )
}