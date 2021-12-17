import * as PIXI from 'pixi.js'
import { debounce, getWindowSize, mapRange, backgroundContain, backgroundSize } from './utils/helpers'
import Fantasy from '../elements/fantasy.js'
import MolochFight from '../elements/moloch-fight.js'
import { gsap } from 'gsap'


const pixi_app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2b2c34
})

window.addEventListener(
  'resize',
  debounce((e) => {
    const size = getWindowSize()
    const w = size.width
    const h = size.height

    pixi_app.renderer.view.style.width = w + 'px'
    pixi_app.renderer.view.style.height = h + 'px'
    pixi_app.renderer.resize(w, h)
  }, 10)
)

pixi_app.loader
  .add('spray_circ', '/animation/img/spray_circ.png')
  .add('logo', '/animation/img/logo_logotype__white.png')
  .add('rf_purple', '/animation/img/raid__fantasy__purple.png')
  .add('rf_yellow', '/animation/img/raid__fantasy__red.png')
  .add('rf_red', '/animation/img/raid__fantasy__silver.png')
  .add('rf_silver', '/animation/img/raid__fantasy__yellow.png')
  .add('red_warrior', '/animation/img/red_warrior.png')
  .add('red_warrior_2', '/animation/img/red_warrior_2.png')
  .add('red_sticks', '/animation/img/red_sticks.png')
  .add('red_sticks_2', '/animation/img/red_sticks_2.png')
  .add('red_archer', '/animation/img/red_archer.png')
  .add('red_archer_2', '/animation/img/red_archer_2.png')
  .add('red_wizard', '/animation/img/red_wizard.png')
  .add('red_wizard_2', '/animation/img/red_wizard_2.png')
  .add('red_sword', '/animation/img/red_sword.png')
  .add('red_sword_2', '/animation/img/red_sword_2.png')
  .add('moloch_horns', '/animation/img/moloch__horns.png')
  .add('moloch_face', '/animation/img/moloch__face_2.png')
  .add('moloch_guide', '/animation/img/moloch-scene.png')
  .load((loader, resources) => {})

const colors = {
  yellow: 0xfcfb75,
  red: 0xff3864,
  purp: 0xb66ad6,
  grey: 0x2b2c34,
  black: 0x000000,
}

const fighter_element = document.getElementById('raid-banner')
const fantasy_element = document.getElementById('raid-fantasy')
const logo_element = document.getElementById('raid-logo')

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

  const logo_scale = backgroundContain(
    168,
    44,
    pixi_app.loader.resources.logo.texture.baseTexture.width,
    pixi_app.loader.resources.logo.texture.baseTexture.height
  )
  logo.scale.set(logo_scale.scale)
  logo.tint = colors.red

  var displacementFilter = new PIXI.filters.DisplacementFilter(displacer)
  gradient_container.filters = [displacementFilter]

  const fantasy = new Fantasy()
  fantasy.init()
  const fantasy_scale = backgroundContain(
    400,
    585,
    pixi_app.loader.resources.rf_yellow.texture.baseTexture.width,
    pixi_app.loader.resources.rf_yellow.texture.baseTexture.height
  )
  fantasy.scale.set(fantasy_scale.scale)

  

  const fighters = new MolochFight()
  const fighters_scale = backgroundSize(550, 575, 3125, 3125)

  fighters.scale.set(fighters_scale.scale)

  gradient_container.interactive = true
  gradient_container.on('mousemove', onPointerMove).on('touchmove', onPointerMove)

  gradient_container.addChild(logo)
  gradient_container.addChild(fighters)
  gradient_container.addChild(fantasy)

  function onPointerMove(eventData) {
    gsap.to(displacer, { duration: 1, x: eventData.data.global.x, y: eventData.data.global.y })
  }
  pixi_app.ticker.add((delta) => {
    const fighter_position = fighter_element.getBoundingClientRect()
    fighters.x = fighter_position.x
    fighters.y = fighter_position.y

    const fantasy_position = fantasy_element.getBoundingClientRect()
    fantasy.x = fantasy_position.x
    fantasy.y = fantasy_position.y

    const logo_position = logo_element.getBoundingClientRect()
    logo.x = logo_position.x
    logo.y = logo_position.y   

    //displacer.rotation -= 0.01 * delta
  })
})

export default pixi_app
