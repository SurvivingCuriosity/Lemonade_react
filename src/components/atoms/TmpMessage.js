import { React, useEffect, useState } from 'react'

export const TmpMessage = ({ config }) => {

  const [showing, setShowing] = useState(false);

  useEffect(() => {
    console.log('rendering component');
    setShowing(true)
    let timer1 = setTimeout(() => setShowing(false), 5000);

    return () => {
      clearTimeout(timer1);
    };
  }, [config]);

  return (
    showing && <p className={config.type}>{config.msg}</p>
  )
}
