import * as PIXI from 'pixi.js'
import { debounce, getWindowSize, mapRange, backgroundContain, backgroundSize } from './utils/helpers'
import Fantasy from '../elements/fantasy.js'
import MolochFight from '../elements/moloch-fight.js'
import BackgroundClouds from '../elements/background.js'
import { gsap } from 'gsap'


const pixi_app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000
})


pixi_app.loader
  .add('spray_circ', '/animation/img/spray_circ.png')
  .add('logo', '/animation/img/logo_logotype__white-optimized.png')
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
  g1: 0x24003A,
  g2: 0x170011,
  g3: 0x130000,
  g4: 0x330F00
}

const fighter_element = document.getElementById('raid-banner')
const fantasy_element = document.getElementById('raid-fantasy')
const logo_element = document.getElementById('raid-logo')

pixi_app.loader.onComplete.add(() => {
  const scene_container = new PIXI.Container()
  scene_container.interactive = true
  scene_container.on('mousemove', onPointerMove).on('touchmove', onPointerMove)  
  scene_container.alpha = 0
  gsap.to(scene_container, {alpha: 1, duration: 1.5, delay: 0})
  
  pixi_app.stage.addChild(scene_container)

  const displacer = new PIXI.Sprite(pixi_app.loader.resources.spray_circ.texture)

  displacer.anchor.set(0.5)
  displacer.scale.set(0.1, 0.1)
  displacer.x = pixi_app.renderer.width / 2
  displacer.y = pixi_app.renderer.height / 2
  pixi_app.stage.addChild(displacer)

  const logo = new PIXI.Sprite(pixi_app.loader.resources.logo.texture)
  logo.tint = colors.red

  var displacementFilter = new PIXI.filters.DisplacementFilter(displacer)
  scene_container.filters = [displacementFilter]

  const background_clouds = new BackgroundClouds();

  const fantasy = new Fantasy()
  fantasy.init()

  
  

  const fighters = new MolochFight()


  
  scene_container.addChild(background_clouds)
  // scene_container.addChild(logo)
  scene_container.addChild(fighters)
  scene_container.addChild(fantasy)

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

    // const logo_position = logo_element.getBoundingClientRect()
    // logo.x = logo_position.x
    // logo.y = logo_position.y   

    //displacer.rotation -= 0.01 * delta
  })

  const scale_elements = () => {

    const fantasy_scale = backgroundContain(
      fantasy_element.offsetWidth,
      fantasy_element.offsetHeight,
      pixi_app.loader.resources.rf_yellow.texture.baseTexture.width,
      pixi_app.loader.resources.rf_yellow.texture.baseTexture.height
    )
    fantasy.scale.set(fantasy_scale.scale) 
    
    const fighters_scale = backgroundContain(
      fighter_element.offsetWidth,
      fighter_element.offsetHeight, 3125, 3125
    )
    fighters.scale.set(fighters_scale.scale)

    // const logo_scale = backgroundContain(
    //   logo_element.offsetWidth,
    //   logo_element.offsetHeight,
    //   pixi_app.loader.resources.logo.texture.baseTexture.width,
    //   pixi_app.loader.resources.logo.texture.baseTexture.height
    // )
    // logo.scale.set(logo_scale.scale)    

    // console.log(logo_element.offsetWidth, logo_element.offsetHeight)
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
    }, 10)
  )


})

export default pixi_app
