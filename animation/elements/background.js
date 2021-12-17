import * as PIXI from 'pixi.js'
import pixi_app from '../base/pixi_app.js'
import { debounce, mapRange, backgroundSize } from '../base/utils/helpers'
import { gsap } from 'gsap'

const colors = {
  yellow: 0xfcfb75,
  red: 0xff3864,
  purp: 0xb66ad6,
  grey: 0x2b2c34,
  black: 0x000000,
}

export default class BackgroundClouds extends PIXI.Container {
  constructor() {
    super()

    const clouds = []

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
    this.addChild(color_cloud_3)
    this.addChild(color_cloud_1)
    this.addChild(color_cloud_2)    
  }
  init() {}
  mousemove(eventData) {
  }
  size() {}
}
