import * as THREE from 'three'
import Sizes from "./utils/Sizes"
import Time from "./utils/Time"

export default class Orchestrator {
  
  constructor(canvas) {
    
    // Options
    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
 
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
  }

  update() {

  }

}
