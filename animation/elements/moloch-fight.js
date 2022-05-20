import * as PIXI from 'pixi.js'
import pixi_app from '../base/pixi_app.js'
import { debounce, mapRange } from '../base/utils/helpers'
import { gsap } from 'gsap'
import Fighter from './fighter.js'

export default class MolochFight extends PIXI.Container {
  constructor() {
    super()
    this.scene_height = 3125
    this.scene_width = 3152
    // this.gfx = new PIXI.Graphics()
    // this.gfx.beginFill(0x000000)
    // this.gfx.drawRect(0, 0, this.scene_width, this.scene_height)
    // this.gfx.endFill()
    // this.addChild(this.gfx)
    // this.guide = new PIXI.Sprite(pixi_app.loader.resources.moloch_guide.texture)
    // this.guide.tint = 0x00ff00
    // this.addChild(this.guide)

    this.fighters = []
    this.textures = [
      [pixi_app.loader.resources.red_archer.texture, pixi_app.loader.resources.red_archer_2.texture, 2220, 2140],
      [pixi_app.loader.resources.red_sticks.texture, pixi_app.loader.resources.red_sticks_2.texture, 25, 1770],
      [pixi_app.loader.resources.red_wizard.texture, pixi_app.loader.resources.red_wizard_2.texture, 1030, 2050],
      [pixi_app.loader.resources.red_sword.texture, pixi_app.loader.resources.red_sword_2.texture, 430, 2270],
      [pixi_app.loader.resources.red_warrior.texture, pixi_app.loader.resources.red_warrior_2.texture, 1550, 2140],
    ]
    for (let i = 0; i < this.textures.length; i++) {
      const fighter = new Fighter(this.textures[i][0], this.textures[i][1])
      fighter.x = this.textures[i][2]
      fighter.y = this.textures[i][3]
      fighter.home = [this.textures[i][2], this.textures[i][3]]
      this.fighters.push(fighter)
      this.addChild(fighter)
    }
    this.moloch_face = new PIXI.Sprite(pixi_app.loader.resources.moloch_face.texture)
    this.moloch_horns = new PIXI.Sprite(pixi_app.loader.resources.moloch_horns.texture)
    this.moloch_face.x = 220
    this.moloch_horns.anchor.set(0.5)

    this.moloch_horns.x = 1760
    this.moloch_horns.y = 930

    this.addChild(this.moloch_face)
    this.addChild(this.moloch_horns)
    this.interactive = true
    this.on('mousemove', this.mousemove).on('touchmove', this.mousemove)
    document.addEventListener('click', (event) => {
        for (let i = 0; i < this.fighters.length; i++) {
          const fighter = this.fighters[i]
          const bounds = fighter.getBounds()
          if (bounds.x <= event.clientX && event.clientX <= (bounds.x + bounds.width) && bounds.y <= event.clientY && event.clientY <= (bounds.y + bounds.height)) {
            fighter.strike();
          }
        }         
      },
      false
    )     
    setInterval(() => {
      this.strike()
    }, 10000)
  }
  strike() {

    for (let i = 0; i < this.fighters.length; i++) {
      const fighter = this.fighters[i]
      const rando = Math.floor(Math.random() * 2) + 1
      setTimeout(() => {
         for (let j = 0; j < rando; j++) {
          setTimeout(() => {
            fighter.strike()
          }, j * 300)
         }
      }, i * 30)
    }
  }
  init() {}
  mousemove(eventData) {
    const moverX = mapRange(eventData.data.global.x, 0, pixi_app.renderer.width, -100, 100)
    const rotator = mapRange(eventData.data.global.x, 0, pixi_app.renderer.width, -0.15, 0.15)
    gsap.to(this.moloch_face, { duration: 1, x: 220 + moverX })
    gsap.to(this.moloch_horns, { duration: 10, rotation: rotator })
  }
  size() {}
}
