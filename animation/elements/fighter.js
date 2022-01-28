import * as PIXI from 'pixi.js'
import pixi_app from '../base/pixi_app.js'
import { debounce, backgroundSize } from '../base/utils/helpers'
import { gsap } from 'gsap'

export default class Fighter extends PIXI.Sprite {
  constructor(tex1, tex2) {
    super()
    this.textures = [tex1, tex2]
    this.texture = this.textures[0]
    this.interactive = true
    this.on('click', () => {
      this.strike()
    })   
  }
  strike() {
    console.log('strike')
    this.texture = this.textures[1]
    setTimeout(() => {
      this.texture = this.textures[0]
    }, 200)
  }
  mousemove(x, y) {}
  size() {}
}
