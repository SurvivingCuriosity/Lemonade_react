import React from 'react'
import { ToolContainer } from './ToolContainer'
import { FixedTopNav } from '../molecules/navs/FixedTopNav'

export const ToolPage = ({ titulo, descripcion, children }) => {
    return (
        <div className='tool-page'>
            <FixedTopNav />
            <h1 className="tool-titulo" >{titulo}</h1>
            <p className="text-center">{descripcion}</p>

            <ToolContainer>
                {children}
            </ToolContainer>

        </div>
    )
}
