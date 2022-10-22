import { React, useEffect, useState } from 'react'

export const TmpMessage = ({ config }) => {

  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true)
    let timer1 = !config?.remain && setTimeout(() => setShowing(false), 5000);
    config?.remain && setShowing(true);
    return () => {
      clearTimeout(timer1);
    };

  }, [config]);

  return (
    showing && <p className={config.type}>{config.msg}</p>
  )
}
