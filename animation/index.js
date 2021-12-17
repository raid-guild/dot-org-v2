import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import pixi_app from './base/pixi_app.js'
import appState from './state.js'
import { debounce, getWindowSize, mapRange, backgroundContain, backgroundSize } from './base/utils/helpers'
import Fantasy from './elements/fantasy.js'
import Fighter from './elements/fighter.js'
import MolochFight from './elements/moloch-fight.js'

const colors = {
  yellow: 0xfcfb75,
  red: 0xff3864,
  purp: 0xb66ad6,
  grey: 0x2b2c34,
  black: 0x000000,
}
//console.log('%c Site coded by Brendan Sheehan https://devgru.la 🏄 🦁 🏄 🦁', 'padding: 5px; background: #8dc641; color: #111')

pixi_app.loader.onComplete.add(() => {
  const clouds = []
  const gradient_container = new PIXI.Container()

  const positions = [
    [
      [0, 0],
      [0, pixi_app.renderer.height],
      [pixi_app.renderer.width, pixi_app.renderer.height / 2],
    ],
    [
      [pixi_app.renderer.width / 2, 0],
      [0, pixi_app.renderer.height],
      [pixi_app.renderer.width, pixi_app.renderer.height],
    ],
    [
      [0, pixi_app.renderer.height / 2],
      [pixi_app.renderer.width, pixi_app.renderer.height],
      [pixi_app.renderer.width, 0],
    ],
    [
      [pixi_app.renderer.width / 2, pixi_app.renderer.height],
      [0, 0],
      [pixi_app.renderer.width, 0],
    ],
  ]

  const color_cloud_scale = backgroundSize(
    pixi_app.renderer.width,
    pixi_app.renderer.height,
    pixi_app.loader.resources.spray_circ.texture.baseTexture.width,
    pixi_app.loader.resources.spray_circ.texture.baseTexture.height
  )

  const color_cloud_1 = new PIXI.Sprite(pixi_app.loader.resources.spray_circ.texture)
  color_cloud_1.tint = colors.red
  clouds.push(color_cloud_1)

  const color_cloud_2 = new PIXI.Sprite(pixi_app.loader.resources.spray_circ.texture)
  color_cloud_2.tint = colors.purp

  clouds.push(color_cloud_2)

  const color_cloud_3 = new PIXI.Sprite(pixi_app.loader.resources.spray_circ.texture)
  color_cloud_3.tint = colors.yellow

  clouds.push(color_cloud_3)

  for (let index = 0; index < clouds.length; index++) {
    const cloud = clouds[index]
    cloud.scale.set(color_cloud_scale.scale * 2)
    cloud.anchor.set(0.5)
    cloud.alpha = 0.5
  }
  gsap.set(color_cloud_1, { x: positions[2][0][0], y: positions[2][0][1] })
  gsap.set(color_cloud_2, { x: positions[2][1][0], y: positions[2][1][1] })
  gsap.set(color_cloud_3, { x: positions[2][2][0], y: positions[2][2][1] })
  let loop_index = 0
  setInterval(() => {
    loop_index = (loop_index + 1) % positions.length
    console.table(positions[loop_index])
    gsap.to(color_cloud_1, { duration: 10, ease: 'back.out(1.7)', x: positions[loop_index][0][0], y: positions[loop_index][0][1] })
    gsap.to(color_cloud_2, { duration: 10, ease: 'back.out(1.7)', x: positions[loop_index][1][0], y: positions[loop_index][1][1] })
    gsap.to(color_cloud_3, { duration: 10, ease: 'back.out(1.7)', x: positions[loop_index][2][0], y: positions[loop_index][2][1] })
  }, 10000)
  gradient_container.addChild(color_cloud_3)
  gradient_container.addChild(color_cloud_1)
  gradient_container.addChild(color_cloud_2)
  pixi_app.stage.addChild(gradient_container)

  const displacer = new PIXI.Sprite(pixi_app.loader.resources.spray_circ.texture)

  displacer.anchor.set(0.5)
  displacer.scale.set(0.1, 0.1)
  displacer.x = pixi_app.renderer.width / 2
  displacer.y = pixi_app.renderer.height / 2
  pixi_app.stage.addChild(displacer)

  const logo = new PIXI.Sprite(pixi_app.loader.resources.logo.texture)

  logo.anchor.set(0.5)
  logo.scale.set(0.3)
  logo.x = pixi_app.renderer.width / 4
  //logo.x = 0
  logo.y = pixi_app.renderer.height / 2
  logo.tint = colors.black

  var displacementFilter = new PIXI.filters.DisplacementFilter(displacer)
  gradient_container.filters = [displacementFilter]

  const fantasy = new Fantasy()
  fantasy.init()
  fantasy.scale.set(0.5)
  fantasy.x = pixi_app.renderer.width / 1.5
  fantasy.y = pixi_app.renderer.height / 2

  const fighters = new MolochFight()
  fighters.scale.set(0.25)
  //fighters.x = pixi_app.renderer.width / 2
  gradient_container.interactive = true
  gradient_container.on('mousemove', onPointerMove).on('touchmove', onPointerMove)

  //gradient_container.addChild(logo)
  //gradient_container.addChild(fighters)
  //gradient_container.addChild(fantasy)

  function onPointerMove(eventData) {
    const moverX = mapRange(eventData.data.global.x, 0, pixi_app.renderer.width, -200, 200)
    gsap.to(displacer, { duration: 1, x: eventData.data.global.x, y: eventData.data.global.y })
  }
  pixi_app.ticker.add((delta) => {
    // displacer.rotation -= 0.01 * delta
  })
})
