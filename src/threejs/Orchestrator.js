import * as THREE from 'three'
import Sizes from "./utils/Sizes"
import Time from "./utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'

let instance = null

export default class Orchestrator {
  
  constructor(canvas) {
 
    // Singleton
    if(instance) return instance
    instance = this

    // Options
    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
 
    // Resize event
    this.sizes.emitter.on('resize', () => {
      this.resize()
    })

    // Tick event
    this.time.emitter.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    // this.camera.update()
    this.renderer.update()
  }

}
