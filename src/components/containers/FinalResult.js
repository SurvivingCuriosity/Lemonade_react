import React from 'react'

export const FinalResult = ({children, ...props}) => {
  
  return (
    <div id='final-result-container' className={props.mostrarResultado ? 'fade-in-appear' : 'fade-out-disappear'}>
        {children}
    </div>
  )
}
