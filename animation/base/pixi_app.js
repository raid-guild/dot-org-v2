import * as PIXI from 'pixi.js'
import { debounce, getWindowSize, mapRange, backgroundContain, backgroundSize } from './utils/helpers'
import Fantasy from '../elements/fantasy.js'
import MolochFight from '../elements/moloch-fight.js'
import BackgroundClouds from '../elements/background.js'
import { gsap } from 'gsap'

const pixi_app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
})

pixi_app.loader
  .add('spray_circ', '/animation/img/spray_circ.png')
  .add('rf_purple', '/animation/img/raid__fantasy__purple.png')
  .add('rf_yellow', '/animation/img/raid__fantasy__red.png')
  .add('rf_red', '/animation/img/raid__fantasy__silver.png')
  .add('rf_silver', '/animation/img/raid__fantasy__yellow.png')
  .add('red_warrior', '/animation/img/red_warrior-color.png')
  .add('red_warrior_2', '/animation/img/red_warrior_2-color.png')
  .add('red_sticks', '/animation/img/red_sticks-color.png')
  .add('red_sticks_2', '/animation/img/red_sticks_2-color.png')
  .add('red_archer', '/animation/img/red_archer-color.png')
  .add('red_archer_2', '/animation/img/red_archer_2-color.png')
  .add('red_wizard', '/animation/img/red_wizard-color.png')
  .add('red_wizard_2', '/animation/img/red_wizard_2-color.png')
  .add('red_sword', '/animation/img/red_sword-color.png')
  .add('red_sword_2', '/animation/img/red_sword_2-color.png')
  .add('moloch_horns', '/animation/img/moloch__horns.png')
  .add('moloch_face', '/animation/img/moloch__face_2-color.png')
  .add('moloch_guide', '/animation/img/moloch-scene.png')
  .add('clouds', '/animation/img/clouds.png')
  .load((loader, resources) => {})

const colors = {
  yellow: 0xfcfb75,
  red: 0xff3864,
  purp: 0xb66ad6,
  grey: 0x2b2c34,
  black: 0x000000,
  g1: 0x24003a,
  g2: 0x170011,
  g3: 0x130000,
  g4: 0x330f00,
}

const fighter_element = document.getElementById('raid-banner')
const fantasy_element = document.getElementById('raid-fantasy')
const clouds_element = document.getElementById('portfolio')
const placeholder = document.getElementById('raid-banner-placeholder')

// gsap.to(placeholder, { alpha: 1, duration: 0.5 })

pixi_app.loader.onComplete.add(() => {
  const scene_container = new PIXI.Container()
  scene_container.interactive = true
  scene_container.on('mousemove', onPointerMove).on('touchmove', onPointerMove)
  scene_container.alpha = 0
  gsap.killTweensOf(placeholder)
  gsap.to(placeholder, { alpha: 0, scale: 0, duration: 0.5 })
  gsap.to(scene_container, { alpha: 1, duration: 1.5, delay: 0.25 })

  pixi_app.stage.addChild(scene_container)

  // Define background gradient
  const background_clouds = new BackgroundClouds()

  // Define Moloch fight
  const fighters = new MolochFight()

  // Define and init Moloch Fantasy graphic
  const fantasy = new Fantasy()
  fantasy.init()

  // Define clouds
  const clouds = new PIXI.Sprite(pixi_app.loader.resources.clouds.texture)
  clouds.anchor.set(0.5)
  clouds.x = pixi_app.renderer.width / 2

  // Define displacement
  let displace_move_timeout
  let displace_can_move = true
  let displace_speed_x = 1
  let displace_speed_y = 1
  const displacer = new PIXI.Sprite(pixi_app.loader.resources.spray_circ.texture)
  displacer.anchor.set(0.5)
  displacer.scale.set(0.1, 0.1)
  displacer.x = pixi_app.renderer.width / 2
  displacer.y = pixi_app.renderer.height / 2
  const displacementFilter = new PIXI.filters.DisplacementFilter(displacer)
  scene_container.filters = [displacementFilter]

  // Arrange Scene layers
  scene_container.addChild(background_clouds)
  scene_container.addChild(fighters)
  scene_container.addChild(fantasy)
  scene_container.addChild(clouds)
  scene_container.addChild(displacer)

  function onPointerMove(eventData) {
    clearTimeout(displace_move_timeout)
    displace_can_move = false
    gsap.to(displacer, { duration: 1, x: eventData.data.global.x, y: eventData.data.global.y })
    const cloud_mover_x = mapRange(eventData.data.global.x, 0, pixi_app.renderer.width, pixi_app.renderer.width / 2 + 50, pixi_app.renderer.width / 2 - 50)
    gsap.to(clouds, { x: cloud_mover_x, duration: 15 })
    displace_move_timeout = setTimeout(() => {
      displace_can_move = true
    }, 1000)
  }

  pixi_app.ticker.add((delta) => {
    const fighter_position = fighter_element.getBoundingClientRect()
    fighters.x = fighter_position.x
    fighters.y = fighter_position.y

    const fantasy_position = fantasy_element.getBoundingClientRect()
    fantasy.x = fantasy_position.x
    fantasy.y = fantasy_position.y

    const clouds_position = clouds_element.getBoundingClientRect()
    clouds.y = clouds_position.y + clouds_position.height / 2
    if (displace_can_move) {
      displacer.x = displacer.x + displace_speed_x
      displacer.y = displacer.y + displace_speed_y

      if (displacer.x > pixi_app.renderer.width || displacer.x < 0) {
        displace_speed_x = -displace_speed_x
      }

      if (displacer.y > pixi_app.renderer.height || displacer.y < 0) {
        displace_speed_y = -displace_speed_y
      }
    }
  })

  const scale_elements = () => {
    const fantasy_scale = backgroundContain(
      fantasy_element.offsetWidth,
      fantasy_element.offsetHeight,
      pixi_app.loader.resources.rf_yellow.texture.baseTexture.width,
      pixi_app.loader.resources.rf_yellow.texture.baseTexture.height
    )
    fantasy.scale.set(fantasy_scale.scale)

    const fighters_scale = backgroundContain(fighter_element.offsetWidth, fighter_element.offsetHeight, 3125, 3125)
    fighters.scale.set(fighters_scale.scale)

    const clouds_scale = backgroundSize(
      clouds_element.offsetWidth,
      clouds_element.offsetHeight,
      pixi_app.loader.resources.clouds.texture.baseTexture.width,
      pixi_app.loader.resources.clouds.texture.baseTexture.height
    )
    clouds.scale.set(clouds_scale.scale * 1.2)
  }
  scale_elements()
  window.addEventListener(
    'resize',
    debounce((e) => {
      const size = getWindowSize()
      const w = size.width
      const h = size.height

      pixi_app.renderer.view.style.width = w + 'px'
      pixi_app.renderer.view.style.height = h + 'px'
      pixi_app.renderer.resize(w, h)

      scale_elements()
      clouds.x = pixi_app.renderer.width / 2
    }, 10)
  )
})

export default pixi_app
