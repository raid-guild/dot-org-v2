import * as PIXI from 'pixi.js'
import pixi_app from '../base/pixi_app.js'
import { debounce, mapRange } from '../base/utils/helpers'
import { gsap } from 'gsap'

export default class Fantasy extends PIXI.Container {
  constructor() {
    super()
    this.slices = []
    this.textures = [
      pixi_app.loader.resources.rf_yellow.texture,
      pixi_app.loader.resources.rf_purple.texture,
      pixi_app.loader.resources.rf_red.texture,
      pixi_app.loader.resources.rf_silver.texture,
    ]
    this.interactive = true
    this.on('mousemove', this.mousemove).on('touchmove', this.mousemove)
  }
  init() {
    this.gfx = new PIXI.Graphics()
    this.gfx.beginFill(0x000000, 0)
    this.gfx.drawRect(0, 0, pixi_app.loader.resources.rf_yellow.texture.baseTexture.width, pixi_app.loader.resources.rf_yellow.texture.baseTexture.height)
    this.gfx.endFill()
    this.addChild(this.gfx)
    // this.width = pixi_app.loader.resources.rf_yellow.texture.baseTexture.width
    // this.height = pixi_app.loader.resources.rf_yellow.texture.baseTexture.height
    for (let i = 0; i < this.textures.length; i++) {
      const slice = new PIXI.Sprite(this.textures[i])
      slice.anchor.set(0.5)
      slice.alpha = 0
      slice.x = this.width / 2
      slice.y = this.height / 2
      this.addChild(slice)
      this.slices.push(slice)
    }

    gsap.to(this.slices, { alpha: 1, stagger: 0.23, duration: 0.03 })
    //pixi_app.ticker.add(() => {})

    window.addEventListener(
      'resize',
      debounce((e) => {
        this.size()
      }, 1500)
    )
    this.size()
  }
  mousemove(eventData) {
    const moverX = mapRange(eventData.data.global.x, 0, pixi_app.renderer.width, 0.9, 1.1)
    for (let i = 0; i < this.slices.length; i++) {
      const slice = this.slices[i]
      gsap.to(slice.scale, {
        x: moverX,
        y: moverX,
        delay: i * 0.1,
        duration: 0.1,
        ease: 'rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})',
      })
    }
  }
  size() {}
}
