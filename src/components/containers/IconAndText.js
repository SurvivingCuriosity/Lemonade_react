import React from 'react'

export const IconAndText = ({ children, reverse }) => {
    let style={}
    if(reverse){
        style={
            width:'100%',
            flexFlow: reverse===true ? 'row' : 'row-reverse', 
            justifyContent: reverse ? 'flex-start' : 'flex-end'
        }
    }
    return (
        <div className='flex-row-start' style={style || undefined}>
            {children}
        </div>
    )
}
