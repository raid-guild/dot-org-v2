import React, { useRef, useEffect } from 'react'
// import * as PIXI from 'pixi.js'
const styles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 1,
}

export const Animation = () => {
  const canvas = useRef(null)

  useEffect(async () => {
    if (!process.browser) return
    const pixi_app = (await import('../../animation/base/pixi_app')).default
    canvas.current.appendChild(pixi_app.view)
    return () => {
      pixi_app.destroy(true, true)
    }
  }, [])
  return <div style={styles} ref={canvas} />
}
